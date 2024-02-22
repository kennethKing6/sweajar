"use client";
import { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Checkbox,
  Tooltip,
  IconButton,
} from "@mui/material";
import { SwearType } from "../model/SwearType";
import { SignedInUser } from "../model/SignedInUser";
import ReportButton from "./ReportButton";
import AddSwearType from "./AddSwearType";
import Button from "./Button";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { ReportViolationsController } from "../controllers/reportViolationsController";

export default function ViolationSelectList({
  onPress = () => {},
  onNavigateToUserToReport = () => {},
}) {
  const [selected, setSelected] = useState([]);
  const [items, setItems] = useState([]);
  const [showViolations, setShowViolations] = useState(true);
  const [showAddSwearType, setShowAddSwearType] = useState(false);
  const onToggle = (item) => {
    const index = selected.indexOf(item);
    if (index > -1) {
      // Remove the item from the array
      setSelected(selected.filter((i) => i !== item));
    } else {
      // Add the item to the array
      setSelected([...selected, item]);
    }
  };

  useEffect(() => {
    // Fetch the menu items from the database
    const fetchItems = async () => {
      const companyID = SignedInUser.user.companyID;
      const swearTypes = await SwearType.getSwearTypesByCompany(companyID);
      setItems(swearTypes);
    };
    fetchItems().then().catch();
  }, []);

  function addDefaultViolation({ name, description }) {
    ReportViolationsController.selectSwearType({
      name: name,
      description: description,
      levels: "minor",
      swearTypeID: name,
    });
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "black",
        color: "white",
        padding: 2,
        border: "2px solid yellow",
      }}
    >
      <Box display={"flex"}>
        <h1>New Report</h1>
        <Tooltip title="Show Violations" placement="top">
          <IconButton
            onClick={() => {
              setShowViolations(true);
              setShowAddSwearType(false);
            }}
          >
            <FormatListBulletedIcon
              sx={{ backgroundColor: "yellow", color: "black" }}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Add a New Swear Type" placement="top">
          <IconButton
            onClick={() => {
              setShowViolations(false);
              setShowAddSwearType(true);
            }}
          >
            <PlaylistAddIcon
              sx={{ backgroundColor: "yellow", color: "black" }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      {showViolations && (
        <List
          subheader={
            <ListSubheader
              component="div"
              id="list-subheader"
              sx={{ color: "white", bgcolor: "black" }}
            >
              Select the Violation
            </ListSubheader>
          }
        >
          <Tooltip
            title="Choose this option if the user used inappropriate language"
            placement="right"
          >
            <ListItem
              onClick={() => {
                onToggle("Profanity");
                addDefaultViolation({
                  name: "Profanity",
                  description:
                    "Choose this option if the user used inappropriate language",
                });
              }}
            >
              <ListItemIcon>
                <Checkbox
                  checked={selected.includes("Profanity")}
                  sx={{ color: "white" }}
                />
              </ListItemIcon>
              <ListItemText sx={{ color: "white" }}>Profanity</ListItemText>
            </ListItem>
          </Tooltip>

          <Tooltip
            title="Choose this option if the user's microphone was muted"
            placement="right"
          >
            <ListItem
              onClick={() => {
                onToggle("Muted Microphone");
                addDefaultViolation({
                  name: "Muted Microphone",
                  description:
                    "Choose this option if the user's microphone was muted",
                });
              }}
            >
              <ListItemIcon>
                <Checkbox
                  checked={selected.includes("Muted Microphone")}
                  sx={{ color: "white" }}
                />
              </ListItemIcon>
              <ListItemText sx={{ color: "white" }}>
                Muted Microphone
              </ListItemText>
            </ListItem>
          </Tooltip>

          <Tooltip
            title="Choose this option if the user joined the meeting late"
            placement="right"
          >
            <ListItem
              onClick={() => {
                onToggle("Late Arrival");
                addDefaultViolation({
                  name: "Late Arrival",
                  description:
                    "Choose this option if the user joined the meeting late",
                });
              }}
            >
              <ListItemIcon>
                <Checkbox
                  checked={selected.includes("Late Arrival")}
                  sx={{ color: "white" }}
                />
              </ListItemIcon>
              <ListItemText sx={{ color: "white" }}>Late Arrival</ListItemText>
            </ListItem>
          </Tooltip>

          {items.map((item) => (
            <Tooltip title={item.description} placement="right" key={item.id}>
              <ListItem
                onClick={() => {
                  onToggle(item.name);
                  ReportViolationsController.selectSwearType({
                    description: item.description,
                    levels: item.levels,
                    name: item.name,
                    swearTypeID: item.name,
                  });
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={selected.includes(item.name)}
                    sx={{ color: "white" }}
                  />
                </ListItemIcon>
                <ListItemText primary={item.name} sx={{ color: "white" }} />
              </ListItem>
            </Tooltip>
          ))}
          <ListItem>
            <Button
              text="Next"
              onPress={() => {
                if (!ReportViolationsController.hasSwearTypes()) {
                  alert("Please select a violation");
                  return;
                }
                if (!ReportViolationsController.hasSelectedTeam()) {
                  alert("Please select a team");
                  return;
                }
                onNavigateToUserToReport();
              }}
              sx={{
                backgroundColor: "#FFEB3B",
                color: "black",
                "&:hover": {
                  backgroundColor: "#FFC107",
                },
              }}
            />
          </ListItem>
        </List>
      )}
      {showAddSwearType && <AddSwearType />}
    </Box>
  );
}
