import { Report } from "../model/Report";
import { SignedInUser } from "../model/SignedInUser";

export class SortReportsByTimestampController {
  static async getLast_ONE_Month_ReportByTeam() {
    const todaysDate = new Date();
    let lastMonthDate = new Date(todaysDate);
    lastMonthDate = new Date(lastMonthDate.setDate(todaysDate.getDate() - 30));

    return await Report.getReportsWithinPeriod({
      teamID: SignedInUser.user.teamID,
      endTime: todaysDate.getTime(),
      startTime: lastMonthDate.getTime(),
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

      lastMonthDate = new Date(
        lastMonthDate.setDate(todaysDate.getDate() - 30),
      );

      const currentUserReports = [];

      const reports = await Report.getReportsWithinPeriod({
        teamID: SignedInUser.user.teamID,
        endTime: todaysDate.getTime(),
        startTime: lastMonthDate.getTime(),
      });

      for (let report in reports) {
        try {
          const current = reports[report];
          if (current["reportedID"] === userID) {
            currentUserReports.push(current);
          }
        } catch (err) {}
      }

      return currentUserReports;
    } catch (err) {
      return [];
    }
  }

  static async getLast_THREE_Month_ReportByTeam(userID) {
    try {
      const todaysDate = new Date();
      let lastMonthDate = new Date(todaysDate);
      lastMonthDate = new Date(
        lastMonthDate.setDate(todaysDate.getDate() - 30 * 3),
      );
      const currentUserReports = [];
      const reports = await Report.getReportsWithinPeriod({
        teamID: SignedInUser.user.teamID,
        endTime: todaysDate.getTime(),
        startTime: lastMonthDate.getTime(),
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

  static async getLast_YEAR_ReportByTeam(userID) {
    try {
      const todaysDate = new Date();
      let lastMonthDate = new Date(todaysDate);
      lastMonthDate = new Date(
        lastMonthDate.setDate(todaysDate.getDate() - 30 * 12),
      );
      const currentUserReports = [];
      const reports = await Report.getReportsWithinPeriod({
        teamID: SignedInUser.user.teamID,
        endTime: todaysDate.getTime(),
        startTime: lastMonthDate.getTime(),
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
}
