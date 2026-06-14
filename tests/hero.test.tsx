import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Hero from '@/components/sections/Hero';
import { ThemeProvider } from '@/providers/ThemeProvider';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe('Hero Section', () => {
  it('should render main headings and CTA', () => {
    render(
      <ThemeProvider>
        <Hero />
      </ThemeProvider>
    );
    expect(screen.getAllByText(/YOUR FOOTPRINT/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/IS A STORY/i)).toBeInTheDocument();
    
    const startButton = screen.getByText('Start Tracking');
    expect(startButton).toBeInTheDocument();
  });

  it('should render statistics', () => {
    render(
      <ThemeProvider>
        <Hero />
      </ThemeProvider>
    );
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('CO₂ Saved')).toBeInTheDocument();
    expect(screen.getByText('Trees Equiv.')).toBeInTheDocument();
  });
});
