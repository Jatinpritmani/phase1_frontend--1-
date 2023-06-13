import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SendBtnIcon from "../../assets/svg/SendButtonIcon.svg";
import SearchIcon from "@mui/icons-material/Search";
import UserProfile from "../../assets/svg/userProfile.svg";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HumbergerIcon from "../../assets/svg/humbergerIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  addReaction,
  getPost,
  getReaction,
  getReactionByPost,
  setComment,
  setCommentText,
} from "../../store/slices/feedSlice";
import { Button, Typography } from "@mui/material";
import moment from "moment/moment";
import { useLocation } from "react-router-dom";
import { getEvent } from "../../store/slices/eventSlice";

const drawerWidth = 434;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function RightSidebar({ open, setOpen }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { reactionDatabyPost, commentData, commentText, comment } = useSelector(
    (state) => state.feed
  );
  console.log(pathname, "reactionDatabyPost");
  React.useEffect(() => {
    if (comment) {
      setOpen(true);
    }
  }, [comment]);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    dispatch(setComment(false));
  };
  const handlechangeComment = (e) => {
    console.log(e.target.value, "e.target.value");
    dispatch(setCommentText(e.target.value));
  };
  const handleAddComment = () => {
    let payload = {
      uid: user._id,

      isUpvote: false,
      isDownvote: false,
      comment: commentText,
    };
    if (pathname === "/feed") {
      payload.pid = commentData._id;
      payload.isEvent = false;
    }
    if (pathname === "/event") {
      payload.eid = commentData._id;
      payload.isEvent = true;
    }
    dispatch(addReaction(payload))
      .unwrap()
      .then(() => {
        if (pathname === "/feed") {
          dispatch(getPost());
        }
        if (pathname === "/event") {
          dispatch(getEvent());
        }
        dispatch(getReactionByPost(commentData?._id));
        dispatch(setCommentText(""));
      });
  };
  const SearchButton = () => (
    <IconButton>
      <SearchIcon />
    </IconButton>
  );
  return (
    <Box
      position={"absolute"}
      sx={{ top: 0, right: 0, pr: 8, pt: 4, pl: 4, borderRadius: 15 }}
    >
      <IconButton
        // color="inherit"
        // aria-label="open drawer"
        edge="end"
        onClick={handleDrawerOpen}
        sx={{ ...(open && { display: "none" }) }}
      >
        <img src={HumbergerIcon} style={{ height: "60px" }} />
      </IconButton>

      <Drawer
        sx={{
          ...(!open && { display: "none" }),
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            borderTopLeftRadius: 32,
            borderBottomLeftRadius: 32,
            backgroundColor: "#1E1F20",
            p: 2,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant={"h5"} color={"white"}>
            {reactionDatabyPost?.reaction && comment && (
              <Typography variant={"h5"} color={"white"}>
                Comments (
                {
                  reactionDatabyPost?.reaction?.filter(
                    (item) => item?.comment !== ""
                  )?.length
                }
                )
              </Typography>
            )}
          </Typography>
          <IconButton
            onClick={handleDrawerClose}
            sx={{ backgroundColor: "#FFF" }}
            justifyContent={"end"}
          >
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          height={"100%"}
        >
          {" "}
          {!comment && (
            <Box p={3}>
              <Box display={"flex"} alignItems={"center"} gap={2}>
                <img src={user.avatarName || UserProfile} />
                <Typography variant={"h5"} color={"white"}>
                  {user.name}
                </Typography>
              </Box>
              <Box mt={4}>
                <Typography color={"white"}>About</Typography>
                <Typography color={"white"}>
                  Travel, Adventure & Lifestyle Photographer & Digital
                  Influencer Nikon Ambassador Let's Work: ed.ford@mail.com
                </Typography>
              </Box>
            </Box>
          )}
          <Box>
            {comment &&
              reactionDatabyPost?.reaction
                ?.filter((item) => item?.comment !== "")
                ?.map((data) => {
                  return (
                    <Box color={"white"} height={"auto"} width={"100%"} p={2}>
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        pb={1}
                      >
                        <Box
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          gap={2}
                        >
                          <img src={data?.uid?.avatarName || UserProfile} />
                          {data?.uid?.name}
                        </Box>
                        <Box>
                          {moment(data.createdAt).startOf("hour").fromNow()}
                        </Box>
                      </Box>
                      <Box display={"flex"} alignItems={"center"}>
                        {data.comment}
                      </Box>
                    </Box>
                  );
                })}
          </Box>
          {reactionDatabyPost?.reaction && comment && (
            <Box>
              <TextField
                // label="TextField"
                placeholder="Write a comment..."
                sx={{
                  border: "1px solid white",
                  width: "100%",
                  backgroundColor: "#fff",
                }}
                value={commentText ? commentText : ""}
                onChange={(e) => handlechangeComment(e)}
                InputProps={{
                  style: {
                    color: "#8F92A1",
                  },
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleAddComment()}
                    >
                      <img src={SendBtnIcon} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          )}
        </Box>
      </Drawer>
    </Box>
  );
}
