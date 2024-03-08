export class SwearType {
  /**
   *
   * @param {object} swearType
   * @param {string} swearType.name
   * @param {string} swearType.description
   * @param {"minor"|"major"|"medium"} swearType.levels
   * @param {string} swearType.teamID
   * @param {string} swearType.userID
   * @param {string} swearType.swearTypeID
   */
  constructor(swearType) {
    this.swearTypeID = swearType.swearTypeID;
    this.description = swearType.description || "";
    this.levels = swearType.levels || "minor";
    this.name = swearType.name;
    this.teamID = swearType.teamID;
    this.userID = swearType.userID || "";
  }
}
