'use client';

import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';
import { ChevronRight, ArrowRight, Search, Activity, Database, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const { user } = useUser();

  return (
    <main className="relative flex flex-col items-center bg-background min-h-screen text-foreground perspective-3d selection:bg-secondary selection:text-black">
      {/* Reference Header */}
      <header className="w-full h-20 flex items-center justify-between px-6 md:px-12 z-50 bg-background/80 backdrop-blur-md sticky top-0 border-b border-border/50">
        <Logo />
        
        {/* Navigation - Reference Style */}
        <nav className="hidden lg:flex items-center gap-8">
            {['Explore', 'Vault', 'Clinical', 'Intelligence'].map((item) => (
                <Link key={item} href="/" className="text-[11px] font-bold uppercase tracking-widest hover:text-primary transition-colors">
                    {item}
                </Link>
            ))}
        </nav>

        {/* Action Center */}
        <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-muted px-4 py-2 rounded-full border border-border">
                <Search size={14} className="opacity-40" />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Intelligence Search</span>
            </div>
            
            {user ? (
                <UserNav />
            ) : (
                <div className="flex items-center gap-2">
                    <Link href="/login" className="text-[10px] font-bold uppercase tracking-widest px-4">Log In</Link>
                    <Link href="/signup">
                        <Button className="h-10 px-6 rounded-full bg-black text-white font-bold uppercase text-[10px] tracking-widest hover:bg-black/90">
                            Be Pro
                        </Button>
                    </Link>
                </div>
            )}
        </div>
      </header>

      {/* Hero Section - Reference Style */}
      <section className="w-full flex flex-col items-center justify-center pt-24 pb-12 px-6 relative overflow-hidden">
        <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="rounded-full border-border bg-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Site of the Day • Apr 8, 2026 • Safety Score 9.8
            </Badge>
            <h1 className="text-[12vw] font-black tracking-tighter leading-[0.85] uppercase text-[#1a1a1a] floating-3d-text">
                Lens Bite
            </h1>
        </div>

        {/* Creator Grid (Reference Elements) */}
        <div className="flex flex-wrap justify-center gap-8 mb-24 opacity-80">
            {[
                { name: 'Clinical Intelligence', role: 'PRO', img: '1' },
                { name: 'Risk Analytics', role: 'CORE', img: '2' },
                { name: 'Safety Vault', role: 'VAULT', img: '3' },
            ].map((node) => (
                <div key={node.name} className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-muted border-2 border-white shadow-sm overflow-hidden">
                        <img src={`https://picsum.photos/seed/${node.img}/100`} alt="" className="object-cover" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest border-b-2 border-black pb-0.5">{node.name}</span>
                    <span className="text-[8px] font-bold opacity-40">{node.role}</span>
                </div>
            ))}
        </div>

        {/* Large 3D Section - Teal/Yellow Architecture */}
        <div className="w-full max-w-[90vw] aspect-[21/9] teal-section rounded-[2.5rem] p-12 relative preserve-3d group cursor-pointer hover:scale-[1.01] transition-all duration-500 shadow-[0_50px_100px_rgba(61,100,110,0.3)] overflow-hidden">
            {/* 3D Background Objects */}
            <div className="absolute top-[-20%] right-[-10%] size-[600px] border-[40px] border-white/5 rounded-full animate-float-3d" />
            
            <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">System Node 01</span>
                        <h2 className="text-5xl md:text-8xl font-black text-secondary uppercase tracking-tighter leading-none">
                            Nine To Five <br /> Intelligence
                        </h2>
                    </div>
                    <Link href="/scanner/barcode">
                        <Button className="size-24 rounded-full bg-secondary text-black font-black uppercase text-xs tracking-widest border-[8px] border-black/10 hover:scale-110 transition-all shadow-2xl">
                            Scan
                        </Button>
                    </Link>
                </div>

                <div className="flex justify-between items-end">
                    <div className="flex gap-12">
                        <div className="space-y-1">
                            <span className="text-[9px] font-black uppercase opacity-40">Verification</span>
                            <p className="text-xs font-bold uppercase tracking-widest">Active Protocol</p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[9px] font-black uppercase opacity-40">Precision</span>
                            <p className="text-xs font-bold uppercase tracking-widest">100% Architectural</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Initialize Lens</span>
                        <div className="size-12 rounded-full border-2 border-white/20 flex items-center justify-center">
                            <ArrowRight className="text-white" size={20} />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Animated 3D Scanline */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-secondary/20 blur-sm animate-[scan_4s_linear_infinite]" />
        </div>
      </section>

      {/* Footer System */}
      <footer className="w-full bg-white border-t border-border mt-32 p-12 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-12 mb-8 md:mb-0">
            <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] opacity-30">Studio System</span>
                <span className="text-xs font-bold uppercase tracking-widest">ET.Clinical.01</span>
            </div>
            <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] opacity-30">Framework</span>
                <span className="text-xs font-bold uppercase tracking-widest">v4.Precision</span>
            </div>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-20">© 2026 Lens Bite Precision Architecture</p>
      </footer>

      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(-500px); }
        }
      `}</style>
    </main>
  );
}
