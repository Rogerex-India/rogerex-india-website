const express = require("express");
const { submitCareer } = require("../controllers/careerController");
const Settings = require("../models/Settings");
const upload = require("../middleware/upload");

const router = express.Router();

// Wrap multer so its errors are caught and returned as JSON (not Express default HTML)
const resumeUpload = (req, res, next) => {
  upload.single("resume")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};

// Public endpoint to check if form is enabled
router.get("/status", async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.status(200).json({ success: true, isCareerFormEnabled: settings.isCareerFormEnabled });
  } catch (error) {
    res.status(500).json({ success: false, isCareerFormEnabled: false }); // safe fallback
  }
});

router.post("/careers", resumeUpload, submitCareer);

module.exports = router;
