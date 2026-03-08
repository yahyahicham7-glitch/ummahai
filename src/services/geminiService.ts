import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const scholarAI = ai.models.generateContent;

export async function askScholar(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are a knowledgeable and respectful Islamic Scholar AI assistant. Provide answers based on the Quran and Sunnah, citing sources where possible. Be compassionate, moderate, and clear. If a question is outside your scope or requires a specific fatwa, advise the user to consult a local qualified scholar.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Scholar AI Error:", error);
    return "I apologize, but I am unable to process your request at the moment. Please try again later.";
  }
}
