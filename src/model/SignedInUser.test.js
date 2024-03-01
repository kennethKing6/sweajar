import "../shared/firebase/__mock__/mockFirebase";
import "./__mocks__/User";
import { User } from "./User";
import { SignedInUser } from "./SignedInUser";

describe("Signed user", () => {
  it("Emppy SignedIn User ", () => {
    expect(SignedInUser.user).toBe(undefined);
  });

  it("Set Signed In User ", () => {
    const user = {};
    SignedInUser.user = user;
    expect(SignedInUser.user).toBe(user);
  });
});
