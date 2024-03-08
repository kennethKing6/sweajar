import { FirebaseAuth } from "../shared/firebase/firebaseAuth";
import { FirebaseDatabase } from "../shared/firebase/firebaseDatabase";
import { UserReduxActions } from "../shared/redux/actions/userReduxActions";
import { AppState } from "./AppState";
import { SignedInUser } from "./SignedInUser";

export class User {
  /**@type {string} */
  profilePicture;

  /**@type {string} */
  firstName = "";

  /**@type {string} */
  lastName = "";

  /**@type {string} */
  teamID = "";

  /**@type {string} */
  userID = "";

  /**@type {string} */
  email = "";

  /**
   *
   * @param {object} user
   * @param {string} user.profilePicture
   * @param {string} user.firstName
   * @param {string} user.lastName
   * @param {string} user.teamID
   * @param {string} user.userID
   * @param {string} user.email
   */
  constructor(user) {
    this.teamID = user.teamID || "";

    if (!user["firstName"]) throw new Error("First name required");
    this.firstName = user.firstName;

    if (!user["lastName"]) throw new Error("Last name required");
    this.lastName = user.lastName;

    this.userID = user.userID || "";

    if (!user["email"]) throw new Error("Email required");
    this.email = user.email;

    try {
      this.profilePicture =
        user.profilePicture ||
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    } catch (err) {}
  }
  /**
   *
   * @param {object} query
   * @param {string} query.profilePicture
   * @param {string} query.teamID
   * @param {string} query.firstName
   * @param {string} query.lastName
   * @param {string} query.userID
   * @param {string} query.email
   * @param {string} query.password
   */
  static async createAccount(query) {
    let user = new User({
      teamID: query.teamID,
      firstName: query.firstName,
      lastName: query.lastName,
      profilePicture: query.profilePicture,
      email: query.email,
      userID: "",
    });
    const createdUserCredential = await FirebaseAuth.signUserUp(
      query.email,
      query.password,
    );
    user = new User({
      teamID: query.teamID,
      firstName: query.firstName,
      lastName: query.lastName,
      profilePicture: query.profilePicture,
      email: query.email,
      userID: createdUserCredential.user.uid,
    });
    await FirebaseAuth.signOutUser();

    await FirebaseDatabase.writeDataToDB({
      queryPath: `/users/${user.userID}`,
      data: user,
    });
  }

  static async signIn(email, password) {
    const userCredentials = await FirebaseAuth.signInUser(email, password);
    const result = await FirebaseDatabase.readDataFromDB({
      queryPath: `/users/${userCredentials.user.uid}`,
    });

    SignedInUser.user = this.createUserInstance(result);
    UserReduxActions.setSignedInUser(SignedInUser.user);
    AppState.selectedProfile = SignedInUser.user;
  }

  static async signOut() {
    await FirebaseAuth.signOutUser();
    SignedInUser.user = null;
    AppState.selectedProfile = null;
    UserReduxActions.setSignedInUser(null);
  }

  static async updateCurrentTeam(teamID) {
    if (!SignedInUser.user) {
      await this.signOut();
      return;
    }

    await FirebaseDatabase.writeDataToDB({
      data: teamID,
      queryPath: `/users/${SignedInUser.user.userID}/teamID`,
    });
    SignedInUser.user.teamID = teamID;
    AppState.selectedProfile = SignedInUser.user;
    UserReduxActions.setSignedInUser(SignedInUser.user);
  }

  static async getUsersByteamID(userID, teamID) {
    if (userID && teamID) {
      var result = await FirebaseDatabase.readDataFromDByEquality({
        equalValue: userID,
        queryKey: "/userID",
        queryPath: "/users",
      });
      result = Object.values(result)[0];
      //check if user requesting is saved under that company
      if (!result) throw new Error("Unauthorized");

      const user = this.createUserInstance(result);

      if (user.teamID !== teamID) throw new Error("Unauthorized");

      const users = await FirebaseDatabase.readDataFromDByEquality({
        equalValue: teamID,
        queryKey: "teamID",
        queryPath: "/users",
      });
      return Object.values(users);
    }

    return [];
  }

  /**
   *
   * @param {string} userID
   */
  static async getUserByID(userID) {
    const user = await FirebaseDatabase.readDataFromDB({
      queryPath: `/users/${userID}`,
    });
    const createdUser = new User(user);
    UserReduxActions.setSignedInUser(createdUser);
    return user;
  }

  /**
   *
   * @param {string} email
   * @returns {User | null}
   */
  static async getUserByEmail(email) {
    const data = await this.readUserFirebaseData("email", email);
    let result;
    for (let key in data) {
      result = data[key];
      if (!result) break;
    }
    UserReduxActions.setSignedInUser(this.createUserInstance(result));

    return result;
  }

  static listenForUserState(callback) {
    FirebaseAuth.listenForUserAuthState(async (user) => {
      if (user) {
        const result = await FirebaseDatabase.readDataFromDB({
          queryPath: `/users/${user.uid}`,
        });
        if (result) {
          SignedInUser.user = this.createUserInstance(result);
          AppState.selectedProfile = SignedInUser.user;
          UserReduxActions.setSignedInUser(this.createUserInstance(result));
          callback(user);
        } else {
          callback(null);
          UserReduxActions.setSignedInUser(null);
        }
      } else {
        callback(null);
        UserReduxActions.setSignedInUser(null);
      }
    });
  }

  /**
   *
   * @param {object} user
   */
  static createUserInstance(user) {
    return new User(user);
  }

  static async readUserFirebaseData(queryKey, equalValue) {
    return await FirebaseDatabase.readDataFromDByEquality({
      equalValue: equalValue,
      queryKey: queryKey,
      queryPath: "/users",
    });
  }
}
