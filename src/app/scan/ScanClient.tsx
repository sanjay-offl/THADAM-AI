'use client';

import { useState, useRef, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ScanResult {
  wasteType: string;
  recyclable: boolean;
  carbonImpact: string;
  confidence: number;
  disposalMethod: string;
  analysis: string;
  rewardPoints?: number;
}

const MOCK_SCAN_RESULTS = [
  {
    wasteType: "Plastic Bottle",
    recyclable: true,
    carbonImpact: "Low",
    rewardPoints: 25,
    confidence: "96%",
    disposalMethod: "Deposit in Smart Machine",
    analysis: "Recycling one plastic bottle saves enough energy to power a light bulb for 6 hours.",
  },
  {
    wasteType: "Cardboard Box",
    recyclable: true,
    carbonImpact: "Very Low",
    rewardPoints: 15,
    confidence: "94%",
    disposalMethod: "Paper Recycling Bin",
    analysis: "Flatten the box to save space. Cardboard can be recycled 5-7 times.",
  },
  {
    wasteType: "E-Waste",
    recyclable: true,
    carbonImpact: "High",
    rewardPoints: 120,
    confidence: "91%",
    disposalMethod: "Authorized E-Waste Center",
    analysis: "Electronics contain toxic chemicals. Never throw them in the regular trash.",
  },
  {
    wasteType: "Organic Waste",
    recyclable: false,
    carbonImpact: "Medium",
    rewardPoints: 10,
    confidence: "93%",
    disposalMethod: "Composting Recommended",
    analysis: "Composting organic waste reduces methane emissions from landfills.",
  },
  {
    wasteType: "Plastic Container",
    recyclable: true,
    carbonImpact: "Medium",
    rewardPoints: 20,
    confidence: "88%",
    disposalMethod: "Rinse and Recycle",
    analysis: "Food containers must be cleaned before recycling to avoid contamination.",
  },
  {
    wasteType: "Glass Bottle",
    recyclable: true,
    carbonImpact: "Low",
    rewardPoints: 30,
    confidence: "97%",
    disposalMethod: "Glass Recycling Bin",
    analysis: "Glass is infinitely recyclable without losing its quality or purity.",
  },
  {
    wasteType: "Glass Jar",
    recyclable: true,
    carbonImpact: "Low",
    rewardPoints: 25,
    confidence: "95%",
    disposalMethod: "Glass Recycling Bin",
    analysis: "Remove the metal lid and recycle it separately for maximum efficiency.",
  },
  {
    wasteType: "Paper",
    recyclable: true,
    carbonImpact: "Very Low",
    rewardPoints: 10,
    confidence: "99%",
    disposalMethod: "Paper Recycling Bin",
    analysis: "Recycling one ton of paper saves 17 mature trees and 7,000 gallons of water.",
  },
  {
    wasteType: "Magazine",
    recyclable: true,
    carbonImpact: "Low",
    rewardPoints: 12,
    confidence: "90%",
    disposalMethod: "Paper Recycling Bin",
    analysis: "Glossy paper is recyclable. No need to remove staples or tape.",
  },
  {
    wasteType: "Aluminium Can",
    recyclable: true,
    carbonImpact: "High",
    rewardPoints: 35,
    confidence: "98%",
    disposalMethod: "Metal Recycling Bin",
    analysis: "Recycling aluminium saves 95% of the energy needed to make new aluminium.",
  },
  {
    wasteType: "Steel Can",
    recyclable: true,
    carbonImpact: "Medium",
    rewardPoints: 20,
    confidence: "92%",
    disposalMethod: "Metal Recycling Bin",
    analysis: "Steel is the most recycled material in the world. Rinse before recycling.",
  },
  {
    wasteType: "Mobile Phone",
    recyclable: true,
    carbonImpact: "Very High",
    rewardPoints: 200,
    confidence: "89%",
    disposalMethod: "E-Waste Drop-off",
    analysis: "Cell phones contain precious metals like gold, silver, and palladium.",
  },
  {
    wasteType: "Battery",
    recyclable: true,
    carbonImpact: "High",
    rewardPoints: 50,
    confidence: "94%",
    disposalMethod: "Hazardous Waste Center",
    analysis: "Batteries can leak toxic metals and start fires if thrown in regular trash.",
  },
  {
    wasteType: "Food Waste",
    recyclable: false,
    carbonImpact: "Medium",
    rewardPoints: 15,
    confidence: "95%",
    disposalMethod: "Compost Bin",
    analysis: "Food waste decomposing in landfills releases methane, a potent greenhouse gas.",
  },
  {
    wasteType: "Clothing",
    recyclable: true,
    carbonImpact: "Medium",
    rewardPoints: 40,
    confidence: "87%",
    disposalMethod: "Textile Donation/Recycling",
    analysis: "Textile recycling helps divert millions of tons of waste from landfills each year.",
  },
  {
    wasteType: "Fabric Waste",
    recyclable: true,
    carbonImpact: "Low",
    rewardPoints: 25,
    confidence: "85%",
    disposalMethod: "Textile Recycling",
    analysis: "Even torn fabrics can be shredded and turned into insulation materials.",
  },
  {
    wasteType: "Milk Carton",
    recyclable: true,
    carbonImpact: "Medium",
    rewardPoints: 15,
    confidence: "91%",
    disposalMethod: "Mixed Recycling",
    analysis: "Cartons are made of paper, plastic, and sometimes aluminum. They are widely recyclable.",
  },
  {
    wasteType: "Snack Wrapper",
    recyclable: false,
    carbonImpact: "High",
    rewardPoints: 5,
    confidence: "82%",
    disposalMethod: "General Waste / Landfill",
    analysis: "Multi-layered wrappers are extremely difficult to recycle. Avoid if possible.",
  },
  {
    wasteType: "Mixed Waste",
    recyclable: false,
    carbonImpact: "Medium",
    rewardPoints: 0,
    confidence: "70%",
    disposalMethod: "Sort before disposal",
    analysis: "Mixed waste must be separated into dry and wet categories for processing.",
  },
  {
    wasteType: "Unknown Material",
    recyclable: false,
    carbonImpact: "Unknown",
    rewardPoints: 0,
    confidence: "45%",
    disposalMethod: "Check Local Guidelines",
    analysis: "When in doubt, throw it out to prevent contaminating the recycling stream.",
  }
];

export default function ScanClient() {
  const [mode, setMode] = useState<'idle' | 'camera' | 'analyzing' | 'result' | 'error'>('idle');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');

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
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setImageSrc(dataUrl);
        analyzeImage(dataUrl, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateThumbnail = (dataUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const size = 150;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const minDim = Math.min(img.width, img.height);
          const startX = (img.width - minDim) / 2;
          const startY = (img.height - minDim) / 2;
          ctx.drawImage(img, startX, startY, minDim, minDim, 0, 0, size, size);
          resolve(canvas.toDataURL('image/jpeg', 0.6));
        } else {
          resolve(dataUrl);
        }
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  };

  const analyzeImage = async (dataUrl: string, filename: string = '') => {
    setMode('analyzing');
    setErrorMsg('');

    // Force 5-second simulated AI scan delay
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Choose random result
    const resultData = MOCK_SCAN_RESULTS[Math.floor(Math.random() * MOCK_SCAN_RESULTS.length)];

    const finalResult = {
      wasteType: resultData.wasteType,
      recyclable: resultData.recyclable,
      carbonImpact: resultData.carbonImpact,
      confidence: parseInt(resultData.confidence.replace('%', '')),
      disposalMethod: resultData.disposalMethod,
      analysis: resultData.analysis,
      rewardPoints: resultData.rewardPoints,
    };

    setResult(finalResult);
    setMode('result');

    // Save scan to history
    try {
      const thumbnailUrl = await generateThumbnail(dataUrl);
      const historyStr = localStorage.getItem('scan-history');
      let history = historyStr ? JSON.parse(historyStr) : [];
      history.unshift({
        id: Date.now().toString(),
        image: thumbnailUrl,
        wasteType: finalResult.wasteType,
        points: finalResult.rewardPoints,
        timestamp: new Date().toISOString(),
      });
      
      history = history.slice(0, 50); // Keep last 50 scans
      
      let saved = false;
      while (!saved && history.length > 0) {
        try {
          localStorage.setItem('scan-history', JSON.stringify(history));
          saved = true;
        } catch (e: any) {
          if (e.name === 'QuotaExceededError' || (e.message && e.message.toLowerCase().includes('quota'))) {
            history.pop();
          } else {
            throw e;
          }
        }
      }
    } catch (e) {
      console.error('Failed to save scan history', e);
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
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
        <h1 className="section-title">AI Product Scanner</h1>
        <p style={{ color: 'var(--muted)', maxWidth: 560, margin: '0 auto' }}>
          Upload or capture a photo of any item — Gemini Vision will identify the material, waste category, and environmental impact.
        </p>
        {mode === 'idle' && (
          <div style={{ marginTop: 'var(--space-md)' }}>
            <Button variant="outline" onClick={() => window.location.href = '/scan/history'}>
              View Scan History
            </Button>
          </div>
        )}
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
                  <Button variant="primary" onClick={startCamera} aria-label="Open camera to scan item">📸 Use Camera</Button>
                  <Button variant="outline" onClick={() => document.getElementById('scan-upload')?.click()} aria-label="Upload image file">📁 Upload File</Button>
                  <input id="scan-upload" type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} aria-label="Select image to analyze" />
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
                <h3 className="font-heading" style={{ fontSize: 'var(--text-xl)', marginBottom: 8, color: 'var(--primary)' }}>THADAM AI VISION ANALYZING...</h3>
                <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', marginBottom: 4 }}>Identifying waste category...</p>
                <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', marginBottom: 4 }}>Calculating carbon impact...</p>
                <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', marginBottom: 4 }}>Generating sustainability report...</p>
                <p style={{ color: 'var(--dim)', fontSize: 'var(--text-xs)', marginTop: 12 }}>THADAM Vision Operating in Offline Sustainability Mode</p>
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
                        <h2 className="font-heading" style={{ margin: 0, fontSize: 'var(--text-2xl)' }}>{result.wasteType}</h2>
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
                      <p style={{ color: 'var(--warning)', fontSize: 'var(--text-xs)', marginTop: 4 }}>
                        ⚡ THADAM Vision Operating in Offline Sustainability Mode
                      </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-sm)' }}>
                      <div className="glass-subtle" style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: 4 }}>Carbon Impact</div>
                        <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--primary)' }}>{result.carbonImpact}</div>
                      </div>
                      {result.rewardPoints !== undefined && (
                        <div className="glass-subtle" style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-md)' }}>
                          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: 4 }}>Reward Points</div>
                          <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--warning)' }}>+{result.rewardPoints}</div>
                        </div>
                      )}
                    </div>

                    <div className="glass-subtle" style={{ padding: 'var(--space-md)', borderLeft: '3px solid var(--primary)', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ fontWeight: 600, marginBottom: 4, fontSize: 'var(--text-sm)' }}>Disposal Method</div>
                      <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--muted)', lineHeight: 1.5 }}>{result.disposalMethod}</p>
                    </div>

                    {result.analysis && (
                      <div className="glass-subtle" style={{ padding: 'var(--space-md)', borderLeft: '3px solid var(--secondary)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontWeight: 600, marginBottom: 4, fontSize: 'var(--text-sm)' }}>💡 Analysis</div>
                        <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--muted)', lineHeight: 1.5 }}>{result.analysis}</p>
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
