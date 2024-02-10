import { FirebaseDatabase } from "../shared/firebase/firebaseDatabase";
import { SignedInUser } from "./SignedInUser";
import { SwearType } from "./SwearType";
import { User } from "./User";

const REPORT_PATH = "/reports"

export class Report{

    /**@type {string} */
    reporterID;

     /**@type {string} */
     reportedID;

    /**@type {string} */
    teamID; 

     /**@type {string} */
     typeID;

      /**@type {EpochTimeStamp} */
      dateEntry;

      /**@type {string} */
      teamID;

     /**
      * 
      * @param {object} reportType 
      * @param {string} reportType.reporterID
      * @param {string} reportType.reportedID
      * @param {string} reportType.teamID
      * @param {string} reportType.typeID
      * @param {EpochTimeStamp} reportType.dateEntry
      * @param {string} reportType.teamID
      */
    constructor(reportType){
        this.reportedID= reportType.reportedID;
        this.reporterID = reportType.reporterID;
        this.teamID = reportType.teamID;
        this.dateEntry = reportType.dateEntry;
        this.typeID = reportType.typeID;
        this.teamID = reportType.teamID
    }

     /**
      * 
      * @param {object} query 
      * @param {string} query.reportedID
      * @param {string} query.teamID
      * @param {string} query.typeID
      * @param {string} query.teamID
      * @param {string} query.swearTypeID
      */
    static async reportThisUser(query){
        const report = new Report(query)
        await FirebaseDatabase.pushDataToDB({
            newData:{
              ...query,
              dateEntry: Date.now(),
              reporterID:SignedInUser.userID,
            },
            queryPath:`${REPORT_PATH}/${query.teamID}/${query.reportedID}/${query.swearTypeID}`,
        })
        return report
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
    static async getReportedUserByUserID(userID,teamID){
      const result = await FirebaseDatabase.readDataFromDB({
        queryPath:`${REPORT_PATH}/${teamID}/${userID}`
      })
      return result
    }

    static async getUsersInTeam(teamID){
      const result = await FirebaseDatabase.readDataFromDB({
        queryPath:`${REPORT_PATH}/${teamID}`
      })
      return Object.values(result)
    }

    static async getTheHighestViolationByUserID(userID,teamID){
     const swearTypes = await this.getReportedUserByUserID(userID,teamID)
     let count  = 0;
     let swearType;
      for(let swearTypeID in swearTypes){
          let currentCount = Object.values(swearTypes[swearTypeID]).length
          if(currentCount > count){
            count = currentCount;
            swearType = swearTypeID
          }
      }

      if(!swearType) return null

      const result = await SwearType.getSwearTypeDetails(swearType)
      return {
        highestViolationCount:count,
        swearType:result
      }
    }
}

