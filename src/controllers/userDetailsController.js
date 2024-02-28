import { Report } from "../model/Report";
import { SortReportsByTimestampController } from "./sortReportsByTimestampController";

export class UserDetailsController {
  /**
   * Generates an overview of all the violations of the user and formats it
   * to be sent to the user
   * @param {string} userID
   * @param {string} teamID
   *
   * @returns {Promise<[{violationType:string,countPerViolation:number}]>}
   */
  static async getMonthBarChartData(userID, teamID) {
    const userReports = await Report.getReportedUserByUserID(userID, teamID);
    const result = [];

    for (let reportCategory in userReports) {
      const count = Object.values(userReports[reportCategory]).length;
      result.push({
        violationType: reportCategory,
        countPerViolation: count,
      });
    }

    return result;
  }
}
