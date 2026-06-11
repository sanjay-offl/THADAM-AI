import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';

export default function AICoachPage() {
  return (
    <div className="container" style={{ padding: 'var(--space-2xl) 0' }}>
      <div className="section-header">
        <div className="section-tag">Gemini Powered</div>
        <h1 className="section-title">Sustainability Coach</h1>
        <p className="section-subtitle">Get personalized advice and recommendations from your AI environmental expert.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-2xl)' }}>
        <GlassCard padding="var(--space-xl)" style={{ display: 'flex', flexDirection: 'column', height: 600 }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-md)' }}>Gemini Chat</h3>
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', padding: 'var(--space-md)', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-md)' }}>
            <div className="chat-bubble chat-bubble-ai">
              Hello! I'm your THADAM AI Coach. I've analyzed your recent carbon footprint. Ask me anything about reducing your emissions!
            </div>
            <div className="chat-bubble chat-bubble-user">
              How can I reduce my transportation emissions?
            </div>
            <div className="chat-bubble chat-bubble-ai">
              Based on your data, commuting makes up 45% of your footprint. I recommend carpooling twice a week or using the Metro on Tuesdays and Thursdays. This alone could save 4.2kg of CO₂ weekly!
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
            <input type="text" placeholder="Ask your coach..." style={{ flex: 1, padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--text)' }} />
            <Button variant="primary">Send</Button>
          </div>
        </GlassCard>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          <GlassCard padding="var(--space-xl)">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-md)' }}>Suggested Prompts</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              <button className="btn btn-secondary" style={{ textAlign: 'left', justifyContent: 'flex-start' }}>💡 How can I reduce my carbon footprint?</button>
              <button className="btn btn-secondary" style={{ textAlign: 'left', justifyContent: 'flex-start' }}>♻️ What are the best recycling practices?</button>
              <button className="btn btn-secondary" style={{ textAlign: 'left', justifyContent: 'flex-start' }}>⚡ Calculate carbon savings from cycling to work</button>
              <button className="btn btn-secondary" style={{ textAlign: 'left', justifyContent: 'flex-start' }}>🛍️ Tips for sustainable grocery shopping</button>
            </div>
          </GlassCard>

          <GlassCard padding="var(--space-xl)" variant="glow">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-md)' }}>Monthly Goals</h3>
            <ul style={{ paddingLeft: 'var(--space-lg)', color: 'var(--text)', lineHeight: 1.8 }}>
              <li>Reduce electricity usage by 10%</li>
              <li>Recycle 15 plastic bottles</li>
              <li>Complete 2 Eco-Challenges</li>
            </ul>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
