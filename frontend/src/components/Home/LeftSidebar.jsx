import {
  RiHome5Line,
  RiSearchLine,
  RiCompass3Line,
  RiMovieLine,
  RiMessengerLine,
  RiHeart3Line,
  RiAddBoxLine,
  RiUser3Line,
  RiMenuLine,
  RiLogoutBoxRLine,
} from "react-icons/ri";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "../../redux/slices/authSlice";

const menuItems = [
  {
    id: 1,
    link: "/",
    title: "Home",
    icon: <RiHome5Line size={26} />,
  },
  {
    id: 2,
    link: "/search",
    title: "Search",
    icon: <RiSearchLine size={26} />,
  },
  {
    id: 3,
    link: "/explore",
    title: "Explore",
    icon: <RiCompass3Line size={26} />,
  },
  {
    id: 4,
    link: "/reels",
    title: "Reels",
    icon: <RiMovieLine size={26} />,
  },
  {
    id: 5,
    link: "/messages",
    title: "Messages",
    icon: <RiMessengerLine size={26} />,
  },
  {
    id: 6,
    link: "/notifications",
    title: "Notifications",
    icon: <RiHeart3Line size={26} />,
  },
  {
    id: 7,
    link: "/create",
    title: "Create",
    icon: <RiAddBoxLine size={26} />,
  },
  {
    id: 8,
    link: "/profile",
    title: "Profile",
    icon: <RiUser3Line size={26} />,
  },
];

const LeftSidebar = () => {
  const [showMore, setShowMore] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notificationSelector =
    useSelector((state) => state.notifications.notifications) || [];

  const unreadCount = notificationSelector.filter(
    (notification) => !notification.isRead,
  ).length;

  const handleLogout = () => {
    dispatch(logout());
    setShowMore(false);
    navigate("/login");
  };

  return (
    <aside
      className={`
        group
        fixed
        left-0
        top-0
        h-screen
        bg-[#0f0f0f]
        border-r
        border-zinc-800
        transition-all
        duration-300
        ease-in-out
        overflow-visible
        z-50
        w-20 hover:w-64

      
      `}
    >
      {/* ================= Logo ================= */}

      <div className="h-24 flex items-center px-5">
        <Link to="/" className="flex items-center">
          <h1
            className="
              text-2xl
              font-bold
              text-white
              whitespace-nowrap
              opacity-0
              group-hover:opacity-100
              transition-opacity
              duration-200
            "
          >
            InstaHype
          </h1>

          {/* Small logo when collapsed */}
          <span
            className="
              absolute
              left-5
              text-xl
              font-bold
              text-white
              group-hover:opacity-0
              transition-opacity
              duration-200
            "
          >
            I
          </span>
        </Link>
      </div>

      {/* ================= Menu ================= */}

      <nav className="px-3 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            className="
              relative
              flex
              items-center
              gap-5
              w-full
              h-14
              px-3
              rounded-xl
              text-white
              hover:bg-zinc-900
              transition-colors
              duration-200
            "
          >
            {/* Icon */}
            <div className="relative min-w-8.5 flex items-center justify-center">
              {item.icon}

              {/* Notification Badge */}
              {item.title === "Notifications" && unreadCount > 0 && (
                <span
                  className="
                    absolute
                    -top-2
                    -right-2
                    min-w-4.75
                    h-4.75
                    px-1
                    rounded-full
                    bg-red-500
                    text-white
                    text-[10px]
                    font-semibold
                    flex
                    items-center
                    justify-center
                  "
                >
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </div>

            {/* Label */}
            <span
              className="
                text-[16px]
                font-medium
                whitespace-nowrap
                opacity-0
                -translate-x-2.5
                group-hover:opacity-100
                group-hover:translate-x-0
                transition-all
                duration-200
              "
            >
              {item.title}
            </span>
          </Link>
        ))}
      </nav>

      {/* ================= More Button ================= */}

      <div className="absolute bottom-5 left-0 w-full px-3">
        <button
          onClick={() => setShowMore((prev) => !prev)}
          className="
            relative
            flex
            items-center
            gap-5
            w-full
            h-14
            px-3
            rounded-xl
            text-white
            hover:bg-zinc-900
            transition-colors
          "
        >
          <div className="min-w-8.5 flex justify-center">
            <RiMenuLine size={26} />
          </div>

          <span
            className="
              text-[16px]
              font-medium
              whitespace-nowrap
              opacity-0
              -translate-x-2.5
              group-hover:opacity-100
              group-hover:translate-x-0
              transition-all
              duration-200
            "
          >
            More
          </span>
        </button>

        {/* ================= More Dropdown ================= */}

        {showMore && (
          <div
            className="
              absolute
              left-3
              bottom-16
              w-56
              bg-zinc-900
              border
              border-zinc-700
              rounded-xl
              shadow-2xl
              p-2
            "
          >
            <button
              onClick={handleLogout}
              className="
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-lg
                text-red-400
                hover:bg-zinc-800
                transition
              "
            >
              <RiLogoutBoxRLine size={22} />

              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default LeftSidebar;
