import "./__mock__/mockFirebase";
import { FirebaseDatabase } from "./firebaseDatabase";

beforeEach(() => {
  jest.spyOn(FirebaseDatabase, "getSnapshot").mockReturnValue({});
  jest.spyOn(FirebaseDatabase, "getPushKey").mockReturnValue("skdhfds");
});
describe("Read data from fake database", () => {
  test("Test reading fake data from the database", async () => {
    const mockedData = {};

    const data = await FirebaseDatabase.readDataFromDB({
      queryPath: "/",
    });
    expect(data).toMatchObject(mockedData);
  });
  test("Read data from fake database to by equality and a limiter", async () => {
    const mockedData = {};

    const data = await FirebaseDatabase.readDataFromDByEquality({
      queryPath: "/",
      equalValue: "joy",
      queryKey: "teamID",
      resultLimiter: 5,
    });
    expect(data).toMatchObject(mockedData);
  });
  test("Read data from fake database to by equality in a path", async () => {
    const mockedData = {};

    const data = await FirebaseDatabase.readDataFromRefEquality({
      queryPath: "/",
      equalValue: "joy",
      queryKey: "teamID",
    });
    expect(data).toMatchObject(mockedData);
  });

  test("Read data from fake database to by equality in a path with start and end timestamp", async () => {
    const mockedData = {};

    const data = await FirebaseDatabase.readDataFromDByEqualityStartnEnd({
      queryPath: "/",
      equalValue: "joy",
      queryKey: "teamID",
      endQueryKey: "endTime",
      endQueryValue: 32455434553,
      resultLimiter: 5,
      startQueryKey: "startTime",
      startQueryValue: 24523533543,
    });
    expect(data).toMatchObject(mockedData);
  });
  test("Read data from fake database to by path equality", async () => {
    const mockedData = {};

    const data = await FirebaseDatabase.readFromDataByQueryValue({
      queryPath: "/",
      equalValue: "joy",
    });
    expect(data).toMatchObject(mockedData);
  });
});

test("Test deleting fake data from the database", async () => {
  const data = await FirebaseDatabase.deleteDataFromDB({
    queryPath: "/",
  });
  expect(data).toBeUndefined();
});

test("Test the pushID from firebase database generates", async () => {
  const key = FirebaseDatabase.generateUniqueKey("/");
  expect(typeof key).toBe("string");
});

test("Test if pushID from firebase database length is greater than 0", async () => {
  const key = FirebaseDatabase.generateUniqueKey("/");
  expect(key.length).toBeGreaterThan(0);
});

describe("Write data to the fake database", () => {
  test("Test if push method executes with no data", async () => {
    const data = await FirebaseDatabase.pushDataToDB({
      newData: null,
      queryPath: "/",
    });
    expect(data).toBeUndefined();
  });

  test("Test if push method executes with empty json", async () => {
    const data = await FirebaseDatabase.pushDataToDB({
      newData: {},
      queryPath: "/",
    });
    expect(data).toBeUndefined();
  });
  test("Test if push method executes with fake data", async () => {
    const data = await FirebaseDatabase.pushDataToDB({
      newData: {
        to: "j@gmail.com",
        from: "q@gmail.com",
      },
      queryPath: "/",
    });
    expect(data).toBeUndefined();
  });
  test("Write data to the database at a path with no data", async () => {
    const data = await FirebaseDatabase.writeDataToDB({
      data: null,
      queryPath: "/",
    });
    expect(data).toBeUndefined();
  });
  test("Write data to the database at a path with empty JSON", async () => {
    const data = await FirebaseDatabase.writeDataToDB({
      data: {},
      queryPath: "/",
    });
    expect(data).toBeUndefined();
  });
  test("Write data to the database at a path with fake data", async () => {
    const data = await FirebaseDatabase.writeDataToDB({
      data: {
        to: "j@gmail",
      },
      queryPath: "/",
    });
    expect(data).toBeUndefined();
  });
});

describe("Push ID generator tester", () => {
  test("Generate fake pushID key", () => {
    const key = FirebaseDatabase.getPushKey({});
    expect(key).not.toBeUndefined();
  });
});

describe("snapshot generator tester", () => {
  test("Snapshot ", () => {
    const key = FirebaseDatabase.getSnapshot({});
    expect(key).not.toBeUndefined();
  });
});
