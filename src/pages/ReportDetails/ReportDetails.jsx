import { Box, Button, Container, Typography } from "@mui/material";
import React, { useRef } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { useGetComparisonByIdQuery } from "../../RTKQuery/ComparisonService/ComparisonApi";
import Loader from "../../components/Loader/Loader";

const ReportDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetComparisonByIdQuery(id);
  const csvData = generateCSVData(data?.reports);
  const downloadRef = useRef();

  const handleCsvDownload = () => {
    downloadRef.current.link.click();
  };
  return (
    <Container sx={mainContainer}>
      {isLoading && !data ? (
        <Loader />
      ) : (
        <>
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
              <Typography sx={titleStyles}>{data.title}</Typography>
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
              data={csvData?.data || ""}
              headers={csvData?.headers || ""}
              filename={data?.title}
              style={{ display: "none" }}
              ref={downloadRef}
            />
          </Box>
          <Box sx={comparisonsContainer}>
            {data?.reports ? (
              data?.reports.map((element, index) => (
                <Box sx={comparisonContainer} key={element.title + index}>
                  <Typography sx={comparisonTitle}>{element.title}</Typography>
                  <CustomTable
                    label={comparisonHeader}
                    data={element.matchedRecords}
                    paginationHidden
                  />
                </Box>
              ))
            ) : (
              <Box>
                <Typography sx={titleStyles}>
                  Nothing Seems to be common in these files!.
                </Typography>
              </Box>
            )}
          </Box>
        </>
      )}
    </Container>
  );
};

export default ReportDetails;
