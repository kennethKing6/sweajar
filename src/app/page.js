"use client"

import Button from "./components/Button";
import UsersList from "./components/UsersList";
import React, { useEffect, useState } from 'react';
import ViolationSelectList from "./components/ViolationSelectList"
import Grid from '@mui/material/Grid';
import ReportButton from './components/ReportButton';
import ReportList from './components/HomepageLeaderBoard';
import HomepageLeaderBoard from './components/HomepageLeaderBoard';
import { FirebaseAuth } from "./shared/firebase/firebaseAuth";
import { SignedInUser } from "./model/SignedInUser";
import { User } from "./model/User";
import Welcome from "./components/Welcome";
import UserDetails from './components/UserDetails';
import NavBar from './components/NavBar'

const USER_LIST_COMPONENT = 'userLiist';
const VIOLATION_LIST_COMPONENT = 'userViolations';
const HOMEPAGE_LEADERBOARD = 'leaderboard';
const USER_DETAILS_COMPONENT = 'userDetails';

export default function Home() {
   const [switcher,setSwitcher]  = useState(VIOLATION_LIST_COMPONENT)
   const [user,setUser] = useState()
  const HomepageLeaderBoardData = [
    { // Dummy user details
      username: 'BobbyBoy123', 
      profilePicture: 'https://img.freepik.com/free-photo/user-front-side-with-white-background_187299-40007.jpg?w=740&t=st=1705633868~exp=1705634468~hmac=76e3865f1fd041589284444d1270b80bd35408a9ce616303cd36e6abfd08f9e8', 
      violationType: 'Profanity', 
      firstName:'Bobby', 
      lastName:'Boy', 
      countPerViolation:'20' },

    { // Dummy user details
      username: 'SobbyBoy123', 
      profilePicture: 'https://img.freepik.com/free-photo/user-front-side-with-white-background_187299-40007.jpg?w=740&t=st=1705633868~exp=1705634468~hmac=76e3865f1fd041589284444d1270b80bd35408a9ce616303cd36e6abfd08f9e8', 
      violationType: 'Profanity', 
      firstName:'Sobby', 
      lastName:'Boy', 
      countPerViolation:'20' },

    { // Dummy user details
      username: 'LobbyBoy123', 
      profilePicture: 'https://img.freepik.com/free-photo/user-front-side-with-white-background_187299-40007.jpg?w=740&t=st=1705633868~exp=1705634468~hmac=76e3865f1fd041589284444d1270b80bd35408a9ce616303cd36e6abfd08f9e8', 
      violationType: 'Profanity', 
      firstName:'Lobby', 
      lastName:'Boy', 
      countPerViolation:'20' },
    
    { // Finalize the variables here
      username: 'KenK123', 
      profilePicture: '', 
      violationType: 'Forgot to unmute', 
      firstName: 'Ken', 
      lastName: 'K', 
      countPerViolation: '1000'}
  ];

  useEffect(()=>{
    User.listenForUserState((user)=>{
      setUser(user)
    })
  },[])

  return (
   <>
   <NavBar
   onLeaderboardClick={()=>setSwitcher(HOMEPAGE_LEADERBOARD)}
   onNewReportClick={()=>setSwitcher(VIOLATION_LIST_COMPONENT)}
   onProfileClick={()=>setSwitcher(USER_DETAILS_COMPONENT)}
   onTeamsClick={()=>setSwitcher()}
   onLogout ={()=>setSwitcher(HOMEPAGE_LEADERBOARD)}
    style={{ zIndex: 1000 }}
    />
    {user?<>
      {switcher === USER_LIST_COMPONENT?<UsersList onPress={()=>{setSwitcher(VIOLATION_LIST_COMPONENT)}}/>:<></>}
      {switcher === VIOLATION_LIST_COMPONENT?<ViolationSelectList onPress={()=>{setSwitcher(HOMEPAGE_LEADERBOARD)}}/>:<></>}
      {switcher ===  USER_DETAILS_COMPONENT  ?<UserDetails user={HomepageLeaderBoardData[0]} onPress={()=>{setSwitcher(HOMEPAGE_LEADERBOARD)}}/>:<></>}
      {switcher === HOMEPAGE_LEADERBOARD? 
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={8} sx={{ position: 'relative', alignSelf: 'flex-start', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
          <HomepageLeaderBoard data={HomepageLeaderBoardData} onPress={()=>setSwitcher(USER_DETAILS_COMPONENT)}/>
        </Grid>
      </Grid>:<></>}</>:<Welcome/>}

    </>
  );
}
