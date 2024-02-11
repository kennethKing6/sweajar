import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Avatar, Stack, Typography } from "@mui/material";
import SortButton from "./SortButton";
import UserDetails from "./UserDetails";
import { User } from "../model/User";
import { SignedInUser } from "../model/SignedInUser";
import { Report } from "../model/Report";
import {
  ListItemSecondaryAction,
  Chip,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
} from "@mui/material";
import { Colors } from "../assets/colors";
import { FontSizes } from "../assets/fonts";

export default function HomepageLeaderBoard({
  data,
  onExit = () => {},
  onPress = () => {},
  onNavigateToTeams = () => {},
}) {
  const [sortedData, setSortedData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    User.getUsersByteamID(SignedInUser.user.userID, SignedInUser.user.teamID)
      .then((teams) => setSortedData(teams))
      .catch();
  }, []);

  const sortAlphabetically = () => {
    const sorted = [...sortedData].sort((a, b) =>
      `${a.firstName} ${a.lastName}`.localeCompare(
        `${b.firstName} ${b.lastName}`,
      ),
    );
    setSortedData(sorted);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    onPress();
  };

  return (
    <Grid container spacing={2}>
      {sortedData.length > 0 ? (
        <Grid item xs={12} md={8} lg={6} alignSelf="flex-start">
          <Box
            sx={{
              width: "100%",
              bgcolor: "black",
              color: "white",
              padding: 2,
              border: "2px solid yellow",
            }}
          >
            <>
              <h1>Homepage Leaderboard </h1>
              <SortButton onPress={sortAlphabetically} />
              <nav aria-label="main reported folder">
                <List>
                  {sortedData.map((person, index) => (
                    <UserItem person={person} index={index} />
                  ))}
                </List>
              </nav>
            </>
          </Box>
        </Grid>
      ) : (
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100vh" }}
          onClick={onNavigateToTeams}
        >
          <Typography variant="h4" pl={4}>
            Add Teams here +{" "}
          </Typography>
        </Stack>
      )}
    </Grid>
  );
}

function UserItem({ person, index }) {
  const [highestViolation, setHighestViolation] = useState(null);
  const [highestViolationCount, setHighestViolationCount] = useState("0");
  const [violationColor, setViolationColor] = useState(Colors.ACCENT_COLOR_2);
  useEffect(() => {
    Report.getTheHighestViolationByUserID(
      person.userID,
      SignedInUser.user.teamID,
    )
      .then((data) => {
        console.log(data);
        setHighestViolationCount(
          data.highestViolationsMetrics.highestViolationCount,
        );
        setHighestViolation(data.highestViolationsMetrics.swearType.name);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <ListItem key={index}>
      <ListItemButton>
        <ListItemAvatar>
          <Avatar alt={`${person.firstName}`} src={person.profilePicture} />
        </ListItemAvatar>
        <ListItemText
          primary={`${person.firstName} ${person.lastName}`}
          secondary={
            highestViolation ? (
              <Chip
                label={`${highestViolation}`}
                sx={{
                  backgroundColor: violationColor,
                  color: Colors.TEXT_COLOR,
                  fontSize: FontSizes.captionFontSize,
                }}
              />
            ) : (
              <></>
            )
          }
        />

        <ListItemSecondaryAction>
          {" "}
          <Chip
            label={highestViolationCount}
            sx={{
              backgroundColor: violationColor,
              color: Colors.TEXT_COLOR,
              fontWeight: "bold",
              fontSize: FontSizes.captionFontSize,
            }}
          />
        </ListItemSecondaryAction>
      </ListItemButton>
    </ListItem>
  );
}
