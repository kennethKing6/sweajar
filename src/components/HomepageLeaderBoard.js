import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Avatar, Stack, Typography } from "@mui/material";
import { User } from "../model/User";
import { SignedInUser } from "../model/SignedInUser";
import { Report } from "../model/Report";
import {
  ListItemSecondaryAction,
  Chip,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  Paper,
  Grow,
} from "@mui/material";
import { Colors } from "../assets/colors";
import { FontSizes } from "../assets/fonts";
// import { Charts } from "react-charts";
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
import { Padding_Sizes } from "../assets/paddingSizes";

export default function HomepageLeaderBoard({
  data,
  onExit = () => {},
  onPress = () => {},
  onNavigateToTeams = () => {},
}) {
  const [sortedData, setSortedData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [profanitySorter, setProfanitySorter] = useState(null);
  const [team, setTeam] = useState(null);

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

  useEffect(() => {
    try {
      Teams.getTeam(SignedInUser.user.teamID)
        .then((team) => setTeam(team))
        .catch();
    } catch (err) {}
  });

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
        height: "auto",
      }}
      spacing={1}
    >
      {sortedData.length > 0 ? (
        <Grid item alignSelf="flex-start">
          <Box
            sx={{
              color: Colors.TEXT_COLOR,
              padding: 2,
            }}
          >
            <>
              <Grid container>
                <Grid item xs={7.5}>
                  <h1 style={{ fontWeight: "900" }}>Leaderboard </h1>
                  {team && team.teamName ? (
                    <Chip
                      label={team.teamName}
                      sx={{
                        bgcolor: Colors.ACCENT_COLOR_1,
                        color: Colors.TEXT_COLOR,
                        fontSize: FontSizes.mediumFontSize,
                        fontWeight: "900",
                        padding: Padding_Sizes.PADDING_4,
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </Grid>
                <Grid item xs={4} mt={2}>
                  <FilterDropDown
                    onSelectFilter={(filter) => setProfanitySorter(filter)}
                  />
                </Grid>
              </Grid>
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
    if (person) {
      Report.getTheHighestViolationByUserID(
        person.userID,
        SignedInUser.user.teamID,
        person.swearTypeID,
      )
        .then((data) => {
          setHighestViolationCount(
            data.highestViolationsMetrics.highestViolationCount,
          );
          setHighestViolation(data.highestViolationsMetrics.swearType.name);
          setChartData(data.sortedViolations);
        })
        .catch((err) => console.error(err));
    }
  }, [person]);
  return (
    <>
      {user ? (
        <ListItem
          onClick={() => pageDetails(person.userID)}
          key={index}
          sx={{
            backgroundColor: Colors.BACKGROUND_COLOR_EERIE,
            marginTop: MARGIN_SIZES.MARGIN_1,
            border: `1px solid ${Colors.BORDER_BLUE}`,
            "&:hover": {
              boxShadow: "0px 0px 10px 5px rgba(0, 150, 255, 0.5)",
            },
          }}
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
                sx={{ color: Colors.TEXT_COLOR }}
                primary={`${user ? user.firstName : ""} ${user ? user.lastName : ""}`}
                secondary={
                  highestViolation ? (
                    <Chip
                      label={`${highestViolation}`}
                      sx={{
                        backgroundColor: Colors.TEAM_COLOR_BLUE,
                        color: Colors.TEXT_COLOR,
                        fontSize: FontSizes.bodyFontSize,
                      }}
                    />
                  ) : (
                    <></>
                  )
                }
                primaryTypographyProps={{ variant: "h5", paddingBottom: "5px" }}
              />

              <ListItemSecondaryAction>
                <Chip
                  label={highestViolationCount}
                  sx={{
                    backgroundColor: Colors.TEAM_COLOR_BLUE,
                    color: Colors.TEXT_COLOR,
                    fontWeight: "bold",
                    fontSize: FontSizes.bodyFontSize,
                    width: 35,
                    height: 35,
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
  const [selectedFilter, setSelectedFilter] = useState("All");
  useEffect(() => {
    HomePageLeaderBoardController.getReportTypesPerTeam()
      .then((data) => setFilters(data))
      .catch();
  }, []);
  return (
    <Box
      sx={{
        width: width_sizes.BUTTON_WIDTH_LG,
        padding: MARGIN_SIZES.MARGIN_4 / 4,
        borderRadius: MARGIN_SIZES.MARGIN_4,
      }}
    >
      <FormControl fullWidth>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={selectedFilter}
          onChange={(e) => {
            onSelectFilter(e.target.value);
            setSelectedFilter(e.target.value);
          }}
          inputProps={{
            id: "uncontrolled-native",
            sx: {
              color: "white",
              borderWidth: 0,
              borderColor: Colors.BUTTON_PRIMARY_COLOR,
              backgroundColor: Colors.BUTTON_SECONDARY_COLOR,
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: Colors.ACCENT_COLOR_4,
              },
            },
          }}
        >
          {Array.isArray(filters) &&
            filters.map((v) => (
              <MenuItem key={v} value={v} sx={{ color: "black" }}>
                {v}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}
