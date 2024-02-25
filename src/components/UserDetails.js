import React, { useEffect, useState, useEff } from "react";
import { AppState } from "../model/AppState";
import { SignedInUser } from "../model/SignedInUser";
import { User } from "../model/User";

export default function UserDetails({ onPress = () => {} }) {
  const [user, setUser] = useState(null);

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

        {/* <p>Username: {username}</p> */}
        {/* <p>Violation Type: {violationType}</p>
        <p>Count per Violation: {countPerViolation}</p> */}
      </div>
    </div>
  );
}
