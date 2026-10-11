const Career = require("../models/Career");
const {
  isValidEmail,
  isValidPhone,
  isFieldEmpty,
  isValidUrl,
  isValidGraduationYear,
} = require("../middleware/validation");

// @desc    Submit career application
// @route   POST /api/careers/apply or POST /api/careers
// @access  Public
const submitCareer = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      college,
      degree,
      graduationYear,
      role,
      linkedin,
      github,
      coverLetter,
    } = req.body;

    // Validate required text fields
    if (isFieldEmpty(name)) {
      return res.status(400).json({
        success: false,
        message: "Full name is required.",
      });
    }

    if (isFieldEmpty(email)) {
      return res.status(400).json({
        success: false,
        message: "Email address is required.",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    if (isFieldEmpty(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required.",
      });
    }

    if (!isValidPhone(phone)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid phone number (10-13 digits).",
      });
    }

    if (isFieldEmpty(college)) {
      return res.status(400).json({
        success: false,
        message: "College or university is required.",
      });
    }

    if (isFieldEmpty(degree)) {
      return res.status(400).json({
        success: false,
        message: "Degree is required.",
      });
    }

    if (isFieldEmpty(graduationYear) || !isValidGraduationYear(graduationYear)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid graduation year (between 2015 and 2035).",
      });
    }

    if (isFieldEmpty(role)) {
      return res.status(400).json({
        success: false,
        message: "Applied role is required.",
      });
    }

    // Validate optional URLs if provided
    if (linkedin && !isValidUrl(linkedin)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid LinkedIn profile URL.",
      });
    }

    if (github && !isValidUrl(github)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid GitHub profile URL.",
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanRole = role.trim();

    // Duplicate check: Prevent repeated submissions for the exact same role within 24 hours
    const recentDuplicate = await Career.findOne({
      email: cleanEmail,
      role: cleanRole,
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });

    if (recentDuplicate) {
      return res.status(400).json({
        success: false,
        message: `An application with this email for "${cleanRole}" has already been submitted recently.`,
      });
    }

    // Save to MongoDB with server-controlled initial values
    const newApplication = await Career.create({
      name: name.trim(),
      email: cleanEmail,
      phone: phone.trim(),
      college: college.trim(),
      degree: degree.trim(),
      graduationYear: Number(graduationYear),
      role: cleanRole,
      linkedin: linkedin ? linkedin.trim() : "",
      github: github ? github.trim() : "",
      coverLetter: coverLetter ? coverLetter.trim() : "",
      status: "Application Received",
      appliedAt: new Date(),
      notes: "",
      communicationHistory: [],
      resumeUrl: null,
      resumePublicId: null,
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully.",
      data: {
        id: newApplication._id,
        name: newApplication.name,
        role: newApplication.role,
        status: newApplication.status,
        appliedAt: newApplication.appliedAt,
      },
    });
  } catch (error) {
    console.error("Career application submission error:", error.message);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while processing your application. Please try again later.",
    });
  }
};

module.exports = { submitCareer };