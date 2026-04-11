import Link from 'next/link';
import { Shield } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 group ${className}`}>
      <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm transition-all group-hover:scale-105 group-hover:rotate-3">
        <Shield size={20} />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold leading-none tracking-tight text-foreground uppercase">
          LensBite
        </span>
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary/60 mt-0.5">
          Clinical System
        </span>
      </div>
    </Link>
  );
}