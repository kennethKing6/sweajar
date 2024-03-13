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

  /**
   *
   * @param {*} userID
   * @returns {Promise <{data:Array,series:Array}>}
   */
  static async getMonthLineChartData(userID) {
    try {
      const reports =
        await SortReportsByTimestampController.getLast_ONE_Month_ReportByUserID(
          userID,
        );
      const lineOutput = {};
      const series = [];
      reports.map((report) => {
        const {
          dateEntry = new Date(),
          swearType: { name = "" },
        } = report;
        //extract the date of the report
        let day = new Date(dateEntry);
        day.setMilliseconds(0);
        day.setSeconds(0);
        day.setMinutes(0);
        day.setHours(0);

        if (lineOutput[day]) {
          lineOutput[day][name] = lineOutput[day][name]
            ? lineOutput[day][name] + 1
            : 1;
        } else {
          lineOutput[day] = {
            date: new Date(dateEntry),
            [name]: 1,
          };
        }
        series.push({
          name: name,
          dataKey: name,
        });
      });
      const data = Object.values(lineOutput);
      return { data: data, series: series };
    } catch (err) {
      return [];
    }
  }

  /**
   *
   * @param {*} userID
   * @returns {Promise <{data:Array,series:Array}>}
   */
  static async getThreeMothsLineChartData(userID) {
    try {
      const reports =
        await SortReportsByTimestampController.getLast_THREE_Month_ReportByTeam(
          userID,
        );

      const lineOutput = {};
      const series = [];
      reports.map((report) => {
        const {
          dateEntry = new Date(),
          swearType: { name = "" },
        } = report;

        //extract the date of the report
        let day = new Date(dateEntry);
        day.setMilliseconds(0);
        day.setSeconds(0);
        day.setMinutes(0);
        day.setHours(0);

        if (lineOutput[day]) {
          lineOutput[day][name] = lineOutput[day][name]
            ? lineOutput[day][name] + 1
            : 1;
        } else {
          lineOutput[day] = {
            date: new Date(dateEntry),
            [name]: 1,
          };
        }
        series.push({
          name: name,
          dataKey: name,
        });
      });

      const data = Object.values(lineOutput);
      return { data: data, series: series };
    } catch (err) {
      return [];
    }
  }

  /**
   *
   * @param {*} userID
   * @returns {Promise <{data:Array,series:Array}>}
   */
  static async getThisYearLineChartData(userID) {
    try {
      const reports =
        await SortReportsByTimestampController.getLast_YEAR_ReportByTeam(
          userID,
        );

      const lineOutput = {};
      const series = [];
      reports.map((report) => {
        const {
          dateEntry = new Date(),
          swearType: { name = "" },
        } = report;

        //extract the date of the report
        let day = new Date(dateEntry);
        day.setMilliseconds(0);
        day.setSeconds(0);
        day.setMinutes(0);
        day.setHours(0);

        if (lineOutput[day]) {
          lineOutput[day][name] = lineOutput[day][name]
            ? lineOutput[day][name] + 1
            : 1;
        } else {
          lineOutput[day] = {
            date: new Date(dateEntry),
            [name]: 1,
          };
        }
        series.push({
          name: name,
          dataKey: name,
        });
      });

      const data = Object.values(lineOutput);
      return { data: data, series: series };
    } catch (err) {
      return [];
    }
  }
}
