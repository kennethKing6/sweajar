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
  Paper,
  Typography,
  Grid,
  Badge,
  Card,
  Chip,
} from "@mui/material";
import { SwearType } from "../model/SwearType";
import { SignedInUser } from "../model/SignedInUser";
import AddSwearType from "./AddSwearType";
import Button from "./Button";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { ReportViolationsController } from "../controllers/reportViolationsController";
import { DefaultViolations } from "../model/DefaultViolations";
import NewReportCategory from "./NewReportCategory";
import { FontSizes } from "../assets/fonts";
import { Colors } from "../assets/colors";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import { appDimensions } from "../assets/appDimensions";
import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  FavoriteIcon,
  MenuIcon,
  RemoveIcon,
} from "../assets/icons";
import { MARGIN_SIZES } from "../assets/sizes";
export default function ViolationSelectList({
  onPress = () => {},
  onNavigateToUserToReport = () => {},
}) {
  const [selected, setSelected] = useState([]);
  const [items, setItems] = useState([]);
  const [showViolations, setShowViolations] = useState(true);
  const [showAddSwearType, setShowAddSwearType] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [openBadge, setHasOpenBadge] = useState(false);
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

  function ViolationByCategoryList({ currentCategory = "" }) {
    return (
      <Grid container>
        <Grid item>
          {showViolations && (
            <List
              subheader={
                <ListSubheader
                  component="div"
                  id="list-subheader"
                  sx={{ color: "white", bgcolor: "black" }}
                >
                  Select the Violation to report
                </ListSubheader>
              }
            >
              <Paper
                elevation={10}
                sx={{
                  backgroundColor: "transparent",
                  textAlign: "center",
                  fontSize: FontSizes.largeFontSize * 4,
                }}
              >
                {currentCategory.icon}
                {"\n"}
                <Typography
                  sx={{ display: "block", color: Colors.TEXT_COLOR }}
                  variant="h5"
                >
                  {currentCategory.name}
                </Typography>
              </Paper>
              {items.map((item) => (
                <Tooltip
                  title={item.description}
                  placement="right"
                  key={item.id}
                >
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
                try {
                  console.log("category", violation.category);
                } catch (err) {}

                if (violation.category === currentCategory.name) {
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
                          secondaryTypographyProps={{
                            style: { color: "white" },
                          }}
                          secondary={violation.description}
                        ></ListItemText>
                      </ListItem>
                    </>
                  );
                } else {
                  return <></>;
                }
              })}
            </List>
          )}
        </Grid>
        <ActionsButtons />
      </Grid>
    );
  }

  function SelectedViolations() {
    return (
      <Grid container sx={{ flexDirection: "column", display: "flex" }}>
        <Grid item sx={{ flex: 10 }}>
          {showViolations && (
            <List
              subheader={
                <ListSubheader
                  component="div"
                  id="list-subheader"
                  sx={{ color: "white", bgcolor: "black" }}
                >
                  The violations you have selected
                </ListSubheader>
              }
            >
              <Paper
                elevation={10}
                sx={{
                  backgroundColor: "transparent",
                  textAlign: "center",
                  fontSize: FontSizes.largeFontSize * 4,
                }}
              ></Paper>

              {ReportViolationsController.getSelectedSweartypes().map(
                (violation) => {
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
                          secondaryTypographyProps={{
                            style: { color: "red" },
                          }}
                          secondary={violation.description}
                        ></ListItemText>
                      </ListItem>
                    </>
                  );
                },
              )}
              <>
                {ReportViolationsController.getSelectedSwearTypeCount() > 0 ? (
                  <></>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: appDimensions.EXTENSION_HEIGHT * 0.7, // Adjust the height as needed
                    }}
                  >
                    <InboxOutlinedIcon fontSize="large" />
                    {"\n You have no violations to report at the moment "}
                  </Box>
                )}
              </>
            </List>
          )}
        </Grid>
        <ActionsButtons />
      </Grid>
    );
  }

  function ActionsButtons() {
    return (
      <>
        <Grid sx={{}} item>
          {ReportViolationsController.getSelectedSwearTypeCount() > 0 ? (
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
          ) : (
            <></>
          )}
          <Button
            text="Back"
            onPress={() => {
              setHasOpenBadge(!openBadge);
              setSelectedCategory();
            }}
          ></Button>
        </Grid>
      </>
    );
  }

  // return (
  //   <Box
  //     sx={{
  //       bgcolor: "black",
  //       color: "white",
  //       padding: 2,
  //       border: "2px solid yellow",
  //       overflow: "auto",
  //       display: "flex",
  //       flexDirection: "column",
  //       justifyContent: "space-between",
  //       position: "relative",
  //     }}
  //   >
  //     <Box mb={5}>
  //       <Badge
  //         onClick={() => {
  //           if (ReportViolationsController.getSelectedSwearTypeCount() > 0)
  //             setHasOpenBadge(!openBadge);
  //         }}
  //         badgeContent={ReportViolationsController.getSelectedSwearTypeCount()}
  //         color="error"
  //       >
  //         <Typography variant="h4">New Report</Typography>
  //       </Badge>
  //       <Grid container>
  //         {" "}
  //         <Typography variant="caption">
  //           Pick the category that best describes the behaviour of your coworker
  //         </Typography>
  //       </Grid>
  //     </Box>
  //     {openBadge ? (
  //       <SelectedViolations />
  //     ) : (
  //       <Grid container sx={{ height: "80vh" }}>
  //         {" "}
  //         {!selectedCategory && (
  //           <NewReportCategory
  //             onSelectedViolations={(category) => setSelectedCategory(category)}
  //           />
  //         )}
  //         {selectedCategory && (
  //           <ViolationByCategoryList currentCategory={selectedCategory} />
  //         )}
  //       </Grid>
  //     )}
  //   </Box>
  // );
  return (
    <Box
      sx={{
        bgcolor: "black",
        color: "white",
        padding: 2,
        border: "2px solid yellow",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        height: "100%",
      }}
    >
      <SwearJarMenu />
    </Box>
  );
}

function SwearJarMenu() {
  return (
    <div>
      <Grid container>
        <Grid item xs={9}>
          <Typography variant="h3" gutterBottom>
            SwearJar
          </Typography>
          <Chip
            label="Click on the violations to put in the jar (report)"
            sx={{
              bgcolor: Colors.ACCENT_COLOR_1,
              color: Colors.TEXT_COLOR,
              fontSize: FontSizes.bodyFontSize,
            }}
          />
        </Grid>
        <Grid xs={3}>
          <AddIcon
            style={{
              color: Colors.CHART_TEXT,
              fontSize: 30,
              padding: 1,
            }}
          />
          <FavoriteIcon
            style={{
              color: Colors.TEAM_COLOR_ORANGE,
              fontSize: 32,
              padding: 1,
            }}
          />
          <MenuIcon
            style={{
              color: Colors.ERROR_COLOR,
              fontSize: 30,
              padding: 1,
            }}
          />
        </Grid>
      </Grid>
      <Card
        sx={{
          bgcolor: Colors.NAVBAR_PRIMARY_BACKGROUND,
          mt: MARGIN_SIZES.MARGIN_4 / 2,
        }}
      >
        {" "}
        <ListItem
          secondaryAction={<DeleteIcon style={{ color: "white" }} />}
          onClick={() => {}}
        >
          <ListItemIcon>
            <Checkbox checked={false} sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText
            sx={{ color: "white" }}
            primary={"Running"}
            secondaryTypographyProps={{
              style: { color: "white" },
            }}
            secondary={"The description"}
          ></ListItemText>
        </ListItem>
      </Card>
      <Card
        sx={{
          bgcolor: Colors.NAVBAR_PRIMARY_BACKGROUND,
          mt: MARGIN_SIZES.MARGIN_4 / 2,
        }}
      >
        {" "}
        <ListItem
          secondaryAction={<DeleteIcon style={{ color: "white" }} />}
          onClick={() => {}}
        >
          <ListItemIcon>
            <Checkbox checked={false} sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText
            sx={{ color: "white" }}
            primary={"Running"}
            secondaryTypographyProps={{
              style: { color: "white" },
            }}
            secondary={"The description"}
          ></ListItemText>
        </ListItem>
      </Card>
    </div>
  );
}
