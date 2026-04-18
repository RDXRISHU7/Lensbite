'use client';

import { useEffect, useState } from 'react';

/**
 * Bio-Digital Iris Engine v5.0 | Hyper-Realistic Organic Protocol
 * 
 * - Reconstructs biological iris stroma using advanced SVG turbulence filters.
 * - Emerald-Teal color mapping for high-fidelity realism.
 * - Scroll-synced pupil dilation physics (1.0x to 2.2x).
 * - Hydration-safe mount check for stable SSR.
 */
export function InteractiveIris() {
  const [dilation, setDilation] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Map scroll progress to pupil dilation (1.0 to 2.2x scale)
      const progress = Math.min(scrollY / (windowHeight * 0.7 || 1), 1);
      setDilation(1 + progress * 1.2);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] flex items-center justify-center overflow-hidden bg-[#F6F4FB]">
      {/* 3D VIEWPORT CONTAINER */}
      <div className="relative size-[600px] md:size-[850px] flex items-center justify-center scale-110">
        
        {/* THE BIOLOGICAL IRIS STRUCTURE */}
        <svg className="absolute inset-0 size-full" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* ORGANIC FIBER FILTER */}
            <filter id="iris-fibers" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="8" seed="42" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="60" xChannelSelector="R" yChannelSelector="G" />
            </filter>

            {/* IRIS DEPTH GRADIENT */}
            <radialGradient id="iris-body" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0A1A09" />
              <stop offset="25%" stopColor="#124B4C" />
              <stop offset="50%" stopColor="#2D5A27" />
              <stop offset="85%" stopColor="#4E9A44" />
              <stop offset="100%" stopColor="#1A3B18" />
            </radialGradient>

            {/* CRYSTALLINE LENS REFLECTION */}
            <linearGradient id="lens-gloss" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.3" />
              <stop offset="40%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="white" stopOpacity="0.1" />
            </linearGradient>
            
            <filter id="bloom">
              <feGaussianBlur stdDeviation="15" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* AMBIENT DEPTH GLOW */}
          <circle cx="500" cy="500" r="480" fill="#B9FF61" fillOpacity="0.03" filter="url(#bloom)" />

          {/* MAIN BIOLOGICAL IRIS BODY */}
          <circle 
            cx="500" 
            cy="500" 
            r="420" 
            fill="url(#iris-body)" 
            filter="url(#iris-fibers)"
            className="opacity-90" 
          />

          {/* LIMBAL RING (OUTER EDGE) */}
          <circle 
            cx="500" 
            cy="500" 
            r="425" 
            stroke="#051004" 
            strokeWidth="10" 
            className="opacity-60"
          />

          {/* REFRACTIVE RIM LIGHT */}
          <circle 
            cx="500" 
            cy="500" 
            r="418" 
            stroke="white" 
            strokeWidth="0.5" 
            className="opacity-20"
          />

          {/* CRYSTALLINE LENS GLOSS LAYER */}
          <circle 
            cx="500" 
            cy="500" 
            r="420" 
            fill="url(#lens-gloss)" 
            className="opacity-40"
          />
        </svg>

        {/* INTERACTIVE BIOMETRIC PUPIL */}
        <div 
          className="relative size-[18%] flex items-center justify-center transition-transform duration-700 ease-out"
          style={{ transform: `scale(${dilation})` }}
        >
          {/* Pupil Core */}
          <div className="absolute inset-0 rounded-full bg-[#0F0A2A] shadow-[0_0_80px_rgba(0,0,0,0.8)]" />
          
          {/* Internal Aqueous Refraction */}
          <div className="size-full rounded-full border border-white/5 bg-gradient-to-br from-white/10 to-transparent" />
          
          {/* SPECULAR HIGHLIGHT (MOISTURE) */}
          <div className="absolute top-[20%] left-[20%] size-1/4 bg-white/40 rounded-full blur-md" />
        </div>

        {/* CLINICAL HUD OVERLAY (SUBTLE) */}
        <div className="absolute inset-[-40px] border-[0.5px] border-[#B9FF61]/10 rounded-full animate-[spin_240s_linear_infinite]" />
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
