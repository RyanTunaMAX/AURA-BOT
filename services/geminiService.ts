import { GoogleGenAI } from "@google/genai";

// Ideally, this is passed from environment variables
const API_KEY = process.env.API_KEY || ''; 

let aiClient: GoogleGenAI | null = null;

// Initialize the client safely
const getClient = () => {
  if (!aiClient && API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: API_KEY });
  }
  return aiClient;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  const client = getClient();
  
  if (!client) {
    console.warn("Gemini API Key is missing. Returning mock response.");
    return "我目前處於離線模式，請確認 API Key 設定以進行健康諮詢。";
  }

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: "你是由 AURA Care 開發的 AURA BOT，一位在醫院協助病患的醫療機器人。請用繁體中文回答。請保持語氣溫和、簡潔且樂於助人。你可以解釋醫療流程，但請勿提供具體的醫療診斷結果，遇到專業醫療問題請建議諮詢醫師。",
      }
    });
    
    return response.text || "我現在無法處理您的請求，請稍後再試。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "抱歉，目前網路連線不穩，無法回應。";
  }
};