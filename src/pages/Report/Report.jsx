import React from "react";
import CustomTable from "../../components/CustomTable/CustomTable";
import { Box, Container, Typography } from "@mui/material";
import { headerDiv, mainDiv } from "./styles";
import { reportTableHeader } from "../../constants/componentConstants";
import ActionButtons from "./components/ActionButtons/ActionButtons";
import Loader from "../../components/Loader/Loader";
import { useGetComparisonsQuery } from "../../RTKQuery/ComparisonService/ComparisonApi";

const Report = () => {
  const { data, isLoading } = useGetComparisonsQuery();

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
          data={data}
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
