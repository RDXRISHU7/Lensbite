'use client';

import { useEffect, useState } from 'react';

/**
 * Bio-Digital Iris Engine v9.0 | Hyper-Realistic Macro Reconstruction
 * 
 * - Multi-Octave Radial Stroma (High-frequency fibers).
 * - Triple-Zone Gradient Mapping (Pupillary, Collarette, Ciliary).
 * - Crystalline Corneal Gloss with 3D offset.
 * - Scroll-synced biological dilation.
 */
export function InteractiveIris() {
  const [dilation, setDilation] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Map scroll progress to pupil dilation (1.0 to 1.8x scale)
      const progress = Math.min(scrollY / (windowHeight * 0.7 || 1), 1);
      setDilation(1 + progress * 0.8);
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
      <div className="relative size-[600px] md:size-[850px] flex items-center justify-center scale-110 perspective-3d">
        
        {/* THE BIOLOGICAL IRIS STRUCTURE */}
        <svg className="absolute inset-0 size-full drop-shadow-[0_20px_60px_rgba(0,0,0,0.3)]" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* STROMA FIBER NOISE: High frequency on Y-axis for radial lines */}
            <filter id="stroma-fibers" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.01 0.4" numOctaves="8" seed="99" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="120" xChannelSelector="R" yChannelSelector="G" />
            </filter>

            {/* STROMA CRYPTS: Organic irregular shapes */}
            <filter id="stroma-crypts" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="10" seed="12" result="noise" />
              <feColorMatrix type="saturate" values="0.3" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="40" xChannelSelector="R" yChannelSelector="G" />
            </filter>

            {/* EMERALD MACRO GRADIENT */}
            <radialGradient id="iris-macro" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#051004" /> {/* Pupil Edge Shadow */}
              <stop offset="10%" stopColor="#124B4C" /> {/* Pupillary Teal */}
              <stop offset="25%" stopColor="#2D5A27" /> {/* Deep Stroma Green */}
              <stop offset="55%" stopColor="#4E9A44" /> {/* Emerald Mid-tones */}
              <stop offset="85%" stopColor="#B9FF61" /> {/* Neon Fiber Highlights */}
              <stop offset="100%" stopColor="#051004" /> {/* Limbal Ring Deep */}
            </radialGradient>

            {/* CORNEAL LUSTRE / WETNESS */}
            <linearGradient id="cornea-shine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.35" />
              <stop offset="30%" stopColor="white" stopOpacity="0" />
              <stop offset="70%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="white" stopOpacity="0.1" />
            </linearGradient>

            <filter id="depth-shadow">
              <feGaussianBlur stdDeviation="30" />
            </filter>
          </defs>

          {/* LAYER 1: LIMBAL ZONE DEPTH */}
          <circle cx="500" cy="500" r="480" fill="#051004" fillOpacity="0.15" filter="url(#depth-shadow)" />

          {/* LAYER 2: PRIMARY FIBROUS STROMA */}
          <circle 
            cx="500" 
            cy="500" 
            r="440" 
            fill="url(#iris-macro)" 
            filter="url(#stroma-fibers)"
            className="opacity-95" 
          />

          {/* LAYER 3: BIOLOGICAL CRYPTS & POCKETS */}
          <circle 
            cx="500" 
            cy="500" 
            r="435" 
            fill="url(#iris-macro)" 
            filter="url(#stroma-crypts)"
            className="opacity-40"
          />

          {/* LAYER 4: THE LIMBAL RING (Sharp Definition) */}
          <circle 
            cx="500" 
            cy="500" 
            r="445" 
            stroke="#051004" 
            strokeWidth="15" 
            className="opacity-90"
          />

          {/* LAYER 5: CRYSTALLINE CORNEA GLOSS */}
          <circle 
            cx="500" 
            cy="500" 
            r="440" 
            fill="url(#cornea-shine)" 
            className="opacity-60"
          />
        </svg>

        {/* INTERACTIVE PUPIL CORE */}
        <div 
          className="relative size-[16%] flex items-center justify-center transition-transform duration-700 ease-clinical"
          style={{ transform: `scale(${dilation}) translateZ(50px)` }}
        >
          {/* Obsidian Pupil Void */}
          <div className="absolute inset-0 rounded-full bg-[#0F0A2A] shadow-[0_0_120px_rgba(0,0,0,1)]" />
          
          {/* Specular Highlight */}
          <div className="absolute top-[10%] left-[10%] size-1/2 bg-white/15 rounded-full blur-xl" />
          <div className="size-full rounded-full border border-white/5 bg-gradient-to-br from-white/10 to-transparent" />
        </div>

      </div>
    </div>
  );
}
