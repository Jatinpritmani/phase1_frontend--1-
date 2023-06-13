import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";
import RightSidebar from "./RightSidebar";
import Header from "./Header";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const { comment, commentData } = useSelector((state) => state.feed);
  console.log(commentData, "commentData");
  useEffect(() => {
    setOpen(comment);
  }, [comment]);
  return (
    <>
      <Box display={"flex"}>
        <Sidebar />
        <Box
          p={4}
          width={"100%"}
          bgcolor={"#f7f7f7"}
          sx={{
            marginLeft: "165px",
            ...(open ? { paddingRight: "464px" } : { paddingRight: "130px" }),
          }}
          height={"100vh"}
        >
          <Header />
          <Box py={4}>{children}</Box>
        </Box>
        <RightSidebar open={open} setOpen={setOpen} />
      </Box>
    </>
  );
};

export default Layout;
