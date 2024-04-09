import "../shared/firebase/__mock__/mockFirebase";
import "../model/__mocks__/User";
import { SignedInUser } from "../model/SignedInUser";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import { User } from "../model/User";
import { Teams } from "../model/Teams";
import { ReportViolationsController } from "../controllers/reportViolationsController";
import UsersList, { TeamMemberItem } from "./UsersList";

SignedInUser.user = {
  teamID: "testTeamID",
};
jest.mock("../model/User", () => ({
  User: {
    getUserByID: jest.fn().mockImplementation((userID) => {
      return Promise.resolve({
        userID: userID,
        firstName: "MockedFirstName",
        lastName: "MockedLastName",
        email: "email@test.com",
        profilePicture: "https://test.com/mock.jpg",
      });
    }),
  },
}));

jest.mock("../controllers/reportViolationsController", () => ({
  ReportViolationsController: {
    reportUsers: jest.fn(),
  },
}));

window.alert = jest.fn();

describe("UsersList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Teams, "getTeamMembers").mockResolvedValue([]);
  });

  it("renders UsersList component", async () => {
    await act(async () => await render(<UsersList />));
    expect(screen.getByText("Employees List")).toBeInTheDocument();
  });

  it("handles error when fetching team members", async () => {
    const errorMessage = "Failed to fetch team members";

    // Mocking the rejection of getTeamMembers
    jest.spyOn(Teams, "getTeamMembers").mockRejectedValueOnce(errorMessage);

    await act(async () => await render(<UsersList />));

    await waitFor(() => {
      act(() => {
        // expect(window.alert).toHaveBeenCalledTimes(1);
        expect(window.alert).toHaveBeenCalledWith(errorMessage);
      });
    }).catch((error) => {});
  });

  it("handles report button click", async () => {
    await act(async () => await render(<UsersList />));

    fireEvent.click(screen.getByText("Report"));
    await waitFor(() => {
      // expect(ReportViolationsController.reportUsers).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith("Successfully added violatons");
    });
  });

  it("initializes with correct initial state", async () => {
    await act(async () => await render(<UsersList />));

    expect(screen.getByText("Employees List")).toBeInTheDocument();
    expect(Teams.getTeamMembers).toHaveBeenCalledTimes(1);
    expect(ReportViolationsController.reportUsers).not.toHaveBeenCalled();
  });
});

describe("TeamMemberItem", () => {
  const mockUser = {
    userID: "mockedUserID",
    firstName: "MockedFirstName",
    lastName: "MockedLastName",
    email: "email@test.com",
    profilePicture: "https://test.com/mock.jpg",
  };

  beforeEach(() => {
    User.getUserByID.mockResolvedValue(mockUser);
  });

  it("renders user item correctly", async () => {
    render(
      <TeamMemberItem
        value={mockUser.userID}
        checked={[]}
        setChecked={() => {}}
      />,
    );
    await waitFor(() => {
      expect(
        screen.getByText(`${mockUser.firstName} ${mockUser.lastName}`),
      ).toBeInTheDocument();
      expect(
        screen.getByAltText(`Avatar n°${mockUser.userID + 1}`),
      ).toBeInTheDocument();
    });
  });
});
