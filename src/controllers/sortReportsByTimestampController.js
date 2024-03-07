import { Report } from "../model/Report";
import { SignedInUser } from "../model/SignedInUser";

export class SortReportsByTimestampController {
  static async getLast_ONE_Month_ReportByTeam() {
    const todaysDate = new Date();
    let lastMonthDate = new Date(todaysDate);
    lastMonthDate = lastMonthDate.setMonth(todaysDate.getMonth() - 1);

    return await Report.getReportsWithinPeriod({
      teamID: SignedInUser.user.teamID,
      endTime: todaysDate.getTime(),
      startTime: lastMonthDate,
    });
  }
  /**
   *
   * @param {string} userID
   * @returns {Promise <Array>}
   */
  static async getLast_ONE_Month_ReportByUserID(userID) {
    try {
      const todaysDate = new Date();
      let lastMonthDate = new Date(todaysDate);
      lastMonthDate = lastMonthDate.setMonth(todaysDate.getMonth() - 1);
      const currentUserReports = [];
      const reports = await Report.getReportsWithinPeriod({
        teamID: SignedInUser.user.teamID,
        endTime: todaysDate.getTime(),
        startTime: lastMonthDate,
      });
      for (let report in reports) {
        const current = reports[report];
        if (current["reportedID"] === userID) {
          currentUserReports.push(current);
        }
      }
      return currentUserReports;
    } catch (err) {
      return [];
    }
  }

  static async getLast_THREE_Month_ReportByTeam() {
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
