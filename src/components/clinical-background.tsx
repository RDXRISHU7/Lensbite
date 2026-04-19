'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Clinical Data Shard v1.0 | High-Fidelity 3D Background
 * 
 * A high-tech, geometric 3D lattice representing "Lens Bite" data structures.
 * - Multi-planar 3D Shards
 * - Glassmorphic refractive elements
 * - Scroll-synced 3D rotation and depth
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
          transform: `rotateY(${rotation}deg) rotateX(${rotation * 0.5}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        
        {/* CENTRAL DATA CORE */}
        <div 
          className="absolute size-64 md:size-96 bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-3xl rounded-[3rem] border border-white/40 shadow-2xl animate-float-slow"
          style={{ transform: 'translateZ(100px)' }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="size-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          </div>
        </div>

        {/* 3D FLOATING SHARDS - LIME */}
        {[...Array(4)].map((_, i) => (
          <div 
            key={`lime-${i}`}
            className="absolute size-48 md:size-64 bg-[#B9FF61]/10 backdrop-blur-2xl border border-[#B9FF61]/30 rounded-[2rem] shadow-xl"
            style={{
              transform: `rotateX(${i * 90}deg) rotateY(${i * 45}deg) translateZ(300px)`,
            }}
          />
        ))}

        {/* 3D FLOATING SHARDS - PURPLE */}
        {[...Array(4)].map((_, i) => (
          <div 
            key={`purple-${i}`}
            className="absolute size-40 md:size-56 bg-[#7C43F1]/5 backdrop-blur-xl border border-[#7C43F1]/20 rounded-[1.5rem] shadow-lg"
            style={{
              transform: `rotateX(${i * -90}deg) rotateY(${i * -60}deg) translateZ(450px)`,
            }}
          />
        ))}

        {/* CONNECTIVE DATA LATTICE */}
        <div className="absolute inset-0 border-[0.5px] border-black/5 rounded-full" style={{ transform: 'translateZ(-100px)' }} />
        <div className="absolute inset-20 border-[0.5px] border-dashed border-primary/10 rounded-full animate-[spin_60s_linear_infinite]" />

      </div>
    </div>
  );
}
