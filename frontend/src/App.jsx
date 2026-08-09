import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import VerifyOTP from "./pages/Auth/VerifyOTP";

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Search from "./pages/Search/Search";
import Explore from "./pages/Explore/Explore";
import Reels from "./pages/Reels/Reels";
import Messages from "./pages/Messages/Messages";
import Notifications from "./pages/Notifications/Notifications";
import Create from "./pages/Create/Create";
import EditProfile from "./pages/EditProfile/EditProfile";

import LeftSidebar from "./components/Home/LeftSidebar";

import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

import { fetchUser } from "./redux/slices/userSlice";
import { fetchAllNotifications } from "./redux/slices/notificationSlice";

import NotificationListener from "./listeners/NotificationListerner";
import MessageListener from "./listeners/MessageListener";
import SocketListener from "./listeners/SocketListener";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // =====================================================
  // Public Routes
  // =====================================================

  const publicRoutes = ["/login", "/signup", "/verify-otp"];

  const isPublicRoute = publicRoutes.includes(location.pathname);

  // =====================================================
  // Authentication Check
  // =====================================================

  useEffect(() => {
    // -----------------------------------------------
    // If user is NOT authenticated
    // -----------------------------------------------

    if (!isAuthenticated || !user) {
      // Public pages are allowed
      if (isPublicRoute) {
        return;
      }

      // All other pages require login
      navigate("/login");

      return;
    }

    // -----------------------------------------------
    // User is authenticated
    // -----------------------------------------------

    const token = localStorage.getItem("token");

    if (token) {
      dispatch(fetchUser());
      dispatch(fetchAllNotifications());
    }
  }, [isAuthenticated, user, dispatch, navigate, isPublicRoute]);

  // =====================================================
  // Sidebar
  // =====================================================

  const hideSidebar =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/verify-otp";

  return (
    <div className="min-h-screen bg-black">
      {/* =================================================
          SIDEBAR
      ================================================= */}

      {!hideSidebar && <LeftSidebar />}

      {/* =================================================
          ROUTES
      ================================================= */}

      <Routes>
        {/* ================= Auth ================= */}

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/verify-otp" element={<VerifyOTP />} />

        {/* ================= Main ================= */}

        <Route path="/" element={<Home />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/search" element={<Search />} />

        <Route path="/explore" element={<Explore />} />

        <Route path="/reels" element={<Reels />} />

        <Route path="/messages" element={<Messages />} />

        <Route path="/notifications" element={<Notifications />} />

        <Route path="/create" element={<Create />} />

        <Route path="/edit" element={<EditProfile />} />
      </Routes>

      {/* =================================================
          LISTENERS
      ================================================= */}

      {isAuthenticated && user && (
        <>
          <NotificationListener />
          <MessageListener />
          <SocketListener />
        </>
      )}

      {/* =================================================
          TOAST
      ================================================= */}

      <ToastContainer />
    </div>
  );
};

export default App;
