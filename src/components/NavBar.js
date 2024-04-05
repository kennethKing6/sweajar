import { Grid } from "@mui/material";
import React, { useState } from "react";
import { User } from "../model/User";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { Colors } from "../assets/colors";
import { Padding_Sizes } from "../assets/paddingSizes";
import GroupsIcon from "@mui/icons-material/Groups";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HelpIcon from "@mui/icons-material/HelpOutlineRounded";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Border_Sizes } from "../assets/sizes";
import { AppState } from "../model/AppState";
import { SignedInUser } from "../model/SignedInUser";

export default function NavBar({
  onLeaderboardClick,
  onTeamsClick,
  onNewReportClick,
  onProfileClick,
  onTutorialClick,
  onLogout,
}) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (itemName, onClickFunction) => {
    setSelectedItem(itemName);
    onClickFunction();
  };

  const handleLogout = async () => {
    await User.signOut();
    setSelectedItem(null);
    onLogout();
  };

  return (
    <Grid
      container
      style={{
        backgroundColor: Colors.NAVBAR_PRIMARY_BACKGROUND,
        padding: Padding_Sizes.PADDING_8,
      }}
    >
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{
          cursor: "pointer",
          padding: Padding_Sizes.PADDING_8,
          backgroundColor:
            selectedItem === "Leaderboard"
              ? Colors.NAVBAR_SELECT_COLOR
              : "transparent",
          borderRadius: Border_Sizes.BORDER_SM,
          transition: "background-color 0.2s",
          flex: 1,
          color: Colors.TEXT_COLOR,
        }}
        onClick={() => handleItemClick("Leaderboard", onLeaderboardClick)}
      >
        <LeaderboardIcon />
        <Grid item sx={styles.text}>
          Leaderboard
        </Grid>
      </Grid>

      <Grid
        item
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{
          cursor: "pointer",
          backgroundColor:
            selectedItem === "Teams"
              ? Colors.NAVBAR_SELECT_COLOR
              : "transparent",
          borderRadius: Border_Sizes.BORDER_SM,
          transition: "background-color 0.2s",
          flex: 1,
          color: Colors.TEXT_COLOR,
        }}
        onClick={() => handleItemClick("Teams", onTeamsClick)}
      >
        <GroupsIcon />
        <Grid item sx={styles.text}>
          Teams
        </Grid>
      </Grid>

      <Grid
        item
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{
          cursor: "pointer",
          backgroundColor:
            selectedItem === "New Report"
              ? Colors.NAVBAR_SELECT_COLOR
              : "transparent",
          borderRadius: Border_Sizes.BORDER_SM,
          transition: "background-color 0.2s",
          flex: 1,
          color: Colors.TEXT_COLOR,
        }}
        onClick={() => handleItemClick("New Report", onNewReportClick)}
      >
        <AssessmentIcon />
        <Grid item sx={styles.text}>
          New Report
        </Grid>
      </Grid>

      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{
          cursor: "pointer",
          backgroundColor:
            selectedItem === "Profile"
              ? Colors.NAVBAR_SELECT_COLOR
              : "transparent",
          borderRadius: Border_Sizes.BORDER_SM,
          transition: "background-color 0.2s",
          color: Colors.TEXT_COLOR,
          flex: 1,
        }}
        item
        onClick={() => handleItemClick("Profile", onProfileClick)}
      >
        <AccountCircleIcon />
        <Grid
          item
          sx={styles.text}
          onClick={() => {
            try {
              AppState.selectUserID = SignedInUser.user.userID;
            } catch (err) {}
          }}
        >
          Profile
        </Grid>
      </Grid>

      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{
          cursor: "pointer",
          backgroundColor:
            selectedItem === "Tutorial"
              ? Colors.NAVBAR_SELECT_COLOR
              : "transparent",
          borderRadius: Border_Sizes.BORDER_SM,
          transition: "background-color 0.2s",
          color: Colors.TEXT_COLOR,
          flex: 1,
        }}
        item
        onClick={() => handleItemClick("Tutorial", onTutorialClick)}
      >
        <HelpIcon />
        <Grid
          item
          sx={styles.text}
          onClick={() => (AppState.selectUserID = SignedInUser.user.userID)}
        >
          Tutorial
        </Grid>
      </Grid>

      <Grid
        item
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{
          cursor: "pointer",
          backgroundColor:
            selectedItem === "Logout"
              ? Colors.NAVBAR_SELECT_COLOR
              : "transparent",
          borderRadius: Border_Sizes.BORDER_SM,
          transition: "background-color 0.2s",
          color: Colors.TEXT_COLOR,
          flex: 1,
        }}
        onClick={handleLogout}
      >
        <ExitToAppIcon />
        <Grid item sx={styles.text}>
          Logout
        </Grid>
      </Grid>
    </Grid>
  );
}

const styles = {
  text: {
    fontWeight: "bold",
  },
};
