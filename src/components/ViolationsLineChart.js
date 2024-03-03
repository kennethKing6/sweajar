import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const colors = ["#000000", "#2fc6ff", "#ffc658"];

export default function ViolationsLineChart({ lineData, lineSeries }) {
  return (
    <LineChart
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
