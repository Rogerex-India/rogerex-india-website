const Career = require("../models/Career");
const cloudinary = require("../config/cloudinary");
const { isValidEmail, isValidPhone, isFieldEmpty } = require("../middleware/validation");
const streamifier = require("streamifier");

const submitCareer = async (req, res) => {
  try {
    const { name, email, phone, college, role, coverLetter } = req.body;

    // Validate all required text fields
    if (
      isFieldEmpty(name) ||
      isFieldEmpty(email) ||
      isFieldEmpty(phone) ||
      isFieldEmpty(college) ||
      isFieldEmpty(role) ||
      isFieldEmpty(coverLetter)
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Validate email format
    if (!isValidEmail(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format.",
      });
    }

    // Validate phone format
    if (!isValidPhone(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number.",
      });
    }

    // Validate resume file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required. Please upload a PDF or Word document.",
      });
    }

    // Trim strings for safety
    const trimmedData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      college: college.trim(),
      role: role.trim(),
      coverLetter: coverLetter.trim(),
    };

    // Upload to Cloudinary using streamifier
    const uploadFromBuffer = (req) => {
      return new Promise((resolve, reject) => {
        const cld_upload_stream = cloudinary.uploader.upload_stream(
          {
            folder: "careers",
            resource_type: "auto", // Let Cloudinary auto-detect (fixes 403 for PDFs on some accounts)
            use_filename: true,
            unique_filename: true,
          },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
      });
    };

    const cloudinaryResult = await uploadFromBuffer(req);

    // Save to MongoDB
    const newCareer = await Career.create({
      ...trimmedData,
      resumeUrl: cloudinaryResult.secure_url,
      resumePublicId: cloudinaryResult.public_id,
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully.",
    });
  } catch (error) {
    console.error("Career submission error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred. Please try again later.",
    });
  }
};

module.exports = { submitCareer };