import React from "react";
import { render } from "@testing-library/react";
import ViolationsLineChart from "./ViolationsLineChart";

// Mocked LineChart component
jest.mock("@mui/x-charts/LineChart", () => {
    const React = require("react");
    return {
        LineChart: jest.fn(({ dataset, xAxis, series, width, height, colors }) => (
            <div data-testid="line-chart">
                <div data-testid="dataset">{JSON.stringify(dataset)}</div>
                <div data-testid="xAxis">{JSON.stringify(xAxis)}</div>
                <div data-testid="series">{JSON.stringify(series)}</div>
                <div data-testid="width">{width}</div>
                <div data-testid="height">{height}</div>
                <div data-testid="colors">{JSON.stringify(colors)}</div>
            </div>
        )),
    };
});

// Mock data for testing
const lineData = [
    {
        date: new Date("2024-01-01"),
        profanity: 5,
        mutedMicrophone: 7,
        lateArrival: 2,
    },
    {
        date: new Date("2024-01-12"),
        profanity: 10,
        mutedMicrophone: 3,
        lateArrival: 5,
    },
];

const lineSeries = [
    { type: "line", dataKey: "profanity", name: "Profanity" },
    { type: "line", dataKey: "mutedMicrophone", name: "Muted Microphone" },
    { type: "line", dataKey: "lateArrival", name: "Late Arrival" },
];

describe('ViolationsLineChart', () => {
    it("renders without crashing", () => {
        render(<ViolationsLineChart lineData={lineData} lineSeries={lineSeries} />);
    });
});