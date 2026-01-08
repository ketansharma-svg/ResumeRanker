  import UserResumes from "../Models/ResumeSchema.js";
  import { extractText } from "../utils/extractText.js";
  import { rankAndSelectTopResumes } from "../services/aiResumeRanker.js";

  export async function Resumes(req, res) {
    console.log("idfhnuidshfsdhfud")
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

      // Fetch or create user resumes document
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
        console.log("resumeObj", resumeObj)



        userResumesDoc.resumes.push(resumeObj);
        addedResumes.push(resumeObj);
      }


      await userResumesDoc.save();

      console.log()
      const aiResults = await rankAndSelectTopResumes(
        userResumesDoc.resumes,
        req.body.jobDescription
      );

      // for (let i = 0; i < aiResults.length; i++) {
      //   addedResumes[i].aiResult = aiResults[i];
      // }

  
     aiResults.forEach((aiResult) => {
  const resume = userResumesDoc.resumes.find(
    (r) => r._id.toString() === aiResult.resumeId.toString()
  );
  if (resume) {
    resume.aiResult.push(aiResult);
  }
});

await userResumesDoc.save();


      // console.log("AI Results:", aiResults);
      return res.status(201).json({
        success: true,
        totalResumes: userResumesDoc.resumes.length,
        resumes: aiResults,
      });

    } catch (err) {
      console.error("Resume Upload Error:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

