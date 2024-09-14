import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Colors } from "../assets/colors";

const colors = ["#000000", "#2fc6ff", "#ffc658"];

export default function ViolationsLineChart({ lineData, lineSeries }) {
  return (
    <LineChart
      data-testid="line-chart"
      dataset={lineData}
      sx={{
        backgroundColor: Colors.ACCENT_COLOR_4,
      }}
      xAxis={[
        {
          dataKey: "date",
          valueFormatter: (date) => new Date(date).toLocaleDateString(),
        },
      ]}
      yAxis={[{ tickInterval: 1, label: "Time ( days )", min: 1 }]}
      series={lineSeries}
      width={500}
      height={400}
      colors={colors}
    />
  );
}
