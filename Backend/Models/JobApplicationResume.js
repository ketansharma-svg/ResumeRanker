import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    resumeId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserResumes",
        required: true,
      },
    ],

    jobDescription: {
      type: String,
      required: true,
    },

    aiResult: {
      yearsOfExperience: Number,
      experienceLevel: {
        type: String,
        enum: ["fresher", "experienced"],
      },
      baseScore: Number,
      penaltyApplied: Boolean,
      finalScore: Number,
      reason: String,
    },
  },
  { timestamps: true }
);

let JobApplication = mongoose.model("JobApplication", jobApplicationSchema);
export default JobApplication