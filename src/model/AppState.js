import { SignedInUser } from "./SignedInUser";

/**
 * This class is responsible for storing the state of the app while
 * the app is running
 */
export class AppState {
  static selectedProfile = SignedInUser.user;
  static selectUserID;
}
