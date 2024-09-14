import "../model/__mocks__/Report";
import "../shared/firebase/__mock__/mockFirebase";
import "../model/__mocks__/User";
import { User } from "../model/User";
import { ReportViolationsController } from "./reportViolationsController";
import { TeamManagementManagerController } from "./teamManagementController";
import { Teams } from "../model/Teams";

const teamID = "fake teamID";
describe("Team Managemen test", () => {
  it("Test to delete a team member and not specify the team member email", async () => {
    jest.spyOn(window, "alert").mockReturnValue(null);
    const result = await TeamManagementManagerController.deleteTeamMember(
      null,
      teamID,
    );
    expect(result).toBeUndefined();
  });

  it("Test to delete a team member ", async () => {
    const userID = "sfsfs";
    const deletedUser = "Deleted User";
    jest.spyOn(window, "alert").mockReturnValue(null);
    jest.spyOn(Teams, "deleteTeamMember").mockReturnValue(deletedUser);
    const result = await TeamManagementManagerController.deleteTeamMember(
      userID,
      teamID,
    );
    expect(result).toBe(deletedUser);
  });
});
