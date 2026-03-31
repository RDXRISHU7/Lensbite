import Link from 'next/link';
import { Fingerprint } from 'lucide-react';

export function Logo(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Link href="/" className="flex items-center gap-5 group" {...props}>
      <div className="relative preserve-3d">
        <div className="size-14 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.4)] group-hover:rotate-12 transition-all duration-700">
          <Fingerprint className="size-8 text-white" />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-black tracking-tighter text-white leading-none">
            LENS<span className="text-primary">BITE</span>
          </span>
          <div className="size-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
        </div>
        <span className="text-[10px] font-black tracking-[0.4em] text-muted-foreground uppercase leading-none mt-1.5 opacity-40">
          Clinical Security
        </span>
      </div>
    </Link>
  );
}