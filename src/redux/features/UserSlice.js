import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../globals";

export const signup = createAsyncThunk(
  "users/signup",
  async (values, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(`${API}/users/signup`, values, config);
    } catch (err) {
      if (err.response && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "users/forgotPassword",
  async (values, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(`${API}/users/forgotPassword`, values, config);
    } catch (err) {
      if (err.response && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const resetPassword = createAsyncThunk(
  "users/resetPassword",
  async ({ values, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.put(`${API}/users/resetPassword/${token}`, values, config);
    } catch (err) {
      if (err.response && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const login = createAsyncThunk(
  "users/login",
  async (values, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(`${API}/users/login`, values, config);

      localStorage.setItem("token", data.token);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("name", data.data.name);
      localStorage.setItem("userId", data.data._id);
      return data;
    } catch (err) {
      if (err.response && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        rejectWithValue(err.message);
      }
    }
  }
);

const UserSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    userInfo: null,
    userToken: "",
    error: null,
    success: false,
  },
  reducers: {
    clearSomeState: (state) => {
      state.error = false;
      state.success = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
        state.success = false;
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.userInfo = payload;
        state.userToken = payload.token;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(forgotPassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { clearSomeState } = UserSlice.actions;
export default UserSlice.reducer;

// [signup.pending]: (state) => {
//   state.loading = true;
//   state.error = null;
// },
// [signup.fulfilled]: (state, { payload }) => {
//   state.loading = false;
//   state.success = true;
// },
// [signup.rejected]: (state, { payload }) => {
//   state.loading = false;
//   state.error = payload;
// },
// [login.pending]: (state) => {
//   state.loading = true;
//   state.error = null;
// },
// [login.fulfilled]: (state, { payload }) => {
//   state.loading = false;
//   state.userInfo = payload;
//   state.userToken = payload.userToken;
// },
// [login.rejected]: (state, { payload }) => {
//   state.loading = false;
//   state.error = payload;
// },
