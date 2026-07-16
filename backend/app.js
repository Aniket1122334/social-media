const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/mongoose");
const app = express();
const authMiddleware = require("./middlewares/authMiddleware");

// * routes
const authRoute = require("./routes/authRoute/authRoute");
const profileRoute = require("./routes/profileRoute/profileRoute");
const postRoute = require("./routes/postRoutes/postRoutes");
const commentRoute = require("./routes/commentRoute/commentRoute");
const notificationRoute = require("./routes/notificationRoute/notificationRoute");
const followUserRoute = require("./routes/followerRoute/followerRoute");

// * connect db
connectDb();

//! middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

//routes

// authentication
app.use("/api/auth", authRoute);

// profile
app.use("/api/profile", authMiddleware, profileRoute);

// posts
app.use("/api/post", postRoute);

// comments
app.use("/api/comments", authMiddleware, commentRoute);

// follower
app.use("/api/follow", authMiddleware, followUserRoute);

// notifications
// app.use("/api/notification", authMiddleware, notificationRoute);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Everything is working fine");
});
