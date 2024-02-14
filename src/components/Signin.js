import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { User } from "../model/User";

export default function Signin({ onBackButton = () => {} }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await User.signIn(email, password);
    window.alert("Successfully signed in");
    // Handle form submission here
  };

  return (
    <form onSubmit={async (e) => await handleSubmit(e)}>
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        sx={{
          "& .MuiInputBase-input": {
            color: "white",
          },
        }}
        focused
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password" // Set the type prop to "password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        focused
        sx={{
          "& .MuiInputBase-input": {
            color: "white",
          },
        }}
      />
      <Button type="submit" variant="contained" color="primary">
        Sign In
      </Button>
      <Button variant="text" color="primary" onClick={onBackButton}>
        Back
      </Button>
    </form>
  );
}
