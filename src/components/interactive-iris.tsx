'use client';

import { useEffect, useState } from 'react';

/**
 * Bio-Digital Iris Engine v7.0 | Hyper-Realistic 3D Protocol
 * 
 * - Reconstructs biological iris architecture using multi-layered parallax.
 * - Multi-octave turbulence filters for organic stroma fibers.
 * - Scroll-synced pupil dilation with biological easing (1.0x to 2.2x).
 * - Crystalline corneal reflections for 3D depth and moisture.
 * - Emerald-Teal clinical color spectrum.
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
      <div className="relative size-[700px] md:size-[1000px] flex items-center justify-center scale-110 perspective-3d">
        
        {/* LAYER 1: BIOLOGICAL IRIS ARCHITECTURE */}
        <svg className="absolute inset-0 size-full" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* FILTER: ORGANIC STROMA FIBERS */}
            <filter id="stroma-fibers" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.015 0.12" numOctaves="8" seed="123" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="90" xChannelSelector="R" yChannelSelector="G" />
            </filter>

            {/* FILTER: ORGANIC DEPTH & CRYPTS */}
            <filter id="iris-depth" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="4" seed="456" result="noise" />
              <feColorMatrix type="saturate" values="0.3" />
              <feComposite in="SourceGraphic" in2="noise" operator="in" />
            </filter>

            {/* EMERALD CLINICAL GRADIENT */}
            <radialGradient id="iris-main" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0A1A09" /> {/* Inner Edge */}
              <stop offset="12%" stopColor="#124B4C" /> {/* Teal Ring */}
              <stop offset="42%" stopColor="#2D5A27" /> {/* Emerald Stroma */}
              <stop offset="88%" stopColor="#4E9A44" /> {/* Outer Fibers */}
              <stop offset="100%" stopColor="#051004" /> {/* Limbal Ring */}
            </radialGradient>

            {/* SPECULAR CORNEAL LUSTRE */}
            <linearGradient id="cornea-gloss" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.45" />
              <stop offset="35%" stopColor="white" stopOpacity="0" />
              <stop offset="65%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="white" stopOpacity="0.2" />
            </linearGradient>

            <filter id="soft-glow">
              <feGaussianBlur stdDeviation="15" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* AMBIENT LIMBAL BLOOM */}
          <circle cx="500" cy="500" r="460" fill="#B9FF61" fillOpacity="0.05" filter="url(#soft-glow)" />

          {/* THE PRIMARY IRIS TEXTURE */}
          <circle 
            cx="500" 
            cy="500" 
            r="420" 
            fill="url(#iris-main)" 
            filter="url(#stroma-fibers)"
            className="opacity-95" 
          />

          {/* DEPTH OVERLAY (BIOLOGICAL CRYPTS) */}
          <circle 
            cx="500" 
            cy="500" 
            r="418" 
            fill="url(#iris-main)" 
            filter="url(#iris-depth)"
            className="opacity-30"
          />

          {/* THE LIMBAL RING (Obsidian Outer Edge) */}
          <circle 
            cx="500" 
            cy="500" 
            r="422" 
            stroke="#051004" 
            strokeWidth="15" 
            className="opacity-80"
          />

          {/* CRYSTALLINE CORNEAL GLOSS */}
          <circle 
            cx="500" 
            cy="500" 
            r="420" 
            fill="url(#cornea-gloss)" 
            className="opacity-60"
          />

          {/* REFRACTIVE RIM LIGHTING */}
          <circle 
            cx="500" 
            cy="500" 
            r="418" 
            stroke="white" 
            strokeWidth="0.8" 
            className="opacity-30"
          />
        </svg>

        {/* LAYER 2: INTERACTIVE PUPIL CORE */}
        <div 
          className="relative size-[15%] flex items-center justify-center transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `scale(${dilation}) translateZ(50px)` }}
        >
          {/* Obsidian Pupil Void */}
          <div className="absolute inset-0 rounded-full bg-[#0F0A2A] shadow-[0_0_80px_rgba(0,0,0,0.95)]" />
          
          {/* Aqueous Reflection Layer */}
          <div className="size-full rounded-full border border-white/20 bg-gradient-to-br from-white/20 to-transparent" />
          
          {/* MOISTURE SPECULAR HIGHLIGHT */}
          <div className="absolute top-[10%] left-[10%] size-1/2 bg-white/25 rounded-full blur-xl" />
        </div>

        {/* PERIPHERAL CLINICAL HUD LAYER */}
        <div className="absolute inset-[-80px] border-[0.5px] border-[#B9FF61]/10 rounded-full animate-[spin_400s_linear_infinite]" />
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
