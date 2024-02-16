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

// Sample user data for testing charts
const sampleUserData = [
  {
    username: "JohnDoe",
    violations: [
      { violationType: "Profanity", countPerViolation: 10 },
      { violationType: "Messy", countPerViolation: 10 },
      { violationType: "Late", countPerViolation: 5 },
    ],
  },
  {
    username: "JaneSmith",
    violations: [
      { violationType: "Disruption", countPerViolation: 11 },
      { violationType: "Gossip", countPerViolation: 3 },
      { violationType: "Late", countPerViolation: 3 },
    ],
  },
];

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
    if (!profanitySorter) {
      User.getUsersByteamID(SignedInUser.user.userID, SignedInUser.user.teamID)
        .then((teams) => setSortedData(teams))
        .catch();
    } else if (profanitySorter) {
      User.getUsersByteamIDByProfanity(
        SignedInUser.user.userID,
        SignedInUser.user.teamID,
        profanitySorter,
      )
        .then((teams) => setSortedData(teams))
        .catch();
    }
  }, [profanitySorter]);

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
              <FilterDropDown />
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

function UserItem({ person, index }) {
  const [highestViolation, setHighestViolation] = useState(null);
  const [highestViolationCount, setHighestViolationCount] = useState("0");
  const [violationColor, setViolationColor] = useState(Colors.ACCENT_COLOR_2);
  const [chartData, setChartData] = useState([]);
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
  }, []);
  return (
    <ListItem
      key={index}
      sx={{ backgroundColor: "white", marginTop: MARGIN_SIZES.MARGIN_4 }}
    >
      <Grid container>
        {chartData.length > 0 ? (
          <LeaderboardChart chartData={chartData} />
        ) : (
          <></>
        )}

        <ListItemButton>
          <ListItemAvatar>
            <Avatar alt={`${person.firstName}`} src={person.profilePicture} />
          </ListItemAvatar>
          <ListItemText
            primary={`${person.firstName} ${person.lastName}`}
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
  );
}

function FilterDropDown({ labels = ["All", "Late Arrival", "Profanity"] }) {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

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
          inputProps={{
            name: "age",
            id: "uncontrolled-native",
            sx: {
              color: Colors.TEXT_COLOR,
              borderWidth: 0,
              borderColor: "brown",
            },
          }}
        >
          {labels.map((v) => (
            <option key={v} value={10}>
              {v}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
