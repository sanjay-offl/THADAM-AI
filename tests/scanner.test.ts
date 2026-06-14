import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { POST } from '@/app/api/scan/analyze/route';
import * as gemini from '@/lib/gemini';
import { NextRequest } from 'next/server';

vi.mock('@/lib/gemini', () => ({
  getGeminiVisionModel: vi.fn(),
}));

describe('Scanner API Route', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv, GEMINI_API_KEY: 'test-api-key' };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should parse valid JSON response from Gemini', async () => {
    const mockResponse = {
      wasteType: 'Plastic Bottle',
      recyclable: true,
      carbonImpact: 'Low',
      confidence: 95,
      disposalMethod: 'Recycle',
      analysis: 'Wash before recycling',
    };

    const mockGenerateContent = vi.fn().mockResolvedValue({
      response: {
        text: () => JSON.stringify(mockResponse),
      },
    });

    vi.mocked(gemini.getGeminiVisionModel).mockReturnValue({
      generateContent: mockGenerateContent,
    } as any);

    const req = new NextRequest('http://localhost/api/scan/analyze', {
      method: 'POST',
      body: JSON.stringify({ image: 'data:image/jpeg;base64,data', mimeType: 'image/jpeg' })
    });

    const res = await POST(req);
    const json = await res.json();

    expect(gemini.getGeminiVisionModel).toHaveBeenCalled();
    expect(mockGenerateContent).toHaveBeenCalled();
    expect(json).toEqual(mockResponse);
  });

  it('should handle invalid JSON from Gemini with fallback', async () => {
    const mockGenerateContent = vi.fn().mockResolvedValue({
      response: {
        text: () => 'Sorry, I cannot analyze this image.',
      },
    });

    vi.mocked(gemini.getGeminiVisionModel).mockReturnValue({
      generateContent: mockGenerateContent,
    } as any);

    const req = new NextRequest('http://localhost/api/scan/analyze', {
      method: 'POST',
      body: JSON.stringify({ image: 'data:image/jpeg;base64,data', mimeType: 'image/jpeg' })
    });

    const res = await POST(req);
    const json = await res.json();

    expect(json.wasteType).toBe('Unknown');
    expect(json.recyclable).toBe(false);
  });
});
