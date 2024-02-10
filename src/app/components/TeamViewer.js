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
import CreateNewTeam from "./CreateNewTeam";
import AddTeamMember from "./AddTeamMember";
import AddIcon from "@mui/icons-material/Add";
import GroupAddIcon from '@mui/icons-material/GroupAdd';

export default function TeamViewer({onAdd = () => {}}) {
    const [selected, setSelected] = useState();
    const [items, setItems] = useState([]);
    const [teamMemberEmail, setTeamMemberEmail] = useState("");
    const [showAdd, setShowAdd] = useState(false);
    const [showNewTeam, setShowNewTeam] = useState(false);
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
                    maxWidth: 360, 
                    bgcolor: 'black', 
                    color: 'white', 
                    padding: 2,
                    border: '2px solid yellow'
                }}>
                    <Box display={"flex"}>
                        <h1>
                            Team Viewer
                        </h1>
                        <Tooltip title="Create a New Team" placement="top">
                            <IconButton onClick={() => setShowNewTeam(!showNewTeam)}>
                                <AddIcon sx={{ backgroundColor: 'yellow', color: 'black' }}/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Add Team Member" placement="top">
                            <IconButton onClick={() => setShowAdd(!showAdd)}>
                                <GroupAddIcon sx={{ backgroundColor: 'yellow', color: 'black' }}/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <List subheader={
                            <ListSubheader component="div" id="userTeams-list-subheader" sx={{color: "white", bgcolor: "black"}}>
                                Your Teams:
                            </ListSubheader>
                    }>
                        {items.map( (item) => (
                            <ListItem  key={JSON.stringify(item)} onClick={async () => {
                                await onToggle(item)
                            }}>
                                <ListItemIcon>
                                    <Checkbox checked={selected?selected.teamName === item.teamName:null} sx={{color:'white'}}/>
                                </ListItemIcon>
                                <ListItemText primary={item.teamName} sx={{color:'white'}}/>
                            </ListItem>
                        ))}
                    </List>
                    <Divider color='white'/>
                    <br/>
                    {showNewTeam && (<CreateNewTeam/>)}
                    <Divider color='white'/>
                    <br/>
                    {showAdd && (
                        <AddTeamMember
                            teamMemberEmail={teamMemberEmail}
                            setTeamMemberEmail={setTeamMemberEmail}
                            onAddTeamMember={onAddTeamMember}
                            selected={selected}
                        />
                    )}
                </Box>
            </Grid>
        </Grid>
    );
}