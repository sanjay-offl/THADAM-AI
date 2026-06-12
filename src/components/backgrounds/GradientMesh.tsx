'use client';

export default function GradientMesh() {
  return (
    <>
      <div className="gradient-mesh" aria-hidden="true" />
      <style>{`
        .gradient-mesh {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
          background:
            radial-gradient(ellipse 60% 40% at 20% 30%, rgba(16, 185, 129, 0.04) 0%, transparent 70%),
            radial-gradient(ellipse 50% 50% at 80% 70%, rgba(16, 185, 129, 0.03) 0%, transparent 70%);
        }
        [data-theme='light'] .gradient-mesh {
          background:
            radial-gradient(ellipse 60% 40% at 20% 30%, rgba(16, 185, 129, 0.03) 0%, transparent 70%),
            radial-gradient(ellipse 50% 50% at 80% 70%, rgba(16, 185, 129, 0.02) 0%, transparent 70%);
        }
      `}</style>
    </>
  );
}
