import React, {useState} from "react";
import {
    List,
    ListItem,
    ListSubheader,
    Box,
    TextField,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import { SwearType } from "../model/SwearType";

export default function AddSwearType ({onAdd = () => {}}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [level, setLevel] = useState("");

    const onSubmit = async () => {
        // Validate the input fields
        if (!name || !description || !level) {
            alert ("Please enter a name, a description and level for the new swear type.");
            return;
        }
        // Create a new swear type object
        const query = {name, description, level};
        const newSwearType = await SwearType.createNewSwearType(query);
        onAdd(newSwearType);
        // Clear the input fields
        setName("");
        setDescription("");
        setLevel("");
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            <List subheader={
                <ListSubheader component="div" id="newType-list-subheader">
                    Add new Swear Type
                </ListSubheader>
            }>
                <ListItem>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={ (e) => setName(e.target.value)}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        label="Description"
                        value={description}
                        onChange={ (e) => setDescription(e.target.value)}
                    />
                </ListItem>
                <ListItem>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select Level</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={level}
                            label="Level"
                            onChange={ (e) => setLevel(e.target.value)}
                        >
                            <MenuItem value="minor">Minor</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="major">Major</MenuItem>
                        </Select>
                    </FormControl>
                </ListItem>
                <ListItem>
                    <Button variant="contained" color="primary" onClick={onSubmit}>
                        Submit
                    </Button>
                </ListItem>
            </List>
        </Box>
    );
}