import { NextRequest, NextResponse } from 'next/server';
import { getGeminiChatModel } from '@/lib/gemini';
import { z } from 'zod';

const chatSchema = z.object({
  message: z.string().min(1, 'Message is required'),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional().default([]),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    
    const parsed = chatSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { message, history } = parsed.data;
    
    const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key missing' }, { status: 400 });
    }

    const model = getGeminiChatModel();

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

    const parts = [systemContext];
    for (const msg of history.slice(-10)) {
      parts.push(`${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`);
    }
    parts.push(`User: ${message}`);
    parts.push('Assistant:');

    // Timeout handling using AbortController and Promise.race
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

    let text = '';
    try {
      const result = await Promise.race([
        model.generateContent(parts.join('\n\n')),
        new Promise((_, reject) => {
          controller.signal.addEventListener('abort', () => reject(new Error('TIMEOUT')));
        })
      ]) as any;
      text = result.response.text();
    } finally {
      clearTimeout(timeoutId);
    }

    return NextResponse.json({ 
      response: text,
      timestamp: new Date().toISOString(),
      model: 'gemini-2.5-flash',
    });

  } catch (error: any) {
    // Structured server-side logging
    const errorMessage = error?.message || 'Unknown Error';
    console.error(JSON.stringify({
      logType: '[Gemini Chat Error]',
      message: errorMessage,
      stack: error?.stack,
      timestamp: new Date().toISOString()
    }));

    // Fallback response - never show 403, 500, Stack trace, or Consumer suspended to users.
    return NextResponse.json({ 
      response: 'AI service is temporarily unavailable. Please try again shortly.',
      timestamp: new Date().toISOString(),
      model: 'fallback'
    }, { status: 200 }); // Returning 200 to prevent client crash, with graceful fallback message
  }
}
