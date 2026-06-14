import { GoogleGenerativeAI, type GenerativeModel } from '@google/generative-ai';

class GeminiClient {
  private static instance: GoogleGenerativeAI | null = null;

  private constructor() {}

  public static getInstance(): GoogleGenerativeAI {
    if (!GeminiClient.instance) {
      const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
      
      if (!apiKey) {
        console.error('[Gemini Client] API Key missing!');
        throw new Error('Gemini API key missing');
      }

      GeminiClient.instance = new GoogleGenerativeAI(apiKey);
    }
    return GeminiClient.instance;
  }

  public static getChatModel(): GenerativeModel {
    const client = this.getInstance();
    // Using gemini-2.5-flash as the default fast text model
    return client.getGenerativeModel({ model: 'gemini-2.5-flash' });
  }

  public static getVisionModel(): GenerativeModel {
    const client = this.getInstance();
    // Using gemini-2.5-flash as the primary vision model (gemini-1.5-flash/pro are older, gemini-2.5-flash supports vision)
    return client.getGenerativeModel({ model: 'gemini-2.5-flash' });
  }
}

// Ensure this is only used on the server
if (typeof window !== 'undefined') {
  throw new Error('Gemini client should only be used on the server side.');
}

export const getGeminiChatModel = () => GeminiClient.getChatModel();
export const getGeminiVisionModel = () => GeminiClient.getVisionModel();
