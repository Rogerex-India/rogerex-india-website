// Simple email validation
const isValidEmail = (email) => {
  if (typeof email !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

// Simple phone validation (10-13 digits, allow +, -, spaces)
const isValidPhone = (phone) => {
  if (typeof phone !== "string") return false;
  const cleaned = phone.replace(/[\s\-]/g, "");
  const phoneRegex = /^\+?\d{10,13}$/;
  return phoneRegex.test(cleaned);
};

// Trim and check if field is empty
const isFieldEmpty = (field) => {
  return field === undefined || field === null || String(field).trim() === "";
};

// URL validation for optional social profiles
const isValidUrl = (url) => {
  if (!url || typeof url !== "string" || url.trim() === "") return true; // optional
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

// Graduation year validation (reasonable range 2015 - 2035)
const isValidGraduationYear = (year) => {
  const num = Number(year);
  return Number.isInteger(num) && num >= 2015 && num <= 2035;
};

module.exports = {
  isValidEmail,
  isValidPhone,
  isFieldEmpty,
  isValidUrl,
  isValidGraduationYear,
};