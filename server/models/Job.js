const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Job type is required"],
      trim: true,
      default: "Full-time",
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      default: "Remote / India",
    },
    comp: {
      type: String,
      trim: true,
      default: "Competitive",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Helper to seed initial default jobs if none exist
jobSchema.statics.seedDefaultJobs = async function () {
  try {
    const count = await this.countDocuments();
    if (count === 0) {
      const defaultJobs = [
        {
          title: "Frontend Developer",
          type: "Full-time",
          location: "Remote / India",
          comp: "Competitive",
          description: "Build high-performance, responsive React web applications.",
          isActive: true,
          order: 1,
        },
        {
          title: "UI Designer",
          type: "Full-time",
          location: "Remote",
          comp: "Performance Based",
          description: "Design intuitive interfaces, interactive prototypes, and design systems.",
          isActive: true,
          order: 2,
        },
        {
          title: "Backend Engineer",
          type: "Full-time",
          location: "Hub (Gurgaon)",
          comp: "High-Growth",
          description: "Develop scalable Node.js microservices, APIs, and database architectures.",
          isActive: true,
          order: 3,
        },
        {
          title: "Intern",
          type: "6 Months",
          location: "Remote",
          comp: "PPO Potential",
          description: "Hands-on engineering internship with mentorship and full-time conversion opportunities.",
          isActive: true,
          order: 4,
        },
      ];
      await this.insertMany(defaultJobs);
      console.log("Seeded 4 default job openings into database.");
    }
  } catch (error) {
    console.warn("Could not seed default jobs:", error.message);
  }
};

module.exports = mongoose.model("Job", jobSchema);

