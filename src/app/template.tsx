'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Template({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [pathname, mounted]);

  if (!mounted) return <div className="opacity-0">{children}</div>;

  return (
    <div className="relative min-h-screen">
      {/* Cinematic Slide Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-[100] bg-primary pointer-events-none transition-transform duration-700 ease-in-out",
          isTransitioning ? "translate-x-0" : "translate-x-full"
        )}
      />

      <div
        className={cn(
          "transition-all duration-700 ease-out",
          isTransitioning 
            ? "translate-x-[-2vw] opacity-0 blur-xl scale-105" 
            : "translate-x-0 opacity-100 blur-0 scale-100"
        )}
      >
        {children}
      </div>
    </div>
  );
}