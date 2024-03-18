import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { DefaultViolations } from "../model/DefaultViolations";
import { FontSizes } from "../assets/fonts";

const NewReportCategory = ({ onSelectedViolations = () => {} }) => {
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
  return (
    <Grid container spacing={3}>
      {categories.map(({ key, value }) => {
        return (
          <Grid
            item
            xs={3}
            sx={{ textAlign: "center" }}
            onClick={() => onSelectedViolations({ name: key, icon: value })}
          >
            <Paper elevation={10} sx={{ height: 180 }}>
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
