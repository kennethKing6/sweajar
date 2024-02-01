import { FirebaseDatabase } from "../shared/firebase/firebaseDatabase";
import { SignedInUser } from "./SignedInUser";


const TEAMS_PATH ="/teams";

export class Teams{


    static async createTeam(teamName){
        if(!SignedInUser.user.userID)throw new Error("Unauthorized")
        const teamID =  FirebaseDatabase.generateUniqueKey()
        await FirebaseDatabase.writeDataToDB({
            queryPath:`/${TEAMS_PATH}/${teamID}`,
            data:{
                admin:SignedInUser.user.userID,
                teamName:teamName,
                teamMembers:{},
                teamID:teamID
            }
        })
       
    }

    /**
     * 
     * @param {string} teamID 
     * @returns {{teamName:string,teamMembers:{},teamID:string,admin:string}}
     */
    static async getTeam(teamID){
        return await FirebaseDatabase.readDataFromDB({
            queryPath:`/${TEAMS_PATH}/${teamID}`
        })
    }

    static async addTeamMember(email,teamID){
        if(!teamID) throw new Error("Unauthorized")
        
        const team = await this.getTeam(teamID)
        if(!team) throw new Error("Unauthorized")
        if(!team.admin !== SignedInUser.user.userID)throw new Error("Unauthorized")

        const data = team.teamMembers
        data[`${email}`] = email;
        await FirebaseDatabase.updateDataOnDB({
            newData:data,
            queryPath:`/${TEAMS_PATH}/${teamID}/teamMembers`
        })
       
    }


    static async deleteTeamMember(email,teamID){
        if(!teamID) throw new Error("Unauthorized")
        
        const team = await this.getTeam(teamID)
        if(!team) throw new Error("Unauthorized")
        if(!team.admin !== SignedInUser.user.userID)throw new Error("Unauthorized")

        const data = team.teamMembers
        delete data[`${email}`] 
        await FirebaseDatabase.updateDataOnDB({
            newData:data,
            queryPath:`/${TEAMS_PATH}/${teamID}/teamMembers`
        })
       
    }

     /**
     * Extract the list of the teams this signed in user is part of whether
     * they have been added to or created. Ordered by teams they have been added to first
     * @returns {Promise <[{teamName:string,teamMembers:{},teamID:string,admin:string}]>}
     */
    static async getTeams(){
        const result = []
       const participatingTeams = await FirebaseDatabase.readDataFromDByEquality({
            queryPath:`/${TEAMS_PATH}`,
            equalValue:`${SignedInUser.user.email}`,
            queryKey:`${SignedInUser.user.email}`
        })
        if(participatingTeams)result.push([...participatingTeams])

        const ownTeams = await FirebaseDatabase.readDataFromDByEquality({
            queryPath:`/${TEAMS_PATH}`,
            equalValue:'admin',
            queryKey:`${SignedInUser.user.email}`
        })
        if(ownTeams)result.push([...ownTeams])


        return result
    }
}