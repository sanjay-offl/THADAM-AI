import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { ThemeProvider } from '@/providers/ThemeProvider';

describe('ThemeToggle', () => {
  it('should render the toggle button', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    
    // Simulate click
    fireEvent.click(button);
  });
});
