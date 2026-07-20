import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllNotifications,
  markAsRead,
} from "../../services/notificationService";

export const fetchAllNotifications = createAsyncThunk(
  "notifications/fetchAllNotifications",
  async (_, thunkAPI) => {
    try {
      const response = await getAllNotifications();
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch notifications.",
      );
    }
  },
);

export const readNotification = createAsyncThunk(
  "notifications/readNotification",
  async (id, thunkAPI) => {
    try {
      const response = await markAsRead(id);
      return response.notification;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to mark notification.",
      );
    }
  },
);

const initialState = {
  loading: false,
  error: null,
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,

  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAllNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.notifications = action.payload.notifications;
      })

      .addCase(fetchAllNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(readNotification.fulfilled, (state, action) => {
        const notification = state.notifications.find(
          (n) => n._id === action.payload._id,
        );

        if (notification) {
          notification.isRead = true;
        }
      });
  },
});

export const { addNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
