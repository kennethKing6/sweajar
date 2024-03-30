import "../model/__mocks__/Report";
import "../shared/firebase/__mock__/mockFirebase";
import "../model/__mocks__/User";
import { User } from "../model/User";
import { ReportViolationsController } from "./reportViolationsController";
import { SignedInUser } from "../model/SignedInUser";
import { Report } from "../model/Report";
import { SortReportsByTimestampController } from "./sortReportsByTimestampController";

const sortedReportExample = [
  {
    dateEntry: 1709782380274,
    reportedID: "BReYVXRAe9eI79QY6tQmQ1ruBa62",
    reporterID: "vORorEhFy2YrKCNZjri0YRtp89D2",
    swearType: {
      description:
        "Choose this option if the user entertains themselves with puppet shows using office supplies, turning the desk into a stage for miniature dramas 🎭🤹‍♂️",
      levels: "minor",
      name: "Desk Puppeteer",
      swearTypeID: "Desk Puppeteer",
    },
    swearTypeID: "Desk Puppeteer",
    teamID: "-NrE5fghcBjkjgufykYb",
  },
  {
    dateEntry: 1709782380278,
    reportedID: "BReYVXRAe9eI79QY6tQmQ1ruBa62",
    reporterID: "vORorEhFy2YrKCNZjri0YRtp89D2",
    swearType: {
      description:
        "Choose this option if the user corrects everyone's spelling and grammar, unsolicited, like a one-person spelling SWAT team 🐝📝",
      levels: "minor",
      name: "Spelling Bee Champion",
      swearTypeID: "Spelling Bee Champion",
    },
    swearTypeID: "Spelling Bee Champion",
    teamID: "-NrE5fghcBjkjgufykYb",
  },
  {
    dateEntry: 1709782380280,
    reportedID: "BReYVXRAe9eI79QY6tQmQ1ruBa62",
    reporterID: "vORorEhFy2YrKCNZjri0YRtp89D2",
    swearType: {
      description:
        "Choose this option if the user provides hourly weather updates for the office area, like a meteorologist of the cubicle microclimate 🌦️📊",
      levels: "minor",
      name: "Office Weather Reporter",
      swearTypeID: "Office Weather Reporter",
    },
    swearTypeID: "Office Weather Reporter",
    teamID: "-NrE5fghcBjkjgufykYb",
  },
  {
    dateEntry: 1709782380281,
    reportedID: "BReYVXRAe9eI79QY6tQmQ1ruBa62",
    reporterID: "vORorEhFy2YrKCNZjri0YRtp89D2",
    swearType: {
      description:
        "Choose this option if the user insists on delivering elevator pitches for mundane tasks, turning every task into a dramatic elevator ride 🛒🏢",
      levels: "minor",
      name: "Elevator Pitch Enthusiast",
      swearTypeID: "Elevator Pitch Enthusiast",
    },
    swearTypeID: "Elevator Pitch Enthusiast",
    teamID: "-NrE5fghcBjkjgufykYb",
  },
  {
    dateEntry: 1711594061579,
    reportedID: "BReYVXRAe9eI79QY6tQmQ1ruBa62",
    reporterID: "vORorEhFy2YrKCNZjri0YRtp89D2",
    swearType: {
      description:
        "Choose this option if the user sees the glass as half empty, cracked, and leaking. 🍷",
      levels: "minor",
      name: "Doomsday Specialist",
      swearTypeID: "Doomsday Specialist",
    },
    swearTypeID: "Doomsday Specialist",
    teamID: "-NrE5fghcBjkjgufykYb",
  },
];
const reportWithinAPeriod = {
  "-NsLy9uy_Hml-zFDG-av": {
    dateEntry: 1709782380274,
    reportedID: "BReYVXRAe9eI79QY6tQmQ1ruBa62",
    reporterID: "vORorEhFy2YrKCNZjri0YRtp89D2",
    swearType: {
      description:
        "Choose this option if the user entertains themselves with puppet shows using office supplies, turning the desk into a stage for miniature dramas 🎭🤹‍♂️",
      levels: "minor",
      name: "Desk Puppeteer",
      swearTypeID: "Desk Puppeteer",
    },
    swearTypeID: "Desk Puppeteer",
    teamID: "-NrE5fghcBjkjgufykYb",
  },
  "-NsLy9v0_UJQjeXqGwSR": {
    dateEntry: 1709782380278,
    reportedID: "qsA8CcAod9eblax4tAkIK8CY2I82",
    reporterID: "vORorEhFy2YrKCNZjri0YRtp89D2",
    swearType: {
      description:
        "Choose this option if the user entertains themselves with puppet shows using office supplies, turning the desk into a stage for miniature dramas 🎭🤹‍♂️",
      levels: "minor",
      name: "Desk Puppeteer",
      swearTypeID: "Desk Puppeteer",
    },
    swearTypeID: "Desk Puppeteer",
    teamID: "-NrE5fghcBjkjgufykYb",
  },
  "-NsLy9v0_UJQjeXqGwSS": {
    dateEntry: 1709782380278,
    reportedID: "BReYVXRAe9eI79QY6tQmQ1ruBa62",
    reporterID: "vORorEhFy2YrKCNZjri0YRtp89D2",
    swearType: {
      description:
        "Choose this option if the user corrects everyone's spelling and grammar, unsolicited, like a one-person spelling SWAT team 🐝📝",
      levels: "minor",
      name: "Spelling Bee Champion",
      swearTypeID: "Spelling Bee Champion",
    },
    swearTypeID: "Spelling Bee Champion",
    teamID: "-NrE5fghcBjkjgufykYb",
  },
  "-NsLy9v1oi2Xz5qf0idz": {
    dateEntry: 1709782380279,
    reportedID: "qsA8CcAod9eblax4tAkIK8CY2I82",
    reporterID: "vORorEhFy2YrKCNZjri0YRtp89D2",
    swearType: {
      description:
        "Choose this option if the user corrects everyone's spelling and grammar, unsolicited, like a one-person spelling SWAT team 🐝📝",
      levels: "minor",
      name: "Spelling Bee Champion",
      swearTypeID: "Spelling Bee Champion",
    },
    swearTypeID: "Spelling Bee Champion",
    teamID: "-NrE5fghcBjkjgufykYb",
  },
  "-NsLy9v248dPiGam3yOG": {
    dateEntry: 1709782380280,
    reportedID: "BReYVXRAe9eI79QY6tQmQ1ruBa62",
    reporterID: "vORorEhFy2YrKCNZjri0YRtp89D2",
    swearType: {
      description:
        "Choose this option if the user provides hourly weather updates for the office area, like a meteorologist of the cubicle microclimate 🌦️📊",
      levels: "minor",
      name: "Office Weather Reporter",
      swearTypeID: "Office Weather Reporter",
    },
    swearTypeID: "Office Weather Reporter",
    teamID: "-NrE5fghcBjkjgufykYb",
  },
  "-NsLy9v3DjYWlbILY5a4": {
    dateEntry: 1709782380281,
    reportedID: "qsA8CcAod9eblax4tAkIK8CY2I82",
    reporterID: "vORorEhFy2YrKCNZjri0YRtp89D2",
    swearType: {
      description:
        "Choose this option if the user provides hourly weather updates for the office area, like a meteorologist of the cubicle microclimate 🌦️📊",
      levels: "minor",
      name: "Office Weather Reporter",
      swearTypeID: "Office Weather Reporter",
    },
    swearTypeID: "Office Weather Reporter",
    teamID: "-NrE5fghcBjkjgufykYb",
  },
  "-NsLy9v3DjYWlbILY5a5": {
    dateEntry: 1709782380281,
    reportedID: "BReYVXRAe9eI79QY6tQmQ1ruBa62",
    reporterID: "vORorEhFy2YrKCNZjri0YRtp89D2",
    swearType: {
      description:
        "Choose this option if the user insists on delivering elevator pitches for mundane tasks, turning every task into a dramatic elevator ride 🛒🏢",
      levels: "minor",
      name: "Elevator Pitch Enthusiast",
      swearTypeID: "Elevator Pitch Enthusiast",
    },
    swearTypeID: "Elevator Pitch Enthusiast",
    teamID: "-NrE5fghcBjkjgufykYb",
  },
  "-NsLy9v4d3iJwESUjclK": {
    dateEntry: 1709782380282,
    reportedID: "qsA8CcAod9eblax4tAkIK8CY2I82",
    reporterID: "vORorEhFy2YrKCNZjri0YRtp89D2",
    swearType: {
      description:
        "Choose this option if the user insists on delivering elevator pitches for mundane tasks, turning every task into a dramatic elevator ride 🛒🏢",
      levels: "minor",
      name: "Elevator Pitch Enthusiast",
      swearTypeID: "Elevator Pitch Enthusiast",
    },
    swearTypeID: "Elevator Pitch Enthusiast",
    teamID: "-NrE5fghcBjkjgufykYb",
  },
  "-Nu1xAnV7OBT0CGcR6mP": {
    dateEntry: 1711594061579,
    reportedID: "BReYVXRAe9eI79QY6tQmQ1ruBa62",
    reporterID: "vORorEhFy2YrKCNZjri0YRtp89D2",
    swearType: {
      description:
        "Choose this option if the user sees the glass as half empty, cracked, and leaking. 🍷",
      levels: "minor",
      name: "Doomsday Specialist",
      swearTypeID: "Doomsday Specialist",
    },
    swearTypeID: "Doomsday Specialist",
    teamID: "-NrE5fghcBjkjgufykYb",
  },
};
SignedInUser.user = {
  teamID: "teamID",
};
describe("Test report team", () => {
  jest
    .spyOn(Report, "getReportsWithinPeriod")
    .mockReturnValue(reportWithinAPeriod);

  it("Test this month report with expected reports for known user", async () => {
    jest
      .spyOn(Report, "getReportsWithinPeriod")
      .mockReturnValue(reportWithinAPeriod);

    const userID = "BReYVXRAe9eI79QY6tQmQ1ruBa62";
    const result =
      await SortReportsByTimestampController.getLast_ONE_Month_ReportByUserID(
        userID,
      );
    expect(result.length).toBe(sortedReportExample.length);
  });

  it("Test this month report with expected reports for unknown user", async () => {
    jest
      .spyOn(Report, "getReportsWithinPeriod")
      .mockReturnValue(reportWithinAPeriod);

    const userID = "unknown";
    const result =
      await SortReportsByTimestampController.getLast_ONE_Month_ReportByUserID(
        userID,
      );
    expect(result.length).toBe(0);
  });
});

describe("Test report team", () => {
  it("Test this month report for a team", async () => {
    jest
      .spyOn(Report, "getReportsWithinPeriod")
      .mockReturnValue(reportWithinAPeriod);
    const result =
      await SortReportsByTimestampController.getLast_ONE_Month_ReportByTeam();

    expect(result).toMatchObject(reportWithinAPeriod);
  });

  it("Test 3 months report for a team by user id", async () => {
    jest
      .spyOn(Report, "getReportsWithinPeriod")
      .mockReturnValue(reportWithinAPeriod);

    const userID = "BReYVXRAe9eI79QY6tQmQ1ruBa62";
    const result =
      await SortReportsByTimestampController.getLast_THREE_Month_ReportByTeam(
        userID,
      );
    expect(result.length).toBe(sortedReportExample.length);
  });

  it("Test a year report for a team by user id", async () => {
    jest
      .spyOn(Report, "getReportsWithinPeriod")
      .mockReturnValue(reportWithinAPeriod);

    const userID = "BReYVXRAe9eI79QY6tQmQ1ruBa62";
    const result =
      await SortReportsByTimestampController.getLast_YEAR_ReportByTeam(userID);
    expect(result.length).toBe(sortedReportExample.length);
  });
});
