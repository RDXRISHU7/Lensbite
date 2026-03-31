'use client';

import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';
import { ScanBarcode, ShieldCheck, Activity, Zap, Fingerprint, Database, ArrowDown, Globe, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Home() {
  const { user } = useUser();

  return (
    <main className="relative flex flex-col items-center bg-background min-h-screen">
      {/* 3D Depth Environment */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(0,230,118,0.05),transparent_70%)]" />
        <div className="absolute inset-0 opacity-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent)] bg-[grid-white/[0.02]] bg-[size:60px_60px]" />
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
                    <div className="flex flex-col items-start text-left">
                      <span className="text-lg md:text-2xl font-black uppercase tracking-tighter leading-none">Initiate Lens</span>
                      <span className="text-[10px] font-black uppercase opacity-60 tracking-widest mt-1">v3.0.4 Protocol</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 opacity-30 animate-bounce py-8">
          <span className="text-[9px] font-black uppercase tracking-[0.4em]">Scroll for Intelligence</span>
          <ArrowDown size={14} />
        </div>
      </section>

      {/* Intelligence Feed Section */}
      <section className="w-full max-w-6xl px-6 md:px-12 py-24 space-y-24">
        {/* Global Security Panel */}
        <div className="glass-panel p-12 md:p-20 rounded-[4rem] border-primary/10 relative overflow-hidden group">
          <div className="absolute -top-24 -right-24 size-96 bg-primary/5 blur-[100px] rounded-full group-hover:bg-primary/10 transition-colors" />
          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
            <div className="size-24 md:size-32 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
              <Globe className="size-12 md:size-16" />
            </div>
            <div className="flex-1 space-y-6 text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Global Safety <span className="text-primary">Ecosystem</span></h2>
              <p className="text-muted-foreground text-lg md:text-xl font-bold uppercase tracking-tight leading-snug">Connected to millions of clinical food records and real-time allergen updates. Your safety is powered by the largest clinical network.</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest">2.4M Records Sync</div>
                <div className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest">Active Monitoring</div>
              </div>
            </div>
          </div>
        </div>

        {/* System Integrity Panel */}
        <div className="glass-panel p-12 md:p-20 rounded-[4rem] border-accent/10 relative overflow-hidden group">
          <div className="absolute -bottom-24 -left-24 size-96 bg-accent/5 blur-[100px] rounded-full group-hover:bg-accent/10 transition-colors" />
          <div className="relative z-10 flex flex-col md:flex-row-reverse gap-12 items-center">
            <div className="size-24 md:size-32 rounded-[2rem] bg-accent/10 flex items-center justify-center text-accent shrink-0 border border-accent/20">
              <ShieldAlert className="size-12 md:size-16" />
            </div>
            <div className="flex-1 space-y-6 text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Integrity <span className="text-accent">Verification</span></h2>
              <p className="text-muted-foreground text-lg md:text-xl font-bold uppercase tracking-tight leading-snug">Every scan undergoes high-fidelity analysis through our proprietary risk-assessment layers, ensuring zero-compromise safety audits.</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="px-6 py-2 rounded-full bg-accent/5 border border-accent/10 text-[10px] font-black uppercase tracking-widest text-accent">Clinical Precision</div>
                <div className="px-6 py-2 rounded-full bg-accent/5 border border-accent/10 text-[10px] font-black uppercase tracking-widest text-accent">Hazard Detection</div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-32">
          <div className="glass-panel p-10 rounded-[3rem] flex items-center gap-6 border-white/5">
            <div className="size-16 rounded-2xl bg-white/5 flex items-center justify-center text-primary">
              <ShieldCheck size={32} />
            </div>
            <div>
              <div className="text-[10px] font-black opacity-30 uppercase tracking-[0.3em]">Vault Status</div>
              <div className="text-2xl font-black uppercase">Secured</div>
            </div>
          </div>
          <div className="glass-panel p-10 rounded-[3rem] flex items-center gap-6 border-white/5">
            <div className="size-16 rounded-2xl bg-white/5 flex items-center justify-center text-accent">
              <Fingerprint size={32} />
            </div>
            <div>
              <div className="text-[10px] font-black opacity-30 uppercase tracking-[0.3em]">Session Node</div>
              <div className="text-2xl font-black uppercase">{user?.uid.slice(0, 8) || 'GUEST-ID'}</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
