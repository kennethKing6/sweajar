import React, {useState} from "react";
import {
    List,
    ListItem,
    ListSubheader,
    Box,
    TextField,
    Button,
} from "@mui/material";
import { SwearType } from "../model/SwearType";

export default function AddSwearType ({onAdd = () => {}}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const onSubmit = async () => {
        // Validate the input fields
        if (!name || !description) {
            alert ("Please enter a name a description for the new swear type.");
            return;
        }
        // Create a new swear type object
        const query = {name, description};
        const newSwearType = await SwearType.createNewSwearType(query);
        onAdd(newSwearType);
        // Clear the input fields
        setName("");
        setDescription("");
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
                    <Button variant="contained" color="primary" onClick={onSubmit}>
                        Submit
                    </Button>
                </ListItem>
            </List>
        </Box>
    );
}