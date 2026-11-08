const nodemailer = require("nodemailer");

// Function to send emails with safe credential validation
const sendEmail = async (mailOptions) => {
  const emailUser = (process.env.EMAIL_USER || "").trim();
  const emailPass = (process.env.EMAIL_PASS || "").replace(/\s+/g, "");

  if (!emailUser || !emailPass) {
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
        user: emailUser,
        pass: emailPass,
      },
    });

    const fromAddress = process.env.EMAIL_FROM || `"Rogerex India" <${emailUser}>`;

    const result = await transporter.sendMail({
      from: fromAddress,
      ...mailOptions,
    });

    return { success: true, result };
  } catch (error) {
    console.error("Email sending failed:", error.message);
    return { success: false, error };
  }
};

module.exports = { sendEmail };