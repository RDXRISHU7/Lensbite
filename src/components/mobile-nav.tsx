'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ScanBarcode, History, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', icon: Home, href: '/' },
  { label: 'Scan', icon: ScanBarcode, href: '/scanner/barcode' },
  { label: 'Vault', icon: History, href: '/history' },
  { label: 'Profile', icon: User, href: '/profile' },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-6 inset-x-6 z-[100]">
      <div className="bg-white/90 dark:bg-black/80 backdrop-blur-xl h-20 rounded-[2rem] flex items-center justify-around px-4 border border-border/50 shadow-2xl">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-14 h-14 transition-all duration-300 relative group",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("size-6 relative z-10", isActive && "scale-110")} />
              <span className={cn(
                "text-[9px] font-bold uppercase tracking-wider mt-1 relative z-10",
                isActive ? "opacity-100" : "opacity-60"
              )}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-1.5 w-1 h-1 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}