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
const userReports = {
  "Violation type A": { ...fakeReport },
  "Violation type B": { ...fakeReport },
  "Violation type C": { ...fakeReport },
};
const userViolations = {
  "Muted Microphone": {
    pushID1: { ...fakeReport },
    pushID2: { ...fakeReport },
  },
  Profanity: {
    pushID1: { ...fakeReport },
    pushID2: { ...fakeReport },
    pushID3: { ...fakeReport },
  },
};
const violationsByHighest = {
  sortedViolations: [
    {
      username: "Muted Microphone",
      violationType: "Muted Microphone",
      countPerViolation: 2,
    },
    {
      username: "Profanity",
      violationType: "Profanity",
      countPerViolation: 3,
    },
  ],
  highestViolationsMetrics: {
    highestViolationCount: 3,
    swearType: "swearType",
  },
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
    jest.spyOn(Report, "trackTeamReportType").mockResolvedValue(null);
    jest.spyOn(Report, "pushReportByDateEntry").mockResolvedValue(null);
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

  it("Save team violation type in a database in an array where no violations has yet been reported for the team", async () => {
    jest.spyOn(FirebaseDatabase, "readDataFromDB").mockResolvedValue(null);
    jest.spyOn(FirebaseDatabase, "writeDataToDB").mockResolvedValue(null);
    const result = await Report.trackTeamReportTypeAlternate("t", "kk");
    expect(result.size).toBe(2);
  });
  it("Save team violation type in a database in an array where  violations have been reported for the team", async () => {
    jest
      .spyOn(FirebaseDatabase, "readDataFromDB")
      .mockResolvedValue(["t", "y"]);
    jest.spyOn(FirebaseDatabase, "writeDataToDB").mockResolvedValue(null);
    const result = await Report.trackTeamReportTypeAlternate("t", "kk");
    expect(result.size).toBe(3);
  });
  it("Save Reports by Timestamp", async () => {
    jest.spyOn(FirebaseDatabase, "pushDataToDB").mockResolvedValue(undefined);
    const result = await Report.pushReportByDateEntry(
      fakeReport.teamID,
      fakeReport,
    );
    expect(result).toBeUndefined();
  });
});

describe("Get User Reports", () => {
  it("Extract user reports", async () => {
    const userReports = {
      "Violation type": { ...fakeReport },
    };
    jest
      .spyOn(FirebaseDatabase, "readDataFromDB")
      .mockResolvedValue(userReports);
    const result = await Report.getReportedUserByUserID(
      fakeReport.reportedID,
      fakeReport.teamID,
    );
    expect(result).toMatchObject(userReports);
  });

  it("Extract reports legends", async () => {
    jest.spyOn(FirebaseDatabase, "readDataFromDB").mockResolvedValue({});
    const result = await Report.getReportsLegends(fakeReport.teamID);
    expect(result).toMatchObject({});
  });
});

describe("Get all the violations created in a team types in a team", () => {
  it("Extract all the violations in a team", async () => {
    jest
      .spyOn(FirebaseDatabase, "readDataFromDB")
      .mockResolvedValue(userReports);
    const result = await Report.getAllViolationsInTeams(fakeReport.teamID);
    expect(result.length).toBe(3);
  });
});

describe("Extract  user report information", () => {
  it("Sort user by id violations in descending order and highest violation count metrics", async () => {
    jest
      .spyOn(Report, "getReportedUserByUserID")
      .mockResolvedValue(userViolations);
    const result = await Report.getTheHighestViolationByUserID(
      fakeReport.reportedID,
      fakeReport.teamID,
    );
    expect(result).toMatchObject(violationsByHighest);
  });

  it("Sort user by id violations in descending order and highest violation count metrics with information found", async () => {
    const result = await Report.getTheHighestViolationByUserID(
      fakeReport.reportedID,
      fakeReport.teamID,
    );
    expect(result).toMatchObject({
      sortedViolations: null,
      highestViolationsMetrics: null,
    });
  });
  it("Get user report by types", async () => {
    const reports = {};
    jest.spyOn(FirebaseDatabase, "readDataFromDB").mockResolvedValue(reports);
    const result = await Report.getUserReportsByType(
      fakeReport.teamID,
      fakeReport.reportedID,
      "Profanity",
    );
    expect(result).toMatchObject(reports);
  });
  it("Get user report within a time period", async () => {
    const reports = {
      report1: fakeReport,
      report2: fakeReport,
      report3: fakeReport,
    };
    jest
      .spyOn(FirebaseDatabase, "readDataFromDByStartnEnd")
      .mockResolvedValue(reports);
    const result = await Report.getReportsWithinPeriod({
      endTime: Date.now(),
      startTime: fakeReport.dateEntry,
      teamID: fakeReport.teamID,
    });
    expect(result).toMatchObject(reports);
  });
});
