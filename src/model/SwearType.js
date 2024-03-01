import { FirebaseDatabase } from "../shared/firebase/firebaseDatabase";
import { SignedInUser } from "./SignedInUser";

const SWEAR_TYPE_PATH = "/swearType";

export class SwearType {
  /**@type {string} */
  name = "";

  /**@type {"minor"|"major"|"medium"} */
  levels = "minor";

  /**@type {string} */
  description;

  /**@type {string} */
  teamID = "";

  /**
   * @private
   * @type {{}}
   */
  static userToReportID;

  /**
   * @private
   * @type {string}
   */
  static teamToReportID;

  /**
   * @private
   * @type {string}
   */
  swearTypeID;

  /**
   *
   * @param {object} swearType
   * @param {string} swearType.name
   * @param {string} swearType.description
   * @param {"minor"|"major"|"medium"} swearType.levels
   * @param {string} swearType.teamID
   * @param {string} swearType.userID
   * @param {string} swearType.swearTypeID
   */
  constructor(swearType) {
    this.swearTypeID = swearType.swearTypeID;
    this.description = swearType.description || "";
    this.levels = swearType.levels || "minor";
    this.name = swearType.name;
    this.teamID = swearType.teamID;
    this.userID = swearType.userID || "";
  }

  /**
   *
   * @param {object} query
   * @param {string} query.name
   * @param {string} query.description
   * @param {string} query.teamID
   * @param {"minor"|"major"|"medium"} query.levels
   * @returns {SwearType}
   */
  static async createNewSwearType(query) {
    if (!query.name) throw new Error("Please provide a name for your team");

    if (!query.teamID) throw new Error("Please select a team to report to");

    const type = new SwearType({
      description: query.description,
      levels: query.levels,
      name: query.name,
      teamID: query.teamID,
      swearTypeID: query.name,
    });

    await FirebaseDatabase.writeDataToDB({
      queryPath: `${SWEAR_TYPE_PATH}/${query.teamID}/${query.name}`,
      data: type,
    });
    return type;
  }

  /**
   *
   * @param {string} teamID
   * @returns {Promise<[SwearType]>}
   */
  static async getSwearTypesByCompany(teamID) {
    const result = await FirebaseDatabase.readDataFromDB({
      queryPath: `${SWEAR_TYPE_PATH}/${teamID}/`,
    });
    return result ? Object.values(result) : [];
  }

  static async getSwearTypeDetails(teamID, swearTypeID) {
    return await FirebaseDatabase.readDataFromDB({
      queryPath: `${SWEAR_TYPE_PATH}/${teamID}/${swearTypeID}`,
    });
  }
}
