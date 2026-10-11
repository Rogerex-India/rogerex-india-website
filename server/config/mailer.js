const nodemailer = require("nodemailer");

// Function to send emails with safe credential validation
const sendEmail = async (mailOptions) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("Email warning: EMAIL_USER or EMAIL_PASS not configured in environment.");
    return {
      success: false,
      error: new Error("EMAIL_USER or EMAIL_PASS environment variables are not configured on the server."),
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const result = await transporter.sendMail({
      from: process.env.EMAIL_FROM || `"Rogerex India" <${process.env.EMAIL_USER}>`,
      ...mailOptions,
    });

    return { success: true, result };
  } catch (error) {
    console.error("Email sending failed:", error.message);
    return { success: false, error };
  }
};

module.exports = { sendEmail };