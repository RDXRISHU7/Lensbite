'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ScanBarcode, History, User, Fingerprint } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'System', icon: Home, href: '/' },
  { label: 'Capture', icon: ScanBarcode, href: '/scanner/barcode' },
  { label: 'Vault', icon: History, href: '/history' },
  { label: 'Profile', icon: User, href: '/profile' },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-6 inset-x-6 z-[100]">
      <div className="bg-black/80 backdrop-blur-2xl h-16 rounded-full flex items-center justify-around px-2 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-12 h-12 transition-all duration-500 relative group",
                isActive ? "text-primary" : "text-muted-foreground/60 hover:text-foreground"
              )}
            >
              <Icon className={cn("size-5 relative z-10 transition-transform duration-500", isActive && "scale-110 -translate-y-1")} />
              <span className={cn(
                "text-[7px] font-black uppercase tracking-widest mt-1 relative z-10 transition-all",
                isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
              )}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}