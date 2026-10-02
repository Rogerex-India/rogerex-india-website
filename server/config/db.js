const mongoose = require("mongoose");
const dns = require("node:dns");

// Set public DNS servers to resolve MongoDB Atlas SRV records reliably on Windows
try {
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch (err) {
  console.log("DNS setServers warning:", err.message);
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,  // 30s to find a primary
      socketTimeoutMS: 45000,           // 45s socket idle timeout
      connectTimeoutMS: 30000,          // 30s to establish connection
      heartbeatFrequencyMS: 10000,      // ping server every 10s to keep alive
      maxPoolSize: 10,
      family: 4,                        // force IPv4 — avoids Windows IPv6 issues
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Auto-reconnect on disconnect
    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️  MongoDB disconnected. Attempting reconnect...");
      setTimeout(connectDB, 5000);
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err.message);
    });

  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
