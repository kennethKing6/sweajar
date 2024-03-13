import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListSubheader,
  ListItemIcon,
  ListItemText,
  Button,
  Checkbox,
  Grid,
  IconButton,
} from "@mui/material";
import { Teams } from "../model/Teams";
import { User } from "../model/User";
import { SignedInUser } from "../model/SignedInUser";
import CreateNewTeam from "./CreateNewTeam";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddIcon from "@mui/icons-material/Add";
import { appDimensions } from "../assets/appDimensions";
import { ButtonStyles } from "../assets/ButtonStyles";

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
            <List
              subheader={
                <ListSubheader
                  component="div"
                  id="userTeams-list-subheader"
                  sx={{ color: "white", bgcolor: "black" }}
                >
                  Your Teams:
                </ListSubheader>
              }
            >
              {items.length > 0 ? (
                items.map((item) => (
                  <ListItem
                    key={JSON.stringify(item)}
                    onClick={async () => {
                      await onToggle(item);
                    }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        checked={
                          selected ? selected.teamName === item.teamName : null
                        }
                        sx={{ color: "white" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.teamName}
                      sx={{ color: "white" }}
                    />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="You don't have any teams yet" />
                </ListItem>
              )}
              <ListItem>
                <Button
                  variant="contained"
                  onClick={onPress}
                  sx={{
                    backgroundColor: "#FFEB3B",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "#FFC107",
                    },
                  }}
                >
                  View Details
                </Button>
              </ListItem>
            </List>
          )}
            <ListItem>
              <Button
                variant="contained"
                onClick={onPress}
                sx={ButtonStyles.BtnStyle2}
              >
                View Details
              </Button>
            </ListItem>
        {showNewTeam && <CreateNewTeam />}
      </Box>
    </Grid>
  )
}
