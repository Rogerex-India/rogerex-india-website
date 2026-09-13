const Admin = require("../models/Admin");
const Contact = require("../models/Contact");
const Career = require("../models/Career");
const Settings = require("../models/Settings");
const cloudinary = require("../config/cloudinary");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "rogerex_secret_jwt_key_2026", {
    expiresIn: "7d",
  });
};

// Seed default admin if no admin exists
const seedDefaultAdmin = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      await Admin.create({
        name: "System Administrator",
        username: "admin",
        email: "admin@rogerex.com",
        password: "admin123", // Will be hashed automatically by pre-save hook
        role: "Super Admin",
      });
      console.log("Default admin account created: username: admin / password: admin123");
    }
  } catch (error) {
    console.error("Error seeding default admin:", error.message);
  }
};

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter both username and password.",
      });
    }

    const cleanUsername = username.trim().toLowerCase();

    // Find admin by username or email
    const admin = await Admin.findOne({
      $or: [{ username: cleanUsername }, { email: cleanUsername }],
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    // Match password using bcrypt
    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    const token = generateToken(admin._id);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error during authentication.",
    });
  }
};

// @desc    Get all contact submissions
// @route   GET /api/admin/contacts
// @access  Private (Admin)
const getAllSubmissions = async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    console.error("Get submissions error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch contact submissions.",
    });
  }
};

// @desc    Update submission status or notes
// @route   PATCH /api/admin/contacts/:id
// @access  Private (Admin)
const updateSubmissionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact submission not found.",
      });
    }

    if (status) contact.status = status;
    if (notes !== undefined) contact.notes = notes;

    await contact.save();

    return res.status(200).json({
      success: true,
      message: "Submission updated successfully.",
      data: contact,
    });
  } catch (error) {
    console.error("Update submission error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to update submission.",
    });
  }
};

// @desc    Delete submission
// @route   DELETE /api/admin/contacts/:id
// @access  Private (Admin)
const deleteSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact submission not found.",
      });
    }

    await contact.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Submission deleted successfully.",
    });
  } catch (error) {
    console.error("Delete submission error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to delete submission.",
    });
  }
};

// @desc    Change admin password
// @route   POST /api/admin/change-password
// @access  Private (Admin)
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Both current and new passwords are required.",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters long.",
      });
    }

    const admin = await Admin.findById(req.admin._id);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin account not found.",
      });
    }

    const isMatch = await admin.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect current password.",
      });
    }

    admin.password = newPassword;
    await admin.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.error("Change password error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to change password.",
    });
  }
};

// ---------------- CAREERS ---------------- //

// Get all career submissions
const getCareers = async (req, res) => {
  try {
    const careers = await Career.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: careers,
    });
  } catch (error) {
    console.error("Fetch careers error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch career applications.",
    });
  }
};

// Update career status or notes
const updateCareerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const career = await Career.findById(id);

    if (!career) {
      return res.status(404).json({ success: false, message: "Application not found." });
    }

    if (status) career.status = status;
    if (notes !== undefined) career.notes = notes;

    await career.save();

    return res.status(200).json({
      success: true,
      message: "Application updated successfully.",
      data: career,
    });
  } catch (error) {
    console.error("Update career error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to update application.",
    });
  }
};

// Delete career submission and remove resume from Cloudinary
const deleteCareer = async (req, res) => {
  try {
    const { id } = req.params;

    const career = await Career.findById(id);

    if (!career) {
      return res.status(404).json({ success: false, message: "Application not found." });
    }

    // Delete file from Cloudinary
    if (career.resumePublicId) {
      await cloudinary.uploader.destroy(career.resumePublicId);
    }

    await career.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Application deleted successfully.",
    });
  } catch (error) {
    console.error("Delete career error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to delete application.",
    });
  }
};

// ---------------- SETTINGS ---------------- //

// Get global settings (publicly accessible)
const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({}); // create default settings if none exist
    }
    return res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("Get settings error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch settings.",
    });
  }
};

// Update global settings (protected)
const updateSettings = async (req, res) => {
  try {
    const { isCareerFormEnabled } = req.body;
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }

    if (isCareerFormEnabled !== undefined) {
      settings.isCareerFormEnabled = isCareerFormEnabled;
    }

    await settings.save();

    return res.status(200).json({
      success: true,
      message: "Settings updated successfully.",
      data: settings,
    });
  } catch (error) {
    console.error("Update settings error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to update settings.",
    });
  }
};

module.exports = {
  loginAdmin,
  getAllSubmissions,
  updateSubmissionStatus,
  deleteSubmission,
  seedDefaultAdmin,
  changePassword,
  getCareers,
  updateCareerStatus,
  deleteCareer,
  getSettings,
  updateSettings,
};
