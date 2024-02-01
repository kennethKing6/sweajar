import { FirebaseDatabase } from "../shared/firebase/firebaseDatabase";

const SWEAR_TYPE_PATH = '/swearType';

export class SwearType{

    /**@type {string} */
    typeID = "";

     /**@type {string} */
     name = "";

    /**@type {"minor"|"major"|"medium"} */
    levels = "minor"; 

     /**@type {string} */
     description;

     /**@type {string} */
     teamID = "";


     /**
      * 
      * @param {object} swearType 
      * @param {string} swearType.typeID
      * @param {string} swearType.name
      * @param {string} swearType.description
      * @param {"minor"|"major"|"medium"} swearType.levels
      * @param {string} swearType.teamID
      */
    constructor(swearType){
        this.description= swearType.description || "";
        this.levels = swearType.levels || "minor";
        this.name = swearType.name || "";
        this.typeID = swearType.typeID || "";
        this.teamID = swearType.teamID || ""
    }

    /**
     * 
     * @param {object} query 
     * @param {string} query.typeID
     * @param {string} query.name
     * @param {string} query.description
     * @param {"minor"|"major"|"medium"} query.levels
     * @param {string} query.teamID
     * @returns {SwearType} 
     */
    static async createNewSwearType(query){
        const type = new SwearType(query)
        const keyValueSwearType = {}
        keyValueSwearType[type.name] = type

        await FirebaseDatabase.writeDataToDB({
            queryPath:SWEAR_TYPE_PATH,
            data:keyValueSwearType
        })
        return type
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
        console.log(result)
        return result?Object.values(result):[]
    }
}