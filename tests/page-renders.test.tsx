import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

// Mock Next.js dynamic imports and map component
vi.mock('next/dynamic', () => ({
  default: () => {
    const DynamicComponent = () => <div data-testid="map-component">Map</div>;
    return DynamicComponent;
  },
}));

describe('Page Renders', () => {
  it('should render Scanner page', async () => {
    const ScanClient = (await import('@/app/scan/ScanClient')).default;
    render(<ScanClient />);
    expect(screen.getByText(/AI Product Scanner/i)).toBeInTheDocument();
  });

  it('should render Chat page', async () => {
    const ChatPage = (await import('@/app/chat/page')).default;
    render(<ChatPage />);
    expect(screen.getByText(/THADAM AI Chat/i)).toBeInTheDocument();
  });

  it('should render Dashboard page', async () => {
    const DashboardClient = (await import('@/app/dashboard/DashboardClient')).default;
    render(<DashboardClient user={{ id: '1', name: 'Test User' } as any} />);
    expect(screen.getByText(/WELCOME BACK/i)).toBeInTheDocument();
  });
  
  it('should render Machines page', async () => {
    const MachinesClient = (await import('@/app/machines/MachinesClient')).default;
    render(<MachinesClient user={{ id: '1', name: 'Test User' } as any} />);
    expect(screen.getByText(/Smart Machine Locator/i)).toBeInTheDocument();
  });
});
