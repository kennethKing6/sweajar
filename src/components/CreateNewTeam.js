import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListSubheader,
  TextField,
  Button,
  Alert,
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

    //Alert Users of the success
    alert("Team Creation Successful");
  };

  return (
    <List
      subheader={
        <ListSubheader
          component="div"
          id="newTeam-list-subheader"
          sx={{ color: "white", bgcolor: "black" }}
        >
          Create a New Team / Delete a Team
        </ListSubheader>
      }
    >
      <ListItem>
        <TextField
          label="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          sx={{
            input: { color: "white" },
            label: { color: "white" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              { borderColor: "yellow" },
            "& .MuiFormLabel-root.Mui-focused": { color: "yellow" },
          }}
        />
      </ListItem>
      <ListItem>
        <Button
          variant="contained"
          onClick={async () => await onSubmit()}
          sx={{
            backgroundColor: "#FFEB3B",
            color: "black",
            "&:hover": {
              backgroundColor: "#FFC107",
            },
            marginRight: "10px",
          }}
        >
          Create
        </Button>
        <Button
          variant="contained"
          onClick={async () => {
            try {
              await Teams.deleteTeamByName(teamName);
              alert("Team was successfully deleted");
            } catch (err) {
              alert("Could not delete team");
            }
          }}
          sx={{
            backgroundColor: "#FFEB3B",
            color: "black",
            "&:hover": {
              backgroundColor: "#FFC107",
            },
          }}
        >
          Delete
        </Button>
      </ListItem>
    </List>
  );
}
