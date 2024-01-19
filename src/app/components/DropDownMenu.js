import { useState } from "react";
import { 
  Container, 
  Button,
  Menu,
  MenuItem,
  Checkbox,
} from "@mui/material";

export default function DropdownMenu() {
  const [anchor, setAnchor] = useState(null);
  const [selected, setSelected] = useState([]);
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

  return (
    <Container>
      <Button onClick={onClick}>Select the Violation</Button>
      <Menu anchorEl={anchor} open={!!anchor}>
        <MenuItem onClick={() => onToggle("Profanity")}>
          <Checkbox checked={selected.includes("Profanity")} />
          Profanity
        </MenuItem>

        <MenuItem onClick={() => onToggle("Muted Microphone")}>
          <Checkbox checked={selected.includes("Muted Microphone")} />
          Muted Microphone
        </MenuItem>

        <MenuItem onClick={() => onToggle("Late Arrival")}>
          <Checkbox checked={selected.includes("Late Arrival")} />
          Late Arrival
        </MenuItem>
      </Menu>
    </Container>
  );
}