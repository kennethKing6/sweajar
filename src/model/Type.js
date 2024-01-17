export class SwearType{

    /**@type {string} */
    typeID;

     /**@type {string} */
     name;

    /**@type {"minor"|"major"|"medium"} */
    levels; 

     /**@type {string} */
     description;

     /**@type {string} */
     companyID;


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
        this.description= swearType.description;
        this.levels = swearType.levels;
        this.name = swearType.name;
        this.typeID = swearType.typeID
        this.companyID = swearType.companyID
    }
}