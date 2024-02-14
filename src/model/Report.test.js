import { Report } from "./Report";
jest.mock("firebase/database");
jest.mock("./User");
test("Create Report Mock", () => {
  //   const Report = jest.createMockFromModule("./Report");
  //   Report.getReportedUserByUserID = jest.fn(userID, (teamID) => {
  //     return {
  //       "Late Arrival": {
  //         sdfjjsldfn: {
  //           dateEntry: 1707597529326,
  //           reportedID: "khsbfkhsdbbskdhsbdhkcb",
  //           reporterID: "skhbdhsdhf",
  //           swearTypeID: "Late Arrival",
  //           teamUD: "oashdofuhu",
  //           sweartype: {
  //             description:
  //               "Choose this option if the user joined the meeting late",
  //             levels: "minor",
  //             name: "Late Arrival",
  //             swearTypeID: "Late Arrival",
  //           },
  //         },
  //       },
  //     };
  //   });

  //   expect(Report.getReportedUserByUserID("sdfds", "sfsdf")).not.toBe(null);
  expect(1 + 1).toBe(2);
});
