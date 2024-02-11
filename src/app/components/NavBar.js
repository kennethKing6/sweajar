import { List } from "@mui/material";
import { lightBlue } from "@mui/material/colors";
import React from "react";
import { User } from "../model/User";

export default function NavBar({
  onLeaderboardClick,
  onTeamsClick,
  onNewReportClick,
  onProfileClick,
  onLogout,
}) {
  return (
    <div style={{ width: "500px", marginLeft: 0 }}>
      <List>
        <ul
          style={{
            listStyleType: "none",
            padding: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid white",
          }}
        >
          <li
            style={{
              flex: 2,
              padding: "3px",
              margin: "0 5px",
              cursor: "pointer",
              border: "1px solid transparent",
              transition: "border 0.3s",
            }}
            onClick={onLeaderboardClick}
            onMouseOver={(e) => (e.target.style.border = "1px solid blue")}
            onMouseOut={(e) =>
              (e.target.style.border = "1px solid transparent")
            }
          >
            Leaderboard
          </li>
          <li
            style={{
              flex: 1.3,
              padding: "3px",
              margin: "0 5px",
              cursor: "pointer",
              border: "1px solid transparent",
              transition: "border 0.3s",
            }}
            onClick={onTeamsClick}
            onMouseOver={(e) => (e.target.style.border = "1px solid blue")}
            onMouseOut={(e) =>
              (e.target.style.border = "1px solid transparent")
            }
          >
            Teams
          </li>
          <li
            style={{
              flex: 2,
              padding: "3px",
              margin: "0 5px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              cursor: "pointer",
              border: "1px solid transparent",
              transition: "border 0.3s",
            }}
            onClick={onNewReportClick}
            onMouseOver={(e) => (e.target.style.border = "1px solid blue")}
            onMouseOut={(e) =>
              (e.target.style.border = "1px solid transparent")
            }
          >
            New Report
          </li>
          <li
            style={{
              flex: 1,
              padding: "3px",
              margin: "0 5px",
              cursor: "pointer",
              border: "1px solid transparent",
              transition: "border 0.3s",
            }}
            onClick={onProfileClick}
            onMouseOver={(e) => (e.target.style.border = "1px solid blue")}
            onMouseOut={(e) =>
              (e.target.style.border = "1px solid transparent")
            }
          >
            Profile
          </li>
          <li
            style={{
              flex: 1,
              padding: "3px",
              margin: "0 5px",
              cursor: "pointer",
              border: "1px solid transparent",
              transition: "border 0.3s",
            }}
            onClick={async () => {
              await User.signOut();
              onLogout();
            }}
            onMouseOver={(e) => (e.target.style.border = "1px solid blue")}
            onMouseOut={(e) =>
              (e.target.style.border = "1px solid transparent")
            }
          >
            Logout
          </li>
        </ul>
      </List>
    </div>
  );
}
