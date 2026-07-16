import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { allUsers, myProfile } from "../../services/profileService";
import { follow, unfollow } from "./followSlice";

export const fetchUser = createAsyncThunk("users/fetchUsers", async () => {
  try {
    return await myProfile();
  } catch (err) {
    return err;
  }
});

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (_, thunkAPI) => {
    try {
      return await allUsers();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch users.",
      );
    }
  },
);

const initialState = {
  currentUser: null,
  profileUser: null,
  loading: false,
  allUsers: [],
  error: null,
};

const userSlice = createSlice({
  name: "users",

  initialState,

  reducers: {
    clearProfileUser: (state) => {
      state.profileUser = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Current User
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
      })

      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(follow.fulfilled, (state, action) => {
        state.currentUser.following.push(action.payload.followingId);
      })

      .addCase(unfollow.fulfilled, (state, action) => {
        state.currentUser.following = state.currentUser.following.filter(
          (id) => id !== action.payload.unfollowingId,
        );
      })

      // All Users
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload.users;
      })

      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfileUser } = userSlice.actions;

export default userSlice.reducer;
