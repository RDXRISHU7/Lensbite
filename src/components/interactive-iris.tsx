'use client';

import { useEffect, useState } from 'react';

/**
 * Bio-Digital Iris Engine v6.0 | Hyper-Realistic Macro Protocol
 * 
 * - Reconstructs biological iris stroma using dual SVG turbulence filters.
 * - Multi-stop radial mapping for Emerald/Teal biological depth.
 * - Scroll-synced pupil dilation with texture stretching (1.0x to 2.2x).
 * - Specular corneal reflections for 3D crystalline depth.
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
      {/* 3D VIEWPORT */}
      <div className="relative size-[650px] md:size-[900px] flex items-center justify-center scale-110">
        
        {/* THE BIOLOGICAL IRIS ARCHITECTURE */}
        <svg className="absolute inset-0 size-full" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* FILTER: FINE STROMA FIBERS */}
            <filter id="stroma-fibers" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.015 0.1" numOctaves="8" seed="123" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="80" xChannelSelector="R" yChannelSelector="G" />
            </filter>

            {/* FILTER: ORGANIC CRYPTS (DEPTH) */}
            <filter id="iris-depth" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="4" seed="456" result="noise" />
              <feColorMatrix type="saturate" values="0.2" />
              <feComposite in="SourceGraphic" in2="noise" operator="in" />
            </filter>

            {/* BIOLOGICAL GRADIENT STACK */}
            <radialGradient id="iris-main" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0A1A09" /> {/* Pupillary Edge */}
              <stop offset="15%" stopColor="#124B4C" /> {/* Teal Collarette */}
              <stop offset="45%" stopColor="#2D5A27" /> {/* Emerald Stroma */}
              <stop offset="85%" stopColor="#4E9A44" /> {/* Ciliary Zone */}
              <stop offset="100%" stopColor="#051004" /> {/* Limbal Ring */}
            </radialGradient>

            {/* SPECULAR CORNEAL REFLECTION */}
            <linearGradient id="cornea-gloss" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.4" />
              <stop offset="30%" stopColor="white" stopOpacity="0" />
              <stop offset="70%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="white" stopOpacity="0.15" />
            </linearGradient>

            <filter id="soft-glow">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* AMBIENT LIMBAL GLOW */}
          <circle cx="500" cy="500" r="460" fill="#B9FF61" fillOpacity="0.04" filter="url(#soft-glow)" />

          {/* LAYER 1: THE IRIS BASE TEXTURE */}
          <circle 
            cx="500" 
            cy="500" 
            r="420" 
            fill="url(#iris-main)" 
            filter="url(#stroma-fibers)"
            className="opacity-95" 
          />

          {/* LAYER 2: THE CRYPTS & VALLEYS (ORGANIC DEPTH) */}
          <circle 
            cx="500" 
            cy="500" 
            r="418" 
            fill="url(#iris-main)" 
            filter="url(#iris-depth)"
            className="opacity-40"
          />

          {/* LAYER 3: LIMBAL RING (SHARP OUTER EDGE) */}
          <circle 
            cx="500" 
            cy="500" 
            r="422" 
            stroke="#051004" 
            strokeWidth="12" 
            className="opacity-70"
          />

          {/* LAYER 4: CRYSTALLINE LENS LUSTRE */}
          <circle 
            cx="500" 
            cy="500" 
            r="420" 
            fill="url(#cornea-gloss)" 
            className="opacity-50"
          />

          {/* LAYER 5: REFRACTIVE RIM LIGHT */}
          <circle 
            cx="500" 
            cy="500" 
            r="418" 
            stroke="white" 
            strokeWidth="0.5" 
            className="opacity-25"
          />
        </svg>

        {/* INTERACTIVE BIOMETRIC PUPIL CORE */}
        <div 
          className="relative size-[16%] flex items-center justify-center transition-transform duration-700 ease-out"
          style={{ transform: `scale(${dilation})` }}
        >
          {/* Black Hole Core */}
          <div className="absolute inset-0 rounded-full bg-[#0F0A2A] shadow-[0_0_100px_rgba(0,0,0,0.9)]" />
          
          {/* Internal Aqueous Reflection */}
          <div className="size-full rounded-full border border-white/10 bg-gradient-to-br from-white/10 to-transparent" />
          
          {/* SPECULAR MOISTURE HIGHLIGHT */}
          <div className="absolute top-[15%] left-[15%] size-1/3 bg-white/30 rounded-full blur-lg" />
        </div>

        {/* PERIPHERAL CLINICAL HUD (SUBTLE ROTATION) */}
        <div className="absolute inset-[-60px] border-[0.5px] border-[#B9FF61]/5 rounded-full animate-[spin_300s_linear_infinite]" />
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360s); }
        }
      `}</style>
    </div>
  );
}
