// Mock FirebaseConfig.js
jest.mock("./FirebaseConfig", () => ({
  FirebaseConfigs: {
    firebaseAuth: jest.fn(),
  },
}));

// Mock firebase/auth module
jest.mock("firebase/auth", () => ({
  GoogleAuthProvider: jest.fn(),
  signInWithRedirect: jest.fn(),
  signInAnonymously: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(),
  User: jest.fn(),
}));

// Mock FirebaseAuth class
import { FirebaseAuth } from "./firebaseAuth";

describe("FirebaseAuth", () => {
  test("should mock signUserAnonymously", async () => {
    const mockUser = {
      /* mock user object */
    };
    signInAnonymously.mockResolvedValue(mockUser);

    const user = await FirebaseAuth.signUserAnonymously();
    expect(signInAnonymously).toHaveBeenCalledWith(expect.anything());
    expect(user).toEqual(mockUser);
  });

  // test("should mock signInUser", async () => {
  //   const email = "test@example.com";
  //   const password = "password";
  //   const mockUser = {
  //     /* mock user object */
  //   };
  //   signInWithEmailAndPassword.mockResolvedValue(mockUser);

  //   const user = await FirebaseAuth.signInUser(email, password);
  //   expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
  //     expect.anything(),
  //     email,
  //     password,
  //   );
  //   expect(user).toEqual(mockUser);
  // });

  // // Add similar tests for other methods

  // it("should mock listenForUserAuthState", async () => {
  //   const callback = jest.fn();
  //   const unsubscribe = jest.fn();
  //   onAuthStateChanged.mockReturnValue(unsubscribe);

  //   FirebaseAuth.listenForUserAuthState(callback);
  //   expect(onAuthStateChanged).toHaveBeenCalledWith(
  //     expect.anything(),
  //     expect.any(Function),
  //   );

  //   // Simulate user state change
  //   const mockUser = {
  //     /* mock user object */
  //   };
  //   onAuthStateChanged.mock.calls[0][1](mockUser);
  //   expect(callback).toHaveBeenCalledWith(mockUser);

  //   // Unsubscribe test
  //   FirebaseAuth.unsubscribeUserStateListener();
  //   expect(unsubscribe).toHaveBeenCalled();
  // });
});
