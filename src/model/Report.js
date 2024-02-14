import { FirebaseDatabase } from "../shared/firebase/firebaseDatabase";
import { SignedInUser } from "./SignedInUser";

const REPORT_PATH = "/reports";

/**
 * Report is another name for violations
 */
export class Report {
  /**@type {string} */
  reporterID;

  /**@type {string} */
  reportedID;

  /**@type {string} */
  teamID;

  /**@type {string} */
  swearTypeID;

  /**@type {EpochTimeStamp} */
  dateEntry;

  /**@type {string} */
  teamID;

  /**@type {object} */
  swearType;

  /**
   *
   * @param {object} reportType
   * @param {string} reportType.reporterID
   * @param {string} reportType.reportedID
   * @param {string} reportType.teamID
   * @param {string} reportType.swearTypeID
   * @param {EpochTimeStamp} reportType.dateEntry
   * @param {string} reportType.teamID
   * @param {object} reportType.swearType
   */
  constructor(reportType) {
    this.reportedID = reportType.reportedID;
    this.reporterID = reportType.reporterID;
    this.teamID = reportType.teamID;
    this.dateEntry = reportType.dateEntry;
    this.swearTypeID = reportType.swearTypeID;
    this.teamID = reportType.teamID;
    this.swearType = reportType.swearType;
  }

  /**
   *
   * @param {object} query
   * @param {string} query.reportedID
   * @param {string} query.teamID
   * @param {string} query.swearTypeID
   * @param {string} query.swearType
   */
  static async reportThisUser(query) {
    const data = new Report({
      dateEntry: Date.now(),
      reportedID: query.reportedID,
      reporterID: SignedInUser.user.userID,
      swearTypeID: query.swearTypeID,
      teamID: query.teamID,
      swearType: query.swearType,
    });
    let path = `${REPORT_PATH}/${query.teamID}/${query.reportedID}/${query.swearTypeID}`;
    const pushID = FirebaseDatabase.generateUniqueKey(path);
    await FirebaseDatabase.writeDataToDB({
      data: data,
      queryPath: `${path}/${pushID}`,
    });
  }

  /**
   *
   * @param {string} userID
   * @returns {{
   *  '[swearTypeID:string]':{
   *    '[pushID:string]':Report
   *  }
   * }}
   */
  static async getReportedUserByUserID(userID, teamID) {
    const result = await FirebaseDatabase.readDataFromDB({
      queryPath: `${REPORT_PATH}/${teamID}/${userID}`,
    });
    return result;
  }

  static async getAllViolationsInTeams(teamID) {
    const result = await FirebaseDatabase.readDataFromDB({
      queryPath: `${REPORT_PATH}/${teamID}`,
    });
    return Object.values(result);
  }

  static async getTheHighestViolationByUserID(userID, teamID) {
    const swearTypes = await this.getReportedUserByUserID(userID, teamID);
    const sortedViolations = this.sortUserViolationsByHighest(swearTypes);
    const highestViolationsMetrics =
      this.getHighestViolationMetrics(swearTypes);
    const legends = this.getViolationsLegends(swearTypes);
    return {
      sortedViolations: sortedViolations,
      highestViolationsMetrics: highestViolationsMetrics,
      legends: legends,
    };
  }

  /**
   *
   * @private
   * @param {*} swearTypes
   * @returns
   */
  static getViolationsLegends(swearTypes) {
    const result = {};
    for (let swearTypeID in swearTypes) {
      result[swearTypeID] = swearTypeID;
    }

    return result;
  }

  /**
   * @private
   */
  static getHighestViolationMetrics(swearTypes) {
    let count = 0;
    let swearType;
    for (let swearTypeID in swearTypes) {
      let currentCount = Object.values(swearTypes[swearTypeID]).length;
      for (let reportID in swearTypes[swearTypeID]) {
        if (currentCount > count) {
          count = currentCount;
          swearType = swearTypes[swearTypeID][reportID]["swearType"];
        }
      }
    }
    if (!swearType) return null;

    return {
      highestViolationCount: count,
      swearType: swearType,
    };
  }

  /**
   * @private
   * @param {*} swearTypes
   * @returns {[{violationName:string,count:number}]}
   */
  static sortUserViolationsByHighest(swearTypes) {
    if (!swearTypes) return null;
    let swears = [];
    for (let swearTypeID in swearTypes) {
      let currentCount = Object.values(swearTypes[swearTypeID]).length;

      swears.push({
        username: swearTypeID,
        violationType: swearTypeID,
        countPerViolation: currentCount,
      });
    }

    return swears;
  }
}
