"use client"
import { useState,useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Checkbox,
  Tooltip,
  Divider,
} from "@mui/material";
import { SwearType } from "../model/SwearType";
import { SignedInUser } from "../model/SignedInUser";
import ReportButton from "./ReportButton";
import AddSwearType from "./AddSwearType";

export default function ViolationSelectList({
  onPress = ()=>{}
}) {
  const [selected, setSelected] = useState([]);
  const [items, setItems] = useState([]);
  const onToggle = (item) => {
    const index = selected.indexOf(item);
    if (index > -1) {
      // Remove the item from the array
      setSelected(selected.filter((i) => i !== item));
    } else {
      // Add the item to the array
      setSelected([...selected, item]);
    }
  };

  useEffect(() => {
    // Fetch the menu items from the database
    const fetchItems = async () => {
      const companyID = SignedInUser.user.companyID;
      const swearTypes = await SwearType.getSwearTypesByCompany(companyID);
      alert(JSON.stringify(swearTypes))
      setItems(swearTypes);
    };
    fetchItems().then().catch()
  }, []);

  function addDefaultViolation({name,description}){
    SwearType.selectReport({
      name:name,
      description:description,
      levels:'minor'
    })
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List subheader={
        <ListSubheader component="div" id="list-subheader">
          Select the Violation
        </ListSubheader>
      } >
        <Tooltip title="Choose this option if the user used inappropriate language" placement="right">
          <ListItem onClick={() => {
            onToggle("Profanity")
            addDefaultViolation({
              name:"Profanity",
              description:"Choose this option if the user used inappropriate language"
            })
          }}>
            <ListItemIcon>
              <Checkbox checked={selected.includes("Profanity")} />
            </ListItemIcon>
            <ListItemText sx={{color:'black'}}>
              Profanity
            </ListItemText>
          </ListItem>
        </Tooltip>

        <Tooltip title="Choose this option if the user's microphone was muted" placement="right">
          <ListItem onClick={() =>{ 
            onToggle("Muted Microphone")
            addDefaultViolation({
              name:"Muted Microphone",
              description:"Choose this option if the user's microphone was muted"
            })
            }}>
            <ListItemIcon>
              <Checkbox checked={selected.includes("Muted Microphone")} />
            </ListItemIcon>
            <ListItemText sx={{color:'black'}}>
              Muted Microphone
            </ListItemText>
          </ListItem>
        </Tooltip>

        <Tooltip title="Choose this option if the user joined the meeting late" placement="right">
          <ListItem onClick={() => {
            onToggle("Late Arrival")
            addDefaultViolation({
              name:"Late Arrival",
              description:"Choose this option if the user joined the meeting late"
            })
            }}>
            <ListItemIcon>
              <Checkbox checked={selected.includes("Late Arrival")} />
            </ListItemIcon>
            <ListItemText sx={{color:'black'}}>
              Late Arrival
            </ListItemText>
          </ListItem>
        </Tooltip>

        {items.map( (item) => (
          <Tooltip title={item.description} placement="right" key={item.id}>
            <ListItem onClick={() => {
              onToggle(item.name)
              SwearType.selectReport({
                description:item.description,
                levels:item.level,
                name:item.name
              })
            }}>
              <ListItemIcon>
                <Checkbox checked={selected.includes(item.name)} />
              </ListItemIcon>
              <ListItemText primary={item.name} sx={{color:'black'}}/>
            </ListItem>
          </Tooltip>
        ))}
        <ListItem>
          <ReportButton onPress={async ()=>{
            try{
              await SwearType.reportSelectedSwearTypes()
              alert("Successfully added violatons")
            }catch(err){
              err = `${err}`
              err = err.replace("Error:","")
              alert(err)
            }
            setSelected([])
          }}/>
        </ListItem>
        <br></br>
        <Divider/>
        <AddSwearType/>
      </List>
    </Box>
  );
}