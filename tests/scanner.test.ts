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
      rewardPoints: 25,
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

    expect(json.wasteType).toBe('Plastic Bottle');
    expect(json.recyclable).toBe(true);
  });

  it('should fallback to local analysis when Gemini fails', async () => {
    vi.mocked(gemini.getGeminiVisionModel).mockImplementation(() => {
      throw new Error('CONSUMER_SUSPENDED');
    });

    const req = new NextRequest('http://localhost/api/scan/analyze', {
      method: 'POST',
      body: JSON.stringify({ image: 'data:image/jpeg;base64,data', mimeType: 'image/jpeg', filename: 'plastic_bottle.jpg' })
    });

    const res = await POST(req);
    const json = await res.json();

    expect(json.wasteType).toBe('Plastic Bottle');
    expect(json.recyclable).toBe(true);
    expect(json.rewardPoints).toBe(25);
  });

  it('should classify paper from filename', async () => {
    vi.mocked(gemini.getGeminiVisionModel).mockImplementation(() => {
      throw new Error('API_ERROR');
    });

    const req = new NextRequest('http://localhost/api/scan/analyze', {
      method: 'POST',
      body: JSON.stringify({ image: 'data:image/jpeg;base64,data', mimeType: 'image/jpeg', filename: 'newspaper_scan.jpg' })
    });

    const res = await POST(req);
    const json = await res.json();

    expect(json.wasteType).toBe('Paper');
    expect(json.recyclable).toBe(true);
  });

  it('should classify e-waste from filename', async () => {
    vi.mocked(gemini.getGeminiVisionModel).mockImplementation(() => {
      throw new Error('API_ERROR');
    });

    const req = new NextRequest('http://localhost/api/scan/analyze', {
      method: 'POST',
      body: JSON.stringify({ image: 'data:image/jpeg;base64,data', mimeType: 'image/jpeg', filename: 'old_phone.jpg' })
    });

    const res = await POST(req);
    const json = await res.json();

    expect(json.wasteType).toBe('E-Waste');
    expect(json.rewardPoints).toBe(100);
  });

  it('should return mixed material for unknown items', async () => {
    vi.mocked(gemini.getGeminiVisionModel).mockImplementation(() => {
      throw new Error('API_ERROR');
    });

    const req = new NextRequest('http://localhost/api/scan/analyze', {
      method: 'POST',
      body: JSON.stringify({ image: 'data:image/jpeg;base64,data', mimeType: 'image/jpeg', filename: 'random_item.jpg' })
    });

    const res = await POST(req);
    const json = await res.json();

    expect(json.wasteType).toBe('Mixed Material');
    expect(json.confidence).toBe(78);
  });

  it('should reject oversized images with 413', async () => {
    const largeBase64 = 'x'.repeat(6 * 1024 * 1024); // ~6MB

    const req = new NextRequest('http://localhost/api/scan/analyze', {
      method: 'POST',
      body: JSON.stringify({ image: largeBase64, mimeType: 'image/jpeg' })
    });

    const res = await POST(req);
    expect(res.status).toBe(413);
  });

  it('should reject invalid MIME types', async () => {
    const req = new NextRequest('http://localhost/api/scan/analyze', {
      method: 'POST',
      body: JSON.stringify({ image: 'data:image/bmp;base64,data', mimeType: 'image/bmp' })
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('should require image data', async () => {
    const req = new NextRequest('http://localhost/api/scan/analyze', {
      method: 'POST',
      body: JSON.stringify({})
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('should always return a result, never crash', async () => {
    vi.mocked(gemini.getGeminiVisionModel).mockImplementation(() => {
      throw new Error('TOTAL_FAILURE');
    });

    const req = new NextRequest('http://localhost/api/scan/analyze', {
      method: 'POST',
      body: JSON.stringify({ image: 'data:image/jpeg;base64,abc', mimeType: 'image/jpeg' })
    });

    const res = await POST(req);
    const json = await res.json();

    // Should never 500 — always returns useful data
    expect(json.wasteType).toBeTruthy();
    expect(json.disposalMethod).toBeTruthy();
  });
});
