'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Clinical Shard Core v22.0 | Hybrid Kinetic Engine
 * 
 * - Multi-face Octahedral Shard lattice.
 * - Symmetrical 8-shard geometric alignment.
 * - Perpetual slow 360-degree clockwise rotation when idle.
 * - Scroll-synced orientation and depth shifts for interaction feedback.
 */
export function ClinicalBackground() {
  const [scrollRotation, setScrollRotation] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Precise mechanical mapping of scroll to 3D orientation
      setScrollRotation(scrollY * 0.05);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] flex items-center justify-center overflow-hidden bg-[#F6F4FB]">
      {/* SCROLL-SYNCED VIEWPORT */}
      <div 
        className="relative size-[600px] md:size-[1000px] flex items-center justify-center perspective-3d transition-transform duration-1000 ease-clinical"
        style={{ 
          transform: `rotateY(${scrollRotation}deg) rotateX(${scrollRotation * 0.2}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        
        {/* PERPETUAL IDLE ROTATION WRAPPER (Clockwise 360) */}
        <div 
          className="absolute inset-0 flex items-center justify-center animate-spin-slow-3d"
          style={{ transformStyle: 'preserve-3d' }}
        >
            
            {/* CENTRAL HARDWARE CORE */}
            <div 
              className="absolute size-64 md:size-96 bg-gradient-to-br from-primary/30 to-accent/30 backdrop-blur-3xl rounded-[3rem] border border-white/40 shadow-2xl"
              style={{ 
                transform: 'translateZ(150px)',
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="size-48 bg-primary/20 rounded-full blur-[80px] animate-pulse" />
              </div>
            </div>

            {/* 3D FLOATING SHARDS - SYMMETRICAL LATTICE */}
            {[...Array(8)].map((_, i) => (
              <div 
                key={`shard-${i}`}
                className={cn(
                  "absolute size-72 md:size-96 backdrop-blur-2xl border transition-all duration-1000 ease-clinical shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_32px_rgba(31,38,135,0.05)]",
                  i % 2 === 0 
                    ? "bg-white/10 border-white/40 rounded-[4rem]" 
                    : "bg-primary/5 border-primary/20 rounded-[2rem]"
                )}
                style={{
                  transform: `rotateX(${i * 45}deg) rotateY(${i * 22.5}deg) translateZ(400px)`,
                  opacity: 0.6
                }}
              />
            ))}

            {/* CONNECTIVE DATA LATTICE */}
            <div 
              className="absolute inset-0 border-[0.5px] border-black/5 rounded-full" 
              style={{ transform: 'translateZ(-200px)' }} 
            />
            
            <div 
              className="absolute inset-40 border-[0.5px] border-primary/10 rounded-full" 
              style={{ transform: 'rotateX(45deg) translateZ(-100px)' }}
            />
            
        </div>

      </div>
    </div>
  );
}
