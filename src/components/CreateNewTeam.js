import React, { useState } from "react";
import {
  List,
  ListItem,
  ListSubheader,
  TextField,
  Button,
} from "@mui/material";
import { Teams } from "../model/Teams";
import { Colors } from "../assets/colors";
import { FontSizes } from "../assets/fonts";

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
            width: "100%",
            input: { color: Colors.TEXT_COLOR  },
            label: { color: Colors.TEXT_COLOR  },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: Colors.BORDER_WHITE },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: Colors.BORDER_BLUE },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              { borderColor:  Colors.BORDER_BlUE },
            "& .MuiFormLabel-root.Mui-focused": { color: Colors.TEXT_COLOR },
          }}
        />
      </ListItem>
      <ListItem sx={{display: "flex", justifyContent:"space-between"}}>
        <Button
          variant="contained"
          onClick={async () => await onSubmit()}
          sx={{
            backgroundColor: Colors.BUTTON_PRIMARY_COLOR,
            color: Colors.TEXT_COLOR,
            "&:hover": {
              backgroundColor: Colors.BUTTON_SECONDARY_COLOR,
            },
            marginRight: "20px",
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
            backgroundColor: Colors.BUTTON_PRIMARY_COLOR,
            color: Colors.TEXT_COLOR,
            "&:hover": {
              backgroundColor: Colors.BUTTON_SECONDARY_COLOR,
            },
          }}
        >
          Delete
        </Button>
      </ListItem>
    </List>
  );
}
