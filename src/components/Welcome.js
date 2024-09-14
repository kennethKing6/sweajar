import React, { useState } from "react";
import { Button, ImageListItem } from "@mui/material";
import Signup from "./Signup";
import Signin from "./Signin";
import SwearJar from "../assets/sj_logo.png";
import { Colors } from "../assets/colors";
import { ButtonStyles } from "../assets/ButtonStyles";

const WELCOME_PAGE = "welcome";
const SIGN_UP = "signup";
const SIGN_IN = "signin";
const Welcome = () => {
  const [welcomeAction, setWelcomeAction] = useState(WELCOME_PAGE);

  return (
    <div
      style={{
        margin: 0,
        textAlign: "center",
        fontFamily: "Noto Sans",
        height: "100%",
        backgroundColor: Colors.BACKGROUND_COLOR,
      }}
    >
      {welcomeAction === WELCOME_PAGE ? (
        <div>
          <h1 style={{ fontWeight: "bolder", color: Colors.TEXT_COLOR, margin: 0 }}>Welcome to SwearJar</h1>
          <ImageListItem sx={{ height: 10 }}>
            <img
              style={{ height: 250, objectFit: "contain" }}
              src={`${SwearJar}?w=248&fit=crop&auto=format`}
              loading="lazy"
              decoding="async"
              data-nimg="1"
              alt="Swearjar representation"
              className="lk21hp11 _1286nb199 _1286nb19x _1286nb16 _1286nb183 _1286nb18b"
            />
          </ImageListItem>
          <p style={{ color: Colors.TEXT_COLOR }}>
            Are you tired of your foul-mouthed habits? 😡🤬
            <br />
            Well, fear not! SwearJar is here to help you keep those profanities
            in check. 😇😇
          </p>
          <Button
            variant="contained"
            color="primary"
            sx={ButtonStyles.BtnStyle2}
            onClick={() => {
              setWelcomeAction(SIGN_UP);
            }}
          >
            Sign Up Now
          </Button>
          <Button
            variant="contained"
            onClick={() => setWelcomeAction(SIGN_IN)}
            sx={ButtonStyles.BtnStyle1}
          >
            Sign In
          </Button>
        </div>
      ) : (
        <></>
      )}
      {welcomeAction === SIGN_UP ? (
        <Signup onBackButton={() => setWelcomeAction(WELCOME_PAGE)} />
      ) : (
        <></>
      )}
      {welcomeAction === SIGN_IN ? (
        <Signin onBackButton={() => setWelcomeAction(WELCOME_PAGE)} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Welcome;
