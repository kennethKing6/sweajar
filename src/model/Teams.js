import { FirebaseDatabase } from "../shared/firebase/firebaseDatabase";
import { SignedInUser } from "./SignedInUser";
import { User } from "./User";

//123456789
// mail@gmail.com
//password
//mzafri@gmail.com
const TEAMS_PATH = "/teams";
const PARTICIPATING_TEAM = "/participating";
const USER_TO_TEAM = "/userToTeams";

export class Teams {
  static async createTeam(teamName) {
    if (!SignedInUser.user.userID) throw new Error("Unauthorized");
    const teamID = await FirebaseDatabase.generateUniqueKey(TEAMS_PATH);
    await FirebaseDatabase.writeDataToDB({
      queryPath: `/${TEAMS_PATH}/${teamID}`,
      data: {
        admin: SignedInUser.user.userID,
        teamName: teamName,
        teamID: teamID,
      },
    });
    return teamID;
  }

  /**
   *
   * @param {string} teamID
   * @returns {{teamName:string,teamMembers:{},teamID:string,admin:string}}
   */
  static async getTeam(teamID) {
    return await FirebaseDatabase.readDataFromDB({
      queryPath: `/${TEAMS_PATH}/${teamID}`,
    });
  }

  static async addTeamMember(email, teamID) {
    if (!teamID) throw new Error("Unauthorized");

    const team = await this.getTeam(teamID);
    if (!team) throw new Error("Unauthorized");
    if (team.admin !== SignedInUser.user.userID) {
      alert("Only team admin can a new teammate");
      throw new Error("Only team admin can a new teammate");
    }
    const user = await User.getUserByEmail(email);
    const newTeamMember = {
      ...team,
      userID: user.userID,
    };

    await FirebaseDatabase.pushDataToDB({
      newData: `${PARTICIPATING_TEAM}/${team.teamID}/${user.userID}`,
      queryPath: `${USER_TO_TEAM}/${user.userID}`,
    });

    await FirebaseDatabase.writeDataToDB({
      data: newTeamMember,
      queryPath: `/${PARTICIPATING_TEAM}/${team.teamID}/${user.userID}`,
    });

    alert("User was successfully added to the team");

    return newTeamMember;
  }

  static async deleteTeamMember(email, teamID) {
    if (!teamID) throw new Error("Unauthorized");

    const team = await this.getTeam(teamID);
    if (!team) throw new Error("Unauthorized");
    if (team.admin !== SignedInUser.user.userID)
      throw new Error("Only team admin can a new teammate");

    const user = await User.getUserByEmail(email);
    let userToTeams = await FirebaseDatabase.readDataFromDB({
      queryPath: `${USER_TO_TEAM}/${user.userID}`,
    });

    let result = [];
    for (let data in userToTeams) {
      const currentTeamPath = userToTeams[data];

      if (
        currentTeamPath === `${PARTICIPATING_TEAM}/${teamID}/${user.userID}`
      ) {
        result.push(
          FirebaseDatabase.deleteDataFromDB({
            queryPath: `${USER_TO_TEAM}/${user.userID}/${data}`,
          }),
        );
      }
    }
    await Promise.any(result);
    await FirebaseDatabase.deleteDataFromDB({
      queryPath: `/${PARTICIPATING_TEAM}/${teamID}/${user.userID}`,
    });
    return user;
  }

  static async deleteTeamByName(teamName) {
    const team = await FirebaseDatabase.readDataFromDByEquality({
      queryKey: "teamName",
      equalValue: `${teamName}`,
      queryPath: TEAMS_PATH,
    });
    if (team) {
      const teamID = Object.keys(team)[0];
      if (teamID) {
        await FirebaseDatabase.deleteDataFromDB({
          queryPath: `${TEAMS_PATH}/${teamID}`,
        });
      }
    }
  }

  /**
   * Extract the list of the teams this signed in user is part of whether
   * they have been added to or created. Ordered by teams they have been added to first
   * @returns {Promise <[{teamName:string,teamMembers:{},teamID:string,admin:string}]>}
   */
  static async getTeams() {
    let result = [];

    let visitedParticipatingPath = {};
    let userToTeams = await FirebaseDatabase.readDataFromDB({
      queryPath: `${USER_TO_TEAM}/${SignedInUser.user.userID}`,
    });

    for (let data in userToTeams) {
      const currentTeamPath = userToTeams[data];
      if (!visitedParticipatingPath[currentTeamPath]) {
        result.push(
          FirebaseDatabase.readDataFromDB({
            queryPath: currentTeamPath,
          }),
        );
      }
      visitedParticipatingPath[currentTeamPath] = currentTeamPath;
    }

    if (result.length > 0) {
      result = await Promise.all(result);
      result = result.filter((element) => element !== null);
    }

    let participatingTeams = await FirebaseDatabase.readDataFromDByEquality({
      queryPath: `${PARTICIPATING_TEAM}`,
      equalValue: SignedInUser.user.userID,
      queryKey: "userID",
    });

    if (participatingTeams) {
      participatingTeams = Object.values(participatingTeams);
      result.push(...participatingTeams);
    }

    let ownTeams = await FirebaseDatabase.readDataFromDByEquality({
      equalValue: `${SignedInUser.user.userID}`,
      queryKey: "admin",
      queryPath: `${TEAMS_PATH}`,
    });
    if (ownTeams) ownTeams = Object.values(ownTeams);

    if (ownTeams) result.push(...ownTeams);

    return result;
  }

  /**
   * This function is responsible for querying all participants/team members in a team
   * @param {string} teamID
   */
  static async getTeamMembers(teamID) {
    let result = new Map();
    //Get admin user
    const adminTeam = await FirebaseDatabase.readDataFromDB({
      queryPath: `${TEAMS_PATH}/${teamID}`,
    });
    const { admin = "", teamName = "" } = adminTeam;
    const teamAdmin = {
      ...adminTeam,
      userID: admin,
    };
    if (adminTeam) result.set(admin, teamAdmin);

    // Get other members
    const data = await FirebaseDatabase.readDataFromDB({
      queryPath: `${PARTICIPATING_TEAM}/${teamID}`,
    });

    if (data)
      Object.values(data).map((v) => {
        const { userID } = v;
        result.set(userID, v);
      });

    // Add logged in user to the team if not yet saved in the database
    const loggedInUser = {
      teamID,
      teamName,
      admin,
      userID: SignedInUser.user.userID,
    };
    result.set(SignedInUser.user.userID, loggedInUser);
    return result.size > 0 ? Array.from(result).map((v) => v[1]) : [];
  }
}
