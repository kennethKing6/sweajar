import { BarChart } from "./__mocks__/@mui/x-charts/BarChart";
import { LineChart } from "./__mocks__/@mui/x-charts/LineChart";
import "../shared/firebase/__mock__/mockFirebase";
import "../model/__mocks__/User";
import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import UserDetails from "./UserDetails";
import { User } from "../model/User";
import { UserDetailsController } from "../controllers/userDetailsController";

jest.mock("../model/SignedInUser", () => ({
  SignedInUser: { user: { userID: "123", teamID: "456" } },
}));

const userID = "userID";
const user = {
  userID: "userID",
  firstName: "john",
  lastName: "kouadio",
  profilePicture: "profilePicture",
};

beforeEach(() => {
  jest.spyOn(User, "getUserByID").mockResolvedValue(user);
});
describe("UserDetails Component", () => {
  it("renders without crashing", async () => {
    await act(async () => await render(<UserDetails />));
  });

  it("displays user information", async () => {
    const { getByText } = await act(async () => await render(<UserDetails />));
    // Wait for user data to be fetched
    await waitFor(() => expect(getByText(/Analysis/i)).toBeInTheDocument());
  });

  it("fetches bar chart data when user is set", async () => {
    await act(async () => await render(<UserDetails />));
    await waitFor(() => expect(User.getUserByID).toHaveBeenCalled());
  });

  it("fetches line chart data when user is set", async () => {
    await act(async () => await render(<UserDetails />));
    waitFor(() => {
      expect(
        require("../controllers/userDetailsController").UserDetailsController
          .getMonthLineChartData,
      ).toHaveBeenCalled();
    });
  });

  it('shows "No graph available" message if bar chart data is empty', async () => {
    await act(async () => await render(<UserDetails />));

    waitFor(() => expect(getByText(/No graph available/i)).toBeInTheDocument());
  });

  it("displays violation types if chart data is available", async () => {
    const mockChartData = [
      { violationType: "Type 1", countPerViolation: 5 },
      { violationType: "Type 2", countPerViolation: 10 },
    ];
    jest
      .spyOn(UserDetailsController, "getMonthBarChartData")
      .mockResolvedValue(mockChartData);

    const { getByText } = render(<UserDetails />);
    waitFor(() => expect(getByText(/Type 1/i)).toBeInTheDocument());
    waitFor(() => expect(getByText(/Type 2/i)).toBeInTheDocument());
  });
});
