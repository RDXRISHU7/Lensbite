'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScanBarcode, ShieldCheck, Activity, LayoutDashboard, Zap, Database, Globe, Lock } from 'lucide-react';
import { useUser } from '@/firebase';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function Home() {
  const { user } = useUser();

  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden perspective-1000">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 max-w-5xl mx-auto w-full relative preserve-3d">
        <div className="w-full space-y-12 text-center animate-reveal relative z-10 preserve-3d">
          
          <div className="space-y-6">
            <div className="flex justify-center">
              <Badge variant="outline" className="px-6 py-1.5 rounded-full border-primary/40 bg-primary/10 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                <Zap className="size-3.5 mr-2 animate-pulse" />
                CORE PROTOCOL ACTIVE
              </Badge>
            </div>
            <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8] text-white text-glow">
              LENS<span className="text-primary">BITE</span>
            </h1>
            <p className="max-w-md mx-auto text-muted-foreground text-[10px] md:text-sm font-black uppercase tracking-[0.5em] opacity-40">
              Biometric Clinical Analysis
            </p>
          </div>

          {/* 3D Circular HUD Dashboard */}
          <div className="relative mx-auto size-[320px] md:size-[550px] flex items-center justify-center preserve-3d">
            {/* Outer Rotating 3D Rings */}
            <div className="absolute inset-0 rounded-full border-[15px] md:border-[30px] border-white/5 animate-[spin_20s_linear_infinite] preserve-3d" />
            <div className="absolute inset-6 md:inset-12 rounded-full border-[2px] border-dashed border-primary/30 animate-[spin_30s_linear_infinite_reverse] opacity-50" />
            <div className="absolute inset-12 md:inset-24 rounded-full border border-accent/20 animate-pulse" />
            
            {/* 3D Floating Status Nodes */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 glass-panel px-4 py-2 rounded-xl flex items-center gap-3 shadow-primary/20">
                <Database size={12} className="text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest">12K HAZARDS</span>
            </div>
            <div className="absolute top-1/2 -right-8 -translate-y-1/2 glass-panel px-4 py-2 rounded-xl flex items-center gap-3">
                <Activity size={12} className="text-accent" />
                <span className="text-[10px] font-black uppercase tracking-widest">99.9% ACC</span>
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass-panel px-4 py-2 rounded-xl flex items-center gap-3 shadow-destructive/20">
                <Lock size={12} className="text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest">ENCRYPTED</span>
            </div>
            <div className="absolute top-1/2 -left-8 -translate-y-1/2 glass-panel px-4 py-2 rounded-xl flex items-center gap-3">
                <Globe size={12} className="text-accent" />
                <span className="text-[10px] font-black uppercase tracking-widest">GLOBAL</span>
            </div>

            {/* Central 3D Command Button */}
            <Link href={user ? "/scanner/barcode" : "/login"} className="relative z-20 hover:scale-105 transition-transform duration-500">
              <Button size="lg" className="size-48 md:size-72 rounded-full text-3xl md:text-5xl font-black bg-primary text-white shadow-[0_0_100px_rgba(59,130,246,0.5)] group overflow-hidden border-8 border-white/10">
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                <div className="flex flex-col items-center gap-4">
                    <ScanBarcode className="size-12 md:size-20 group-hover:rotate-12 transition-transform" />
                    <span>SCAN</span>
                </div>
              </Button>
            </Link>
          </div>

          <div className="flex flex-col items-center gap-6 pt-6">
              <div className="flex items-center gap-4">
                <div className="size-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
                <span className="text-[10px] font-black uppercase tracking-[0.6em] opacity-40">System Core Synchronized</span>
              </div>
              <Link href="/history">
                <Button variant="ghost" className="text-[10px] font-black uppercase tracking-[0.6em] opacity-30 hover:opacity-100 hover:text-primary transition-all">
                    Access Vault <LayoutDashboard className="ml-3 size-4" />
                </Button>
              </Link>
          </div>

        </div>
      </main>

      <footer className="hidden md:block py-8 border-t border-white/5 bg-black/20 backdrop-blur-md relative z-50">
        <div className="container px-4 mx-auto flex justify-center">
           <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[1em] opacity-20">Lens Bite Enterprise • Clinical Platform</p>
        </div>
      </footer>
    </div>
  );
}