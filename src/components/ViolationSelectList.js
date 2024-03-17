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
import AddSwearType from "./AddSwearType";
import Button from "./Button";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { ReportViolationsController } from "../controllers/reportViolationsController";
import { DefaultViolations } from "../model/DefaultViolations";

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
        bgcolor: "black",
        color: "white",
        padding: 2,
        border: "2px solid yellow",
        height: "100%",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <Box sx={{ position: "absolute", top: 48, right: 8 }}>
          <IconButton
            title="Show Violations"
            onClick={() => {
              setShowViolations(true);
              setShowAddSwearType(false);
            }}
          >
            <FormatListBulletedIcon
              sx={{ backgroundColor: "yellow", color: "black" }}
            />
          </IconButton>
          <IconButton
            title="Add a New Violation"
            onClick={() => {
              setShowViolations(false);
              setShowAddSwearType(true);
            }}
          >
            <PlaylistAddIcon
              sx={{ backgroundColor: "yellow", color: "black" }}
            />
          </IconButton>
      </Box>
      <Box>
        <h1>New Report</h1>
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
            {DefaultViolations.map((violation) => {
              return (
                <>
                  {" "}
                  <ListItem
                    onClick={() => {
                      onToggle(violation.name);
                      addDefaultViolation({
                        name: violation.name,
                        description: violation.description,
                      });
                    }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        checked={selected.includes(violation.name)}
                        sx={{ color: "white" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ color: "white" }}
                      primary={violation.name}
                      secondaryTypographyProps={{ style: { color: "red" } }}
                      secondary={violation.description}
                    ></ListItemText>
                  </ListItem>
                </>
              );
            })}
          </List>
        )}
        {showAddSwearType && <AddSwearType />}
      </Box>
      {showViolations && (
          <Box sx={{ position: "sticky", bottom: 0, padding: 2, display: "flex", justifyContent: "flex-end"  }}>
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
          </Box>
      )}
    </Box>
  );
}
