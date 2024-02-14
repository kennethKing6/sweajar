import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListSubheader,
  TextField,
  Button,
} from "@mui/material";
import { Teams } from "../model/Teams";

export default function CreateNewTeam({ onAdd = () => {} }) {
  const [teamName, setTeamName] = useState("");

  const onSubmit = async () => {
    // Validate the input fields
    if (!teamName) {
      alert("Please enter a name for the new team.");
      return;
    }
    // Create a new team
    const newTeam = await Teams.createTeam(teamName);
    onAdd(newTeam);
    // Clear the input fields
    setTeamName("");
  };

  return (
    <List
      subheader={
        <ListSubheader
          component="div"
          id="newTeam-list-subheader"
          sx={{ color: "white", bgcolor: "gray" }}
        >
          Create a New Team
        </ListSubheader>
      }
    >
      <ListItem>
        <TextField
          label="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
      </ListItem>
      <ListItem>
        <Button
          variant="contained"
          color="primary"
          onClick={async () => await onSubmit()}
        >
          Create
        </Button>
      </ListItem>
    </List>
  );
}
