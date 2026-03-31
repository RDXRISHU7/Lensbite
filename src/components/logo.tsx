import Link from 'next/link';
import { ShieldCheck, Fingerprint } from 'lucide-react';

export function Logo(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Link href="/" className="flex items-center gap-4 group" {...props}>
      <div className="relative">
        <div className="size-12 bg-primary rounded-[1rem] flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)] group-hover:rotate-12 transition-all duration-700">
          <Fingerprint className="size-7 text-white" />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-black italic tracking-tighter text-white leading-none">
            LENS<span className="text-primary">BITE</span>
          </span>
          <div className="size-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
        </div>
        <span className="text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase leading-none mt-1 opacity-40">
          Clinical Security
        </span>
      </div>
    </Link>
  );
}