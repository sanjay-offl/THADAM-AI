// ============================================
// THADAM AI — Scanner Service (Gemini Vision)
// ============================================

import { getGeminiVisionModel } from '@/lib/gemini';

interface ScanResult {
  wasteType: string;
  recyclable: boolean;
  carbonImpact: number;
  disposalMethod: string;
  confidence: number;
  suggestions: string[];
}

/**
 * Analyze waste image using Gemini Vision
 */
export async function analyzeWasteImage(
  imageBase64: string,
  mimeType: string = 'image/jpeg',
): Promise<ScanResult> {
  const model = getGeminiVisionModel();

  const prompt = `You are a waste classification expert. Analyze this image and identify the waste item.

Respond with JSON only (no markdown code blocks):
{
  "wasteType": "specific waste type (e.g., PET Plastic Bottle, Cardboard Box)",
  "recyclable": true/false,
  "carbonImpact": estimated kgCO2 impact of this item (number),
  "disposalMethod": "Recycle/Compost/Landfill/Special Disposal",
  "confidence": 0.0-1.0 confidence score,
  "suggestions": ["suggestion 1", "suggestion 2"]
}`;

  const result = await model.generateContent([
    { text: prompt },
    {
      inlineData: {
        mimeType,
        data: imageBase64,
      },
    },
  ]);

  const text = result.response.text();

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found');
    return JSON.parse(jsonMatch[0]);
  } catch {
    return {
      wasteType: 'Unknown',
      recyclable: false,
      carbonImpact: 0,
      disposalMethod: 'Landfill',
      confidence: 0,
      suggestions: ['Could not analyze the image. Please try again with a clearer photo.'],
    };
  }
}
