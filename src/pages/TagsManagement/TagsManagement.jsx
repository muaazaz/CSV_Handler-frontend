import React, { useState } from "react";
import CustomTable from "../../components/CustomTable/CustomTable";
import { Box, Button, Container, Typography } from "@mui/material";
import { buttonsDiv, headerDiv, mainDiv } from "./styles";
import AddIcon from "@mui/icons-material/Add";
import TagModal from "./components/TagModal/TagModal";
import { tagsTableHeader } from "../../constants/componentConstants";
import { useGetTagsQuery } from "../../RTKQuery/TagsService/tagsApi";
import ActionButtons from "./components/ActionButtons/ActionButtons";
import Loader from "../../components/Loader/Loader";

const TagsManagement = () => {
  const [tagCreateModal, setTagCreateModal] = useState(false);
  const [tagEditModal, setTagEditModal] = useState(false);
  const [tag, setTag] = useState(null);
  const { data, isLoading } = useGetTagsQuery();

  return (
    <Container sx={mainDiv}>
      <Box sx={headerDiv}>
        <Typography sx={{ fontSize: "1.438rem", fontWeight: "600" }}>
          Tags Management
        </Typography>
        <Box sx={buttonsDiv}>
          <Button
            startIcon={<AddIcon />}
            color="secondary"
            variant="contained"
            sx={{ color: "#F3F3F3", marginRight: "1rem" }}
            onClick={() => setTagCreateModal(true)}
          >
            Create Tags
          </Button>
        </Box>
      </Box>
      <TagModal open={tagCreateModal} setOpen={setTagCreateModal} />
      <TagModal open={tagEditModal} setOpen={setTagEditModal} tag={tag} />
      {!isLoading ? (
        <CustomTable
          label={tagsTableHeader}
          data={data}
          action={
            <ActionButtons setTagEditModal={setTagEditModal} setTag={setTag} />
          }
          view
        />
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default TagsManagement;
