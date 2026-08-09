const dotenv = require("dotenv");
dotenv.config();

const http = require("http");
const express = require("express");
const cors = require("cors");

const connectDb = require("./config/mongoose");
const { initializeSocket } = require("./config/socket");

const authMiddleware = require("./middlewares/authMiddleware");

const authRoute = require("./routes/authRoute/authRoute");
const profileRoute = require("./routes/profileRoute/profileRoute");
const postRoute = require("./routes/postRoutes/postRoutes");
const commentRoute = require("./routes/commentRoute/commentRoute");
const notificationRoute = require("./routes/notificationRoute/notificationRoute");
const followUserRoute = require("./routes/followerRoute/followerRoute");
const messageRoute = require("./routes/messageRoute/messageRoute");

const app = express();
const server = http.createServer(app);

// Connect DB
connectDb();

// Initialize Socket.IO
initializeSocket(server);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "https://social-media-git-main-aniket1122334s-projects.vercel.app",
      "https://social-media-rczk4az7r-aniket1122334s-projects.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
// Routes
app.use("/api/auth", authRoute);
app.use("/api/profile", authMiddleware, profileRoute);
app.use("/api/post", authMiddleware, postRoute);
app.use("/api/comments", authMiddleware, commentRoute);
app.use("/api/follow", authMiddleware, followUserRoute);
app.use("/api/notification", authMiddleware, notificationRoute);
app.use("/api/message", authMiddleware, messageRoute);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
