jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
}));

import 'text-encoding';
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Welcome from "./Welcome";

describe("Welcome Component", () => {
  it("renders welcome message and buttons correctly", () => {
    const { getByText, getByRole } = render(<Welcome />);

    // Check if welcome message is rendered
    expect(getByText("Welcome to SwearJar")).toBeInTheDocument();

    // Check if Sign Up button is rendered
    const signUpButton = getByRole("button", { name: "Sign Up Now" });
    expect(signUpButton).toBeInTheDocument();

    // Check if Sign In button is rendered
    const signInButton = getByRole("button", { name: "Sign In" });
    expect(signInButton).toBeInTheDocument();
  });

  it("switches to sign up form when Sign Up button is clicked", () => {
    const { getByRole, getByLabelText } = render(<Welcome />);

    // Click Sign Up button
    const signUpButton = getByRole("button", { name: "Sign Up Now" });
    fireEvent.click(signUpButton);

    // Check if sign up form is rendered
    expect(getByLabelText("First Name")).toBeInTheDocument();
    expect(getByLabelText("Last Name")).toBeInTheDocument();
    expect(getByLabelText("Email")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
  });

  it("switches to sign in form when Sign In button is clicked", () => {
    const { getByRole, getByLabelText } = render(<Welcome />);

    // Click Sign In button
    const signInButton = getByRole("button", { name: "Sign In" });
    fireEvent.click(signInButton);

    // Check if sign in form is rendered
    expect(getByLabelText("Email")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
  });
});
