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
} from "@mui/material";
import { Teams } from "../model/Teams";
import CreateNewTeam from "./CreateNewTeam";
import { User } from "../model/User";
import { SignedInUser } from "../model/SignedInUser";

// TODO: create a team
// TODO: add team member

export default function TeamViewer({onAdd = () => {}}) {
    const [selected, setSelected] = useState();
    const [items, setItems] = useState([]);
    const [teamMemberEmail, setTeamMemberEmail] = useState("");
    const onToggle = async (item) => {
        if( selected && selected.teamName === item.teamName)setSelected(null)
        else{
            setSelected(item)
            await User.updateCurrentTeam(item.teamID)
        }
        
    };

    useEffect(()=>{
        const teamID = SignedInUser.user.teamID
        if(teamID){
            Teams.getTeam(teamID).then((defaultTeam)=>{
                setSelected(defaultTeam)
            }).catch()

        }
    },[])

    const onAddTeamMember = async (teamMemberEmail,teamID) => {
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
            const teams = await Teams.getTeams();
            setItems(teams);
        };
        fetchItems().then().catch()
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={8} sx={{ position: 'relative', alignSelf: 'flex-start', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                <Box sx={{ 
                    width: '100%', 
                    bgcolor: 'black', 
                    color: 'white', 
                    padding: 2,
                    border: '2px solid yellow'
                }}>
                    <h1>
                    Team Viewer
                    </h1>
                    <List>
                        {items.map( (item) => (
                            <ListItem  key={JSON.stringify(item)} onClick={async () => {
                                await onToggle(item)
                            }}>
                                <ListItemIcon>
                                    <Checkbox checked={selected?selected.teamName === item.teamName:null} />
                                </ListItemIcon>
                                <ListItemText primary={item.teamName} sx={{color:'white'}}/>
                            </ListItem>
                        ))}
                    </List>
                    <Divider color='white'/>
                    <br/>
                    <CreateNewTeam/>
                    <Divider color='white'/>
                    <br/>
                    <List subheader={
                        <ListSubheader component="div" id="newTeamMember-list-subheader" sx={{color: "white", bgcolor: "black"}}>
                            Add Team Member
                        </ListSubheader>
                    }>
                        <ListItem>
                            <TextField
                                label="Team Member Email"
                                value={teamMemberEmail}
                                onChange={ (e) => setTeamMemberEmail(e.target.value)}
                                sx={{
                                    input: { color: 'white' },
                                    label: { color: 'white' },
                                    "& .MuiOutlinedInput-notchedOutline": { borderColor: 'white' },}}
                            />
                        </ListItem>
                        <ListItem>
                            <Button
                                variant="contained"
                                onClick={async ()=>{
                                    if(!selected) alert("Please select a team to report to")
                                    await onAddTeamMember(teamMemberEmail,selected.teamID)
                                    alert("Team member was successfully added")
                                }}
                                sx={{ 
                                    backgroundColor: '#FFEB3B', 
                                    color: 'black', 
                                    '&:hover':{
                                        backgroundColor: '#FFC107',
                                    }
                                }}
                            >
                                Add
                            </Button>
                        </ListItem>
                    </List>
                </Box>
            </Grid>
        </Grid>
    );
}