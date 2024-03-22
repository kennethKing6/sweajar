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
  Card,
  CardContent,
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
import DeleteIcon from "@mui/icons-material/Delete";
import { FontFamilies } from "../assets/fontFamilies";
import { TeamManagementManagerController } from "../controllers/teamManagementController";

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
          <h1 style={{ fontFamily: FontFamilies.title }}>Team Details</h1>
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
                <TeamMemberItem userID={member.userID} admin={member.admin} />
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
        <>
          <Grid container>
            <Grid item xs={10} />
            <Grid item xs={2}>
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
                    admin === userID ? Colors.ERROR_COLOR : Colors.ERROR_COLOR,
                  color: Colors.TEXT_COLOR,
                  fontSize: FontSizes.captionFontSize,
                  width: 100,
                }}
              />
            </Grid>
          </Grid>
          <Card
            key={JSON.stringify(user)}
            sx={{
              mb: 2,
              bgcolor: Colors.TEAM_COLOR_DARK_BLUE,
              color: Colors.TEXT_COLOR,
            }}
          >
            <CardContent>
              <Grid container alignItems={"center"}>
                <Grid item>
                  <ListItemAvatar>
                    {user ? (
                      <Avatar
                        alt={`${user.firstName}`}
                        src={user.profilePicture}
                      />
                    ) : (
                      <></>
                    )}
                  </ListItemAvatar>
                </Grid>
                <Grid item>
                  <ListItemText
                    primary={`${user.firstName} ${user.lastName}`}
                    secondary={
                      admin !== userID ? (
                        <DeleteIcon
                          sx={{
                            position: "absolute",
                            left: "90%",
                            color: Colors.TEXT_COLOR,
                            cursor: "pointer",
                          }}
                          onClick={async () => {
                            const { email, teamID } = user;
                            if (
                              window.confirm(
                                `Are you sure you want to delete ${user.firstName} ${user.lastName} from the team?`,
                              )
                            ) {
                              TeamManagementManagerController.deleteTeamMember(
                                email,
                                teamID,
                              );
                            }
                          }}
                        />
                      ) : (
                        <></>
                      )
                    }
                  />
                  <Typography>{user.email}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
