export class Report {
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
}
