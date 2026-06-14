import { NextRequest, NextResponse } from 'next/server';
import { getGeminiChatModel } from '@/lib/gemini';
import { searchKnowledgeBase } from '@/lib/sustainability-kb';
import { z } from 'zod';

const chatSchema = z.object({
  message: z.string().min(1, 'Message is required'),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional().default([]),
  userId: z.string().optional().default('anonymous'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));

    const parsed = chatSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { message, history } = parsed.data;

    // ── TRY GEMINI FIRST ──────────────────────────────────────
    const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const model = getGeminiChatModel();

        const systemContext = `You are THADAM AI.
You are a sustainability expert powered by Gemini.
Help users reduce carbon emissions, recycle correctly, and live more sustainably.
If the question is unrelated to sustainability, still answer helpfully using your knowledge.
Use markdown formatting for structure. Be concise and actionable.`;

        const parts = [systemContext];
        for (const msg of history.slice(-10)) {
          parts.push(`${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`);
        }
        parts.push(`User: ${message}\nAssistant:`);

        const resultStream = await model.generateContentStream(parts.join('\n\n'));

        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          async start(controller) {
            try {
              for await (const chunk of resultStream.stream) {
                const chunkText = chunk.text();
                controller.enqueue(encoder.encode(chunkText));
              }
            } catch (streamErr: any) {
              console.error('[Gemini Stream Error]', streamErr.message);
              // If streaming fails mid-way, close gracefully
            } finally {
              controller.close();
            }
          }
        });

        return new Response(stream, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-cache',
          },
        });
      } catch (geminiErr: any) {
        console.error('[Gemini Fallback Triggered]', geminiErr.message);
        // Fall through to knowledge base
      }
    }

    // ── FALLBACK: SUSTAINABILITY KNOWLEDGE BASE ───────────────
    const kbResponse = searchKnowledgeBase(message);
    const offlineHeader = '> 🔄 *THADAM AI is operating in Offline Sustainability Mode.*\n\n';

    return NextResponse.json({
      response: offlineHeader + kbResponse,
      timestamp: new Date().toISOString(),
      model: 'offline-kb',
    });

  } catch (error: any) {
    console.error(JSON.stringify({
      logType: '[Chat Error]',
      message: error?.message || 'Unknown Error',
      timestamp: new Date().toISOString()
    }));

    // Even catastrophic errors get a useful response
    const kbResponse = searchKnowledgeBase('hello');
    return NextResponse.json({
      response: '> 🔄 *THADAM AI is operating in Offline Sustainability Mode.*\n\n' + kbResponse,
      timestamp: new Date().toISOString(),
      model: 'offline-kb',
    });
  }
}
