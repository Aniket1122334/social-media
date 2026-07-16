import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { allPosts, createPost, toggleLike } from "../../services/postServices";

export const fetchPosts = createAsyncThunk("posts", async () => {
  try {
    return await allPosts();
  } catch (err) {
    return err;
  }
});

export const createNewPost = createAsyncThunk(
  "createPost",
  async (postData, thunkAPI) => {
    try {
      return await createPost(postData);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "failed to create post",
      );
    }
  },
);

export const toggleLiked = createAsyncThunk(
  "toggleLike",
  async (postId, thunkAPI) => {
    try {
      const data = await toggleLike(postId);

      return {
        postId,
        ...data,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Something went wrong",
      );
    }
  },
);

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {
    addCommentCount(state, action) {
      const { postId, comment } = action.payload;

      const post = state.posts.find((post) => post._id === postId);

      if (post) {
        post.comments.push(comment._id);
      }
    },

    deleteCommentCount(state, action) {
      const { postId, commentId } = action.payload;

      const post = state.posts.find((post) => post._id === postId);

      if (post) {
        post.comments = post.comments.filter((id) => id !== commentId);
      }
    },
  },

  extraReducers: (builder) => {
    builder

      // fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // create posts
      .addCase(createNewPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        // adding new post in the top of posts array
        state.posts.unshift(action.payload.post);
      })
      .addCase(createNewPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // liked post
      .addCase(toggleLiked.fulfilled, (state, action) => {
        const updatedPost = action.payload.post;

        state.posts = state.posts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post,
        );
      });
  },
});

export const { addCommentCount, deleteCommentCount } = postsSlice.actions;
export default postsSlice.reducer;
