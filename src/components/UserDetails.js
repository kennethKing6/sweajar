import React, { useEffect, useState, useEff } from "react";
import { AppState } from "../model/AppState";
import { SignedInUser } from "../model/SignedInUser";
import { User } from "../model/User";
import UserDetailsChart from "./UserDetailsChart";
import ViolationsLineChart from "./ViolationsLineChart";
import { Report } from "../model/Report";
import { UserDetailsController } from "../controllers/userDetailsController";
import { FontSizes } from "../assets/fonts";
import {
  Accordion,
  Divider,
  ListItem,
  ListItemText,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMoreRounded } from "@mui/icons-material";
import { Colors } from "../assets/colors";
import { DefaultViolations } from "../model/DefaultViolations";

export default function UserDetails({ onPress = () => {} }) {
  const [user, setUser] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [lineSeries, setLineSeries] = useState([]);

  useEffect(() => {
    if (AppState.selectUserID) {
      User.getUserByID(AppState.selectUserID)
        .then((data) => setUser(data))
        .catch();
    } else {
      User.getUserByID(SignedInUser.user.userID)
        .then((data) => setUser(data))
        .catch();
    }
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

  useEffect(() => {
    if (user) {
      UserDetailsController.getMonthLineChartData(
        user.userID,
        SignedInUser.user.teamID,
      )
        .then(({ data, series }) => {
          setLineData(data);
          setLineSeries(series);
        })
        .catch();
    }
  }, [user]);

  return (
    <div style={{ textAlign: "center", marginTop: "5%" }}>
      <div onClick={onPress}>
        <img
          src={user ? user.profilePicture : ""}
          alt={`${user ? user.firstName : ""} ${user ? user.lastName : ""}`}
          style={{
            maxWidth: 300,
            maxHeight: "auto",
            borderRadius: "50%",
            padding: 2,
            backgroundColor: Colors.ACCENT_COLOR_3,
          }}
        />
      </div>
      <div>
        <p
          style={{
            fontWeight: "bolder",
            fontSize: FontSizes.titleFontSize,
            fontFamily: '"Noto Sans',
          }}
        >
          {user ? user.firstName : ""} {""}
          {user ? user.lastName : ""}
        </p>
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
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreRounded />}
              aria-controls="panel1-content"
              id="panel1-header"
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
            >
              Violations Overview
            </AccordionSummary>
            <AccordionDetails>
              No graph available at the moment
            </AccordionDetails>
          </Accordion>
        )}
        {lineData.length > 0 && lineSeries.length > 0 ? (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreRounded />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Violations Timelines
            </AccordionSummary>
            <AccordionDetails>
              <ViolationsLineChart
                lineData={lineData}
                lineSeries={lineSeries}
              />
            </AccordionDetails>
          </Accordion>
        ) : (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreRounded />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Violations Timelines
            </AccordionSummary>
            <AccordionDetails>
              No graph available at the moment
            </AccordionDetails>
          </Accordion>
        )}

        {chartData.length > 0 ? (
          chartData.map((data) => {
            return <ViolationType data={data} />;
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
function ViolationType({ data }) {
  const [description, setDescription] = useState("");
  useEffect(() => {
    DefaultViolations.forEach(({ name, description }) => {
      if (name === data["violationType"]) setDescription(description);
    });
  }, [data]);
  return (
    <>
      <ListItem
        alignItems="flex-start"
        secondaryAction={<p>{data["countPerViolation"]}</p>}
      >
        <ListItemText
          primary={data["violationType"]}
          secondary={<p>{description}</p>}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}
