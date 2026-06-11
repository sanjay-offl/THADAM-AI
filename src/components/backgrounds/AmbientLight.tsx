'use client';

export default function AmbientLight() {
  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        {/* Very faint green ambient — top left */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '15%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
        {/* Very faint cyan ambient — bottom right */}
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.04) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
      </div>
      <style>{`
        [data-theme='light'] .ambient-wrap > div > div {
          opacity: 0 !important;
        }
      `}</style>
    </>
  );
}
