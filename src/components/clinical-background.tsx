'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Clinical Shard Core v2.2 | High-Fidelity 3D Shard
 * 
 * - Multi-face Octahedral Shard
 * - Scroll-synced rotation and 3D depth
 * - Glassmorphic refractive surfaces
 * - Node suppression enabled (Dots removed)
 */
export function ClinicalBackground() {
  const [rotation, setRotation] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setRotation(scrollY * 0.05);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] flex items-center justify-center overflow-hidden bg-[#F6F4FB]">
      <div 
        className="relative size-[600px] md:size-[1000px] flex items-center justify-center perspective-3d"
        style={{ 
          transform: `rotateY(${rotation}deg) rotateX(${rotation * 0.2}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        
        {/* CENTRAL DATA CORE */}
        <div 
          className="absolute size-64 md:size-96 bg-gradient-to-br from-primary/30 to-accent/30 backdrop-blur-3xl rounded-[3rem] border border-white/40 shadow-2xl animate-float-slow"
          style={{ 
            transform: 'translateZ(150px)',
            transformStyle: 'preserve-3d'
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="size-48 bg-primary/20 rounded-full blur-[80px] animate-pulse" />
          </div>
        </div>

        {/* 3D FLOATING SHARDS - OCTAHEDRAL PLANES */}
        {[...Array(6)].map((_, i) => (
          <div 
            key={`shard-${i}`}
            className={cn(
              "absolute size-72 md:size-96 backdrop-blur-2xl border transition-all duration-1000 ease-clinical",
              i % 2 === 0 
                ? "bg-[#B9FF61]/5 border-[#B9FF61]/20 rounded-[4rem]" 
                : "bg-[#7C43F1]/5 border-[#7C43F1]/20 rounded-[2rem]"
            )}
            style={{
              transform: `rotateX(${i * 60}deg) rotateY(${i * 30}deg) translateZ(350px)`,
              opacity: 0.6
            }}
          />
        ))}

        {/* CONNECTIVE DATA LATTICE - BACKGROUND DEPTH */}
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
  );
}