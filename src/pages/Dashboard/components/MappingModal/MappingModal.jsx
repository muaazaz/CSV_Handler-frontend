import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  cancelContainer,
  divider,
  headerContainer,
  mainContainer,
  mapSelectContainer,
  mappingContainer,
  mappingText,
  textStyles,
} from "./styles";
import { tagContainer } from "./styles";
import CustomSelect from "../../../../components/CustomSelect/CustomSelect";
import { useSelector } from "react-redux";
import { fileMappingOptions } from "../../../../constants/componentConstants";
import { useCreateCsvDataMutation } from "../../../../RTKQuery/CsvDataService/csvDataApi";
import { useUpdateFileMutation } from "../../../../RTKQuery/FileService/fileApi";
import { useGetTagsQuery } from "../../../../RTKQuery/TagsService/tagsApi";
import Loader from "../../../../components/Loader/Loader";

const MappingModal = ({ open, setOpen, setUploading, setUploadModal }) => {
  const [tag, setTag] = useState("");
  const [mappedValues, setMappedValues] = useState({});
  const [error, setError] = useState("");
  const [createCsv] = useCreateCsvDataMutation();
  const [updateFile] = useUpdateFileMutation();
  const { data, isLoading, refetch } = useGetTagsQuery();
  const { file, fileHeaders, fileData } = useSelector((state) => state.file);

  const handleClose = () => {
    setOpen(false);
    setUploading(false);
  };

  const handleGoingBack = () => {
    setUploadModal(true);
    setOpen(false);
  };

  const handleCsvSave = async () => {
    setError("");
    if (tag && mappedValues) {
      setUploading(false);
      const newMappedCsv = [];
      fileData.forEach((row) => {
        const newRow = {};
        Object.entries(row).forEach(([key, val]) => {
          if (mappedValues[key]) {
            newRow[mappedValues[key]] = val;
          }
        });
        newMappedCsv.push({ ...newRow, uploadedFile: { id: file.id } });
      });
      let tagId = null;
      let fileNumber = null;
      data?.forEach((element) => {
        if (element.name === tag) {
          tagId = element.id;
          fileNumber = element.uploadedFiles + 1;
        }
      });
      try {
        await updateFile({ id: file.id, formData: { tag: tagId, fileNumber } });
        await createCsv(newMappedCsv);
        setMappedValues({});
        setTag("");
        refetch();
        setOpen(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      setError("Please Map headers and also select a tag for the file.");
    }
  };

  return (
    <Modal
      open={open}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <>
        {!isLoading ? (
          <Box sx={mainContainer}>
            <Box sx={headerContainer}>
              <Typography sx={textStyles}>File Mapping</Typography>
              <IconButton onClick={handleClose}>
                <HighlightOffIcon />
              </IconButton>
            </Box>
            <Divider sx={divider} />
            <Box sx={tagContainer}>
              <Typography sx={textStyles}>
                <img src="document.png" alt="" />
                {file.originalName}
              </Typography>
              <CustomSelect
                value={tag}
                setValue={(val) => setTag(val)}
                placeholder={"Select a File Tag"}
                label={"File Tag"}
                options={data}
              />
            </Box>
            <Divider sx={divider} />
            <Box sx={mappingContainer}>
              <Typography sx={mappingText}>File Mapping</Typography>
              {fileHeaders &&
                fileHeaders?.map((parameter, index) => (
                  <Box sx={mapSelectContainer} key={index + parameter}>
                    <CustomSelect
                      value={parameter}
                      placeholder={"Select a File Tag"}
                      label={`Parameter ${index + 1}`}
                      options={fileHeaders}
                      disabled
                      removeArrow
                    />
                    <CustomSelect
                      value={mappedValues[parameter] || ""}
                      setValue={(val) =>
                        setMappedValues({ ...mappedValues, [parameter]: val })
                      }
                      placeholder={"Select Field Name"}
                      label={"Map To"}
                      options={fileMappingOptions}
                    />
                  </Box>
                ))}
            </Box>
            <Divider sx={divider} />
            <Box sx={cancelContainer}>
              <Button
                color="info"
                variant="contained"
                onClick={handleGoingBack}
              >
                Go Back
              </Button>
              <Box>
                <Button
                  color="info"
                  variant="contained"
                  onClick={handleClose}
                  sx={{ marginRight: "1rem" }}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleCsvSave}
                >
                  Map and Save
                </Button>
              </Box>
            </Box>
            {error && <Alert severity="error">{error}</Alert>}
          </Box>
        ) : (
          <Loader />
        )}
      </>
    </Modal>
  );
};

export default MappingModal;
