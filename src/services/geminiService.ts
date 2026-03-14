import { GoogleGenAI } from "@google/genai";

const API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || "";

const ai = new GoogleGenAI({ apiKey: API_KEY });

const SCHOLAR_SYSTEM = `You are an Islamic Scholar AI assistant for Al Ummah AI (alummahai.com).

IDENTITY & TONE:
- Knowledgeable, respectful, clear and compassionate
- Moderate mainstream Sunni perspective grounded in Quran and authentic Sunnah
- Never sectarian, never political, never controversial
- Address the user as a fellow Muslim with warmth

SOURCES — always cite when possible:
- Quran: mention Surah name and ayah number (e.g. "Al-Baqarah 2:183")
- Hadith: mention the collection (e.g. "Bukhari", "Muslim", "Abu Dawud", "Tirmidhi") and book/chapter if helpful
- For fiqh questions, note if there are multiple scholarly opinions

RULES:
1. Respond in the SAME LANGUAGE the user writes in (Arabic, French, Spanish, English)
2. If asked about fiqh or legal rulings (halal/haram), give the mainstream scholarly position and note: "This is general guidance — for a formal fatwa, consult a qualified local scholar"
3. Never fabricate hadith or Quranic verses — if unsure of the exact reference, say so honestly
4. For questions outside Islamic knowledge, gently redirect: "I focus on Islamic guidance — for that topic, please consult an appropriate specialist"
5. Keep answers focused and useful — not too short (unhelpful) nor too long (overwhelming)
6. Format responses clearly: use **bold** for key terms, bullet points for lists, and clear paragraphs
7. When citing Quran, always include the Arabic text for key phrases when relevant
8. End complex fiqh answers with: "والله أعلم" (And Allah knows best) or its translation

TOPICS YOU HANDLE WELL:
- The 5 pillars of Islam
- Prayer (salah) — times, rakats, conditions, how to pray
- Fasting (sawm) — Ramadan, rules, expiation
- Zakat — calculation, conditions, recipients
- Hajj and Umrah
- Quran — meaning, tafsir basics, recitation
- Hadith — explaining well-known hadith
- Islamic history — prophets, companions, early Islam
- Daily duas and dhikr
- Halal/haram in food, finance, lifestyle
- Islamic ethics and character (akhlaq)
- Marriage, family and social ethics in Islam
- Taharah (purity) and wudu
- Islamic calendar and important dates

TOPICS TO HANDLE WITH CARE:
- Controversial fiqh disputes → present main scholarly positions neutrally
- Political Islam → redirect to personal practice
- Specific fatwas on complex personal situations → always recommend consulting a scholar`;

export async function askScholar(prompt: string): Promise<string> {
  if (!API_KEY) {
    return "⚠️ **Scholar AI not configured.**\n\nTo activate Scholar AI, add your `VITE_GEMINI_API_KEY` in Vercel:\n\n**Settings → Environment Variables → VITE_GEMINI_API_KEY**\n\nGet your free API key at [aistudio.google.com](https://aistudio.google.com).";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SCHOLAR_SYSTEM,
        maxOutputTokens: 1200,
        temperature: 0.4,
      },
    });
    return response.text ?? "I'm sorry, I couldn't process that request. Please try again.";
  } catch (error: any) {
    console.error("Scholar AI Error:", error);
    if (error?.message?.includes("API_KEY") || error?.message?.includes("api key") || error?.status === 400) {
      return "⚠️ **API key issue.** Please check that `VITE_GEMINI_API_KEY` is correctly set in your Vercel environment variables.";
    }
    if (error?.status === 429) {
      return "⏳ **Too many requests.** Please wait a moment and try again.";
    }
    return "I apologize — I'm unable to process your request at the moment. Please try again in a few seconds.";
  }
}

export async function translateContent(text: string, targetLang: string): Promise<string> {
  const langNames: Record<string, string> = {
    es: "Spanish", fr: "French", ar: "Arabic", en: "English"
  };
  const langName = langNames[targetLang] || targetLang;
  if (targetLang === "en" || !API_KEY) return text;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Translate the following text to ${langName}. Keep all HTML tags, JSX, and formatting intact. Only translate the visible text content. Return only the translated text, nothing else:\n\n${text}`,
      config: { temperature: 0.2 },
    });
    return response.text ?? text;
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
}
