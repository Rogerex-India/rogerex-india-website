const express = require("express");
const { submitCareer } = require("../controllers/careerController");
const Settings = require("../models/Settings");

const router = express.Router();

// Public endpoint to check if form is enabled
router.get("/status", async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.status(200).json({ success: true, isCareerFormEnabled: settings.isCareerFormEnabled });
  } catch (error) {
    res.status(500).json({ success: false, isCareerFormEnabled: false });
  }
});

// Careers Application submission endpoints
router.post("/careers/apply", submitCareer);
router.post("/careers", submitCareer);

module.exports = router;