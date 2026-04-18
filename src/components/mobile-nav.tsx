'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Barcode, Camera, History, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', icon: Home, href: '/' },
  { label: 'Barcode', icon: Barcode, href: '/scanner/barcode' },
  { label: 'Vision', icon: Camera, href: '/scanner/food' },
  { label: 'Vault', icon: History, href: '/history' },
  { label: 'Profile', icon: User, href: '/profile' },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-[100] md:hidden">
      <div className="bg-white h-20 flex items-center justify-around border-t border-black/5 px-4 pb-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full transition-all duration-300",
                isActive ? "text-primary scale-110" : "text-muted-foreground opacity-60 hover:opacity-100"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-all",
                isActive && "bg-primary/10"
              )}>
                <Icon className={cn("size-5", isActive && "stroke-[2.5px]")} />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest mt-1">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
