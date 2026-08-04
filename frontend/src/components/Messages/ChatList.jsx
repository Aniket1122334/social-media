import { Search } from "lucide-react";
import ChatItem from "./ChatItem";
import { useSelector } from "react-redux";

const ChatList = ({ followingUsers = [] }) => {
  const onlineUsers = useSelector((state) => state?.onlineUsers.onlineUsers);

  return (
    <div className="h-full bg-[#111] text-white flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-zinc-800">
        <h2 className="text-2xl font-semibold">Messages</h2>

        <div className="mt-5 relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            type="text"
            placeholder="Search chats..."
            className="w-full bg-[#1A1A1A] rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-violet-600"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {followingUsers.length === 0 ? (
          <div className="h-full flex items-center justify-center px-6">
            <p className="text-zinc-500 text-center text-sm">
              No messages available
            </p>
          </div>
        ) : (
          followingUsers?.map((user) => (
            <ChatItem
              key={user._id}
              user={user}
              online={onlineUsers.includes(user._id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
