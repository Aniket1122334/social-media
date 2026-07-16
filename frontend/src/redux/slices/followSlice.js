import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { followUser, unfollowUser } from "../../services/followService";

export const follow = createAsyncThunk("follow", async (userId, thunkAPI) => {
  try {
    const response = await followUser(userId);
    return response;
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "failed to create comment",
    );
  }
});

export const unfollow = createAsyncThunk(
  "unfollow",
  async (userId, thunkAPI) => {
    try {
      const response = await unfollowUser(userId);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to unfollow user",
      );
    }
  },
);

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const followSlice = createSlice({
  name: "follow",
  initialState,

  reducers: {
    clearFollowState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // follow user
      .addCase(follow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(follow.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(follow.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // unfollow user
      .addCase(unfollow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(unfollow.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(unfollow.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { clearFollowState } = followSlice.actions;

export default followSlice.reducer;
