'use client';

import { useEffect, useState } from 'react';

/**
 * Bio-Digital Iris Engine v4.0 - Hyper-Realistic Biological Fidelity
 * 
 * - Multi-layered fibrous texture via high-octave fractal noise.
 * - Emerald, Teal, and Olive color matrix calibrated to user reference.
 * - Scroll-synced pupil dilation calibrated for cinematic hero impact.
 */
export function InteractiveIris() {
  const [dilation, setDilation] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Reach peak dilation early in the hero section
      const progress = Math.min(scrollY / (windowHeight * 0.8 || 1), 1);
      
      // Pupil scale: 1.0 (contracted) to 2.2 (dilated)
      setDilation(1 + progress * 1.2);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] flex items-center justify-center overflow-hidden transition-opacity duration-1000">
      {/* 3D VIEWPORT CONTAINER */}
      <div className="relative size-[1000px] md:size-[2000px] flex items-center justify-center scale-110">
        
        {/* THE BIOLOGICAL IRIS STRUCTURE */}
        <svg className="absolute inset-0 size-full" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Hyper-Realistic Biological Fiber Texture */}
            <filter id="iris-fibers" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="8" seed="42" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="60" xChannelSelector="R" yChannelSelector="G" />
            </filter>

            {/* Specular Light Reflection Filter */}
            <filter id="lens-gloss">
              <feGaussianBlur stdDeviation="15" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Emerald/Teal Depth Gradients */}
            <radialGradient id="iris-gradient-complex" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#0F0A2A" />
              <stop offset="10%" stopColor="#1A3B18" />
              <stop offset="30%" stopColor="#2D5A27" />
              <stop offset="50%" stopColor="#4E9A44" />
              <stop offset="75%" stopColor="#124B4C" />
              <stop offset="90%" stopColor="#B9FF61" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1A3B18" stopOpacity="0.8" />
            </radialGradient>

            {/* Sub-Surface Light Scatter */}
            <radialGradient id="rim-light" cx="50%" cy="50%" r="50%">
              <stop offset="85%" stopColor="transparent" />
              <stop offset="95%" stopColor="#B9FF61" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#B9FF61" stopOpacity="0.3" />
            </radialGradient>
          </defs>

          {/* BASE COLOR PLANE */}
          <circle cx="500" cy="500" r="480" fill="url(#iris-gradient-complex)" />
          
          {/* FIBROUS LAYER 01 - CORE TEXTURE */}
          <circle cx="500" cy="500" r="460" filter="url(#iris-fibers)" fill="url(#iris-gradient-complex)" opacity="0.9" />
          
          {/* FIBROUS LAYER 02 - HIGHLIGHTS */}
          <circle cx="500" cy="500" r="460" filter="url(#iris-fibers)" fill="white" opacity="0.05" />
          
          {/* RIM LIGHTING */}
          <circle cx="500" cy="500" r="480" fill="url(#rim-light)" />
          
          {/* CRYSTALLINE LENS REFLECTIONS */}
          <ellipse cx="380" cy="380" rx="120" ry="80" fill="white" opacity="0.08" filter="url(#lens-gloss)" transform="rotate(-15, 380, 380)" />
          <circle cx="680" cy="620" r="40" fill="white" opacity="0.04" filter="url(#lens-gloss)" />
        </svg>

        {/* INTERACTIVE PUPIL CORE (Scroll Responsive) */}
        <div 
          className="relative size-[18%] bg-[#0F0A2A] rounded-full shadow-[0_0_150px_rgba(15,10,42,0.8)] transition-transform duration-1000 ease-out flex items-center justify-center border border-white/5"
          style={{ transform: `scale(${dilation})` }}
        >
          {/* Inner Bio-Luminescence */}
          <div className="size-full bg-gradient-to-tr from-[#124B4C]/20 to-transparent rounded-full" />
          
          {/* Refractive Rim */}
          <div className="absolute inset-0 rounded-full border-[0.5px] border-white/20" />
        </div>

        {/* DATA HUD ROTATION AXIS (Subtle Clinical Overlay) */}
        <div className="absolute inset-[-100px] border-[0.5px] border-[#B9FF61]/5 rounded-full animate-[spin_420s_linear_infinite]" />
      </div>
    </div>
  );
}
