import { Smile, Send, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../redux/slices/messageSlice";
import EmojiPicker from "emoji-picker-react";

const ChatWindow = () => {
  const selectedUser = useSelector((state) => state.message.selectedUser);

  console.log(selectedUser);

  const onlineUsers = useSelector((state) => state.onlineUsers.onlineUsers);

  const isOnline = onlineUsers.includes(selectedUser?._id);

  const dispatch = useDispatch();

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const emojiPickerRef = useRef(null);
  const messageRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEmojiClick = (emojiData) => {
    messageRef.current.value += emojiData.emoji;
    messageRef.current.focus();
  };

  const sendLoading = useSelector((state) => state.message.sendLoading);

  const sender = useSelector((state) => state.auth.user.id);

  const messages = useSelector((state) => state?.message?.messages?.messages);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);
  const handleSendMessage = async () => {
    if (!messageRef.current.value.trim()) return;

    const data = {
      text: messageRef.current.value.trim(),
    };

    await dispatch(
      addMessage({
        receiverId: selectedUser._id,
        data,
      }),
    );

    if (messageRef.current) {
      messageRef.current.value = "";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Agar koi user select nahi hua
  if (!selectedUser || selectedUser === null) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#181818] text-zinc-500">
        <MessageCircle size={70} className="mb-6 opacity-50" />

        <h2 className="text-2xl font-semibold text-zinc-300">Your Messages</h2>

        <p className="mt-3 text-center max-w-sm">
          Select a conversation from the left to start chatting.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#181818]">
      {/* Header */}
      <div className="sticky top-0 z-20 h-20 bg-[#181818]/95 backdrop-blur-md border-b border-zinc-800 px-6 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={
                selectedUser.profilePicture ||
                "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
              }
              alt={selectedUser.fullname}
              className="w-12 h-12 rounded-full object-cover"
            />

            {isOnline && (
              <span
                className="
          absolute
          bottom-0
          right-0
          w-3.5
          h-3.5
          rounded-full
          bg-green-500
          border-2
          border-[#181818]
          shadow-[0_0_10px_rgba(34,197,94,0.9)]
        "
              />
            )}
          </div>

          <div>
            <h2 className="text-white font-semibold text-lg">
              {selectedUser.fullname}
            </h2>

            <p
              className={`text-sm ${
                isOnline ? "text-green-400" : "text-zinc-500"
              }`}
            >
              {isOnline ? "Active now" : "Offline"}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {messages.map((msg) => (
          <div
            key={msg?._id}
            className={`flex ${
              msg?.sender?._id == sender ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-md px-5 py-3 rounded-3xl ${
                msg?.sender?._id == sender
                  ? "bg-violet-600 text-white"
                  : "bg-zinc-800 text-white"
              }`}
            >
              <p>{msg?.text}</p>

              <p className="text-xs opacity-70 mt-2 text-right">
                {new Date(msg?.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        <div ref={bottomRef}></div>
      </div>

      {/* Input */}
      <div className="border-t border-zinc-800 p-5">
        <div className="relative">
          {showEmojiPicker && (
            <div
              ref={emojiPickerRef}
              className="absolute bottom-20 left-0 z-50 shadow-2xl"
            >
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                theme="dark"
                width={330}
                height={420}
              />
            </div>
          )}

          <div className="bg-[#222] rounded-full flex items-center px-5 py-3">
            <Smile
              size={22}
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              className="text-zinc-400 cursor-pointer hover:text-yellow-400 transition"
            />

            <input
              type="text"
              ref={messageRef}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 bg-transparent px-4 outline-none text-white"
            />

            <button
              onClick={handleSendMessage}
              disabled={sendLoading}
              className="bg-violet-600 p-3 rounded-full hover:bg-violet-700 transition"
            >
              <Send size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
