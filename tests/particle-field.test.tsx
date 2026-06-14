import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import ParticleField from '@/components/backgrounds/ParticleField';

describe('ParticleField', () => {
  it('should render the canvas element', () => {
    // Mock getContext to avoid jsdom error
    HTMLCanvasElement.prototype.getContext = vi.fn() as any;
    
    const { container } = render(<ParticleField />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });
});
