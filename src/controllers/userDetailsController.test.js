import "../shared/firebase/__mock__/mockFirebase";
import "../model/__mocks__/User";
import { User } from "../model/User";
import { ReportViolationsController } from "./reportViolationsController";
import { TeamManagementManagerController } from "./teamManagementController";
import { Report } from "../model/Report";
import { UserDetailsController } from "./userDetailsController";
import { SortReportsByTimestampController } from "./sortReportsByTimestampController";

const chartsFakeData = {
  swearType0: {
    report1: {
      reportedID: "reported user",
      reporterID: "reporter",
      teamID: "Team they both belong to",
      dateEntry: "timestamp",
      swearTypeID: "Profinity",
      teamID: "teamID",
      swearType: {
        swearType: "swearType 1",
        description: " swearType 1 description",
      },
      description: " swearType 0 description",
    },
  },
  swearType1: {
    report1: {
      reportedID: "reported user 1",
      reporterID: "reporter",
      teamID: "Team they both belong to 1",
      dateEntry: "timestamp 1",
      swearTypeID: "Profinity 1",
      teamID: "teamID 1",
      swearType: {
        swearType: "swearType 1",
        description: " swearType 1 description",
      },
    },
  },
};
const userID = "userID";
const teamID = "teamID";

describe("Get chart data for the last month", () => {
  it("get the Bar Chart Data of the month", async () => {
    jest
      .spyOn(Report, "getReportedUserByUserID")
      .mockResolvedValue(chartsFakeData);
    const result = await UserDetailsController.getMonthBarChartData(
      userID,
      teamID,
    );
    expect(result.length).toBe(2);
  });
});
describe("Get Month Line chart data for the last month", () => {
  it("get the Line Chart Data of the month when there is no data", async () => {
    jest
      .spyOn(Report, "getReportedUserByUserID")
      .mockResolvedValue(chartsFakeData);

    jest
      .spyOn(
        SortReportsByTimestampController,
        "getLast_ONE_Month_ReportByUserID",
      )
      .mockResolvedValue([]);
    const result = await UserDetailsController.getMonthLineChartData(userID);
    expect(result).toMatchObject({ data: [], series: [] });
  });

  it("get the Line Chart Data of the month when there is data", async () => {
    jest
      .spyOn(Report, "getReportedUserByUserID")
      .mockResolvedValue(chartsFakeData);

    jest
      .spyOn(
        SortReportsByTimestampController,
        "getLast_ONE_Month_ReportByUserID",
      )
      .mockResolvedValue([]);
    SortReportsByTimestampController.getLast_ONE_Month_ReportByUserID;
    const result = await UserDetailsController.getMonthLineChartData(userID);
    expect(result).toMatchObject({ data: [], series: [] });
  });
});
