import {
  child,
  equalTo,
  get,
  getDatabase,
  limitToFirst,
  orderByChild,
  orderByValue,
  push,
  query,
  ref,
  remove,
  set,
  update,
  startAt,
  endAt,
  DataSnapshot,
} from "firebase/database";
import { FirebaseConfigs } from "./FirebaseConfig";

const db = getDatabase(FirebaseConfigs.firebaseApp);
const DEFAULT_PAGINATION = 50;
export class FirebaseDatabase {
  /**
   * Read data from the database at a specific path
   * @param {object} userQuery
   * @param {string} userQuery.queryPath
   */
  static async readDataFromDB(userQuery) {
    const dbRef = ref(db, "/");
    const reference = child(dbRef, userQuery.queryPath);
    const snapshot = await get(reference);
    return this.getSnapshot(snapshot);
  }

  /**
   * Read data from the database by checking equality
   * @param {object} userQuery
   * @param {string} userQuery.queryPath
   * @param {string} userQuery.equalValue
   * @param {string} userQuery.queryKey
   * @param {number} userQuery.resultLimiter
   * @param {any} data
   */
  static async readDataFromDByEquality(userQuery) {
    const reference = ref(db, userQuery.queryPath);
    const equalityQuery = query(
      reference,
      orderByChild(userQuery.queryKey),
      equalTo(userQuery.equalValue),
    );

    const snapshot = await get(equalityQuery);

    return this.getSnapshot(snapshot);
  }

  /**
   * Read data from the database by checking equality
   * @param {object} userQuery
   * @param {string} userQuery.queryPath
   * @param {string} userQuery.equalValue
   * @param {string} userQuery.queryKey
   * @param {any} data
   */
  static async readDataFromRefEquality(userQuery) {
    const reference = ref(db, userQuery.queryPath);
    let equalityQuery = query(
      reference,
      orderByValue(`${userQuery.equalValue}`),
    );

    const snapshot = await get(equalityQuery);

    return this.getSnapshot(snapshot);
  }

  /**
   * Read data from the database by checking equality
   * @param {object} userQuery
   * @param {string} userQuery.queryPath
   * @param {string} userQuery.equalValue
   * @param {string} userQuery.queryKey
   * @param {number} userQuery.resultLimiter
   * @param {string} userQuery.startQueryKey
   * @param {any} userQuery.startQueryValue
   * @param {string} userQuery.endQueryKey
   * @param {any} userQuery.endQueryValue
   */
  static async readDataFromDByEqualityStartnEnd(userQuery) {
    const reference = ref(db, userQuery.queryPath);
    const equalityQuery = query(
      reference,
      orderByChild(userQuery.queryKey),
      equalTo(userQuery.equalValue),
      limitToFirst(
        userQuery.resultLimiter ? userQuery.resultLimiter : DEFAULT_PAGINATION,
      ),
      startAt(userQuery.startQueryValue, userQuery.startQueryKey),
      endAt(userQuery.endQueryValue, userQuery.endQueryKey),
    );

    const snapshot = await get(equalityQuery);

    return this.getSnapshot(snapshot);
  }
  /**
   * Read data from the database by checking start time and end time
   * @param {object} userQuery
   * @param {string} userQuery.queryPath
   * @param {string} userQuery.queryKey
   * @param {string} userQuery.startQueryKey
   * @param {any} userQuery.startQueryValue
   * @param {string} userQuery.endQueryKey
   * @param {any} userQuery.endQueryValue
   */
  static async readDataFromDByStartnEnd(userQuery) {
    const reference = ref(db, userQuery.queryPath);
    const equalityQuery = query(
      reference,
      orderByChild(userQuery.queryKey),
      startAt(userQuery.startQueryValue),
      endAt(userQuery.endQueryValue),
    );

    const snapshot = await get(equalityQuery);

    return this.getSnapshot(snapshot);
  }

  /**
   * Read data from the database by checking equality
   * @param {object} userQuery
   * @param {string} userQuery.queryPath
   * @param {string} userQuery.equalValue
   * @param {any} data
   */
  static async readFromDataByQueryValue(userQuery) {
    const reference = ref(db, userQuery.queryPath);
    const equalityQuery = query(reference, orderByValue(userQuery.queryValue));

    const snapshot = await get(equalityQuery);

    return this.getSnapshot(snapshot);
  }

  /**
   * Write new data at path to the database
   * @param {object} userQuery
   * @param {string} userQuery.queryPath
   *  @param {object} userQuery.data
   */
  static async writeDataToDB(userQuery) {
    await set(ref(db, userQuery.queryPath), userQuery.data);
  }

  /**
   * Delete data at path from the database
   * @param {object} userQuery
   * @param {string} userQuery.queryPath
   */
  static async deleteDataFromDB(userQuery) {
    await remove(ref(db, userQuery.queryPath));
  }

  /**
   * Update data at specific path on the database
   * @param {object} userQuery
   * @param {string} userQuery.queryPath
   * @param {object} userQuery.newData
   */
  static async updateDataOnDB(userQuery) {
    await update(ref(db, userQuery.queryPath), userQuery.newData);
  }

  /**
   * Push data at specific path on the database with a unique data ID
   * @param {object} userQuery
   * @param {string} userQuery.queryPath
   * @param {object} userQuery.newData
   */
  static async pushDataToDB(userQuery) {
    const newPostKey = this.getPushKey(
      push(child(ref(db), userQuery.queryPath)),
    );
    await this.writeDataToDB({
      queryPath: `${userQuery.queryPath}/${newPostKey}`,
      data: userQuery.newData,
    });
  }

  /**
   *
   * @param {string} path
   * @returns {string}
   */
  static generateUniqueKey(path) {
    return this.getPushKey(push(child(ref(db), path)));
  }

  static getPushKey(pushData) {
    if (!pushData) throw new Error("pushData is required");
    const { key } = pushData;
    return key;
  }

  /**
   * @param {*} snapshot
   * @returns {DataSnapshot}
   */
  static getSnapshot(snapshot) {
    if (!snapshot) throw new Error("pushData is required");
    return snapshot.val();
  }
}
