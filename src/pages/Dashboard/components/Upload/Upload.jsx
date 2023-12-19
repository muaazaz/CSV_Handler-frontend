import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
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
  const inputRef = useRef();
  const dispatch = useDispatch();
  const [uploadFile] = useUploadFileMutation();
  const [fileName, setFileName] = useState(false);
  const { progress } = useSelector((state) => state.file);

  const fileUploadComplete = () => {
    setMapModal((prev) => !prev);
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen((prev) => !prev);
  };
  const handleUpload = () => {
    !uploading && inputRef.current.click();
  };
  const handleFileChange = async (e) => {
    setUploading((prev) => !prev);
    setFileName(e.target.files[0].name);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
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
        <Box sx={uploadContainer} onClick={handleUpload}>
          <UploadFileIcon
            sx={{ width: "5rem", height: "5rem", color: "#808080" }}
          />
          {!uploading ? (
            <Typography sx={textStyles}>Click here to upload CSV</Typography>
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
      </Container>
    </Modal>
  );
};

export default Upload;
