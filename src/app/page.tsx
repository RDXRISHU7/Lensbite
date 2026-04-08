'use client';

import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';
import { ScanBarcode, Activity, LogIn, ChevronRight, Fingerprint } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { user } = useUser();

  return (
    <main className="relative flex flex-col items-center bg-background min-h-screen overflow-x-hidden text-white">
      {/* Background Cyber Grid */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,230,118,0.08),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.05] bg-[grid-white/[0.2]] bg-[size:50px_50px]" />
      </div>

      {/* Header Navigation */}
      <header className="w-full h-24 flex items-center justify-between px-6 md:px-12 z-50">
        <Logo />
        <div className="flex items-center gap-4">
          {user ? (
            <UserNav />
          ) : (
            <Link href="/login">
              <Button className="h-12 px-8 rounded-full bg-primary text-black font-black italic uppercase tracking-tighter neon-glow hover:scale-105 active:scale-95 transition-all">
                <LogIn className="size-4 mr-2" />
                Get Started
              </Button>
            </Link>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 w-full flex flex-col items-center justify-center px-6 py-12 relative">
        {/* Floating Background 3D Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 perspective-3d">
            <div className="size-[600px] border border-primary/20 rounded-full animate-3d-rings" />
            <div className="absolute size-[550px] border border-primary/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
        </div>

        <div className="w-full max-w-7xl flex flex-col items-start space-y-8 animate-iris relative z-10">
          {/* Intelligence Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-primary/30 bg-primary/5">
            <div className="size-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#00E676]" />
            <span className="text-[10px] font-black italic uppercase tracking-[0.2em] text-primary">
              Lens Bite Network • Safety Intelligence Live
            </span>
          </div>

          {/* Main Title Stack */}
          <div className="space-y-0">
            <h1 className="text-[10vw] md:text-[8rem] font-black italic tracking-tight leading-[0.8] uppercase">
              Food Safety <br />
              Redefined.
            </h1>
            <h1 className="text-[10vw] md:text-[8rem] font-black italic tracking-tight leading-[0.8] uppercase text-primary text-neon-glow">
              Precision
            </h1>
          </div>

          {/* Interaction Hub */}
          <div className="flex flex-col md:flex-row items-center gap-8 w-full md:w-auto pt-8">
            <Link href="/scanner/barcode" className="w-full md:w-auto group">
              <Button className="h-20 px-12 rounded-2xl bg-white text-black font-black italic uppercase text-xl tracking-tighter hover:bg-primary transition-all group-hover:scale-105 active:scale-95 shadow-2xl">
                Initiate Lens
                <ChevronRight className="ml-4 size-6" />
              </Button>
            </Link>

            {/* Encrypted Protocol Badge */}
            <div className="glass-panel px-6 py-4 rounded-2xl flex items-center gap-4 group cursor-pointer hover:border-primary/50 transition-all">
               <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                 <Fingerprint className="size-5" />
               </div>
               <div className="flex flex-col">
                 <span className="text-[9px] font-black italic uppercase tracking-[0.2em] opacity-40">System Status</span>
                 <span className="text-xs font-black italic uppercase tracking-widest text-primary">Encrypted Protocol</span>
               </div>
               <div className="ml-4 size-2 rounded-full bg-primary animate-pulse" />
            </div>
          </div>
        </div>

        {/* Floating Scan UI Element (Right) */}
        <div className="hidden xl:block absolute right-24 top-1/2 -translate-y-1/2 animate-float pointer-events-none">
            <div className="size-80 rounded-[3rem] border border-primary/20 glass-panel p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary/40 animate-[scan_3s_linear_infinite]" />
                <div className="space-y-4">
                    <div className="h-4 w-1/2 bg-primary/20 rounded-full" />
                    <div className="h-4 w-full bg-primary/10 rounded-full" />
                    <div className="h-24 w-full bg-primary/5 rounded-2xl border border-primary/10 flex items-center justify-center">
                        <ScanBarcode className="size-12 text-primary opacity-40" />
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Footer Info */}
      <footer className="w-full p-12 flex flex-col md:flex-row items-center justify-between border-t border-white/5 mt-auto">
        <div className="flex items-center gap-8 mb-6 md:mb-0">
          <div className="flex flex-col">
            <span className="text-[9px] font-black italic uppercase tracking-[0.4em] opacity-30">Security Node</span>
            <span className="text-xs font-black italic uppercase tracking-widest">Active-2.4M</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black italic uppercase tracking-[0.4em] opacity-30">Protocol</span>
            <span className="text-xs font-black italic uppercase tracking-widest">v4.0.Intelligence</span>
          </div>
        </div>
        <p className="text-[10px] font-black italic uppercase tracking-[0.3em] opacity-20">© 2026 Lens Bite Precision Architecture</p>
      </footer>

      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(320px); }
        }
      `}</style>
    </main>
  );
}
