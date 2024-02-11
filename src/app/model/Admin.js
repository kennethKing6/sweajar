export class Admin {
  /**@type {string} */
  companyName;

  /**@type {string} */
  companyLogoUrl;

  /**@type {string} */
  teamID;

  /**
   *
   * @param {object} admin
   * @param {string} admin.companyName
   * @param {string} admin.companyLogoUrl
   * @param {string} admin.teamID
   */
  constructor(admin) {
    this.teamID = admin.teamID;
    this.companyName = admin.companyName;
    this.companyLogoUrl = admin.companyLogoUrl;
  }

  //TODO: Admin can add a user/employee
  //TODO: Admin can create a company
}
