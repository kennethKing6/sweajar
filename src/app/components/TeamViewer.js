import React from "react";
import { useState,useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Divider,
  Grid,
} from "@mui/material";
import { Teams } from "../model/Teams";
import CreateNewTeam from "./CreateNewTeam";

// TODO: create a team
// TODO: add team member

export default function TeamViewer() {
    const [selected, setSelected] = useState([]);
    const [items, setItems] = useState([]);
    const onToggle = (item) => {
        const index = selected.indexOf(item);
        if (index > -1) {
            setSelected(item);
        }
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
                    <CreateNewTeam/>
                </Box>
            </Grid>
        </Grid>
    );
}