import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  cancelContainer,
  divider,
  headerContainer,
  mainContainer,
  textStyles,
  uploadContainer,
  uploadingTextStyle,
} from "./styles";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ProgressBar from "../../../../components/ProgressBar/ProgressBar";
import { useUploadFileMutation } from "../../../../RTKQuery/FileService/fileApi";
import { useDispatch, useSelector } from "react-redux";
import {
  setFileData,
  setFileHeaders,
  setUploadedFile,
} from "../../../../RTKQuery/FileService/fileSlice";

const Upload = ({ open, setOpen, setMapModal, uploading, setUploading }) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [uploadFile] = useUploadFileMutation();
  const [fileName, setFileName] = useState(false);
  const [error, setError] = useState("");
  const { progress } = useSelector((state) => state.file);

  const fileUploadComplete = () => {
    setMapModal(true);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpload = () => {
    !uploading && inputRef.current.click();
  };
  const handleDrag = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    setError("");
    const files = Array.from(event.dataTransfer.files);
    if (files[0]?.type === "text/csv") {
      handleFileUpload(files[0]);
    } else {
      setError("Please only upload csv files");
    }
  };
  const handleFileChange = (e) => {
    setFileName(e.target.files[0].name);
    handleFileUpload(e.target.files[0]);
  };
  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);
    try {
      const {
        data: { file, fileData, fileHeaders },
      } = await uploadFile(formData);
      dispatch(setUploadedFile(file));
      dispatch(setFileData(fileData));
      dispatch(setFileHeaders(fileHeaders));
    } catch (error) {
      console.log(error);
    }
  };
  const handleErrorClose = () => {
    setError("");
  };
  useEffect(() => {
    if (progress === 100 && uploading) {
      fileUploadComplete();
    }
  });
  return (
    <Modal
      open={open}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Container sx={mainContainer}>
        <Box sx={headerContainer}>
          <Typography sx={textStyles}>Upload CSV</Typography>
          <IconButton onClick={handleClose}>
            <HighlightOffIcon />
          </IconButton>
        </Box>
        <Divider sx={divider} />
        <Box
          sx={uploadContainer}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          accept="*"
          onClick={handleUpload}
        >
          <UploadFileIcon
            sx={{ width: "5rem", height: "5rem", color: "#808080" }}
          />
          {!uploading ? (
            <Typography sx={textStyles}>
              Drop or Click here to upload CSV
            </Typography>
          ) : (
            <Box onClick={fileUploadComplete}>
              <Typography sx={textStyles} color={"primary"}>
                {fileName}
              </Typography>
              <ProgressBar progress={progress} />
              <Typography sx={uploadingTextStyle}>
                Uploading CSV for mapping...
              </Typography>
            </Box>
          )}
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            accept=".csv"
            multiple={false}
            style={{ display: "none" }}
            ref={inputRef}
          />
        </Box>
        <Divider sx={divider} />
        <Box sx={cancelContainer}>
          <Button color="info" variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
        <Snackbar
          open={error ? true : false}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
          action={
            <IconButton onClick={handleErrorClose}>
              <HighlightOffIcon />
            </IconButton>
          }
        >
          <Alert severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </Modal>
  );
};

export default Upload;
