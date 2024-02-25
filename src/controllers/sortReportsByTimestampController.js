import { Report } from "../model/Report";
import { SignedInUser } from "../model/SignedInUser";

export class SortReportsByTimestampController {
  static async getLast_ONE_ReportByTeam() {
    const todaysDate = new Date();
    let lastMonthDate = new Date(todaysDate);
    lastMonthDate = lastMonthDate.setMonth(todaysDate.getMonth() - 1);

    return await Report.getReportsWithinPeriod({
      teamID: SignedInUser.user.teamID,
      endTime: todaysDate.getTime(),
      startTime: lastMonthDate,
    });
  }

  static async getLast_THREE_MonthReportByTeam() {
    const todaysDate = new Date();
    let lastMonthDate = new Date(todaysDate);
    lastMonthDate = lastMonthDate.setMonth(todaysDate.getMonth() - 3);

    return await Report.getReportsWithinPeriod({
      teamID: SignedInUser.user.teamID,
      endTime: todaysDate.getTime(),
      startTime: lastMonthDate,
    });
  }

  static async getLast_YEAR_ReportByTeam() {
    const todaysDate = new Date();
    let lastMonthDate = new Date(todaysDate);
    lastMonthDate = lastMonthDate.setFullYear(todaysDate.getFullYear() - 1);

    return await Report.getReportsWithinPeriod({
      teamID: SignedInUser.user.teamID,
      endTime: todaysDate.getTime(),
      startTime: lastMonthDate,
    });
  }
}
