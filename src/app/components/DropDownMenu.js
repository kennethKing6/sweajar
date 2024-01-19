import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

function DropdownMenu() {
  // Fetch the menu items from the database and store them in an array
  const [menuItems, setMenuItems] = useState([]);

  useEffect( () => {
    fetch("")
      .then( (response) => response.json )
      .then( (data) => setMenuItems(data) );
  }, []);

  // Store the selected menu item in a state variable
  const [selectedItem, setSelectedItem] = useState("");

  const handleSelect = (eventKey) => {
    setSelectedItem(eventKey);
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {selectedItem || "Select a violation"}
      </Dropdown.Toggle>
  
      <Dropdown.Menu>
        {menuItems.map( (item) => (
          <Dropdown.Item key={item.id} eventKey={item.name}>
            {item.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownMenu;