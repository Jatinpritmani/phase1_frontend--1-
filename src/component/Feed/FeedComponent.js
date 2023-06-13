import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import UserProfile from "../../assets/svg/userProfile.svg";
import ActioIcon from "../../assets/svg/ActionIcon.svg";
import CameraIcon from "../../assets/svg/cameraIcon.svg";
import CalenDarIcon from "../../assets/svg/calendarIconsmall.svg";
import VideoIcon from "../../assets/svg/videoIcon.svg";
import UpVoteIcon from "../../assets/svg/upVote.svg";
import DownVoteIcon from "../../assets/svg/downVote.svg";
import CommentIcon from "../../assets/svg/comment.svg";
import FirstImage from "../../assets/svg/FirstImage.svg";
import ActionModal from "../Modals/ActionModal/ActionModal";
import { useEffect, useRef, useState, commentText } from "react";
import CalendarModal from "../Modals/CalendarModal/CalendarModal";
import useOnClickOutside from "../Hooks/useOnClickOutside";
import { useDispatch, useSelector } from "react-redux";
import {
  addPost,
  addReaction,
  deletePost,
  getPost,
  getReaction,
  getReactionByPost,
  setComment,
  setCommentData,
  updateReaction,
} from "../../store/slices/feedSlice";
import { addEvent } from "../../store/slices/eventSlice";
import ShareIcon from "../../assets/svg/Shareiconsmall.svg";
import DeleteIcon from "../../assets/svg/DeleteIcon.svg";
import redDownVote from "../../assets/svg/redDownVote.svg";
import greenUpVote from "../../assets/svg/greenUpvote.svg";
import EditIcon from "../../assets/svg/EditIcon.svg";
import { updatePost } from "../../store/slices/feedSlice";
import Avatar from "react-avatar";
import moment from "moment";
import { Tooltip } from "react-tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CloseIcon from "@mui/icons-material/Close";

const FeedComponent = () => {
  const dispatch = useDispatch();
  const { post, comment, reactionData } = useSelector((state) => state.feed);
  const { user } = useSelector((state) => state.auth);
  const [value, onChange] = useState();
  console.log("statestate", post);
  const [editIcon, setEditIcon] = useState(false);
  const [editEvent, setEditEvent] = useState(false);
  const [isCalendarModal, setIsCalendarModal] = useState(false);
  const [actionIndex, setActionIndex] = useState({});
  const [addPostData, setAddPostData] = useState({ uid: user?._id });
  const [isShareModal, setIsShareModal] = useState(false);
  const [editData, setEditData] = useState({});
  const calendarref = useRef(null);
  const actionref = useRef(null);
  useOnClickOutside(calendarref, () => setIsCalendarModal(false));
  useOnClickOutside(actionref, () => setActionIndex({}));

  useEffect(() => {
    handleGetPost();
    handleGetReaction();
  }, []);
  console.log(reactionData, "reactionData");
  const handleGetPost = () => {
    dispatch(getPost());
    console.log("handleGetPost");
  };
  console.log(user, "user._id");
  const handleSubmit = () => {
    console.log(editData, "editDataeditDataeditData");
    if (editEvent) {
      let body = {
        text: editData.text,
        uid: user._id,
      };
      let id = editData._id;
      console.log(id, body, editData, "addPostData");
      dispatch(updatePost({ id, body }))
        .unwrap()
        .then(() => {
          setAddPostData({ uid: user._id });
          handleGetPost();
          onChange("");
          setEditData({});
          setEditEvent(false);
        });
    }

    if (value && !editEvent && editData !== {}) {
      let payload = {
        ...addPostData,
        date: value,
        text: addPostData.text,
        uid: user._id,
      };
      dispatch(addEvent(payload))
        .unwrap()
        .then(() => {
          setAddPostData({ uid: user._id });
          // handleGetPost();
          onChange("");
          // window.location.reload();
        });
    } else if (!editEvent && editData) {
      let payload = {
        text: addPostData.text,
        uid: user._id,
      };
      dispatch(addPost(payload))
        .unwrap()
        .then(() => {
          setAddPostData({ uid: user._id });
          handleGetPost();
          // window.location.reload();
        });
    }
    setAddPostData({ uid: user._id });
    // handleGetPost();
    onChange("");
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      const files = Array.from(e?.target?.files);

      setAddPostData({ ...addPostData, [name]: files });
    } else {
      setAddPostData({ ...addPostData, [name]: value });
    }
  };
  const handleEditOnChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };
  const handleDeletePost = (id) => {
    console.log(id, "idididid");
    setEditIcon(!editIcon);
    dispatch(deletePost(id))
      .unwrap()
      .then(() => {
        handleGetPost();
      });
  };

  const handleAddReaction = (item, type, value) => {
    let payload = {
      uid: user._id,
      pid: item._id,
      isEvent: false,
      comment: "",
      isUpvote: type === "isUpvote" ? true : false,
      isDownvote: type === "isDown" ? true : false,
    };
    // if (type === "isUpvote") {
    //   payload.isUpvote = value;
    // }
    // if (type === "isDown") {
    //   payload.isDownvote = value;
    // }
    // if (type === "comment") {
    //   payload.comment = commentText;
    // }
    if (value) {
      dispatch(updateReaction({ id: item._id, body: payload }));
    }
    dispatch(addReaction(payload))
      .unwrap()
      .then(() => {
        handleGetPost();
        handleGetReaction();
      });
    // window.location.reload();
    console.log(addPost, "addPost");
  };

  const handleEditPost = () => {
    console.log(actionIndex, "itemitemitem");
    setEditEvent(true);
    setAddPostData({ ...addPostData, actionIndex });
  };

  // show remaining time as per current date - updatedAt in post item map
  const showRemainingTime = (date) => {
    let currentDate = moment(new Date());
    let postDate = moment(date);
    let diff = currentDate.diff(postDate, "hours");
    if (diff < 24 && diff > 0) {
      return `${diff} hours ago`;
    } else if (diff < 1) {
      return `Just Now`;
    } else {
      diff = currentDate.diff(postDate, "days");
      if (diff < 7) {
        return `${diff} days ago`;
      } else {
        diff = currentDate.diff(postDate, "weeks");
        if (diff < 4) {
          return `${diff} weeks ago`;
        } else {
          diff = currentDate.diff(postDate, "months");
          if (diff < 12) {
            return `${diff} months ago`;
          } else {
            diff = currentDate.diff(postDate, "years");
            return `${diff} years ago`;
          }
        }
      }
    }
  };
  console.log(addPostData, "addPostData");
  const handleGetReaction = (item) => {
    dispatch(getReaction({ uid: user?._id, type: "post" }));
  };
  return (
    <>
      <Paper
        sx={{
          height: "auto",
          borderRadius: "10px",

          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            // justifyContent: "space-between",
            alignItems: "start",

            gap: 2,
            // p: 1,
            my: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <img
            src={user?.avatarName || UserProfile}
            style={{ borderRadius: "6px", top: "5px" }}
          />
          {value && (
            <Box
              display={value ? "flex" : "none"}
              sx={{
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                // p: 1,
                // m: 1,
                bgcolor: "background.paper",
                borderRadius: 1,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  // justifyContent: "space-between",
                  alignItems: "center",
                  bgcolor: "background.paper",
                  gap: 2,
                  width: "100%",
                }}
              >
                <Box ref={calendarref}>
                  <Box
                    alignItems={"center"}
                    bgcolor={"#F7F7F7"}
                    px={1}
                    borderRadius={3}
                    color={"#8F92A1"}
                    sx={{ cursor: "pointer" }}
                    display={value ? "flex" : "none"}
                    onClick={() => setIsCalendarModal(!isCalendarModal)}
                  >
                    <img src={CalenDarIcon} />
                    {value ? moment(value).format("L") : "Create Event"}
                  </Box>
                  {isCalendarModal && (
                    <CalendarModal
                      value={value}
                      onChange={onChange}
                      isCalendarModal={isCalendarModal}
                      setIsCalendarModal={setIsCalendarModal}
                    />
                  )}
                </Box>
                <TextField
                  display={value ? "flex" : "none"}
                  placeholder="Enter the title here"
                  sx={{
                    backgroundColor: "#F7F7F7",
                    // p: 2,
                    borderRadius: "6px",
                    flex: 1,
                  }}
                  name="name"
                  onChange={handleOnChange}
                  value={addPostData?.name ? addPostData?.name : ""}
                />
              </Box>

              <Box width={"100%"}>
                <TextField
                  placeholder="What are you thinking?"
                  inputProps={{ "aria-label": "What are you thinking?" }}
                  name="text"
                  onChange={handleOnChange}
                  value={addPostData?.text ? addPostData?.text : ""}
                  sx={{
                    width: "100%",
                    backgroundColor: "#F7F7F7",
                    // p: 3,
                    // borderRadius: "6px",
                    border: "none",
                    outline: "none",
                    // flex: 1,
                    // height: "70px",
                  }}
                />
              </Box>
            </Box>
          )}
          {!value && (
            <TextField
              display={value ? "none" : "flex"}
              sx={{
                width: "100%",
                backgroundColor: "#F7F7F7",
                // p: 3,
                borderRadius: "6px",
                flex: 1,
                // height: "70px",
              }}
              placeholder="What are you thinking?"
              inputProps={{ "aria-label": "What are you thinking?" }}
              name="text"
              onChange={handleOnChange}
              value={addPostData?.text ? addPostData?.text : ""}
            />
          )}
          {/* <Box>
            <Button>
              <img src={ActioIcon} />
            </Button>
          </Box> */}
        </Box>
        {/* <Box>
          {console.log(addPostData, "addPostData?.image")}
          {addPostData?.image && (
            <Box>
              {addPostData?.image?.map((item) => {
                return <img src={URL.createObjectURL(item)} />;
              })}
            </Box>
          )}
        </Box> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            {/* <Box
              display={"flex"}
              alignItems={"center"}
              bgcolor={"#F7F7F7"}
              px={1}
              borderRadius={3}
              color={"#8F92A1"}
              sx={{ cursor: "pointer" }}
            > */}
            {/* <Box
                variant="contained"
                component="label"
                display={"flex"}
                alignItems={"center"}
              >
                <img src={CameraIcon} />
                Photo
                <input
                  type="file"
                  hidden
                  name="image"
                  onChange={handleOnChange}
                  multiple
                />
              </Box>
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              bgcolor={"#F7F7F7"}
              px={1}
              borderRadius={3}
              color={"#8F92A1"}
              sx={{ cursor: "pointer" }}
            >
              <img src={VideoIcon} />
              Video
            </Box> */}
            <Box ref={calendarref} display={value ? "none" : "flex"}>
              <Box
                alignItems={"center"}
                bgcolor={"#F7F7F7"}
                px={1}
                display={"flex"}
                borderRadius={3}
                color={"#8F92A1"}
                sx={{ cursor: "pointer" }}
                onClick={() => setIsCalendarModal(!isCalendarModal)}
              >
                <img src={CalenDarIcon} />
                {value ? moment(value).format("L") : "Create Event"}
              </Box>
              {isCalendarModal && (
                <CalendarModal
                  value={value}
                  onChange={onChange}
                  isCalendarModal={isCalendarModal}
                  setIsCalendarModal={setIsCalendarModal}
                />
              )}
            </Box>
          </Box>
          <Box display={"flex"} gap={2}>
            {value && (
              <Button
                type="submit"
                variant="contained"
                sx={{
                  height: "40px",
                  backgroundColor: "#E57C23",
                  borderRadius: "8px",
                  fontSize: "14px",
                  ":hover": {
                    bgcolor: "white",
                    color: "black",
                  },
                }}
                onClick={() => onChange("")}
              >
                Cancle
              </Button>
            )}
            <Button
              type="submit"
              variant="contained"
              sx={{
                height: "40px",
                backgroundColor: "#E57C23",
                borderRadius: "8px",
                fontSize: "14px",
                ":hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
              onClick={handleSubmit}
            >
              Share
            </Button>
          </Box>
        </Box>
      </Paper>

      {post?.post?.map((item, index) => {
        console.log(item, "itemitem", reactionData);
        let isUpvoteUser = reactionData?.data?.find(
          (data) => data?.pid === item?._id && data?.isUpvote === true
        )?.isUpvote;
        let isDownvoteUser = reactionData?.data?.find(
          (data) => data?.pid === item?._id && data?.isDownvote === true
        )?.isDownvote;
        console.log(isUpvoteUser, "isUpvoteUser");
        return (
          <Paper
            sx={{
              height: "auto",
              borderRadius: "10px",
              mt: 4,
              p: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                  // p: 1,
                  // m: 1,
                  bgcolor: "background.paper",
                  borderRadius: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  {/* <Box width={50}>
                    <img src={item?.uid?.avatarName || UserProfile} />
                  </Box> */}

                  <Avatar
                    size={38}
                    alt={item?.uid?.name}
                    src={item?.uid?.avatarName || UserProfile}
                  ></Avatar>

                  <Box>
                    <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                      {item?.uid?.name}
                    </Typography>
                    <Typography sx={{ fontSize: "12px", color: "#8F92A1" }}>
                      {showRemainingTime(item?.updatedAt)}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Button
                    sx={{ width: "100%", height: "40px" }}
                    onClick={() => {
                      setActionIndex(item);
                      setEditIcon(true);
                    }}
                  >
                    <img src={ActioIcon} />
                  </Button>
                  <Box>
                    {editIcon && actionIndex?._id === item?._id && (
                      <Box
                        ref={actionref}
                        position={"absolute"}
                        sx={{
                          height: "auto",
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
                        {item?.uid?._id === user?._id && (
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            gap={1}
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log("item", item);
                              setEditData(item);
                              setEditEvent(!editEvent);
                              setEditIcon(!editIcon);
                            }}
                            sx={{ cursor: "pointer" }}
                          >
                            <img src={EditIcon} />
                            <Typography>Edit</Typography>
                          </Box>
                        )}
                        <Box display={"flex"} alignItems={"center"} gap={1}>
                          <img src={ShareIcon} />
                          <Typography
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content={"tooltip"}
                            onClick={(e) => {
                              setIsShareModal(!isShareModal);
                            }}
                            sx={{ cursor: "pointer" }}
                          >
                            Share
                          </Typography>
                          {isShareModal && (
                            <Box
                              position={"absolute"}
                              height={"auto"}
                              width={"464px"}
                              sx={{ bgcolor: "background.paper" }}
                              boxShadow={"0px 5px 20px rgba(0, 0, 0, 0.3)"}
                              // right={-40}
                              left={-500}
                              p={4}
                              borderRadius={2}
                            >
                              <Box
                                position={"absolute"}
                                top={5}
                                right={5}
                                onClick={(e) => {
                                  setIsShareModal(!isShareModal);
                                }}
                              >
                                <CloseIcon />
                              </Box>
                              <Typography variant={"h5"}>
                                Share this post
                              </Typography>
                              <Typography>
                                If you like this article share it with your
                                friends.
                              </Typography>

                              <TextField
                                // label="TextField"
                                placeholder="Write a comment..."
                                sx={{
                                  border: "1px solid white",
                                  width: "100%",
                                  backgroundColor: "#fff",
                                }}
                                value={`http://localhost:3000/post?pid=${item?._id}`}
                                // onChange={(e) => handlechangeComment(e)}
                                InputProps={{
                                  style: {
                                    color: "#8F92A1",
                                  },
                                  endAdornment: (
                                    <InputAdornment
                                      position="end"
                                      sx={{ cursor: "pointer" }}
                                      onClick={() =>
                                        navigator.clipboard.writeText(
                                          `http://localhost:3000/post?pid=${item?._id}`
                                        )
                                      }
                                    >
                                      <ContentCopyIcon />
                                      {/* <img src={SendBtnIcon} /> */}
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Box>
                          )}
                        </Box>

                        {item?.uid?._id === user?._id && (
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            gap={1}
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log("hhhhhhhhhhhhhhhhhhhh");
                              handleDeletePost(item._id);
                            }}
                            sx={{ cursor: "pointer" }}
                          >
                            <img src={DeleteIcon} />
                            <Typography>Delete</Typography>
                          </Box>
                        )}
                      </Box>
                      // <ActionModal
                      //   handleDeletePost={handleDeletePost}
                      //   actionIndex={actionIndex}
                      //   handleEditPost={handleEditPost}
                      //   setEditEvent={setEditEvent}
                      //   editEvent={editEvent}
                      // />
                    )}
                  </Box>
                </Box>
              </Box>

              <Box>
                <Box py={2}>
                  {console.log(
                    actionIndex,
                    item,
                    editEvent,
                    "actionIndex?._id === item?._id && editEvent"
                  )}
                  {editData._id === item._id && editEvent ? (
                    <InputBase
                      value={editData?.text}
                      name="text"
                      onChange={handleEditOnChange}
                      sx={{
                        border: "1px solid black",
                        borderRadius: "8px",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  ) : (
                    <Typography>{item?.text}</Typography>
                  )}
                </Box>
                {/* <Box
                  py={2}
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={6}>
                      <img
                        src={FirstImage}
                        style={{ height: "100%", width: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      >
                        <Grid item xs={6}>
                          <img
                            src={FirstImage}
                            style={{ height: "100%", width: "100%" }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <img
                            src={FirstImage}
                            style={{ height: "100%", width: "100%" }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <img
                            src={FirstImage}
                            style={{ height: "100%", width: "100%" }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <img
                            src={FirstImage}
                            style={{ height: "100%", width: "100%" }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box> */}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                    }}
                    // bgcolor={
                    //   reactionData?.reaction?.find(
                    //     (data) =>
                    //       data?.uid?._id === user?._id &&
                    //       item?._id === data?.pid?._id
                    //   )?.isUpvote
                    //     ? "red"
                    //     : "#8F92A1"
                    // }
                    onClick={() => {
                      handleAddReaction(item, "isUpvote", !item?.upvote);
                    }}
                  >
                    <img src={isUpvoteUser ? greenUpVote : UpVoteIcon} />

                    <Typography>{item?.count}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                    }}
                    // bgcolor={
                    //   reactionData?.reaction?.find(
                    //     (data) =>
                    //       data?.uid?._id === user?._id &&
                    //       item?._id === data?.pid?._id
                    //   )?.isDownvote
                    //     ? "red"
                    //     : "#8F92A1"
                    // }
                    onClick={() => {
                      handleAddReaction(item, "isDown", !item?.downvote);
                    }}
                  >
                    <img src={isDownvoteUser ? redDownVote : DownVoteIcon} />
                    {/* <Typography>{item?.downvote}</Typography> */}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                    }}
                    onClick={() => {
                      dispatch(setComment(true));
                      dispatch(setCommentData(item));
                      dispatch(getReactionByPost(item._id));
                      // setCommentModal(!commentModal);
                    }}
                  >
                    <img src={CommentIcon} />
                    <Typography>{item?.comment}</Typography>
                  </Box>
                </Box>
                {editData._id === item._id && editEvent && (
                  <Box display={"flex"} gap={1}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        height: "40px",
                        backgroundColor: "#E57C23",
                        borderRadius: "8px",
                        fontSize: "14px",
                        ":hover": {
                          bgcolor: "white",
                          color: "black",
                        },
                      }}
                      onClick={() => {
                        setActionIndex(null);
                        setEditEvent(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        height: "40px",
                        backgroundColor: "#E57C23",
                        borderRadius: "8px",
                        fontSize: "14px",
                        ":hover": {
                          bgcolor: "white",
                          color: "black",
                        },
                      }}
                      onClick={handleSubmit}
                    >
                      Update
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
          </Paper>
        );
      })}
    </>
  );
};

export default FeedComponent;
