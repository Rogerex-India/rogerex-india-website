const { renderEmailLayout } = require("./layout");

const completionTemplate = {
  id: "completion",
  name: "Internship Completion",
  defaultSubject: "Congratulations on Completing Your Internship at {{company}}!",
  description: "Congratulate the intern on completing the internship and provide relevant next steps.",
  recruitmentStatus: "Internship Completed",
  requiredVars: ["name", "role"],
  optionalVars: ["company"],
  render: ({ name, role, company = "Rogerex India" }) => {
    const subject = `Congratulations on Completing Your Internship at ${company}!`;
    const bodyHtml = `
      <h2>Dear ${name},</h2>
      <p>Congratulations on successfully concluding your internship as a <strong>${role}</strong> at <strong>${company}</strong>!</p>
      
      <div class="info-box">
        <div class="info-row"><span class="info-label">Candidate Name:</span> <span class="info-value">${name}</span></div>
        <div class="info-row"><span class="info-label">Completed Role:</span> <span class="info-value">${role}</span></div>
        <div class="info-row"><span class="info-label">Status:</span> <span class="info-value" style="color: #10b981;">Internship Completed</span></div>
      </div>

      <p>During your tenure with us, your curiosity, problem-solving mindset, and dedication made a lasting contribution to our development initiatives. Working alongside you has been a pleasure for the entire team.</p>

      <p><strong>Next Steps:</strong></p>
      <ul>
        <li>Your official Certificate of Internship Completion and formal Letter of Recommendation are being processed and will be dispatched to your email address shortly.</li>
        <li>We encourage you to list your experience on LinkedIn and tag <strong>${company}</strong>. We will happily endorse your skills and contributions.</li>
      </ul>

      <p>We wish you remarkable success in all your future endeavors, and remember that our doors will always remain open to you!</p>

      <p style="margin-top: 32px;">Warm regards,<br><strong>Leadership Team</strong><br>${company}</p>
    `;

    return {
      subject,
      html: renderEmailLayout({ title: subject, bodyHtml, company }),
    };
  },
};

module.exports = completionTemplate;
