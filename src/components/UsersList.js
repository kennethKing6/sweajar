"use client";
import {
  Grid,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Checkbox,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { User } from "../model/User";
import { SignedInUser } from "../model/SignedInUser";
import ReportButton from "./ReportButton";
import { Colors } from "../assets/colors";
import { ReportViolationsController } from "../controllers/reportViolationsController";
import { Teams } from "../model/Teams";

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
    <Grid container p={2} sx={{ flex: 1, flexDirection: "column" }}>
      <Typography variant="h4" gutterBottom>
        Employees List
      </Typography>
      <ReportButton
        onPress={async () => {
          try {
            await ReportViolationsController.reportUsers();
            alert("Successfully added violatons");
            setChecked([]);
          } catch (err) {
            let errMessage = `${err}`;
            errMessage = errMessage.replace("Error:", "");
            alert(errMessage);
          }
        }}
        bgColor={Colors.BUTTON_PRIMARY_COLOR}
      />
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
    <ListItem
      key={value}
      secondaryAction={
        <Checkbox
          edge="end"
          onChange={handleToggle(value, currentUser)}
          color="success"
          checked={checked.indexOf(value) !== -1}
          inputProps={{ "aria-labelledby": labelId }}
          sx={{ bgcolor: Colors.BORDER_COLOR, borderWidth: 2 }}
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
  );
}
