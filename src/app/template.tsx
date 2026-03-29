'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Template({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // We use the pathname as a key to force re-render and re-trigger animations on every route change
  if (!mounted) return <div className="opacity-0">{children}</div>;

  return (
    <div key={pathname} className="relative min-h-screen">
      {/* Sick Global Scan Wipe Overlay - Re-triggers on every navigation */}
      <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
        <div className="w-full h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-scan-wipe" />
        <div className="absolute inset-0 bg-primary/5 opacity-0 animate-pulse-fast pointer-events-none" />
      </div>

      <div
        className={cn(
          "animate-reveal"
        )}
      >
        {children}
      </div>
    </div>
  );
}
