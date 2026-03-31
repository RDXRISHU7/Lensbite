'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScanBarcode, ShieldCheck, Activity, LayoutDashboard, Zap, Database, Globe, Lock, Fingerprint } from 'lucide-react';
import { useUser } from '@/firebase';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function Home() {
  const { user } = useUser();

  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 max-w-5xl mx-auto w-full relative">
        {/* Central HUD Logic */}
        <div className="w-full space-y-8 text-center animate-reveal relative z-10">
          
          <div className="space-y-4">
            <div className="flex justify-center">
              <Badge variant="outline" className="px-4 py-1 rounded-full border-primary/40 bg-primary/10 text-primary font-black uppercase tracking-widest text-[8px] md:text-[10px]">
                <Zap className="size-3 mr-2 animate-pulse" />
                Safety Network v4.2 Active
              </Badge>
            </div>
            <h1 className="text-6xl md:text-[9rem] font-black tracking-tighter leading-[0.8] italic text-white text-glow">
              LENS<span className="text-primary">BITE</span>
            </h1>
            <p className="max-w-md mx-auto text-muted-foreground text-xs md:text-xl font-medium tracking-tight opacity-60">
              Biometric Clinical Analysis System
            </p>
          </div>

          {/* Unified Scanner Hub - Replaces the 3 blocks */}
          <div className="relative mx-auto size-[320px] md:size-[500px] flex items-center justify-center">
            {/* HUD Rings */}
            <div className="absolute inset-0 rounded-full border-[10px] md:border-[20px] border-white/5 animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-4 md:inset-8 rounded-full border-2 border-dashed border-primary/20 animate-[spin_15s_linear_infinite_reverse]" />
            <div className="absolute inset-8 md:inset-16 rounded-full border border-accent/20 animate-pulse" />
            
            {/* Status Indicators Integrated into the Ring */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 glass-panel px-3 py-1 rounded-full flex items-center gap-2">
                <Database size={10} className="text-primary" />
                <span className="text-[8px] font-black uppercase tracking-widest">12k+ Hazards</span>
            </div>
            <div className="absolute top-1/2 -right-6 -translate-y-1/2 glass-panel px-3 py-1 rounded-full flex items-center gap-2">
                <Activity size={10} className="text-accent" />
                <span className="text-[8px] font-black uppercase tracking-widest">99.9% ACC</span>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 glass-panel px-3 py-1 rounded-full flex items-center gap-2">
                <Lock size={10} className="text-primary" />
                <span className="text-[8px] font-black uppercase tracking-widest">AES-256</span>
            </div>
            <div className="absolute top-1/2 -left-6 -translate-y-1/2 glass-panel px-3 py-1 rounded-full flex items-center gap-2">
                <Globe size={10} className="text-accent" />
                <span className="text-[8px] font-black uppercase tracking-widest">Global Protocol</span>
            </div>

            <Link href={user ? "/scanner/barcode" : "/login"} className="relative z-20">
              <Button size="lg" className="size-48 md:size-64 rounded-full text-2xl md:text-4xl font-black italic bg-primary text-white hover:scale-105 transition-all shadow-[0_0_80px_rgba(59,130,246,0.4)] group overflow-hidden">
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                <div className="flex flex-col items-center gap-2">
                    <ScanBarcode className="size-10 md:size-16 group-hover:rotate-12 transition-transform" />
                    <span>SCAN</span>
                </div>
              </Button>
            </Link>
          </div>

          <div className="flex flex-col items-center gap-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">All Core Systems Synchronized</span>
              </div>
              <Link href="/history">
                <Button variant="ghost" className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 hover:opacity-100 hover:text-primary transition-all">
                    Access Historical Vault <LayoutDashboard className="ml-2 size-3" />
                </Button>
              </Link>
          </div>

        </div>
      </main>

      <footer className="hidden md:block py-6 border-t border-white/5 bg-black/20 backdrop-blur-md">
        <div className="container px-4 mx-auto flex justify-center">
           <p className="text-[8px] text-muted-foreground font-black uppercase tracking-[0.8em] opacity-20 italic">Lens Bite Enterprise • Clinical Grade Safety</p>
        </div>
      </footer>
    </div>
  );
}