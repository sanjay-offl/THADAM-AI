import { NextRequest, NextResponse } from 'next/server';
import { getGeminiChatModel } from '@/lib/gemini';
import { adminFirestore } from '@/lib/firebase-admin';
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

    const { message, history, userId } = parsed.data;
    
    const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key missing' }, { status: 400 });
    }

    const model = getGeminiChatModel();

    const systemContext = `You are THADAM AI.
You are a sustainability expert powered by Gemini.
Help users reduce carbon emissions, recycle correctly, and live more sustainably.
If the question is unrelated to sustainability, still answer helpfully using Gemini knowledge.`;

    const parts = [{ text: systemContext }];
    for (const msg of history.slice(-10)) {
      parts.push({ text: `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}` });
    }
    parts.push({ text: `User: ${message}\nAssistant:` });

    // Generate streaming response
    const resultStream = await model.generateContentStream(parts.map(p => p.text).join('\n\n'));

    // Create a ReadableStream from the generator
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        let fullResponse = '';
        try {
          for await (const chunk of resultStream.stream) {
            const chunkText = chunk.text();
            fullResponse += chunkText;
            controller.enqueue(encoder.encode(chunkText));
          }
          
          // Save to Firestore after stream completes
          try {
            await adminFirestore.collection('ai_conversations').add({
              userId,
              prompt: message,
              response: fullResponse,
              timestamp: new Date().toISOString(),
            });
          } catch (dbErr) {
            console.error('[Firestore Error] Failed to save chat:', dbErr);
          }
          
        } catch (err: any) {
          console.error('[Stream Error]', err);
          controller.error(err);
        } finally {
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });

  } catch (error: any) {
    const errorMessage = error?.message || 'Unknown Error';
    console.error(JSON.stringify({
      logType: '[Gemini Chat Error]',
      message: errorMessage,
      stack: error?.stack,
      timestamp: new Date().toISOString()
    }));
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
