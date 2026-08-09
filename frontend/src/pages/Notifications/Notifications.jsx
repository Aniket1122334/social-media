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
      return <Heart className="text-red-500" size={22} fill="currentColor" />;

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
    <div className="min-h-screen bg-black text-white">
      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main
        className="
          ml-20
          min-h-screen

          w-[calc(100vw-5rem)]

          px-4
          sm:px-6
          md:px-8
          lg:px-0

          py-6
          sm:py-8

          overflow-x-hidden
        "
      >
        {/* =================================================
            RESPONSIVE CONTAINER
        ================================================= */}

        <div
          className="
            mx-auto
            w-full

            lg:w-[80vw]

            max-w-275

            min-h-screen
          "
        >
          {/* =================================================
              HEADER
          ================================================= */}

          <div
            className="
              flex
              items-center
              justify-between

              mb-6
              sm:mb-8

              border-b
              border-zinc-800

              pb-5
            "
          >
            <div>
              <h1
                className="
                  text-2xl
                  sm:text-3xl
                  md:text-4xl
                  font-bold
                "
              >
                Notifications
              </h1>

              <p
                className="
                  text-sm
                  sm:text-base
                  text-zinc-500
                  mt-1
                "
              >
                Stay updated with your activity
              </p>
            </div>
          </div>

          {/* =================================================
              CONTENT
          ================================================= */}

          <div className="w-full">
            {/* ================= Loading ================= */}

            {loading ? (
              <div
                className="
                  flex
                  justify-center
                  items-center
                  h-[60vh]
                "
              >
                <p className="text-zinc-400 text-base sm:text-lg">
                  Loading notifications...
                </p>
              </div>
            ) : error ? (
              /* ================= Error ================= */

              <div
                className="
                  flex
                  justify-center
                  items-center
                  h-[60vh]
                  px-4
                  text-center
                "
              >
                <p className="text-red-500 text-base sm:text-lg">{error}</p>
              </div>
            ) : notifications.length === 0 ? (
              /* ================= Empty ================= */

              <div
                className="
                  flex
                  flex-col
                  items-center
                  justify-center

                  h-[60vh]

                  text-center
                  px-4
                "
              >
                <div
                  className="
                    w-16
                    h-16
                    sm:w-20
                    sm:h-20

                    rounded-full
                    border
                    border-zinc-700

                    flex
                    items-center
                    justify-center

                    mb-5
                  "
                >
                  <Heart size={30} className="text-zinc-500" />
                </div>

                <h2
                  className="
                    text-xl
                    sm:text-2xl
                    md:text-3xl
                    font-semibold
                    text-zinc-300
                  "
                >
                  No Notifications
                </h2>

                <p
                  className="
                    text-zinc-500
                    mt-2
                    sm:mt-3
                    text-sm
                    sm:text-base
                    md:text-lg
                  "
                >
                  You're all caught up 🎉
                </p>
              </div>
            ) : (
              /* ================= Notifications ================= */

              <div
                className="
                  space-y-3
                  sm:space-y-4

                  w-full
                "
              >
                {notifications.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => handleReadNotification(item)}
                    className={`
                      w-full

                      flex
                      items-center
                      justify-between

                      gap-3
                      sm:gap-4

                      rounded-xl
                      sm:rounded-2xl

                      p-3
                      sm:p-4
                      md:p-5

                      cursor-pointer

                      transition-all
                      duration-300

                      ${
                        item.isRead
                          ? "bg-[#222] hover:bg-[#2b2b2b]"
                          : "bg-[#2a2345] border border-violet-500 hover:bg-[#322952]"
                      }
                    `}
                  >
                    {/* ================= User Info ================= */}

                    <div
                      className="
                        flex
                        items-center

                        gap-3
                        sm:gap-4

                        min-w-0
                        flex-1
                      "
                    >
                      {/* Profile Picture */}

                      <img
                        src={
                          item.sender?.profilePicture ||
                          "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
                        }
                        alt={item.sender?.username || "User"}
                        className="
                          w-10
                          h-10

                          sm:w-12
                          sm:h-12

                          md:w-14
                          md:h-14

                          rounded-full
                          object-cover

                          shrink-0
                        "
                      />

                      {/* Message */}

                      <div className="min-w-0">
                        <p
                          className="
                            text-sm
                            sm:text-base

                            leading-5
                            sm:leading-6

                            wrap-break-word
                          "
                        >
                          <span className="font-semibold">
                            {item.sender?.username}
                          </span>{" "}
                          {getMessage(item)}
                        </p>

                        <p
                          className="
                            text-xs
                            sm:text-sm

                            text-zinc-400

                            mt-1
                          "
                        >
                          {formatTime(item.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* ================= Right Side ================= */}

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        sm:gap-3

                        shrink-0
                      "
                    >
                      {/* Unread Dot */}

                      {!item.isRead && (
                        <span
                          className="
                            w-2
                            h-2

                            sm:w-3
                            sm:h-3

                            rounded-full
                            bg-blue-500

                            shrink-0
                          "
                        />
                      )}

                      {/* Notification Icon */}

                      {getIcon(item.type)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notifications;
