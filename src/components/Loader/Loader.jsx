import { CircularProgress, Container } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <Container sx={{ display: "flex" }}>
      <CircularProgress size={50} thickness={7} sx={{ margin: "0 auto" }} />
    </Container>
  );
};

export default Loader;
