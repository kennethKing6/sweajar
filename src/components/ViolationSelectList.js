"use client";
import React, { useState, useEffect } from "react";
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
  Tabs,
  Tab,
  TextField,
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
  EmptyIcon,
  FavoriteIcon,
  MenuIcon,
  RemoveIcon,
} from "../assets/icons";
import { MARGIN_SIZES, PADDING_SIZES } from "../assets/sizes";
import { connect } from "react-redux";
import { NewReportReduxActions } from "../shared/redux/actions/newReportActions";
import { TextFieldStyles } from "../assets/TextFieldStyles";
import { ButtonStyles } from "../assets/ButtonStyles";
import { Padding_Sizes } from "../assets/paddingSizes";
import { BubbleListComponent } from "./BubbleUI";
function ViolationSelectList({
  onPress = () => {},
  onNavigateToUserToReport = () => {},
  reportActivity,
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

  // useEffect(() => {
  //   // Fetch the menu items from the database
  //   const fetchItems = async () => {
  //     const companyID = SignedInUser.user.teamID;
  //     const swearTypes = await SwearType.getSwearTypesByCompany(companyID);
  //     setItems(swearTypes);
  //   };
  //   fetchItems().then().catch();
  // }, []);

  async function addDefaultViolation({ name, description }) {
    // ReportViolationsController.selectSwearType({
    //   name: name,
    //   description: description,
    //   levels: "minor",
    //   swearTypeID: name,
    // });
    try {
      await SwearType.createNewSwearType({
        description: description,
        levels: "minor",
        name: name,
        teamID: SignedInUser.user.teamID,
      });
      alert("We successfully added this violation to your jar");
    } catch (err) {
      alert("We could not add this violation to your jar");
    }
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
                ></ListSubheader>
              }
            >
              <Paper
                elevation={10}
                sx={{
                  backgroundColor: "transparent",
                  textAlign: "center",
                  fontSize: FontSizes.largeFontSize * 5,
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
                        onClick={async () => {
                          await addDefaultViolation({
                            name: violation.name,
                            description: violation.description,
                          });
                          onToggle(violation.name);
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
        <Grid container sx={{ position: "relative", top: "3%" }}>
          <Button
            style={{ width: 250, height: 50, marginTop: "30%" }}
            text="Back"
            onPress={() => {
              setHasOpenBadge(!openBadge);
              setSelectedCategory();
            }}
          ></Button>{" "}
        </Grid>
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
                        onClick={async () => {
                          await addDefaultViolation({
                            name: violation.name,
                            description: violation.description,
                          });
                          onToggle(violation.name);
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

  function CategorySwears({ onNavigateToUserToReport = () => {} }) {
    return (
      <div>
        <NewReportHeader onNavigateToUserToReport={onNavigateToUserToReport} />
        <Grid sx={{ mt: MARGIN_SIZES.MARGIN_4 / 2 }}></Grid>

        <Grid container sx={{ height: "80vh" }}>
          {" "}
          {!selectedCategory && (
            <NewReportCategory
              onSelectedViolations={(category) => setSelectedCategory(category)}
            />
          )}
          {selectedCategory && (
            <ViolationByCategoryList currentCategory={selectedCategory} />
          )}
        </Grid>
      </div>
    );
  }

  const { newReportAction = null } = reportActivity;
  return (
    <Box
      sx={{
        bgcolor: "black",
        color: "white",
        padding: 2,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        height: "100%",
      }}
    >
      {newReportAction === "new_report/swearjar" ? (
        <SwearJarMenu onNavigateToUserToReport={onNavigateToUserToReport} />
      ) : (
        <></>
      )}
      {newReportAction === "new_report/category" ? (
        <CategorySwears onNavigateToUserToReport={onNavigateToUserToReport} />
      ) : (
        <></>
      )}
      {newReportAction === "new_report/violation" ? (
        <CustomTeamViolation
          onNavigateToUserToReport={onNavigateToUserToReport}
        />
      ) : (
        <></>
      )}
      {!newReportAction ? (
        <SwearJarMenu onNavigateToUserToReport={onNavigateToUserToReport} />
      ) : (
        <></>
      )}
    </Box>
  );
  // return <BubbleListComponent />;
}

function SwearJarMenu({ onNavigateToUserToReport = () => {} }) {
  const [jar, setJar] = useState([]);

  useEffect(() => {
    ReportViolationsController.getSwearjarViolations()
      .then((data) => {
        setJar(data);
      })
      .catch((err) => setJar([]));
  }, []);

  return (
    <div>
      <NewReportHeader onNavigateToUserToReport={onNavigateToUserToReport} />
      {jar.length > 0 ? (
        jar.map(({ name, description, selected }, index) => {
          return (
            <Card
              sx={{
                bgcolor: Colors.NAVBAR_PRIMARY_BACKGROUND,
                mt: MARGIN_SIZES.MARGIN_4 / 2,
              }}
            >
              {" "}
              <ListItem
                secondaryAction={
                  <DeleteIcon
                    style={{ color: "white" }}
                    onClick={async () => {
                      const { name } = jar[index];
                      try {
                        await SwearType.deleteSwearType({
                          name: name,
                          teamID: SignedInUser.user.teamID,
                        });
                        const newJar = [];
                        jar.forEach((v, i) => {
                          if (i !== index) newJar.push(v);
                        });
                        setJar(newJar);
                      } catch (err) {
                        alert("Ensure a team has been selected");
                      }
                    }}
                  />
                }
              >
                <ListItemIcon
                  onClick={() => {
                    let tempJar = [...jar];
                    tempJar[index].selected = !tempJar[index].selected;
                    ReportViolationsController.selectSwearType({
                      description: description,
                      name: name,
                      swearTypeID: name,
                      levels: "minor",
                    });
                    setJar(tempJar);
                  }}
                >
                  <Checkbox checked={selected} sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  sx={{ color: "white" }}
                  primary={name}
                  secondaryTypographyProps={{
                    style: { color: "white" },
                  }}
                  secondary={description}
                ></ListItemText>
              </ListItem>
            </Card>
          );
        })
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <Typography variant="h6" mt={2}>
            Click <FavoriteIcon /> button above to start fostering a great team
            culture
          </Typography>
        </Box>
      )}
    </div>
  );
}

function CustomTeamViolation({ onNavigateToUserToReport = () => {} }) {
  return (
    <Grid container>
      <NewReportHeader onNavigateToUserToReport={onNavigateToUserToReport} />

      <MyForm />
    </Grid>
  );
}

const MyForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Name:", name);
    console.log("Description:", description);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ justifyContent: "center", alignItems: "center", flex: 1 }}
    >
      <Typography
        variant="h5"
        gutterBottom
        mt={4}
        sx={{
          textAlign: "center",
          fontWeight: "900",
          marginTop: Padding_Sizes.PADDING_4,
        }}
      >
        Make the best attributes of your team shine
      </Typography>
      <Grid
        item
        sx={{
          width: "90%",
          margin: "0 auto",
          marginTop: Padding_Sizes.PADDING_4,
        }}
      >
        <TextField
          label="Violation Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          sx={[TextFieldStyles.input, { width: 500 }]}
          focused
        />
        <TextField
          label="Tell your team what this violation tracks"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          focused
          sx={[
            TextFieldStyles.input,
            { width: 500, marginTop: Padding_Sizes.PADDING_4 },
          ]}
        />
      </Grid>
      <Button
        style={[
          ButtonStyles.BtnStyle2,
          {
            width: 250,
            position: "relative",
            left: "5%",
            marginTop: Padding_Sizes.PADDING_4,
          },
        ]}
        text="Build my team"
        onPress={async () => {
          try {
            await SwearType.createNewSwearType({
              description: description,
              levels: "minor",
              name: name,
              teamID: SignedInUser.user.teamID,
            });
            alert("We successfully created the new swearType");
          } catch (err) {
            alert(
              "We could not create your violation. Ensure to select a team",
            );
          }
        }}
      />
    </Box>
  );
};

function NewReportHeader({ onNavigateToUserToReport = () => {} }) {
  function getLabel() {
    if (
      NewReportReduxActions.getNewReportActionState() === "new_report/violation"
    )
      return "Create swears that best match your team";
    if (
      NewReportReduxActions.getNewReportActionState() === "new_report/swearjar"
    )
      return "Click on the violations to put in the jar (report)";
    if (
      NewReportReduxActions.getNewReportActionState() === "new_report/category"
    )
      return "Add each swear to your team jar";
    return "";
  }
  return (
    <Grid container>
      <Grid item xs={9}>
        <Typography variant="h3" gutterBottom>
          {NewReportReduxActions.getNewReportActionState() ===
          "new_report/violation"
            ? "Customizer"
            : ""}
          {NewReportReduxActions.getNewReportActionState() ===
          "new_report/swearjar"
            ? "SwearJar"
            : ""}
          {NewReportReduxActions.getNewReportActionState() ===
          "new_report/category"
            ? "Category"
            : ""}
        </Typography>
        <Grid container>
          <Grid item xs={11.98}>
            <Chip
              label={getLabel()}
              sx={{
                bgcolor: Colors.ACCENT_COLOR_1,
                color: Colors.TEXT_COLOR,
                fontSize: FontSizes.bodyFontSize,
              }}
            />
          </Grid>
          {ReportViolationsController.getSelectedSwearTypeCount() > 0 ? (
            <Grid item xs={0.02}>
              <Button
                style={[
                  ButtonStyles.BtnStyle3,
                  { position: "relative", bottom: 15, left: 50 },
                ]}
                text="Report"
                onPress={() => onNavigateToUserToReport()}
              />
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
      <Grid xs={3}>
        <AddIcon
          style={{
            color: Colors.CHART_TEXT,
            fontSize: 30,
            padding: 1,
          }}
          onClick={() => NewReportReduxActions.addCustomViolation()}
        />
        <FavoriteIcon
          style={{
            color: Colors.TEAM_COLOR_ORANGE,
            fontSize: 32,
            padding: 1,
          }}
          onClick={() => NewReportReduxActions.selectFromCategoryViolation()}
        />
        <MenuIcon
          style={{
            color: Colors.ERROR_COLOR,
            fontSize: 30,
            padding: 1,
          }}
          onClick={() => NewReportReduxActions.selectSwearjar()}
        />
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  reportActivity: state.newReportStore,
});
export default connect(mapStateToProps)(ViolationSelectList);
