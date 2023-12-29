import { Box, Button, Container, Typography } from "@mui/material";
import React, { useRef } from "react";
import {
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
import Loader from "../../components/Loader/Loader";
import { useGetFileByIdQuery } from "../../RTKQuery/FileService/fileApi";

const CsvDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetFileByIdQuery(id);
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
              <Typography sx={titleStyles}>{data.originalName}</Typography>
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
              headers={csvData?.headers || []}
              data={csvData?.data || ""}
              filename={data?.title}
              style={{ display: "none" }}
              ref={downloadRef}
            />
          </Box>

          <CustomTable label={comparisonHeader} data={data.csvData} />
        </>
      )}
    </Container>
  );
};

export default CsvDetails;
