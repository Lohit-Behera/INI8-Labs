import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "@/lib/Proxy";

type UserDispatch = {
  name: string;
  email: string;
  avatar: File;
  dob: Date;
};

type User = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  dob: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const fetchCreateUser = createAsyncThunk(
  "user/create",
  async (user: UserDispatch, { rejectWithValue }) => {
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

export const fetchUpdateUser = createAsyncThunk(
  "user/update",
  async (
    user: {
      _id: string;
      name: string;
      email: string;
      dob: Date | null;
      avatar: File | null;
    },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.patch(
        `${baseUrl}/api/users/update/${user._id}`,
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

const userSlice = createSlice({
  name: "user",
  initialState: {
    createUser: { data: {} },
    createUserStatus: "idle",
    createUserError: {},

    getUser: { data: {} as User },
    getUserStatus: "idle",
    getUserError: {},

    getAllUsers: { data: [] },
    getAllUsersStatus: "idle",
    getAllUsersError: {},

    updateUser: { data: {} },
    updateUserStatus: "idle",
    updateUserError: {},
  },
  reducers: {
    resetUpdateUser: (state) => {
      state.updateUser = { data: {} as User };
      state.updateUserStatus = "idle";
      state.updateUserError = {};
    },
  },
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
      })

      // updateUser
      .addCase(fetchUpdateUser.pending, (state) => {
        state.updateUserStatus = "loading";
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.updateUserStatus = "succeeded";
        state.updateUser = action.payload;
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.updateUserStatus = "failed";
        state.updateUserError = action.payload || "Failed to update user";
      });
  },
});

export const { resetUpdateUser } = userSlice.actions;

export default userSlice.reducer;
