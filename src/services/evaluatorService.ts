import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export interface EvaluationResult {
  score: number;
  feedback: string;
  neatness: number;
  accuracy: number;
  status: "approved" | "rejected";
}

export async function evaluateBuild(
  projectTitle: string,
  projectDesc: string,
  base64Image: string
): Promise<EvaluationResult> {
  const prompt = `
    You are the indifferently harsh AI Judge for ELECTROHUB. 
    Evaluate a physical hardware build based on the project description.
    
    Project: ${projectTitle}
    Description: ${projectDesc}
    
    Analyze the submitted image for:
    1. Accuracy (Is everything in the right place?)
    2. Neatness (Wiring, soldering, overall organization)
    3. Completeness (Are all major BOM components visible?)
    
    Return a JSON response ONLY with this format:
    {
      "score": number (0-100),
      "feedback": string (technical, cold, technician-core tone),
      "neatness": number (0-100),
      "accuracy": number (0-100),
      "status": "approved" | "rejected" (approved if score >= 40)
    }
  `;

  try {
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Image.split(",")[1], // Strip prefix if exists
          mimeType: "image/jpeg",
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();
    const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Evaluation failed:", error);
    return {
      score: 0,
      feedback: "ERROR: NEURAL_LINK_STABILITY_CRITICAL. AUDIT_FAILED.",
      neatness: 0,
      accuracy: 0,
      status: "rejected",
    };
  }
}
