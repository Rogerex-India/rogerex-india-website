const { renderEmailLayout } = require("./layout");

const shortlistTemplate = {
  id: "shortlist",
  name: "Shortlist",
  defaultSubject: "Congratulations! Your application has been shortlisted for {{role}} at {{company}}",
  description: "Confirm that the application has been shortlisted and explain the next steps.",
  recruitmentStatus: "Shortlisted",
  requiredVars: ["name", "role"],
  optionalVars: ["company"],
  render: ({ name, role, company = "Rogerex India" }) => {
    const subject = `Congratulations! Your application has been shortlisted for ${role} at ${company}`;
    const bodyHtml = `
      <h2>Dear ${name},</h2>
      <p>Thank you for your interest in joining <strong>${company}</strong>. We have reviewed your application for the <strong>${role}</strong> role and were genuinely impressed by your academic background and profile.</p>
      
      <div class="info-box">
        <div class="info-row"><span class="info-label">Candidate:</span> <span class="info-value">${name}</span></div>
        <div class="info-row"><span class="info-label">Role:</span> <span class="info-value">${role}</span></div>
        <div class="info-row"><span class="info-label">Status:</span> <span class="info-value" style="color: #60a5fa;">Shortlisted</span></div>
      </div>

      <p><strong>Next Steps:</strong></p>
      <p>Our technical team is currently preparing the next assessment stage. You will receive an invitation containing project details or interview scheduling guidelines shortly.</p>
      <p>Please ensure you regularly monitor your inbox for updates.</p>

      <p style="margin-top: 32px;">Warm regards,<br><strong>Talent Acquisition Team</strong><br>${company}</p>
    `;

    return {
      subject,
      html: renderEmailLayout({ title: subject, bodyHtml, company }),
    };
  },
};

module.exports = shortlistTemplate;
