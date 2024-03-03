import { FirebaseConfigs } from "./FirebaseConfig";
import {
  signInAnonymously,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const auth = FirebaseConfigs.firebaseAuth;
let userAuthStateUnsubscribe;

export class FirebaseAuth {
  static async signUserAnonymously() {
    return await signInAnonymously(auth);
  }
  static async signInUser(email, password) {
    return await signInWithEmailAndPassword(auth, email, password);
  }

  static async signUserUp(email, password) {
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  static async signOutUser() {
    return await signOut(auth);
  }

  /**
   *
   * @callback userSignedInCallback
   * @returns {User|null}
   *
   */
  /**
   *
   * @param {userSignedInCallback} callback
   */
  static async listenForUserAuthState(callback) {
    userAuthStateUnsubscribe = onAuthStateChanged(auth, (user) => {
      callback(user);
    });
  }

  static unsubscribeUserStateListener() {
    if (userAuthStateUnsubscribe) userAuthStateUnsubscribe();
  }
}
