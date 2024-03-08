import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { User } from "../model/User";
import { ButtonStyles } from "../assets/ButtonStyles";
import { Colors } from "../assets/colors";
import { FontSizes } from "../assets/fonts";
import { TextFieldStyles } from "../assets/TextFieldStyles";

export default function Signin({ onBackButton = () => {} }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await User.signIn(email, password);
      window.alert("Successfully signed in");
      // Handle form submission here
    } catch (err) {
      alert("Invalid password or email");
    }
  };

  return (
    <form
      onSubmit={async (e) => await handleSubmit(e)}
      style={{ height: "100%" }}
    >
      <h1 style={{ fontWeight: "bolder", fontSize: FontSizes.titleFontSize }}>
        Sign In
      </h1>
      <p
        style={{
          color: Colors.TEXT_COLOR_TERTIARY,
          fontSize: FontSizes.mediumFontSize,
        }}
      >
        Build your company culture
      </p>
      <Grid
        xs={10}
        sx={{ justifyContent: "center", alignItems: "center", width: "100%" }}
      >
        <Grid item sx={{ width: "90%", margin: "0 auto" }}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            sx={TextFieldStyles.input}
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
            sx={TextFieldStyles.input}
          />
        </Grid>
      </Grid>
      <Grid mt={5}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={ButtonStyles.BtnStyle2}
        >
          Sign In
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
