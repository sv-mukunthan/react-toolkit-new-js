import { CircularProgress, Box } from "@mui/material";
import React from "react";

const Loader = ({ auth }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: auth ? "100vh" : "100%",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
