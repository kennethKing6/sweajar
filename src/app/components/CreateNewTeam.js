import React, {useEffect, useState} from "react";
import {
    List,
    ListItem,
    ListSubheader,
    TextField,
    Button,
} from "@mui/material";
import { Teams } from "../model/Teams";

export default function CreateNewTeam ({onAdd = () => {}}) {
    const [teamName, setTeamName] = useState("");

    const onSubmit = async () => {
        // Validate the input fields
        if (!teamName) {
            alert ("Please enter a name for the new team.");
            return;
        }
        // Create a new team
        const newTeam = await Teams.createTeam(teamName);
        onAdd(newTeam);
        // Clear the input fields
        setTeamName("");
    };

    return (
        <List subheader={
            <ListSubheader component="div" id="newTeam-list-subheader" sx={{color: "white", bgcolor: "black"}}>
                Create a New Team
            </ListSubheader>
        }>
            <ListItem>
                <TextField
                    label="Team Name"
                    value={teamName}
                    onChange={ (e) => setTeamName(e.target.value)}
                    sx={{
                        input: { color: 'white' },
                        label: { color: 'white' },
                        "& .MuiOutlinedInput-notchedOutline": { borderColor: 'white' },
                    }}
                />
            </ListItem>
            <ListItem>
                <Button
                    variant="contained"
                    onClick={async ()=> await onSubmit()}
                    sx={{ 
                        backgroundColor: '#FFEB3B', 
                        color: 'black', 
                        '&:hover':{
                            backgroundColor: '#FFC107',
                        }
                    }}
                >
                    Create
                </Button>
            </ListItem>
        </List>
    );
}

