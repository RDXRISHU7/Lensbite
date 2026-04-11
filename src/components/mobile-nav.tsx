'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ScanBarcode, History, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', icon: Home, href: '/' },
  { label: 'Scan', icon: ScanBarcode, href: '/scanner/barcode' },
  { label: 'History', icon: History, href: '/history' },
  { label: 'Profile', icon: User, href: '/profile' },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-[100] md:hidden">
      <div className="bg-white h-16 flex items-center justify-around border-t border-border px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className={cn("size-5", isActive && "stroke-[2.5px]")} />
              <span className="text-[10px] font-medium mt-1">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}