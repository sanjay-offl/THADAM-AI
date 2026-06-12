'use client';

import { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Navigation } from 'lucide-react';

interface Machine {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'Online' | 'Offline' | 'Maintenance' | 'Full';
  fillLevel: number;
  address: string;
}

interface MapComponentProps {
  machines: Machine[];
  selectedMachineId: string | null;
  searchedLocation?: { lat: number; lng: number; address: string } | null;
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: 'var(--radius-lg)'
};

const defaultCenter = {
  lat: 13.0827,
  lng: 80.2707
};

export default function MapComponent({ machines, selectedMachineId, searchedLocation }: MapComponentProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const selectedMachine = useMemo(() => machines.find(m => m.id === selectedMachineId), [machines, selectedMachineId]);
  
  const center = useMemo(() => {
    if (searchedLocation) return { lat: searchedLocation.lat, lng: searchedLocation.lng };
    return selectedMachine ? { lat: selectedMachine.lat, lng: selectedMachine.lng } : defaultCenter;
  }, [selectedMachine, searchedLocation]);

  const zoom = selectedMachine || searchedLocation ? 14 : 12;

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return <div style={{ padding: 20, textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', borderRadius: 'var(--radius-lg)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Missing Google Maps API Key</div>;
  }

  if (loadError) return <div style={{ padding: 20 }}>Error loading maps</div>;
  if (!isLoaded) return <div style={{ padding: 20 }}>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={zoom}
      center={center}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{ color: '#263c3f' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#6b9a76' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#38414e' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#212a37' }]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#9ca5b3' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{ color: '#746855' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#1f2835' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#f3d19c' }]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{ color: '#2f3948' }]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#17263c' }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#515c6d' }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#17263c' }]
          }
        ]
      }}
    >
      {searchedLocation && (
        <Marker
          position={{ lat: searchedLocation.lat, lng: searchedLocation.lng }}
          icon={{
            path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z",
            fillColor: '#3B82F6',
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: '#FFFFFF',
            scale: 1.8,
            anchor: new (window as any).google.maps.Point(12, 24)
          }}
          zIndex={100}
        >
          <InfoWindow position={{ lat: searchedLocation.lat, lng: searchedLocation.lng }} onCloseClick={() => {}}>
            <div style={{ padding: '4px', color: '#000' }}>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 'bold' }}>Searched Location</h3>
              <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#666' }}>{searchedLocation.address}</p>
              <div style={{ fontSize: '11px', color: '#888', fontFamily: 'monospace' }}>
                {searchedLocation.lat.toFixed(5)}, {searchedLocation.lng.toFixed(5)}
              </div>
            </div>
          </InfoWindow>
        </Marker>
      )}

      {machines.map((m) => (
        <Marker 
          key={m.id} 
          position={{ lat: m.lat, lng: m.lng }}
          icon={{
            path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
            fillColor: m.status === 'Online' ? '#10B981' : m.status === 'Full' ? '#F59E0B' : '#EF4444',
            fillOpacity: 1,
            strokeWeight: 1,
            strokeColor: '#FFFFFF',
            scale: 1.5,
            anchor: new (window as any).google.maps.Point(12, 24)
          }}
        >
          {selectedMachineId === m.id && (
            <InfoWindow position={{ lat: m.lat, lng: m.lng }} onCloseClick={() => {}}>
              <div style={{ padding: '4px', color: '#000' }}>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 'bold' }}>{m.name}</h3>
                <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>{m.address}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
                  <span>Status: <strong style={{ color: m.status === 'Online' ? '#10B981' : m.status === 'Full' ? '#F59E0B' : '#EF4444' }}>{m.status}</strong></span>
                  <span>Fill: <strong>{m.fillLevel}%</strong></span>
                </div>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lng}`} 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '4px', 
                    background: '#10B981', 
                    color: 'white', 
                    padding: '6px 12px', 
                    borderRadius: '4px', 
                    textDecoration: 'none',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                >
                  <Navigation size={14} /> Get Directions
                </a>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  );
}
