import { render, screen } from "@testing-library/react";
import Tutorial from "./Tutorial";

describe("Tutorial Component", () => {
  // Test 1: Renders without errors
  test("renders without errors", () => {
    render(<Tutorial />);
    expect(screen.getByText("Creating/Deleting a Team")).toBeInTheDocument();
    expect(screen.getByText("Viewing Teams")).toBeInTheDocument();
    expect(screen.getByText("Adding a Team Member to a Team")).toBeInTheDocument();
    expect(screen.getByText("Reporting a User Violation")).toBeInTheDocument();
  });

  // // Test 2: Verifies the content of the tutorial
  // test("verifies the content of the tutorial", () => {
  //   render(<Tutorial />);
  //   // Verify content for "Creating/Deleting a Team" section
  //   expect(screen.getByText("Steps to CREATE a new team or DELETE an old one...")).toBeInTheDocument();
  //   expect(screen.queryByText(/Click on 'Teams' on the Nav Bar\./)).toBeInTheDocument();
  //   // Verify content for "Viewing Teams" section
  //   expect(screen.getByText("Steps to view your teams...")).toBeInTheDocument();
  //   expect(screen.queryByText(/Click on 'Teams' on the Nav Bar\./)).toBeInTheDocument();
  //   // Verify content for other sections similarly
  // });
});
