import "../model/__mocks__/Report";
import "../shared/firebase/__mock__/mockFirebase";
import "../model/__mocks__/User";
import { User } from "../model/User";
import { ReportViolationsController } from "./reportViolationsController";
import { SignedInUser } from "../model/SignedInUser";
import { Report } from "../model/Report";

SignedInUser.user = {
  userID: "userID",
};

describe("Test selecting sweartype", () => {
  it("Test Select report", () => {
    const selectedSwearType = {
      description: "",
      levels: "major",
      name: "fake sweartype name",
      swearTypeID: "fake sweartype id",
    };
    ReportViolationsController.selectSwearType(selectedSwearType);
    expect(
      ReportViolationsController.getSelectedSwearTypeCount(),
    ).toBeGreaterThan(0);

    expect(
      ReportViolationsController.getSelectedReports()[
        selectedSwearType["name"]
      ],
    ).toMatchObject(selectedSwearType);
    expect(ReportViolationsController.getSelectedSweartypes().length).toBe(1);
  });
  it("Test Select report type and remove an already added ", () => {
    const selectedSwearType = {
      description: "",
      levels: "major",
      name: "fake sweartype name",
      swearTypeID: "fake sweartype id",
    };
    ReportViolationsController.selectSwearType(selectedSwearType);
    expect(ReportViolationsController.getSelectedSwearTypeCount()).toBe(0);
  });
});

describe("Adding user for reports tests", () => {
  it("Test adding user for future reports", () => {
    const user = {
      email: "new@gmail.com",
      firstName: "First Name",
      lastName: "Last Name",
      profilePicture: "https",
      teamID: "fake teamID",
      userID: "fake user id",
    };
    ReportViolationsController.selectUser(user);
    expect(ReportViolationsController.hasUsersToReport()).toBe(true);

    ReportViolationsController.selectUser(user);
    expect(ReportViolationsController.hasUsersToReport()).toBe(false);

    expect(ReportViolationsController.hasSelectedTeam()).toBeUndefined();
  });
});

describe("Test the report function", () => {
  it("Test report user with no team selected", () => {
    expect(ReportViolationsController.reportUsers()).rejects.toThrow(
      "Please select a team to report to",
    );
  });

  it("Test report user with no user to report", () => {
    SignedInUser.user = {
      teamID: "fake team id",
    };
    expect(ReportViolationsController.reportUsers()).rejects.toThrow(
      "Please select someone to report",
    );
  });

  it("Test report user with no violations selected", () => {
    SignedInUser.user = {
      teamID: "fake team id",
    };
    ReportViolationsController.selectUser({
      email: "email",
      firstName: "firstName",
      lastName: "lastName",
      profilePicture: "https",
      teamID: "teamID",
      userID: "user id",
    });
    expect(ReportViolationsController.reportUsers()).rejects.toThrow(
      "Please select violations",
    );
  });

  it("Test reporting users with ", async () => {
    SignedInUser.user = {
      teamID: "fake team id",
    };

    ReportViolationsController.selectSwearType({
      description: "desc",
      levels: "minor",
      name: "name",
      swearTypeID: "swear type",
    });

    await ReportViolationsController.reportUsers();
    expect(ReportViolationsController.getSelectedSwearTypeCount()).toBe(0);
    expect(ReportViolationsController.getSelectedSweartypes().length).toBe(0);
  });
});
