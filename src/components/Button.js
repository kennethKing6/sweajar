"use client";

import { Button as ButtonMaterial } from "@mui/material";
import React from "react";
import { ButtonStyles } from "../assets/ButtonStyles";

export default function Button({
  text = "Button",
  onPress = () => {},
  style = ButtonStyles.BtnStyle2,
}) {
  return (
    <ButtonMaterial
      variant="contained"
      color="primary"
      onClick={onPress}
      sx={style}
    >
      {text}
    </ButtonMaterial>
  );
}
