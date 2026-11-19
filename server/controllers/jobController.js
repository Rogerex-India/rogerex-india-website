const Job = require("../models/Job");
const Settings = require("../models/Settings");

// @desc    Get active job openings for public Careers page
// @route   GET /api/jobs
// @access  Public
const getPublicJobs = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = { isCareerFormEnabled: true };
    }

    const jobs = await Job.find({ isActive: true }).sort({ order: 1, createdAt: 1 });

    return res.status(200).json({
      success: true,
      isCareerFormEnabled: settings.isCareerFormEnabled !== false,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.error("Get public jobs error:", error.message);
    // Fallback gracefully so page doesn't break
    return res.status(200).json({
      success: true,
      isCareerFormEnabled: true,
      count: 0,
      data: [],
      error: error.message,
    });
  }
};

// @desc    Get all job openings for Admin Dashboard (active & inactive)
// @route   GET /api/admin/jobs
// @access  Protected (Admin)
const getAdminJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ order: 1, createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.error("Get admin jobs error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch job openings.",
      error: error.message,
    });
  }
};

// @desc    Create new job opening
// @route   POST /api/admin/jobs
// @access  Protected (Admin)
const createJob = async (req, res) => {
  try {
    const { title, type, location, comp, description, isActive, order } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Job title is required.",
      });
    }

    const newJob = await Job.create({
      title: title.trim(),
      type: type ? type.trim() : "Full-time",
      location: location ? location.trim() : "Remote / India",
      comp: comp ? comp.trim() : "Competitive",
      description: description ? description.trim() : "",
      isActive: isActive !== undefined ? Boolean(isActive) : true,
      order: order ? Number(order) : 0,
    });

    return res.status(201).json({
      success: true,
      message: `Job opening "${newJob.title}" created successfully.`,
      data: newJob,
    });
  } catch (error) {
    console.error("Create job error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create job opening.",
    });
  }
};

// @desc    Update an existing job opening
// @route   PUT /api/admin/jobs/:id
// @access  Protected (Admin)
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, type, location, comp, description, isActive, order } = req.body;

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job opening not found.",
      });
    }

    if (title !== undefined) job.title = title.trim();
    if (type !== undefined) job.type = type.trim();
    if (location !== undefined) job.location = location.trim();
    if (comp !== undefined) job.comp = comp.trim();
    if (description !== undefined) job.description = description.trim();
    if (isActive !== undefined) job.isActive = Boolean(isActive);
    if (order !== undefined) job.order = Number(order);

    await job.save();

    return res.status(200).json({
      success: true,
      message: `Job opening "${job.title}" updated successfully.`,
      data: job,
    });
  } catch (error) {
    console.error("Update job error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update job opening.",
    });
  }
};

// @desc    Toggle active status of a job opening
// @route   PATCH /api/admin/jobs/:id/toggle
// @access  Protected (Admin)
const toggleJobStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job opening not found.",
      });
    }

    job.isActive = !job.isActive;
    await job.save();

    return res.status(200).json({
      success: true,
      message: `Job "${job.title}" is now ${job.isActive ? "Active (Open)" : "Closed"}.`,
      data: job,
    });
  } catch (error) {
    console.error("Toggle job status error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to toggle job status.",
    });
  }
};

// @desc    Delete a job opening
// @route   DELETE /api/admin/jobs/:id
// @access  Protected (Admin)
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByIdAndDelete(id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job opening not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Job opening "${job.title}" deleted successfully.`,
      data: { id },
    });
  } catch (error) {
    console.error("Delete job error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete job opening.",
    });
  }
};

module.exports = {
  getPublicJobs,
  getAdminJobs,
  createJob,
  updateJob,
  toggleJobStatus,
  deleteJob,
};

