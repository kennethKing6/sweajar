"use client"

import Button from "./components/Button";
import UsersList from "./components/UsersList";
import ViolationSelectList from "./components/ViolationSelectList"
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import ReportButton from './components/ReportButton';
import ReportList from './components/UserViolationDetails';
import UserViolationDetails from './components/UserViolationDetails';

const USER_LIST_COMPONENT = 'userLiist';
const VIOLATION_LIST_COMPONENT = 'userViolations';
const VIOLATION_DETAILS_COMPONENT = 'userViolationsDetails';

export default function Home() {
   const [switcher,setSwitcher]  = useState(USER_LIST_COMPONENT)
  const userViolationDetailsData = [
    { // Dummy user details
      username: 'BobbyBoy123', 
      profilePicture: 'https://img.freepik.com/free-photo/user-front-side-with-white-background_187299-40007.jpg?w=740&t=st=1705633868~exp=1705634468~hmac=76e3865f1fd041589284444d1270b80bd35408a9ce616303cd36e6abfd08f9e8', 
      violationType: 'Profanity', 
      firstName:'Bobby', 
      lastName:'Boy', 
      countPerViolation:'69420' },
    
    { // Finalize the variables here
      username: '', 
      profilePicture: '', 
      violationType: '', 
      firstName: '', 
      lastName: '', 
      countPerViolation: ''}
  ];

  return (
   <>
    {switcher === USER_LIST_COMPONENT?<UsersList onPress={()=>{setSwitcher(VIOLATION_LIST_COMPONENT)}}/>:<></>}
    {switcher === VIOLATION_LIST_COMPONENT?<ViolationSelectList onPress={()=>{setSwitcher(VIOLATION_DETAILS_COMPONENT)}}/>:<></>}
   {switcher ===VIOLATION_DETAILS_COMPONENT? <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={8} sx={{ position: 'relative', alignSelf: 'flex-start', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
        <UserViolationDetails data={userViolationDetailsData} onExit={()=>setSwitcher(USER_LIST_COMPONENT)}/>
      </Grid>
     
    </Grid>:<></>}
    </>
  );
}
