import Link from 'next/link';
import { Layers } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-5 group ${className}`}>
      <div className="relative">
        <div className="size-12 bg-primary rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-[15deg] shadow-[0_0_40px_rgba(0,230,118,0.3)]">
          <Layers className="size-7 text-background" />
        </div>
        <div className="absolute inset-0 border border-primary/40 rounded-2xl scale-125 -z-10 animate-pulse-ring" />
      </div>
      <div className="flex flex-col">
        <span className="text-3xl font-black tracking-tighter leading-[0.8] uppercase text-white">
          Lens<span className="text-primary">Bite</span>
        </span>
        <span className="text-[9px] font-black tracking-[0.5em] text-white/30 uppercase leading-none mt-2">
          Clinical System
        </span>
      </div>
    </Link>
  );
}
