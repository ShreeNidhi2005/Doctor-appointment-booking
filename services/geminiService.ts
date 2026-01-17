
import { GoogleGenAI, Type } from "@google/genai";
import { TriageResult } from "../types";

export const getAITriage = async (symptoms: string): Promise<TriageResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze these symptoms and provide medical triage advice. USER SYMPTOMS: ${symptoms}`,
    config: {
      systemInstruction: "You are a professional medical triage assistant. Your goal is to provide a structured, helpful assessment of user symptoms. Always include a disclaimer that you are not a doctor. Return the result in a strict JSON format.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          severity: { type: Type.STRING, enum: ['low', 'medium', 'high'] },
          recommendation: { type: Type.STRING },
          possibleCauses: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          }
        },
        required: ["summary", "severity", "recommendation", "possibleCauses"]
      }
    }
  });

  try {
    return JSON.parse(response.text || "{}") as TriageResult;
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    return {
      summary: "We couldn't process your request correctly.",
      severity: "medium",
      recommendation: "Please consult a general practitioner for an accurate diagnosis.",
      possibleCauses: ["Unknown"]
    };
  }
};
