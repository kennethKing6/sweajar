"use client";
import {
  Grid,
  Avatar,
  Typography,
  Divider,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Checkbox,
  Card,
  CardContent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { User } from "../model/User";
import { SignedInUser } from "../model/SignedInUser";
import ReportButton from "./ReportButton";
import { Colors } from "../assets/colors";
import { ReportViolationsController } from "../controllers/reportViolationsController";
import { Teams } from "../model/Teams";
import { FontFamilies } from "../assets/fontFamilies";

export default function UsersList({ onPress = () => {} }) {
  /**@param {[User]} */
  const [users, setUsers] = useState([]);
  const [checked, setChecked] = React.useState([1]);

  useEffect(() => {
    Teams.getTeamMembers(SignedInUser.user.teamID)
      .then((users) => {
        setUsers(users);
      })
      .catch((err) => {
        console.log(err);
        setUsers([]);
      });
  }, []);

  return (
    <Grid
      container
      p={2}
      sx={{
        flex: 1,
        flexDirection: "column",
        bgcolor: Colors.BACKGROUND_COLOR,
        height: "90vh",
      }}
    >
      <Grid container sx={{ mt: 2, mb: 2 }}>
        <Grid item xs={10}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: Colors.TEAM_COLOR_BEIGE,
              fontFamily: FontFamilies.title,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Employees List
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <ReportButton
            onPress={async () => {
              try {
                await ReportViolationsController.reportUsers();
                alert("Successfully added violatons");
                setChecked([]);
              } catch (err) {
                err = `${err}`;
                err = err.replace("Error:", "");
                alert(err);
              }
            }}
            bgColor={Colors.BUTTON_PRIMARY_COLOR}
          />
        </Grid>
      </Grid>
      <List dense sx={{ width: "100%" }}>
        {users.map((user) => {
          /**@type {User} */
          return (
            <TeamMemberItem
              value={user.userID}
              checked={checked}
              setChecked={setChecked}
            />
          );
        })}
      </List>
    </Grid>
  );
}
function TeamMemberItem({ value, checked, setChecked }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    User.getUserByID(value)
      .then((user) => setCurrentUser(user))
      .catch((err) => console.log(err));
  }, [value]);

  const handleToggle = (value, currentUser) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      ReportViolationsController.selectUser(currentUser);
    } else {
      newChecked.splice(currentIndex, 1);
      ReportViolationsController.selectUser(currentUser);
    }

    setChecked(newChecked);
  };
  const labelId = `checkbox-list-secondary-label-${value}`;

  return (
    <Card
      key={JSON.stringify(value)}
      sx={{
        mb: 2,
        bgcolor:
          checked.indexOf(value) !== -1 ? Colors.TEAM_COLOR_DARK_BLUE : "white",
        color:
          checked.indexOf(value) !== -1
            ? Colors.TEXT_COLOR
            : Colors.TEXT_COLOR_SECONDARY,
      }}
    >
      <CardContent onClick={() => handleToggle(value, currentUser)}>
        <ListItem
          key={value}
          secondaryAction={
            <Checkbox
              edge="end"
              onChange={handleToggle(value, currentUser)}
              color="success"
              checked={checked.indexOf(value) !== -1}
              inputProps={{ "aria-labelledby": labelId }}
              sx={{ bgcolor: "white", borderWidth: 2 }}
            />
          }
          disablePadding
        >
          <ListItemButton>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${value + 1}`}
                src={currentUser ? currentUser.profilePicture : ""}
              />
            </ListItemAvatar>
            <ListItemText
              id={labelId}
              primary={`${currentUser ? currentUser.firstName : ""} ${currentUser ? currentUser.lastName : ""}`}
            />
          </ListItemButton>
        </ListItem>
      </CardContent>
    </Card>
  );
}
