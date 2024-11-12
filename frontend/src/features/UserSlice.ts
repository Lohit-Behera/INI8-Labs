import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "@/lib/Proxy";

type User = {
  name: string;
  email: string;
  avatar: File;
  dob: string;
};

export const fetchCreateUser = createAsyncThunk(
  "user/create",
  async (user: User, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        `${baseUrl}/api/users/create`,
        user,
        config
      );
      return data;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchGetUser = createAsyncThunk(
  "user/get",
  async (userId: string, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `${baseUrl}/api/users/get/${userId}`,
        config
      );
      return data;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchGetAllUsers = createAsyncThunk(
  "user/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(`${baseUrl}/api/users/get/all`, config);
      return data;
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    createUser: { data: {} },
    createUserStatus: "idle",
    createUserError: {},

    getUser: { data: {} },
    getUserStatus: "idle",
    getUserError: {},

    getAllUsers: { data: [] },
    getAllUsersStatus: "idle",
    getAllUsersError: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // createUser
      .addCase(fetchCreateUser.pending, (state) => {
        state.createUserStatus = "loading";
      })
      .addCase(fetchCreateUser.fulfilled, (state, action) => {
        state.createUserStatus = "succeeded";
        state.createUser = action.payload;
      })
      .addCase(fetchCreateUser.rejected, (state, action) => {
        state.createUserStatus = "failed";
        state.createUserError = action.payload || "Failed to create user";
      })

      // getUser
      .addCase(fetchGetUser.pending, (state) => {
        state.getUserStatus = "loading";
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.getUserStatus = "succeeded";
        state.getUser = action.payload;
      })
      .addCase(fetchGetUser.rejected, (state, action) => {
        state.getUserStatus = "failed";
        state.getUserError = action.payload || "Failed to get user";
      })

      // getAllUsers
      .addCase(fetchGetAllUsers.pending, (state) => {
        state.getAllUsersStatus = "loading";
      })
      .addCase(fetchGetAllUsers.fulfilled, (state, action) => {
        state.getAllUsersStatus = "succeeded";
        state.getAllUsers = action.payload;
      })
      .addCase(fetchGetAllUsers.rejected, (state, action) => {
        state.getAllUsersStatus = "failed";
        state.getAllUsersError = action.payload || "Failed to get all users";
      });
  },
});

export default userSlice.reducer;
