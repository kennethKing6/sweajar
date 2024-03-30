import "./__mocks__/SwearType";
import "../shared/firebase/__mock__/mockFirebase";
import "./__mocks__/User";
import { User } from "./User";
import { SignedInUser } from "./SignedInUser";
import { Teams } from "./Teams";
import { FirebaseDatabase } from "../shared/firebase/firebaseDatabase";

const teamName = "Superfly";
const teamID = "sdfsdfgdg";
const email = "team@gmail.com";
const adminID = "admin";
const userID = "userID";

beforeEach(() => {
  jest.spyOn(window, "alert").mockReturnValue(null);
});
describe("Create Team", () => {
  it("Throw an error if trying to create team with no Signed In User ID", async () => {
    SignedInUser.user = {
      userID: null,
    };
    expect(Teams.createTeam(teamName)).rejects.toThrow("Unauthorized");
  });

  it("Function returns no value signifying team created", async () => {
    SignedInUser.user = {
      userID: "jsndfjsdf",
    };
    jest.spyOn(FirebaseDatabase, "generateUniqueKey").mockReturnValue(teamID);
    const result = await Teams.createTeam(teamName);

    expect(result).toBe(teamID);
  });
});
describe("Get Team", () => {
  it("Get team By the the teamID", async () => {
    SignedInUser.user = {
      userID: null,
    };
    const teams = {};
    jest.spyOn(FirebaseDatabase, "readDataFromDB").mockResolvedValue(teams);
    const team = await Teams.getTeam(teamID);
    expect(team).toMatchObject(teams);
  });
});

describe("Add new team member", () => {
  it("Throw an error when no Team ID is specified", async () => {
    expect(Teams.addTeamMember(email, null)).rejects.toThrow("Unauthorized");
  });

  it("Throw an error no team was found to add team member to", async () => {
    jest.spyOn(Teams, "getTeam").mockResolvedValue(null);
    expect(Teams.addTeamMember(email, teamID)).rejects.toThrow("Unauthorized");
  });

  it("Throw an error when signed user is trying to add new member and that user is not admin", async () => {
    jest.spyOn(Teams, "getTeam").mockResolvedValue({
      admin: "sdfdsfjj",
    });
    SignedInUser.user = {
      userID: "uuuddk",
    };
    expect(Teams.addTeamMember(email, teamID)).rejects.toThrow(
      "Only team admin can a new teammate",
    );
  });

  it("Return the user when successfully added to the team", async () => {
    const tempUser = {
      admin: adminID,
      userID: adminID,
    };
    jest.spyOn(User, "getUserByEmail").mockResolvedValue(tempUser);
    jest.spyOn(Teams, "getTeam").mockResolvedValue({
      admin: adminID,
    });
    SignedInUser.user = {
      userID: adminID,
    };
    const newTeamMember = await Teams.addTeamMember(email, teamID);
    expect(newTeamMember).toMatchObject(tempUser);
  });
});

describe("Delete Team Member", () => {
  it("Throw an error when no Team ID is specified", async () => {
    expect(Teams.deleteTeamMember(email, null)).rejects.toThrow("Unauthorized");
  });

  it("Throw an error no team was found to add team member to", async () => {
    jest.spyOn(Teams, "getTeam").mockResolvedValue(null);
    expect(Teams.deleteTeamMember(email, teamID)).rejects.toThrow(
      "Unauthorized",
    );
  });

  it("Throw an error when signed user is trying to add new member and that user is not admin", async () => {
    jest.spyOn(Teams, "getTeam").mockResolvedValue({
      admin: "sdfdsfjj",
    });
    SignedInUser.user = {
      userID: "uuuddk",
    };
    expect(Teams.addTeamMember(email, teamID)).rejects.toThrow(
      "Only team admin can a new teammate",
    );
  });

  it("Return the user when successfully deleted from the team", async () => {
    const tempUser = {
      admin: adminID,
      userID: adminID,
    };
    jest.spyOn(User, "getUserByEmail").mockResolvedValue(tempUser);
    jest.spyOn(Teams, "getTeam").mockResolvedValue({
      admin: adminID,
    });
    jest.spyOn(FirebaseDatabase, "deleteDataFromDB").mockResolvedValue(null);
    jest.spyOn(Promise, "any").mockResolvedValue(null);
    SignedInUser.user = {
      userID: adminID,
    };
    const newTeamMember = await Teams.deleteTeamMember(email, teamID);
    expect(newTeamMember).toMatchObject(tempUser);
  });
});

describe("Get Teams signed in user is in", () => {
  it("Make sure we extract the team from where user is participating and where user is admin of team", async () => {
    jest
      .spyOn(FirebaseDatabase, "readDataFromDB")
      .mockResolvedValue({ team1: { userID } });
    jest
      .spyOn(FirebaseDatabase, "readDataFromDByEquality")
      .mockResolvedValue({ team2: { userID } });

    jest.spyOn(Promise, "all").mockResolvedValue([]);

    const teams = await Teams.getTeams();
    expect(teams.length).toBe(2);
  });
});

describe("Get team members in a team", () => {
  it("Extract all team members in a team with no team members", async () => {
    jest
      .spyOn(FirebaseDatabase, "readDataFromDB")
      .mockResolvedValue({ admin: "admin", teamName: "teamName" });
    const result = await Teams.getTeamMembers(teamID);
    expect(result.length).toBe(2);
  });
  it("Extract all team members in a team with team members", async () => {
    jest
      .spyOn(FirebaseDatabase, "readDataFromDB")
      .mockResolvedValue({ team: { teamID } });
    const result = await Teams.getTeamMembers(teamID);
    expect(result.length).toBe(3);
  });
});
