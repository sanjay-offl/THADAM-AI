'use client';

import { useState, useEffect } from 'react';
import { AuthUser } from '@/lib/auth-helpers';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AdminClientProps {
  user: AuthUser | null;
}

const mockSystemStats = [
  { month: 'Jan', plastic: 1.2, paper: 0.8, glass: 0.5 },
  { month: 'Feb', plastic: 1.5, paper: 0.9, glass: 0.7 },
  { month: 'Mar', plastic: 2.1, paper: 1.2, glass: 0.9 },
  { month: 'Apr', plastic: 1.8, paper: 1.1, glass: 0.8 },
  { month: 'May', plastic: 2.8, paper: 1.6, glass: 1.2 },
  { month: 'Jun', plastic: 3.2, paper: 1.9, glass: 1.5 },
];

export default function AdminClient({ user }: AdminClientProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'var(--space-xl) var(--space-lg)' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
        <div>
          <span className="section-tag">Platform Analytics</span>
          <h1 className="font-heading" style={{ fontSize: 'var(--text-4xl)', color: 'var(--text)', margin: 0 }}>
            Admin Control Panel
          </h1>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
          <button className="btn btn-secondary btn-sm animate-pulse" onClick={() => alert('Full data audit initiated. Generating report...')}>
            Trigger Audit
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => alert('Telemetry database is optimal.')}>
            System Check
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
        <div className="glass" style={{ padding: 'var(--space-md)', borderLeft: '4px solid var(--primary)' }}>
          <span style={{ fontSize: '10px', color: 'var(--muted)', display: 'block', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Total Registered Users</span>
          <span style={{ fontWeight: 'bold', fontSize: 'var(--text-xl)', display: 'block', marginTop: '4px' }}>12,847</span>
          <span style={{ fontSize: '10px', color: 'var(--primary)' }}>↑ +145 users this week</span>
        </div>
        <div className="glass" style={{ padding: 'var(--space-md)', borderLeft: '4px solid var(--accent)' }}>
          <span style={{ fontSize: '10px', color: 'var(--muted)', display: 'block', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Total Carbon Prevented</span>
          <span style={{ fontWeight: 'bold', fontSize: 'var(--text-xl)', display: 'block', marginTop: '4px' }}>89.4 Tons</span>
          <span style={{ fontSize: '10px', color: 'var(--primary)' }}>↑ +2.1t CO2 this week</span>
        </div>
        <div className="glass" style={{ padding: 'var(--space-md)', borderLeft: '4px solid var(--secondary)' }}>
          <span style={{ fontSize: '10px', color: 'var(--muted)', display: 'block', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Distributed Incentives</span>
          <span style={{ fontWeight: 'bold', fontSize: 'var(--text-xl)', display: 'block', marginTop: '4px' }}>₹4,80,000</span>
          <span style={{ fontSize: '10px', color: 'var(--muted)' }}>14,500 vouchers redeemed</span>
        </div>
        <div className="glass" style={{ padding: 'var(--space-md)', borderLeft: '4px solid var(--warning)' }}>
          <span style={{ fontSize: '10px', color: 'var(--muted)', display: 'block', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Smart Bins Online</span>
          <span style={{ fontWeight: 'bold', fontSize: 'var(--text-xl)', display: 'block', marginTop: '4px' }}>142 / 156</span>
          <span style={{ fontSize: '10px', color: 'var(--danger)' }}>14 need capacity empty checks</span>
        </div>
      </div>

      {/* Row 2: Charts & Recent Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: 'var(--space-lg)', marginBottom: 'var(--space-xl)' }} className="grid-auto">
        {/* Waste Recycled Volumes (Tons) */}
        <div className="glass" style={{ padding: 'var(--space-xl)' }}>
          <h3 className="font-heading" style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-lg)' }}>
            System-Wide Waste Volumes (Tons)
          </h3>
          <div style={{ width: '100%', height: '300px' }}>
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockSystemStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="var(--muted)" fontSize={11} />
                  <YAxis stroke="var(--muted)" fontSize={11} />
                  <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', color: 'var(--text)' }} />
                  <Legend verticalAlign="top" height={36} />
                  <Bar dataKey="plastic" fill="#38BDF8" name="PET Plastic" stackId="a" />
                  <Bar dataKey="paper" fill="#F59E0B" name="Cardboard/Paper" stackId="a" />
                  <Bar dataKey="glass" fill="#22C55E" name="Glass Jars" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Gemini API Usage */}
        <div className="glass" style={{ padding: 'var(--space-xl)' }}>
          <h3 className="font-heading" style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-lg)' }}>
            Gemini Vision API Counters
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', marginBottom: '4px' }}>
                <span>Vision Scanner Calls</span>
                <span>45,230 / 50,000 requests</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '90%', background: 'var(--primary)' }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', marginBottom: '4px' }}>
                <span>Chat Coach Sessions</span>
                <span>12,840 / 50,000 requests</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '25%', background: 'var(--accent)' }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', marginBottom: '4px' }}>
                <span>Carbon Twin Simulations</span>
                <span>4,950 / 10,000 requests</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '50%', background: 'var(--secondary)' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Activity Table */}
      <div className="glass" style={{ padding: 'var(--space-xl)' }}>
        <h3 className="font-heading" style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-md)' }}>
          Recent IoT Machine Logs
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '12px 8px', color: 'var(--muted)', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)' }}>Machine ID</th>
                <th style={{ padding: '12px 8px', color: 'var(--muted)', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)' }}>Geographic Location</th>
                <th style={{ padding: '12px 8px', color: 'var(--muted)', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)' }}>Event Trigger</th>
                <th style={{ padding: '12px 8px', color: 'var(--muted)', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)' }}>Fill Capacity</th>
                <th style={{ padding: '12px 8px', color: 'var(--muted)', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', textAlign: 'right' }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'THADAM-ECO-001', loc: 'Chennai Central Station', event: 'Weight Deposit: 1.4kg PET', fill: '78%', time: '2 mins ago' },
                { id: 'THADAM-ECO-004', loc: 'Phoenix Mall Velachery', event: 'Weight Deposit: 3.2kg Glass', fill: '82%', time: '14 mins ago' },
                { id: 'THADAM-ECO-002', loc: 'IIT Madras Campus', event: 'Telemetry Ping: Solar optimal', fill: '45%', time: '1 hr ago' },
                { id: 'THADAM-ECO-003', loc: 'Marina Beach Road', event: 'Warning: Bin capacity reached', fill: '95%', time: '3 hrs ago' },
              ].map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                  <td style={{ padding: '12px 8px', fontWeight: 600 }}>{row.id}</td>
                  <td style={{ padding: '12px 8px', fontSize: 'var(--text-xs)', color: 'var(--muted)' }}>{row.loc}</td>
                  <td style={{ padding: '12px 8px', fontSize: 'var(--text-xs)', color: row.event.includes('Warning') ? 'var(--danger)' : 'var(--text)' }}>
                    {row.event}
                  </td>
                  <td style={{ padding: '12px 8px', fontSize: 'var(--text-xs)', fontWeight: 'bold' }}>{row.fill}</td>
                  <td style={{ padding: '12px 8px', textAlign: 'right', fontSize: 'var(--text-xs)', color: 'var(--muted)' }}>{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
