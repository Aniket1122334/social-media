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
} from "react-icons/ri";
import { Link } from "react-router-dom";

const menuItems = [
  { id: 1, link: "/", title: "Home", icon: <RiHome5Line size={26} /> },
  { id: 2, link: "/search", title: "Search", icon: <RiSearchLine size={26} /> },
  {
    id: 3,
    link: "/explore",
    title: "Explore",
    icon: <RiCompass3Line size={26} />,
  },
  { id: 4, link: "/reels", title: "Reels", icon: <RiMovieLine size={26} /> },
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
  { id: 7, link: "/create", title: "Create", icon: <RiAddBoxLine size={26} /> },
  {
    id: 8,
    link: "/profile",
    title: "Profile",
    icon: <RiUser3Line size={26} />,
  },
];

const LeftSidebar = ({ isMobile = false }) => {
  return (
    <aside
      className={`h-screen ${!isMobile ? "w-72" : "w-25"} bg-[#0f0f0f] border-r border-zinc-800 sticky top-0`}
    >
      <div className="flex flex-col h-full p-5">
        {/* Logo */}

        <div className="mb-10">
          {!isMobile ? (
            <h1 className="text-3xl font-bold text-white">InstaHype</h1>
          ) : (
            <h1 className="text-sm font-bold text-white">InstaHype</h1>
          )}
        </div>

        {/* Menu */}

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <Link to={item.link}>
              {" "}
              <button
                key={item.id}
                className="w-full flex items-center gap-5 px-4 py-4 rounded-xl hover:bg-zinc-900 transition"
              >
                <span className="text-white">{item.icon}</span>

                {!isMobile ? (
                  <span className="text-lg text-white">{item.title}</span>
                ) : (
                  <span className="text-lg text-white hidden">
                    {item.title}
                  </span>
                )}
              </button>
            </Link>
          ))}
        </nav>

        {/* Bottom */}

        <button className="flex items-center gap-5 px-4 py-4 rounded-xl hover:bg-zinc-900 transition">
          <RiMenuLine size={26} className="text-white" />

          {!isMobile ? (
            <span className="text-lg text-white">More</span>
          ) : (
            <span className="text-lg text-white hidden">More</span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default LeftSidebar;
