import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addComment,
  deleteComment,
  getComments,
} from "../../services/commentService";

export const createComment = createAsyncThunk(
  "addComment",
  async ({ postId, text }, thunkAPI) => {
    try {
      return await addComment(postId, text);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "failed to create comment",
      );
    }
  },
);

export const fetchComments = createAsyncThunk(
  "fetchComments",
  async (postId, thunkAPI) => {
    try {
      return await getComments(postId);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "failed to fetch comments",
      );
    }
  },
);

export const removeComment = createAsyncThunk(
  "deleteComment",
  async (commentId, thunkAPI) => {
    try {
      await deleteComment(commentId);
      return commentId;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete comment",
      );
    }
  },
);

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  extraReducers: (builder) => {
    builder

      // create comments
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.unshift(action.payload.comment);
        state.error = null;
      })

      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch Comments
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.comments;
        state.error = null;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete comment
      .addCase(removeComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.loading = false;

        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload,
        );

        state.error = null;
      })
      .addCase(removeComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default commentSlice.reducer;
