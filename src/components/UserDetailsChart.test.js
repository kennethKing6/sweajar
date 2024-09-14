import { BarChart } from "./__mocks__/@mui/x-charts/BarChart";
import { LineChart } from "./__mocks__/@mui/x-charts/LineChart";
import "../shared/firebase/__mock__/mockFirebase";
import "../model/__mocks__/User";
import React from "react";
import { render, waitFor } from "@testing-library/react";
import UserDetailsChart from "./UserDetailsChart";

describe("UserDetailsChart Component", () => {
  it("renders without crashing", () => {
    const violationData = [
      { violationType: "Type 1", countPerViolation: 5 },
      { violationType: "Type 2", countPerViolation: 10 },
    ];
    render(<UserDetailsChart violationData={violationData} />);
  });

  it("displays bar chart with correct data", () => {
    const violationData = [
      { violationType: "Type 1", countPerViolation: 5 },
      { violationType: "Type 2", countPerViolation: 10 },
    ];
    const { getByText } = render(
      <UserDetailsChart violationData={violationData} />,
    );

    // Check if the chart displays the data correctly
    waitFor(() => expect(getByText("Type 1")).toBeInTheDocument());
    waitFor(() => expect(getByText("Type 2")).toBeInTheDocument());
    waitFor(() => expect(getByText("5")).toBeInTheDocument());
    waitFor(() => expect(getByText("10")).toBeInTheDocument());
  });
});
