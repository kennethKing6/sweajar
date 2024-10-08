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
import PeopleOutlineIcon from "@mui/icons-material/PeopleAlt";
import BrowserNotSupportedIcon from "@mui/icons-material/BrowserNotSupported";
import { ButtonStyles } from "../assets/ButtonStyles";
import { Colors } from "../assets/colors";
import { FontFamilies } from "../assets/fontFamilies";
import { MARGIN_SIZES } from "../assets/sizes";

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
        height: "100%",
        //overflowY: 'auto',
        backgroundColor: Colors.BACKGROUND_COLOR,
      }}
    >
      <Box
        sx={{
          bgcolor: Colors.BACKGROUND_COLOR,
          color: "white",
          padding: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1 style={{ fontFamily: FontFamilies.title }}>Team Viewer</h1>
            <Box>
              <IconButton
                title="Show My Teams"
                onClick={() => {
                  setShowNewTeam(false);
                  setShowUserTeams(true);
                }}
              >
                <FormatListBulletedIcon
                  sx={{
                    backgroundColor: Colors.NAVBAR_SELECT_COLOR,
                    color: Colors.TEXT_COLOR,
                    fontSize: "30px",
                    borderRadius: "10%",
                    padding: "5px",
                  }}
                />
              </IconButton>
              <IconButton
                title="Create or Delete a Team"
                onClick={() => {
                  setShowNewTeam(true);
                  setShowUserTeams(false);
                }}
              >
                <AddIcon
                  sx={{
                    backgroundColor: Colors.NAVBAR_SELECT_COLOR,
                    color: Colors.TEXT_COLOR,
                    fontSize: "30px",
                    borderRadius: "10%",
                    padding: "5px",
                  }}
                />
              </IconButton>
            </Box>
          </Box>

          <Grid container>
            {showUserTeams && (
              <Grid
                container
                spacing={1}
                sx={{
                  padding: "20px",
                  gridGap: 50,
                  marginTop: MARGIN_SIZES.MARGIN_1,
                }}
              >
                {items.length > 0 ? (
                  items.map((item) => (
                    <Grid
                      item
                      xs={3}
                      data-testid={JSON.stringify(item)}
                      key={JSON.stringify(item)}
                      onClick={async () => {
                        await onToggle(item);
                      }}
                      className="testBox"
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: Colors.BACKGROUND_COLOR_EERIE,
                            width: "80%",
                            height: "100px",
                            borderRadius: "10%",
                            border:
                              selected && selected.teamName === item.teamName
                                ? "2px solid blue"
                                : "none",
                            padding: "8px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              width: "100%",
                            }}
                          >
                            <PeopleOutlineIcon sx={{ fontSize: 45 }} />
                            <Typography
                              sx={{
                                color: "white",
                                maxLines: 3,
                                textWrap: "wrap",
                                fontSize: "14px",
                                overflow: "hidden",
                                wordWrap: "break-word",
                                width: "100%",
                                textAlign: "center",
                              }}
                            >
                              {item.teamName}
                            </Typography>
                          </div>
                        </Avatar>
                        {selected && selected.teamName === item.teamName && (
                          <Button
                            variant="contained"
                            onClick={onPress}
                            sx={ButtonStyles.BtnStyle3}
                          >
                            Details
                          </Button>
                        )}
                      </Box>
                    </Grid>
                  ))
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      marginTop: "170px",
                      alignItems: "center",
                      minHeight: "200px",
                      height: "100%",
                      position: "absolute",
                      inset: 0,
                      textAlign: "center",
                    }}
                  >
                    <BrowserNotSupportedIcon
                      sx={{ fontSize: 100, opacity: "60%" }}
                    />
                    <Box sx={{ marginTop: "30px" }}>
                      <Typography variant="body1" align="center">
                        You don't have any teams yet.
                      </Typography>
                      <Typography variant="body1" align="center">
                        Click on the "Plus" icon BELOW to create a team.
                      </Typography>
                      <IconButton
                        title="Create a New Team / Delete a Team"
                        onClick={() => {
                          setShowNewTeam(true);
                          setShowUserTeams(false);
                        }}
                      >
                        <AddIcon
                          sx={{
                            backgroundColor: Colors.NAVBAR_SELECT_COLOR,
                            color: Colors.TEXT_COLOR,
                            fontSize: "50px",
                            borderRadius: "10%",
                            padding: "5px",
                            marginTop: "20px",
                          }}
                        />
                      </IconButton>
                    </Box>
                  </Box>
                )}
              </Grid>
            )}
          </Grid>
          {showNewTeam && <CreateNewTeam />}
        </Box>
      </Box>
    </Grid>
  );
}
