import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY || "";

const ai = new GoogleGenAI({ apiKey: API_KEY });

const SCHOLAR_SYSTEM = `You are a knowledgeable and respectful Islamic Scholar AI. Answer questions based on Quran and Sunnah. Cite sources (Surah/Ayah or Hadith book) where possible. Be compassionate, moderate, and clear. If a question requires a specific fatwa, advise the user to consult a local qualified scholar. Respond in the same language the user writes in.`;

export async function askScholar(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        systemInstruction: SCHOLAR_SYSTEM,
      },
    });
    return response.text ?? "I'm sorry, I couldn't process that. Please try again.";
  } catch (error: any) {
    console.error("Scholar AI Error:", error);
    if (error?.message?.includes("API_KEY") || error?.message?.includes("api key")) {
      return "⚠️ API key not configured. Please add VITE_GEMINI_API_KEY in your Vercel environment variables.";
    }
    return "I apologize, but I am unable to process your request at the moment. Please try again later.";
  }
}

export async function translateContent(text: string, targetLang: string): Promise<string> {
  const langNames: Record<string, string> = {
    es: "Spanish", fr: "French", ar: "Arabic", en: "English"
  };
  const langName = langNames[targetLang] || targetLang;
  if (targetLang === "en") return text;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Translate the following text to ${langName}. Keep all HTML tags, JSX, and formatting intact. Only translate the visible text content. Return only the translated text, nothing else:\n\n${text}`,
    });
    return response.text ?? text;
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
}
