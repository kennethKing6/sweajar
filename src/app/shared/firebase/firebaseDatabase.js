import {child, equalTo, get, getDatabase, orderByChild, push,query, ref, remove, set, update} from 'firebase/database'
import { FirebaseConfigs } from './FirebaseConfig'
import firebase from 'firebase/database'

const db = getDatabase(FirebaseConfigs.firebaseApp)
export class FirebaseDatabase{

    /**
     * Read data from the database at a specific path
     * @param {object} userQuery 
     * @param {string} userQuery.queryPath
     */
    static async readDataFromDB(userQuery){
      const dbRef = ref(db,'/')
      const reference = child(dbRef,userQuery.queryPath)
       const snapshot = await get(reference)
       return snapshot.val()
    }

     /**
     * Read data from the database by checking equality
     * @param {object} userQuery 
     * @param {string} userQuery.queryPath
     * @param {string} userQuery.equalValue
     * @param {string} userQuery.queryKey
     * @param {any} data
     */
     static async readDataFromDByEquality(userQuery){
      const reference = ref(db,userQuery.queryPath)
      const equalityQuery = query(reference,orderByChild(userQuery.queryKey),equalTo(userQuery.equalValue))

      const snapshot = await get(equalityQuery )

      return snapshot.val()
   }

    /**
     * Write new data at path to the database
     * @param {object} userQuery 
     * @param {string} userQuery.queryPath
     *  @param {object} userQuery.data
     */
     static async writeDataToDB(userQuery){
       await set(ref(db,userQuery.queryPath),userQuery.data)
     }

    /**
     * Delete data at path from the database
     * @param {object} userQuery 
     * @param {string} userQuery.queryPath
     */
      static async deleteDataFromDB(userQuery){
        await remove(ref(db,userQuery.queryPath))
      }

    /**
     * Update data at specific path on the database
     * @param {object} userQuery 
     * @param {string} userQuery.queryPath
     * @param {object} userQuery.newData
     */
       static async updateDataOnDB(userQuery){
        await update(ref(db,userQuery.queryPath),userQuery.newData)
      }
    
     /**
     * Push data at specific path on the database with a unique data ID
     * @param {object} userQuery 
     * @param {string} userQuery.queryPath
     * @param {object} userQuery.newData
     */
     static async pushDataToDB(userQuery){
           const newPostKey =  push(child(ref(db),userQuery.queryPath)).key
        await this.updateDataOnDB({
            newData:userQuery.newData,
            queryPath:`${userQuery.queryPath}/${newPostKey}`
        })
      }

      /**
       * 
       * @param {string} path 
       * @returns {string}
       */
      static generateUniqueKey(path){
        return  push(child(ref(db),path)).key
      }

}