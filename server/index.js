require("dotenv").config(); // MUST be first — loads all env vars before any module uses them
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { seedDefaultAdmin } = require("./controllers/adminController");

const app = express();

// Connect to MongoDB
connectDB().then(() => {
  seedDefaultAdmin();
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const contactRoutes = require("./routes/contactRoutes");
const careerRoutes = require("./routes/careerRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Routes
app.use("/api", contactRoutes);
app.use("/api", careerRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Rogerex India API Server is running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found." });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
