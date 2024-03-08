"use client";

import { Button as ButtonMaterial } from "@mui/material";
import React from "react";
import { ButtonStyles } from "../assets/ButtonStyles";

export default function Button({
  text = "Button",
  onPress = () => {},
  style = ButtonStyles.BtnStyle2,
}) {
  // return (
  //   <div style={{ backgroundColor: "yellow" }} onClick={onPress}>
  //     <h1 style={{ color: "black" }}>{text}</h1>
  //   </div>
  // );
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
