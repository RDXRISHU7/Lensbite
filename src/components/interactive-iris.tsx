'use client';

import { useEffect, useState } from 'react';

/**
 * Bio-Digital Iris Engine v3.0 - Emerald Bio-Core
 * 
 * - Enhanced biological fiber fidelity via multi-layer turbulence.
 * - Symmetrical emerald/teal refraction palette.
 * - Scroll-synced pupil dilation calibrated for high-depth hero impact.
 */
export function InteractiveIris() {
  const [dilation, setDilation] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Reach peak dilation early in the hero section
      const progress = Math.min(scrollY / (windowHeight * 0.5 || 1), 1);
      
      // Pupil scale: 1.0 (contracted) to 2.2 (dilated)
      setDilation(1 + progress * 1.2);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] flex items-center justify-center overflow-hidden opacity-80 transition-opacity duration-1000">
      {/* 3D VIEWPORT CONTAINER */}
      <div className="relative size-[900px] md:size-[1800px] flex items-center justify-center">
        
        {/* THE BIOLOGICAL IRIS STRUCTURE */}
        <svg className="absolute inset-0 size-full" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Organic Fiber Texture Filter */}
            <filter id="iris-texture" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0.5" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.5" />
              </feComponentTransfer>
            </filter>

            {/* Emerald/Teal Depth Gradients */}
            <radialGradient id="iris-radial" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#0F0A2A" />
              <stop offset="15%" stopColor="#1A3B18" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#2D5A27" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#4E9A44" stopOpacity="0.6" />
              <stop offset="90%" stopColor="#B9FF61" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            {/* Refraction Rim Glow */}
            <filter id="refraction-glow">
              <feGaussianBlur stdDeviation="30" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* IRIS FIBER PLANE */}
          <circle cx="500" cy="500" r="480" fill="url(#iris-radial)" />
          <circle cx="500" cy="500" r="480" filter="url(#iris-texture)" opacity="0.4" />
          
          {/* LENS REFLECTIONS */}
          <circle cx="400" cy="400" r="140" fill="white" opacity="0.08" filter="url(#refraction-glow)" />
          <circle cx="650" cy="650" r="80" fill="white" opacity="0.05" filter="url(#refraction-glow)" />
          
          {/* RITUALISTIC RIM LIGHT */}
          <circle cx="500" cy="500" r="480" stroke="#B9FF61" strokeWidth="2" strokeOpacity="0.15" />
        </svg>

        {/* INTERACTIVE PUPIL CORE (Scroll Responsive) */}
        <div 
          className="relative size-[18%] bg-[#0F0A2A] rounded-full shadow-[0_0_120px_rgba(185,255,97,0.3)] transition-transform duration-700 ease-out flex items-center justify-center border border-white/5"
          style={{ transform: `scale(${dilation})` }}
        >
          {/* Inner Pupil Biometric Detail */}
          <div className="size-1/2 bg-[#B9FF61]/10 rounded-full blur-3xl animate-pulse" />
          
          {/* Refractive "Jelly" Edge */}
          <div className="absolute inset-0 rounded-full border-[0.5px] border-white/20" />
        </div>

        {/* DATA HUD ROTATION AXIS */}
        <div className="absolute inset-[-60px] border-[0.5px] border-white/5 rounded-full animate-[spin_360s_linear_infinite_reverse]" />
      </div>
    </div>
  );
}
