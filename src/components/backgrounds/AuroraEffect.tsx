'use client';

export default function AuroraEffect() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(ellipse at 20% 50%, rgba(34, 197, 94, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(56, 189, 248, 0.06) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(74, 222, 128, 0.05) 0%, transparent 50%)',
          animation: 'auroraFlow 60s linear infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '-30%',
          left: '-30%',
          width: '160%',
          height: '160%',
          background: 'radial-gradient(ellipse at 70% 30%, rgba(34, 197, 94, 0.04) 0%, transparent 60%), radial-gradient(ellipse at 30% 70%, rgba(56, 189, 248, 0.04) 0%, transparent 60%)',
          animation: 'auroraFlow 45s linear infinite reverse',
        }}
      />
    </div>
  );
}
