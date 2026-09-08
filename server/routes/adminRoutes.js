const express = require("express");
const router = express.Router();
const {
  loginAdmin,
  getAllSubmissions,
  updateSubmissionStatus,
  deleteSubmission,
  changePassword,
  getCareers,
  updateCareerStatus,
  deleteCareer,
  getSettings,
  updateSettings,
} = require("../controllers/adminController");
const { protectAdmin } = require("../middleware/authMiddleware");

// Public admin login
router.post("/login", loginAdmin);

// Protected admin routes
router.get("/contacts", protectAdmin, getAllSubmissions);
router.patch("/contacts/:id", protectAdmin, updateSubmissionStatus);
router.delete("/contacts/:id", protectAdmin, deleteSubmission);
router.post("/change-password", protectAdmin, changePassword);

// Careers
router.get("/careers", protectAdmin, getCareers);
router.patch("/careers/:id", protectAdmin, updateCareerStatus);
router.delete("/careers/:id", protectAdmin, deleteCareer);

// Settings
router.get("/settings", protectAdmin, getSettings);
router.put("/settings", protectAdmin, updateSettings);

module.exports = router;
