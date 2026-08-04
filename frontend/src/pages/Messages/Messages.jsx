import ChatList from "../../components/Messages/ChatList";
import ChatWindow from "../../components/Messages/ChatWindow";
import { useSelector } from "react-redux";

const Messages = () => {
  const usersSelector = useSelector(
    (state) => state.users.currentUser?.following,
  );

  return (
    <div className="h-screen w-full bg-[#111] flex">
      {/* Chat List */}
      <div className="hidden md:block w-[320px] border-r border-zinc-800">
        <ChatList followingUsers={usersSelector} />
      </div>

      {/* Chat Window */}
      <div className="flex-1">
        <ChatWindow />
      </div>
    </div>
  );
};

export default Messages;
