'use client';

import { useState, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { Camera, Save, Download, Trash2, Key, Bell, Shield, User, Monitor, Smartphone, Globe, Mail } from 'lucide-react';

import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import Image from 'next/image';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);

  // Settings State
  const [account, setAccount] = useState({
    name: 'Sanjay Kumar',
    email: 'demo@thadam.ai',
    phone: '+91 9876543210',
    location: 'Chennai, India',
    bio: 'Sustainability enthusiast and climate action advocate.',
    carbonGoals: 'Reduce footprint by 20% this year.'
  });

  const [appearance, setAppearance] = useState({
    theme: 'system', // 'light', 'dark', 'system'
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    rewardNotifications: true,
    carbonReminders: false,
  });

  const [privacy, setPrivacy] = useState({
    dataSharing: false,
  });

  useEffect(() => {
    // 1. Listen for auth state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setAccount(prev => ({
          ...prev,
          name: currentUser.displayName || prev.name,
          email: currentUser.email || prev.email,
        }));
        
        // Use user's profile image if no local preview exists
        const savedProfileImage = localStorage.getItem('thadam_profile_image');
        if (savedProfileImage) {
          setProfileImagePreview(savedProfileImage);
        } else if (currentUser.photoURL) {
          setProfileImagePreview(currentUser.photoURL);
        }
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });

    // 2. Load settings from localStorage
    const savedAccount = localStorage.getItem('thadam_account_settings');
    if (savedAccount) setAccount(JSON.parse(savedAccount));

    const savedAppearance = localStorage.getItem('thadam_appearance');
    if (savedAppearance) setAppearance(JSON.parse(savedAppearance));

    const savedNotifications = localStorage.getItem('thadam_notifications');
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications));

    const savedPrivacy = localStorage.getItem('thadam_privacy');
    if (savedPrivacy) setPrivacy(JSON.parse(savedPrivacy));

    return () => unsubscribe();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
        localStorage.setItem('thadam_profile_image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (section: string) => {
    setLoading(true);
    setTimeout(() => {
      if (section === 'account') localStorage.setItem('thadam_account_settings', JSON.stringify(account));
      if (section === 'appearance') {
        localStorage.setItem('thadam_appearance', JSON.stringify(appearance));
        // Apply theme
        if (appearance.theme === 'dark' || appearance.theme === 'light') {
          document.documentElement.setAttribute('data-theme', appearance.theme);
        } else {
          document.documentElement.removeAttribute('data-theme');
        }
      }
      if (section === 'notifications') localStorage.setItem('thadam_notifications', JSON.stringify(notifications));
      if (section === 'privacy') localStorage.setItem('thadam_privacy', JSON.stringify(privacy));
      setLoading(false);
      alert('Settings saved successfully!');
    }, 500);
  };

  const handleExportData = () => {
    const data = {
      account,
      appearance,
      notifications,
      privacy
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'thadam_user_data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (authLoading) {
    return (
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div className="spinner" />
        <style>{`
          .spinner {
            border: 4px solid rgba(255, 255, 255, 0.1);
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border-left-color: var(--primary);
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: 'var(--space-2xl) 0', minHeight: '80vh' }}>
      <div className="section-header" style={{ marginBottom: 'var(--space-xl)' }}>
        <h1 className="section-title" style={{ color: 'var(--primary)' }}>Settings</h1>
        <p style={{ color: 'var(--muted)' }}>Manage your account, preferences, and privacy.</p>
      </div>

      <div className="settings-grid">
        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
          <Button variant={activeTab === 'account' ? 'primary' : 'ghost'} onClick={() => setActiveTab('account')} style={{ justifyContent: 'flex-start' }}><User size={18} style={{ marginRight: 8 }}/> Account & Profile</Button>
          <Button variant={activeTab === 'appearance' ? 'primary' : 'ghost'} onClick={() => setActiveTab('appearance')} style={{ justifyContent: 'flex-start' }}><Monitor size={18} style={{ marginRight: 8 }}/> Appearance</Button>
          <Button variant={activeTab === 'notifications' ? 'primary' : 'ghost'} onClick={() => setActiveTab('notifications')} style={{ justifyContent: 'flex-start' }}><Bell size={18} style={{ marginRight: 8 }}/> Notifications</Button>
          <Button variant={activeTab === 'privacy' ? 'primary' : 'ghost'} onClick={() => setActiveTab('privacy')} style={{ justifyContent: 'flex-start' }}><Shield size={18} style={{ marginRight: 8 }}/> Privacy & Security</Button>
          <Button variant={activeTab === 'danger' ? 'primary' : 'ghost'} onClick={() => setActiveTab('danger')} style={{ justifyContent: 'flex-start', color: activeTab === 'danger' ? '#fff' : 'var(--danger)', background: activeTab === 'danger' ? 'var(--danger)' : '' }}><Trash2 size={18} style={{ marginRight: 8 }}/> Account Actions</Button>
        </div>

        {/* Content Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          {activeTab === 'account' && (
            <GlassCard padding="var(--space-xl)">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-lg)', color: 'var(--text)' }}>Profile Information</h3>
              
              {/* Profile Image Upload */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
                <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'var(--surface)', border: '2px dashed var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
                  {profileImagePreview ? (
                    <Image src={profileImagePreview} alt="Profile" width={100} height={100} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <User size={40} color="var(--muted)" />
                  )}
                  <input type="file" accept="image/png, image/jpeg, image/webp" onChange={handleImageUpload} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 var(--space-xs) 0', color: 'var(--text)' }}>Profile Picture</h4>
                  <p style={{ margin: '0 0 var(--space-sm) 0', fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>PNG, JPG, JPEG, WEBP. Max 2MB.</p>
                  <Button variant="secondary" size="sm" onClick={() => document.querySelector('input[type="file"]')?.dispatchEvent(new MouseEvent('click'))}><Camera size={16} style={{ marginRight: 8 }}/> Upload Image</Button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input type="text" value={account.name} onChange={e => setAccount({...account, name: e.target.value})} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input type="email" value={account.email} onChange={e => setAccount({...account, email: e.target.value})} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input type="tel" value={account.phone} onChange={e => setAccount({...account, phone: e.target.value})} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Location</label>
                  <input type="text" value={account.location} onChange={e => setAccount({...account, location: e.target.value})} style={inputStyle} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Bio</label>
                  <textarea value={account.bio} onChange={e => setAccount({...account, bio: e.target.value})} style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Carbon Goals</label>
                  <input type="text" value={account.carbonGoals} onChange={e => setAccount({...account, carbonGoals: e.target.value})} style={inputStyle} />
                </div>
              </div>
              <Button variant="primary" onClick={() => handleSave('account')} style={{ marginTop: 'var(--space-lg)' }}>
                {loading ? 'Saving...' : <><Save size={18} style={{ marginRight: 8 }}/> Save Profile</>}
              </Button>
            </GlassCard>
          )}

          {activeTab === 'appearance' && (
            <GlassCard padding="var(--space-xl)">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-lg)', color: 'var(--text)' }}>Appearance</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
                <div 
                  onClick={() => setAppearance({ theme: 'light' })}
                  style={{ padding: 'var(--space-md)', border: `2px solid ${appearance.theme === 'light' ? 'var(--primary)' : 'var(--border)'}`, borderRadius: 'var(--radius-md)', cursor: 'pointer', textAlign: 'center', background: '#F0FDF4', color: '#064E3B' }}
                >
                  <Monitor size={32} style={{ margin: '0 auto var(--space-sm)' }} />
                  <strong>Light Mode</strong>
                </div>
                <div 
                  onClick={() => setAppearance({ theme: 'dark' })}
                  style={{ padding: 'var(--space-md)', border: `2px solid ${appearance.theme === 'dark' ? 'var(--primary)' : 'var(--border)'}`, borderRadius: 'var(--radius-md)', cursor: 'pointer', textAlign: 'center', background: '#021B13', color: '#ECFDF5' }}
                >
                  <Monitor size={32} style={{ margin: '0 auto var(--space-sm)' }} />
                  <strong>Dark Mode</strong>
                </div>
                <div 
                  onClick={() => setAppearance({ theme: 'system' })}
                  style={{ padding: 'var(--space-md)', border: `2px solid ${appearance.theme === 'system' ? 'var(--primary)' : 'var(--border)'}`, borderRadius: 'var(--radius-md)', cursor: 'pointer', textAlign: 'center', background: 'linear-gradient(135deg, #F0FDF4 50%, #021B13 50%)', color: 'var(--text)' }}
                >
                  <Smartphone size={32} style={{ margin: '0 auto var(--space-sm)' }} />
                  <strong>System Default</strong>
                </div>
              </div>

              <Button variant="primary" onClick={() => handleSave('appearance')}>
                {loading ? 'Saving...' : 'Save Appearance'}
              </Button>
            </GlassCard>
          )}

          {activeTab === 'notifications' && (
            <GlassCard padding="var(--space-xl)">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-lg)', color: 'var(--text)' }}>Notifications</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--text)' }}>Email Alerts</strong>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>Receive weekly carbon reports and account updates.</span>
                  </div>
                  <Toggle checked={notifications.emailAlerts} onChange={(val) => setNotifications({...notifications, emailAlerts: val})} />
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--text)' }}>Reward Notifications</strong>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>Get notified when you earn badges or points.</span>
                  </div>
                  <Toggle checked={notifications.rewardNotifications} onChange={(val) => setNotifications({...notifications, rewardNotifications: val})} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--text)' }}>Carbon Reminders</strong>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>Daily reminders to log your eco-friendly actions.</span>
                  </div>
                  <Toggle checked={notifications.carbonReminders} onChange={(val) => setNotifications({...notifications, carbonReminders: val})} />
                </div>
              </div>

              <Button variant="primary" onClick={() => handleSave('notifications')} style={{ marginTop: 'var(--space-xl)' }}>
                {loading ? 'Saving...' : 'Save Notifications'}
              </Button>
            </GlassCard>
          )}

          {activeTab === 'privacy' && (
            <GlassCard padding="var(--space-xl)">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-lg)', color: 'var(--text)' }}>Privacy & Security</h3>
              
              <div style={{ marginBottom: 'var(--space-xl)' }}>
                <h4 style={{ marginBottom: 'var(--space-md)', color: 'var(--text)' }}>Security</h4>
                <Button variant="secondary" style={{ marginBottom: 'var(--space-sm)', width: '100%', justifyContent: 'flex-start' }}>
                  <Key size={18} style={{ marginRight: 12 }} /> Change Password
                </Button>
                <Button variant="secondary" style={{ width: '100%', justifyContent: 'flex-start' }}>
                  <Monitor size={18} style={{ marginRight: 12 }} /> Active Sessions
                </Button>
              </div>

              <div style={{ marginBottom: 'var(--space-xl)' }}>
                <h4 style={{ marginBottom: 'var(--space-md)', color: 'var(--text)' }}>Data Privacy</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--text)' }}>Data Sharing</strong>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>Allow anonymized data for AI training.</span>
                  </div>
                  <Toggle checked={privacy.dataSharing} onChange={(val) => setPrivacy({...privacy, dataSharing: val})} />
                </div>
                <Button variant="outline" onClick={handleExportData} style={{ width: '100%', justifyContent: 'flex-start' }}>
                  <Download size={18} style={{ marginRight: 12 }} /> Export My Data
                </Button>
              </div>

              <Button variant="primary" onClick={() => handleSave('privacy')}>
                {loading ? 'Saving...' : 'Save Privacy Settings'}
              </Button>
            </GlassCard>
          )}

          {activeTab === 'danger' && (
            <GlassCard padding="var(--space-xl)" style={{ border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-lg)', color: 'var(--danger)' }}>Danger Zone</h3>
              <p style={{ color: 'var(--text)', marginBottom: 'var(--space-lg)' }}>Once you delete your account, there is no going back. Please be certain.</p>
              
              <Button style={{ background: 'var(--danger)', color: '#fff', border: 'none' }} onClick={() => confirm('Are you absolutely sure you want to delete your account? This action cannot be undone.')}>
                <Trash2 size={18} style={{ marginRight: 8 }} /> Delete Account
              </Button>
            </GlassCard>
          )}
        </div>
      </div>
      <style>{`
        .settings-grid {
          display: grid;
          grid-template-columns: minmax(220px, 1fr) 3fr;
          gap: var(--space-2xl);
        }
        @media (max-width: 768px) {
          .settings-grid {
            grid-template-columns: 1fr;
            gap: var(--space-lg);
          }
        }
      `}</style>
    </div>
  );
}

// Helper components & styles
const labelStyle = { display: 'block', fontSize: 'var(--text-sm)', color: 'var(--muted)', marginBottom: 'var(--space-xs)' };
const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', outline: 'none', transition: 'border-color 0.2s' };

function Toggle({ checked, onChange }: { checked: boolean, onChange: (val: boolean) => void }) {
  return (
    <div 
      onClick={() => onChange(!checked)}
      style={{
        width: 44, 
        height: 24, 
        background: checked ? 'var(--primary)' : 'var(--surface)', 
        border: `1px solid ${checked ? 'var(--primary)' : 'var(--border)'}`,
        borderRadius: 12, 
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}
    >
      <div style={{
        width: 18, 
        height: 18, 
        background: '#fff', 
        borderRadius: '50%', 
        position: 'absolute', 
        top: 2, 
        left: checked ? 22 : 2,
        transition: 'all 0.2s',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }} />
    </div>
  );
}
