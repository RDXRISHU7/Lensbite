
'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

export function InteractiveIris() {
  const [dilation, setDilation] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress (0 to 1)
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / (maxScroll * 0.5), 1); // Max dilation reached at 50% scroll
      
      // Pupil scale: 1 (normal) to 2.5 (dilated)
      setDilation(1 + progress * 1.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[-1] flex items-center justify-center overflow-hidden opacity-30 md:opacity-50 transition-opacity duration-1000"
    >
      {/* 3D IRIS CONTAINER */}
      <div className="relative size-[600px] md:size-[1000px] flex items-center justify-center perspective-3d">
        
        {/* OUTER REFRACTIVE HUD RING */}
        <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_60s_linear_infinite] opacity-20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-primary text-white text-[8px] font-black uppercase tracking-[0.5em] rounded-full">
                System Core Active
            </div>
        </div>

        {/* THE IRIS STRUCTURE */}
        <div className="relative size-full rounded-full overflow-hidden flex items-center justify-center bg-black/5 backdrop-blur-sm">
            
            {/* ORGANIC FIBER LAYER (SVG Filtered) */}
            <svg className="absolute inset-0 size-full opacity-60">
                <defs>
                    <filter id="iris-noise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                        <feColorMatrix type="saturate" values="0.1" />
                    </filter>
                    <radialGradient id="iris-gradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#0F0A2A" />
                        <stop offset="30%" stopColor="#7C43F1" stopOpacity="0.4" />
                        <stop offset="70%" stopColor="#F6D5EE" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                </defs>
                <circle cx="50%" cy="50%" r="48%" fill="url(#iris-gradient)" />
                <rect width="100%" height="100%" filter="url(#iris-noise)" opacity="0.15" />
            </svg>

            {/* THE PUPIL (Interactive Dilation) */}
            <div 
                className="relative size-1/4 bg-[#0F0A2A] rounded-full shadow-[0_0_80px_rgba(124,67,241,0.5)] transition-transform duration-300 ease-out flex items-center justify-center border border-primary/20"
                style={{ transform: `scale(${dilation})` }}
            >
                {/* INNER PUPIL GLOW */}
                <div className="size-1/2 bg-primary/20 rounded-full blur-xl animate-pulse" />
            </div>

            {/* CRYSTALLINE LENS OVERLAY (Glossy Refraction) */}
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_120px_rgba(255,255,255,0.1)]">
                <div className="absolute top-1/4 left-1/4 size-1/3 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl transform -rotate-12" />
                <div className="absolute bottom-1/4 right-1/4 size-1/4 bg-gradient-to-tl from-primary/10 to-transparent rounded-full blur-2xl" />
            </div>
        </div>

        {/* DATA HUD AXIS */}
        <div className="absolute inset-[-40px] border-[0.5px] border-white/10 rounded-full animate-[spin_120s_linear_infinite_reverse]" />
      </div>
    </div>
  );
}
