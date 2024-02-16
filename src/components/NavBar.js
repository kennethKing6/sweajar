import { Grid, List, TextField } from "@mui/material";
import React from "react";
import { User } from "../model/User";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { Colors } from "../assets/colors";
import { Padding_Sizes } from "../assets/paddingSizes";
import GroupsIcon from "@mui/icons-material/Groups";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Border_Sizes } from "../assets/sizes";
export default function NavBar({
  onLeaderboardClick,
  onTeamsClick,
  onNewReportClick,
  onProfileClick,
  onLogout,
}) {
  return (
    <Grid
      container
      style={{
        backgroundColor: Colors.NAVBAR_PRIMARY_BACKGROUND,
        borderBottomRightRadius: Border_Sizes.BORDER_LG,
        padding: Padding_Sizes.PADDING_16,
      }}
    >
      <Grid
        item
        style={{
          cursor: "pointer",
          border: "1px solid transparent",
          transition: "border 0.3s",
          flex: 1,
          color: Colors.TEXT_COLOR,
        }}
        onClick={onLeaderboardClick}
        onMouseOver={(e) => (e.target.style.border = "1px solid blue")}
        onMouseOut={(e) => (e.target.style.border = "1px solid transparent")}
      >
        <LeaderboardIcon />
        <Grid item sx={styles.text}>
          Leaderboard
        </Grid>
      </Grid>

      <Grid
        item
        style={{
          cursor: "pointer",
          border: "1px solid transparent",
          transition: "border 0.3s",
          flex: 1,
          color: Colors.TEXT_COLOR,
        }}
        onClick={onTeamsClick}
        onMouseOver={(e) => (e.target.style.border = "1px solid blue")}
        onMouseOut={(e) => (e.target.style.border = "1px solid transparent")}
      >
        <GroupsIcon />
        <Grid item sx={styles.text}>
          Teams
        </Grid>
      </Grid>

      <Grid
        item
        style={{
          cursor: "pointer",
          border: "1px solid transparent",
          transition: "border 0.3s",
          flex: 1,
          color: Colors.TEXT_COLOR,
        }}
        onClick={onNewReportClick}
        onMouseOver={(e) => (e.target.style.border = "1px solid blue")}
        onMouseOut={(e) => (e.target.style.border = "1px solid transparent")}
      >
        <AssessmentIcon />
        <Grid item sx={styles.text}>
          New Report
        </Grid>
      </Grid>

      <Grid
        style={{
          cursor: "pointer",
          border: "1px solid transparent",
          transition: "border 0.3s",
          color: Colors.TEXT_COLOR,
          flex: 1,
        }}
        item
        onClick={onProfileClick}
        onMouseOver={(e) => (e.target.style.border = "1px solid blue")}
        onMouseOut={(e) => (e.target.style.border = "1px solid transparent")}
      >
        <AccountCircleIcon />
        <Grid item sx={styles.text}>
          Profile
        </Grid>
      </Grid>

      <Grid
        item
        style={{
          cursor: "pointer",
          border: "1px solid transparent",
          transition: "border 0.3s",
          color: Colors.TEXT_COLOR,
          flex: 1,
        }}
        onClick={async () => {
          await User.signOut();
          onLogout();
        }}
        onMouseOver={(e) => (e.target.style.border = "1px solid blue")}
        onMouseOut={(e) => (e.target.style.border = "1px solid transparent")}
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
