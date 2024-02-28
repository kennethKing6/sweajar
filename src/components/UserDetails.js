import React, { useEffect, useState, useEff } from "react";
import { AppState } from "../model/AppState";
import { SignedInUser } from "../model/SignedInUser";
import { User } from "../model/User";
import UserDetailsChart from "./UserDetailsChart";
import ViolationsLineChart from "./ViolationsLineChart";
import { Report } from "../model/Report";
import { UserDetailsController } from "../controllers/userDetailsController";

export default function UserDetails({ onPress = () => {} }) {
  const [user, setUser] = useState(null);
  const [chartData, setChartData] = useState([]);

  console.log(user);
  useEffect(() => {
    if (!AppState.selectUserID) {
      User.getUserByID(SignedInUser.user.userID)
        .then((data) => setUser(data))
        .catch();
    } else {
      User.getUserByID(AppState.selectUserID)
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
          console.log(data);
          setChartData(data);
        })
        .catch((err) => {
          console.log(err);
          setChartData([]);
        });
    }
  }, [user]);

  return (
    <div onClick={onPress}>
      <h2>User Details</h2>
      <div>
        <img
          src={user ? user.profilePicture : ""}
          alt={`${user ? user.firstName : ""} ${user ? user.lastName : ""}`}
          style={{
            maxWidth: "20%",
            maxHeight: "auto",
            borderRadius: "50%",
            padding: 2,
          }}
        />
      </div>
      <div>
        <p>
          Name: {user ? user.firstName : ""} {""}
          {user ? user.lastName : ""}
        </p>
        {chartData.length > 0 ? (
          <UserDetailsChart violationData={chartData} />
        ) : (
          <></>
        )}
        <ViolationsLineChart />
      </div>
    </div>
  );
}
