import * as React from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { Colors } from "../assets/colors";
import { FontSizes } from "../assets/fonts";
import { ListItemSecondaryAction } from "@mui/material";

const teamMembers = [];

export default function LeaderboardListeItem() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square sx={{ pb: "50px"}}>
        <List sx={{ mb: 2}}>
          {teamMembers.map(
            ({
              id,
              firstName,
              lastName,
              highestViolation,
              profilePicture,
              violationColor,
            }) => (
              <React.Fragment key={id}>
                <ListItemButton sx={{backgroundColor: Colors.BACKGROUND_COLOR_EERIE}}>
                  <ListItemAvatar>
                    <Avatar alt={`${firstName}`} src={profilePicture} />
                  </ListItemAvatar>
                  <ListItemText 
                    primary={`${firstName} ${lastName}`}
                    secondary={
                      <Chip
                        label={`${highestViolation}`}
                        sx={{
                          backgroundColor: violationColor,
                          color: Colors.TEXT_COLOR,
                          fontSize: FontSizes.captionFontSize,
                        }}
                      />
                    }
                  />
                  <ListItemSecondaryAction>
                    {" "}
                    <Chip
                      label="30"
                      sx={{
                        backgroundColor: violationColor,
                        color: Colors.TEXT_COLOR,
                        fontWeight: "bold",
                        fontSize: FontSizes.captionFontSize,
                      }}
                    />
                  </ListItemSecondaryAction>
                </ListItemButton>
              </React.Fragment>
            ),
          )}
        </List>
      </Paper>
    </React.Fragment>
  );
}
const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});
