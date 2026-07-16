import { Heart, MessageCircle, UserPlus, AtSign } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "like",
    user: "Rahul Sharma",
    message: "liked your post.",
    time: "2m",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    type: "comment",
    user: "Priya",
    message: "commented: Amazing picture 😍",
    time: "15m",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    type: "follow",
    user: "Aman",
    message: "started following you.",
    time: "1h",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: 4,
    type: "mention",
    user: "Rohit",
    message: "mentioned you in a comment.",
    time: "3h",
    avatar: "https://i.pravatar.cc/150?img=10",
  },

  {
    id: 4,
    type: "mention",
    user: "Rohit",
    message: "mentioned you in a comment.",
    time: "3h",
    avatar: "https://i.pravatar.cc/150?img=10",
  },

  {
    id: 4,
    type: "mention",
    user: "Rohit",
    message: "mentioned you in a comment.",
    time: "3h",
    avatar: "https://i.pravatar.cc/150?img=10",
  },

  {
    id: 4,
    type: "mention",
    user: "Rohit",
    message: "mentioned you in a comment.",
    time: "3h",
    avatar: "https://i.pravatar.cc/150?img=10",
  },

  {
    id: 4,
    type: "mention",
    user: "Rohit",
    message: "mentioned you in a comment.",
    time: "3h",
    avatar: "https://i.pravatar.cc/150?img=10",
  },

  {
    id: 4,
    type: "mention",
    user: "Rohit",
    message: "mentioned you in a comment.",
    time: "3h",
    avatar: "https://i.pravatar.cc/150?img=10",
  },

  {
    id: 4,
    type: "mention",
    user: "Rohit",
    message: "mentioned you in a comment.",
    time: "3h",
    avatar: "https://i.pravatar.cc/150?img=10",
  },

  {
    id: 4,
    type: "mention",
    user: "Rohit",
    message: "mentioned you in a comment.",
    time: "3h",
    avatar: "https://i.pravatar.cc/150?img=10",
  },
];

const getIcon = (type) => {
  switch (type) {
    case "like":
      return <Heart className="text-red-500" size={22} />;

    case "comment":
      return <MessageCircle className="text-blue-500" size={22} />;

    case "follow":
      return <UserPlus className="text-green-500" size={22} />;

    default:
      return <AtSign className="text-yellow-400" size={22} />;
  }
};

const Notifications = () => {
  return (
    <div className="min-h-screen w-full bg-[#181818] text-white">
      {/* Header */}

      <div className="sticky top-0 bg-[#181818] border-b border-zinc-800 px-6 py-5 z-20">
        <h1 className="text-3xl font-bold">Notifications</h1>
      </div>

      {/* Notification List */}

      <div className="max-w-[90%] mx-auto p-4 space-y-4">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-[#222] hover:bg-[#2b2b2b] rounded-2xl p-4 transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.avatar}
                alt=""
                className="w-14 h-14 rounded-full"
              />

              <div>
                <p className="text-base">
                  <span className="font-semibold">{item.user}</span>{" "}
                  {item.message}
                </p>

                <p className="text-sm text-zinc-400 mt-1">{item.time} ago</p>
              </div>
            </div>

            <div>{getIcon(item.type)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
