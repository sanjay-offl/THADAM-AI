'use client';

import { useEffect, useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import Image from 'next/image';

interface HistoryItem {
  id: string;
  image: string;
  wasteType: string;
  points: number;
  timestamp: string;
}

export default function HistoryClient() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    try {
      const data = localStorage.getItem('scan-history');
      if (data) setHistory(JSON.parse(data));
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="container" style={{ padding: 'var(--space-xl) 0', minHeight: '80vh' }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
        <h1 className="section-title">Scan History</h1>
        <p style={{ color: 'var(--muted)', maxWidth: 560, margin: '0 auto' }}>
          Your recently scanned items and earned points.
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        <div style={{ marginBottom: 'var(--space-md)' }}>
          <Button variant="outline" onClick={() => window.location.href = '/scan'}>
            ← Back to Scanner
          </Button>
        </div>

        {history.length === 0 ? (
          <GlassCard padding="var(--space-xl)" style={{ textAlign: 'center', color: 'var(--muted)' }}>
            No scan history found. Start scanning items to earn points!
          </GlassCard>
        ) : (
          history.map(item => (
            <GlassCard key={item.id} padding="var(--space-md)">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                <div style={{ position: 'relative', width: 80, height: 80, borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <Image src={item.image} alt={item.wasteType} fill style={{ objectFit: 'cover' }} unoptimized />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: 'var(--text-lg)' }}>{item.wasteType}</h3>
                  <div style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', marginTop: 4 }}>
                    {new Date(item.timestamp).toLocaleString()}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)' }}>Earned</div>
                  <div style={{ fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--warning)' }}>+{item.points} pts</div>
                </div>
              </div>
            </GlassCard>
          ))
        )}
      </div>
    </div>
  );
}
