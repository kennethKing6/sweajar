import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, Stack, Typography } from '@mui/material';
import SortButton from './SortButton';
import UserDetails from './UserDetails';
import { User } from '../model/User';
import { SignedInUser } from '../model/SignedInUser';

export default function HomepageLeaderBoard({
  data,
  onExit = () => {},
  onPress = () => {},
  onNavigateToTeams = ()=>{},
}) {
  const [sortedData, setSortedData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);


  useEffect(()=>{
    User.getUsersByteamID(
      SignedInUser.user.userID,
      SignedInUser.user.teamID
      ).then((teams)=>setSortedData(teams)).catch()
  },[])

  const sortAlphabetically = () => {
    const sorted = [...sortedData].sort((a, b) =>
      `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
    );
    setSortedData(sorted);
  }

  const handleUserClick = (user) => {
    setSelectedUser(user);
    onPress()
  }

  return (
    <Grid container spacing={2}>
      {sortedData.length > 0?  <Grid item xs={12} md={8} lg={6} alignSelf="flex-start">
        <Box sx={{ 
          width: '100%', 
          bgcolor: 'black', 
          color: 'white', 
          padding: 2 ,
          border: '2px solid yellow'
          }}>
          <>
            <h1>
              Homepage Leaderboard{' '}
            </h1>
            <SortButton onPress={sortAlphabetically} />
            <nav aria-label="main reported folder">
              <List>
                {sortedData.map((person, index) => (
                  <ListItem key={index}>
                    <ListItemText 
                      primary={
                        <Grid container alignItems="center">
                          {person.profilePicture ? (
                            <Avatar alt={`${person.firstName} ${person.lastName}`} 
                              src={person.profilePicture}
                              onClick={(event) => handleUserClick(person, event)} />
                          ) : (
                            <Avatar sx={{ bgcolor: '#FF5733' }}
                             onClick={(event) => handleUserClick(person, event)}>
                              {`${person.firstName.charAt(0)}${person.lastName.charAt(0)}`}
                            </Avatar>
                          )}
                          <Box sx={{ marginLeft: '10px', flexGrow: 1 }}>{person.firstName} {person.lastName}</Box>
                        </Grid>
                      }
                      secondary={
                        <Grid container alignItems="center" fontSize="18px">
                          <span style={{ marginLeft: '50px', color: 'white' }}>{person.violationType}</span>
                          <span style={{ marginLeft: '20px', color: 'white' }}>{person.countPerViolation}</span>
                        </Grid>
                      }
                      sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    />
                  </ListItem>
                ))}
              </List>
            </nav>
          </>
        </Box>
      </Grid>:<Stack justifyContent="center" alignItems="center" sx={{ height: '100vh' }} onClick={onNavigateToTeams} ><Typography variant="h4" pl={4}>Add Teams here + </Typography>
    </Stack>}  
    </Grid>
  );
}
