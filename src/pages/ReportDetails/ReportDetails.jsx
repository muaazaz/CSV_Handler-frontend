import { Box, Button, Container, Typography } from "@mui/material";
import React, { useRef } from "react";
import { reportDetail } from "../../constants/dummyData";
import {
  comparisonContainer,
  comparisonTitle,
  comparisonsContainer,
  headerContainer,
  mainContainer,
  titleContainer,
  titleStyles,
} from "./styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomTable from "../../components/CustomTable/CustomTable";
import { comparisonHeader } from "../../constants/componentConstants";
import { CSVLink } from "react-csv";
import { generateCSVData } from "../../utils/csv";
import { useNavigate } from "react-router-dom";

const ReportDetails = () => {
  const navigate = useNavigate();
  const { headers, data } = generateCSVData(reportDetail.comparisons);
  const downloadRef = useRef();

  const handleCsvDownload = () => {
    downloadRef.current.link.click();
  };
  return (
    <Container sx={mainContainer}>
      <Box sx={headerContainer}>
        <Box sx={titleContainer}>
          <Button
            color="info"
            sx={{ color: "black" }}
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
          <Typography
            sx={titleStyles}
          >{`${reportDetail.reportNumber} - ${reportDetail.date}`}</Typography>
        </Box>
        <Button
          color="secondary"
          variant="contained"
          sx={{ color: "white" }}
          startIcon={<img src="/download.svg" alt="" />}
          onClick={handleCsvDownload}
        >
          Export CSV
        </Button>
        <CSVLink
          data={data}
          headers={headers}
          filename={`${reportDetail.reportNumber}`}
          style={{ display: "none" }}
          ref={downloadRef}
        />
      </Box>
      <Box sx={comparisonsContainer}>
        {reportDetail.comparisons.map((element, index) => (
          <Box sx={comparisonContainer} key={element.title + index}>
            <Typography sx={comparisonTitle}>{element.title}</Typography>
            <CustomTable
              label={comparisonHeader}
              data={element.matchedRecords}
              paginationHidden
            />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default ReportDetails;
