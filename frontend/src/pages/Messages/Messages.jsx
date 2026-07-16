import ChatList from "../../components/Messages/ChatList";
import ChatWindow from "../../components/Messages/ChatWindow";
import UserInfo from "../../components/Messages/UserInfo";

const Messages = () => {
  return (
    <div className="h-screen w-full bg-[#111] flex">
      {/* Chat List */}
      <div className="hidden md:block w-[320px] border-r border-zinc-800">
        <ChatList />
      </div>

      {/* Chat Window */}
      <div className="flex-1">
        <ChatWindow />
      </div>

      {/* User Info */}
      <div className="hidden xl:block w-75 border-l border-zinc-800">
        <UserInfo />
      </div>
    </div>
  );
};

export default Messages;
