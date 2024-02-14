"use client";

import React from "react";
import Button from "@mui/material/Button";

export default function SortButton({ onPress = () => {} }) {
  return (
    <Button
      variant="contained"
      onClick={onPress}
      sx={{
        backgroundColor: "#FFEB3B",
        color: "black",
        "&:hover": {
          backgroundColor: "#FFC107",
        },
      }}
    >
      Sort
    </Button>
  );
}
