const Career = require("../models/Career");
const cloudinary = require("../config/cloudinary");
const { isValidEmail, isValidPhone, isFieldEmpty } = require("../middleware/validation");

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

    // // Validate resume file (disabled — file upload temporarily commented out)
    // if (!req.file) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Resume file is required. Please upload a PDF or Word document.",
    //   });
    // }

    // Trim strings for safety
    const trimmedData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      college: college.trim(),
      role: role.trim(),
      coverLetter: coverLetter.trim(),
    };

    // // Upload to Cloudinary using Base64 Data URI (temporarily disabled)
    // let cloudinaryResult;
    // try {
    //   const b64 = Buffer.from(req.file.buffer).toString("base64");
    //   const dataURI = `data:${req.file.mimetype};base64,${b64}`;
    //
    //   cloudinaryResult = await cloudinary.uploader.upload(dataURI, {
    //     folder: "careers",
    //     resource_type: "auto",
    //     use_filename: true,
    //     unique_filename: true,
    //   });
    // } catch (cloudinaryError) {
    //   console.error("Cloudinary FULL ERROR:", {
    //     message: cloudinaryError?.message,
    //     http_code: cloudinaryError?.http_code,
    //     name: cloudinaryError?.name,
    //     error: cloudinaryError,
    //   });
    //
    //   return res.status(500).json({
    //     success: false,
    //     message: "Failed to upload resume.",
    //   });
    // }

    // Save to MongoDB (without resume URL for now)
    await Career.create({
      ...trimmedData,
      resumeUrl: null,
      resumePublicId: null,
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