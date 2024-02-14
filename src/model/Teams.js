import { FirebaseDatabase } from "../shared/firebase/firebaseDatabase";
import { SignedInUser } from "./SignedInUser";
import { User } from "./User";

//123456789
// mail@gmail.com
//password
//mzafri@gmail.com
const TEAMS_PATH = "/teams";
const PARTICIPATING_TEAM = "/participating";

export class Teams {
  static async createTeam(teamName) {
    if (!SignedInUser.user.userID) throw new Error("Unauthorized");
    const teamID = await FirebaseDatabase.generateUniqueKey(TEAMS_PATH);
    await FirebaseDatabase.writeDataToDB({
      queryPath: `/${TEAMS_PATH}/${teamID}`,
      data: {
        admin: SignedInUser.user.userID,
        teamName: teamName,
        teamMembers: "",
        teamID: teamID,
      },
    });
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
      throw new Error("Unauthorized");
    }
    const user = await User.getUserByEmail(email);

    await FirebaseDatabase.writeDataToDB({
      data: team,
      queryPath: `/${PARTICIPATING_TEAM}/${user.userID}/${team.teamID}`,
    });
  }

  static async deleteTeamMember(email, teamID) {
    if (!teamID) throw new Error("Unauthorized");

    const team = await this.getTeam(teamID);
    if (!team) throw new Error("Unauthorized");
    if (!team.admin !== SignedInUser.user.userID)
      throw new Error("Unauthorized");

    const data = team.teamMembers;
    delete data[`${email}`];
    await FirebaseDatabase.updateDataOnDB({
      newData: data,
      queryPath: `/${TEAMS_PATH}/${teamID}/teamMembers`,
    });
  }

  /**
   * Extract the list of the teams this signed in user is part of whether
   * they have been added to or created. Ordered by teams they have been added to first
   * @returns {Promise <[{teamName:string,teamMembers:{},teamID:string,admin:string}]>}
   */
  static async getTeams() {
    const result = [];
    let participatingTeams = await FirebaseDatabase.readDataFromDB({
      queryPath: `${PARTICIPATING_TEAM}/${SignedInUser.user.userID}`,
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
}
