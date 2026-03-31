'use client';

import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';
import { ScanBarcode, ShieldCheck, Activity, Zap, Fingerprint, Database } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Home() {
  const { user } = useUser();

  return (
    <main className="relative flex flex-col items-center justify-between min-h-dvh p-6 md:p-12 overflow-hidden bg-background">
      {/* 3D Depth Environment */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(0,230,118,0.05),transparent_70%)]" />
        <div className="absolute inset-0 opacity-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent)] bg-[grid-white/[0.02]] bg-[size:60px_60px]" />
      </div>

      {/* Header Architecture */}
      <div className="w-full flex items-center justify-between z-50">
        <Logo />
        <UserNav />
      </div>

      {/* 3D Command Core */}
      <div className="relative flex-1 flex flex-col items-center justify-center w-full max-w-4xl perspective-3d">
        <div className="relative w-full aspect-square md:aspect-video flex items-center justify-center animate-3d preserve-3d">
          
          {/* Rotating 3D HUD Rings */}
          <div className="absolute size-[340px] md:size-[540px] border border-primary/20 rounded-full animate-core opacity-20" />
          <div className="absolute size-[300px] md:size-[500px] border-2 border-dashed border-primary/40 rounded-full animate-[spin_40s_linear_infinite_reverse] opacity-10" />
          <div className="absolute size-[400px] md:size-[600px] border border-accent/20 rounded-full animate-[spin_80s_linear_infinite] opacity-5" />
          
          {/* Main Interaction Hub */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-primary text-[10px] font-black tracking-[0.3em] uppercase">
                <Activity size={12} />
                Clinical Network Active
              </div>
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] text-white">
                Lens<span className="text-primary">Bite</span>
              </h1>
              <p className="text-muted-foreground text-[10px] md:text-xs font-black tracking-[0.5em] uppercase opacity-40">
                Precision Safety Architecture
              </p>
            </div>

            <Link href="/scanner/barcode">
              <Button className="group relative h-28 md:h-36 px-16 md:px-24 rounded-[3rem] bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-500 overflow-hidden shadow-[0_0_100px_rgba(255,140,66,0.2)] hover:scale-105 active:scale-95 border-b-4 border-orange-700">
                <div className="flex items-center gap-6 relative z-10">
                  <ScanBarcode className="size-10 md:size-14" />
                  <div className="flex flex-col items-start">
                    <span className="text-lg md:text-2xl font-black uppercase tracking-tighter leading-none">Initiate Lens</span>
                    <span className="text-[10px] font-black uppercase opacity-60 tracking-widest mt-1">v3.0.4 Protocol</span>
                  </div>
                </div>
                {/* 3D Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Status Grid */}
      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 z-50">
        <div className="glass-panel p-6 md:p-8 rounded-[2.5rem] flex items-center gap-5 border-primary/10 group hover:border-primary/30 transition-colors">
          <div className="size-14 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-center text-primary">
            <ShieldCheck size={24} />
          </div>
          <div className="text-left">
            <div className="text-[9px] font-black opacity-30 uppercase tracking-[0.2em]">Security Protocol</div>
            <div className="text-base md:text-xl font-black uppercase text-white">Encrypted</div>
          </div>
        </div>

        <div className="glass-panel p-6 md:p-8 rounded-[2.5rem] flex items-center gap-5 border-accent/10 group hover:border-accent/30 transition-colors">
          <div className="size-14 rounded-2xl bg-accent/5 border border-accent/20 flex items-center justify-center text-accent">
            <Database size={24} />
          </div>
          <div className="text-left">
            <div className="text-[9px] font-black opacity-30 uppercase tracking-[0.2em]">Data Vault</div>
            <div className="text-base md:text-xl font-black uppercase text-white">Protected</div>
          </div>
        </div>

        <div className="hidden md:flex glass-panel p-6 md:p-8 rounded-[2.5rem] items-center gap-5 border-white/5">
          <div className="size-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
            <Fingerprint size={24} />
          </div>
          <div className="text-left">
            <div className="text-[9px] font-black opacity-30 uppercase tracking-[0.2em]">Session ID</div>
            <div className="text-base md:text-xl font-black uppercase text-white">{user?.uid.slice(0, 8) || 'GUEST-ID'}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
