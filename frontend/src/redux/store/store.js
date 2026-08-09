import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import postsReducer from "../slices/postSlice";
import usersReducer from "../slices/userSlice";
import commentsReducer from "../slices/commentSlice";
import photoReducer from "../slices/externalApiSlice";
import followReducer from "../slices/followSlice";
import notificationReducer from "../slices/notificationSlice";
import socketReducer from "../slices/socketSlice";
import messageReducer from "../slices/messageSlice";

const appReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  users: usersReducer,
  comments: commentsReducer,
  externalPhotos: photoReducer,
  follow: followReducer,
  notifications: notificationReducer,
  onlineUsers: socketReducer,
  message: messageReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }

  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
