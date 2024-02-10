import { FirebaseDatabase } from "../shared/firebase/firebaseDatabase";
import { SignedInUser } from "./SignedInUser";

const SWEAR_TYPE_PATH = '/swearType';

export class SwearType{

     /**@type {string} */
     name = "";

    /**@type {"minor"|"major"|"medium"} */
    levels = "minor"; 

     /**@type {string} */
     description;

     /**@type {string} */
     teamID = "";

     /**
      * @private
      * @type {{}}
      */
     static tempSelectedReports = {}

     /**
      * @private
      * @type {string}
      */
     static userToReportID

     /**
      * @private
      * @type {string}
      */
     static teamToReportID;

     /**
      * @private
      * @type {string}
      */
     swearTypeID


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
    constructor(swearType){
        this.swearTypeID = swearType.swearTypeID
        this.description= swearType.description || "";
        this.levels = swearType.levels || "minor";
        this.name = swearType.name;
        this.teamID = swearType.teamID;
        this.userID = swearType.userID || "";
    }

    /**
     * 
     * @param {object} query 
     * @param {string} query.name
     * @param {string} query.description
     * @param {string} query.teamID
     * @param {"minor"|"major"|"medium"} query.levels
     * @returns {SwearType} 
     */
    static async createNewSwearType(query){
        if(!query.name)throw new Error("Please provide a name for your team")

        if(!query.teamID)throw new Error("Please select a team to report to")

        const swearTypeID = FirebaseDatabase.generateUniqueKey(SWEAR_TYPE_PATH)
        const type = new SwearType({
            description:query.description,
            levels:query.levels,
            name:query.name,
            teamID: query.teamID,
            swearTypeID:swearTypeID,
        })
       
        await FirebaseDatabase.writeDataToDB({
            queryPath:`${SWEAR_TYPE_PATH}/${swearTypeID}`,
            data:type
        })
        return type
    }


    static async reportSelectedSwearTypes(){


            if(!this.teamToReportID)throw new Error("Please select a team to report to")
    
            if(!this.userToReportID)throw new Error("Please select someone to report")
    
            const promises = [];
    
            for(let key in this.tempSelectedReports){
                const currentSwearType = this.tempSelectedReports[key]
                const type = new SwearType({
                    description:currentSwearType.description,
                    levels:currentSwearType.level,
                    name:currentSwearType.name,
                    teamID: this.teamToReportID,
                    userID:this.userToReportID
        
                })
               promises.push( FirebaseDatabase.writeDataToDB({
                queryPath:SWEAR_TYPE_PATH,
                data:type
            }))
            }
            try{if(promises)await Promise.all(promises)}catch(err){}

            this.teamToReportID = null;
            this.tempSelectedReports = {};
            this.userToReportID = null
        }
    

     /**
     * 
     * @param {object} query 
     * @param {string} query.name
     * @param {string} query.description
     * @param {"minor"|"major"|"medium"} query.levels
     * @returns {SwearType} 
     */
    static selectReport(query){
        if(!this.tempSelectedReports[query.name]){
            this.tempSelectedReports[query.name] = {
                name:query.name,
                description:query.description,
                levels:query.levels
            }
        }else{
            delete this.tempSelectedReports[query.name]
        }
        
    }

    static selectuserToReportID(userID){
        this.userToReportID = userID
    }

    static selectteamToReportID(teamID){
        this.teamToReportID = teamID
    }

    /**
     * 
     * @param {string} teamID 
     * @returns {Promise<[SwearType]>}
     */
    static async getSwearTypesByCompany(teamID){
        const result = await FirebaseDatabase.readDataFromDByEquality({
            equalValue:teamID,
            queryKey:"teamID",
            queryPath:SWEAR_TYPE_PATH,
        })
        return result?Object.values(result):[]
    }

    static hasSwearTypes(){
        return Object.values(this.tempSelectedReports).length > 0
    }

    static async getSwearTypeDetails(swearTypeID){
       return await FirebaseDatabase.readDataFromDB({
            queryPath:`${SWEAR_TYPE_PATH}/${swearTypeID}`
        })
    }
}