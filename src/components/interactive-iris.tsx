'use client';

import { useEffect, useState } from 'react';

/**
 * Bio-Digital Iris Engine v8.0 | Hyper-Realistic Macro Reconstruction
 * 
 * - Triple-Zone Stroma Architecture (Ciliary, Collarette, Pupillary).
 * - Radial displacement mapping for biological fiber realism.
 * - Scroll-synced dilation with high-fidelity easing.
 * - Crystalline Corneal Gloss for 3D depth.
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
      <div className="relative size-[650px] md:size-[850px] flex items-center justify-center scale-110 perspective-3d">
        
        {/* THE BIOLOGICAL IRIS ARCHITECTURE */}
        <svg className="absolute inset-0 size-full drop-shadow-[0_0_50px_rgba(0,0,0,0.2)]" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* FILTER: PRIMARY STROMA FIBERS (Deep Layer) */}
            <filter id="stroma-base" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.015 0.15" numOctaves="8" seed="123" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="120" xChannelSelector="R" yChannelSelector="G" />
            </filter>

            {/* FILTER: FINE CILIARY FIBERS (Surface Layer) */}
            <filter id="stroma-fine" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="turbulence" baseFrequency="0.04 0.3" numOctaves="10" seed="456" result="noise" />
              <feColorMatrix type="saturate" values="0.5" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="60" xChannelSelector="R" yChannelSelector="G" />
            </filter>

            {/* EMERALD-FOREST GRADIENT SYSTEM */}
            <radialGradient id="iris-main" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0A1A09" /> {/* Inner Void Edge */}
              <stop offset="15%" stopColor="#124B4C" /> {/* Pupillary Teal */}
              <stop offset="35%" stopColor="#2D5A27" /> {/* Emerald Stroma */}
              <stop offset="75%" stopColor="#4E9A44" /> {/* Ciliary Fibers */}
              <stop offset="92%" stopColor="#B9FF61" stopOpacity="0.8" /> {/* Neon Highlights */}
              <stop offset="100%" stopColor="#051004" /> {/* Limbal Ring Edge */}
            </radialGradient>

            {/* SPECULAR CORNEAL MOISTURE */}
            <linearGradient id="cornea-gloss" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.4" />
              <stop offset="40%" stopColor="white" stopOpacity="0" />
              <stop offset="60%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="white" stopOpacity="0.15" />
            </linearGradient>

            <filter id="soft-glow">
              <feGaussianBlur stdDeviation="20" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* AMBIENT LIMBAL DEPTH */}
          <circle cx="500" cy="500" r="470" fill="#051004" fillOpacity="0.1" filter="url(#soft-glow)" />

          {/* LAYER 1: THE PRIMARY STROMA (Fibrous Base) */}
          <circle 
            cx="500" 
            cy="500" 
            r="440" 
            fill="url(#iris-main)" 
            filter="url(#stroma-base)"
            className="opacity-95" 
          />

          {/* LAYER 2: SURFACE FIBER DETAIL */}
          <circle 
            cx="500" 
            cy="500" 
            r="435" 
            fill="url(#iris-main)" 
            filter="url(#stroma-fine)"
            className="opacity-40"
          />

          {/* THE LIMBAL RING (Sharp Definition Outer) */}
          <circle 
            cx="500" 
            cy="500" 
            r="445" 
            stroke="#051004" 
            strokeWidth="12" 
            className="opacity-90"
          />

          {/* CRYSTALLINE CORNEAL LUSTRE */}
          <circle 
            cx="500" 
            cy="500" 
            r="440" 
            fill="url(#cornea-gloss)" 
            className="opacity-70"
          />

          {/* RIM HIGHLIGHTING */}
          <circle 
            cx="500" 
            cy="500" 
            r="438" 
            stroke="white" 
            strokeWidth="0.5" 
            className="opacity-20"
          />
        </svg>

        {/* INTERACTIVE PUPIL CORE */}
        <div 
          className="relative size-[16%] flex items-center justify-center transition-transform duration-700 ease-out"
          style={{ transform: `scale(${dilation}) translateZ(40px)` }}
        >
          {/* Obsidian Pupil Void */}
          <div className="absolute inset-0 rounded-full bg-[#0F0A2A] shadow-[0_0_100px_rgba(0,0,0,0.95)]" />
          
          {/* Aqueous Reflection Layer */}
          <div className="size-full rounded-full border border-white/10 bg-gradient-to-br from-white/10 to-transparent" />
          
          {/* SPECULAR MOISTURE HIGHLIGHT */}
          <div className="absolute top-[15%] left-[15%] size-1/3 bg-white/20 rounded-full blur-xl" />
        </div>

        {/* PERIPHERAL HUD RING */}
        <div className="absolute inset-[-60px] border-[0.5px] border-[#B9FF61]/5 rounded-full animate-[spin_360s_linear_infinite]" />
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
