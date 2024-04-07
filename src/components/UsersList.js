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
import { FontSizes } from "../assets/fonts";

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
        bgcolor: Colors.BACKGROUND_COLOR,
        height: "95%",
      }}
    >
      <Grid container sx={{ mt: 2, mb: 2 }}>
        <Grid item xs={10}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: Colors.TEXT_COLOR,
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
            bgColor={Colors.BUTTON_SECONDARY_COLOR}
            color={Colors.TEXT_COLOR}
          />
        </Grid>
      </Grid>
      <Grid container>
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
    </Grid>
  );
}
export function TeamMemberItem({ value, checked, setChecked }) {
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
        border: `1px solid ${Colors.BORDER_BLUE}`,
        bgcolor:
          checked.indexOf(value) !== -1
            ? Colors.NAVBAR_SELECT_COLOR
            : Colors.BACKGROUND_COLOR_EERIE,
        color:
          checked.indexOf(value) !== -1 ? Colors.TEXT_COLOR : Colors.TEXT_COLOR,
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
              sx={{
                bgcolor: Colors.SECONDARY_COLOR,
                borderWidth: 2,
                "&:hover": {
                  bgcolor: Colors.BACKGROUND_COLOR_GOLD,
                },
              }}
            />
          }
          disablePadding
        >
          <Grid container>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${value + 1}`}
                src={currentUser ? currentUser.profilePicture : ""}
              />
            </ListItemAvatar>
            <ListItemText
              id={labelId}
              primary={`${currentUser ? currentUser.firstName : ""} ${currentUser ? currentUser.lastName : ""}`}
              secondary={` ${currentUser ? currentUser.email : ""}`}
              secondaryTypographyProps={{
                color:
                  checked.indexOf(value) !== -1
                    ? Colors.TEXT_COLOR
                    : Colors.TEXT_COLOR,
              }}
            />
          </Grid>
        </ListItem>
      </CardContent>
    </Card>
  );
}
