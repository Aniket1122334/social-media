import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  allUsers,
  myProfile,
  editProfile,
} from "../../services/profileService";
import { follow, unfollow } from "./followSlice";

// ================= Fetch Current User =================

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (_, thunkAPI) => {
    try {
      return await myProfile();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch profile.",
      );
    }
  },
);

// ================= Fetch Suggested Users =================

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

// ================= Edit Profile =================

export const updateProfile = createAsyncThunk(
  "users/updateProfile",
  async (formData, thunkAPI) => {
    try {
      return await editProfile(formData);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update profile.",
      );
    }
  },
);

const initialState = {
  currentUser: null,
  profileUser: null,
  allUsers: [],
  loading: false,
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

      // ================= Fetch Current User =================

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

      // ================= Update Profile =================

      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;

        state.currentUser = action.payload.user;

        if (state.profileUser) {
          state.profileUser = action.payload.user;
        }
      })

      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= Follow =================

      .addCase(follow.fulfilled, (state, action) => {
        if (state.currentUser) {
          state.currentUser.following.push(action.payload.followingId);
        }
      })

      // ================= Unfollow =================

      .addCase(unfollow.fulfilled, (state, action) => {
        if (state.currentUser) {
          state.currentUser.following = state.currentUser.following.filter(
            (id) => id !== action.payload.unfollowingId,
          );
        }
      })

      // ================= Fetch Suggested Users =================

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
