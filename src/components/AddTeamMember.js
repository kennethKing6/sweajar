import React from "react";
import { useState } from "react";
import { List, ListItem, TextField, Button, ListSubheader } from "@mui/material";
import { Teams } from "../model/Teams";
import { SignedInUser } from "../model/SignedInUser";
import { Colors } from "../assets/colors";
import { FontSizes } from "../assets/fonts";

export default function AddTeamMember({
  onAdd = () => { },
  onDelete = () => { },
}) {
  const [teamMemberEmail, setTeamMemberEmail] = useState("");

  const onAddTeamMember = async (teamMemberEmail, teamID) => {
    try {
      // Validate the input fields
      if (!teamMemberEmail) {
        alert("Please enter an email for the new team member.");
        return;
      }
      // Add a new team member
      const newTeamMember = await Teams.addTeamMember(teamMemberEmail, teamID);
      onAdd(newTeamMember);
      // Clear the input fields
      setTeamMemberEmail("");
    } catch (err) {
      alert("We could not find this user to add to the team");
    }
  };

  const onDeleteTeamMember = async (teamMemberEmail, teamID) => {
    // Validate the input fields
    if (!teamMemberEmail) {
      alert("Please enter an email for the team member to be deleted.");
      return;
    }
    // Delete a team member
    const removeTeamMember = await Teams.deleteTeamMember(
      teamMemberEmail,
      teamID,
    );
    onDelete(removeTeamMember);
    // Clear the input fields
    setTeamMemberEmail("");
  };

  return (
    <List
      subheader={
        <ListSubheader
          component="div"
          id="newTeamMember-list-subheader"
          sx={{ color: Colors.TEXT_COLOR, bgcolor: Colors.BACKGROUND_COLOR, fontSize: FontSizes.bodyFontSize }}
        >
          Add/Delete Team Member
        </ListSubheader>
      }
    >
      <ListItem>
        <TextField
          label="Team Member Email"
          value={teamMemberEmail}
          onChange={(e) => setTeamMemberEmail(e.target.value)}
          sx={{
            width: "100%",
            input: { color: Colors.TEXT_COLOR },
            label: { color: Colors.TEXT_COLOR },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: Colors.BORDER_WHITE },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: Colors.BORDER_BLUE },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              { borderColor: Colors.BORDER_BLUE },
            "& .MuiFormLabel-root.Mui-focused": { color: Colors.TEXT_COLOR },
          }}
        />
      </ListItem>
      <ListItem sx={{display: "flex", justifyContent:"space-between"}}>
        <Button
          variant="contained"
          onClick={async () => {
            await onAddTeamMember(teamMemberEmail, SignedInUser.user.teamID);
            //alert("Team member was successfully added")
          }}
          sx={{
            backgroundColor: Colors.BUTTON_PRIMARY_COLOR,
            color: Colors.TEXT_COLOR,
            "&:hover": {
              backgroundColor: Colors.BUTTON_SECONDARY_COLOR,
            },
            marginRight: "20px",
          }}
        >
          Add
        </Button>
        <Button
          variant="contained"
          onClick={async () => {
            await onDeleteTeamMember(teamMemberEmail, SignedInUser.user.teamID);
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
