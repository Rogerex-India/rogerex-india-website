const express = require("express");
const router = express.Router();
const {
  loginAdmin,
  getAllSubmissions,
  updateSubmissionStatus,
  deleteSubmission,
  changePassword,
  getCareers,
  getCareerById,
  updateCareerStatus,
  deleteCareer,
  getCareerEmailTemplates,
  previewCareerEmail,
  sendCareerEmail,
  getSettings,
  updateSettings,
} = require("../controllers/adminController");
const {
  getAdminJobs,
  createJob,
  updateJob,
  toggleJobStatus,
  deleteJob,
} = require("../controllers/jobController");
const { protectAdmin } = require("../middleware/authMiddleware");

// Public admin login
router.post("/login", loginAdmin);

// Protected admin routes — Contacts
router.get("/contacts", protectAdmin, getAllSubmissions);
router.patch("/contacts/:id", protectAdmin, updateSubmissionStatus);
router.delete("/contacts/:id", protectAdmin, deleteSubmission);
router.post("/change-password", protectAdmin, changePassword);

// Careers — Email Templates (MUST be before /:id routes to avoid Express shadowing)
router.get("/careers/email/templates", protectAdmin, getCareerEmailTemplates);

// Careers — List & CRUD
router.get("/careers", protectAdmin, getCareers);
router.get("/careers/:id", protectAdmin, getCareerById);
router.patch("/careers/:id", protectAdmin, updateCareerStatus);
router.delete("/careers/:id", protectAdmin, deleteCareer);

// Careers — Email Actions
router.post("/careers/:id/email/preview", protectAdmin, previewCareerEmail);
router.post("/careers/:id/email/send", protectAdmin, sendCareerEmail);

// Settings
router.get("/settings", protectAdmin, getSettings);
router.put("/settings", protectAdmin, updateSettings);

// Job Openings Management
router.get("/jobs", protectAdmin, getAdminJobs);
router.post("/jobs", protectAdmin, createJob);
router.put("/jobs/:id", protectAdmin, updateJob);
router.patch("/jobs/:id/toggle", protectAdmin, toggleJobStatus);
router.delete("/jobs/:id", protectAdmin, deleteJob);

module.exports = router;
