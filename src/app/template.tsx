'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="opacity-0">{children}</div>;

  return (
    <div key={pathname} className="relative min-h-screen">
      {/* Premium Fluid Wipe Transition */}
      <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
        <div className="w-full h-full bg-primary/5 backdrop-blur-[4px] animate-scan-wipe" />
      </div>

      <div className="animate-reveal ease-out">
        {children}
      </div>
    </div>
  );
}