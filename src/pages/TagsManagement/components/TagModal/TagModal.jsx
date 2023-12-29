import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { divider, headerContainer, mainContainer, textStyles } from "./styles";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import {
  useCreateTagMutation,
  useUpdateTagMutation,
} from "../../../../RTKQuery/TagsService/tagsApi";
import { inputContainer } from "./styles";
import { inputLabel } from "./styles";
import { imageContainer } from "./styles";
import { bottomContainer } from "./styles";

const TagModal = ({ open, setOpen, tag }) => {
  const [formData, setFormData] = useState({ name: "" });
  const [buttonText, setButtonText] = useState("");
  const [buttonColor, setButtonColor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [headerText, setHeaderText] = useState("");
  const [createTag] = useCreateTagMutation();
  const [updateTag] = useUpdateTagMutation();

  const handleClose = () => {
    setOpen(false);
  };
  const handleTagChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setFormData({ name: "" });
      setOpen(false);
      if (tag) {
        await updateTag({ id: tag.id, formData });
      } else {
        await createTag(formData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (tag) {
      setFormData({ name: tag.name });
      setButtonText("Save Changes");
      setButtonColor("primary");
      setBackgroundColor("#D3DEF5");
      setHeaderText("Edit Tag");
    } else {
      setButtonText("Create Tag");
      setButtonColor("secondary");
      setBackgroundColor("#E6EDFB");
      setHeaderText("Create Tag");
    }
  }, [tag]);

  return (
    <Modal
      open={open}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box sx={mainContainer}>
        <Box sx={headerContainer}>
          <Typography sx={textStyles}>{headerText}</Typography>
          <IconButton onClick={handleClose}>
            <HighlightOffIcon />
          </IconButton>
        </Box>
        <Divider sx={divider} />
        <Box sx={{ ...imageContainer, backgroundColor }}>
          <LabelOutlinedIcon
            sx={{ width: "5rem", height: "5rem", color: "#808080" }}
          />
          <Typography sx={textStyles}>{headerText}</Typography>
        </Box>
        <Box sx={inputContainer}>
          <Typography sx={inputLabel}>Name of Tag</Typography>
          <TextField
            placeholder="Enter name of the tag"
            type="text"
            name="tag-name"
            onChange={handleTagChange}
            value={formData.name}
          />
        </Box>
        <Divider sx={divider} />
        <Box sx={bottomContainer}>
          <Button
            color="info"
            variant="contained"
            onClick={handleClose}
            sx={{ marginRight: "1rem" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color={buttonColor}
            onClick={handleSubmit}
            sx={{ color: "white" }}
          >
            {buttonText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TagModal;
