// const mongoose = require("mongoose");

// mongoose.connect("");

// const db = mongoose.connection;

// db.on("error", (err) => {
//   console.log(err);
// });

// db.on("open", () => {
//   console.log("Connected to db");
// });

// module.exports = db;

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
