import "../model/__mocks__/User";
import "../shared/firebase/__mock__/mockFirebase";
import { BarChart } from "./__mocks__/@mui/x-charts/BarChart";
import { LineChart } from "./__mocks__/@mui/x-charts/LineChart";
import "../shared/firebase/__mock__/mockFirebase";
import "../model/__mocks__/User";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NavBar from "./NavBar";
import { SignedInUser } from "../model/SignedInUser";

SignedInUser.user = {
  userID: "userID",
};

describe("NavBar Component", () => {
  // Test 1: Renders without errors
  test("renders without errors", () => {
    render(
      <NavBar
        onLeaderboardClick={() => { }}
        onTeamsClick={() => { }}
        onNewReportClick={() => { }}
        onProfileClick={() => { }}
        onTutorialClick={() => { }}
        onLogout={() => { }}
      />,
    );
    waitFor(() => expect(screen.getByText("Leaderboard")).toBeInTheDocument());
    expect(screen.getByText("Teams")).toBeInTheDocument();
    expect(screen.getByText("New Report")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Tutorial")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  // Test 2: Triggers click events for navigation items
  test("triggers click events for navigation items", async () => {
    // Mock event handler functions
    const mockHandlers = {
      onLeaderboardClick: jest.fn(),
      onTeamsClick: jest.fn(),
      onNewReportClick: jest.fn(),
      onProfileClick: jest.fn(),
      onTutorialClick: jest.fn(),
      onLogout: jest.fn(),
    };

    // Render the NavBar component with mock event handlers
    render(<NavBar {...mockHandlers} />);

    // Simulate clicks on navigation items
    fireEvent.click(screen.getByText("Leaderboard"));
    fireEvent.click(screen.getByText("Teams"));
    fireEvent.click(screen.getByText("New Report"));
    fireEvent.click(screen.getByText("Profile"));
    fireEvent.click(screen.getByText("Tutorial"));
    fireEvent.click(screen.getByText("Logout"));

    // Assert that event handlers were called when expected
    await waitFor(() => {
      // // Assert that event handler functions were called with correct arguments
      expect(mockHandlers.onLeaderboardClick).toHaveBeenCalledTimes(1);
      expect(mockHandlers.onTeamsClick).toHaveBeenCalledTimes(1);
      expect(mockHandlers.onNewReportClick).toHaveBeenCalledTimes(1);
      expect(mockHandlers.onProfileClick).toHaveBeenCalledTimes(1);
      expect(mockHandlers.onTutorialClick).toHaveBeenCalledTimes(1);
      expect(mockHandlers.onLogout).toHaveBeenCalledTimes(1);
    });
  });

  // // Test 3: Triggers selected effect over the nav items
  // test("selected upon click", async () => {
  //   // Render the NavBar component with mock event handlers
  //   render(
  //     <NavBar
  //       onLeaderboardClick={() => { }}
  //       onTeamsClick={() => { }}
  //       onNewReportClick={() => { }}
  //       onProfileClick={() => { }}
  //       onTutorialClick={() => { }}
  //       onLogout={() => { }}
  //     />
  //   );

  //   // Simulate clicks on navigation items
  //   fireEvent.click(screen.getByText("Leaderboard"));
  //   fireEvent.click(screen.getByText("Teams"));
  //   fireEvent.click(screen.getByText("New Report"));
  //   fireEvent.click(screen.getByText("Profile"));
  //   fireEvent.click(screen.getByText("Tutorial"));
  //   fireEvent.click(screen.getByText("Logout"));

  //   // Assert that each item has the selected style applied after click
  //   await waitFor(() => {
  //     expect(screen.getByText("Leaderboard")).toHaveStyle("background-color: blue");
  //     expect(screen.getByText("Teams")).toHaveStyle("background-color: blue");
  //     expect(screen.getByText("New Report")).toHaveStyle("background-color: blue");
  //     expect(screen.getByText("Profile")).toHaveStyle("background-color: blue");
  //     expect(screen.getByText("Tutorial")).toHaveStyle("background-color: blue");
  //     expect(screen.getByText("Logout")).toHaveStyle("background-color: blue");
  //   });
  // });
});
