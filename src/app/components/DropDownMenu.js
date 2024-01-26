"use client"
import { useState,useEffect } from "react";
import { 
  Container, 
  Button,
  Menu,
  MenuItem,
  Checkbox,
  Tooltip,
} from "@mui/material";
import { SwearType } from "../model/SwearType";
import { SignedInUser } from "../model/SignedInUser";
import ReportButton from "./ReportButton";

export default function DropdownMenu({
  onPress = ()=>{}
}) {
  const [anchor, setAnchor] = useState(null);
  const [selected, setSelected] = useState([]);
  const [items, setItems] = useState([]);
  const onClick = (e) => setAnchor(e.currentTarget);
  const onClose = () => setAnchor(null);
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
      <Button onClick={onClick}>Select the Violation</Button>
      <Menu anchorEl={anchor} open={!!anchor}>
        <Tooltip title="Choose this option if the user used inappropriate language" placement="right">
          <MenuItem onClick={() => onToggle("Profanity")}>
            <Checkbox checked={selected.includes("Profanity")} />
            Profanity
            </MenuItem>
        </Tooltip>

        <Tooltip title="Choose this option if the user's microphone was muted" placement="right">
          <MenuItem onClick={() => onToggle("Muted Microphone")}>
            <Checkbox checked={selected.includes("Muted Microphone")} />
            Muted Microphone
          </MenuItem>
        </Tooltip>

        <Tooltip title="Choose this option if the user joined the meeting late" placement="right">
          <MenuItem onClick={() => onToggle("Late Arrival")}>
            <Checkbox checked={selected.includes("Late Arrival")} />
            Late Arrival
          </MenuItem>
        </Tooltip>

        {items.map( (item) => (
          <Tooltip title={item.description} placement="right" key={item.id}>
            <MenuItem onClick={() => onToggle(item.name)}>
              <Checkbox checked={selected.includes(item.name)} />
              {item.name}
            </MenuItem>
          </Tooltip>
        ))}
        <ReportButton onPress={onPress}/>
        </Menu>
    </Container>
  );
}