// ============================================
// THADAM AI — Chat API (Public)
// POST /api/chat
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { getGeminiModel } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured. Add GEMINI_API_KEY to .env.local' },
        { status: 500 },
      );
    }

    const body = await request.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const model = getGeminiModel();

    const systemContext = `You are THADAM AI — an expert sustainability coach and environmental advisor.
You help users understand their carbon footprint, make eco-friendly choices, recycle properly, and live more sustainably.
You are knowledgeable about waste management, renewable energy, carbon offsetting, sustainable products, and environmental science.
Keep responses helpful, concise, and actionable. Use markdown formatting for structure.
Always be encouraging about sustainability efforts.

IMPORTANT INSTRUCTION FOR MAPS:
If the user asks to find, show, or locate recycling centers, smart bins, e-waste collection points, or any place near a specific location (e.g. "near Chennai", "in Ambattur"), you MUST include the following tag anywhere in your response:
[MAP_SEARCH:Location Name]
For example: [MAP_SEARCH:Chennai] or [MAP_SEARCH:Ambattur]
Do not use this tag unless the user specifically asks for locations or places.`;

    // Build conversation
    const parts: string[] = [systemContext];
    for (const msg of history.slice(-10)) {
      parts.push(`${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`);
    }
    parts.push(`User: ${message}`);
    parts.push('Assistant:');

    const result = await model.generateContent(parts.join('\n\n'));
    const text = result.response.text();

    return NextResponse.json({ success: true, response: text });
  } catch (error: any) {
    console.error('[Chat API] Error:', error);

    const errorMessage = error?.message || 'Unknown API Error';
    if (errorMessage.includes('QUOTA') || errorMessage.includes('429')) {
      return NextResponse.json({ error: 'API Quota Exceeded' }, { status: 429 });
    }
    if (errorMessage.includes('API_KEY') || errorMessage.includes('401')) {
      return NextResponse.json({ error: 'Invalid Gemini API Key' }, { status: 401 });
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
