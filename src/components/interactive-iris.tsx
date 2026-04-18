'use client';

import { useEffect, useState } from 'react';

/**
 * Crystalline Power Core v6.0 - Abstract Clinical Engine
 * 
 * - Replaces biological "creepy" textures with high-tech geometric light rings.
 * - Scroll-synced dilation focused behind hero text area.
 * - Hydration-safe mount check to prevent SSR mismatches.
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
      const progress = Math.min(scrollY / (windowHeight * 0.5 || 1), 1);
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
    <div className="fixed inset-0 pointer-events-none z-[-1] flex items-center justify-center overflow-hidden transition-opacity duration-1000 opacity-100">
      {/* 3D VIEWPORT CONTAINER */}
      <div className="relative size-[600px] md:size-[850px] flex items-center justify-center">
        
        {/* THE DIGITAL APERTURE STRUCTURE */}
        <svg className="absolute inset-0 size-full" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7C43F1" stopOpacity="0.2" />
              <stop offset="60%" stopColor="#7C43F1" stopOpacity="0.05" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            
            <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B9FF61" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#7C43F1" stopOpacity="0.1" />
            </linearGradient>

            <filter id="bloom">
              <feGaussianBlur stdDeviation="20" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* AMBIENT BACKGROUND GLOW */}
          <circle cx="500" cy="500" r="450" fill="url(#core-glow)" filter="url(#bloom)" />

          {/* CONCENTRIC APERTURE RINGS */}
          {[...Array(15)].map((_, i) => (
            <circle
              key={i}
              cx="500"
              cy="500"
              r={120 + i * 20}
              stroke="url(#ring-gradient)"
              strokeWidth="0.5"
              className="opacity-20"
              style={{
                transformOrigin: 'center',
                animation: `pulse ${5 + i * 0.5}s ease-in-out infinite alternate`,
              }}
            />
          ))}

          {/* ROTATING DATA AXIS RINGS */}
          <circle 
            cx="500" 
            cy="500" 
            r="180" 
            stroke="#B9FF61" 
            strokeWidth="1" 
            strokeDasharray="4 12" 
            className="opacity-40 animate-[spin_40s_linear_infinite]" 
          />
          <circle 
            cx="500" 
            cy="500" 
            r="420" 
            stroke="#7C43F1" 
            strokeWidth="0.5" 
            strokeDasharray="2 20" 
            className="opacity-10 animate-[spin_120s_linear_reverse_infinite]" 
          />
        </svg>

        {/* THE INTERACTIVE POWER CORE (PUPIL REPLACEMENT) */}
        <div 
          className="relative size-[16%] flex items-center justify-center transition-transform duration-700 ease-out"
          style={{ transform: `scale(${dilation})` }}
        >
          {/* Glass Sphere Core */}
          <div className="absolute inset-0 rounded-full liquid-glass-base liquid-glass-purple shadow-[0_0_100px_rgba(124,67,241,0.5)]" />
          
          {/* Internal Refractive Light */}
          <div className="size-1/2 bg-white/30 rounded-full blur-xl animate-pulse" />
          
          {/* High-Intensity Specular Rim */}
          <div className="absolute inset-0 rounded-full border border-white/40" />
        </div>

        {/* OUTER CLINICAL RADIUS */}
        <div className="absolute inset-[-100px] border-[0.5px] border-primary/5 rounded-full animate-[spin_300s_linear_infinite]" />
      </div>

      <style jsx global>{`
        @keyframes pulse {
          from { transform: scale(1); opacity: 0.1; }
          to { transform: scale(1.08); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
