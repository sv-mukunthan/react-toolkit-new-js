import * as React from "react";
import Box from "@mui/material/Box";
import { Slider, Typography } from "@mui/material";

export default function RangeSlider({
  value,
  handleChange,
  label,
  error,
  helperText,
  min,
  max,
}) {
  return (
    <Box sx={{ width: "100%" }}>
      {label && (
        <Typography
          id="non-linear-slider"
          color={error ? "error" : "text.secondary"}
          pb={0.3}
          display="flex"
          alignItems={"center"}
        >
          {`${label} ${error ? "(" + helperText + ")" : ""}`}
        </Typography>
      )}
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
        min={min || 1}
        max={max || 100}
      />
    </Box>
  );
}
