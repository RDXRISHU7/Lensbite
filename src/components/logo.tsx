import Link from 'next/link';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 group ${className}`}>
      <div className="flex items-center gap-1">
        <span className="text-2xl font-black tracking-tighter leading-none uppercase text-[#1a1a1a]">
          W<span className="text-primary">.</span>
        </span>
      </div>
      <div className="h-4 w-px bg-border mx-2" />
      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#1a1a1a]">
        Lens Bite
      </span>
    </Link>
  );
}
