'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Clinical Lens Core v10.0 | Hyper-Realistic 3D Aperture
 * 
 * - Multi-planar 3D Shutter Blades (Mechanical Iris)
 * - Crystalline Optic Elements (Glass Parallax)
 * - Scroll-synced Mechanical Focus Shift
 * - Titanium & Obsidian Material Finish
 */
export function ClinicalLensCore() {
  const [rotation, setRotation] = useState(0);
  const [dilation, setDilation] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(scrollY / (windowHeight * 0.8 || 1), 1);
      
      setRotation(scrollY * 0.08);
      // Aperture opening logic (1.0 to 1.5x scale)
      setDilation(1 + progress * 0.5);
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
          transform: `rotateY(${rotation * 0.1}deg) rotateX(${rotation * 0.05}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        
        {/* REAR OPTIC ELEMENT - THE IMAGE SENSOR DEPTH */}
        <div 
          className="absolute size-64 md:size-80 bg-gradient-to-br from-[#0F0A2A] to-primary/20 rounded-full border border-white/10 shadow-[0_0_100px_rgba(124,67,241,0.2)]"
          style={{ transform: 'translateZ(-200px)' }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-32 bg-primary/30 rounded-full blur-[60px] animate-pulse" />
          </div>
        </div>

        {/* MECHANICAL IRIS SHUTTER ASSEMBLY */}
        <div 
          className="relative size-[400px] md:size-[600px] flex items-center justify-center transition-transform duration-700 ease-clinical"
          style={{ 
            transform: `scale(${dilation}) translateZ(0px)`,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* APERTURE BLADES - 10 BLADE ARRAY */}
          {[...Array(10)].map((_, i) => (
            <div 
              key={`blade-${i}`}
              className="absolute w-[120%] h-32 md:h-48 origin-right transition-all duration-1000 ease-clinical"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, #1E293B 100%)',
                clipPath: 'polygon(0% 50%, 100% 0%, 100% 100%)',
                transform: `rotate(${i * 36 + rotation * 0.2}deg) translateX(-50%)`,
                opacity: 0.9,
                borderRight: '1px solid rgba(255,255,255,0.1)',
                zIndex: i
              }}
            />
          ))}

          {/* INNER RETAINING RING */}
          <div className="absolute size-full border-[1.5rem] md:border-[3rem] border-slate-900 rounded-full shadow-2xl" />
        </div>

        {/* CRYSTALLINE LENS ELEMENTS (FRONT OPTICS) */}
        {[...Array(3)].map((_, i) => (
          <div 
            key={`lens-${i}`}
            className={cn(
              "absolute size-[500px] md:size-[800px] rounded-full backdrop-blur-3xl border border-white/30 transition-all duration-700 ease-clinical",
              i === 0 ? "bg-white/5 shadow-inner" : "bg-primary/5"
            )}
            style={{
              transform: `translateZ(${(i + 1) * 80}px) scale(${1 - i * 0.1})`,
              opacity: 0.3 - i * 0.05
            }}
          >
            {/* REFRACTIVE SHINE */}
            <div className="absolute top-[10%] left-[20%] size-1/3 bg-white/20 rounded-full blur-3xl rotate-45" />
          </div>
        ))}

        {/* HARDWARE STATUS NODES */}
        {[...Array(12)].map((_, i) => (
          <div 
            key={`marker-${i}`}
            className="absolute size-1.5 bg-accent rounded-full shadow-[0_0_15px_#B9FF61]"
            style={{
              transform: `rotateZ(${i * 30}deg) translateY(-450px) translateZ(150px)`,
              opacity: 0.4
            }}
          />
        ))}

      </div>
    </div>
  );
}
