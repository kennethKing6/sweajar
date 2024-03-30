import { render, screen, waitFor } from "@testing-library/react";
import "./shared/firebase/__mock__/mockFirebase";
import "./model/__mocks__/User";

import App from "./App";
import { FirebaseAuth } from "./shared/firebase/firebaseAuth";

test("Render the welcome page when no user is signed in", async () => {
  jest
    .spyOn(FirebaseAuth, "listenForUserAuthState")
    .mockImplementation((callback) => callback(null));

  await render(<App />);
  const linkElement = screen.getByText(/Welcome to SwearJar/i);
  waitFor(() => expect(linkElement).toBeInTheDocument());
});

test("Render the welcome page when user is signed in", async () => {
  const user = {
    userID: "userID",
    firstName: "john",
    lastName: "kouadio",
    profilePicture: "profilePicture",
  };
  jest
    .spyOn(FirebaseAuth, "listenForUserAuthState")
    .mockImplementation((callback) => callback(user));

  await render(<App />);
  const linkElement = screen.getByText(/Teams/i);
  waitFor(() => expect(linkElement).toBeInTheDocument());
});
