const { renderEmailLayout } = require("./layout");

const rejectionTemplate = {
  id: "rejection",
  name: "Rejection",
  defaultSubject: "Update regarding your application for {{role}} at {{company}}",
  description: "Politely communicate that the application has not been selected.",
  recruitmentStatus: "Rejected",
  requiredVars: ["name", "role"],
  optionalVars: ["company"],
  render: ({ name, role, company = "Rogerex India" }) => {
    const subject = `Update regarding your application for ${role} at ${company}`;
    const bodyHtml = `
      <h2>Dear ${name},</h2>
      <p>Thank you for taking the time to apply for the <strong>${role}</strong> position at <strong>${company}</strong> and for sharing your details with our team.</p>
      
      <p>After careful evaluation of all applications, we regret to inform you that we will not be moving forward with your candidacy for this role at this time.</p>
      
      <p>We received an overwhelming number of highly qualified applicants, making our selection process very competitive. Please rest assured that this decision does not reflect negatively upon your potential.</p>
      
      <p>We will retain your resume and profile in our talent directory and will reach out if a future opportunity matching your skillset opens up.</p>
      
      <p>We sincerely appreciate your interest in ${company} and wish you the very best in your academic and professional endeavors.</p>

      <p style="margin-top: 32px;">Sincerely,<br><strong>Talent Acquisition Team</strong><br>${company}</p>
    `;

    return {
      subject,
      html: renderEmailLayout({ title: subject, bodyHtml, company }),
    };
  },
};

module.exports = rejectionTemplate;
