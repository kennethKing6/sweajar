"use client"
import { useState,useEffect } from "react";
import { 
  Container, 
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Tooltip,
} from "@mui/material";
import { SwearType } from "../model/SwearType";
import { SignedInUser } from "../model/SignedInUser";
import ReportButton from "./ReportButton";

export default function ViolationSelectList({
  onPress = ()=>{}
}) {
  const [selected, setSelected] = useState([]);
  const [items, setItems] = useState([]);
  const onClick = (e) => setAnchor(e.currentTarget);
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

  return (
    <Container>
      <List>
        <Tooltip title="Choose this option if the user used inappropriate language" placement="right">
          <ListItem onClick={() => onToggle("Profanity")}>
            <ListItemIcon>
              <Checkbox checked={selected.includes("Profanity")} />
            </ListItemIcon>
            <ListItemText>
              Profanity
            </ListItemText>
          </ListItem>
        </Tooltip>

        <Tooltip title="Choose this option if the user's microphone was muted" placement="right">
          <ListItem onClick={() => onToggle("Muted Microphone")}>
            <ListItemIcon>
              <Checkbox checked={selected.includes("Muted Microphone")} />
            </ListItemIcon>
            <ListItemText>
              Muted Microphone
            </ListItemText>
          </ListItem>
        </Tooltip>

        <Tooltip title="Choose this option if the user joined the meeting late" placement="right">
          <ListItem onClick={() => onToggle("Late Arrival")}>
            <ListItemIcon>
              <Checkbox checked={selected.includes("Late Arrival")} />
            </ListItemIcon>
            <ListItemText>
              Late Arrival
            </ListItemText>
          </ListItem>
        </Tooltip>

        {items.map( (item) => (
          <Tooltip title={item.description} placement="right" key={item.id}>
            <ListItem onClick={() => onToggle(item.name)}>
              <ListItemIcon>
                <Checkbox checked={selected.includes(item.name)} />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          </Tooltip>
        ))}

        <ReportButton onPress={onPress}/>
      </List>
        {/* <Tooltip title="Choose this option if the user's microphone was muted" placement="right">
          <MenuItem onClick={() => onToggle("Muted Microphone")}>
            <Checkbox checked={selected.includes("Muted Microphone")} />
            Muted Microphone
          </MenuItem>
        </Tooltip> */}

        {/* <Tooltip title="Choose this option if the user joined the meeting late" placement="right">
          <MenuItem onClick={() => onToggle("Late Arrival")}>
            <Checkbox checked={selected.includes("Late Arrival")} />
            Late Arrival
          </MenuItem>
        </Tooltip> */}

        {/* {items.map( (item) => (
          <Tooltip title={item.description} placement="right" key={item.id}>
            <MenuItem onClick={() => onToggle(item.name)}>
              <Checkbox checked={selected.includes(item.name)} />
              {item.name}
            </MenuItem>
          </Tooltip>
        ))} */}
    </Container>
  );
}