"use client";

import React from "react";

export default function Button({ text = "Button", onPress = () => {} }) {
  return (
    <div style={{ backgroundColor: "yellow" }} onClick={onPress}>
      <h1 style={{ color: "black" }}>{text}</h1>
    </div>
  );
}
