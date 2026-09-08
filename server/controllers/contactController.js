const Contact = require("../models/Contact");
const { isValidEmail, isValidPhone, isFieldEmpty } = require("../middleware/validation");

const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate empty input fields
    if (
      isFieldEmpty(name) ||
      isFieldEmpty(email) ||
      isFieldEmpty(phone) ||
      isFieldEmpty(subject) ||
      isFieldEmpty(message)
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

    // Create contact entry directly in MongoDB
    const contactData = await Contact.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: contactData,
    });
  } catch (error) {
    console.error("Contact submission error:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while saving your message. Please try again later.",
    });
  }
};

module.exports = { submitContact };