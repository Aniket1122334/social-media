import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { socket } from "../config/socket";
import { addNotification } from "../redux/slices/notificationSlice";

const NotificationListener = () => {
  const dispatch = useDispatch();

  // Listen for Notifications
  useEffect(() => {
    const handleNotification = (notification) => {
      dispatch(addNotification(notification));
    };

    socket.on("newNotification", handleNotification);

    return () => {
      socket.off("newNotification", handleNotification);
    };
  }, [dispatch]);

  return null;
};

export default NotificationListener;
