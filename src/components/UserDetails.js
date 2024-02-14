import React from "react";
import { AppState } from "../model/AppState";

export default function UserDetails({ user, onPress = () => {} }) {
  if (!user) {
    // If there's no user, return null or some placeholder
    return null;
  }

  const {
    firstName,
    lastName,
    username,
    profilePicture,
    violationType,
    countPerViolation,
  } = user;
  return (
    <div onClick={onPress}>
      <h2>User Details</h2>
      <div>
        <img
          src={AppState.selectedProfile.profilePicture}
          alt={`${firstName} ${lastName}`}
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
          Name: {AppState.selectedProfile.firstName}{" "}
          {AppState.selectedProfile.lastName}
        </p>

        {/* <p>Username: {username}</p> */}
        <p>Violation Type: {violationType}</p>
        <p>Count per Violation: {countPerViolation}</p>
      </div>
    </div>
  );
}
