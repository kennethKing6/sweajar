import { Teams } from "../model/Teams";

export class TeamManagementManagerController {
  static async deleteTeamMember(teamMemberEmail, teamID) {
    // Validate the input fields
    if (!teamMemberEmail) {
      alert("Please enter an email for the team member to be deleted.");
      return;
    }
    // Delete a team member
    const removeTeamMember = await Teams.deleteTeamMember(
      teamMemberEmail,
      teamID,
    );
    return removeTeamMember;
  }
}
