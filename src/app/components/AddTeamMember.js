import React from 'react';
import {
    List,
    ListItem,
    TextField,
    Button,
    ListSubheader
} from "@mui/material";

export default function AddTeamMember ({ teamMemberEmail, setTeamMemberEmail, onAddTeamMember, selected}) {
    return (
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
                        "& .MuiOutlinedInput-notchedOutline": { borderColor: 'white' },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: 'yellow' },
                        "& .MuiFormLabel-root.Mui-focused": { color: 'yellow' },
                    }}
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
    );
}