import React from "react";
import { useState,useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListSubheader,
  ListItemIcon,
  ListItemText,
  TextField,
  Button,
  Checkbox,
  Divider,
  Grid,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Teams } from "../model/Teams";
import { User } from "../model/User";
import { SignedInUser } from "../model/SignedInUser";
import AddTeamMember from "./AddTeamMember";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

export default function TeamDetails({onAdd = () => {}}) {
    const [selected, setSelected] = useState();
    const [items, setItems] = useState(null);
    const [teamMemberEmail, setTeamMemberEmail] = useState("");
    const [showTeamMembers, setShowTeamMembers] = useState(true);
    const [showAdd, setShowAdd] = useState(false);
    const onToggle = async (item) => {
        if( selected && selected.teamName === item.teamName)setSelected(null)
        else{
            setSelected(item)
            await User.updateCurrentTeam(item.teamID)
        }
    };
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

    const onAddTeamMember = async (teamMemberEmail, teamID) => {
        // Validate the input fields
        if (!teamMemberEmail) {
            alert ("Please enter an email for the new team member.");
            return;
        }
        // Add a new team member
        const newTeamMember = await Teams.addTeamMember(teamMemberEmail, teamID);
        onAdd(newTeamMember);
        // Clear the input fields
        setTeamMemberEmail("");
    };

    useEffect(() => {
        // Fetch the list items from the database
        const fetchItems = async () => {
            const teams = await Teams.getTeam(SignedInUser.user.teamID);
            setItems(teams);
        };
        fetchItems().then().catch()
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={8} sx={{ position: 'relative', alignSelf: 'flex-start', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                <Box sx={{ 
                    width: '100%',
                    maxWidth: 360, 
                    bgcolor: 'black', 
                    color: 'white', 
                    padding: 2,
                    border: '2px solid yellow'
                }}>
                    <Box display={"flex"}>
                        <h1>
                            {/* {items.teamName}*/}Team Details
                        </h1>
                        <Tooltip title="Show Team Members" placement="top">
                            <IconButton onClick={() => {setShowTeamMembers(true), setShowAdd(false)}}>
                                <FormatListBulletedIcon sx={{ backgroundColor: 'yellow', color: 'black' }}/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Add Team Member" placement="top">
                            <IconButton onClick={() => {setShowTeamMembers(false), setShowAdd(true)}}>
                                <GroupAddIcon sx={{ backgroundColor: 'yellow', color: 'black' }}/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                    {showTeamMembers && (
                        <List subheader={
                            <ListSubheader component="div" id="teamMembers-list-subheader" sx={{color: "white", bgcolor: "black"}}>
                                Team Members:
                            </ListSubheader>
                        }>
                            {HomepageLeaderBoardData && HomepageLeaderBoardData.map((user, index) => (
                                <ListItem key={index}>
                                    <Checkbox sx={{color:'white'}}/>
                                    <ListItemText primary={`${user.firstName} ${user.lastName}`}/>
                                </ListItem>
                            ))}
                            {/* {items && Object.entries(items.teamMembers).map(([userID, firstName, lastName]) => (
                                <ListItem key={userID}>
                                    <ListItemText primary={firstName} {lastName}/>
                                </ListItem>
                            ))} */}
                            {/* {items.map( (item) => (
                                <ListItem  key={JSON.stringify(item)} onClick={async () => {
                                    await onToggle(item)
                                }}>
                                    <ListItemIcon>
                                        <Checkbox checked={selected?selected.teamName === item.teamName:null} sx={{color:'white'}}/>
                                    </ListItemIcon>
                                    <ListItemText primary={item} sx={{color:'white'}}/>
                                </ListItem>
                            ))} */}
                        </List>
                    )}
                    {showAdd && (
                        <AddTeamMember
                            teamMemberEmail={teamMemberEmail}
                            setTeamMemberEmail={setTeamMemberEmail}
                            onAddTeamMember={onAddTeamMember}
                            teamID={SignedInUser.user.teamID}
                        />
                    )}
                </Box>
            </Grid>
        </Grid>
    );
}