import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  pushMessage,
  incrementUnread,
  updateSeenMessages,
} from "../redux/slices/messageSlice";
import { socket } from "../config/socket";

const MessageListener = () => {
  const dispatch = useDispatch();

  const selectedUser = useSelector((state) => state.message.selectedUser);

  const authUser = useSelector((state) => state?.auth?.user?.id);

  useEffect(() => {
    const handleNewMessage = (message) => {
      const senderId = message.sender._id;

      // Is this message for currently opened chat?
      const isCurrentConversation =
        selectedUser &&
        senderId === selectedUser._id &&
        message.receiver._id === authUser;

      if (isCurrentConversation) {
        dispatch(pushMessage(message));
      } else {
        dispatch(incrementUnread(senderId));
      }
    };

    const handleMessagesSeen = ({ conversationId }) => {
      dispatch(updateSeenMessages(conversationId));
    };

    socket.on("newMessage", handleNewMessage);

    socket.on("messagesSeen", handleMessagesSeen);

    return () => {
      socket.off("newMessage", handleNewMessage);

      socket.off("messagesSeen", handleMessagesSeen);
    };
  }, [dispatch, selectedUser, authUser]);

  return null;
};

export default MessageListener;
