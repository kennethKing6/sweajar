import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const data = [
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
  {
    date: new Date("2024-02-01"),
    profanity: 9,
    mutedMicrophone: 5,
    lateArrival: 8,
  },
  {
    date: new Date("2024-02-22"),
    profanity: 8,
    mutedMicrophone: 4,
    lateArrival: 6,
  },
];

const colors = ["#000000", "#2fc6ff", "#ffc658"];

export default function ViolationsLineChart({ lineData, lineSeries }) {
  return (
    <LineChart
      data-testid="line-chart"
      dataset={lineData}
      xAxis={[
        {
          dataKey: "date",
          valueFormatter: (date) => new Date(date).toLocaleDateString(),
        },
      ]}
      series={lineSeries}
      width={500}
      height={400}
      colors={colors}
    />
  );
}
