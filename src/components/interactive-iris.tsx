'use client';

import { useEffect, useState } from 'react';

/**
 * Bio-Digital Iris Engine
 * 
 * - Scroll-synced pupil dilation (1x to 2.5x)
 * - Organic fiber texture via SVG turbulence filters
 * - Crystalline lens reflections for physical realism
 * - Global z-indexing for cinematic layering
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
    <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden opacity-25 transition-opacity duration-1000">
      {/* 3D VIEWPORT CONTAINER */}
      <div className="relative size-[600px] md:size-[1200px] flex items-center justify-center">
        
        {/* OUTER REFRACTIVE HUD RING */}
        <div className="absolute inset-0 rounded-full border-[0.5px] border-primary/10 animate-[spin_180s_linear_infinite]" />
        
        {/* THE BIOLOGICAL IRIS STRUCTURE */}
        <svg className="absolute inset-0 size-full" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Organic Fiber Texture Filter */}
            <filter id="iris-texture" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0.1" />
            </filter>

            {/* Depth Gradients */}
            <radialGradient id="iris-radial" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#0F0A2A" />
              <stop offset="25%" stopColor="#7C43F1" stopOpacity="0.4" />
              <stop offset="65%" stopColor="#F6D5EE" stopOpacity="0.1" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            {/* Crystalline Lens Glow */}
            <filter id="refraction-glow">
              <feGaussianBlur stdDeviation="20" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* IRIS FIBER PLANE */}
          <circle cx="500" cy="500" r="480" fill="url(#iris-radial)" />
          <circle cx="500" cy="500" r="480" filter="url(#iris-texture)" opacity="0.1" />
          
          {/* LENS REFLECTIONS (Realistic Gloss) */}
          <circle cx="320" cy="320" r="120" fill="white" opacity="0.03" filter="url(#refraction-glow)" />
          <circle cx="680" cy="680" r="60" fill="white" opacity="0.02" filter="url(#refraction-glow)" />
        </svg>

        {/* INTERACTIVE PUPIL CORE (Scroll Responsive) */}
        <div 
          className="relative size-1/4 bg-[#0F0A2A] rounded-full shadow-[0_0_150px_rgba(124,67,241,0.5)] transition-transform duration-500 ease-out flex items-center justify-center border border-primary/20"
          style={{ transform: `scale(${dilation})` }}
        >
          {/* Inner Pupil Biometric Detail */}
          <div className="size-1/2 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          
          {/* Refractive Edge */}
          <div className="absolute inset-0 rounded-full border-[0.5px] border-white/10" />
        </div>

        {/* DATA HUD ROTATION AXIS */}
        <div className="absolute inset-[-60px] border-[0.5px] border-white/5 rounded-full animate-[spin_240s_linear_infinite_reverse]" />
      </div>
    </div>
  );
}
