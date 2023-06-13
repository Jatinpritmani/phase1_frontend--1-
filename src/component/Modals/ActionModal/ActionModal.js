import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import ShareIcon from "../../../assets/svg/Shareiconsmall.svg";
import DeleteIcon from "../../../assets/svg/DeleteIcon.svg";
import EditIcon from "../../../assets/svg/EditIcon.svg";

const ActionModal = ({
  handleDeletePost,
  actionIndex,
  handleEditPost,
  setEditEvent,
  editEvent,
}) => {
  const handleEdit = () => {
    setEditEvent(!editEvent);
  };
  return (
    <>
      <Box
        position={"absolute"}
        sx={{
          height: "144px",
          width: "120px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          // alignItems: "center",
          justifyContent: "center",
        }}
        borderRadius={"10px"}
        bgcolor={"#fff"}
        boxShadow={"0px 5px 20px rgba(0, 0, 0, 0.3)"}
        zIndex={1}
        p={3}
        fontSize={14}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={1}
          onClick={handleEdit} 
        >
          <img src={EditIcon} />
          <Typography>Edit</Typography>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <img src={ShareIcon} />
          <Typography>Share</Typography>
        </Box>

        <Box
          display={"flex"}
          alignItems={"center"}
          gap={1}
          onClick={() => handleDeletePost(actionIndex._id)}
        >
          <img src={DeleteIcon} />
          <Typography>Delete</Typography>
        </Box>
      </Box>
    </>
  );
};

export default ActionModal;
