import "../shared/firebase/__mock__/mockFirebase";
import "../model/__mocks__/User";
import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  act,
  screen,
  getAllByText,
} from "@testing-library/react";
import { ReportViolationsController } from "../controllers/reportViolationsController";
import ViolationSelectList, {
  SwearJarMenu,
  MyForm,
} from "./ViolationSelectList";
import { renderWithProviders } from "../shared/redux/reduxTestUtils";

// Mock DefaultViolations
jest.mock("../model/DefaultViolations", () => ({
  DefaultViolations: [
    {
      name: "Profanity",
      description: "Choose this option if the user used inappropriate language",
      category: "Office Culture Enthusiast",
      categoryIcon: "🏢",
    },
    {
      name: "Muted Microphone",
      description: "Choose this option if the user's microphone was muted",
      category: "Digital Explorer",
      categoryIcon: "🌐",
    },
    {
      name: "Late Arrival",
      description: "Choose this option if the user joined the meeting late",
      category: "Idea Maverick ",
      categoryIcon: "💡",
    },
  ],
}));

// Mock User
jest.mock("../model/User", () => {
  return {
    User: jest.fn().mockImplementation((user) => ({
      teamID: user.teamID || "mockTeamID",
      firstName: user.firstName || "Mock",
      lastName: user.lastName || "User",
      userID: user.userID || "mockUserID",
      email: user.email || "mock@test.com",
      profilePicture: user.profilePicture || "mock-profile-picture-url",
    })),
  };
});

jest.mock("../model/SwearType", () => ({
  SwearType: jest.fn().mockImplementation((swearType) => ({
    swearTypeID: swearType.swearTypeID || "mockSwearTypeID",
    description: swearType.description || "Mock Description",
    levels: swearType.levels || "minor",
    name: swearType.name || "Mock Swear Type",
    teamID: swearType.teamID || "mockTeamID",
    userID: swearType.userID || "mockUserID",
  })),
}));

jest.mock("../model/SignedInUser", () => ({
  SignedInUser: { user: { teamID: "mockTeamID" } },
}));

beforeEach(async () => {
  jest
    .spyOn(ReportViolationsController, "getSwearjarViolations")
    .mockResolvedValue([
      { name: "Profanity", selected: false },
      { name: "Runner", selected: false },
      { name: "Goofy", selected: false },
      { name: "Office Culture Enthusiast", selected: false },
    ]);
  await act(async () => {
    // Code that causes React state updates
    // For example, firing events that update state
    await render(<SwearJarMenu />);
  });
  await act(async () => {
    // Code that causes React state updates
    // For example, firing events that update state
    await render(<MyForm />);
  });
  await act(async () => {
    return await renderWithProviders(<ViolationSelectList />);
  });
});

describe("ViolationSelectList", () => {
  it("renders without crashing", async () => {
    await act(async () => {
      await renderWithProviders(<ViolationSelectList />);
    });
  });

  it("displays violations for the team", async () => {
    jest
      .spyOn(ReportViolationsController, "getSelectedSwearTypeCount")
      .mockReturnValueOnce(3);

    const elements = await screen.getAllByText("Profanity");
    await waitFor(() => expect(elements.length).toBe(2));
  });

  it("toggles selected state when an item is clicked", async () => {
    await waitFor(() => {
      jest
        .spyOn(ReportViolationsController, "selectSwearType")
        .mockReturnValue();
      act(() => {
        const categories = screen.getAllByRole("ListItemIcon0");
        expect(categories.length).toBe(2); // Ensure there is only one matching element
        fireEvent.click(categories[0]); // Click the first (and only) matching element
      });

      expect(ReportViolationsController.selectSwearType).toHaveBeenCalledTimes(
        1,
      );
    });
  });
});
