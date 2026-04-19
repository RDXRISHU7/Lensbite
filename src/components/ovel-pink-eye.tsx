'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Ovel Pink Eye | Cinematic Geometric HUD
 * 
 * An archived background object using a Pink/Violet spectrum.
 * - Rotating Crystalline Rings
 * - Pulsing Data Core
 */
export function OvelPinkEye() {
  const [rotation, setRotation] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setRotation(scrollY * 0.1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] flex items-center justify-center overflow-hidden bg-[#F6F4FB]">
      <div 
        className="relative size-[600px] md:size-[900px] flex items-center justify-center perspective-3d"
        style={{ transform: `rotateZ(${rotation * 0.2}deg)` }}
      >
        
        {/* OUTER ROTATING RING 01 */}
        <div 
          className="absolute inset-0 border-[0.5px] border-[#D863F1]/20 rounded-full animate-[spin_60s_linear_infinite]"
          style={{ transform: `rotateX(60deg) rotateY(${rotation * 0.5}deg)` }}
        />

        {/* OUTER ROTATING RING 02 */}
        <div 
          className="absolute inset-20 border-[0.5px] border-[#7C43F1]/30 rounded-full animate-[spin_45s_linear_infinite_reverse]"
          style={{ transform: `rotateX(-60deg) rotateY(${rotation * 0.3}deg)` }}
        />

        {/* THE CORE ENGINE */}
        <div className="relative size-1/3 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#D863F1]/10 blur-3xl animate-pulse" />
          <div 
            className="size-32 rounded-[2rem] bg-gradient-to-br from-[#D863F1] to-[#7C43F1] shadow-[0_0_80px_rgba(216,99,241,0.4)] transition-transform duration-1000"
            style={{ 
              transform: `rotateX(${rotation * 0.8}deg) rotateY(${rotation * 0.8}deg) scale(${1 + (rotation * 0.001)})`,
              borderRadius: '35%'
            }}
          />
        </div>

      </div>
    </div>
  );
}
