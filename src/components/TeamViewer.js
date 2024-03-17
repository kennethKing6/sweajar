import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Avatar,
  Typography,
} from "@mui/material";
import { Teams } from "../model/Teams";
import { User } from "../model/User";
import { SignedInUser } from "../model/SignedInUser";
import CreateNewTeam from "./CreateNewTeam";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddIcon from "@mui/icons-material/Add";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import BrowserNotSupportedIcon from '@mui/icons-material/BrowserNotSupported';
import { ButtonStyles } from "../assets/ButtonStyles";
import { Colors } from "../assets/colors";

export default function TeamViewer({ onPress = () => {} }) {
  const [selected, setSelected] = useState();
  const [items, setItems] = useState([]);
  const [showUserTeams, setShowUserTeams] = useState(true);
  const [showNewTeam, setShowNewTeam] = useState(false);

  const onToggle = async (item) => {
    if (selected && selected.teamName === item.teamName) setSelected(null);
    else {
      setSelected(item);
      await User.updateCurrentTeam(item.teamID);
    }
  };

  useEffect(() => {
    const teamID = SignedInUser.user.teamID;
    if (teamID) {
      Teams.getTeam(teamID)
        .then((defaultTeam) => {
          setSelected(defaultTeam);
        })
        .catch();
    }
  }, []);

  useEffect(() => {
    // Fetch the list items from the database
    const fetchItems = async () => {
      const teams = await Teams.getTeams();
      setItems(teams);
    };
    fetchItems().then().catch();
  }, []);

  return (
    <Grid
      item
      xs={12}
      md={6}
      lg={8}
      sx={{
        position: "relative",
        alignSelf: "flex-start",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        height: "90%",
      }}
    >
      <Box
        sx={{
          bgcolor: "black",
          color: "white",
          padding: 2,
          border: "2px solid yellow",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <Box>
          <h1>Team Viewer</h1>
          <Grid container>
            {showUserTeams && (
              <Grid container
                spacing={2}
                // sx={{
                //   display: "flex",
                //   justifyContent: "center",
                //   alignItems: "center",
                // }}
              >
                {items.length > 0 ? (
                  items.map((item) => (
                    <Grid item xs={3} key={JSON.stringify(item)} onClick={async () => { await onToggle(item); }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar
                          sx={{ 
                            bgcolor: Colors.ACCENT_COLOR_3,
                            width: '100%',
                            height: 125,
                            borderRadius: "10%",
                            border: selected && selected.teamName === item.teamName ? "2px solid yellow" : "none",
                          }}
                        >
                          <PeopleOutlineIcon sx={{ fontSize: 70 }}/>
                        </Avatar>
                        <Typography variant="h5" sx={{ color: "white", mt: 1,  }}>
                          {item.teamName}
                        </Typography>
                      </Box>
                    </Grid>
                  ))
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "200px",
                      height: "100%",
                      position: "absolute",
                      inset: 0,
                      textAlign: "center",
                    }}
                  >
                    <BrowserNotSupportedIcon sx={{ fontSize: 100 }}/>
                    <Typography variant="body1" align="center">
                      You don't have any teams yet. Click on a "Plus" icon to create a team.
                    </Typography>
                  </Box>
                )}
              </Grid>
            )}
          </Grid>
          {showNewTeam && <CreateNewTeam />}
        </Box>
        {showUserTeams && (
          <Box sx={{ position: "relative", left: "65%",  }}>
            {items.length > 0 && (
              <Button
                variant="contained"
                onClick={onPress}
                sx={ButtonStyles.BtnStyle2}
              >
                View Details
              </Button>
            )}
          </Box>
        )}
        <Box sx={{ position: "absolute", top: 48, right: 8 }}>
          <IconButton
            title="Show My Teams"
            onClick={() => {
              setShowNewTeam(false);
              setShowUserTeams(true);
            }}
          >
            <FormatListBulletedIcon
              sx={{ backgroundColor: "yellow", color: "black" }}
            />
          </IconButton>
          <IconButton
            title="Create a New Team / Delete a Team"
            onClick={() => {
              setShowNewTeam(true);
              setShowUserTeams(false);
            }}
          >
            <AddIcon sx={{ backgroundColor: "yellow", color: "black" }} />
          </IconButton>
        </Box>
      </Box>
    </Grid>
  );
}
