import React from "react";
import BubbleUI from "react-bubble-ui";
import "react-bubble-ui/dist/index.modern";
import { Colors } from "../assets/colors";

export const BubbleListComponent = ({
  data = [
    { name: "Apple", description: "Fruit" },
    { name: "Banana", description: "Fruit" },
    { name: "Carrot", description: "Vegetable" },
    // Repeat the above objects as needed to reach a total of 50 instances
    // For example:
    { name: "Apple", description: "Fruit" },
    { name: "Banana", description: "Fruit" },
    { name: "Carrot", description: "Vegetable" },
    { name: "Apple", description: "Fruit" },
    { name: "Banana", description: "Fruit" },
    { name: "Carrot", description: "Vegetable" },
    // Repeat the above objects as needed to reach a total of 50 instances
    // For example:
    { name: "Apple", description: "Fruit" },
    { name: "Banana", description: "Fruit" },
    { name: "Carrot", description: "Vegetable" },
    { name: "Apple", description: "Fruit" },
    { name: "Banana", description: "Fruit" },
    { name: "Carrot", description: "Vegetable" },
    // Repeat the above objects as needed to reach a total of 50 instances
    // For example:
    { name: "Apple", description: "Fruit" },
    { name: "Banana", description: "Fruit" },
    { name: "Carrot", description: "Vegetable" },
    { name: "Apple", description: "Fruit" },
    { name: "Banana", description: "Fruit" },
    { name: "Carrot", description: "Vegetable" },
    // Repeat the above objects as needed to reach a total of 50 instances
    // For example:
    { name: "Apple", description: "Fruit" },
    { name: "Banana", description: "Fruit" },
    { name: "Carrot", description: "Vegetable" },
    { name: "Apple", description: "Fruit" },
    { name: "Banana", description: "Fruit" },
    { name: "Carrot", description: "Vegetable" },
    // Repeat the above objects as needed to reach a total of 50 instances
    // For example:
    { name: "Apple", description: "Fruit" },
    { name: "Banana", description: "Fruit" },
    { name: "Carrot", description: "Vegetable" },
    // Add more items as needed
  ],
}) => {
  const options = {
    size: 180,
    minSize: 20,
    gutter: 8,
    provideProps: true,
    numCols: 6,
    fringeWidth: 160,
    yRadius: 130,
    xRadius: 220,
    cornerRadius: 50,
    showGuides: true,
    compact: true,
    gravitation: 5,
  };

  return (
    <BubbleUI options={options} className="myBubbleUI">
      {data.map((item, index) => (
        <span
          className="child"
          key={index}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.ACCENT_COLOR_1,
          }}
        >
          <span
            style={{
              textAlign: "center",
            }}
          >
            <span>{item.name}</span>
            <span>{item.description}</span>
          </span>
        </span>
      ))}
    </BubbleUI>
  );
};
