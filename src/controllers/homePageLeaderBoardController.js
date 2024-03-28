import { Report } from "../model/Report";
import { SignedInUser } from "../model/SignedInUser";
import { Teams } from "../model/Teams";

export class HomePageLeaderBoardController {
  /**@private */
  static teamMembers = [];

  static async getAllTeamMembers() {
    try {
      this.teamMembers = await Teams.getTeamMembers(SignedInUser.user.teamID);
      return this.teamMembers;
    } catch (err) {
      return [];
    }
  }

  /**
   * Extracts members that only have a certain violations type
   * @returns {Promise<Array>} this list can contain null|undefined when a team member was not reported under a category
   */
  static async selectAllTeamMembersByViolations(reportType) {
    const result = await this.getAllTeamMembers();
    let selectedMembers = [];
    result.forEach((member) => {
      selectedMembers.push(
        Report.getUserReportsByType(
          SignedInUser.user.teamID,
          member.userID,
          reportType,
        ),
      );
    });
    selectedMembers = await Promise.all(selectedMembers);
    selectedMembers = selectedMembers.map((value) => {
      let data = value ? Object.values(value)[0] : null;
      if (data) {
        data = {
          ...data,
          userID: data["reportedID"],
        };
      }
      return data;
    });
    return selectedMembers;
  }

  static async getReportTypesPerTeam() {
    const filters = await Report.getReportsLegends(SignedInUser.user.teamID);
    return filters ? filters : ["All"];
  }
}
