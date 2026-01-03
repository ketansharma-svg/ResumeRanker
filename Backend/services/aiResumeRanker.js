import fetch from "node-fetch";
import "dotenv/config";

// --- Gemini v1 REST API call ---
async function callGemini(prompt) {
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) throw new Error("GEMINI_API_KEY not set");

  const url =
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro:generateContent?key=${API_KEY}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
  temperature: 0.2
}
    }),
  });

  const data = await response.json();
   console.log("data found",data)
  console.log("FULL GEMINI RESPONSE:", JSON.stringify(data, null, 2)); // 🔥 DEBUG

  // ✅ CORRECT PATH
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
}


// --- Rank resumes function ---
export async function rankAndSelectTopResumes(resumes = [], jobDescription, topK = 20) {
  if (!Array.isArray(resumes) || resumes.length === 0) return [];

  // console.log("AI Ranker started, resumes:", resumes,jobDescription);
   
  const results = [];
  
  for (const resume of resumes) {
    console.log("resumes All ",resume)  
    if (!resume.textContent || !resume.jobDescription) continue;

console.log("resume content",resume.jobDescription)
console.log("hey enjoy",resume.textContent)

    // --- Strict prompt for JSON output ---
    const prompt = `
You are an ATS (Applicant Tracking System).

Compare this resume with the job description.
Return ONLY valid JSON. Do not add extra text, explanations, or formatting. Example format:

{
  "overallScore": 0-100,
  "experienceLevel": "fresher or experienced",
  "yearsOfExperience": 0,
  "shortReason": ""
}

Resume:
${resume.textContent}

Job Description:
${jobDescription}
`;

    try {
      console.log("Calling Gemini AI...");
      const text = await callGemini(prompt);

     console.log("hello everyone",text)
      let aiOutput = {};
      const match = text.match(/\{[\s\S]*\}/); 
      if (match) {
        try {
          aiOutput = JSON.parse(match[0]);
        } catch {
          aiOutput = {
            overallScore: 0,
            experienceLevel: "fresher",
            yearsOfExperience: 0,
            shortReason: "AI returned invalid JSON",
          };
        }
      } else {
        aiOutput = {
          overallScore: 0,
          experienceLevel: "fresher",
          yearsOfExperience: 0,
          shortReason: "AI did not return JSON",
        };
      }

    
      resume.aiResult = [
        {
          yearsOfExperience: aiOutput.yearsOfExperience || 0,
          experienceLevel: aiOutput.experienceLevel || "fresher",
          baseScore: aiOutput.overallScore || 0,
          penaltyApplied: false,
          finalScore: aiOutput.overallScore || 0,
          reason: aiOutput.shortReason || "",
        },
      ];

      results.push({
        resumeId: resume._id,
        overallScore: aiOutput.overallScore || 0,
      });
    } catch (err) {
      console.error("AI Error:", err.message);

      resume.aiResult = [
        {
          yearsOfExperience: 0,
          experienceLevel: "fresher",
          baseScore: 0,
          penaltyApplied: true,
          finalScore: 0,
          reason: "AI parsing failed",
        },
      ];
    }
  }

 
  return results
    .sort((a, b) => b.overallScore - a.overallScore)
    .slice(0, topK);
}
