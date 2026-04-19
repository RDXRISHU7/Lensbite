'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Clinical Human Core v1.0 | Holographic Biometric Model
 * 
 * - Multi-planar 3D Human Silhouette
 * - Carcinogen Hazard Nodes (Lungs, Liver, Colon, Stomach)
 * - Scroll-synced 3D Rotation
 * - Data Filament Lattice
 */
export function ClinicalHumanCore() {
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
        className="relative size-[600px] md:size-[900px] flex items-center justify-center perspective-3d"
        style={{ 
          transform: `rotateY(${rotation}deg) rotateX(${rotation * 0.2}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        
        {/* HOLOGRAPHIC BIOMETRIC SILHOUETTE */}
        <div 
          className="relative size-full flex items-center justify-center transition-transform duration-1000 ease-clinical"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* VOLUMETRIC BODY LAYERS (Simulating 3D Depth) */}
          {[...Array(5)].map((_, i) => (
            <svg 
              key={`layer-${i}`}
              className="absolute size-full opacity-10"
              viewBox="0 0 100 100"
              style={{ 
                transform: `translateZ(${(i - 2) * 40}px) scale(${1 - Math.abs(i - 2) * 0.05})`,
                color: i === 2 ? '#7C43F1' : '#B9FF61'
              }}
            >
              <path 
                d="M50 5 C45 5, 42 8, 42 12 C42 16, 45 20, 50 20 C55 20, 58 16, 58 12 C58 8, 55 5, 50 5 M42 22 L58 22 L62 45 L58 45 L58 70 L55 95 L45 95 L42 70 L42 45 L38 45 Z" 
                fill="currentColor" 
                className="transition-all duration-700"
              />
            </svg>
          ))}

          {/* HAZARD SCRUTINY NODES (Organs affected by carcinogens) */}
          {[
            { id: 'lungs', pos: [30, 50, 42], label: 'Respiratory Hazard' },
            { id: 'liver', pos: [45, 52, 48], label: 'Metabolic Toxin' },
            { id: 'colon', pos: [60, 50, 52], label: 'Digestive Risk' },
            { id: 'stomach', pos: [52, 45, 48], label: 'Nitrite Target' }
          ].map((node) => (
            <div 
              key={node.id}
              className="absolute size-4 bg-accent rounded-full shadow-[0_0_20px_#B9FF61] group"
              style={{
                transform: `translateX(${node.pos[1] - 50}px) translateY(${node.pos[0] - 50}px) translateZ(${node.pos[2]}px)`,
              }}
            >
              <div className="absolute inset-[-10px] rounded-full border border-accent/40 animate-ping" />
              <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[8px] font-black uppercase tracking-widest text-white">{node.label}</span>
              </div>
            </div>
          ))}

          {/* CONNECTIVE DATA LATTICE */}
          <div 
            className="absolute inset-0 border-[0.5px] border-primary/10 rounded-full" 
            style={{ transform: 'rotateX(90deg) translateZ(0px)' }} 
          />
          <div 
            className="absolute inset-0 border-[0.5px] border-accent/10 rounded-full" 
            style={{ transform: 'rotateY(90deg) translateZ(0px)' }} 
          />

        </div>

        {/* SCANNING FIELD RING */}
        <div 
          className="absolute size-[500px] border-4 border-dashed border-primary/20 rounded-full animate-[spin_60s_linear_infinite]"
          style={{ transform: 'rotateX(75deg) translateZ(-100px)' }}
        />

      </div>
    </div>
  );
}
