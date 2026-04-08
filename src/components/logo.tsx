import Link from 'next/link';
import { Shield } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-4 group ${className}`}>
      <div className="relative">
        <div className="size-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:rotate-[15deg] group-hover:bg-primary/20">
          <Shield className="size-5 text-primary" />
        </div>
        <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-black italic tracking-tighter leading-none uppercase text-white">
          Lens<span className="text-primary">Bite</span>
        </span>
        <span className="text-[8px] font-black italic tracking-[0.3em] text-white/30 uppercase leading-none mt-1">
          Smart Food Analysis
        </span>
      </div>
    </Link>
  );
}
