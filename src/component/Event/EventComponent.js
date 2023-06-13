import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  InputBase,
  Paper,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
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
import FirstImage from "../../assets/svg/FirstImage.svg";
import UpVoteIcon from "../../assets/svg/upVote.svg";
import DownVoteIcon from "../../assets/svg/downVote.svg";
import CommentIcon from "../../assets/svg/comment.svg";
import ShareIcon from "../../assets/svg/shareicon.svg";
import ActionIcon from "../../assets/svg/ActionIcon.svg";
import redDownVote from "../../assets/svg/redDownVote.svg";
import greenUpVote from "../../assets/svg/greenUpvote.svg";
import {
  deleteEvent,
  getEvent,
  updateEvent,
} from "../../store/slices/eventSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import ActionModal from "../Modals/ActionModal/ActionModal";
import DeleteIcon from "../../assets/svg/DeleteIcon.svg";
import EditIcon from "../../assets/svg/EditIcon.svg";
import CalendarModal from "../Modals/CalendarModal/CalendarModal";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CloseIcon from "@mui/icons-material/Close";
import useOnClickOutside from "../Hooks/useOnClickOutside";

const EventComponent = () => {
  const dispatch = useDispatch();
  const actionref = useRef(null);

  const { commentText, comment, reactionData } = useSelector(
    (state) => state.feed
  );
  const { event } = useSelector((state) => state.event);
  const { user } = useSelector((state) => state.auth);
  const [idEdit, setIsEdit] = useState(false);
  const [editIcon, setEditIcon] = useState(false);
  const [value, onChange] = useState();
  const [actionIndex, setActionIndex] = useState(null);
  const [editData, setEditData] = useState(null);
  const [isEditData, setIsEditData] = useState(false);
  const [isCalendarModal, setIsCalendarModal] = useState(false);
  const [calendatIndex, setCalendatIndex] = useState(null);
  const [isShareModal, setIsShareModal] = useState(false);

  useEffect(() => {
    handleGetEvent();
    handleGetReaction();
  }, []);
  // useOnClickOutside(calendarref, () => setIsCalendarModal(false));
  // useOnClickOutside(actionref, () => setActionIndex({}));
  const handleGetEvent = (eventFilter) => {
    dispatch(getEvent(eventFilter));
  };
  const handleDeleteEvent = (id) => {
    setEditIcon(!editIcon);
    dispatch(deleteEvent(id))
      .unwrap()
      .then(() => {
        handleGetEvent();
      });
  };
  const handleEdit = (data) => {
    setIsEditData(true);
    setEditData(data);
    // setEditIcon(false);
  };
  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (date) => {
    const body = {
      text: editData?.text,
      name: editData?.name,
      date: date,
    };
    const id = editData._id;
    dispatch(updateEvent({ id, body }))
      .unwrap()
      .then(() => {
        handleGetEvent();
        setEditData({});
        setIsEditData(false);
      });
  };
  const handleAddReaction = (item, type, value) => {
    let payload = {
      uid: user._id,
      eid: item._id,
      isEvent: true,
      comment: "",
      isUpvote: type === "isUpvote" ? true : false,
      isDownvote: type === "isDownvote" ? true : false,
    };
    // if (type === "isUpvote") {
    //   payload.isUpvote = value;
    // }

    //   payload.isDownvote = value;
    // }
    if (type === "comment") {
      payload.comment = commentText;
    }
    if (value) {
      dispatch(updateReaction({ id: item._id, body: payload }));
    }
    dispatch(addReaction(payload))
      .unwrap()
      .then(() => {
        handleGetEvent();
        handleGetReaction();
      });
  };
  const handleGetReaction = (item) => {
    dispatch(getReaction({ uid: user._id, type: "event" }));
  };

  return (
    <Box>
      <Box mt={3}>
        <Box>
          <Typography variant="h3" component="h3" fontWeight={700}>
            Events
          </Typography>
        </Box>
        <Box display={"flex"} gap={4} mt={3}>
          <Typography
            fontWeight={700}
            onClick={() => handleGetEvent()}
            sx={{ cursor: "pointer" }}
          >
            Anytime
          </Typography>
          <Typography
            fontWeight={700}
            onClick={() => handleGetEvent("thisWeek")}
            sx={{ cursor: "pointer" }}
          >
            This Week
          </Typography>
          <Typography
            fontWeight={700}
            onClick={() => handleGetEvent("thisMonth")}
            sx={{ cursor: "pointer" }}
          >
            This Month
          </Typography>
        </Box>
      </Box>
      <Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {event?.event?.map((item, index) => {
            console.log(item, "itemitem", reactionData);
            let isUpvoteUser = reactionData?.data?.find(
              (data) => data?.eid === item?._id && data?.isUpvote === true
            )?.isUpvote;
            let isDownvoteUser = reactionData?.data?.find(
              (data) => data?.eid === item?._id && data?.isDownvote === true
            )?.isDownvote;
            console.log(isUpvoteUser, "isUpvoteUser");
            return (
              <Grid item xs={6}>
                <Paper
                  sx={{
                    height: "auto",
                    borderRadius: "10px",
                    mt: 3,
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {/* <Box height={"180px"} width={"100%"}>
                    <img
                      src={FirstImage}
                      style={{ width: "100%", height: "180px" }}
                    />
                  </Box> */}
                  <Box>
                    <Box
                      sx={{
                        display: "flex",

                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 2,
                          py: 2,
                        }}
                      >
                        <Box
                          sx={{
                            height: "48px",
                            width: "48px",
                            border: "3px solid rgba(143,146,161,0.2)",
                            borderRadius: "15px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="h5"
                            component="h5"
                            fontWeight={700}
                          >
                            {moment(item?.date).format("DD")}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography fontSize={14}>
                            {moment(item?.date).format("dddd")}
                          </Typography>
                          <Typography fontSize={12} color={"#8F92A1"}>
                            {moment(item?.date).format("MMMM") +
                              ", " +
                              moment(item?.date).format("YYYY")}
                          </Typography>
                        </Box>
                        {isEditData && actionIndex?._id === item?._id && (
                          <Box>
                            <img
                              src={EditIcon}
                              onClick={() => {
                                setCalendatIndex(index);
                                setIsCalendarModal(!isCalendarModal);
                                setEditData(item);
                              }}
                            />
                            {isCalendarModal && calendatIndex === index && (
                              <CalendarModal
                                value={value}
                                onChange={onChange}
                                isCalendarModal={isCalendarModal}
                                setIsCalendarModal={setIsCalendarModal}
                                handleSubmit={handleSubmit}
                              />
                            )}
                          </Box>
                        )}
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setActionIndex(item);
                          setEditIcon(true);
                        }}
                      >
                        <img src={ActionIcon} />
                        {editIcon && actionIndex?._id === item?._id && (
                          <Box>
                            <Box
                              position={"absolute"}
                              // ref={actionref}
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
                                  onClick={() => {
                                    handleEdit(item);
                                    setEditIcon(false);
                                  }}
                                >
                                  <img src={EditIcon} />
                                  <Typography>Edit</Typography>
                                </Box>
                              )}
                              <Box
                                display={"flex"}
                                alignItems={"center"}
                                gap={1}
                              >
                                <img src={ShareIcon} />
                                <Typography
                                  data-tooltip-id="my-tooltip"
                                  data-tooltip-content={"tooltip"}
                                  onClick={(e) => {
                                    setIsShareModal(true);
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
                                    boxShadow={
                                      "0px 5px 20px rgba(0, 0, 0, 0.3)"
                                    }
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
                                        setIsShareModal(false);
                                      }}
                                    >
                                      <CloseIcon />
                                    </Box>
                                    <Typography variant={"h5"}>
                                      Share this post
                                    </Typography>
                                    <Typography>
                                      If you like this article share it with
                                      your friends.
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
                                  onClick={() =>
                                    handleDeleteEvent(actionIndex._id)
                                  }
                                >
                                  <img src={DeleteIcon} />
                                  <Typography>Delete</Typography>
                                </Box>
                              )}
                            </Box>
                            {/* // <ActionModal
                            //   handleDeletePost={handleDeleteEvent}
                            //   actionIndex={actionIndex}
                            // /> */}
                          </Box>
                        )}
                      </Box>
                    </Box>
                    <Box width={"90%"}>
                      <Typography
                        color={"#1E1F20"}
                        variant="h5"
                        component="h5"
                        fontWeight={700}
                      >
                        {isEditData && editData._id === item._id ? (
                          <>
                            <InputBase
                              value={editData.name}
                              name="name"
                              onChange={(e) => handleEditChange(e)}
                            />
                          </>
                        ) : (
                          item.name
                        )}
                      </Typography>

                      <Typography fontSize={14} color={"#8F92A1"}>
                        {isEditData && editData._id === item._id ? (
                          <>
                            <InputBase
                              value={editData.text}
                              name="text"
                              onChange={(e) => handleEditChange(e)}
                            />
                          </>
                        ) : (
                          item.text
                        )}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        pt: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
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
                            handleAddReaction(
                              item,
                              "isDownvote",
                              !item?.downvote
                            );
                          }}
                        >
                          <img
                            src={isDownvoteUser ? redDownVote : DownVoteIcon}
                          />
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
                            dispatch(getReactionByPost(item?._id));
                            // setCommentModal(!commentModal);
                          }}
                        >
                          <img src={CommentIcon} />
                          <Typography>{item?.comment}</Typography>
                        </Box>
                      </Box>
                      {editData?._id === item?._id && isEditData && (
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
                              setEditData(null);
                              setIsEditData(false);
                            }}
                          >
                            Cancle
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
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default EventComponent;
