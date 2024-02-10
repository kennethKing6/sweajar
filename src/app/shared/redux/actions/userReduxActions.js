import { User } from '@/app/model/User'
import { reduxStore } from '../reduxStore'
import * as type from '../types/userTypes'
export class UserReduxActions{

    /**
     * 
     * @param {User} user 
     */
    static setSignedInUser(user){
        if(!user){
            reduxStore.dispatch({
                type:type.SAVE_SIGNED_IN_USER,
                data:null
            })
        }else if(user instanceof User){
            reduxStore.dispatch({
                type:type.SAVE_SIGNED_IN_USER,
                data:JSON.stringify(user)
            })
        }else{
            reduxStore.dispatch({
                type:type.SAVE_SIGNED_IN_USER,
                data:null
            }) 
            throw new Error("Please provide a user object")
        }
       
    }
}