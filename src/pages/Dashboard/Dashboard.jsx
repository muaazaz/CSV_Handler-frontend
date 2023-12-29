import React, { useState } from "react";
import CustomTable from "../../components/CustomTable/CustomTable";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import {
  buttonsDiv,
  headerDiv,
  mainDiv,
  searchField,
  searchInput,
} from "./styles";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Upload from "./components/Upload/Upload";
import "./style.css";
import MappingModal from "./components/MappingModal/MappingModal";
import {
  useGetFilesBySearchQuery,
  useGetFilesQuery,
} from "../../RTKQuery/FileService/fileApi";
import { dashboardTableHeader } from "../../constants/componentConstants";
import ActionButton from "./components/ActionButton/ActionButton";
import Loader from "../../components/Loader/Loader";
import CompareModal from "./components/CompareModal/CompareModal";

const Dashboard = () => {
  const [uploadModal, setUploadModal] = useState(false);
  const [compareModal, setCompareModal] = useState(false);
  const [mapModal, setMapModal] = useState(false);
  const { data, isLoading } = useGetFilesQuery();
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState(false);

  const { data: searchResult, isLoading: searchQueryLoading } =
    useGetFilesBySearchQuery(searchQuery, {
      skip: !search,
    });

  const handleSearch = () => {
    setSearch(true);
  };

  const handleSearchChange = (e) => {
    setSearch(false);
    setSearchQuery(e.target.value);
  };

  return (
    <Container sx={mainDiv}>
      <Box sx={headerDiv}>
        <Typography sx={{ fontSize: "1.438rem", fontWeight: "600" }}>
          Dashboard
        </Typography>
        <Box sx={searchField}>
          <input
            type="text"
            style={searchInput}
            className="inputSearch"
            placeholder="Search by File Name or Tag..."
            onChange={handleSearchChange}
          />
          <IconButton onClick={handleSearch}>
            <img src="Research.png" alt="" />
          </IconButton>
        </Box>
        <Box sx={buttonsDiv}>
          <Button
            startIcon={<img src="Vector.png" alt="" />}
            color="secondary"
            variant="contained"
            sx={{ color: "#F3F3F3", marginRight: "1rem" }}
            onClick={() => setCompareModal(true)}
          >
            Compare Tags
          </Button>
          <Button
            startIcon={<UploadFileIcon />}
            color="primary"
            variant="contained"
            sx={{ color: "#F3F3F3" }}
            onClick={() => setUploadModal(true)}
          >
            Upload Csv
          </Button>
        </Box>
      </Box>
      {isLoading || searchQueryLoading ? (
        <Loader />
      ) : (
        <CustomTable
          data={searchResult || data}
          label={dashboardTableHeader}
          view
          action={<ActionButton />}
        />
      )}
      <Upload
        open={uploadModal}
        setOpen={setUploadModal}
        setMapModal={setMapModal}
        uploading={uploading}
        setUploading={setUploading}
      />
      <MappingModal
        open={mapModal}
        setOpen={setMapModal}
        setUploading={setUploading}
        setUploadModal={setUploadModal}
      />
      <CompareModal open={compareModal} setOpen={setCompareModal} />
    </Container>
  );
};

export default Dashboard;
