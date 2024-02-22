// Mock FirebaseConfig.js
jest.mock("./FirebaseConfig", () => ({
  FirebaseConfigs: {
    firebaseApp: jest.fn(),
  },
}));

// Mock firebase/database module
jest.mock("firebase/database", () => ({
  child: jest.fn(),
  equalTo: jest.fn(),
  get: jest.fn(),
  getDatabase: jest.fn(),
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
}));
import { FirebaseDatabase } from "./firebaseDatabase";

describe("FirebaseDatabase", () => {
  it("should mock readDataFromDB", async () => {
    const mockData = {
      /* mock data object */
    };
    get.mockResolvedValue(mockData);

    const data = await FirebaseDatabase.readDataFromDB({ queryPath: "/" });
    expect(get).toHaveBeenCalledWith(expect.anything());
    expect(data).toEqual(mockData.val());
  });

  it("should mock readDataFromDByEquality", async () => {
    // Add similar tests for other methods
  });

  it("should mock writeDataToDB", async () => {
    const userQuery = {
      queryPath: "/",
      data: {
        /* mock data object */
      },
    };
    set.mockResolvedValue();

    await FirebaseDatabase.writeDataToDB(userQuery);
    expect(set).toHaveBeenCalledWith(expect.anything(), userQuery.data);
  });

  // Add similar tests for other methods
});
