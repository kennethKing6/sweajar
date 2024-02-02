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

// TODO: create a team
// TODO: add team member

export default function TeamViewer({onAdd = () => {}}) {
    const [selected, setSelected] = useState([]);
    const [items, setItems] = useState([]);
    const [teamMemberEmail, setTeamMemberEmail] = useState("");
    const onToggle = (item) => {
        const index = selected.indexOf(item);
        if (index > -1) {
            setSelected(item);
        }
    };

    const onAddTeamMember = async () => {
        // Validate the input fields
        if (!teamMemberEmail) {
            alert ("Please enter an email for the new team member.");
            return;
        }
        // Add a new team member
        const newTeamMember = await Teams.addTeamMember(teamMemberEmail, selected.teamID);
        onAdd(newTeamMember);
        // Clear the input fields
        setTeamMemberEmail("");
    };

    useEffect(() => {
        // Fetch the list items from the database
        const fetchItems = async () => {
            const teams = await Teams.getTeams();
            alert(JSON.stringify(teams))
            setItems(teams);
        };
        fetchItems().then().catch()
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={8} sx={{ position: 'relative', alignSelf: 'flex-start', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                <Box sx={{ 
                    width: '100%', 
                    bgcolor: 'gray', 
                    color: 'white', 
                    padding: 2,
                    border: '2px solid yellow'
                }}>
                    <h1>
                    Team Viewer
                    </h1>
                    <List>
                        {items.map( (item) => (
                            <ListItem onClick={() => {
                                onToggle(item.teamName)
                            }}>
                                <ListItemIcon>
                                    <Checkbox checked={selected.includes(item.teamName)} />
                                </ListItemIcon>
                                <ListItemText primary={item.teamName} sx={{color:'black'}}/>
                            </ListItem>
                        ))}
                    </List>
                    <Divider color='white'/>
                    <br/>
                    <CreateNewTeam/>
                    <Divider color='white'/>
                    <br/>
                    <List subheader={
                        <ListSubheader component="div" id="newTeamMember-list-subheader" sx={{color: "white", bgcolor: "gray"}}>
                            Add Team Member
                        </ListSubheader>
                    }>
                        <ListItem>
                            <TextField
                                label="Team Member Email"
                                value={teamMemberEmail}
                                onChange={ (e) => setTeamMemberEmail(e.target.value)}
                            />
                        </ListItem>
                        <ListItem>
                            <Button variant="contained" color="primary" onClick={onAddTeamMember}>
                                Add
                            </Button>
                        </ListItem>
                    </List>
                </Box>
            </Grid>
        </Grid>
    );
}