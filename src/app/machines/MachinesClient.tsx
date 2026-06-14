'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AuthUser } from '@/lib/auth-helpers';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { MapPin, Navigation, Battery, Wifi, WifiOff, Wrench, AlertTriangle, Search } from 'lucide-react';

const MapComponent = dynamic(() => import('@/components/ui/MapComponent'), { 
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', borderRadius: 'var(--radius-lg)' }}>
      <div className="spin" style={{ width: 40, height: 40, border: '4px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%' }} />
    </div>
  )
});

interface MachinesClientProps {
  user: AuthUser;
}

const MOCK_MACHINES: any[] = [
  // Chennai (5 machines)
  { id: 'm1', name: 'GreenBin-001', address: 'Chennai Central Station, Main Entrance', lat: 13.0827, lng: 80.2707, status: 'Online', fillLevel: 45, lastUpdated: 'Just now', city: 'Chennai' },
  { id: 'm2', name: 'GreenBin-002', address: 'IIT Madras Campus, Food Court', lat: 12.9916, lng: 80.2336, status: 'Online', fillLevel: 82, lastUpdated: '2 mins ago', city: 'Chennai' },
  { id: 'm3', name: 'GreenBin-003', address: 'Marina Beach Entrance', lat: 13.0500, lng: 80.2824, status: 'Full', fillLevel: 100, lastUpdated: '10 mins ago', city: 'Chennai' },
  { id: 'm4', name: 'GreenBin-004', address: 'Phoenix Mall, Velachery', lat: 12.9925, lng: 80.2157, status: 'Online', fillLevel: 33, lastUpdated: '5 mins ago', city: 'Chennai' },
  { id: 'm5', name: 'GreenBin-005', address: 'T Nagar Bus Terminus', lat: 13.0396, lng: 80.2330, status: 'Online', fillLevel: 60, lastUpdated: '1 min ago', city: 'Chennai' },
  // Coimbatore (2 machines)
  { id: 'm6', name: 'GreenBin-006', address: 'Brookefields Mall, Coimbatore', lat: 11.0168, lng: 76.9558, status: 'Online', fillLevel: 28, lastUpdated: '3 mins ago', city: 'Coimbatore' },
  { id: 'm7', name: 'GreenBin-007', address: 'PSG Tech Campus, Peelamedu', lat: 11.0234, lng: 77.0027, status: 'Online', fillLevel: 55, lastUpdated: '8 mins ago', city: 'Coimbatore' },
  // Madurai (2 machines)
  { id: 'm8', name: 'GreenBin-008', address: 'Meenakshi Amman Temple Gate', lat: 9.9195, lng: 78.1193, status: 'Online', fillLevel: 70, lastUpdated: '4 mins ago', city: 'Madurai' },
  { id: 'm9', name: 'GreenBin-009', address: 'Madurai Junction Railway Station', lat: 9.9209, lng: 78.1201, status: 'Maintenance', fillLevel: 15, lastUpdated: '1 hour ago', city: 'Madurai' },
  // Trichy (2 machines)
  { id: 'm10', name: 'GreenBin-010', address: 'Trichy Bus Stand Complex', lat: 10.7905, lng: 78.7047, status: 'Online', fillLevel: 42, lastUpdated: '6 mins ago', city: 'Trichy' },
  { id: 'm11', name: 'GreenBin-011', address: 'NIT Trichy Main Gate', lat: 10.7600, lng: 78.8138, status: 'Online', fillLevel: 18, lastUpdated: '2 mins ago', city: 'Trichy' },
  // Salem (1 machine)
  { id: 'm12', name: 'GreenBin-012', address: 'Salem Junction Railway Station', lat: 11.6643, lng: 78.1460, status: 'Online', fillLevel: 37, lastUpdated: '12 mins ago', city: 'Salem' },
];

export default function MachinesClient({ user }: MachinesClientProps) {
  const [machines, setMachines] = useState(MOCK_MACHINES);
  const [selectedMachineId, setSelectedMachineId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedLocation, setSearchedLocation] = useState<{lat: number, lng: number, address: string} | null>(null);

  // Simulate real-time live monitoring updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMachines(prev => prev.map(m => {
        if (m.status === 'Online' && m.fillLevel < 100) {
          // Randomly increase fill level slightly
          const newFill = Math.min(100, m.fillLevel + Math.floor(Math.random() * 3));
          return { 
            ...m, 
            fillLevel: newFill, 
            status: newFill === 100 ? 'Full' : 'Online',
            lastUpdated: 'Just now'
          };
        }
        return m;
      }));
    }, 15000); // every 15 seconds
    return () => clearInterval(interval);
  }, []);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchedLocation(null);
      return;
    }
    
    try {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      if (!apiKey) return;
      
      const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchQuery)}&key=${apiKey}`);
      const data = await res.json();
      
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        const address = data.results[0].formatted_address;
        setSearchedLocation({ lat, lng, address });
      }
    } catch (err) {
      console.error('Geocoding error:', err);
    }
  };

  const filteredMachines = machines.filter(m => 
    searchedLocation ? true : (m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.address.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Online': return <Wifi size={16} color="#10B981" />;
      case 'Offline': return <WifiOff size={16} color="#EF4444" />;
      case 'Maintenance': return <Wrench size={16} color="#F59E0B" />;
      case 'Full': return <AlertTriangle size={16} color="#F59E0B" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Online': return 'rgba(16, 185, 129, 0.1)';
      case 'Offline': return 'rgba(239, 68, 68, 0.1)';
      case 'Maintenance': return 'rgba(245, 158, 11, 0.1)';
      case 'Full': return 'rgba(245, 158, 11, 0.2)';
      default: return 'transparent';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'Online': return '#10B981';
      case 'Offline': return '#EF4444';
      case 'Maintenance': return '#F59E0B';
      case 'Full': return '#F59E0B';
      default: return '#fff';
    }
  };

  return (
    <div className="container" style={{ padding: 'var(--space-xl) 0', minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
      <div className="section-header" style={{ marginBottom: 'var(--space-xl)' }}>
        <h1 className="section-title">Smart Machine Locator</h1>
        <p style={{ color: 'var(--muted)' }}>Find nearby THADAM recycling bins, check live fill levels, and get directions.</p>
      </div>

      <div className="machines-grid">
        {/* Machine List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', overflowY: 'auto', paddingRight: '12px' }}>
          
          <form onSubmit={handleSearch} style={{ position: 'relative' }}>
            <Search size={18} color="var(--muted)" style={{ position: 'absolute', top: '50%', left: 16, transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="Search address or machine name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '12px 16px 12px 44px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }}
            />
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            {filteredMachines.map(m => (
              <GlassCard 
                key={m.id} 
                padding="var(--space-md)" 
                style={{ 
                  cursor: 'pointer', 
                  border: selectedMachineId === m.id ? '1px solid var(--primary)' : '1px solid var(--border)',
                  transition: 'all 0.2s',
                  background: selectedMachineId === m.id ? 'var(--primary-subtle)' : 'var(--card)'
                }}
                onClick={() => setSelectedMachineId(m.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <h3 style={{ fontSize: 'var(--text-md)', margin: 0 }}>{m.name}</h3>
                  <span className="badge" style={{ background: getStatusColor(m.status), color: getStatusTextColor(m.status), display: 'flex', alignItems: 'center', gap: 4 }}>
                    {getStatusIcon(m.status)} {m.status}
                  </span>
                </div>
                
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: 12, display: 'flex', alignItems: 'flex-start', gap: 4 }}>
                  <MapPin size={14} style={{ marginTop: 2, flexShrink: 0 }} /> {m.address}
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'var(--text-xs)', color: 'var(--muted)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Battery size={14} /> Fill Level: <strong style={{ color: m.fillLevel > 80 ? 'var(--warning)' : 'var(--text)' }}>{m.fillLevel}%</strong>
                  </div>
                  <div>Live: {m.lastUpdated}</div>
                </div>

                <div style={{ width: '100%', height: 4, background: 'var(--surface)', borderRadius: 2, marginTop: 12 }}>
                  <div style={{ width: `${m.fillLevel}%`, height: '100%', background: m.fillLevel >= 100 ? 'var(--warning)' : 'var(--primary)', borderRadius: 2, transition: 'width 0.5s' }} />
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: 12 }}>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Get directions to ${m.name}`}
                    style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 'var(--text-xs)', color: 'var(--primary)', textDecoration: 'none', padding: '4px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--primary)', cursor: 'pointer' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Navigation size={12} /> Directions
                  </a>
                </div>
              </GlassCard>
            ))}
            
            {filteredMachines.length === 0 && (
              <div style={{ textAlign: 'center', padding: 'var(--space-xl)', color: 'var(--muted)' }}>
                No machines found matching your search.
              </div>
            )}
          </div>
        </div>

        {/* Map View */}
        <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)', height: '100%', minHeight: '400px' }}>
          <MapComponent machines={machines} selectedMachineId={selectedMachineId} searchedLocation={searchedLocation} />
        </div>
      </div>
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
        .machines-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: var(--space-xl);
          flex: 1;
          min-height: 600px;
        }
        @media (max-width: 768px) {
          .machines-grid {
            grid-template-columns: 1fr;
            min-height: auto;
          }
        }
      `}</style>
    </div>
  );
}
