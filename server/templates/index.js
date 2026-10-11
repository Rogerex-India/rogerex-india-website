const shortlist = require("./shortlist");
const rejection = require("./rejection");
const projectDetailsRequest = require("./project-details-request");
const projectSubmission = require("./project-submission");
const offerLetter = require("./offer-letter");
const offerAcceptance = require("./offer-acceptance");
const completion = require("./completion");

const templates = {
  shortlist,
  rejection,
  "project-details-request": projectDetailsRequest,
  "project-submission": projectSubmission,
  "offer-letter": offerLetter,
  "offer-acceptance": offerAcceptance,
  completion,
};

const getTemplateList = () => {
  return Object.values(templates).map((t) => ({
    id: t.id,
    name: t.name,
    defaultSubject: t.defaultSubject,
    description: t.description,
    recruitmentStatus: t.recruitmentStatus,
    requiredVars: t.requiredVars,
    optionalVars: t.optionalVars,
  }));
};

const getTemplate = (id) => {
  return templates[id] || null;
};

const renderTemplate = (id, variables = {}) => {
  const template = getTemplate(id);
  if (!template) {
    throw new Error(`Email template "${id}" not found.`);
  }

  // Fallback defaults
  const mergedVars = {
    company: "Rogerex India",
    ...variables,
  };

  return {
    templateId: template.id,
    templateName: template.name,
    recruitmentStatus: template.recruitmentStatus,
    ...template.render(mergedVars),
  };
};

module.exports = {
  templates,
  getTemplateList,
  getTemplate,
  renderTemplate,
};
