'use client';

import { useState } from 'react';
import { AuthUser } from '@/lib/auth-helpers';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { Gift, Award, Clock, CheckCircle, Tag, ShoppingBag, CreditCard, Leaf } from 'lucide-react';

interface RewardsClientProps {
  user: AuthUser;
}

const mockRewards = [
  { id: '1', title: 'Amazon ₹500 Voucher', description: 'Redeem for any Amazon purchase.', cost: 2000, category: 'Gift Cards', type: 'GiftCard', icon: CreditCard },
  { id: '2', title: 'Reusable Coffee Cup', description: 'Stainless steel, double-walled eco cup.', cost: 1500, category: 'Eco Products', type: 'Product', icon: ShoppingBag },
  { id: '3', title: '20% Off Zomato', description: 'Discount coupon for food delivery.', cost: 800, category: 'Discount Coupons', type: 'Discount', icon: Tag },
  { id: '4', title: 'Plant a Tree', description: 'We will plant a tree in your name.', cost: 500, category: 'Eco Products', type: 'Donation', icon: Leaf },
];

const mockHistory = [
  { id: 'h1', date: '2024-06-10', action: 'Earned', amount: '+50', description: 'Recycled 5 Plastic Bottles', status: 'Completed' },
  { id: 'h2', date: '2024-06-08', action: 'Redeemed', amount: '-500', description: 'Plant a Tree Donation', status: 'Completed' },
  { id: 'h3', date: '2024-06-05', action: 'Earned', amount: '+120', description: 'Weekly Goal Completed', status: 'Completed' },
  { id: 'h4', date: '2024-06-01', action: 'Pending', amount: '+200', description: 'Referral Bonus', status: 'Pending' },
];

const badges = [
  { id: 'b1', name: 'Eco Beginner', desc: 'Recycled your first item', icon: '🌱', unlocked: true },
  { id: 'b2', name: 'Green Hero', desc: 'Saved 50kg of CO2', icon: '🌿', unlocked: true },
  { id: 'b3', name: 'Carbon Champion', desc: 'Top 10% this month', icon: '🌍', unlocked: false },
  { id: 'b4', name: 'Climate Warrior', desc: 'Maintained a 30-day streak', icon: '⚡', unlocked: false },
];

export default function RewardsClient({ user }: RewardsClientProps) {
  const [activeTab, setActiveTab] = useState<'rewards'|'history'|'badges'>('rewards');
  const [category, setCategory] = useState('All');
  
  const balance = user.rewardPoints > 0 ? user.rewardPoints : 2450;

  const filteredRewards = category === 'All' ? mockRewards : mockRewards.filter(r => r.category === category);

  return (
    <div className="container" style={{ padding: 'var(--space-xl) 0', minHeight: '80vh' }}>
      <div className="section-header" style={{ marginBottom: 'var(--space-2xl)' }}>
        <h1 className="section-title">Rewards Center</h1>
        <p style={{ color: 'var(--muted)' }}>Redeem your green points for exclusive offers, eco-friendly products, and gift cards.</p>
      </div>

      <div className="rewards-grid">
        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <GlassCard padding="var(--space-lg)" style={{ textAlign: 'center', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)', border: '1px solid var(--primary)' }}>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--primary)', marginBottom: 'var(--space-xs)', fontWeight: 'bold', textTransform: 'uppercase' }}>Available Balance</div>
            <div style={{ fontSize: 'var(--text-5xl)', fontWeight: 'bold', color: 'var(--text)', fontFamily: 'var(--font-heading)', margin: 'var(--space-sm) 0' }}>
              {balance}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)' }}>Green Points</div>
          </GlassCard>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
            <Button variant={activeTab === 'rewards' ? 'primary' : 'ghost'} onClick={() => setActiveTab('rewards')} style={{ justifyContent: 'flex-start' }}><Gift size={18} style={{ marginRight: 8 }}/> Available Rewards</Button>
            <Button variant={activeTab === 'history' ? 'primary' : 'ghost'} onClick={() => setActiveTab('history')} style={{ justifyContent: 'flex-start' }}><Clock size={18} style={{ marginRight: 8 }}/> Reward History</Button>
            <Button variant={activeTab === 'badges' ? 'primary' : 'ghost'} onClick={() => setActiveTab('badges')} style={{ justifyContent: 'flex-start' }}><Award size={18} style={{ marginRight: 8 }}/> Achievement Badges</Button>
          </div>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'rewards' && (
            <div>
              <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-xl)' }}>
                {['All', 'Discount Coupons', 'Eco Products', 'Gift Cards'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setCategory(cat)}
                    style={{ 
                      padding: '8px 16px', 
                      borderRadius: 'var(--radius-full)', 
                      fontSize: 'var(--text-sm)', 
                      background: category === cat ? 'var(--primary)' : 'var(--surface)',
                      border: `1px solid ${category === cat ? 'var(--primary)' : 'var(--border)'}`,
                      color: category === cat ? '#fff' : 'var(--text)',
                      cursor: 'pointer'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-lg)' }}>
                {filteredRewards.map(reward => (
                  <GlassCard key={reward.id} padding="var(--space-lg)" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--primary-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-md)' }}>
                      <reward.icon size={24} color="var(--primary)" />
                    </div>
                    <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: '4px' }}>{reward.title}</h3>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)', marginBottom: 'var(--space-lg)', flex: 1 }}>{reward.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--border)' }}>
                      <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{reward.cost} pts</span>
                      <Button variant="outline" size="sm" disabled={balance < reward.cost}>
                        {balance >= reward.cost ? 'Redeem' : 'Not Enough Pts'}
                      </Button>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <GlassCard padding="0">
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
                    <th style={{ padding: '16px', color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>Date</th>
                    <th style={{ padding: '16px', color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>Description</th>
                    <th style={{ padding: '16px', color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>Status</th>
                    <th style={{ padding: '16px', color: 'var(--muted)', fontSize: 'var(--text-sm)', textAlign: 'right' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {mockHistory.map(item => (
                    <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                      <td style={{ padding: '16px', fontSize: 'var(--text-sm)' }}>{item.date}</td>
                      <td style={{ padding: '16px', fontSize: 'var(--text-sm)' }}>{item.description}</td>
                      <td style={{ padding: '16px' }}>
                        <span className="badge" style={{ 
                          background: item.status === 'Completed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                          color: item.status === 'Completed' ? '#10B981' : '#F59E0B'
                        }}>
                          {item.status}
                        </span>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'right', fontWeight: 'bold', color: item.amount.startsWith('+') ? 'var(--primary)' : 'var(--danger)' }}>
                        {item.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassCard>
          )}

          {activeTab === 'badges' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 'var(--space-lg)' }}>
              {badges.map(badge => (
                <GlassCard key={badge.id} padding="var(--space-xl)" style={{ textAlign: 'center', opacity: badge.unlocked ? 1 : 0.5, filter: badge.unlocked ? 'none' : 'grayscale(100%)' }}>
                  <div style={{ fontSize: '64px', marginBottom: 'var(--space-md)', filter: badge.unlocked ? 'drop-shadow(0 0 20px var(--primary-glow))' : 'none' }}>
                    {badge.icon}
                  </div>
                  <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: '8px' }}>{badge.name}</h3>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)' }}>{badge.desc}</p>
                  {!badge.unlocked && (
                    <div style={{ marginTop: 'var(--space-md)', fontSize: 'var(--text-xs)', color: 'var(--warning)' }}>Locked</div>
                  )}
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </div>
      <style>{`
        .rewards-grid {
          display: grid;
          grid-template-columns: 1fr 3fr;
          gap: var(--space-2xl);
        }
        @media (max-width: 768px) {
          .rewards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
