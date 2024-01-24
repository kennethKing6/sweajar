"use client"

import Button from "./components/Button";
import UsersList from "./components/UsersList";
import DropdownMenu from "./components/DropDownMenu"
import React from 'react';
import Grid from '@mui/material/Grid';
import ReportButton from './components/ReportButton';
import ReportList from './components/UserViolationDetails';
import UserViolationDetails from './components/UserViolationDetails';

export default function Home() {
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
    {/* <UsersList/> */}
   {/* <div>
    <DropdownMenu></DropdownMenu>
   </div> */}
  

    {/* <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={8} sx={{ position: 'relative', alignSelf: 'flex-start', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
        <UserViolationDetails data={userViolationDetailsData} />
      </Grid>
      <Grid item xs={12}>
        <ReportButton />
      </Grid>
    </Grid> */}
    </>
  );
}
