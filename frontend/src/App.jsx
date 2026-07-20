import Login from "./pages/Auth/Login";
import { Routes, Route, useLocation } from "react-router-dom";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Search from "./pages/Search/Search";
import LeftSidebar from "./components/Home/LeftSidebar";
import { useEffect, useState } from "react";
import Explore from "./pages/Explore/Explore";
import Reels from "./pages/Reels/Reels";
import Messages from "./pages/Messages/Messages";
import Notifications from "./pages/Notifications/Notifications";
import Create from "./pages/Create/Create";
import VerifyOTP from "./pages/Auth/VerifyOTP";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./redux/slices/userSlice";
import NotificationListerner from "./listeners/NotificationListerner";
import { fetchAllNotifications } from "./redux/slices/notificationSlice";
import { socket } from "./config/socket";

const App = () => {
  const [isMobile, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Socket Connect
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const token = localStorage.getItem("token");

    if (token) {
      dispatch(fetchUser());
      dispatch(fetchAllNotifications());
    }

    socket.connect();

    socket.on("connect", () => {
      socket.emit("addUser", user.id);
    });

    return () => {
      socket.off("connect");
    };
  }, [isAuthenticated, user, dispatch]);

  const location = useLocation();

  const hideSidebar =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/verify-otp";

  return (
    <div className="justify-between flex bg-black">
      <NotificationListerner />
      {!hideSidebar && (
        <div className="leftSidebar sticky top-0 h-screen">
          <LeftSidebar isMobile={isMobile} />
        </div>
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/reels" element={<Reels />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/create" element={<Create />} />
      </Routes>

      <ToastContainer />
    </div>
  );
};

export default App;
