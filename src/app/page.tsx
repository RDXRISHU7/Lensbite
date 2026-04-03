'use client';

import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';
import { ScanBarcode, ShieldCheck, Activity, Zap, Fingerprint, Database, ArrowDown, Globe, ShieldAlert, Binary } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Home() {
  const { user } = useUser();

  return (
    <main className="relative flex flex-col items-center bg-background min-h-screen">
      {/* 3D Depth Environment */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(46,125,50,0.05),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[grid-black/[0.2]] bg-[size:40px_40px]" />
      </div>

      {/* Hero Section - 3D HUD */}
      <section className="w-full flex flex-col items-center justify-between min-h-screen p-6 md:p-12">
        <div className="w-full flex items-center justify-between z-50">
          <Logo />
          <UserNav />
        </div>

        <div className="relative flex-1 flex flex-col items-center justify-center w-full max-w-4xl perspective-3d">
          <div className="relative w-full aspect-square md:aspect-video flex items-center justify-center animate-3d preserve-3d">
            
            {/* Rotating 3D HUD Rings */}
            <div className="absolute size-[340px] md:size-[540px] border border-primary/10 rounded-full animate-core opacity-40" />
            <div className="absolute size-[300px] md:size-[500px] border-2 border-dashed border-primary/20 rounded-full animate-[spin_40s_linear_infinite_reverse] opacity-30" />
            <div className="absolute size-[400px] md:size-[600px] border border-accent/10 rounded-full animate-[spin_80s_linear_infinite] opacity-20" />
            
            {/* Main Interaction Hub */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-[0.3em] uppercase">
                  <Activity size={12} />
                  Clinical Network Sync
                </div>
                <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] text-foreground">
                  Lens<span className="text-primary">Bite</span>
                </h1>
                <p className="text-muted-foreground text-[10px] md:text-xs font-black tracking-[0.5em] uppercase opacity-60">
                  Precision Architecture v4.0
                </p>
              </div>

              <Link href="/scanner/barcode">
                <Button className="group relative h-28 md:h-36 px-16 md:px-24 rounded-[3.5rem] bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-500 overflow-hidden shadow-2xl hover:scale-105 active:scale-95 border-b-8 border-orange-700/20">
                  <div className="flex items-center gap-6 relative z-10">
                    <ScanBarcode className="size-10 md:size-14" />
                    <div className="flex flex-col items-start text-left">
                      <span className="text-lg md:text-2xl font-black uppercase tracking-tighter leading-none">Initiate Lens</span>
                      <span className="text-[10px] font-black uppercase opacity-60 tracking-widest mt-1">Ready for Scrutiny</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 opacity-40 animate-bounce py-8">
          <span className="text-[9px] font-black uppercase tracking-[0.4em]">Intelligence Flow</span>
          <ArrowDown size={14} className="text-primary" />
        </div>
      </section>

      {/* Intelligence Feed Section */}
      <section className="w-full max-w-6xl px-6 md:px-12 py-24 space-y-24 pb-48">
        {/* Global Security Panel */}
        <div className="glass-panel p-12 md:p-20 rounded-[4rem] relative overflow-hidden group shadow-xl">
          <div className="absolute -top-24 -right-24 size-96 bg-primary/5 blur-[100px] rounded-full group-hover:bg-primary/10 transition-colors" />
          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
            <div className="size-24 md:size-32 rounded-[2.5rem] bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
              <Globe className="size-12 md:size-16" />
            </div>
            <div className="flex-1 space-y-6 text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Integrity <span className="text-primary">Ecosystem</span></h2>
              <p className="text-muted-foreground text-lg md:text-xl font-bold uppercase tracking-tight leading-snug">Connected to 2.4 million clinical food records with real-time biometric synchronization. Every scan is cross-referenced with your precise health profile.</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="px-6 py-2 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-black uppercase tracking-widest text-primary">Live Data Sync</div>
                <div className="px-6 py-2 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-black uppercase tracking-widest text-primary">clinical verification</div>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Processing Panel */}
        <div className="glass-panel p-12 md:p-20 rounded-[4rem] relative overflow-hidden group shadow-xl">
          <div className="absolute -bottom-24 -left-24 size-96 bg-accent/5 blur-[100px] rounded-full group-hover:bg-accent/10 transition-colors" />
          <div className="relative z-10 flex flex-col md:flex-row-reverse gap-12 items-center">
            <div className="size-24 md:size-32 rounded-[2.5rem] bg-accent/10 flex items-center justify-center text-accent shrink-0 border border-accent/20">
              <Binary className="size-12 md:size-16" />
            </div>
            <div className="flex-1 space-y-6 text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Scrutiny <span className="text-accent">Protocol</span></h2>
              <p className="text-muted-foreground text-lg md:text-xl font-bold uppercase tracking-tight leading-snug">Our proprietary lens architecture breaks down complex ingredient strings into actionable risk metrics, ensuring zero-compromise food safety audits.</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="px-6 py-2 rounded-full bg-accent/5 border border-accent/10 text-[10px] font-black uppercase tracking-widest text-accent">Hazard Detection</div>
                <div className="px-6 py-2 rounded-full bg-accent/5 border border-accent/10 text-[10px] font-black uppercase tracking-widest text-accent">process audit</div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
          <div className="glass-panel p-10 rounded-[3rem] flex items-center gap-6 border-primary/10">
            <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck size={32} />
            </div>
            <div>
              <div className="text-[10px] font-black opacity-40 uppercase tracking-[0.3em]">System Health</div>
              <div className="text-2xl font-black uppercase">Optimized</div>
            </div>
          </div>
          <div className="glass-panel p-10 rounded-[3rem] flex items-center gap-6 border-accent/10">
            <div className="size-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
              <Fingerprint size={32} />
            </div>
            <div>
              <div className="text-[10px] font-black opacity-40 uppercase tracking-[0.3em]">Session Key</div>
              <div className="text-2xl font-black uppercase">{user?.uid.slice(0, 8) || 'GUEST-v4'}</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}