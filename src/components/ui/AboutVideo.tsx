'use client';

import { useEffect, useRef } from 'react';

export default function AboutVideo() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="video-container">
      <div className="video-frame">
        <iframe 
          src="https://www.youtube.com/embed/ksa49hZjKbA?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&playsinline=1&loop=1&playlist=ksa49hZjKbA"
          title="THADAM AI About"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <style>{`
        .video-container {
          position: relative;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          aspect-ratio: 16 / 9;
        }

        .video-frame {
          width: 100%;
          height: 100%;
          border-radius: var(--radius-lg);
          overflow: hidden;
          position: relative;
          z-index: 2;
          background: #000;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          border: 1px solid var(--border);
        }

        .video-frame iframe {
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
