// ============================================
// THADAM AI — Gemini Chat Service
// ============================================

import { getGeminiChatModel } from '@/lib/gemini';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatResult {
  response: string;
}

const SYSTEM_CONTEXT = `You are THADAM AI — an expert sustainability coach and environmental advisor. 
You help users understand their carbon footprint, make eco-friendly choices, recycle properly, and live more sustainably.
You are knowledgeable about waste management, renewable energy, carbon offsetting, sustainable products, and environmental science.
Keep responses helpful, concise, and actionable. Use markdown formatting for lists and emphasis.
Always be encouraging and positive about sustainability efforts.`;

/**
 * Chat with Gemini using conversation history
 */
export async function chat(
  message: string,
  history: ChatMessage[] = [],
  _userId?: string,
): Promise<ChatResult> {
  const model = getGeminiChatModel();

  // Build conversation context
  const conversationParts: string[] = [SYSTEM_CONTEXT];
  
  for (const msg of history.slice(-10)) {
    conversationParts.push(`${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`);
  }
  conversationParts.push(`User: ${message}`);
  conversationParts.push('Assistant:');

  const fullPrompt = conversationParts.join('\n\n');

  const result = await model.generateContent(fullPrompt);
  const text = result.response.text();

  return { response: text };
}

/**
 * Get Carbon Twin analysis
 */
export async function getCarbonTwinAnalysis(currentFootprint: number, categories: any) {
  const model = getGeminiChatModel();
  
  const prompt = `Analyze this user's carbon footprint: ${currentFootprint} kg CO2e.
  Category breakdown: ${JSON.stringify(categories)}.
  Generate a "Carbon Twin" profile - someone similar but slightly more eco-friendly.
  Return JSON ONLY:
  {
    "twinName": "Eco-friendly persona name",
    "twinFootprint": number (slightly lower than user),
    "twinHabits": ["habit 1", "habit 2"],
    "actionableDifference": "One key action to reach their level"
  }`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  
  try {
    const jsonStr = text.replace(/```json\n|\n```/g, '');
    return JSON.parse(jsonStr);
  } catch (e) {
    return {
      twinName: "Eco-Warrior",
      twinFootprint: Math.max(0, currentFootprint - 50),
      twinHabits: ["Uses reusable bags", "Composts food waste"],
      actionableDifference: "Start composting today."
    };
  }
}

/**
 * Get AI Recommendations based on score
 */
export async function getRecommendations(carbonScore: number, ecoRank: string) {
  const model = getGeminiChatModel();
  
  const prompt = `User has a Carbon Score of ${carbonScore} and Eco Rank of ${ecoRank}.
  Generate 3 specific, actionable sustainability recommendations.
  Return JSON ONLY:
  {
    "recommendations": [
      {
        "title": "Short title",
        "description": "Actionable description",
        "impact": "High/Medium/Low",
        "category": "Energy/Transport/Waste/Food"
      }
    ]
  }`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  
  try {
    const jsonStr = text.replace(/```json\n|\n```/g, '');
    return JSON.parse(jsonStr);
  } catch (e) {
    return {
      recommendations: [
        {
          title: "Switch to LED",
          description: "Replace your most used bulbs with LED to save energy.",
          impact: "Medium",
          category: "Energy"
        }
      ]
    };
  }
}
