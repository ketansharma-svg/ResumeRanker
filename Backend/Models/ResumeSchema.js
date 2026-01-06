import mongoose from "mongoose";

const userResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resumes: [
      {
        fileName: { type: String, required: true },
        fileType: {
          type: String,
          enum: ["pdf", "docx"],
          required: true,
        },
        fileSize: { type: Number, required: true },
        textContent: { type: String, required: true },

        aiResult: [
          {
            yearsOfExperience: { type: Number, default: 0 },
            experienceLevel: {
              type: String,
              enum: ["fresher", "experienced"],
              default: "fresher",
            },
            baseScore: { type: Number, default: 0 },
          
            finalScore: { type: Number, default: 0 },
           

         
            matchedSkills: {
              type: [String],
              default: [],
            },
            missingSkills: {
              type: [String],
              default: [],
            },
          },
        ],

        jobDescription: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const UserResumes = mongoose.model("UserResumes", userResumeSchema);
export default UserResumes;
