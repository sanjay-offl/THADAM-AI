'use client';

export default function GradientMesh() {
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
        background: `
          radial-gradient(ellipse 80% 50% at 20% 40%, rgba(34, 197, 94, 0.06) 0%, transparent 100%),
          radial-gradient(ellipse 60% 80% at 80% 60%, rgba(56, 189, 248, 0.05) 0%, transparent 100%),
          radial-gradient(ellipse 50% 50% at 50% 90%, rgba(74, 222, 128, 0.04) 0%, transparent 100%)
        `,
      }}
      aria-hidden="true"
    />
  );
}
