'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AuthUser } from '@/lib/auth-helpers';
import { recentActivity, aiInsights, smartMachinesList } from '@/data/mock';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  DragEndEvent 
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  rectSortingStrategy, 
  useSortable 
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripHorizontal } from 'lucide-react';

interface DashboardClientProps {
  user: AuthUser;
}

const mockActivityData = [
  { day: 'Mon', savings: 12 },
  { day: 'Tue', savings: 19 },
  { day: 'Wed', savings: 15 },
  { day: 'Thu', savings: 24 },
  { day: 'Fri', savings: 22 },
  { day: 'Sat', savings: 30 },
  { day: 'Sun', savings: 28 },
];

function SortableWidget({ id, children, colSpan = 1 }: { id: string, children: React.ReactNode, colSpan?: number }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 1,
    opacity: isDragging ? 0.8 : 1,
    gridColumn: colSpan > 1 ? `span ${colSpan}` : 'span 1',
    display: 'flex',
    flexDirection: 'column' as const,
  };

  return (
    <div ref={setNodeRef} style={style} className="glass">
      <div 
        {...attributes} 
        {...listeners} 
        style={{ 
          cursor: 'grab', 
          padding: '8px', 
          display: 'flex', 
          justifyContent: 'center',
          borderBottom: '1px solid var(--border)',
          background: 'rgba(255,255,255,0.02)',
          borderTopLeftRadius: 'var(--radius-lg)',
          borderTopRightRadius: 'var(--radius-lg)',
        }}
      >
        <GripHorizontal size={16} color="var(--muted)" />
      </div>
      <div style={{ padding: 'var(--space-lg)', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
}

const DEFAULT_WIDGET_ORDER = [
  'carbon-score',
  'carbon-saved',
  'reward-points',
  'trees-equivalent',
  'weekly-progress',
  'ai-insights',
  'recent-activity',
  'goals'
];

export default function DashboardClient({ user }: DashboardClientProps) {
  const [mounted, setMounted] = useState(false);
  const [widgetOrder, setWidgetOrder] = useState(DEFAULT_WIDGET_ORDER);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    setMounted(true);
    const savedOrder = localStorage.getItem('thadam_dashboard_order');
    if (savedOrder) {
      try {
        const parsed = JSON.parse(savedOrder);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Ensure all required widgets are present
          const validOrder = parsed.filter(id => DEFAULT_WIDGET_ORDER.includes(id));
          const missing = DEFAULT_WIDGET_ORDER.filter(id => !validOrder.includes(id));
          setWidgetOrder([...validOrder, ...missing]);
        }
      } catch (e) {
        console.error("Could not parse dashboard layout", e);
      }
    }
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setWidgetOrder((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        const newOrder = arrayMove(items, oldIndex, newIndex);
        localStorage.setItem('thadam_dashboard_order', JSON.stringify(newOrder));
        return newOrder;
      });
    }
  };

  const userName = user.name || 'Sanjay';
  const ecoRank = user.ecoRank || 'Climate Champion';
  const carbonScore = user.carbonScore > 0 ? user.carbonScore : 82;
  const rewardPoints = user.rewardPoints > 0 ? user.rewardPoints : 2450;
  const carbonSaved = user.carbonScore > 0 ? (user.carbonScore * 1.5).toFixed(1) : '142.5';
  const treesSaved = Math.round(parseFloat(carbonSaved) / 22);

  const renderWidget = (id: string) => {
    switch (id) {
      case 'carbon-score':
        return (
          <SortableWidget key={id} id={id}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Carbon Score</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: 'var(--space-sm)' }}>
                  <span style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--primary)', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>{carbonScore}</span>
                  <span style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>/100</span>
                </div>
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)' }}>Top 4% of active users this month</div>
            </div>
          </SortableWidget>
        );
      case 'carbon-saved':
        return (
          <SortableWidget key={id} id={id}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Carbon Saved</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: 'var(--space-sm)' }}>
                  <span style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--accent)', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>{carbonSaved}</span>
                  <span style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>kg CO2</span>
                </div>
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)' }}>+14% savings relative to last month</div>
            </div>
          </SortableWidget>
        );
      case 'reward-points':
        return (
          <SortableWidget key={id} id={id}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Reward Points</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: 'var(--space-sm)' }}>
                  <span style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--secondary)', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>{rewardPoints}</span>
                  <span style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>pts</span>
                </div>
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--primary)' }}>
                <Link href="/rewards" style={{ textDecoration: 'underline' }}>Redeem 4 available offers →</Link>
              </div>
            </div>
          </SortableWidget>
        );
      case 'trees-equivalent':
        return (
          <SortableWidget key={id} id={id}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Trees Equivalent</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: 'var(--space-sm)' }}>
                  <span style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--primary)', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>{treesSaved}</span>
                  <span style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>trees</span>
                </div>
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)' }}>Virtually planted to offset footprint</div>
            </div>
          </SortableWidget>
        );
      case 'weekly-progress':
        return (
          <SortableWidget key={id} id={id} colSpan={2}>
            <h3 className="font-heading" style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-md)' }}>Weekly Progress</h3>
            <div style={{ width: '100%', height: '200px' }}>
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="day" stroke="var(--muted)" fontSize={11} />
                    <YAxis stroke="var(--muted)" fontSize={11} />
                    <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', color: 'var(--text)' }} />
                    <Line type="monotone" dataKey="savings" stroke="var(--primary)" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </SortableWidget>
        );
      case 'ai-insights':
        return (
          <SortableWidget key={id} id={id} colSpan={2}>
            <h3 className="font-heading" style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-md)' }}>Gemini AI Coach Insights</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', flex: 1, overflowY: 'auto' }}>
              {aiInsights.slice(0,2).map((insight) => (
                <div key={insight.id} className="glass-subtle" style={{ padding: 'var(--space-md)', borderLeft: `4px solid ${insight.type === 'success' ? 'var(--primary)' : insight.type === 'warning' ? 'var(--warning)' : 'var(--accent)'}` }}>
                  <div style={{ fontWeight: 'bold', fontSize: 'var(--text-sm)', color: 'var(--text)', marginBottom: '4px' }}>{insight.title}</div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', lineHeight: 1.5 }}>{insight.text}</p>
                </div>
              ))}
            </div>
          </SortableWidget>
        );
      case 'recent-activity':
        return (
          <SortableWidget key={id} id={id} colSpan={2}>
            <h3 className="font-heading" style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-md)' }}>Recent Activity</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <th style={{ padding: '12px 8px', color: 'var(--muted)', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)' }}>Activity</th>
                    <th style={{ padding: '12px 8px', color: 'var(--muted)', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)' }}>Detail</th>
                    <th style={{ padding: '12px 8px', color: 'var(--muted)', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)' }}>Impact</th>
                    <th style={{ padding: '12px 8px', color: 'var(--muted)', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', textAlign: 'right' }}>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.slice(0,3).map((act) => (
                    <tr key={act.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                      <td style={{ padding: '12px 8px', fontWeight: 600, fontSize: 'var(--text-sm)' }}>{act.title}</td>
                      <td style={{ padding: '12px 8px', fontSize: 'var(--text-xs)', color: 'var(--muted)' }}>{act.detail}</td>
                      <td style={{ padding: '12px 8px', fontSize: 'var(--text-xs)', color: 'var(--primary)' }}>{act.carbonSaved}</td>
                      <td style={{ padding: '12px 8px', textAlign: 'right', fontWeight: 'bold', color: act.pts.startsWith('+') ? 'var(--primary)' : 'var(--danger)', fontFamily: 'var(--font-mono)' }}>{act.pts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SortableWidget>
        );
      case 'goals':
        return (
          <SortableWidget key={id} id={id} colSpan={2}>
            <h3 className="font-heading" style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-md)' }}>Active Goals</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <div className="glass-subtle" style={{ padding: 'var(--space-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: 'var(--text-sm)' }}>Reduce Plastic Waste</span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--primary)' }}>80%</span>
                </div>
                <div style={{ width: '100%', background: 'var(--surface)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '80%', background: 'var(--primary)', height: '100%' }}></div>
                </div>
              </div>
              <div className="glass-subtle" style={{ padding: 'var(--space-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: 'var(--text-sm)' }}>Use Public Transit</span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--primary)' }}>45%</span>
                </div>
                <div style={{ width: '100%', background: 'var(--surface)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '45%', background: 'var(--primary)', height: '100%' }}></div>
                </div>
              </div>
              <Link href="/carbon" className="btn btn-secondary btn-sm" style={{ width: '100%', textAlign: 'center' }}>Manage Goals</Link>
            </div>
          </SortableWidget>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'var(--space-xl) var(--space-lg)' }}>
      {/* Top Welcome Banner */}
      <div className="glass" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-xl)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              color: 'white',
              fontWeight: 'bold'
            }}>
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="font-heading" style={{ fontSize: 'var(--text-3xl)', margin: 0, color: 'var(--text)' }}>
                WELCOME BACK, {userName.toUpperCase()}!
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginTop: '4px' }}>
                <span className="badge">{ecoRank}</span>
                <span style={{ color: 'var(--muted)', fontSize: 'var(--text-xs)' }}>Continuing your green journey</span>
              </div>
            </div>
          </div>
          <Link href="/settings" className="btn btn-secondary btn-sm">
            Manage Settings
          </Link>
        </div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--space-lg)',
          marginBottom: 'var(--space-xl)'
        }}>
          <SortableContext items={widgetOrder} strategy={rectSortingStrategy}>
            {widgetOrder.map(id => renderWidget(id))}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
}
