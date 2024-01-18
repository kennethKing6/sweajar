import { FirebaseDatabase } from "../shared/firebase/firebaseDatabase";

const REPORT_PATH = "/reports";

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

     /**
      * 
      * @param {object} query 
      * @param {string} query.reporterID
      * @param {string} query.reportedID
      * @param {string} query.companyID
      * @param {string} query.typeID
      * @param {EpochTimeStamp} query.dateEntry
      * @param {string} query.companyID
      */
    static async reportThisUser(query){
        const report = new Report(query)
        await FirebaseDatabase.pushDataToDB({
            newData:report,
            queryPath:REPORT_PATH,
        })
        return report
    }

    /**
     * 
     * @param {string} userID 
     * @returns {[Report]}
     */
    static async getReportedUserByUserID(userID){
      const result = await FirebaseDatabase.readDataFromDByEquality({
        equalValue:userID,
        queryKey:'reportedID',
        queryPath:REPORT_PATH
      }) 
      return Object.values(result)
    }
}