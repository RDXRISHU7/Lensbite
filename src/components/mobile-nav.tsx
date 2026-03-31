'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ScanBarcode, History, User, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'System', icon: Home, href: '/' },
  { label: 'Scan', icon: ScanBarcode, href: '/scanner/barcode' },
  { label: 'Vault', icon: History, href: '/history' },
  { label: 'Profile', icon: User, href: '/profile' },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-6 inset-x-6 z-[100] md:hidden">
      <div className="glass-panel h-16 rounded-full flex items-center justify-around px-2 border-white/20 shadow-2xl">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-12 h-12 transition-all duration-300 relative group",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("size-5 relative z-10 transition-transform", isActive && "scale-110 -translate-y-1")} />
              <span className={cn(
                "text-[7px] font-black uppercase tracking-widest mt-1 relative z-10 transition-all",
                isActive ? "opacity-100" : "opacity-0 scale-50"
              )}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -inset-1 bg-primary/10 rounded-full blur-md animate-pulse" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
