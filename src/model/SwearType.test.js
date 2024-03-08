import "./__mocks__/SwearType";
import "../shared/firebase/__mock__/mockFirebase";
import "./__mocks__/User";
import { User } from "./User";
import { SwearType } from "./SwearType";
import { FirebaseDatabase } from "../shared/firebase/firebaseDatabase";
const rawSwearType = {
  description: "sdfdsf",
  levels: "minor",
  name: "addad",
  swearTypeID: "sgfsgrsf",
  teamID: "wfssfsfv",
  userID: "sfsfsf",
};

const swearType = new SwearType(rawSwearType);

describe("Should mock SwearType Constructor", () => {
  it("Properties test", () => {
    expect(swearType.description).toBe(rawSwearType.description);
    expect(swearType.levels).toBe(rawSwearType.levels);
    expect(swearType.name).toBe(rawSwearType.name);
    expect(swearType.swearTypeID).toBe(rawSwearType.swearTypeID);
    expect(swearType.teamID).toBe(rawSwearType.teamID);
    expect(swearType.userID).toBe(rawSwearType.userID);
  });
});

describe("Sweartype creation", () => {
  it("Throw error if swearType name not provided", () => {
    expect(
      SwearType.createNewSwearType({
        description: "",
        levels: "minor",
        teamID: "sfvsd",
      }),
    ).rejects.toThrow("Please provide a name for your team");
  });

  it("Throw error if swearType team id not provided", () => {
    expect(
      SwearType.createNewSwearType({
        description: "",
        levels: "minor",
        name: "sfvsd",
      }),
    ).rejects.toThrow("Please select a team to report to");
  });
  it("Throw error if swearType team id not provided", async () => {
    const fakeSwearType = {
      description: "",
      levels: "minor",
      name: "sfvsd",
      teamID: "sdcd",
    };
    const newSwearType = await SwearType.createNewSwearType(fakeSwearType);
    expect(newSwearType).toMatchObject(fakeSwearType);
  });
});

describe("Get Swear Types for teams", () => {
  it("Get the empty list of swear types in a team", async () => {
    jest.spyOn(FirebaseDatabase, "readDataFromDB").mockResolvedValue(null);
    const swearTypesByCompany = await SwearType.getSwearTypesByCompany("usfvs");
    expect(swearTypesByCompany.length).toBe(0);
  });

  it("Get the list of swear types in a team", async () => {
    jest
      .spyOn(FirebaseDatabase, "readDataFromDB")
      .mockResolvedValue({ type1: rawSwearType, type2: rawSwearType });
    const swearTypesByCompany = await SwearType.getSwearTypesByCompany("usfvs");
    expect(swearTypesByCompany.length).toBe(2);
  });
});

describe("Get Swear Types Details ", () => {
  it("Get the empty list of swear types in a team", async () => {
    const details = {};
    jest.spyOn(FirebaseDatabase, "readDataFromDB").mockResolvedValue(details);
    const swearTypeCompanyDetails = await SwearType.getSwearTypeDetails(
      "usfvs",
      "sfsdd",
    );
    expect(swearTypeCompanyDetails).toBe(details);
  });
});
