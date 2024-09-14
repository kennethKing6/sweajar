import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { DefaultViolations } from "../model/DefaultViolations";
import { FontSizes } from "../assets/fonts";
import { Colors } from "../assets/colors";

const NewReportCategory = ({ onSelectedViolations = () => { } }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const result = [];
    getCategories().forEach((value, key) => {
      result.push({
        key,
        value,
      });
    });
    setCategories([...result]);
  }, []);

  const handleMouseEnter = (key) => {
    // Implement any hover effect logic here
  };

  const handleMouseLeave = () => {
    // Implement any hover effect logic here
  };

  return (
    <Grid container spacing={3} mb={5}>
      {categories.map(({ key, value }) => {
        return (
          <Grid
            item
            xs={3}
            sx={{ textAlign: "center" }}
            onClick={() => onSelectedViolations({ name: key, icon: value })}
          >
            <Paper
              elevation={10}
              onMouseEnter={() => handleMouseEnter(key)}
              onMouseLeave={handleMouseLeave}
              sx={{
                height: 150,
                padding: "1px",
                bgcolor: Colors.BACKGROUND_COLOR_EERIE,
                color: Colors.TEXT_COLOR,
                transition: "background-color 0.1s, box-shadow 0.3s",
                "&:hover": {
                  bgcolor: Colors.TEAM_COLOR_DARK_BLUE,
                  boxShadow: `0 0 10px ${Colors.TEAM_COLOR_DARK_BLUE}`,
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: FontSizes.largeFontSize * 3,
                }}
              >
                {value}
              </Typography>
              <Typography
                variant="h6"
                elevation={10}
                sx={{ fontSize: FontSizes.smallFontSize }}
              >
                {key}
              </Typography>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

const getCategories = () => {
  const categorySet = new Map();

  for (let i = 0; i < DefaultViolations.length; i++) {
    const { category, categoryIcon } = DefaultViolations[i];
    categorySet.set(category, categoryIcon);
  }
  return categorySet;
};

export default NewReportCategory;
