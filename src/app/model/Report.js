export class Report{

    /**@type {string} */
    reporterID;

     /**@type {string} */
     reportedID;

    /**@type {string} */
    companyID; 

     /**@type {string} */
     typeID;

      /**@type {EpochTimeStamp} */
      dateEntry;

      /**@type {string} */
      companyID;

     /**
      * 
      * @param {object} reportType 
      * @param {string} reportType.reporterID
      * @param {string} reportType.reportedID
      * @param {string} reportType.companyID
      * @param {string} reportType.typeID
      * @param {EpochTimeStamp} reportType.dateEntry
      * @param {string} reportType.companyID
      */
    constructor(reportType){
        this.reportedID= reportType.reportedID;
        this.reporterID = reportType.reporterID;
        this.companyID = reportType.companyID;
        this.dateEntry = reportType.dateEntry;
        this.typeID = reportType.typeID;
        this.companyID = reportType.companyID
    }
}