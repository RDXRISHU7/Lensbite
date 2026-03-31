import Link from 'next/link';
import { Layers } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-4 group ${className}`}>
      <div className="relative">
        <div className="size-10 bg-white rounded-lg flex items-center justify-center transition-transform duration-500 group-hover:rotate-[15deg]">
          <Layers className="size-6 text-black" />
        </div>
        <div className="absolute inset-0 border border-white/20 rounded-lg scale-125 -z-10" />
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-black tracking-tighter leading-none uppercase">
          Lens<span className="text-primary">Bite</span>
        </span>
        <span className="text-[8px] font-bold tracking-[0.4em] text-white/30 uppercase leading-none mt-1">
          Clinical Grade
        </span>
      </div>
    </Link>
  );
}