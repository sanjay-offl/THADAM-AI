import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import AboutVideo from '@/components/ui/AboutVideo';

describe('AboutVideo', () => {
  it('should render the video iframe', () => {
    render(<AboutVideo />);
    
    const iframe = screen.getByTitle('THADAM AI About');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', expect.stringContaining('youtube.com/embed'));
  });
});
