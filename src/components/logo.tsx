import Link from 'next/link';
import { Shield } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 group ${className}`}>
      <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
        <Shield size={18} />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold leading-none tracking-tight text-foreground">
          BiteLens
        </span>
        <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Clinical AI
        </span>
      </div>
    </Link>
  );
}