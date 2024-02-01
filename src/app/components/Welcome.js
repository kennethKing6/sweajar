import React, { useState,  } from 'react';
import { Button } from '@mui/material';
import Signup from './Signup';
import Signin from './Signin';

const WELCOME_PAGE = "welcome";
const SIGN_UP = "signup"
const SIGN_IN = "signin"
const Welcome = () => {
    const [welcomeAction,setWelcomeAction] = useState(WELCOME_PAGE)

  return (
    <>
        {welcomeAction ===WELCOME_PAGE? <div>
      <h1>Welcome to SwearJar! 🎉</h1>
      <p>
        Are you tired of your foul-mouthed habits? 😡🤬<br />
        Well, fear not! SwearJar is here to help you keep those profanities in check. 😇😇
      </p>
      <Button variant="contained" color="primary" onClick={()=>setWelcomeAction(SIGN_UP)}>
        Sign Up Now
      </Button>
      <Button variant="contained" color="secondary" onClick={()=>setWelcomeAction(SIGN_IN)}>
        Sign In
      </Button>
    </div>: <></>} 
    {welcomeAction === SIGN_UP?<Signup onBackButton={()=>setWelcomeAction(WELCOME_PAGE)}/>:<></>}
    {welcomeAction === SIGN_IN?<Signin onBackButton={()=>setWelcomeAction(WELCOME_PAGE)}/>:<></>}
    </>
  );
};

export default Welcome;
