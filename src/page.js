"use client";
import { Provider } from "react-redux";
import Button from "./components/Button";
import UsersList from "./components/UsersList";
import React, { useEffect, useState } from "react";
import ViolationSelectList from "./components/ViolationSelectList";
import Grid from "@mui/material/Grid";
import ReportButton from "./components/ReportButton";
import ReportList from "./components/HomepageLeaderBoard";
import HomepageLeaderBoard from "./components/HomepageLeaderBoard";
import { FirebaseAuth } from "./shared/firebase/firebaseAuth";
import { SignedInUser } from "./model/SignedInUser";
import { User } from "./model/User";
import Welcome from "./components/Welcome";
import UserDetails from "./components/UserDetails";
import NavBar from "./components/NavBar";
import TeamViewer from "./components/TeamViewer";
import { reduxStore } from "./shared/redux/reduxStore";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { appDimensions } from "./assets/appDimensions";
import TeamDetails from "./components/TeamDetails";

const USER_LIST_COMPONENT = "userLiist";
const VIOLATION_LIST_COMPONENT = "userViolations";
const HOMEPAGE_LEADERBOARD = "leaderboard";
const USER_DETAILS_COMPONENT = "userDetails";
const TEAM_VIEWER_COMPONENT = "teamViewer";
const TEAM_DETAILS_COMPONENT = "teamDetails";

const cache = createCache({ key: "css", prepend: true });

export default function Page({ Component, pageProps }) {
  return <App {...pageProps} />;
}

function App() {
  const [switcher, setSwitcher] = useState(HOMEPAGE_LEADERBOARD);
  const [user, setUser] = useState();
  const HomepageLeaderBoardData = [
    {
      // Dummy user details
      username: "BobbyBoy123",
      profilePicture:
        "https://img.freepik.com/free-photo/user-front-side-with-white-background_187299-40007.jpg?w=740&t=st=1705633868~exp=1705634468~hmac=76e3865f1fd041589284444d1270b80bd35408a9ce616303cd36e6abfd08f9e8",
      violationType: "Profanity",
      firstName: "Bobby",
      lastName: "Boy",
      countPerViolation: "20",
    },

    {
      // Dummy user details
      username: "SobbyBoy123",
      profilePicture:
        "https://img.freepik.com/free-photo/user-front-side-with-white-background_187299-40007.jpg?w=740&t=st=1705633868~exp=1705634468~hmac=76e3865f1fd041589284444d1270b80bd35408a9ce616303cd36e6abfd08f9e8",
      violationType: "Profanity",
      firstName: "Sobby",
      lastName: "Boy",
      countPerViolation: "20",
    },

    {
      // Dummy user details
      username: "LobbyBoy123",
      profilePicture:
        "https://img.freepik.com/free-photo/user-front-side-with-white-background_187299-40007.jpg?w=740&t=st=1705633868~exp=1705634468~hmac=76e3865f1fd041589284444d1270b80bd35408a9ce616303cd36e6abfd08f9e8",
      violationType: "Profanity",
      firstName: "Lobby",
      lastName: "Boy",
      countPerViolation: "20",
    },

    {
      // Finalize the variables here
      username: "KenK123",
      profilePicture: "",
      violationType: "Forgot to unmute",
      firstName: "Ken",
      lastName: "K",
      countPerViolation: "1000",
    },
  ];

  useEffect(() => {
    User.listenForUserState((user) => {
      setUser(user);
    });
  }, []);

  return (
    <Grid
      style={{
        height: appDimensions.EXTENSION_HEIGHT,
        width: appDimensions.EXTENSION_WIDTH,
      }}
    >
      <NavBar
        onLeaderboardClick={() => setSwitcher(HOMEPAGE_LEADERBOARD)}
        onNewReportClick={() => setSwitcher(VIOLATION_LIST_COMPONENT)}
        onProfileClick={() => setSwitcher(USER_DETAILS_COMPONENT)}
        onTeamsClick={() => setSwitcher(TEAM_VIEWER_COMPONENT)}
        onLogout={() => setSwitcher(HOMEPAGE_LEADERBOARD)}
      />
      {user ? (
        <>
          {switcher === TEAM_VIEWER_COMPONENT ? (
            <TeamViewer
              onPress={() => {
                setSwitcher(TEAM_DETAILS_COMPONENT);
              }}
            />
          ) : (
            <></>
          )}
          {switcher === USER_LIST_COMPONENT ? (
            <UsersList
              onPress={() => {
                setSwitcher(VIOLATION_LIST_COMPONENT);
              }}
            />
          ) : (
            <></>
          )}
          {switcher === VIOLATION_LIST_COMPONENT ? (
            <ViolationSelectList
              onNavigateToUserToReport={() => setSwitcher(USER_LIST_COMPONENT)}
              onPress={() => {
                setSwitcher(HOMEPAGE_LEADERBOARD);
              }}
            />
          ) : (
            <></>
          )}
          {switcher === USER_DETAILS_COMPONENT ? (
            <UserDetails
              user={HomepageLeaderBoardData[0]}
              onPress={() => {
                setSwitcher(HOMEPAGE_LEADERBOARD);
              }}
            />
          ) : (
            <></>
          )}
          {switcher === TEAM_DETAILS_COMPONENT ? <TeamDetails /> : <></>}
          {switcher === HOMEPAGE_LEADERBOARD ? (
            <Grid container spacing={2}>
              <Grid
                item
                sx={{
                  width: "100%",
                }}
              >
                <HomepageLeaderBoard
                  data={HomepageLeaderBoardData}
                  onNavigateToTeams={() => setSwitcher(TEAM_VIEWER_COMPONENT)}
                  onPress={() => setSwitcher(USER_DETAILS_COMPONENT)}
                />
              </Grid>
            </Grid>
          ) : (
            <></>
          )}
        </>
      ) : (
        <Welcome />
      )}
    </Grid>
  );
}
