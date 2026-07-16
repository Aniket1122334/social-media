import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPhotos } from "../../api/externalApis";

export const fetchAllPhotos = createAsyncThunk(
  "photos/fetchAllPhotos",
  async (query = "all", { rejectWithValue }) => {
    try {
      return await fetchPhotos(query);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const initialState = {
  query: "",
  activeTab: "photos",
  results: [],
  loading: false,
  error: null,
};

const getAllPhotos = createSlice({
  name: "externalPhotos",
  initialState,

  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },

    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.results = action.payload;
      });
  },
});

export const { setQuery, setActiveTab } = getAllPhotos.actions;

export default getAllPhotos.reducer;
