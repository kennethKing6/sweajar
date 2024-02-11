"use client";

import React from "react";

export default function Button({ text = "Button", onPress = () => {} }) {
  return (
    <div style={{ backgroundColor: "black" }} onClick={onPress}>
      <h1 style={{ color: "red" }}>{text}</h1>
    </div>
  );
}
