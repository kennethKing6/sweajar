import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListSubheader,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  TextField,
  Button,
  Checkbox,
  Divider,
  Grid,
  Tooltip,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";
import { Teams } from "../model/Teams";
import { User } from "../model/User";
import { SignedInUser } from "../model/SignedInUser";
import AddTeamMember from "./AddTeamMember";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";

export default function TeamDetails({ onAdd = () => {} }) {
  const [selected, setSelected] = useState();
  const [items, setItems] = useState(null);
  const [teamMemberEmail, setTeamMemberEmail] = useState("");
  const [showTeamMembers, setShowTeamMembers] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);

  // const onAddTeamMember = async (teamMemberEmail, teamID) => {
  //   // Validate the input fields
  //   if (!teamMemberEmail) {
  //     alert("Please enter an email for the new team member.");
  //     return;
  //   }
  //   // Add a new team member
  //   const newTeamMember = await Teams.addTeamMember(teamMemberEmail, teamID);
  //   onAdd(newTeamMember);
  //   // Clear the input fields
  //   setTeamMemberEmail("");
  //   alert("Successfully Added Team Member");
  // };

  useEffect(() => {
    // Fetch the list items from the database
    Teams.getTeamMembers(SignedInUser.user.teamID)
      .then((data) => {
        setTeamMembers(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
      <Grid
        item
        xs={12}
        md={6}
        lg={8}
        sx={{
          position: "relative",
          alignSelf: "flex-start",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            bgcolor: "black",
            color: "white",
            padding: 2,
            border: "2px solid yellow",
          }}
        >
          <Box display={"flex"}>
            <h1>Team Details</h1>
            <Tooltip title="Show Team Members" placement="top">
              <IconButton
                onClick={() => {
                  setShowTeamMembers(true);
                  setShowAdd(false);
                }}
              >
                <FormatListBulletedIcon
                  sx={{ backgroundColor: "yellow", color: "black" }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add Team Member" placement="top">
              <IconButton
                onClick={() => {
                  setShowTeamMembers(false);
                  setShowAdd(true);
                }}
              >
                <GroupAddIcon
                  sx={{ backgroundColor: "yellow", color: "black" }}
                />
              </IconButton>
            </Tooltip>
          </Box>

          {showTeamMembers && (
            <List
              subheader={
                <ListSubheader
                  component="div"
                  id="teamMembers-list-subheader"
                  sx={{ color: "white", bgcolor: "black" }}
                >
                  Team Members:
                </ListSubheader>
              }
            >
              {teamMembers &&
                teamMembers.map((member, index) => (
                  <ListItem key={index}>
                    <TeamMemberItem userID={member.userID} />
                  </ListItem>
                ))}
            </List>
          )}
          {showAdd && (
            <AddTeamMember/>
          )}
        </Box>
      </Grid>
  );
}
function TeamMemberItem({ userID }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    User.getUserByID(userID)
      .then((currentUser) => setUser(currentUser))
      .catch((err) => console.log(err));
  }, [userID]);
  return (
    <>
      {user ? (
        <Grid container alignItems={"center"}>
          <Grid item>
            <ListItemAvatar>
              {user ? (
                <Avatar alt={`${user.firstName}`} src={user.profilePicture} />
              ) : (
                <></>
              )}
            </ListItemAvatar>
          </Grid>
          <Grid item>
            <ListItemText primary={`${user.firstName} ${user.lastName}`} />
            <Typography>{user.email}</Typography>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </>
  );
}
