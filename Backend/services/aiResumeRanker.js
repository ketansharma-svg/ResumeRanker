import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function rankAndSelectTopResumes(applications,resumes, topK = 20) {
  const results = [];

  for (const app of resumes) {
    const prompt = `
You are an ATS (Applicant Tracking System).

Evaluate the resume against the job description.
Provide JSON only:

{
  "userId": "${applications.userId}",
  "resumeId": "${applications.resumeId[0]}",
  "overallScore": 0-100,
  "matchedSkills": [],
  "missingSkills": [],
  "shortReason": "",
  "experienceLevel": "fresher or experienced",
  "yearsOfExperience": 0
}

Resume:
${app.textContent}

Job Description:
${applications.jobDescription}
`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt,
      });

      const text = response.text;
      const aiOutput = JSON.parse(text);
      results.push(aiOutput);
    } catch (err) {
      results.push({
        userId: app.userId,
        resumeId: app.resumeId,
        overallScore: 0,
        matchedSkills: [],
        missingSkills: [],
        shortReason: "Invalid AI response",
        experienceLevel: "fresher",
        yearsOfExperience: 0,
      });
    }
  }

  results.sort((a, b) => b.overallScore - a.overallScore);
  return results.slice(0, topK);
}
