import { Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { useDeleteTagMutation } from "../../../../RTKQuery/TagsService/tagsApi";
import DeleteModal from "../../../../components/DeleteModal/DeleteModal";

const ActionButtons = ({ data, setTagEditModal, setTag }) => {
  const [disabled, setDisabled] = useState(null);
  const [deleteTag] = useDeleteTagMutation();
  const [tagDeleteModal, setTagDeleteModal] = useState(false);

  const handleEdit = () => {
    setTagEditModal(true);
    setTag(data);
  };

  const handleDelete = async () => {
    setTagDeleteModal(true);
    try {
      await deleteTag(data.id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data.uploadedFiles > 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [setDisabled, data.uploadedFiles]);
  return (
    <Box>
      <IconButton onClick={handleEdit}>
        <BorderColorOutlinedIcon />
      </IconButton>
      <IconButton disabled={disabled} onClick={() => setTagDeleteModal(true)}>
        <DeleteOutlineOutlinedIcon color={disabled ? "disabled" : ""} />
      </IconButton>
      <DeleteModal
        open={tagDeleteModal}
        setOpen={setTagDeleteModal}
        name={data.name}
        type={"Tag"}
        handleDelete={handleDelete}
      />
    </Box>
  );
};

export default ActionButtons;
