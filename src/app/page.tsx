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
    <main className="relative flex flex-col items-center bg-background min-h-screen overflow-x-hidden">
      {/* 3D Depth Environment Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(46,125,50,0.03),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.02] bg-[grid-black/[0.2]] bg-[size:60px_60px]" />
      </div>

      {/* Hero Section - 3D HUD Command Center */}
      <section className="w-full flex flex-col items-center justify-between min-h-screen p-6 md:p-12">
        <div className="w-full flex items-center justify-between z-50">
          <Logo />
          <UserNav />
        </div>

        <div className="relative flex-1 flex flex-col items-center justify-center w-full max-w-5xl perspective-3d">
          <div className="relative w-full aspect-square md:aspect-video flex items-center justify-center preserve-3d">
            
            {/* 3D PERSPECTIVE BACKGROUND OBJECTS */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none preserve-3d">
              {/* Rotating Outer Ring */}
              <div className="absolute size-[450px] md:size-[700px] border border-primary/10 rounded-full animate-3d-rings opacity-40 [transform-style:preserve-3d]" />
              
              {/* Vertical Perspective Ring */}
              <div className="absolute size-[400px] md:size-[650px] border border-accent/10 rounded-full animate-[spin_30s_linear_infinite] opacity-30 [transform-style:preserve-3d] [transform:rotateY(75deg)]" />
              
              {/* Floating Geometric 3D "Core" */}
              <div className="absolute size-[300px] md:size-[500px] animate-3d preserve-3d opacity-20">
                <div className="absolute inset-0 border-2 border-primary/20 rounded-[4rem] [transform:rotateX(45deg)_rotateZ(45deg)]" />
                <div className="absolute inset-0 border-2 border-accent/20 rounded-[4rem] [transform:rotateX(-45deg)_rotateZ(-45deg)]" />
              </div>

              {/* Dynamic HUD Grid */}
              <div className="absolute size-[600px] md:size-[900px] [transform:rotateX(75deg)] border border-primary/5 rounded-full animate-pulse opacity-40" />
            </div>
            
            {/* Main Interaction Hub (Foreground) */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-12 animate-iris">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black tracking-[0.4em] uppercase">
                  <Activity size={12} className="animate-pulse" />
                  Clinical Protocol Active
                </div>
                <h1 className="text-8xl md:text-[11rem] font-black tracking-tighter uppercase leading-[0.8] text-foreground">
                  Lens<span className="text-primary">Bite</span>
                </h1>
                <p className="text-muted-foreground text-[10px] md:text-xs font-black tracking-[0.6em] uppercase opacity-40">
                  Precision Safety Architecture v4.0
                </p>
              </div>

              <Link href="/scanner/barcode" className="group block perspective-3d">
                <Button className="group relative h-32 md:h-44 px-20 md:px-32 rounded-[4rem] bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-500 overflow-hidden shadow-2xl hover:scale-105 active:scale-95 border-b-8 border-orange-700/20 preserve-3d [transform:translateZ(50px)]">
                  <div className="flex items-center gap-8 relative z-10">
                    <ScanBarcode className="size-12 md:size-18" />
                    <div className="flex flex-col items-start text-left">
                      <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none">Initiate Lens</span>
                      <span className="text-[10px] font-black uppercase opacity-60 tracking-[0.4em] mt-2">Ready for Scrutiny</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 opacity-30 animate-bounce py-10">
          <span className="text-[10px] font-black uppercase tracking-[0.5em]">Intelligence flow</span>
          <ArrowDown size={14} className="text-primary" />
        </div>
      </section>

      {/* Intelligence Dashboard Section */}
      <section className="w-full max-w-7xl px-6 md:px-12 py-32 space-y-32 pb-64">
        {/* Global Security Panel */}
        <div className="glass-panel p-16 md:p-24 rounded-[4.5rem] relative overflow-hidden group shadow-2xl transition-all duration-700 hover:border-primary/20">
          <div className="absolute -top-32 -right-32 size-[30rem] bg-primary/5 blur-[120px] rounded-full group-hover:bg-primary/10 transition-colors duration-1000" />
          <div className="relative z-10 flex flex-col md:flex-row gap-16 items-center">
            <div className="size-28 md:size-40 rounded-[3rem] bg-primary/5 flex items-center justify-center text-primary shrink-0 border border-primary/10 transition-transform group-hover:scale-110">
              <Globe className="size-14 md:size-20" />
            </div>
            <div className="flex-1 space-y-8 text-center md:text-left">
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">Integrity <span className="text-primary">Network</span></h2>
              <p className="text-muted-foreground text-xl md:text-2xl font-bold uppercase tracking-tight leading-snug">Connected to 2.4 million clinical food records with real-time biometric synchronization. Every scan is cross-referenced with your precise health profile for absolute verification.</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-5">
                <div className="px-8 py-3 rounded-full bg-primary/5 border border-primary/10 text-[11px] font-black uppercase tracking-[0.3em] text-primary">Live Data Sync</div>
                <div className="px-8 py-3 rounded-full bg-primary/5 border border-primary/10 text-[11px] font-black uppercase tracking-[0.3em] text-primary">Clinical Verification</div>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Processing Panel */}
        <div className="glass-panel p-16 md:p-24 rounded-[4.5rem] relative overflow-hidden group shadow-2xl transition-all duration-700 hover:border-accent/20">
          <div className="absolute -bottom-32 -left-32 size-[30rem] bg-accent/5 blur-[120px] rounded-full group-hover:bg-accent/10 transition-colors duration-1000" />
          <div className="relative z-10 flex flex-col md:flex-row-reverse gap-16 items-center">
            <div className="size-28 md:size-40 rounded-[3rem] bg-accent/5 flex items-center justify-center text-accent shrink-0 border border-accent/10 transition-transform group-hover:scale-110">
              <Binary className="size-14 md:size-20" />
            </div>
            <div className="flex-1 space-y-8 text-center md:text-left">
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">Scrutiny <span className="text-accent">Protocol</span></h2>
              <p className="text-muted-foreground text-xl md:text-2xl font-bold uppercase tracking-tight leading-snug">Our proprietary lens architecture breaks down complex ingredient strings into actionable risk metrics, ensuring zero-compromise food safety audits with architectural precision.</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-5">
                <div className="px-8 py-3 rounded-full bg-accent/5 border border-accent/10 text-[11px] font-black uppercase tracking-[0.3em] text-accent">Hazard Detection</div>
                <div className="px-8 py-3 rounded-full bg-accent/5 border border-accent/10 text-[11px] font-black uppercase tracking-[0.3em] text-accent">Process Audit</div>
              </div>
            </div>
          </div>
        </div>

        {/* Status System Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="glass-panel p-12 rounded-[3.5rem] flex items-center gap-8 border-primary/5 hover:border-primary/20 transition-all">
            <div className="size-20 rounded-3xl bg-primary/5 flex items-center justify-center text-primary">
              <ShieldCheck size={40} />
            </div>
            <div className="space-y-1">
              <div className="text-[11px] font-black opacity-30 uppercase tracking-[0.5em]">System status</div>
              <div className="text-3xl font-black uppercase tracking-tighter">Fully Optimized</div>
            </div>
          </div>
          <div className="glass-panel p-12 rounded-[3.5rem] flex items-center gap-8 border-accent/5 hover:border-accent/20 transition-all">
            <div className="size-20 rounded-3xl bg-accent/5 flex items-center justify-center text-accent">
              <Fingerprint size={40} />
            </div>
            <div className="space-y-1">
              <div className="text-[11px] font-black opacity-30 uppercase tracking-[0.5em]">Secure identity</div>
              <div className="text-3xl font-black uppercase tracking-tighter">{user?.uid.slice(0, 8) || 'GUEST-NODE'}</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}