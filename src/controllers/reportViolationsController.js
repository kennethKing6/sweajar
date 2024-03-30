import { Report } from "../model/Report";
import { SignedInUser } from "../model/SignedInUser";
import { User } from "../model/User";

export class ReportViolationsController {
  /**
   * @private
   * @type {{}}
   */
  static tempSelectedReports = {};

  /**
   * @private
   * @type {{}}
   */
  static tempSelectedUsers = {};

  /**
   *
   * @param {object} query
   * @param {string} query.name
   * @param {string} query.description
   * @param {string} query.swearTypeID
   * @param {"minor"|"major"|"medium"} query.levels
   */
  static selectSwearType(query) {
    if (!this.tempSelectedReports[query.name]) {
      this.tempSelectedReports[query.name] = query;
    } else {
      delete this.tempSelectedReports[query.name];
    }
  }

  static getSelectedReports() {
    return this.tempSelectedReports;
  }

  static getSelectedSwearTypeCount() {
    if (!this.tempSelectedReports) return 0;
    const count = Object.keys(this.tempSelectedReports).length;
    return count;
  }

  static getSelectedSweartypes() {
    return Object.values(this.tempSelectedReports);
  }
  /**
   *
   * @param {User} user
   */
  static selectUser(user) {
    if (!this.tempSelectedUsers[user.userID]) {
      this.tempSelectedUsers[user.userID] = user;
    } else {
      delete this.tempSelectedUsers[user.userID];
    }
  }

  static hasSwearTypes() {
    return Object.values(this.tempSelectedReports).length > 0;
  }

  static hasUsersToReport() {
    return Object.values(this.tempSelectedUsers).length > 0;
  }
  static hasSelectedTeam() {
    return SignedInUser.user.teamID;
  }

  static async reportUsers() {
    if (!SignedInUser.user.teamID) {
      throw new Error("Please select a team to report to");
    }

    if (Object.keys(this.tempSelectedUsers).length === 0) {
      throw new Error("Please select someone to report");
    }

    if (Object.keys(this.tempSelectedReports).length === 0) {
      throw new Error("Please select violations");
    }

    const promises = [];

    for (let key in this.tempSelectedReports) {
      for (let userID in this.tempSelectedUsers) {
        promises.push(
          Report.reportThisUser({
            reportedID: userID,
            teamID: SignedInUser.user.teamID,
            swearTypeID: this.tempSelectedReports[key].swearTypeID,
            swearType: this.tempSelectedReports[key],
          }),
        );
      }
    }
    await Promise.all(promises);

    this.tempSelectedReports = {};
    this.tempSelectedUsers = {};
  }
}
