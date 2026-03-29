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
    <nav className="md:hidden fixed bottom-6 inset-x-4 z-[100]">
      <div className="glass-panel h-20 rounded-[2.5rem] flex items-center justify-around px-2 border-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300 relative group",
                isActive ? "text-primary scale-110" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-md" />
              )}
              <Icon className={cn("size-6 relative z-10", isActive && "animate-pulse")} />
              <span className="text-[10px] font-black uppercase tracking-widest mt-1 relative z-10">
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
