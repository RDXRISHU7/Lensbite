'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Command Core v1.0 | Abstract Intelligence Engine
 * 
 * A non-organic, geometric 3D background object.
 * - Rotating Crystalline Rings
 * - Pulsing Data Core
 * - Scroll-synced 3D Depth
 */
export function CommandCore() {
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
          className="absolute inset-0 border-[0.5px] border-primary/20 rounded-full animate-[spin_60s_linear_infinite]"
          style={{ transform: `rotateX(60deg) rotateY(${rotation * 0.5}deg)` }}
        />

        {/* OUTER ROTATING RING 02 */}
        <div 
          className="absolute inset-20 border-[0.5px] border-accent/30 rounded-full animate-[spin_45s_linear_infinite_reverse]"
          style={{ transform: `rotateX(-60deg) rotateY(${rotation * 0.3}deg)` }}
        />

        {/* DASHED DATA ORBIT */}
        <div 
          className="absolute inset-40 border-t border-b border-dashed border-primary/10 rounded-full animate-[spin_30s_linear_infinite]"
          style={{ transform: `rotateX(45deg)` }}
        />

        {/* THE CORE ENGINE */}
        <div className="relative size-1/3 flex items-center justify-center">
          {/* Glowing Purple Orb */}
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl animate-pulse" />
          
          {/* Crystalline Center */}
          <div 
            className="size-32 rounded-[2rem] bg-gradient-to-br from-primary to-[#D863F1] shadow-[0_0_80px_rgba(124,67,241,0.4)] transition-transform duration-1000 ease-clinical"
            style={{ 
              transform: `rotateX(${rotation * 0.8}deg) rotateY(${rotation * 0.8}deg) scale(${1 + (rotation * 0.001)})`,
              borderRadius: '35%'
            }}
          />

          {/* Precision Accents */}
          <div className="absolute size-48 border border-white/20 rounded-full" />
          <div className="absolute size-2 bg-accent rounded-full -top-24 left-1/2 -translate-x-1/2 shadow-[0_0_20px_#B9FF61]" />
        </div>

        {/* FLOATING DATA PARTICLES */}
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute size-1 bg-primary/40 rounded-full"
            style={{
              transform: `rotate(${(i * 60) + rotation}deg) translateY(-300px)`
            }}
          />
        ))}

      </div>
    </div>
  );
}
