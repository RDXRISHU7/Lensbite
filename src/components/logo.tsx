import Link from 'next/link';
import { Box } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 group ${className}`}>
      <div className="relative preserve-3d">
        <div className="size-10 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(0,112,243,0.4)] group-hover:rotate-y-180 transition-transform duration-700">
          <Box className="size-6 text-white" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-black tracking-tighter leading-none uppercase">
          Lens<span className="text-primary">Bite</span>
        </span>
        <span className="text-[7px] font-black tracking-[0.4em] text-muted-foreground uppercase leading-none mt-1 opacity-50">
          Precision Safety
        </span>
      </div>
    </Link>
  );
}
