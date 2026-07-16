import { Search } from "lucide-react";
import ChatItem from "./ChatItem";

const chats = [
  {
    id: 1,
    name: "Rahul Sharma",
    message: "Hey! How are you?",
    time: "2m",
    online: true,
    unread: 2,
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Priya",
    message: "Let's meet tomorrow.",
    time: "10m",
    online: false,
    unread: 0,
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    name: "Aman",
    message: "Sent a photo 📷",
    time: "30m",
    online: true,
    unread: 1,
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: 4,
    name: "Rohit",
    message: "Typing...",
    time: "1h",
    online: false,
    unread: 0,
    avatar: "https://i.pravatar.cc/150?img=10",
  },
];

const ChatList = () => {
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
        {chats.map((chat) => (
          <ChatItem key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
