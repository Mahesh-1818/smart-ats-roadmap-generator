const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME || "smart_ats",
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1); // Exit process — app cannot run without DB
  }
};

// Lifecycle event listeners (post-connect)
mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.info("MongoDB reconnected");
});

// Graceful shutdown on app termination
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.info("MongoDB connection closed due to app termination");
  process.exit(0);
});

module.exports = connectDB;