'use client';

import { useEffect, useState } from 'react';

/**
 * Bio-Digital Iris Engine v2.5
 * 
 * - Fixed z-index conflict (z-[-1]) to ensure background placement.
 * - Emerald organic realism with enhanced biological fiber textures.
 * - Scroll-synced pupil dilation with biological easing.
 */
export function InteractiveIris() {
  const [dilation, setDilation] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const maxScroll = docHeight - windowHeight;
      
      // Dilation progress: reaches peak at 40% of scroll depth
      const progress = Math.min(scrollY / (maxScroll * 0.4 || 1), 1);
      
      // Pupil scale: 1.0 (contracted) to 2.4 (dilated)
      setDilation(1 + progress * 1.4);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to set initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] flex items-center justify-center overflow-hidden opacity-60 transition-opacity duration-1000">
      {/* 3D VIEWPORT CONTAINER */}
      <div className="relative size-[800px] md:size-[1600px] flex items-center justify-center">
        
        {/* OUTER REFRACTIVE HUB RING */}
        <div className="absolute inset-0 rounded-full border-[0.5px] border-[#B9FF61]/10 animate-[spin_240s_linear_infinite]" />
        
        {/* THE BIOLOGICAL IRIS STRUCTURE */}
        <svg className="absolute inset-0 size-full" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Organic Fiber Texture Filter */}
            <filter id="iris-texture" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0.3" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.4" />
              </feComponentTransfer>
            </filter>

            {/* Emerald/Teal Depth Gradients */}
            <radialGradient id="iris-radial" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#0F0A2A" />
              <stop offset="12%" stopColor="#1A3B18" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#2D5A27" stopOpacity="0.7" />
              <stop offset="65%" stopColor="#4E9A44" stopOpacity="0.4" />
              <stop offset="85%" stopColor="#B9FF61" stopOpacity="0.1" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            {/* Crystalline Lens Glow */}
            <filter id="refraction-glow">
              <feGaussianBlur stdDeviation="40" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* IRIS FIBER PLANE */}
          <circle cx="500" cy="500" r="480" fill="url(#iris-radial)" />
          <circle cx="500" cy="500" r="480" filter="url(#iris-texture)" opacity="0.25" />
          
          {/* LENS REFLECTIONS (Realistic Gloss) */}
          <circle cx="380" cy="380" r="120" fill="white" opacity="0.05" filter="url(#refraction-glow)" />
          <circle cx="620" cy="620" r="60" fill="white" opacity="0.03" filter="url(#refraction-glow)" />
          
          {/* RITUALISTIC RIM LIGHT */}
          <circle cx="500" cy="500" r="480" stroke="#B9FF61" strokeWidth="1" strokeOpacity="0.05" />
        </svg>

        {/* INTERACTIVE PUPIL CORE (Scroll Responsive) */}
        <div 
          className="relative size-[18%] bg-[#0F0A2A] rounded-full shadow-[0_0_150px_rgba(185,255,97,0.2)] transition-transform duration-700 ease-out flex items-center justify-center border border-white/5"
          style={{ transform: `scale(${dilation})` }}
        >
          {/* Inner Pupil Biometric Detail */}
          <div className="size-1/2 bg-[#B9FF61]/5 rounded-full blur-3xl animate-pulse" />
          
          {/* Refractive "Jelly" Edge */}
          <div className="absolute inset-0 rounded-full border-[0.5px] border-white/10" />
        </div>

        {/* DATA HUD ROTATION AXIS */}
        <div className="absolute inset-[-40px] border-[0.5px] border-white/5 rounded-full animate-[spin_300s_linear_infinite_reverse]" />
      </div>
    </div>
  );
}
