'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/components/ui/MapComponent'), { 
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', borderRadius: 'var(--radius-lg)' }}>
      <div className="spin" style={{ width: 40, height: 40, border: '4px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%' }} />
    </div>
  )
});

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: 'Hi! I\'m THADAM AI, your sustainability coach. Ask me anything about carbon footprint, recycling, eco-friendly living, or tell me to find nearby recycling centers! 🌱',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Map State
  const [showMap, setShowMap] = useState(false);
  const [searchedLocation, setSearchedLocation] = useState<{lat: number, lng: number, address: string} | null>(null);

  // Debug State
  const [debugData, setDebugData] = useState({
    status: 'Idle',
    mapKey: !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    lastRequest: 0,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMapSearch = async (location: string) => {
    try {
      setDebugData(p => ({ ...p, status: 'Geocoding...' }));
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      if (!apiKey) throw new Error('Missing Maps API Key');
      
      const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`);
      const data = await res.json();
      
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        const address = data.results[0].formatted_address;
        setSearchedLocation({ lat, lng, address });
        setShowMap(true);
        setDebugData(p => ({ ...p, status: 'Map Loaded' }));
      } else {
        throw new Error('Location not found');
      }
    } catch (err: any) {
      console.error('Map Search Error:', err);
      setDebugData(p => ({ ...p, status: 'Map Error: ' + err.message }));
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError('');
    const startTime = Date.now();

    try {
      setDebugData(p => ({ ...p, status: 'Calling Gemini...' }));
      const history = messages
        .filter(m => m.id !== '0')
        .map(m => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          history,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      let responseText = data.response;
      
      // Check for map intent
      const mapMatch = responseText.match(/\[MAP_SEARCH:(.*?)\]/);
      if (mapMatch) {
        const locationToSearch = mapMatch[1].trim();
        responseText = responseText.replace(/\[MAP_SEARCH:.*?\]/g, '').trim();
        handleMapSearch(locationToSearch);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setDebugData(p => ({ ...p, status: 'Success', lastRequest: Date.now() - startTime }));
    } catch (err: any) {
      const actualError = err.message || 'Unknown network error';
      setError(actualError);
      setDebugData(p => ({ ...p, status: 'Error: ' + actualError, lastRequest: Date.now() - startTime }));
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      id: '0',
      role: 'assistant',
      content: 'Chat cleared. How can I help you with sustainability today? 🌱',
      timestamp: new Date(),
    }]);
    setError('');
    setShowMap(false);
  };

  const formatContent = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code style="background:var(--surface);padding:2px 6px;border-radius:4px;font-size:0.9em">$1</code>')
      .replace(/^- (.*)/gm, '• $1')
      .replace(/\n/g, '<br/>');
  };

  const isDev = process.env.NODE_ENV === 'development';

  return (
    <div className="container" style={{ padding: 'var(--space-xl) 0', minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
        <div>
          <h1 className="font-heading" style={{ fontSize: 'var(--text-3xl)', margin: 0 }}>THADAM AI Chat</h1>
          <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', marginTop: 4 }}>Your AI sustainability coach, powered by Gemini</p>
        </div>
        <Button variant="ghost" size="sm" onClick={clearChat}>Clear Chat</Button>
      </div>

      {isDev && (
        <div style={{ marginBottom: 'var(--space-md)', padding: 'var(--space-sm)', background: 'rgba(0,0,0,0.5)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '11px', fontFamily: 'monospace', display: 'flex', gap: '12px' }}>
          <strong style={{ color: 'var(--primary)' }}>DEBUG PANEL:</strong>
          <span>Status: {debugData.status}</span>
          <span>Map Key: {debugData.mapKey ? '✅' : '❌'}</span>
          <span>Duration: {debugData.lastRequest}ms</span>
        </div>
      )}

      <div style={{ display: 'flex', gap: 'var(--space-lg)', flex: 1, minHeight: 500 }}>
        {/* Chat UI */}
        <GlassCard padding="0" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <AnimatePresence>
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div style={{
                    maxWidth: '85%',
                    padding: '12px 16px',
                    borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: msg.role === 'user' ? 'var(--primary)' : 'var(--surface)',
                    color: msg.role === 'user' ? '#fff' : 'var(--text)',
                    border: msg.role === 'user' ? 'none' : '1px solid var(--border)',
                    fontSize: 'var(--text-sm)',
                    lineHeight: 1.6,
                  }}>
                    <div dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }} />
                    <div style={{
                      fontSize: '11px',
                      opacity: 0.5,
                      marginTop: 6,
                      textAlign: msg.role === 'user' ? 'right' : 'left',
                    }}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex' }}>
                <div style={{
                  padding: '12px 20px',
                  borderRadius: '16px 16px 16px 4px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  gap: 6,
                }}>
                  <span className="typing-dot" style={{ animationDelay: '0s' }} />
                  <span className="typing-dot" style={{ animationDelay: '0.2s' }} />
                  <span className="typing-dot" style={{ animationDelay: '0.4s' }} />
                </div>
              </motion.div>
            )}

            {error && (
              <div style={{ textAlign: 'center', padding: 'var(--space-md)', color: 'var(--danger)', fontSize: 'var(--text-sm)', background: 'rgba(239,68,68,0.08)', borderRadius: 'var(--radius-md)' }}>
                <strong>API Error:</strong> {error}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: 'var(--space-md)', borderTop: '1px solid var(--border)', display: 'flex', gap: 'var(--space-sm)', alignItems: 'flex-end' }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about sustainability, or 'Show recycling centers in Chennai'..."
              rows={1}
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--text)',
                resize: 'none',
                fontSize: 'var(--text-sm)',
                outline: 'none',
                maxHeight: 120,
                lineHeight: 1.5,
              }}
            />
            <Button variant="primary" onClick={sendMessage} disabled={!input.trim() || isLoading} style={{ height: 44, padding: '0 20px' }}>
              {isLoading ? '...' : 'Send'}
            </Button>
          </div>
        </GlassCard>

        {/* Map Panel */}
        <AnimatePresence>
          {showMap && (
            <motion.div 
              initial={{ opacity: 0, width: 0 }} 
              animate={{ opacity: 1, width: '40%' }} 
              exit={{ opacity: 0, width: 0 }}
              style={{ overflow: 'hidden', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', position: 'relative' }}
            >
              <MapComponent machines={[]} selectedMachineId={null} searchedLocation={searchedLocation} />
              <button 
                onClick={() => setShowMap(false)}
                style={{ position: 'absolute', top: 12, right: 12, background: 'var(--surface)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Suggestions */}
      <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-md)', flexWrap: 'wrap' }}>
        {['Show recycling centers near Chennai', 'Find nearby smart bins', 'How to reduce my carbon footprint?'].map(q => (
          <button
            key={q}
            onClick={() => { setInput(q); }}
            style={{
              padding: '8px 14px',
              fontSize: 'var(--text-xs)',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--muted)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}
          >
            {q}
          </button>
        ))}
      </div>

      <style>{`
        .typing-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--muted);
          animation: typingBounce 1.4s infinite both;
        }
        @keyframes typingBounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
}
