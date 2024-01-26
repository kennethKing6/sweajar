import { FirebaseDatabase } from "../shared/firebase/firebaseDatabase";

export class User {

    /**@type {string} */
    username = '';

    /**@type {string} */
    profilePicture;

     /**@type {string} */
     employeedID = '';

    /**@type {string} */
    firstName = '';

     /**@type {string} */
     lastName = '';

    /**@type {string} */
    companyID = '';

    /**@type {string} */
    userID = '';

    /**
     * 
     * @param {object} user 
     * @param {string} user.username
     * @param {string} user.profilePicture
     * @param {string} user.employeedID
     * @param {string} user.firstName
     * @param {string} user.lastName
     * @param {string} user.companyID
     * @param {string} user.userID
     */
    constructor(user){
        this.companyID = user.companyID;
        this.employeedID = user.employeedID
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.profilePicture = user.profilePicture || "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        this.username = user.username;
        this.userID = user.userID
    }
    /**
     * 
     * @param {object} query 
     * @param {string} query.username
     * @param {string} query.profilePicture
     * @param {string} query.employeedID
     * @param {string} query.companyID
     * @param {string} query.firstName
     * @param {string} query.lastName
     * @param {string} query.username
     * @param {string} query.userID
     */
    static async createUser(query){
        const user = new User({
            companyID:query.companyID,
            employeedID:query.employeedID,
            firstName:query.firstName,
            lastName:query.lastName,
            profilePicture:query.profilePicture,
            username:query.username
        })
       await FirebaseDatabase.writeDataToDB({
           queryPath:`/users/${user.userID}`,
           data:user
        })
    }

    static async getUsersByCompanyID(userID,companyID){
       var result = await FirebaseDatabase.readDataFromDByEquality({
        equalValue:userID,
        queryKey: '/userID',
        queryPath:'/users'
       }) 
       result = Object.values(result)[0]
       //check if user requesting is saved under that company
       if(!result)throw new Error("Unauthorized")

       const user = new User(result)

       if(user.companyID !== companyID)throw new Error("UnAuthorized")

       const users = await FirebaseDatabase.readDataFromDByEquality({
        equalValue:companyID,
        queryKey:'companyID',
        queryPath:'/users'
       })
       return Object.values(users)

    }
}