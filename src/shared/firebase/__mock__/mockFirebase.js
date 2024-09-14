jest.mock("firebase/app");
jest.mock("firebase/auth", () => {
  return {
    getAuth: jest.fn(),
    signInAnonymously: jest.fn().mockReturnValue({}),
    signInWithEmailAndPassword: jest.fn().mockReturnValue({}),
    createUserWithEmailAndPassword: jest.fn().mockReturnValue({}),
    signOut: jest.fn().mockReturnValue(),
    onAuthStateChanged: jest.fn().mockReturnValue({}),
  };
});

jest.mock("firebase/database", () => {
  return {
    getDatabase: jest.fn().mockReturnValue({}),
    initializeApp: jest.fn(),
    getProvider: jest.fn(),
    child: jest.fn(),
    equalTo: jest.fn(),
    get: jest.fn(),
    limitToFirst: jest.fn(),
    orderByChild: jest.fn(),
    orderByValue: jest.fn(),
    push: jest.fn(),
    query: jest.fn(),
    ref: jest.fn(),
    remove: jest.fn(),
    set: jest.fn(),
    update: jest.fn(),
    startAt: jest.fn(),
    endAt: jest.fn(),
    val: jest.fn(),
  };
});

jest.mock("../FirebaseConfig", () => {
  return {
    FirebaseConfigs: {
      firebaseApp: jest.fn().mockReturnValue({}),
    },
    getProvider: jest.fn(),
  };
});

const { FirebaseDatabase } = require("../firebaseDatabase");

jest.spyOn(FirebaseDatabase, "getSnapshot").mockReturnValue({});
jest.spyOn(FirebaseDatabase, "getPushKey").mockReturnValue("skdhfds");
