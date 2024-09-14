import "../shared/firebase/__mock__/mockFirebase";
import "../model/__mocks__/User";
import { User } from "../model/User";

import { FirebaseDatabase } from "../shared/firebase/firebaseDatabase";
import { Teams } from "../model/Teams";
import { SignedInUser } from "../model/SignedInUser";

const user = {
  teamID: "teamID",
  firstName: "firstName",
  lastName: "lastName",
  profilePicture: "profilePicture",
  email: "email",
  userID: "userID",
};
const teamMembers = {
  user1: user,
  user2: user,
  user3: user,
};

SignedInUser.user = {
  userID: "fake user id",
  teamID: "fake team id",
};
describe("Team Members", () => {
  it("Get team members that the currently signed in user is in", async () => {
    jest.spyOn(FirebaseDatabase, "readDataFromDB").mockReturnValue(teamMembers);
    const result = await Teams.getTeamMembers();
    expect(result.length).toBe(3);
  });

  it("Get team members that the currently signed in user is in that has no teammates", async () => {
    jest
      .spyOn(FirebaseDatabase, "readDataFromDB")
      .mockReturnValueOnce({ admin: "fake admin", teamName: "fake team name" });
    const result = await Teams.getTeamMembers();
    expect(result.length).toBe(2);
  });
});
