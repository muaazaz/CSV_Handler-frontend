import { IconButton } from "@mui/material";
import React from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useNavigate } from "react-router-dom";

const ActionButton = ({ data }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/csv/details/${data.id}`);
  };
  return (
    <IconButton onClick={handleClick}>
      <VisibilityOutlinedIcon />
    </IconButton>
  );
};

export default ActionButton;
