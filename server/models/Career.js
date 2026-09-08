const mongoose = require("mongoose");

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
    role: {
      type: String,
      required: [true, "Applied Role is required"],
      trim: true,
    },
    coverLetter: {
      type: String,
      required: [true, "Cover Letter is required"],
      trim: true,
    },
    resumeUrl: {
      type: String,
      required: [true, "Resume URL is required"],
    },
    resumePublicId: {
      type: String,
      required: [true, "Resume Public ID is required for deletion"],
    },
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Rejected"],
      default: "Pending",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Career", careerSchema);
