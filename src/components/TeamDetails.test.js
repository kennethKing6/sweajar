import "../shared/firebase/__mock__/mockFirebase";
import "../model/__mocks__/User";
import { render, fireEvent, screen, act } from "@testing-library/react";
import { User } from "../model/User";
import { Teams } from "../model/Teams";
import TeamDetails, { TeamMemberItem } from "../components/TeamDetails";

// jest.mock("../model/Teams");

jest.mock("../model/AppState", () => ({
  user: { userID: "userID" },
}));

jest.mock("../model/SignedInUser", () => ({
  SignedInUser: {
    user: { teamID: null },
  },
}));

jest.mock("../model/User", () => ({
  User: {
    getUserByID: jest.fn(),
  },
}));

describe("TeamDetails", () => {
  it("renders TeamDetails component", async () => {
    jest.spyOn(Teams, "getTeamMembers").mockReturnValue(
      new Promise(
        () => [],
        () => [],
      ),
    );
    await act(async () => await render(<TeamDetails />));
    expect(screen.getAllByText("Team Details").length).toBe(1);
  });
});

describe("TeamMemberItem", () => {
  it("renders TeamMemberItem component", async () => {
    const mockUser = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@test.com",
      profilePicture: "https://test.com/john.jpg",
    };
    User.getUserByID.mockResolvedValue(mockUser);
    render(<TeamMemberItem userID="1" />);
    expect(await screen.findByText("John Doe")).toBeInTheDocument();
    expect(await screen.findByText("john.doe@test.com")).toBeInTheDocument();
  });
});
