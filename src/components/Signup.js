import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { User } from "../model/User";
import { ButtonStyles } from "../assets/ButtonStyles";
import { FontSizes } from "../assets/fonts";
import { TextFieldStyles } from "../assets/TextFieldStyles";

export default function Signup({ onBackButton = () => {} }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await User.createAccount({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
    });
    window.alert("Account was successfully created");
    // Handle form submission here
  };

  return (
    <form onSubmit={async () => await handleSubmit()}>
      <h1 style={{ fontWeight: "bolder", fontSize: FontSizes.titleFontSize }}>
        Sign Up
      </h1>

      <Grid sx={{ width: "100%" }}>
        <Grid sx={{ margin: "0 auto", width: "90%" }}>
          <TextField
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            margin="normal"
            focused
            sx={TextFieldStyles.input}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            margin="normal"
            focused
            sx={TextFieldStyles.input}
          />
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            focused
            sx={TextFieldStyles.input}
          />
          <TextField
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            type="password"
            focused
            sx={TextFieldStyles.input}
          />
        </Grid>
      </Grid>
      <Grid mt={4}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={async (e) => await handleSubmit(e)}
          sx={ButtonStyles.BtnStyle2}
        >
          Sign Up
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onBackButton}
          sx={ButtonStyles.BtnStyle1}
        >
          Back
        </Button>
      </Grid>
    </form>
  );
}
