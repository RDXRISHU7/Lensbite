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
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 max-w-5xl mx-auto w-full">
        {/* Unified Command Center Hero */}
        <div className="w-full space-y-12 text-center animate-reveal">
          
          <div className="space-y-6">
            <div className="flex justify-center">
              <Badge variant="outline" className="px-4 py-1.5 rounded-full border-primary/30 bg-primary/5 text-primary font-black uppercase tracking-widest text-[10px]">
                <Zap className="size-3 mr-2 text-primary" />
                Live Safety Network Active
              </Badge>
            </div>
            <h1 className="text-5xl md:text-[7rem] font-black tracking-tighter leading-[0.85] italic text-white text-glow">
              LENS<span className="text-primary">BITE</span><br />
              <span className="opacity-50 text-4xl md:text-6xl tracking-tight not-italic font-light">SYSTEM PRO</span>
            </h1>
            <p className="max-w-xl mx-auto text-muted-foreground text-sm md:text-xl font-medium leading-relaxed">
              Clinical-grade ingredient analysis synced with your unique biometric health architecture.
            </p>
          </div>

          {/* Core Action Hub */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link href={user ? "/scanner/barcode" : "/login"} className="w-full sm:w-auto">
              <Button size="lg" className="w-full h-16 md:h-20 px-12 rounded-2xl text-xl font-black italic bg-primary text-white hover:scale-[1.05] transition-all shadow-[0_20px_50px_rgba(59,130,246,0.3)] group">
                <ScanBarcode className="mr-3 size-6 group-hover:rotate-12 transition-transform" />
                INITIALIZE SCAN
              </Button>
            </Link>
          </div>

          {/* Unified System Panel (No more 3 blocks) */}
          <div className="w-full glass-panel rounded-[2.5rem] p-6 md:p-10 border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
              <ShieldCheck size={200} />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2 text-primary">
                  <Database size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Database</span>
                </div>
                <p className="text-xl md:text-3xl font-black text-white italic">12k+</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Analyzed Hazards</p>
              </div>

              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2 text-secondary">
                  <Globe size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Protocol</span>
                </div>
                <p className="text-xl md:text-3xl font-black text-white italic">GLOBAL</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">FDA/EU Standards</p>
              </div>

              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2 text-accent">
                  <Activity size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Accuracy</span>
                </div>
                <p className="text-xl md:text-3xl font-black text-white italic">99.9%</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Verified Scans</p>
              </div>

              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2 text-primary">
                  <Lock size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Security</span>
                </div>
                <p className="text-xl md:text-3xl font-black text-white italic">AES-256</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Encrypted Vault</p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">All Systems Operational</span>
              </div>
              <Link href="/history">
                <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-primary">
                  Access Vault <LayoutDashboard className="ml-2 size-3" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="hidden md:block py-8 border-t border-white/5">
        <div className="container px-4 mx-auto flex flex-col items-center gap-2">
           <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.5em] opacity-20">© 2025 LENS BITE • ENTERPRISE GRADE FOOD ANALYSIS</p>
        </div>
      </footer>
    </div>
  );
}