import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../config/socket";
import { setOnlineUsers } from "../redux/slices/socketSlice";

const SocketListener = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;

    socket.connect();

    socket.on("connect", () => {
      console.log("Socket Connected:", socket.id);
      socket.emit("addUser", user.id);
    });

    socket.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    return () => {
      socket.off("connect");
      socket.off("getOnlineUsers");
      socket.disconnect();
    };
  }, [user, dispatch]);

  return null;
};

export default SocketListener;
