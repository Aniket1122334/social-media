import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onlineUsers: [],
};

const socketSlice = createSlice({
  name: "socket",
  initialState,

  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },

    clearOnlineUsers: (state) => {
      state.onlineUsers = [];
    },
  },
});

export const { setOnlineUsers, clearOnlineUsers } = socketSlice.actions;

export default socketSlice.reducer;
