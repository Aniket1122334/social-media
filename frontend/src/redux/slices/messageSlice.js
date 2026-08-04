import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMessages, sendMessage } from "../../services/messageService";

// Fetch Messages
export const fetchMessages = createAsyncThunk(
  "message/fetchMessages",
  async (receiverId, thunkAPI) => {
    try {
      return await getMessages(receiverId);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch messages",
      );
    }
  },
);

// Send Message
export const addMessage = createAsyncThunk(
  "message/sendMessage",
  async ({ receiverId, data }, thunkAPI) => {
    try {
      return await sendMessage(receiverId, data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to send message",
      );
    }
  },
);

const initialState = {
  selectedUser: null,

  messages: {
    success: false,
    conversationId: null,
    messages: [],
  },

  unreadMessages: {},

  loading: false,
  sendLoading: false,
  typing: false,
  error: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,

  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },

    // Socket Message
    pushMessage: (state, action) => {
      const exists = state.messages.messages.some(
        (msg) => msg?._id === action.payload._id,
      );

      if (!exists) {
        state.messages.messages.push(action.payload);
      }
    },

    updateSeenMessages: (state, action) => {
      state.messages.messages = state.messages.messages.map((msg) =>
        msg.conversation === action.payload ? { ...msg, isSeen: true } : msg,
      );
    },

    clearMessages: (state) => {
      state.messages = {
        success: false,
        conversationId: null,
        messages: [],
      };
    },

    setTyping: (state, action) => {
      state.typing = action.payload;
    },

    incrementUnread: (state, action) => {
      const senderId = action.payload;

      state.unreadMessages[senderId] =
        (state.unreadMessages[senderId] || 0) + 1;
    },

    clearUnread: (state, action) => {
      delete state.unreadMessages[action.payload];
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch Messages

      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })

      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Send Message

      .addCase(addMessage.pending, (state) => {
        state.sendLoading = true;
        state.error = null;
      })

      .addCase(addMessage.fulfilled, (state, action) => {
        state.messages.messages.push(action.payload);
        state.sendLoading = false;
      })

      .addCase(addMessage.rejected, (state, action) => {
        state.sendLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSelectedUser,
  pushMessage,
  updateSeenMessages,
  clearMessages,
  setTyping,
  incrementUnread,
  clearUnread,
} = messageSlice.actions;

export default messageSlice.reducer;
