import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Avatar, Stack, Typography } from "@mui/material";
import SortButton from "./SortButton";
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
import { Charts } from "react-charts";
import LeaderboardChart from "./LeaderboardChart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { MARGIN_SIZES } from "../assets/sizes";
import { appDimensions } from "../assets/appDimensions";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { width_sizes } from "../assets/width";
import NativeSelect from "@mui/material/NativeSelect";
import { Teams } from "../model/Teams";
import { HomePageLeaderBoardController } from "../controllers/homePageLeaderBoardController";
import { FirebaseDatabase } from "../shared/firebase/firebaseDatabase";
import { AppState } from "../model/AppState";

export default function HomepageLeaderBoard({
  data,
  onExit = () => {},
  onPress = () => {},
  onNavigateToTeams = () => {},
}) {
  const [sortedData, setSortedData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [profanitySorter, setProfanitySorter] = useState(null);

  useEffect(() => {
    if (!profanitySorter || profanitySorter === "All") {
      HomePageLeaderBoardController.getAllTeamMembers()
        .then((teamMembers) => setSortedData(teamMembers))
        .catch();
    } else if (profanitySorter) {
      HomePageLeaderBoardController.selectAllTeamMembersByViolations(
        profanitySorter,
      )
        .then((teamMembers) => setSortedData(teamMembers))
        .catch();
    }
  }, [profanitySorter]);

  const handleUserClick = (user) => {
    AppState.selectUserID = user;
    setSelectedUser(user);
    onPress();
  };

  return (
    <Grid
      sx={{
        width: appDimensions.EXTENSION_WIDTH,
        bgcolor: Colors.BACKGROUND_COLOR,
      }}
      spacing={2}
    >
      {sortedData.length > 0 ? (
        <Grid item alignSelf="flex-start">
          <Box
            sx={{
              color: "white",
              padding: 2,
            }}
          >
            <>
              <h1 style={{ fontWeight: "900" }}>Leaderboard </h1>
              <FilterDropDown
                onSelectFilter={(filter) => setProfanitySorter(filter)}
              />
              <nav aria-label="main reported folder">
                <List>
                  {sortedData.map((person, index) => (
                    <>
                      {person ? (
                        <UserItem
                          person={person}
                          index={index}
                          pageDetails={handleUserClick}
                        />
                      ) : (
                        <></>
                      )}
                    </>
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
          sx={{ height: "100vh", color: Colors.TEXT_COLOR }}
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

function UserItem({ person, index, pageDetails = () => {} }) {
  const [user, setUser] = useState(null);
  const [highestViolation, setHighestViolation] = useState(null);
  const [highestViolationCount, setHighestViolationCount] = useState("0");
  const [violationColor, setViolationColor] = useState(Colors.ACCENT_COLOR_2);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    User.getUserByID(person.userID)
      .then((currentUser) => setUser(currentUser))
      .catch((err) => {
        console.log(err);
        setUser(null);
      });
  }, []);
  useEffect(() => {
    Report.getTheHighestViolationByUserID(
      person.userID,
      SignedInUser.user.teamID,
    )
      .then((data) => {
        setHighestViolationCount(
          data.highestViolationsMetrics.highestViolationCount,
        );
        setHighestViolation(data.highestViolationsMetrics.swearType.name);
        setChartData(data.sortedViolations);
      })
      .catch((err) => console.error(err));
  }, [user]);
  return (
    <>
      {user ? (
        <ListItem
          onClick={() => pageDetails(person.userID)}
          key={index}
          sx={{ backgroundColor: "white", marginTop: MARGIN_SIZES.MARGIN_4 }}
        >
          <Grid container>
            <ListItemButton>
              <ListItemAvatar>
                {user ? (
                  <Avatar alt={`${user.firstName}`} src={user.profilePicture} />
                ) : (
                  <></>
                )}
              </ListItemAvatar>
              <ListItemText
                primary={`${user ? user.firstName : ""} ${user ? user.lastName : ""}`}
                sx={{ color: Colors.TEXT_COLOR_SECONDARY }}
                secondary={
                  highestViolation ? (
                    <Chip
                      label={`${highestViolation}`}
                      sx={{
                        backgroundColor: violationColor,
                        color: Colors.TEXT_COLOR_SECONDARY,
                        fontSize: FontSizes.captionFontSize,
                      }}
                    />
                  ) : (
                    <></>
                  )
                }
              />

              <ListItemSecondaryAction>
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
          </Grid>
        </ListItem>
      ) : (
        <></>
      )}
    </>
  );
}

function FilterDropDown({ onSelectFilter = () => {} }) {
  const [filters, setFilters] = useState([]);
  useEffect(() => {
    HomePageLeaderBoardController.getReportTypesPerTeam()
      .then((data) => setFilters(data))
      .catch();
  }, []);
  return (
    <Box
      sx={{
        width: width_sizes.BUTTON_WIDTH_LG,
        bgcolor: Colors.ACCENT_COLOR_3,
        padding: MARGIN_SIZES.MARGIN_4 / 4,
        borderRadius: MARGIN_SIZES.MARGIN_4,
      }}
    >
      <FormControl fullWidth>
        <NativeSelect
          defaultValue={30}
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          onChange={(e) => {
            onSelectFilter(e.target.value);
          }}
          inputProps={{
            id: "uncontrolled-native",
            sx: {
              color: Colors.TEXT_COLOR,
              borderWidth: 0,
              borderColor: "brown",
            },
          }}
        >
          {filters.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
