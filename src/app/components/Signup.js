import React, { useState } from 'react';
import { Alert, Button, TextField } from '@mui/material';
import { User } from '../model/User';

export default function Signup({
    onBackButton=()=>{}
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await User.createAccount({
        email:email,
        firstName:firstName,
        lastName:lastName,
        password:password
    })
    window.alert("Account was successfully created")
    // Handle form submission here
  };

  return (
    <form onSubmit={async ()=>await handleSubmit()}>
      <TextField
        label="First Name"
        variant="outlined"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        fullWidth
        margin="normal"
        focused
        sx={{
            '& .MuiInputBase-input': {
              color: 'white',
            },
          }}
      />
      <TextField
        label="Last Name"
        variant="outlined"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        fullWidth
        margin="normal"
        focused
        sx={{
            '& .MuiInputBase-input': {
              color: 'white',
            },
          }}
      />
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        focused
        sx={{
            '& .MuiInputBase-input': {
              color: 'white',
            },
          }}
      />
      <TextField
        label="Password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        type="password"
        focused
        sx={{
            '& .MuiInputBase-input': {
              color: 'white',
            },
          }}
      />
      <Button type="submit" variant="contained" color="primary" onClick={async (e)=>await handleSubmit(e)}>
        Sign Up
      </Button>
      <Button variant="text" color="primary" onClick={onBackButton}>
        Back
      </Button>
    </form>
  );
}
