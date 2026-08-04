import { useDispatch, useSelector } from "react-redux";
import {
  clearMessages,
  fetchMessages,
  setSelectedUser,
  clearUnread,
} from "../../redux/slices/messageSlice";

const ChatItem = ({ user, online }) => {
  const dispatch = useDispatch();

  const selectedUser = useSelector((state) => state.message.selectedUser);

  const unreadMessages = useSelector((state) => state.message.unreadMessages);

  const unread = unreadMessages?.[user._id] || 0;

  const isSelected = selectedUser?._id === user._id;

  const handleClickOnMessage = () => {
    dispatch(setSelectedUser(user));

    dispatch(clearUnread(user._id));

    dispatch(clearMessages());

    dispatch(fetchMessages(user._id));
  };

  return (
    <div
      onClick={handleClickOnMessage}
      className={`flex items-center justify-between px-5 py-4 cursor-pointer transition-all duration-200
      ${isSelected ? "bg-zinc-800" : "hover:bg-[#1A1A1A]"}`}
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="relative flex-shrink-0">
          <img
            src={
              user.profilePicture ||
              "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
            }
            alt={user.fullname}
            className="w-14 h-14 rounded-full object-cover"
          />

          {online && (
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
              border-[#111]
              shadow-[0_0_8px_#22c55e]
              "
            />
          )}
        </div>

        <div className="min-w-0">
          <h3 className="font-semibold text-white truncate">{user.fullname}</h3>

          <p className="text-sm text-zinc-400 truncate w-44">
            {online ? "Active now" : "Offline"}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col items-end gap-2">
        {unread > 0 && (
          <span
            className="
            min-w-6
            h-6
            px-2
            rounded-full
            bg-violet-600
            text-white
            text-xs
            flex
            items-center
            justify-center
            font-semibold
            "
          >
            {unread}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatItem;
