import "./__mocks__/Report";
import "../shared/firebase/__mock__/mockFirebase";
import "./__mocks__/User";
import { User } from "./User";
import { Report } from "./Report";
import { FirebaseDatabase } from "../shared/firebase/firebaseDatabase";
import { SignedInUser } from "./SignedInUser";

const fakeReport = {
  dateEntry: Date.now(),
  reportedID: "userID",
  reporterID: "signedInUser",
  swearType: "swearType",
  swearTypeID: "swearTypeID",
  teamID: "teamID",
};
const swearType = "swearType";
const report = new Report(fakeReport);

SignedInUser.user = {
  userID: "userID",
};

describe("Mock report class Constructor", () => {
  it("Report class test", () => {
    expect(report.dateEntry).toBe(fakeReport.dateEntry);
    expect(report.reportedID).toBe(fakeReport.reportedID);
    expect(report.reporterID).toBe(fakeReport.reporterID);
    expect(report.swearType).toBe(fakeReport.swearType);
    expect(report.teamID).toBe(fakeReport.teamID);
  });
});

describe("Report User in a team", () => {
  it("Report user by ID", async () => {
    jest.spyOn(Report, "trackTeamReportType").mockResolvedValue(undefined);
    jest.spyOn(Report, "pushReportByDateEntry").mockResolvedValue(undefined);
    jest
      .spyOn(FirebaseDatabase, "generateUniqueKey")
      .mockResolvedValue("pushID");

    const result = await Report.reportThisUser({
      reportedID: fakeReport.reportedID,
      swearType: fakeReport.swearType,
      swearTypeID: fakeReport.swearTypeID,
      teamID: fakeReport.teamID,
    });
    expect(result).toBeUndefined();
  });
  it("Save report with a timestamp database path", async () => {
    const result = await Report.pushReportByDateEntry(
      fakeReport.teamID,
      report,
    );
    expect(result).toBeUndefined();
  });
});

// it("Save team violation type in a database in an array where no violations has yet been reported for the team", async () => {
//   jest.spyOn(FirebaseDatabase, "readDataFromDB").mockResolvedValue(null);
//   const result = await Report.trackTeamReportType(fakeReport.teamID, "run");
//   console.log(typeof result);
//   expect(result).toEqual("yes");
});
