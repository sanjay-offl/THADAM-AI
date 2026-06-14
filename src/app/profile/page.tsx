'use client';

import { useState, useRef, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { storage, db, auth } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import Image from 'next/image';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Sanjay Kumar',
    email: '',
    phone: '',
    location: 'Chennai, TN',
    bio: 'Passionate about reducing carbon footprint.',
    carbonGoals: 'Reduce daily commute emissions by 20%.',
    photoURL: ''
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setProfileData(prev => ({ ...prev, name: currentUser.displayName || 'Sanjay Kumar', email: currentUser.email || '', photoURL: currentUser.photoURL || '' }));
        // Fetch from Firestore
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProfileData(prev => ({ ...prev, ...docSnap.data() }));
          }
        } catch (e) {
          console.error('Error fetching profile', e);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      alert('File size exceeds 2MB maximum limit.');
      return;
    }

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Invalid file format. Only PNG, JPG, JPEG, and WEBP are allowed.');
      return;
    }

    try {
      setIsSaving(true);
      const storageRef = ref(storage, `profiles/${user.uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setProfileData(prev => ({ ...prev, photoURL: url }));
      
      // Save to firestore
      await setDoc(doc(db, 'users', user.uid), { photoURL: url }, { merge: true });
    } catch (err: any) {
      alert('Failed to upload image: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      await setDoc(doc(db, 'users', user.uid), profileData, { merge: true });
      setIsEditing(false);
    } catch (err: any) {
      alert('Failed to save profile: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container" style={{ padding: 'var(--space-xl) 0', minHeight: '80vh' }}>
      <div className="section-header" style={{ marginBottom: 'var(--space-xl)' }}>
        <h1 className="section-title">User Profile</h1>
        <p style={{ color: 'var(--muted)' }}>View your public profile and overall sustainability rank.</p>
      </div>

      <GlassCard padding="var(--space-xl)" style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-md)' }}>
          
          <div style={{ position: 'relative' }}>
            <div 
              style={{ width: 120, height: 120, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', color: '#fff', overflow: 'hidden', cursor: isEditing ? 'pointer' : 'default', border: '2px solid var(--primary)' }}
              onClick={() => isEditing && fileInputRef.current?.click()}
            >
              {profileData.photoURL ? (
                <Image src={profileData.photoURL} alt="Profile" width={120} height={120} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                profileData.name?.substring(0, 2).toUpperCase() || 'U'
              )}
            </div>
            {isEditing && (
              <div style={{ position: 'absolute', bottom: 0, right: 0, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '50%', padding: 6, fontSize: 12 }}>
                📷
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/png, image/jpeg, image/jpg, image/webp" style={{ display: 'none' }} />
          </div>

          <h2 style={{ fontSize: 'var(--text-2xl)', margin: 0 }}>{profileData.name}</h2>
          <span className="badge" style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981', padding: '4px 12px' }}>Earth Guardian</span>
          
          {/* Profile Form */}
          <div style={{ width: '100%', marginTop: 'var(--space-xl)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--muted)' }}>Full Name</label>
                <input disabled={!isEditing} value={profileData.name} onChange={e => setProfileData({...profileData, name: e.target.value})} className="input-field" style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--muted)' }}>Email</label>
                <input disabled={true} value={profileData.email} className="input-field" style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--muted)', opacity: 0.7 }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--muted)' }}>Phone</label>
                <input disabled={!isEditing} value={profileData.phone} onChange={e => setProfileData({...profileData, phone: e.target.value})} className="input-field" style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--muted)' }}>Location</label>
                <input disabled={!isEditing} value={profileData.location} onChange={e => setProfileData({...profileData, location: e.target.value})} className="input-field" style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '12px', color: 'var(--muted)' }}>Bio</label>
              <textarea disabled={!isEditing} value={profileData.bio} onChange={e => setProfileData({...profileData, bio: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', minHeight: 80 }} />
            </div>

            <div>
              <label style={{ fontSize: '12px', color: 'var(--muted)' }}>Carbon Goals</label>
              <textarea disabled={!isEditing} value={profileData.carbonGoals} onChange={e => setProfileData({...profileData, carbonGoals: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', minHeight: 80 }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: 'var(--space-md)' }}>
              {isEditing ? (
                <>
                  <Button variant="ghost" onClick={() => setIsEditing(false)} disabled={isSaving}>Cancel</Button>
                  <Button variant="primary" onClick={handleSave} disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Changes'}</Button>
                </>
              ) : (
                <Button variant="outline" onClick={() => setIsEditing(true)}>Edit Profile</Button>
              )}
            </div>
          </div>
          
          <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)', marginTop: 'var(--space-xl)' }}>
            <div style={{ padding: 'var(--space-md)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'bold', color: 'var(--primary)' }}>8,450</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Carbon Points</div>
            </div>
            <div style={{ padding: 'var(--space-md)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'bold', color: 'var(--accent)' }}>142</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Items Recycled</div>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
