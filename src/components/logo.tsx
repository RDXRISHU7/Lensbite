import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export function Logo(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Link href="/" className="flex items-center gap-3 group" {...props}>
      <div className="relative">
        <div className="size-8 bg-primary rounded-[0.5rem] flex items-center justify-center shadow-[0_0_20px_rgba(0,230,118,0.4)] group-hover:rotate-[15deg] transition-transform duration-500">
          <ShieldCheck className="size-5 text-background" />
        </div>
        <div className="absolute -top-1 -right-1 size-2.5 bg-primary border-2 border-background rounded-full animate-pulse" />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tighter text-foreground leading-none italic uppercase group-hover:text-primary transition-colors">
            Lens Bite
          </span>
          <span className="text-[7px] font-black bg-primary/20 text-primary px-1 rounded-sm tracking-widest leading-none py-0.5 animate-pulse">LIVE</span>
        </div>
        <span className="text-[8px] font-black tracking-[0.4em] uppercase opacity-40 leading-none mt-1">
          Smart Food Analysis
        </span>
      </div>
    </Link>
  );
}