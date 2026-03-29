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

  if (!mounted) return <div className="opacity-0">{children}</div>;

  return (
    <div key={pathname} className="relative min-h-screen">
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