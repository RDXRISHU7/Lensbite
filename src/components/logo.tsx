import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export function Logo(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group" {...props}>
      <div className="relative">
        <div className="size-9 bg-primary rounded-xl flex items-center justify-center shadow-md group-hover:rotate-6 transition-transform duration-300">
          <ShieldCheck className="size-5 text-white" />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="text-xl font-extrabold tracking-tight text-foreground leading-none">
            Lens<span className="text-primary">Bite</span>
          </span>
          <span className="text-[8px] font-bold bg-accent/10 text-accent px-1.5 rounded-full tracking-wide py-0.5">V1.2</span>
        </div>
        <span className="text-[9px] font-semibold tracking-wide text-muted-foreground uppercase leading-none mt-1">
          Smart Food Intelligence
        </span>
      </div>
    </Link>
  );
}