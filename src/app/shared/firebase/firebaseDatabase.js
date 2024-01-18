import {child, get, getDatabase, push, ref, remove, set, update} from 'firebase/database'
import { FirebaseConfigs } from './FirebaseConfig'

const db = getDatabase(FirebaseConfigs.firebaseApp)

export class FirebaseDatabase{

    /**
     * Read data from the database at a specific path
     * @param {object} query 
     * @param {string} query.queryPath
     * @param {any} data
     */
    static async readDataFromDB(query){
       const snapshot = await get(child(query.queryPath))
       return snapshot.val()
    }

    /**
     * Write new data at path to the database
     * @param {object} query 
     * @param {string} query.queryPath
     *  @param {object} query.data
     */
     static async writeDataToDB(query){
        console.log(JSON.stringify(query))
       await set(ref(db,query.queryPath),query.data)
     }

    /**
     * Delete data at path from the database
     * @param {object} query 
     * @param {string} query.queryPath
     */
      static async deleteDataFromDB(query){
        await remove(ref(db,query.queryPath))
      }

    /**
     * Update data at specific path on the database
     * @param {object} query 
     * @param {string} query.queryPath
     * @param {object} query.newData
     */
       static async updateDataOnDB(query){
        await update(ref(db,query.queryPath),query.newData)
      }
    
     /**
     * Push data at specific path on the database with a unique data ID
     * @param {object} query 
     * @param {string} query.queryPath
     * @param {object} query.newData
     */
     static async pushDataToDB(query){
           const newPostKey =  push(child(ref(db),query.queryPath)).key
        await this.updateDataOnDB({
            newData:query.newData,
            queryPath:`${query.queryPath}/${newPostKey}`
        })
      }

}