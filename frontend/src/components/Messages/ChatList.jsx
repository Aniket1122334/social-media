import { Search } from "lucide-react";
import ChatItem from "./ChatItem";
import { useSelector } from "react-redux";

const ChatList = ({ followingUsers = [] }) => {
  const onlineUsers =
    useSelector((state) => state?.onlineUsers.onlineUsers) || [];

  return (
    <div className="h-full flex flex-col bg-[#0f0f0f]">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="p-4 sm:p-5 md:p-6 border-b border-zinc-800">
        {/* Title */}

        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-white">Messages</h1>
        </div>

        {/* Search */}

        <div className="mt-4 relative">
          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-zinc-500
            "
          />

          <input
            type="text"
            placeholder="Search chats..."
            className="
              w-full
              h-11
              bg-[#1A1A1A]
              text-white
              placeholder:text-zinc-500
              rounded-xl
              py-2
              pl-11
              pr-4
              outline-none
              border
              border-transparent
              focus:border-violet-600
              focus:ring-1
              focus:ring-violet-600
              transition
              text-sm
            "
          />
        </div>
      </div>

      {/* =====================================================
          CHAT LIST
      ====================================================== */}

      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
        {followingUsers.length === 0 ? (
          <div className="h-full flex items-center justify-center px-6">
            <p className="text-zinc-500 text-center text-sm">
              No messages available
            </p>
          </div>
        ) : (
          <div className="py-2">
            {followingUsers.map((user) => (
              <ChatItem
                key={user._id}
                user={user}
                online={onlineUsers.includes(user._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
