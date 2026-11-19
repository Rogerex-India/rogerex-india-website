const express = require("express");
const { submitCareer } = require("../controllers/careerController");
const { getPublicJobs } = require("../controllers/jobController");
const Settings = require("../models/Settings");
const Job = require("../models/Job");

const router = express.Router();

// Public endpoint to check form status and active jobs
router.get("/status", async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = { isCareerFormEnabled: true };
    }

    const activeJobs = await Job.find({ isActive: true }).sort({ order: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      isCareerFormEnabled: settings.isCareerFormEnabled !== false,
      activeJobsCount: activeJobs.length,
      jobs: activeJobs,
    });
  } catch (error) {
    console.error("Public /api/status error:", error.message);
    // Never falsely report form as closed on temporary DB reconnection/error
    res.status(200).json({
      success: true,
      isCareerFormEnabled: true,
      activeJobsCount: 0,
      jobs: [],
    });
  }
});

// Public job openings endpoint
router.get("/jobs", getPublicJobs);
router.get("/careers/openings", getPublicJobs);

// Careers Application submission endpoints
router.post("/careers/apply", submitCareer);
router.post("/careers", submitCareer);

module.exports = router;
