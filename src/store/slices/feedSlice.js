import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ApiDelete,
  ApiGet,
  ApiPost,
  ApiPostNoAuth,
  ApiPut,
  formDataHeader,
} from "../../helpers/API/ApiData";
import { setToken } from "../../helpers/utils/auth.util";
import { getReac } from "react";
const initialState = {
  post: {},
  authLoader: false,
  isLoggedIn: false,
  errorSignIn: false,
  status: "idle",
  error: null,
  comment: false,
  commentData: {},
  commentText: "",
  reactionDatabyPost: {},
  reactionData: {},
};

export const getPost = createAsyncThunk("/post/getPost", async (body) => {
  try {
    const response = await ApiGet(`post/getPost`, body);
    // setToken(response?.data?.data?.token);
    return response;
  } catch (error) {
    return error;
  }
});

export const addPost = createAsyncThunk("/post/addPost", async (body) => {
  try {
    const response = await ApiPost(`post/addPost`, body);
    // setToken(response?.data?.data?.token);
    return response;
  } catch (error) {
    return error;
  }
});

export const updatePost = createAsyncThunk(
  "/post/updatePost",
  async ({ id, body }) => {
    return new Promise((resolve, reject) => {
      ApiPut(`post/updatePost/${id}`, body)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
);

export const deletePost = createAsyncThunk("/post/deletePost", async (body) => {
  return new Promise((resolve, reject) => {
    ApiDelete(`post/deletePost?id=${body}`)
      .then(({ data }) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
});

export const addReaction = createAsyncThunk(
  "/reaction/addReaction",
  async (body) => {
    try {
      const response = await ApiPost(`reaction/addReaction`, body);
      // setToken(response?.data?.data?.token);
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const getReaction = createAsyncThunk(
  "/reaction/getReaction",
  async ({ uid, type }) => {
    try {
      // either pid or eid  is required

      const response = await ApiGet(
        `reaction/getReaction?uid=${uid}&checkVote=${type}`
      );
      // setToken(response?.data?.data?.token);
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const updateReaction = createAsyncThunk(
  "/reaction/updateReaction",
  async ({ id, payload, body }) => {
    try {
      let id = body ? `?pid=${id}` : "";
      const response = await ApiPut(`reaction/updateReaction${id}`, payload);
      // setToken(response?.data?.data?.token);
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const getReactionByPost = createAsyncThunk(
  "/reaction/getReactionByPost",
  async (body) => {
    try {
      let id;
      if (window.location.pathname === "/feed") {
        id = body ? `?pid=${body}` : "";
      } else if (window.location.pathname === "/event") {
        id = body ? `?eid=${body}` : "";
      }
      const response = await ApiGet(`reaction/getReaction${id}`);
      // setToken(response?.data?.data?.token);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getReactionByEvent = createAsyncThunk(
  "/reaction/getReactionByEvent",
  async (body) => {
    try {
      let id = body ? `?eid=${body}` : "";
      const response = await ApiGet(`reaction/getReaction${id}`);
      // setToken(response?.data?.data?.token);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const feedSlice = createSlice({
  name: "feed",
  initialState: initialState,
  reducers: {
    setComment: (state, action) => {
      state.comment = action.payload;
    },
    setCommentData: (state, action) => {
      state.commentData = action.payload;
    },
    setCommentText: (state, action) => {
      state.commentText = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPost.pending, (state) => {
        state.status = "loading";
        state.authLoader = true;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authLoader = false;
        state.post = action?.payload?.data?.payload;
      })
      .addCase(getPost.rejected, (state) => {
        state.status = "rejected";
        state.authLoader = false;
      })
      .addCase(addPost.pending, (state) => {
        state.status = "loading";
        state.authLoader = true;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authLoader = false;
      })
      .addCase(addPost.rejected, (state) => {
        state.status = "rejected";
        state.authLoader = false;
      })
      .addCase(updatePost.pending, (state) => {
        state.status = "loading";
        state.authLoader = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authLoader = false;
      })
      .addCase(updatePost.rejected, (state) => {
        state.status = "rejected";
        state.authLoader = false;
      })
      .addCase(addReaction.pending, (state) => {
        state.status = "loading";
        state.authLoader = true;
      })
      .addCase(addReaction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authLoader = false;
      })
      .addCase(addReaction.rejected, (state) => {
        state.status = "rejected";
        state.authLoader = false;
      })
      .addCase(getReactionByPost.pending, (state) => {
        state.status = "loading";
        state.authLoader = true;
      })
      .addCase(getReactionByPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authLoader = false;
        state.reactionDatabyPost = action?.payload?.data?.payload;
      })
      .addCase(getReactionByPost.rejected, (state) => {
        state.status = "rejected";
        state.authLoader = false;
      })
      .addCase(getReaction.pending, (state) => {
        state.status = "loading";
        state.authLoader = true;
      })
      .addCase(getReaction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authLoader = false;
        state.reactionData = action?.payload?.data?.payload;
      })
      .addCase(getReaction.rejected, (state) => {
        state.status = "rejected";
        state.authLoader = false;
      });
  },
});
export const { setCommentData, setComment, setCommentText } = feedSlice.actions;
export default feedSlice.reducer;
