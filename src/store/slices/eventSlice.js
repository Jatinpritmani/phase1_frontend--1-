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
const initialState = {
  event: {},
  authLoader: false,
  isLoggedIn: false,
  errorSignIn: false,
  status: "idle",
  error: null,
};

export const getEvent = createAsyncThunk("/event/getEvent", async (body) => {
  try {
    let isMonth = body === "thisMonth" ? `?thisMonth=true` : "";
    let isWeek = body === "thisWeek" ? `?thisWeek=true` : "";
    const response = await ApiGet(`event/getEvent${isMonth}${isWeek}`, body);
    // setToken(response?.data?.data?.token);
    return response;
  } catch (error) {
    return error;
  }
});

export const addEvent = createAsyncThunk("/event/addEvent", async (body) => {
  try {
    const response = await ApiPost(`event/addEvent`, body);
    // setToken(response?.data?.data?.token);
    return response;
  } catch (error) {
    return error;
  }
});

export const updateEvent = createAsyncThunk(
  "/event/updateEvent",
  async ({ id, body }) => {
    return new Promise((resolve, reject) => {
      ApiPut(`event/updateEvent/${id}`, body)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
);

export const deleteEvent = createAsyncThunk(
  "/event/deleteEvent",
  async (body) => {
    return new Promise((resolve, reject) => {
      ApiDelete(`event/deleteEvent?id=${body}`)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
);

export const eventSlice = createSlice({
  name: "event",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getEvent.pending, (state) => {
        state.status = "loading";
        state.authLoader = true;
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authLoader = false;
        state.event = action?.payload?.data?.payload;
      })
      .addCase(getEvent.rejected, (state) => {
        state.status = "rejected";
        state.authLoader = false;
      })
      .addCase(addEvent.pending, (state) => {
        state.status = "loading";
        state.authLoader = true;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authLoader = false;
      })
      .addCase(addEvent.rejected, (state) => {
        state.status = "rejected";
        state.authLoader = false;
      })
      .addCase(updateEvent.pending, (state) => {
        state.status = "loading";
        state.authLoader = true;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authLoader = false;
      })
      .addCase(updateEvent.rejected, (state) => {
        state.status = "rejected";
        state.authLoader = false;
      });
    //   .addCase(deletePost.pending, (state) => {
    //     state.status = "loading";
    //     state.authLoader = true;
    //   })
    //   .addCase(deletePost.fulfilled, (state, action) => {
    //     state.status = "succeeded";
    //     state.authLoader = false;
    //   })
    //   .addCase(deletePost.rejected, (state) => {
    //     state.status = "rejected";
    //     state.authLoader = false;
    //   });
  },
});

export default eventSlice.reducer;
