const ChatItem = ({ chat }) => {
  return (
    <div className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-[#1A1A1A] transition">
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={chat.avatar}
            alt={chat.name}
            className="w-14 h-14 rounded-full object-cover"
          />

          {chat.online && (
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#111]" />
          )}
        </div>

        <div>
          <h3 className="font-semibold">{chat.name}</h3>

          <p className="text-sm text-zinc-400 truncate w-40">{chat.message}</p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <span className="text-xs text-zinc-500">{chat.time}</span>

        {chat.unread > 0 && (
          <span className="bg-violet-600 text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {chat.unread}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatItem;
