import React, { useEffect, useState } from "react";
import {
    List,
    ListItem,
    ListSubheader,
    Box,
    TextField,
    Button,
} from "@mui/material";
import { SwearType } from "../model/SwearType";
import { Teams } from "../model/Teams";
import { SignedInUser } from "../model/SignedInUser";
import {Colors} from "../assets/colors";

export default function AddSwearType({ onAdd = () => { } }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [level, setLevel] = useState("");
    const [teamID, setTeamID] = useState("");
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        Teams.getTeams().then((teams) => {
            setTeams(teams)
        }).catch()
    }, [])

    const onSubmit = async () => {
        // Validate the input fields
        if (!name || !description) {
            alert("Please enter name and description for the new swear type.");
            return;
        }
        // Create a new swear type object
        setLevel('');
        const tID = SignedInUser.user.teamID;
        setTeamID(tID);
        const query = { name, description, level, teamID };
        const newSwearType = await SwearType.createNewSwearType(query);
        onAdd(newSwearType);
        // Clear the input fields
        setName("");
        setDescription("");
        setLevel("");
        setTeamID("")
    };

    return (
        <Box sx={{ width: '100%', bgcolor: Colors.BACKGROUND_COLOR }}>
            <List subheader={
                <ListSubheader component="div" id="newType-list-subheader" sx={{ color: Colors.SECONDARY_COLOR, bgcolor: Colors.BACKGROUND_COLOR }}>
                    Add new Violation
                </ListSubheader>
            }>
                <ListItem>
                    <TextField
                        fullWidth
                        label="Enter Violation Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{
                            input: { color: Colors.SECONDARY_COLOR },
                            label: { color: Colors.SECONDARY_COLOR },
                            "& .MuiOutlinedInput-notchedOutline": { borderColor: Colors.BORDER_WHITE },
                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: Colors.BORDER_WHITE },
                            "& .MuiFormLabel-root.Mui-focused": { color: Colors.BACKGROUND_COLOR_YELLOW },
                        }}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        fullWidth
                        label="Enter Violation Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        sx={{
                            input: { color: Colors.SECONDARY_COLOR },
                            label: { color: Colors.SECONDARY_COLOR },
                            "& .MuiOutlinedInput-notchedOutline": { borderColor: Colors.BORDER_WHITE },
                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: Colors.BORDER_YELLOW },
                            "& .MuiFormLabel-root.Mui-focused": { color: Colors.TERTIARY_COLOR },
                        }}
                    />
                </ListItem>
                {/* <ListItem>
                    <FormControl fullWidth
                        sx={{
                            selected: { color: 'white' },
                            label: { color: 'white' },
                            "& .MuiOutlinedInput-notchedOutline": { borderColor: 'white' },
                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: 'yellow' },
                            "& .MuiFormLabel-root.Mui-focused": { color: 'yellow' },
                        }}
                    >
                        <InputLabel id="demo-simple-select-label">Select Level</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={level}
                            label="Level"
                            onChange={ (e) => setLevel(e.target.value)}
                            sx={{ color: 'white' }}
                        >
                            <MenuItem value="minor">Minor</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="major">Major</MenuItem>
                        </Select>
                    </FormControl>
                </ListItem> */}
                <ListItem>
                    <Button
                        variant="contained"
                        onClick={onSubmit}
                        sx={{
                            backgroundColor: Colors.BACKGROUND_COLOR_GOLD,
                            color: Colors.TEXT_COLOR_SECONDARY,
                            '&:hover': {
                                backgroundColor: Colors.BUTTON_GOLD,
                            }
                        }}
                    >
                        Submit
                    </Button>
                </ListItem>
            </List>
        </Box>
    );
}