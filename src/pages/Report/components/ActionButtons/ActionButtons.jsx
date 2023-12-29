import { Box, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import { generateCSVData } from "../../../../utils/csv";
import { useGetComparisonByIdQuery } from "../../../../RTKQuery/ComparisonService/ComparisonApi";

const ActionButtons = ({ data: comparison }) => {
  const navigate = useNavigate();
  const downloadRef = useRef();
  const { data } = useGetComparisonByIdQuery(comparison.id);
  const [csvData, setCsvData] = useState(null);

  const handleDownload = () => {
    downloadRef.current.link.click();
  };
  const handleView = async () => {
    navigate(`/report/details/${comparison.id}`);
  };
  useEffect(() => {
    if (data) {
      const response = generateCSVData(data?.reports);
      setCsvData({ ...response });
    }
  }, [data]);
  return (
    <Box>
      <IconButton onClick={handleDownload}>
        <FileDownloadOutlinedIcon />
      </IconButton>
      <IconButton onClick={handleView}>
        <VisibilityOutlinedIcon />
      </IconButton>
      <CSVLink
        headers={csvData?.headers || []}
        data={csvData?.data || ""}
        filename={data?.title}
        style={{ display: "none" }}
        ref={downloadRef}
      />
    </Box>
  );
};

export default ActionButtons;
