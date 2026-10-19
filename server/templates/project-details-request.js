const { renderEmailLayout } = require("./layout");

const projectDetailsRequestTemplate = {
  id: "project-details-request",
  name: "Project Details Request",
  defaultSubject: "Action Required: Project Details for {{role}} Application - {{company}}",
  description: "Request the additional project details required for evaluation.",
  recruitmentStatus: "Project Details Requested",
  requiredVars: ["name", "role"],
  optionalVars: ["company", "projectName", "deadline"],
  render: ({ name, role, company = "Rogerex India", projectName = "Technical Portfolio Assessment", deadline = "within 48 hours" }) => {
    const subject = `Action Required: Project Details for ${role} Application - ${company}`;
    const bodyHtml = `
      <h2>Dear ${name},</h2>
      <p>As part of the evaluation process for the <strong>${role}</strong> role at <strong>${company}</strong>, our engineering leadership team would like to review detailed information about your past technical projects.</p>
      
      <div class="info-box">
        <div class="info-row"><span class="info-label">Candidate:</span> <span class="info-value">${name}</span></div>
        <div class="info-row"><span class="info-label">Role:</span> <span class="info-value">${role}</span></div>
        <div class="info-row"><span class="info-label">Requested Project / Topic:</span> <span class="info-value">${projectName}</span></div>
        <div class="info-row"><span class="info-label">Submission Deadline:</span> <span class="info-value" style="color: #f59e0b;">${deadline}</span></div>
      </div>

      <p><strong>Please reply to this email with:</strong></p>
      <ul>
        <li>Links to 1-2 key GitHub repositories showcasing your best code.</li>
        <li>Live deployed URLs (if available) for interactive demo review.</li>
        <li>A brief summary explaining the tech stack, architecture, and your specific role in building them.</li>
      </ul>

      <p>Please submit these details by <strong>${deadline}</strong> so we can progress your application.</p>

      <p style="margin-top: 32px;">Best regards,<br><strong>Engineering Hiring Committee</strong><br>${company}</p>
    `;

    return {
      subject,
      html: renderEmailLayout({ title: subject, bodyHtml, company }),
    };
  },
};

module.exports = projectDetailsRequestTemplate;
