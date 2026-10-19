// server/templates/layout.js
const renderEmailLayout = ({ title, bodyHtml, company = "Rogerex India" }) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #0b0e14;
      color: #e2e8f0;
      line-height: 1.6;
    }
    .wrapper {
      max-width: 600px;
      margin: 40px auto;
      background-color: #121824;
      border: 1px solid #1e293b;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
    }
    .header {
      background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
      padding: 32px 36px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      color: #ffffff;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    .header p {
      margin: 6px 0 0;
      color: #bfdbfe;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .content {
      padding: 36px;
      color: #cbd5e1;
      font-size: 15px;
    }
    .content h2 {
      margin-top: 0;
      color: #f8fafc;
      font-size: 20px;
      font-weight: 600;
    }
    .info-box {
      background-color: #1a2234;
      border-left: 4px solid #2563eb;
      border-radius: 8px;
      padding: 16px 20px;
      margin: 24px 0;
    }
    .info-row {
      margin: 6px 0;
      font-size: 14px;
    }
    .info-label {
      color: #94a3b8;
      font-weight: 600;
    }
    .info-value {
      color: #f1f5f9;
      font-weight: 500;
    }
    .footer {
      border-top: 1px solid #1e293b;
      padding: 24px 36px;
      text-align: center;
      font-size: 12px;
      color: #64748b;
      background-color: #0d121c;
    }
    .footer a {
      color: #3b82f6;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>${company}</h1>
      <p>Talent & Engineering Team</p>
    </div>
    <div class="content">
      ${bodyHtml}
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} ${company}. All rights reserved.</p>
      <p>This is an automated communication regarding your application at ${company}.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
};

module.exports = { renderEmailLayout };
