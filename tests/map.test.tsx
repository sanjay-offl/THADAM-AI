import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import MapComponent from '@/components/ui/MapComponent';

import { useLoadScript } from '@react-google-maps/api';

vi.mock('@react-google-maps/api', async () => {
  const actual = await vi.importActual('@react-google-maps/api');
  return {
    ...actual,
    useLoadScript: vi.fn(() => ({ isLoaded: true, loadError: undefined, url: '' })),
    GoogleMap: ({ children }: any) => <div data-testid="google-map">{children}</div>,
    Marker: ({ children }: any) => <div data-testid="map-marker">{children}</div>,
    InfoWindow: ({ children }: any) => <div data-testid="info-window">{children}</div>,
  };
});

describe('MapComponent', () => {
  it('should render the map container and markers', () => {
    const mockMachines = [
      { id: '1', name: 'Machine 1', lat: 10, lng: 20, fillLevel: 50, status: 'Online' },
      { id: '2', name: 'Machine 2', lat: 11, lng: 21, fillLevel: 90, status: 'Full' },
    ];
    
    render(<MapComponent machines={mockMachines as any} selectedMachineId={null} />);
    
    // google-map test id is defined in the setup.ts mock
    expect(screen.getByTestId('google-map')).toBeInTheDocument();
    
    // There should be two markers
    const markers = screen.getAllByTestId('map-marker');
    expect(markers.length).toBe(2);
  });

  it('should render fallback if load fails', () => {
    vi.mocked(useLoadScript).mockReturnValueOnce({
      isLoaded: false,
      loadError: new Error('Failed to load'),
      url: '',
    });
    
    render(<MapComponent machines={[]} selectedMachineId={null} />);
    expect(screen.getByText(/Error loading maps/i)).toBeInTheDocument();
  });

  it('should render skeleton while loading', () => {
    vi.mocked(useLoadScript).mockReturnValueOnce({
      isLoaded: false,
      loadError: undefined,
      url: '',
    });
    
    render(<MapComponent machines={[]} selectedMachineId={null} />);
    expect(screen.getByText(/Loading Maps.../i)).toBeInTheDocument();
  });
});
