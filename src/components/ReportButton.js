"use client";

import React from "react";
import Button from "@mui/material/Button";
import { Colors } from "../assets/colors";

export default function ReportButton({
  onPress = () => {},
  bgColor = Colors.ACCENT_COLOR_4,
  color = Colors.TEXT_COLOR_SECONDARY,
}) {
  return (
    <Button
      variant="contained"
      onClick={onPress}
      sx={{ bgcolor: bgColor, color: color }}
    >
      Report
    </Button>
  );
}
