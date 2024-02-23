import "text-encoding";
import "./__mock__/mockFirebase";
import { FirebaseAuth } from "./firebaseAuth";

test("Signin in anymously", async () => {
  const mockUser = {
    /* mock user object */
  };
  const user = await FirebaseAuth.signUserAnonymously();
  expect(user).toMatchObject(mockUser);
});

test("Should mock signUserAnonymously", async () => {
  const mockUser = {
    /* mock user object */
  };
  const user = await FirebaseAuth.signInUser("kenneth@gmail.com", "12345667");
  expect(user).toMatchObject(mockUser);
});
test("To sign up a user", async () => {
  const mockUser = {
    /* mock user object */
  };
  const user = await FirebaseAuth.signUserUp("kenneth@gmail.com", "12345667");
  expect(user).toMatchObject(mockUser);
});
test("Sign out user", async () => {
  const user = await FirebaseAuth.signOutUser();
  expect(user).toBeUndefined();
});
