'use client';

import { useState, useRef, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ScanResult {
  detectedItem: string;
  material: string;
  category: string;
  recyclable: boolean;
  carbonImpact: string;
  carbonImpactKg: number;
  disposalMethod: string;
  sustainabilityTip: string;
  confidence: number;
}

export default function ScanClient() {
  const [mode, setMode] = useState<'idle' | 'camera' | 'analyzing' | 'result' | 'error'>('idle');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setMode('camera');
    } catch {
      alert('Could not access camera. Please try uploading a file instead.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setImageSrc(dataUrl);
        stopCamera();
        analyzeImage(dataUrl);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setImageSrc(dataUrl);
        analyzeImage(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (dataUrl: string) => {
    setMode('analyzing');
    setErrorMsg('');

    try {
      const mimeTypeMatch = dataUrl.match(/^data:(image\/\w+);base64,/);
      const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'image/jpeg';

      const response = await fetch('/api/scan/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: dataUrl,
          mimeType: mimeType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      setResult({
        detectedItem: data.detectedItem || 'Unknown',
        material: data.material || 'Unknown',
        category: data.category || 'General Waste',
        recyclable: data.recyclable ?? false,
        carbonImpact: data.carbonImpact || 'Unknown',
        carbonImpactKg: data.carbonImpactKg || 0,
        disposalMethod: data.disposalMethod || 'Dispose in general waste',
        sustainabilityTip: data.sustainabilityTip || '',
        confidence: data.confidence || 0,
      });
      setMode('result');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to analyze image');
      setMode('error');
    }
  };

  const resetScanner = () => {
    setMode('idle');
    setImageSrc(null);
    setResult(null);
    setErrorMsg('');
    stopCamera();
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="container" style={{ padding: 'var(--space-xl) 0', minHeight: '80vh' }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
        <h1 className="section-title">AI Product Scanner</h1>
        <p style={{ color: 'var(--muted)', maxWidth: 560, margin: '0 auto' }}>
          Upload or capture a photo of any item — Gemini Vision will identify the material, waste category, and environmental impact.
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <GlassCard padding="var(--space-xl)">
          <AnimatePresence mode="wait">
            {/* IDLE */}
            {mode === 'idle' && (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 'var(--space-3xl) 0', gap: 'var(--space-lg)' }}>
                <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'var(--primary-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--primary)' }}>
                  <span style={{ fontSize: 40 }}>📷</span>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Button variant="primary" onClick={startCamera}>📸 Use Camera</Button>
                  <Button variant="outline" onClick={() => document.getElementById('scan-upload')?.click()}>📁 Upload File</Button>
                  <input id="scan-upload" type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', justifyContent: 'center', color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>
                  {['Plastic', 'Paper', 'Metal', 'Glass', 'E-Waste'].map(t => (
                    <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>✅ {t}</span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CAMERA */}
            {mode === 'camera' && (
              <motion.div key="camera" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div style={{ width: '100%', height: 360, background: '#000', borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'relative' }}>
                  <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 32, border: '2px solid rgba(16, 185, 129, 0.4)', borderRadius: 16, pointerEvents: 'none' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-md)', marginTop: 'var(--space-lg)' }}>
                  <Button variant="ghost" onClick={resetScanner}>Cancel</Button>
                  <Button variant="primary" onClick={captureImage}>📸 Capture</Button>
                </div>
              </motion.div>
            )}

            {/* ANALYZING */}
            {mode === 'analyzing' && imageSrc && (
              <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ textAlign: 'center', padding: 'var(--space-2xl) 0' }}>
                <div style={{ position: 'relative', width: 180, height: 180, margin: '0 auto var(--space-lg)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                  <Image src={imageSrc} alt="Analyzing" fill style={{ objectFit: 'cover', opacity: 0.5 }} unoptimized />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="scan-spinner" />
                  </div>
                  <motion.div
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                    style={{ position: 'absolute', left: 0, right: 0, height: 2, background: 'var(--primary)', boxShadow: '0 0 8px var(--primary)' }}
                  />
                </div>
                <h3 className="font-heading" style={{ fontSize: 'var(--text-xl)', marginBottom: 8 }}>Gemini Vision Analyzing...</h3>
                <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>Identifying material, category, and environmental impact</p>
              </motion.div>
            )}

            {/* ERROR */}
            {mode === 'error' && (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ textAlign: 'center', padding: 'var(--space-2xl) 0' }}>
                <div style={{ fontSize: 48, marginBottom: 'var(--space-md)' }}>⚠️</div>
                <h3 style={{ marginBottom: 'var(--space-sm)', color: 'var(--danger)' }}>Analysis Failed</h3>
                <p style={{ color: 'var(--muted)', marginBottom: 'var(--space-lg)', maxWidth: 400, margin: '0 auto var(--space-lg)' }}>{errorMsg}</p>
                <Button variant="primary" onClick={resetScanner}>Try Again</Button>
              </motion.div>
            )}

            {/* RESULT */}
            {mode === 'result' && result && imageSrc && (
              <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="scan-result-grid">
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '1', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                    <Image src={imageSrc} alt="Scanned" fill style={{ objectFit: 'cover' }} unoptimized />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', flexWrap: 'wrap', marginBottom: 6 }}>
                        <h2 className="font-heading" style={{ margin: 0, fontSize: 'var(--text-2xl)' }}>{result.detectedItem}</h2>
                        <span className="badge" style={{
                          background: result.recyclable ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                          color: result.recyclable ? '#10B981' : '#EF4444'
                        }}>
                          {result.recyclable ? '♻️ Recyclable' : '🚫 Non-Recyclable'}
                        </span>
                      </div>
                      <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>
                        {result.confidence}% confidence
                      </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-sm)' }}>
                      <div className="glass-subtle" style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: 4 }}>Material</div>
                        <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{result.material}</div>
                      </div>
                      <div className="glass-subtle" style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: 4 }}>Category</div>
                        <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{result.category}</div>
                      </div>
                      <div className="glass-subtle" style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: 4 }}>Carbon Impact</div>
                        <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--primary)' }}>{result.carbonImpact}</div>
                      </div>
                      <div className="glass-subtle" style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: 4 }}>CO₂ Estimate</div>
                        <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{result.carbonImpactKg} kg</div>
                      </div>
                    </div>

                    <div className="glass-subtle" style={{ padding: 'var(--space-md)', borderLeft: '3px solid var(--primary)', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ fontWeight: 600, marginBottom: 4, fontSize: 'var(--text-sm)' }}>Disposal Method</div>
                      <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--muted)', lineHeight: 1.5 }}>{result.disposalMethod}</p>
                    </div>

                    {result.sustainabilityTip && (
                      <div className="glass-subtle" style={{ padding: 'var(--space-md)', borderLeft: '3px solid var(--secondary)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontWeight: 600, marginBottom: 4, fontSize: 'var(--text-sm)' }}>💡 Sustainability Tip</div>
                        <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--muted)', lineHeight: 1.5 }}>{result.sustainabilityTip}</p>
                      </div>
                    )}

                    <Button variant="primary" onClick={resetScanner} style={{ width: '100%', marginTop: 'auto' }}>Scan Another Item</Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </div>

      <style>{`
        .scan-spinner {
          width: 40px; height: 40px;
          border: 3px solid var(--border);
          border-top-color: var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .scan-result-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: var(--space-xl);
        }
        @media (max-width: 768px) {
          .scan-result-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
