import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
//import { CHART_COLOR, CHART_TEXT, CHART_LABEL } from "../assets/colors";

const chartSetting = {
  margin: { bottom: 20, left: 25, right: 5 },
  yAxis: [
    {
      label: "",
    },
  ],
  height: 100,
};

const chartStyles = {
  ".recharts-label": {
    fill: "white", // NOT WORKING
  },
};

export default function LeaderboardChart({ chartData }) {
  return (
    <BarChart
      dataset={chartData}
      xAxis={[{ scaleType: "band", dataKey: "violationType" }]}
      series={[
        {
          dataKey: "countPerViolation",
          label: "Violation Count",
          color: "#FFC107",
        },
      ]}
      {...chartSetting}
      style={chartStyles}
    />
  );
}
