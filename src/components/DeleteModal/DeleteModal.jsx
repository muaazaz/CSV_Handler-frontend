import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { divider, headerContainer, mainContainer, textStyles } from "./styles";
import { imageContainer } from "./styles";
import { bottomContainer } from "./styles";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { deleteLabel } from "./styles";
import { deleteContainer } from "./styles";

const DeleteModal = ({ open, setOpen, name, type, handleDelete }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box sx={mainContainer}>
        <Box sx={headerContainer}>
          <Typography sx={textStyles}>Delete {type}</Typography>
          <IconButton onClick={handleClose}>
            <HighlightOffIcon />
          </IconButton>
        </Box>
        <Divider sx={divider} />
        <Box sx={imageContainer}>
          <DeleteOutlineOutlinedIcon
            sx={{ width: "5rem", height: "5rem", color: "#808080" }}
          />
          <Typography sx={textStyles}>Delete {type}</Typography>
        </Box>
        <Box sx={deleteContainer}>
          <Typography sx={deleteLabel}>
            Are you sure you want to delete "{name}" {type}
          </Typography>
        </Box>
        <Divider sx={divider} />
        <Box sx={bottomContainer}>
          <Button
            color="info"
            variant="contained"
            onClick={handleClose}
            sx={{ marginRight: "1rem" }}
          >
            No, Go Back
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            sx={{ color: "white" }}
          >
            Yes, Delete {type}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
