import React from "react";
import CustomTable from "../../components/CustomTable/CustomTable";
import { Box, Container, Typography } from "@mui/material";
import { headerDiv, mainDiv } from "./styles";
import { reportTableHeader } from "../../constants/componentConstants";
import ActionButtons from "./components/ActionButtons/ActionButtons";
import Loader from "../../components/Loader/Loader";
import { reportsDummyData } from "../../constants/dummyData";

const Report = () => {
  const isLoading = false;

  return (
    <Container sx={mainDiv}>
      <Box sx={headerDiv}>
        <Typography sx={{ fontSize: "1.438rem", fontWeight: "600" }}>
          Comparison Reports
        </Typography>
      </Box>
      {!isLoading ? (
        <CustomTable
          label={reportTableHeader}
          data={reportsDummyData}
          action={<ActionButtons />}
          view
        />
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default Report;
