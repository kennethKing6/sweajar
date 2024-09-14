import React, { useEffect, useState } from "react";
import { AppState } from "../model/AppState";
import { SignedInUser } from "../model/SignedInUser";
import { User } from "../model/User";
import UserDetailsChart from "./UserDetailsChart";
import ViolationsLineChart from "./ViolationsLineChart";
import { UserDetailsController } from "../controllers/userDetailsController";
import { FontSizes } from "../assets/fonts";
import {
  Accordion,
  Divider,
  ListItem,
  ListItemText,
  AccordionSummary,
  AccordionDetails,
  colors,
} from "@mui/material";
import { Circle, ExpandMoreRounded } from "@mui/icons-material";
import { Colors } from "../assets/colors";
import { DefaultViolations } from "../model/DefaultViolations";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function UserDetails({ onPress = () => {} }) {
  const [user, setUser] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [lineSeries, setLineSeries] = useState([]);

  useEffect(() => {
    try {
      if (AppState.selectUserID) {
        User.getUserByID(AppState.selectUserID)
          .then((data) => setUser(data))
          .catch();
      } else {
        User.getUserByID(SignedInUser.user.userID)
          .then((data) => setUser(data))
          .catch();
      }
    } catch (err) {}
  }, []);

  useEffect(() => {
    if (user) {
      UserDetailsController.getMonthBarChartData(
        user.userID,
        SignedInUser.user.teamID,
      )
        .then((data) => {
          // console.log(data);
          setChartData(data);
        })
        .catch((err) => {
          // console.log(err);
          setChartData([]);
        });
    }
  }, [user]);

  return (
    <div
      style={{
        height: "auto",
        textAlign: "center",
        padding: "10px",
        color: Colors.TEXT_COLOR,
        backgroundColor: Colors.BACKGROUND_COLOR,
      }}
    >
      <div
        style={{
          textAlign: "left",
          marginLeft: "5%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div onClick={onPress}>
          <img
            src={user ? user.profilePicture : ""}
            alt={`${user ? user.firstName : ""} ${user ? user.lastName : ""}`}
            style={{
              width: 125,
              maxHeight: "auto",
              borderRadius: "50%",
              padding: 2,
              backgroundColor: Colors.ACCENT_COLOR_3,
            }}
          />
        </div>
        <div
          style={{
            marginLeft: "30px",
            lineHeight: "8px",
            backgroundColor: Colors.BACKGROUND_COLOR,
          }}
        >
          <p
            style={{
              fontWeight: "bolder",
              fontSize: FontSizes.titleFontSize,
              fontFamily: '"Noto Sans',
            }}
          >
            Name: {""}
            {user ? user.firstName : ""} {""}
            {user ? user.lastName : ""}
          </p>
          <p
            style={{
              fontWeight: "bolder",
              fontSize: FontSizes.largeFontSize,
              fontFamily: '"Noto Sans',
            }}
          >
            Email: {""}
            {user ? user.email : ""}
          </p>
        </div>
      </div>
      <p
        style={{
          fontWeight: "bold",
          fontSize: FontSizes.largeFontSize,
          fontFamily: '"Noto Sans',
          color: "#E6B545",
        }}
      >
        Analysis
      </p>

      {chartData.length > 0 ? (
        <Accordion sx={{ backgroundColor: Colors.BACKGROUND_COLOR_SECONDARY }}>
          <AccordionSummary
            expandIcon={<ExpandMoreRounded />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              color: Colors.TEXT_COLOR,
              backgroundColor: Colors.BACKGROUND_COLOR,
              border: "1px solid blue",
            }}
          >
            Violations Overview
          </AccordionSummary>
          <AccordionDetails>
            <UserDetailsChart violationData={chartData} />
          </AccordionDetails>
        </Accordion>
      ) : (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreRounded />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              color: Colors.TEXT_COLOR,
              backgroundColor: Colors.BACKGROUND_COLOR,
              border: "1px solid blue",
            }}
          >
            Violations Overview
          </AccordionSummary>
          <AccordionDetails>No graph available at the moment</AccordionDetails>
        </Accordion>
      )}
      <ViolationsLineSeries user={user} />

      {chartData.length > 0 ? (
        chartData.map((data) => {
          return <ViolationType data={data} />;
        })
      ) : (
        <></>
      )}
    </div>
  );
}
function ViolationType({ data }) {
  const [description, setDescription] = useState("");
  useEffect(() => {
    DefaultViolations.forEach(({ name, description }) => {
      if (name === data["violationType"]) setDescription(description);
      else if (data["description"]) setDescription(data["description"]);
    });
  }, [data]);
  return (
    <Box sx={{ backgroundColor: Colors.BACKGROUND_COLOR }}>
      <ListItem
        sx={{ backgroundColor: Colors.BACKGROUND_COLOR_EERIE }}
        alignItems="flex-start"
        secondaryAction={
          <p
            style={{
              backgroundColor: Colors.BACKGROUND_COLOR_YELLOW,
              color: Colors.TEXT_COLOR_SECONDARY,
              fontSize: 16,
              fontWeight: "bold",
              width: "25px",
              height: "25px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {data["countPerViolation"]}
          </p>
        }
      >
        <ListItemText
          primary={data["violationType"]}
          secondary={<p style={{ color: Colors.TEXT_COLOR }}>{description}</p>}
        />
      </ListItem>
      <Divider
        variant="middle"
        sx={{ height: 2, backgroundColor: Colors.BACKGROUND_COLOR, padding: 1 }}
      />
    </Box>
  );
}

function ViolationsLineSeries({ user }) {
  const Days_30 = 30;
  const Days_90 = 90;
  const Days_360 = 360;

  const [lineData, setLineData] = useState([]);
  const [lineSeries, setLineSeries] = useState([]);
  const [selectedTimestampData, setSelectedTimestampData] = useState(Days_30);

  useEffect(() => {
    if (user) {
      if (selectedTimestampData === Days_30) {
        UserDetailsController.getMonthLineChartData(
          user.userID,
          SignedInUser.user.teamID,
        )
          .then(({ data, series }) => {
            setLineData(data);
            setLineSeries(series);
          })
          .catch();
      } else if (selectedTimestampData === Days_90) {
        UserDetailsController.getThreeMothsLineChartData(
          user.userID,
          SignedInUser.user.teamID,
        )
          .then(({ data, series }) => {
            setLineData(data);
            setLineSeries(series);
          })
          .catch();
      } else if (selectedTimestampData === Days_360) {
        UserDetailsController.getThisYearLineChartData(
          user.userID,
          SignedInUser.user.teamID,
        )
          .then(({ data, series }) => {
            setLineData(data);
            setLineSeries(series);
          })
          .catch();
      }
    }
  }, [user, selectedTimestampData]);

  return (
    <>
      {lineData.length > 0 && lineSeries.length > 0 ? (
        <Accordion sx={{ backgroundColor: Colors.BACKGROUND_COLOR_SECONDARY }}>
          <AccordionSummary
            expandIcon={<ExpandMoreRounded />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              color: Colors.TEXT_COLOR,
              backgroundColor: Colors.BACKGROUND_COLOR,
              border: "1px solid blue",
              marginTop: "5px",
            }}
          >
            Violations Timelines
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ minWidth: 120 }}>
              <FormControl
                fullWidth
                sx={{
                  backgroundColor: Colors.BACKGROUND_COLOR_GOLD,
                  marginBottom: 2,
                }}
              >
                <InputLabel id="demo-simple-select-label">
                  Filter Violations
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedTimestampData}
                  label="Filter Violations"
                  onChange={(e) => setSelectedTimestampData(e.target.value)}
                >
                  <MenuItem value={Days_30}>30 days</MenuItem>
                  <MenuItem value={Days_90}>90 days</MenuItem>
                  <MenuItem value={Days_360}>365 days</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <ViolationsLineChart lineData={lineData} lineSeries={lineSeries} />
          </AccordionDetails>
        </Accordion>
      ) : (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreRounded />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              color: Colors.TEXT_COLOR,
              backgroundColor: Colors.BACKGROUND_COLOR,
              border: "1px solid blue",
              marginTop: "5px",
            }}
          >
            Violations Timelines
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ minWidth: 120 }} mb={5}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Filter Violations
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedTimestampData}
                  label="Filter Violations"
                  onChange={(e) => setSelectedTimestampData(e.target.value)}
                >
                  <MenuItem value={Days_30}>30 days</MenuItem>
                  <MenuItem value={Days_90}>90 days</MenuItem>
                  <MenuItem value={Days_360}>365 days</MenuItem>
                </Select>
              </FormControl>
            </Box>
            No graph available at the moment
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
}
