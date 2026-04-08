import Link from 'next/link';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-4 group ${className}`}>
      <span className="text-3xl font-black tracking-tighter leading-none text-[#1a1a1a]">
        L<span className="text-primary">.</span>B
      </span>
      <div className="h-6 w-px bg-border hidden md:block" />
      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1a1a1a] hidden md:block">
        Lens Bite
      </span>
    </Link>
  );
}
