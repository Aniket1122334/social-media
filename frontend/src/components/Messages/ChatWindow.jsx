import {
  Phone,
  Video,
  MoreVertical,
  Smile,
  Paperclip,
  Send,
} from "lucide-react";

const messages = [
  {
    id: 1,
    sender: "other",
    text: "Hey Aniket 👋",
    time: "10:20 AM",
  },
  {
    id: 2,
    sender: "me",
    text: "Hello Rahul! How are you?",
    time: "10:21 AM",
  },
  {
    id: 3,
    sender: "other",
    text: "I'm doing great. Working on the Instagram Clone 😄",
    time: "10:22 AM",
  },
];

const ChatWindow = () => {
  return (
    <div className=" flex flex-col h-screen bg-[#181818]">
      {/* Header */}

      <div className="h-20 border-b border-zinc-800 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/150?img=1"
            alt=""
            className="w-12 h-12 rounded-full"
          />

          <div>
            <h2 className="font-semibold text-white">Rahul Sharma</h2>

            <p className="text-sm text-green-500">Online</p>
          </div>
        </div>

        <div className="flex items-center gap-5 text-zinc-400">
          <Phone size={20} className="cursor-pointer hover:text-white" />

          <Video size={20} className="cursor-pointer hover:text-white" />

          <MoreVertical size={20} className="cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-md px-5 py-3 rounded-3xl ${
                msg.sender === "me"
                  ? "bg-violet-600 text-white"
                  : "bg-zinc-800 text-white"
              }`}
            >
              <p>{msg.text}</p>

              <p className="text-xs opacity-70 mt-2 text-right">{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}

      <div className="border-t border-zinc-800 p-5">
        <div className="bg-[#222] rounded-full flex items-center px-5 py-3">
          <Smile className="text-zinc-400 cursor-pointer" />

          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-transparent px-4 outline-none text-white"
          />

          <Paperclip className="text-zinc-400 cursor-pointer mr-4" />

          <button className="bg-violet-600 p-3 rounded-full">
            <Send size={18} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
