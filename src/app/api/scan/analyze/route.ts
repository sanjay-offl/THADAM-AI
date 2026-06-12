// ============================================
// THADAM AI — Scan Analyze API (Public)
// POST /api/scan/analyze
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { getGeminiVisionModel } from '@/lib/gemini';

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
    const { image, mimeType = 'image/jpeg' } = body;

    if (!image) {
      return NextResponse.json({ error: 'Image data is required' }, { status: 400 });
    }

    // Strip data URL prefix if present
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');

    const model = getGeminiVisionModel();

    const prompt = `You are a waste classification and environmental impact expert. Analyze this image carefully.
    
Respond ONLY with a valid JSON object. Do not include markdown blocks like \`\`\`json.
{
  "detectedItem": "specific item name (e.g. Plastic Water Bottle, Cardboard Box, Aluminum Can)",
  "material": "material type (e.g. PET Plastic, Corrugated Cardboard, Aluminum)",
  "category": "waste category (e.g. Recyclable Plastic, Recyclable Metal, Compostable, E-Waste, Hazardous, General Waste)",
  "recyclable": true or false,
  "carbonImpact": "Low / Medium / High",
  "carbonImpactKg": estimated kg CO2 as a number,
  "disposalMethod": "specific disposal instructions",
  "sustainabilityTip": "a practical recommendation for the user",
  "confidence": confidence score 0 to 100
}`;

    const result = await model.generateContent([
      { text: prompt },
      {
        inlineData: {
          mimeType,
          data: base64Data,
        },
      },
    ]);

    const text = result.response.text();

    try {
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No JSON in response: ' + text);
      const parsed = JSON.parse(jsonMatch[0]);

      return NextResponse.json({ success: true, ...parsed });
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', text);
      return NextResponse.json({ error: 'Failed to analyze the image correctly. Please try again.' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('[Scan API] Error:', error);

    const errorMessage = error?.message || 'Unknown error';
    if (errorMessage.includes('QUOTA') || errorMessage.includes('429')) {
      return NextResponse.json({ error: 'API quota exceeded. Please try again later.' }, { status: 429 });
    }
    if (errorMessage.includes('API_KEY') || errorMessage.includes('401')) {
      return NextResponse.json({ error: 'Invalid Gemini API key. Please check your configuration.' }, { status: 401 });
    }

    return NextResponse.json({ error: 'Failed to analyze image. Please try again.' }, { status: 500 });
  }
}
