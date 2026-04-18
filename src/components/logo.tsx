import Link from 'next/link';
import { Shield } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 group ${className}`}>
      <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm transition-all group-hover:scale-105">
        <Shield size={22} fill="currentColor" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-black leading-none tracking-tight text-[#0F0A2A] uppercase">
          LensBite
        </span>
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary/80 mt-1">
          Clinical Core
        </span>
      </div>
    </Link>
  );
}