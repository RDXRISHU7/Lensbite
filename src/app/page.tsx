'use client';

import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';
import { ScanBarcode, ShieldCheck, Activity, Zap, Layers, Fingerprint } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Home() {
  const { user } = useUser();

  return (
    <main className="relative flex flex-col items-center justify-between min-h-dvh p-6 md:p-12 overflow-hidden bg-background">
      {/* 3D Depth Layers */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(9,105,218,0.08),transparent_70%)]" />
        <div className="absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent)] bg-[grid-white/[0.02]] bg-[size:40px_40px]" />
      </div>

      {/* Header */}
      <div className="w-full flex items-center justify-between z-50">
        <Logo />
        <UserNav />
      </div>

      {/* 3D Command Core */}
      <div className="relative flex-1 flex flex-col items-center justify-center w-full max-w-4xl perspective-3d">
        <div className="relative w-full aspect-square md:aspect-video flex items-center justify-center animate-3d preserve-3d">
          
          {/* Architectural HUD Elements */}
          <div className="absolute size-[300px] md:size-[500px] border border-white/5 rounded-full" />
          <div className="absolute size-[320px] md:size-[520px] border border-dashed border-white/10 rounded-full animate-[spin_60s_linear_infinite]" />
          
          {/* Main Interaction Hub */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-[0.2em] uppercase">
                <Activity size={12} />
                Clinical Intelligence Active
              </div>
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-tight">
                Lens<span className="text-primary">Bite</span>
              </h1>
              <p className="text-muted-foreground text-xs md:text-lg font-bold tracking-[0.3em] uppercase opacity-40">
                Data-Driven Food Analysis
              </p>
            </div>

            <Link href="/scanner/barcode">
              <Button className="group relative h-24 md:h-32 px-12 md:px-20 rounded-2xl bg-white text-black hover:bg-white/90 transition-all duration-500 overflow-hidden shadow-[0_0_80px_rgba(255,255,255,0.1)]">
                <div className="flex items-center gap-4 relative z-10">
                  <ScanBarcode className="size-8 md:size-12" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm md:text-xl font-black uppercase tracking-tighter">Initiate Scan</span>
                    <span className="text-[8px] font-bold uppercase opacity-60 tracking-widest">v2.4 System Check</span>
                  </div>
                </div>
                {/* 3D Reflection Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Status Modules */}
      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 z-50">
        <div className="glass-panel p-5 md:p-8 rounded-[2rem] flex items-center gap-5">
          <div className="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
            <ShieldCheck size={22} />
          </div>
          <div className="text-left">
            <div className="text-[8px] font-bold opacity-30 uppercase tracking-[0.2em]">Security Protocol</div>
            <div className="text-sm md:text-lg font-black uppercase">Encrypted</div>
          </div>
        </div>

        <div className="glass-panel p-5 md:p-8 rounded-[2rem] flex items-center gap-5">
          <div className="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent">
            <Zap size={22} />
          </div>
          <div className="text-left">
            <div className="text-[8px] font-bold opacity-30 uppercase tracking-[0.2em]">Neural Processing</div>
            <div className="text-sm md:text-lg font-black uppercase">Low Latency</div>
          </div>
        </div>

        <div className="hidden md:flex glass-panel p-5 md:p-8 rounded-[2rem] items-center gap-5">
          <div className="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
            <Fingerprint size={22} />
          </div>
          <div className="text-left">
            <div className="text-[8px] font-bold opacity-30 uppercase tracking-[0.2em]">Session Identity</div>
            <div className="text-sm md:text-lg font-black uppercase">{user?.uid.slice(0, 8) || 'GUEST-ID'}</div>
          </div>
        </div>
      </div>
    </main>
  );
}