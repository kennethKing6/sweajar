import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListSubheader,
  ListItemText,
  ListItemAvatar,
  Grid,
  Tooltip,
  IconButton,
  Typography,
  Avatar,
  Chip,
} from "@mui/material";
import { Teams } from "../model/Teams";
import { User } from "../model/User";
import { SignedInUser } from "../model/SignedInUser";
import AddTeamMember from "./AddTeamMember";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Colors } from "../assets/colors";
import { FontSizes } from "../assets/fonts";
import { MARGIN_SIZES } from "../assets/sizes";

export default function TeamDetails() {
  const [showTeamMembers, setShowTeamMembers] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);

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
          {/* <Tooltip title="Show Team Members" placement="top"> */}
          <IconButton
            title="Show Team Members"
            onClick={() => {
              setShowTeamMembers(true);
              setShowAdd(false);
            }}
          >
            <FormatListBulletedIcon
              sx={{ backgroundColor: "yellow", color: "black" }}
            />
          </IconButton>
          {/* </Tooltip> */}
          {/* <Tooltip title="Add/Delete Team Member" placement="top"> */}
          <IconButton
            title="Add/Delete Team Member"
            onClick={() => {
              setShowTeamMembers(false);
              setShowAdd(true);
            }}
          >
            <GroupAddIcon sx={{ backgroundColor: "yellow", color: "black" }} />
          </IconButton>
          {/* </Tooltip> */}
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
                  <TeamMemberItem userID={member.userID} admin={member.admin} />
                </ListItem>
              ))}
          </List>
        )}
        {showAdd && <AddTeamMember />}
      </Box>
    </Grid>
  );
}
export function TeamMemberItem({ userID, admin }) {
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
            <Chip
              label={
                admin === userID
                  ? "Admin"
                  : userID === SignedInUser.user.userID
                    ? "You"
                    : "Member"
              }
              sx={{
                backgroundColor:
                  admin === userID
                    ? Colors.BACKGROUND_COLOR
                    : Colors.ERROR_COLOR,
                color: Colors.TEXT_COLOR,
                fontSize: FontSizes.captionFontSize,
              }}
            />
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </>
  );
}
