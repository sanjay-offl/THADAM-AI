import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import ConfigErrorPage from '@/components/errors/ConfigErrorPage';

describe('ConfigErrorPage', () => {
  it('should render the config error page correctly', () => {
    const mockReport = {
      missingCritical: ['DATABASE_URL'],
      variables: [
        { name: 'DATABASE_URL', status: 'Missing', required: true, description: 'Database connection', recommendedValue: 'file:./dev.db' },
        { name: 'JWT_SECRET', status: 'Loaded', required: true, description: 'JWT', recommendedValue: 'secret' }
      ]
    } as any;
    
    render(<ConfigErrorPage report={mockReport} />);
    
    expect(screen.getByText('Configuration Warning')).toBeInTheDocument();
    expect(screen.getAllByText('DATABASE_URL').length).toBeGreaterThan(0);
    expect(screen.getAllByText('JWT_SECRET').length).toBeGreaterThan(0);
  });
});
