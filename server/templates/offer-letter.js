const { renderEmailLayout } = require("./layout");

const offerLetterTemplate = {
  id: "offer-letter",
  name: "Offer Letter",
  defaultSubject: "Internship Offer: Welcome to {{company}}!",
  description: "Communicate the internship offer, role, start date, and next steps.",
  recruitmentStatus: "Internship Offer Sent",
  requiredVars: ["name", "role"],
  optionalVars: ["company", "internshipStartDate"],
  render: ({ name, role, company = "Rogerex India", internshipStartDate = "Immediate / To be coordinated" }) => {
    const subject = `Internship Offer: Welcome to ${company}!`;
    const bodyHtml = `
      <h2>Dear ${name},</h2>
      <p>We are delighted to extend an offer for the position of <strong>${role}</strong> at <strong>${company}</strong>!</p>
      
      <div class="info-box">
        <div class="info-row"><span class="info-label">Candidate Name:</span> <span class="info-value">${name}</span></div>
        <div class="info-row"><span class="info-label">Offered Role:</span> <span class="info-value">${role}</span></div>
        <div class="info-row"><span class="info-label">Tentative Start Date:</span> <span class="info-value" style="color: #10b981;">${internshipStartDate}</span></div>
        <div class="info-row"><span class="info-label">Organization:</span> <span class="info-value">${company}</span></div>
      </div>

      <p>Your demonstrated technical acumen, diligence, and enthusiasm during our assessment rounds were exceptional, and we believe you will make an impactful contribution to our ongoing client and internal projects.</p>

      <p><strong>Next Steps to Accept:</strong></p>
      <p>Please review this offer and confirm your acceptance by replying to this email within 48 hours. Upon receipt of your confirmation, our HR operations team will share onboarding formalities, documentation, and workspace invitations.</p>

      <p>Congratulations once again, and we eagerly look forward to collaborating with you!</p>

      <p style="margin-top: 32px;">Warm regards,<br><strong>Founding & Executive Team</strong><br>${company}</p>
    `;

    return {
      subject,
      html: renderEmailLayout({ title: subject, bodyHtml, company }),
    };
  },
};

module.exports = offerLetterTemplate;
