"use client"
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {Avatar} from '@mui/material';

export default function UserViolationDetails({ data }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8} lg={6} alignSelf="flex-start">
        <Box sx={{ width: '100%', bgcolor: '#216c5c ', color: 'primary.contrastText', padding: 5 }}>
          <>
            <div>User Violation Details</div>
            <nav aria-label="main reported folder">
              <List>
                {data.map((person, index) => (
                  <ListItem key={index} >
                    <ListItemText 
                      primary={
                        <Grid container alignItems={"center"}>
                          <Avatar alt={`${person.firstName} ${person.lastName}`} src={person.profilePicture}/>
                          <Box sx={{ marginLeft: '8px' }}>{person.firstName} {person.lastName}</Box>
                        </Grid>
                      }
                      secondary={
                        <Grid container alignItems={'center'} fontSize={'20px'}>
                          <span style={{ marginLeft: '45px' }}>{person.violationType}</span>
                          <span style={{ marginLeft: '20px' }}>{person.countPerViolation}</span>
                        </Grid>
                      }
                      sx={{ marginLeft: '8px' }}
                    />
                  </ListItem>
                ))}
              </List>
            </nav>
          </>
        </Box>
      </Grid>
    </Grid>
  );
}