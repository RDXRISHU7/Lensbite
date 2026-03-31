import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export function Logo(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Link href="/" className="flex items-center gap-3 group" {...props}>
      <div className="relative">
        <div className="size-10 bg-primary rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-all duration-500 group-hover:scale-110">
          <ShieldCheck className="size-6 text-white" />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black italic tracking-tighter text-foreground leading-none">
            Lens<span className="text-primary">Bite</span>
          </span>
          <span className="text-[9px] font-black bg-accent text-white px-2 rounded-full tracking-tighter py-0.5 uppercase">Pro</span>
        </div>
        <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase leading-none mt-1 opacity-60">
          Intelligent Safety
        </span>
      </div>
    </Link>
  );
}