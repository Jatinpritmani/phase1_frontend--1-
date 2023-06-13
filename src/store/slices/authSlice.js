import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ApiPost,
  ApiPostNoAuth,
  ApiPut,
  formDataHeader,
} from "../../helpers/API/ApiData";
import { setToken } from "../../helpers/utils/auth.util";
const initialState = {
  user: {},
  authLoader: false,
  isLoggedIn: false,
  errorSignIn: false,
  status: "idle",
  error: null,
};

export const signIn = createAsyncThunk("/admin/login", async (body) => {
  try {
    const response = await ApiPostNoAuth(`admin/login`, body);
    // setToken(response?.data?.data?.token);
    return response;
  } catch (error) {
    return error;
  }
});

export const signUp = createAsyncThunk("/admin/signup", async (body) => {
  try {
    const response = await ApiPostNoAuth(`admin/signup`, body);
    // setToken(response?.data?.data?.token);
    return response;
  } catch (error) {
    return error;
  }
});

export const updateUser = createAsyncThunk(
  "/user/update-profile",
  async (body) => {
    return new Promise((resolve, reject) => {
      ApiPut(`user/update-user/${body._id}`, body)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
);

export const updateUserProfile = createAsyncThunk(
  "/user/update-profile-image",
  async (body) => {
    const formData = new FormData();
    formData.append("profileImage", body?.avatarName);
    return new Promise((resolve, reject) => {
      ApiPut(`user/update-user/${body?._id}`, formData, formDataHeader)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
);

export const chnagePassword = createAsyncThunk(
  "/user/change-password",
  async (body) => {
    return new Promise((resolve, reject) => {
      ApiPost(`user/change-password`, body)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: () => {
      localStorage.clear();
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
        state.authLoader = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authLoader = false;
        state.isLoggedIn = true;
        console.log(action?.payload, "action?.payload");
        state.user = action?.payload?.data?.payload?.admin;
        setToken(action?.payload?.data?.payload?.token);
      })
      .addCase(signIn.rejected, (state) => {
        state.status = "rejected";
        state.authLoader = false;
      })
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
        state.authLoader = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authLoader = false;
        state.user = action?.payload?.data?.payload?.admin;
        setToken(action?.payload?.data?.payload?.token);
      })
      .addCase(signUp.rejected, (state) => {
        state.status = "rejected";
        state.authLoader = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
        state.authLoader = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authLoader = false;
        state.isLoggedIn = true;
        state.user = action?.payload?.data?.user;
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = "rejected";
        state.authLoader = false;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "loading";
        state.authLoader = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authLoader = false;
        state.isLoggedIn = true;
        state.user = action?.payload?.data?.user;
      })
      .addCase(updateUserProfile.rejected, (state) => {
        state.status = "rejected";
        state.authLoader = false;
      })
      .addCase(chnagePassword.pending, (state) => {
        state.status = "loading";
        state.authLoader = true;
      })
      .addCase(chnagePassword.fulfilled, (state) => {
        state.status = "succeeded";
        state.authLoader = false;
        state.isLoggedIn = false;
      })
      .addCase(chnagePassword.rejected, (state) => {
        state.status = "rejected";
        state.authLoader = false;
      });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
