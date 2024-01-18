import { FirebaseDatabase } from "../shared/firebase/firebaseDatabase";

const SWEAR_TYPE_PATH = '/swearTypes';

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
     companyID = "";


     /**
      * 
      * @param {object} swearType 
      * @param {string} swearType.typeID
      * @param {string} swearType.name
      * @param {string} swearType.description
      * @param {"minor"|"major"|"medium"} swearType.levels
      * @param {string} swearType.companyID
      */
    constructor(swearType){
        this.description= swearType.description || "";
        this.levels = swearType.levels || "minor";
        this.name = swearType.name || "";
        this.typeID = swearType.typeID || "";
        this.companyID = swearType.companyID || ""
    }

    /**
     * 
     * @param {object} query 
     * @param {string} query.typeID
     * @param {string} query.name
     * @param {string} query.description
     * @param {"minor"|"major"|"medium"} query.levels
     * @param {string} query.companyID
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
     * @param {string} companyID 
     * @returns {[SwearType]}
     */
    static async getSwearTypesByCompany(companyID){
        const result = await FirebaseDatabase.readDataFromDByEquality({
            equalValue:companyID,
            queryKey:"companyID",
            queryPath:SWEAR_TYPE_PATH,
        })
        return Object.values(result)
    }
}