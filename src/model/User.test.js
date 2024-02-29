import "../shared/firebase/__mock__/mockFirebase";
import { FirebaseAuth } from "../shared/firebase/firebaseAuth";
import { FirebaseDatabase } from "../shared/firebase/firebaseDatabase";
import "./__mocks__/User";
import { User } from "./User";
import { SignedInUser } from "./SignedInUser";
import { AppState } from "./AppState";

const fakeRawUserData = {
  profilePicture: "profile.jpg",
  lastName: "Doe",
  teamID: "team123",
  userID: "user123",
  email: "john.doe@example.com",
};
const fakeFirebaseCredentials = {
  user: {
    uid: "sdfsdf",
  },
};

const user = new User({
  teamID: "mockedTeamID",
  firstName: "John",
  lastName: "Doe",
  userID: "mockedUserID",
  email: "john.doe@example.com",
});

describe("User constructor", () => {
  it("should mock the User constructor", () => {
    expect(user.teamID).toBe("mockedTeamID");
    expect(user.firstName).toBe("John");
    expect(user.lastName).toBe("Doe");
    expect(user.userID).toBe("mockedUserID");
    expect(user.email).toBe("john.doe@example.com");
    expect(user.profilePicture).toBe(
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    );
  });

  it("should failed the User constructor does not get the required data", () => {
    expect(
      () =>
        new User({
          profilePicture: "profile.jpg",
          lastName: "Doe",
          teamID: "team123",
          userID: "user123",
          email: "john.doe@example.com",
        }),
    ).toThrow("firstName required");
  });
});

beforeEach(() => {
  jest.spyOn(User, "createUserInstance").mockReturnValue(user);
});

describe("User Miscellenous functions", () => {
  it("Create User Object", async () => {
    expect(User.createUserInstance(user)).toMatchObject(user);
  });

  it("Read data from database By Equality", () => {
    const data = {};
    jest
      .spyOn(FirebaseDatabase, "readDataFromDByEquality")
      .mockResolvedValue(data);
    expect(
      User.readUserFirebaseData("teamID", fakeRawUserData.teamID),
    ).resolves.toMatchObject(data);
  });
});

describe("Read User data by email tests", () => {
  it("Get User By user Email when mocked reading data from firebase with equality is undefined", async () => {
    const fakeRawUserData = await User.getUserByEmail("ken@gmail.com");
    expect(fakeRawUserData).toBeUndefined();
  });

  it("Get User By user Email by spying on user data from firebase", async () => {
    const user = { userID: fakeRawUserData }; // result format from firebase database
    jest.spyOn(User, "readUserFirebaseData").mockResolvedValue(user);
    const result = await User.getUserByEmail("ken@gmail.com");
    expect(result).toMatchObject(fakeRawUserData);
  });
});

describe("Sign user in", () => {
  beforeEach(() => {
    jest
      .spyOn(FirebaseAuth, "signInUser")
      .mockResolvedValue(fakeFirebaseCredentials);
    jest
      .spyOn(FirebaseDatabase, "readDataFromDB")
      .mockResolvedValue(fakeRawUserData);
  });

  it("Sign user in by email and password and check that there the function returns nothing", async () => {
    const result = await User.signIn("ken@gmail.com", "password");

    expect(result).toBeUndefined();
  });

  it("Sign user in by email and password and check user states are updated", async () => {
    const result = await User.signIn("ken@gmail.com", "password");

    expect(result).toBeUndefined();
    expect(SignedInUser.user).toMatchObject(user);
    expect(AppState.selectedProfile).toMatchObject(user);
  });
});

describe("Sign user out", () => {
  it("Sign user out and check that there the function returns nothing", async () => {
    const result = await User.signOut();

    expect(result).toBeUndefined();
  });

  it("Sign user out and check user states are updated", async () => {
    const result = await User.signOut();

    expect(result).toBeUndefined();
    expect(SignedInUser.user).toBe(null);
    expect(AppState.selectedProfile).toBe(null);
  });
});

describe("Update user selected team", () => {
  it("Update user teamID when signed in user is not defined", async () => {
    SignedInUser.user = null; // undefined signed
    const result = await User.updateCurrentTeam(user.teamID);

    expect(result).toBeUndefined();
    expect(SignedInUser.user).toBe(null);
    expect(AppState.selectedProfile).toBe(null);
  });

  it("Update user teamID when signed in user is defined", async () => {
    SignedInUser.user = user; // undefined signed
    const result = await User.updateCurrentTeam(user.teamID);

    expect(result).toBeUndefined();
    expect(SignedInUser.user).toBe(user);
    expect(AppState.selectedProfile).toBe(user);
  });
});

describe("Get All Users By Team ID", () => {
  it("List all users in a team", async () => {
    jest
      .spyOn(FirebaseDatabase, "readDataFromDByEquality")
      .mockResolvedValue([fakeRawUserData]);
    jest.spyOn(User, "createUserInstance").mockReturnValue(fakeRawUserData);
    const teamMembers = await User.getUsersByteamID(
      fakeRawUserData.userID,
      fakeRawUserData.teamID,
    );
    expect(teamMembers.length).toBeGreaterThan(0);
  });

  it("Return an empty array when teamID not specified", async () => {
    const result = await User.getUsersByteamID(fakeRawUserData.userID, null);

    expect(result.length).toBe(0);
  });

  it("Return an empty array when userID not specified", async () => {
    const result = await User.getUsersByteamID(null, fakeRawUserData.teamID);

    expect(result.length).toBe(0);
  });

  it("Throw an error if user is not saved under the team", async () => {
    jest
      .spyOn(FirebaseDatabase, "readDataFromDByEquality")
      .mockResolvedValue([]);
    jest.spyOn(User, "createUserInstance").mockReturnValue(fakeRawUserData);

    expect(
      User.getUsersByteamID(fakeRawUserData.userID, fakeRawUserData.teamID),
    ).rejects.toThrow("Unauthorized");
  });

  it("Throw an error if the team id of the user from database and that of the currently signed in user are not the same", async () => {
    jest
      .spyOn(FirebaseDatabase, "readDataFromDByEquality")
      .mockResolvedValue([]);
    jest.spyOn(User, "createUserInstance").mockReturnValue({ teamID: "" });

    expect(
      User.getUsersByteamID(fakeRawUserData.userID, fakeRawUserData.teamID),
    ).rejects.toThrow("Unauthorized");
  });
});
describe("Get User By userID", () => {
  it("Extract user By ID", async () => {
    jest.spyOn(FirebaseDatabase, "readDataFromDB").mockResolvedValue({
      ...fakeRawUserData,
      firstName: "firstName",
    });
    const user = await User.getUserByID(fakeRawUserData.userID);
    expect(user).toMatchObject(fakeRawUserData);
  });
});
