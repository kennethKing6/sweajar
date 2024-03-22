import { Grid } from "@mui/material";
import React, { useState } from "react";
import { User } from "../model/User";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { Colors } from "../assets/colors";
import { Padding_Sizes } from "../assets/paddingSizes";
import GroupsIcon from "@mui/icons-material/Groups";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Border_Sizes } from "../assets/sizes";
import { AppState } from "../model/AppState";
import { SignedInUser } from "../model/SignedInUser";

export default function NavBar({
  onLeaderboardClick,
  onTeamsClick,
  onNewReportClick,
  onProfileClick,
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
        //borderRadius: Border_Sizes.BORDER_SM,
        padding: Padding_Sizes.PADDING_16,
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
          backgroundColor: selectedItem === "Leaderboard" ? "blue" : "transparent",
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
          backgroundColor: selectedItem === "Teams" ? "blue" : "transparent",
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
          backgroundColor: selectedItem === "New Report" ? "blue" : "transparent",
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
          backgroundColor: selectedItem === "Profile" ? "blue" : "transparent",
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
          onClick={() => (AppState.selectUserID = SignedInUser.user.userID)}
        >
          Profile
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
          backgroundColor: selectedItem === "Logout" ? "blue" : "transparent",
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
    fontWeight: "900",
  },
};
