import { Heart, MessageCircle, UserPlus, AtSign } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllNotifications,
  readNotification,
} from "../../redux/slices/notificationSlice";

const getIcon = (type) => {
  switch (type) {
    case "LIKE":
      return <Heart className="text-red-500" size={22} />;

    case "COMMENT":
      return <MessageCircle className="text-blue-500" size={22} />;

    case "FOLLOW":
      return <UserPlus className="text-green-500" size={22} />;

    default:
      return <AtSign className="text-yellow-400" size={22} />;
  }
};

const getMessage = (item) => {
  switch (item.type) {
    case "LIKE":
      return "liked your post";

    case "COMMENT":
      return "commented on your post";

    case "FOLLOW":
      return "started following you";

    default:
      return "";
  }
};

const formatTime = (date) => {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
};

const Notifications = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllNotifications());
  }, [dispatch]);

  const { notifications, loading, error } = useSelector(
    (state) => state.notifications,
  );

  const handleReadNotification = (notification) => {
    if (!notification.isRead) {
      dispatch(readNotification(notification._id));
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#181818] text-white">
      {/* Header */}
      <div className="sticky top-0 bg-[#181818] border-b border-zinc-800 px-6 py-5 z-20">
        <h1 className="text-3xl font-bold">Notifications</h1>
      </div>

      {/* Content */}
      <div className="max-w-[90%] mx-auto p-4">
        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <p className="text-zinc-400 text-lg">Loading notifications...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-[60vh]">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <h2 className="text-3xl font-semibold text-zinc-300">
              No Notifications
            </h2>

            <p className="text-zinc-500 mt-3 text-lg">
              You're all caught up 🎉
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((item) => (
              <div
                key={item._id}
                onClick={() => handleReadNotification(item)}
                className={`flex items-center justify-between rounded-2xl p-4 cursor-pointer transition-all duration-300 ${
                  item.isRead
                    ? "bg-[#222] hover:bg-[#2b2b2b]"
                    : "bg-[#2a2345] border border-violet-500 hover:bg-[#322952]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      item.sender?.profilePicture ||
                      "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
                    }
                    alt={item.sender?.username}
                    className="w-14 h-14 rounded-full object-cover"
                  />

                  <div>
                    <p className="text-base">
                      <span className="font-semibold">
                        {item.sender?.username}
                      </span>{" "}
                      {getMessage(item)}
                    </p>

                    <p className="text-sm text-zinc-400 mt-1">
                      {formatTime(item.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {!item.isRead && (
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  )}

                  {getIcon(item.type)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
