import { NextRequest, NextResponse } from 'next/server';
import { getGeminiVisionModel } from '@/lib/gemini';

// Max file size: 4MB
const MAX_FILE_SIZE = 4 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { image, imageUrl, mimeType = 'image/jpeg' } = body;

    let base64Data = '';
    let finalMimeType = mimeType;

    if (imageUrl) {
      // Download from Firebase Storage
      const imgRes = await fetch(imageUrl);
      if (!imgRes.ok) throw new Error('Failed to download image from storage');
      const arrayBuffer = await imgRes.arrayBuffer();
      base64Data = Buffer.from(arrayBuffer).toString('base64');
      finalMimeType = imgRes.headers.get('content-type') || 'image/jpeg';
    } else if (image) {
      if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
        return NextResponse.json({ error: 'Invalid file format. Only JPG, PNG, and WEBP are supported.' }, { status: 400 });
      }
      base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    } else {
      return NextResponse.json({ error: 'Image data or URL is required' }, { status: 400 });
    }

    // Validate size roughly (base64 string length * 0.75 is approx byte size)
    const approximateSize = base64Data.length * 0.75;
    if (approximateSize > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File size exceeds 4MB limit. Please upload a smaller image.' }, { status: 413 });
    }

    const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key missing' }, { status: 400 });
    }

    const model = getGeminiVisionModel();

    const prompt = `You are a waste classification and environmental impact expert. Analyze this image carefully.
    
Respond ONLY with a valid JSON object. Do not include markdown blocks like \`\`\`json.
{
  "wasteType": "specific item name (e.g. Plastic Water Bottle, Cardboard Box, Aluminum Can)",
  "recyclable": true or false,
  "carbonImpact": "Low / Medium / High",
  "confidence": confidence score 0 to 100,
  "disposalMethod": "Recycle/Compost/Landfill/Special Disposal",
  "analysis": "a practical recommendation and detailed analysis for the user"
}`;

    // Timeout handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

    let text = '';
    try {
      const result = await Promise.race([
        model.generateContent([
          { text: prompt },
          {
            inlineData: {
              mimeType: finalMimeType,
              data: base64Data,
            },
          },
        ]),
        new Promise((_, reject) => {
          controller.signal.addEventListener('abort', () => reject(new Error('TIMEOUT')));
        })
      ]) as any;
      text = result.response.text();
    } finally {
      clearTimeout(timeoutId);
    }

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response: ' + text);
    const parsed = JSON.parse(jsonMatch[0]);

    return NextResponse.json(parsed);

  } catch (error: any) {
    // Structured server-side logging
    const errorMessage = error?.message || 'Unknown Error';
    console.error(JSON.stringify({
      logType: '[Gemini Vision Error]',
      message: errorMessage,
      stack: error?.stack,
      timestamp: new Date().toISOString()
    }));

    let friendlyError = 'Gemini temporarily unavailable. Please try again.';
    if (errorMessage.includes('413') || errorMessage.includes('Payload Too Large')) {
      friendlyError = 'Image exceeds allowed size. Please upload an image smaller than 1 MB.';
    }

    // Return actual error message as requested in Task 8
    return NextResponse.json({ 
      error: friendlyError,
      wasteType: 'Unknown',
      recyclable: false,
      carbonImpact: 'Unknown',
      confidence: 0,
      disposalMethod: 'Landfill',
      analysis: friendlyError,
    }, { status: errorMessage.includes('413') ? 413 : 500 });
  }
}
