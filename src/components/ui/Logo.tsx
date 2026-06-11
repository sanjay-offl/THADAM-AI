'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTheme } from '@/providers/ThemeProvider';

import lightLogo from '@/assets/light_logo .jpeg';
import darkLogo from '@/assets/dark_logo.jpeg';

export default function Logo({ className = '' }: { className?: string }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [imgSrc, setImgSrc] = useState(theme === 'dark' ? darkLogo : lightLogo);

  useEffect(() => {
    setMounted(true);
    setImgSrc(theme === 'dark' ? darkLogo : lightLogo);
  }, [theme]);

  const handleError = () => {
    // Safe fallback: swap to the other logo on error
    if (imgSrc === darkLogo) {
      setImgSrc(lightLogo);
    } else {
      setImgSrc(darkLogo);
    }
  };

  return (
    <div className={`logo-container ${className}`} style={!mounted ? { opacity: 0 } : undefined}>
      <Image
        src={imgSrc}
        alt="Thadam Logo"
        width={48}
        height={48}
        priority
        onError={handleError}
        className="logo-image"
      />
    </div>
  );
}
