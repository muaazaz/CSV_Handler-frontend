import { Box, IconButton } from "@mui/material";
import React, { useRef } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import { reportDetail } from "../../../../constants/dummyData";
import { generateCSVData } from "../../../../utils/csv";

const ActionButtons = ({ data }) => {
  const navigate = useNavigate();
  const downloadRef = useRef();
  const { headers, data: csvData } = generateCSVData(reportDetail.comparisons);

  const handleDownload = () => {
    downloadRef.current.link.click();
  };
  const handleView = async () => {
    navigate(`/report/details/${data.id}`);
  };
  return (
    <Box>
      <IconButton onClick={handleDownload}>
        <FileDownloadOutlinedIcon />
      </IconButton>
      <IconButton onClick={handleView}>
        <VisibilityOutlinedIcon />
      </IconButton>
      <CSVLink
        data={csvData}
        headers={headers}
        filename={`${reportDetail.reportNumber}`}
        style={{ display: "none" }}
        ref={downloadRef}
      />
    </Box>
  );
};

export default ActionButtons;
