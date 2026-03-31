'use client';

import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';
import { ScanBarcode, ShieldCheck, Activity, Zap, Box, Fingerprint } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Home() {
  const { user } = useUser();

  return (
    <main className="relative flex flex-col items-center justify-between min-h-dvh p-6 md:p-12 overflow-hidden bg-[radial-gradient(circle_at_50%_50%,rgba(0,112,243,0.05),transparent)]">
      {/* Header HUD */}
      <div className="w-full flex items-center justify-between z-50">
        <Logo />
        <UserNav />
      </div>

      {/* Central 3D HUD Core */}
      <div className="relative flex-1 flex flex-col items-center justify-center w-full max-w-lg preserve-3d animate-float">
        {/* Background Rotating Rings */}
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div className="absolute size-[300px] md:size-[500px] border border-primary/10 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute size-[350px] md:size-[600px] border border-white/5 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
          <div className="absolute size-[250px] md:size-[400px] border-2 border-dashed border-primary/5 rounded-full animate-[spin_15s_linear_infinite]" />
        </div>

        {/* Main Status Display */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-[0.3em] uppercase">
            <Activity size={12} />
            System Status: Active
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none text-glow uppercase">
            Lens<span className="text-primary">Bite</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-xl font-medium tracking-[0.2em] uppercase opacity-60">
            Precision Clinical Analysis
          </p>
        </div>

        {/* Core Control Button */}
        <div className="relative group">
          <div className="absolute -inset-8 bg-primary/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <Link href="/scanner/barcode">
            <Button className="relative size-48 md:size-64 rounded-full bg-background border-4 border-primary/20 hover:border-primary shadow-2xl transition-all duration-500 flex flex-col items-center justify-center gap-4 group-hover:scale-105 active:scale-95 overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
              <ScanBarcode className="size-16 md:size-24 text-primary relative z-10" />
              <span className="text-xs font-black uppercase tracking-[0.4em] relative z-10">Initiate Scan</span>
              {/* Spinning Internal Ring */}
              <div className="absolute inset-2 border border-primary/30 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-4 border border-dashed border-primary/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom Integrated HUD Modules (Non-scrollable on mobile) */}
      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 z-50">
        <div className="glass-panel p-4 md:p-6 rounded-3xl flex items-center gap-4 transition-transform hover:-translate-y-1">
          <div className="size-10 md:size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
            <ShieldCheck size={20} />
          </div>
          <div>
            <div className="text-[8px] font-black opacity-40 uppercase tracking-widest">Vault Security</div>
            <div className="text-sm md:text-lg font-black uppercase">Encrypted</div>
          </div>
        </div>

        <div className="glass-panel p-4 md:p-6 rounded-3xl flex items-center gap-4 transition-transform hover:-translate-y-1">
          <div className="size-10 md:size-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent border border-accent/20">
            <Zap size={20} />
          </div>
          <div>
            <div className="text-[8px] font-black opacity-40 uppercase tracking-widest">Neural Link</div>
            <div className="text-sm md:text-lg font-black uppercase">Stable</div>
          </div>
        </div>

        <div className="hidden md:flex glass-panel p-6 rounded-3xl items-center gap-4 transition-transform hover:-translate-y-1">
          <div className="size-12 rounded-xl bg-white/5 flex items-center justify-center text-white border border-white/10">
            <Fingerprint size={20} />
          </div>
          <div>
            <div className="text-[8px] font-black opacity-40 uppercase tracking-widest">Session ID</div>
            <div className="text-lg font-black uppercase">{user?.uid.slice(0, 8) || 'GUEST-01'}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
