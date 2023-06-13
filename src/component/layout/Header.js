import { InputBase, Paper } from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  return (
    <>
      <Paper
        fullWidth
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#FFF",
          borderRadius: "10px",
        }}
      >
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, height: "58px", flex: 1 }}
          placeholder="Search In Social ..."
          inputProps={{ "aria-label": "search google maps" }}
        />
      </Paper>
    </>
  );
};

export default Header;
