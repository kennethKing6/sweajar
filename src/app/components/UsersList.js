"use client"
import { Grid,Avatar, Typography,Divider, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { User } from '../model/User';
import { SignedInUser } from '../model/SignedInUser';
import ReportButton from './ReportButton';
import { SwearType } from '../model/SwearType';

export default function UsersList({
    onPress = ()=>{}, 
}) {
    /**@param {[User]} */
    const [users,setUsers] = useState([]);

    useEffect(()=>{
        User.getUsersByteamID(
            SignedInUser.user.userID,
            SignedInUser.user.teamID
            ).then((users)=>{
                setUsers(users)
            }).catch((err)=>{
                console.log(err)
                setUsers([])
            })
    },[])
    
   

  return (
    <Grid container p={2} sx={{flex:1,flexDirection:'column'}}>
         <Typography variant="h4" gutterBottom>Employees List</Typography>
         <Button type="submit" variant="contained" color="primary" onClick={async ()=> await User.signOut()}>Sign out</Button>
        {users.map((data)=>{
            /**@type {User} */
            const currentUser = data
            return (
                <Grid  container sx={{flexDirection:'row'}}  mt={1} key={JSON.stringify(data)}> 

                    <Grid  sx={{justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                        <Avatar sx={{marginTop:1,width:56,height:56,":hover":{opacity:0.6}}} alt="Remy Sharp" src={currentUser.profilePicture} />
                    </Grid>

                    <Grid item pl={1}  onClick={onPress}>
                        <Typography variant="h6" gutterBottom>{currentUser.firstName} {currentUser.lastName}</Typography>
                        <Typography style={{marginTop:-5}}  gutterBottom>@{currentUser.username}</Typography>
                    </Grid>

                    <Divider component="li" light  />

                </Grid>
            )
        })}
        <ReportButton onPress={async ()=>{
            try{
              await SwearType.reportSelectedSwearTypes()
              alert("Successfully added violatons")
            }catch(err){
              err = `${err}`
              err = err.replace("Error:","")
              alert(err)
            }
          }}/>
    </Grid>
  )
}
