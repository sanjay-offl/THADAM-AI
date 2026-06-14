import { describe, it, expect } from 'vitest';
import { searchKnowledgeBase } from '@/lib/sustainability-kb';
import { z } from 'zod';

describe('Chat & Knowledge Base', () => {
  it('should return a response for carbon footprint queries', () => {
    const result = searchKnowledgeBase('How do I reduce my carbon footprint?');
    expect(result).toBeTruthy();
    expect(result).toContain('carbon');
  });

  it('should return recycling tips for recycling queries', () => {
    const result = searchKnowledgeBase('How do I recycle properly?');
    expect(result).toBeTruthy();
    expect(result).toContain('Recyclable');
  });

  it('should return EV information for electric vehicle queries', () => {
    const result = searchKnowledgeBase('Tell me about electric vehicles');
    expect(result).toBeTruthy();
    expect(result).toContain('EV');
  });

  it('should return composting advice for composting queries', () => {
    const result = searchKnowledgeBase('How do I start composting at home?');
    expect(result).toBeTruthy();
    expect(result).toContain('Compost');
  });

  it('should return solar energy info for solar queries', () => {
    const result = searchKnowledgeBase('Should I install solar panels?');
    expect(result).toBeTruthy();
    expect(result).toContain('Solar');
  });

  it('should return water conservation tips', () => {
    const result = searchKnowledgeBase('How to save water at home?');
    expect(result).toBeTruthy();
    expect(result).toContain('Water');
  });

  it('should return public transport info', () => {
    const result = searchKnowledgeBase('Is taking the metro better for the environment?');
    expect(result).toBeTruthy();
    expect(result).toContain('Transport');
  });

  it('should return e-waste disposal info', () => {
    const result = searchKnowledgeBase('How to dispose old phone?');
    expect(result).toBeTruthy();
    expect(result).toContain('E-Waste');
  });

  it('should return climate change info', () => {
    const result = searchKnowledgeBase('What is climate change?');
    expect(result).toBeTruthy();
    expect(result).toContain('Climate');
  });

  it('should return a generic response for unknown queries', () => {
    const result = searchKnowledgeBase('aslkdjflkasdjf random gibberish');
    expect(result).toBeTruthy();
    expect(result).toContain('Offline Sustainability Mode');
  });

  it('should handle empty string gracefully', () => {
    const result = searchKnowledgeBase('');
    expect(result).toBeTruthy();
  });

  it('should match multi-word keywords with higher priority', () => {
    const result = searchKnowledgeBase('carbon footprint tips');
    expect(result).toBeTruthy();
    expect(result).not.toContain('Offline Sustainability Mode');
  });

  it('should return THADAM info when asked about thadam', () => {
    const result = searchKnowledgeBase('What is thadam?');
    expect(result).toBeTruthy();
    expect(result).toContain('THADAM');
  });

  it('should handle greetings', () => {
    const result = searchKnowledgeBase('Hello!');
    expect(result).toBeTruthy();
    expect(result).toContain('sustainability');
  });
});

describe('Chat API Schema Validation', () => {
  it('should validate message is required', () => {

    const schema = z.object({
      message: z.string().min(1, 'Message is required'),
      history: z.array(z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string(),
      })).optional().default([]),
    });

    const result = schema.safeParse({ message: '' });
    expect(result.success).toBe(false);
  });

  it('should accept valid chat request', () => {

    const schema = z.object({
      message: z.string().min(1),
      history: z.array(z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string(),
      })).optional().default([]),
    });

    const result = schema.safeParse({
      message: 'How to reduce emissions?',
      history: [{ role: 'user', content: 'Hello' }],
    });
    expect(result.success).toBe(true);
  });

  it('should default history to empty array', () => {

    const schema = z.object({
      message: z.string().min(1),
      history: z.array(z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string(),
      })).optional().default([]),
    });

    const result = schema.safeParse({ message: 'Hello' });
    expect(result.success).toBe(true);
    expect(result.data?.history).toEqual([]);
  });
});
