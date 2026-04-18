'use client';

import { useEffect, useState } from 'react';

/**
 * Bio-Digital Iris Engine v2.0
 * 
 * - Re-engineered for Emerald/Teal organic realism (matching user reference)
 * - Scroll-synced pupil dilation (1x to 2.5x)
 * - Organic fiber texture via SVG turbulence filters
 * - Crystalline lens reflections for physical realism
 */
export function InteractiveIris() {
  const [dilation, setDilation] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      // Dilation reaches max at 40% of scroll depth
      const progress = Math.min(scrollY / (maxScroll * 0.4 || 1), 1);
      
      // Pupil scale: 1 (contracted) to 2.5 (dilated)
      setDilation(1 + progress * 1.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden opacity-40 transition-opacity duration-1000">
      {/* 3D VIEWPORT CONTAINER */}
      <div className="relative size-[600px] md:size-[1400px] flex items-center justify-center">
        
        {/* OUTER REFRACTIVE HUD RING */}
        <div className="absolute inset-0 rounded-full border-[0.5px] border-[#B9FF61]/20 animate-[spin_180s_linear_infinite]" />
        
        {/* THE BIOLOGICAL IRIS STRUCTURE */}
        <svg className="absolute inset-0 size-full" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Organic Fiber Texture Filter */}
            <filter id="iris-texture" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0.2" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.5" />
              </feComponentTransfer>
            </filter>

            {/* Emerald/Teal Depth Gradients */}
            <radialGradient id="iris-radial" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#0F0A2A" />
              <stop offset="15%" stopColor="#2D5A27" stopOpacity="0.8" />
              <stop offset="45%" stopColor="#4E9A44" stopOpacity="0.6" />
              <stop offset="75%" stopColor="#B9FF61" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            {/* Crystalline Lens Glow */}
            <filter id="refraction-glow">
              <feGaussianBlur stdDeviation="30" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* IRIS FIBER PLANE */}
          <circle cx="500" cy="500" r="480" fill="url(#iris-radial)" />
          <circle cx="500" cy="500" r="480" filter="url(#iris-texture)" opacity="0.15" />
          
          {/* LENS REFLECTIONS (Realistic Gloss) */}
          <circle cx="350" cy="350" r="140" fill="white" opacity="0.04" filter="url(#refraction-glow)" />
          <circle cx="650" cy="650" r="80" fill="white" opacity="0.03" filter="url(#refraction-glow)" />
          
          {/* RITUALISTIC RIM LIGHT */}
          <circle cx="500" cy="500" r="480" stroke="#B9FF61" strokeWidth="0.5" strokeOpacity="0.1" />
        </svg>

        {/* INTERACTIVE PUPIL CORE (Scroll Responsive) */}
        <div 
          className="relative size-1/5 bg-[#0F0A2A] rounded-full shadow-[0_0_120px_rgba(185,255,97,0.3)] transition-transform duration-500 ease-out flex items-center justify-center border border-[#B9FF61]/10"
          style={{ transform: `scale(${dilation})` }}
        >
          {/* Inner Pupil Biometric Detail */}
          <div className="size-1/2 bg-[#B9FF61]/10 rounded-full blur-3xl animate-pulse" />
          
          {/* Refractive Edge */}
          <div className="absolute inset-0 rounded-full border-[0.5px] border-white/5" />
        </div>

        {/* DATA HUD ROTATION AXIS */}
        <div className="absolute inset-[-80px] border-[0.5px] border-white/5 rounded-full animate-[spin_240s_linear_infinite_reverse]" />
      </div>
    </div>
  );
}
