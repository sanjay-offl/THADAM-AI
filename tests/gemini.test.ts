import { describe, it, expect, vi, beforeEach } from 'vitest';
import { chat, getCarbonTwinAnalysis, getRecommendations } from '@/services/gemini.service';

vi.mock('@/lib/gemini', () => {
  const generateContentMock = vi.fn().mockResolvedValue({
    response: {
      text: () => '{"mock": "response"}',
    }
  });
  return {
    getGeminiChatModel: () => ({
      generateContent: generateContentMock,
    }),
    __generateContentMock: generateContentMock, // to allow asserting it later
  };
});

describe('Gemini Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should perform chat', async () => {
    const { __generateContentMock } = await import('@/lib/gemini') as any;
    __generateContentMock.mockResolvedValueOnce({
      response: { text: () => 'Hello user!' }
    });

    const result = await chat('Hello', [{ role: 'assistant', content: 'Hi' }]);
    expect(result.response).toBe('Hello user!');
    expect(__generateContentMock).toHaveBeenCalled();
  });

  it('should get carbon twin analysis', async () => {
    const { __generateContentMock } = await import('@/lib/gemini') as any;
    __generateContentMock.mockResolvedValueOnce({
      response: { text: () => '```json\n{"twinName": "Eco John", "twinFootprint": 45}\n```' }
    });

    const result = await getCarbonTwinAnalysis(50, { transport: 20 });
    expect(result.twinName).toBe('Eco John');
    expect(result.twinFootprint).toBe(45);
  });

  it('should throw error on invalid twin JSON', async () => {
    const { __generateContentMock } = await import('@/lib/gemini') as any;
    __generateContentMock.mockResolvedValueOnce({
      response: { text: () => 'not json' }
    });

    await expect(getCarbonTwinAnalysis(50, {})).rejects.toThrow('Failed to parse Gemini response for Carbon Twin');
  });

  it('should get recommendations', async () => {
    const { __generateContentMock } = await import('@/lib/gemini') as any;
    __generateContentMock.mockResolvedValueOnce({
      response: { text: () => '{"recommendations": [{"title": "Recycle"}]}' }
    });

    const result = await getRecommendations(80, 'Green');
    expect(result.recommendations[0].title).toBe('Recycle');
  });

  it('should throw error on invalid recommendations JSON', async () => {
    const { __generateContentMock } = await import('@/lib/gemini') as any;
    __generateContentMock.mockResolvedValueOnce({
      response: { text: () => 'not json' }
    });

    await expect(getRecommendations(80, 'Green')).rejects.toThrow('Failed to parse Gemini response for Recommendations');
  });
});
