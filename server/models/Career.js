const mongoose = require("mongoose");

const communicationHistorySchema = new mongoose.Schema(
  {
    templateType: {
      type: String,
      required: true,
    },
    recipient: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    subject: {
      type: String,
      required: true,
    },
    sentAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Sent", "Failed"],
      default: "Sent",
    },
    relatedRecruitmentStatus: {
      type: String,
      default: "",
    },
    renderedContent: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: null,
    },
  },
  { _id: true }
);

const careerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    college: {
      type: String,
      required: [true, "College is required"],
      trim: true,
    },
    degree: {
      type: String,
      required: [true, "Degree is required"],
      trim: true,
    },
    graduationYear: {
      type: Number,
      required: [true, "Graduation Year is required"],
    },
    role: {
      type: String,
      required: [true, "Applied Role is required"],
      trim: true,
    },
    linkedin: {
      type: String,
      default: "",
      trim: true,
    },
    github: {
      type: String,
      default: "",
      trim: true,
    },
    coverLetter: {
      type: String,
      default: "",
      trim: true,
    },
    resumeUrl: {
      type: String,
      default: null,
    },
    resumePublicId: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: [
        "Application Received",
        "Shortlisted",
        "Rejected",
        "Project Details Requested",
        "Project Submission Instructions Sent",
        "Project Submitted",
        "Internship Offer Sent",
        "Offer Accepted",
        "Internship Completed",
        "Pending",
        "Reviewed",
      ],
      default: "Application Received",
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      default: "",
    },
    communicationHistory: {
      type: [communicationHistorySchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Career", careerSchema);
