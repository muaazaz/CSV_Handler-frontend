import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  bottomContainer,
  checkboxStyles,
  divider,
  headerContainer,
  mainContainer,
  selectedContainer,
  tagHeaderStyle,
  tagInfoStyles,
  tagNameStyles,
  tagsContainer,
  textStyles,
} from "./styles";
import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
import { useGetTagsQuery } from "../../../../RTKQuery/TagsService/tagsApi";
import { useCreateComparisonMutation } from "../../../../RTKQuery/ComparisonService/ComparisonApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGlobalData } from "../../../../RTKQuery/globalSlice";

const CompareModal = ({ open, setOpen }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [createComparison] = useCreateComparisonMutation();
  const navigate = useNavigate();
  const { data } = useGetTagsQuery("compareTags", {
    skip: !open, // Skip the query if the modal is not open
  });
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e, value, tag) => {
    if (value) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      const filterSelected = selectedTags.filter(
        (tag) => tag.id !== +e.target.value
      );
      setSelectedTags(filterSelected);
    }
  };

  const handleCompare = async () => {
    try {
      const resp = await createComparison({ tags: selectedTags });
      dispatch(setGlobalData({ navTab: "report" }));
      navigate(`/report/details/${resp.data.id}`);
      setSelectedTags([]);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      open={open}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box sx={mainContainer}>
        <Box sx={headerContainer}>
          <Typography sx={textStyles}>Compare Tags</Typography>
          <IconButton onClick={handleClose}>
            <HighlightOffIcon />
          </IconButton>
        </Box>
        <Divider sx={divider} />
        <Box sx={tagsContainer} onClick={() => {}}>
          <Typography sx={tagHeaderStyle}>Tags</Typography>
          <Box sx={{ display: "flex" }}>
            {data &&
              data.map((tag, index) => (
                <FormControlLabel
                  key={tag.id + index}
                  label={tag.name}
                  sx={{ marginLeft: `${index === 0 ? "0" : "1.5rem"}` }}
                  control={
                    <Checkbox
                      key={tag.id}
                      value={tag.id}
                      onChange={(e, val) => handleChange(e, val, tag)}
                      checkedIcon={<SquareRoundedIcon sx={checkboxStyles} />}
                      disableRipple
                    />
                  }
                />
              ))}
          </Box>
        </Box>
        {selectedTags.length > 0 && (
          <Box>
            <Typography sx={{ ...tagHeaderStyle, margin: "1rem 0rem" }}>
              Selected Files
            </Typography>
            {selectedTags.map((tag, index) => (
              <Box sx={selectedContainer} key={tag.name + index}>
                <Typography sx={tagNameStyles}>{tag.name}</Typography>
                <Typography sx={tagInfoStyles}>
                  <Typography variant={"caption"} sx={{ color: "#5184EC" }}>
                    {tag.uploadedFiles}
                  </Typography>
                  files selected for comparing
                </Typography>
              </Box>
            ))}
          </Box>
        )}
        <Divider sx={divider} />
        <Box sx={bottomContainer}>
          <Button color="info" variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCompare}
            sx={{ marginLeft: "1.5rem" }}
          >
            Start Comparing
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CompareModal;
