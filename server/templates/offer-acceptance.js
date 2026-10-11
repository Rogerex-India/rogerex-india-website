const { renderEmailLayout } = require("./layout");

const offerAcceptanceTemplate = {
  id: "offer-acceptance",
  name: "Offer Acceptance Confirmation",
  defaultSubject: "Offer Acceptance Confirmed - Welcome to the Team at {{company}}!",
  description: "Confirm receipt of the applicant's acceptance of the internship offer.",
  recruitmentStatus: "Offer Accepted",
  requiredVars: ["name", "role"],
  optionalVars: ["company", "internshipStartDate"],
  render: ({ name, role, company = "Rogerex India", internshipStartDate = "Confirmed Start Date" }) => {
    const subject = `Offer Acceptance Confirmed - Welcome to the Team at ${company}!`;
    const bodyHtml = `
      <h2>Dear ${name},</h2>
      <p>Thank you for accepting our internship offer! We are thrilled to officially welcome you to <strong>${company}</strong> as a <strong>${role}</strong>.</p>
      
      <div class="info-box">
        <div class="info-row"><span class="info-label">Intern:</span> <span class="info-value">${name}</span></div>
        <div class="info-row"><span class="info-label">Role:</span> <span class="info-value">${role}</span></div>
        <div class="info-row"><span class="info-label">Official Start Date:</span> <span class="info-value" style="color: #10b981;">${internshipStartDate}</span></div>
        <div class="info-row"><span class="info-label">Company:</span> <span class="info-value">${company}</span></div>
      </div>

      <p><strong>Onboarding Information:</strong></p>
      <p>Ahead of your start date, our engineering manager and operations lead will connect with you to guide you through workspace setup (Slack, GitHub team access, and project briefing).</p>

      <p>If you need any accommodations or have questions prior to your start date, please do not hesitate to reach out to us.</p>

      <p style="margin-top: 32px;">Welcome aboard,<br><strong>People & Culture Team</strong><br>${company}</p>
    `;

    return {
      subject,
      html: renderEmailLayout({ title: subject, bodyHtml, company }),
    };
  },
};

module.exports = offerAcceptanceTemplate;
