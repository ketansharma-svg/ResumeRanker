// controllers/resume.controller.js
import UserResumes from "../Models/ResumeSchema.js";
import { extractText } from "../utils/extractText.js";
import JobApplication from "../Models/JobApplicationResume.js"; 
import {rankAndSelectTopResumes} from "../services/aiResumeRanker.js"

export async function Resumes(req, res) {
  try {
    const user = req.userId;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

  //  console.log("Files received:", req.files);
    let userResumesDoc = await UserResumes.findOne({ userId: req.userId });

    if (!userResumesDoc) {
      userResumesDoc = new UserResumes({
        userId: req.userId,
        resumes: []
      });
    }


    let setvalue=new Set(req.files)
    // console.log("set Value",setvalue)
    for (const file of req.files) {
      const textContent = await extractText(file);
      //  console.log("Extracted Text Content:", textContent);
      if (!textContent || !textContent.trim()) {
        continue; 
      }

      userResumesDoc.resumes.push({
        fileName: file.originalname,
        fileType: file.mimetype.includes("pdf") ? "pdf" : "docx",
        fileSize: file.size,
        textContent: textContent.trim()
      });
    }
     await userResumesDoc.save();
    if(!req.body.textarea){
      return res.status(400).json({message:"Job Description is required"})
    }

   const jobApp= new JobApplication({
    userId:req.userId,
    resumeId:userResumesDoc._id,

    jobDescription:req.body.textarea
   })


     await jobApp.save()
console.log("jobApp",jobApp)
// console.log("job Applications", jobApp);
await rankAndSelectTopResumes(jobApp,userResumesDoc.resumes)
   

    res.status(201).json({
      success: true,
      totalResumes: userResumesDoc.resumes.length,
      resumes: userResumesDoc.resumes
    });
  } catch (err) {
    // console.error("Resume Upload Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
