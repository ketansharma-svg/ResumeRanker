import UserResumes from "../Models/ResumeSchema.js";
import { extractText } from "../utils/extractText.js";
import { rankAndSelectTopResumes } from "../services/aiResumeRanker.js";

export async function Resumes(req, res) {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    if (!req.body.jobDescription) {
      return res.status(400).json({ message: "Job Description is required" });
    }

    let userResumesDoc = await UserResumes.findOne({ userId });

    if (!userResumesDoc) {
      userResumesDoc = new UserResumes({
        userId,
        resumes: [],
      });
    }

    const addedResumes = [];

    for (const file of req.files) {
      const textContent = await extractText(file);

      if (!textContent || !textContent.trim()) continue;

      const resumeObj = {
        fileName: file.originalname,
        fileType: file.mimetype.includes("pdf") ? "pdf" : "docx",
        fileSize: file.size,
        textContent: textContent.trim(),
        jobDescription: req.body.jobDescription, 
        aiResult: [], 
      };

      userResumesDoc.resumes.push(resumeObj);
      addedResumes.push(resumeObj);
    }

    await userResumesDoc.save();

    
 const loner=await  rankAndSelectTopResumes(
      
      userResumesDoc.resumes,
      userResumesDoc.jobDescription
    )
console.log("loner",loner)
    res.status(201).json({
      success: true,
      totalResumes: userResumesDoc.resumes.length,
      resumes: userResumesDoc.resumes,
    });
  } catch (err) {
    console.error("Resume Upload Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}