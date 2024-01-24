"use client"
import { Grid,Avatar, Typography,Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { User } from '../model/User';
import { SignedInUser } from '../model/SignedInUser';

export default function UsersList({
    onNavigate = ()=>{}
}) {
    /**@param {[User]} */
    const [users,setUsers] = useState([new User({
        companyID:'sdkkds',
        employeedID:'jshdjfhlda',
        firstName:'Kenneth',
        lastName:'Kouadio',
        userID:'lsjdnjsd',
        username:'joker'
    }),
    new User({
        companyID:'sdkkds',
        employeedID:'jshdjfhlda',
        firstName:'John',
        lastName:'Kou',
        userID:'lsjdnjsd',
        username:'joker'
    })]);

    useEffect(()=>{
        // User.getUsersByCompanyID(
        //     SignedInUser.user.userID,
        //     SignedInUser.user.companyID
        //     ).then((users)=>{
        //         setUsers(users)
        //     }).catch((err)=>{setUsers([])})
    },[])

  return (
    <Grid container p={2} sx={{flex:1,flexDirection:'column'}}>
         <Typography variant="h4" gutterBottom>Employees List</Typography>
        {users.map((data)=>{
            /**@type {User} */
            const currentUser = data
            return (
                <Grid container sx={{flexDirection:'row'}}  mt={1} key={currentUser.userID}> 

                    <Grid  sx={{justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                        <Avatar sx={{marginTop:1,width:56,height:56,":hover":{opacity:0.6}}} alt="Remy Sharp" src={currentUser.profilePicture} />
                    </Grid>

                    <Grid item pl={1}  onClick={onNavigate}>
                        <Typography variant="h6" gutterBottom>{currentUser.firstName} {currentUser.lastName}</Typography>
                        <Typography style={{marginTop:-5}}  gutterBottom>@{currentUser.username}</Typography>
                    </Grid>

                    <Divider component="li" light  />

                </Grid>
            )
        })}
    </Grid>
  )
}
