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
import { appDimensions } from "../assets/appDimensions";
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
        }}
      >
        <Box display={"flex"}>
          <h1>Team Viewer</h1>
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
          {showUserTeams && (
            <Grid container spacing={2}>
              {items.length > 0 ? (
                items.map((item) => (
                  <Grid item xs={4} key={JSON.stringify(item)} onClick={async () => { await onToggle(item); }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Avatar
                        sx={{ 
                          bgcolor: Colors.ACCENT_COLOR_3,
                          width: '100%',
                          height: 150,
                          borderRadius: "10%",
                          border: selected && selected.teamName === item.teamName ? "2px solid yellow" : "none",
                        }}
                      >
                        {item.teamName.charAt(0)}
                      </Avatar>
                      <Typography variant="body1" sx={{ color: "white", mt: 1 }}>
                        {item.teamName}
                      </Typography>
                    </Box>
                  </Grid>
                ))
              ) : (
                <Typography variant="body1" align="center">
                  You don't have any teams yet
                </Typography>
              )}
              {items.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    onClick={onPress}
                    sx={ButtonStyles.BtnStyle2}
                  >
                    View Details
                  </Button>
                </Box>
              )}
            </Grid>
          )}
        {showNewTeam && <CreateNewTeam />}
      </Box>
    </Grid>
  )
}
