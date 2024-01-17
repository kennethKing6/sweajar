export class User {

    /**@type {string} */
    username;

    /**@type {string} */
    profilePicture;

     /**@type {string} */
     employeedID;

    /**@type {string} */
    firstName;

     /**@type {string} */
     lastName;

    /**@type {string} */
    companyID;

    /**
     * 
     * @param {object} user 
     * @param {string} user.username
     * @param {string} user.profilePicture
     * @param {string} user.employeedID
     * @param {string} user.firstName
     * @param {string} user.lastName
     * @param {string} user.companyID
     */
    constructor(user){
        this.companyID = user.companyID;
        this.employeedID = user.employeedID
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.profilePicture = user.profilePicture;
        this.username = user.username
    }
}