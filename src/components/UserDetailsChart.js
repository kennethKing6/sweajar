import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Colors } from "../assets/colors";
import { FontSizes } from "../assets/fonts";

const chartSetting = {
  margin: { bottom: 20, left: 25, right: 5 },
  yAxis: [
    {
      label: "",
    },
  ],
  height: 200,
};

export default function UserDetailsChart({ violationData }) {
  return (
    <BarChart
      dataset={violationData}
      xAxis={[{ scaleType: "band", dataKey: "violationType" }]}
      series={[
        {
          dataKey: "countPerViolation",
          label: "Violation Count",
          color: "#FFC107",
        },
      ]}
      {...chartSetting}
    />
  );
}
