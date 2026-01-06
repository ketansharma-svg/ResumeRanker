import Groq from "groq-sdk";
import "dotenv/config";
import UserResumes from "../Models/ResumeSchema.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function rankAndSelectTopResumes(
  resumes = [],
  jobDescription,
  topK = 20
) {
  if (!Array.isArray(resumes) || resumes.length === 0) return [];

  const results = [];
  for (const resume of resumes) {
    if (!resume.textContent || !resume.jobDescription) continue;
    console.log("resume",resume)

    const prompt = `
You are an ATS (Applicant Tracking System).

Compare the resume with the job description.
Return ONLY valid JSON (no markdown, no explanation).

{
   "resume_id":"string"
   "ApplyerName": "string",
   "overallScore": 0-100,
   "experienceLevel": "fresher or experienced",
   "yearsOfExperience": number,
   "shortReason": "string",
   "matchedSkills": [],
   "missingSkills": []
}

Resume:
${resume.textContent}

Job Description:
${resume.jobDescription}
`;

    try {
      const completion = await groq.chat.completions.create({
        model: "groq/compound-mini",
        messages: [
          {
            role: "system",
            content: "Return ONLY valid JSON. No explanation, no markdown."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0,
      });

      const raw = completion.choices[0]?.message?.content || "{}";
      console.log("raw", raw);

      let aiOutput;
      try {
        aiOutput = JSON.parse(raw);
      } catch {
        aiOutput = {
          resume_id:resume._id,
          ApplyerName: resume.ApplyerName || "Unknown",
          overallScore: 0,
          experienceLevel: "fresher",
          yearsOfExperience: 0,
          shortReason: "Invalid JSON from AI",
          matchedSkills: [],
          missingSkills: []
        };
      }

      results.push({
        resumeId: resume._id,
        fileName: resume.fileName,
        finalScore: aiOutput.overallScore || 0,
        yearsOfExperience: aiOutput.yearsOfExperience || 0,
        experienceLevel: aiOutput.experienceLevel || "fresher",
        matchedSkills: aiOutput.matchedSkills || [],
        missingSkills: aiOutput.missingSkills || []
      });

    } catch (err) {
      console.error("Groq error:", err.message);
    }
  }

  return results
    .sort((a, b) => b.finalScore - a.finalScore)
    .slice(0, topK);
}
