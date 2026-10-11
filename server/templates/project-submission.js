const { renderEmailLayout } = require("./layout");

const projectSubmissionTemplate = {
  id: "project-submission",
  name: "Project Submission Instructions",
  defaultSubject: "Technical Project Assignment Instructions - {{role}} - {{company}}",
  description: "Explain the project submission requirements, instructions, deadline, and submission method.",
  recruitmentStatus: "Project Submission Instructions Sent",
  requiredVars: ["name", "role"],
  optionalVars: ["company", "projectName", "deadline"],
  render: ({ name, role, company = "Rogerex India", projectName = "Practical Milestone Challenge", deadline = "within 3 days" }) => {
    const subject = `Technical Project Assignment Instructions - ${role} - ${company}`;
    const bodyHtml = `
      <h2>Dear ${name},</h2>
      <p>Congratulations on advancing to the practical technical assessment round for the <strong>${role}</strong> position at <strong>${company}</strong>!</p>
      
      <div class="info-box">
        <div class="info-row"><span class="info-label">Candidate:</span> <span class="info-value">${name}</span></div>
        <div class="info-row"><span class="info-label">Applied Role:</span> <span class="info-value">${role}</span></div>
        <div class="info-row"><span class="info-label">Project Assignment:</span> <span class="info-value">${projectName}</span></div>
        <div class="info-row"><span class="info-label">Final Deadline:</span> <span class="info-value" style="color: #f59e0b;">${deadline}</span></div>
      </div>

      <p><strong>Assignment Instructions & Guidelines:</strong></p>
      <ol style="padding-left: 20px;">
        <li><strong>Source Code:</strong> Develop the application following modern clean code best practices and push your repository to GitHub or GitLab.</li>
        <li><strong>Documentation:</strong> Include a comprehensive <code>README.md</code> explaining architecture, setup steps, environment configurations, and notable trade-offs.</li>
        <li><strong>Deployment:</strong> Provide a live demo URL hosted on Vercel, Netlify, Render, or any cloud platform of your preference.</li>
        <li><strong>Submission:</strong> Reply directly to this email with your repository link and live URL on or before <strong>${deadline}</strong>.</li>
      </ol>

      <p>If you encounter any blockers or have questions regarding requirements, feel free to reply to this email thread.</p>

      <p style="margin-top: 32px;">Happy coding!<br><strong>Technical Assessment Team</strong><br>${company}</p>
    `;

    return {
      subject,
      html: renderEmailLayout({ title: subject, bodyHtml, company }),
    };
  },
};

module.exports = projectSubmissionTemplate;
