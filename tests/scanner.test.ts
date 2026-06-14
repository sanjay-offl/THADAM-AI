import { describe, it, expect, vi } from 'vitest';
import { analyzeWasteImage } from '@/services/scanner.service';
import * as gemini from '@/lib/gemini';

vi.mock('@/lib/gemini', () => ({
  getGeminiVisionModel: vi.fn(),
}));

describe('Scanner Service', () => {
  it('should parse valid JSON response from Gemini', async () => {
    const mockResponse = {
      wasteType: 'Plastic Bottle',
      recyclable: true,
      carbonImpact: 0.5,
      disposalMethod: 'Recycle',
      confidence: 0.95,
      suggestions: ['Wash before recycling'],
    };

    const mockGenerateContent = vi.fn().mockResolvedValue({
      response: {
        text: () => JSON.stringify(mockResponse),
      },
    });

    vi.mocked(gemini.getGeminiVisionModel).mockReturnValue({
      generateContent: mockGenerateContent,
    } as any);

    const result = await analyzeWasteImage('base64data');

    expect(gemini.getGeminiVisionModel).toHaveBeenCalled();
    expect(mockGenerateContent).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });

  it('should handle invalid JSON from Gemini gracefully', async () => {
    const mockGenerateContent = vi.fn().mockResolvedValue({
      response: {
        text: () => 'Sorry, I cannot analyze this image.',
      },
    });

    vi.mocked(gemini.getGeminiVisionModel).mockReturnValue({
      generateContent: mockGenerateContent,
    } as any);

    const result = await analyzeWasteImage('base64data');

    expect(result.wasteType).toBe('Unknown');
    expect(result.recyclable).toBe(false);
  });
});
