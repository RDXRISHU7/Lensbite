'use client';

import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';
import { Zap, ArrowRight, Barcode, Camera, Activity, ShieldCheck, Fingerprint, Database, Search, Target } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function Home() {
  const { user } = useUser();

  return (
    <main className="min-h-screen selection:bg-primary/10 page-reveal">
      
      {/* ARCHITECTURAL HEADER - LIQUID CRYSTAL */}
      <header className="w-full h-20 flex items-center justify-between px-6 md:px-12 bg-white/10 backdrop-blur-3xl border-b border-white/20 sticky top-0 z-[100]">
        <Logo />
        
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-12">
            <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
                <Input 
                    placeholder="Search clinical intelligence..." 
                    className="h-10 pl-10 bg-white/10 backdrop-blur-md border-white/20 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] focus-visible:ring-primary/40"
                />
            </div>
        </div>

        <div className="flex items-center gap-6">
            <div className="hidden xl:flex items-center gap-8 mr-6">
                <Link href="/history" className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-all">Vault</Link>
                <Link href="/profile" className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-all">Profile</Link>
            </div>
            {user ? (
                <UserNav />
            ) : (
                <Link href="/login">
                    <Button className="primary-btn">Sync Access</Button>
                </Link>
            )}
        </div>
      </header>

      {/* HERO SECTION - CRYSTAL CORE */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden perspective-container py-24">
        
        {/* Background Depth Layers */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
            <div className="size-[800px] border-[2px] border-primary/20 rounded-full animate-[spin_40s_linear_infinite]" />
            <div className="absolute size-[600px] border-[1px] border-secondary/20 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center space-y-12 px-6 max-w-6xl">
            <div className="flex flex-col items-center gap-8">
                <Badge variant="outline" className="px-6 py-2 text-[9px] font-black uppercase tracking-[0.4em] border-primary/30 text-primary bg-primary/5 backdrop-blur-xl rounded-full">
                    Clinical System Protocol v5.0
                </Badge>
                <h1 className="text-foreground tracking-tighter">
                    LENS <span className="text-primary">BITE</span>
                </h1>
            </div>

            <p className="max-w-3xl text-xl md:text-2xl font-bold leading-tight text-foreground/80">
                A high-fidelity decryption engine cross-referencing food signatures with your <span className="text-primary font-black">Biometric Health Architecture</span>.
            </p>

            <div className="flex flex-col sm:row gap-8 pt-12 w-full max-w-2xl">
                <Link href="/scanner/barcode" className="w-full">
                    <Button className="h-28 w-full rounded-[2.5rem] bg-secondary text-white text-3xl font-black uppercase tracking-tighter hover:scale-[1.02] transition-all shadow-2xl shadow-secondary/20 border border-white/30">
                        <Zap className="mr-4 size-8 fill-current" />
                        Initiate Scan
                    </Button>
                </Link>
                <Link href="/profile" className="w-full">
                    <Button variant="outline" className="h-24 w-full rounded-[2.5rem] border-2 border-white/40 bg-white/10 backdrop-blur-3xl text-xl font-black uppercase tracking-tighter hover:bg-white/20 transition-all">
                        Sync Health Profile
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-3 gap-16 md:gap-32 pt-24 opacity-40">
                {['AES-256', '99.8%', '100K+'].map((stat, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <span className="text-4xl font-black tracking-tighter">{stat}</span>
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] mt-2">Verified</span>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* INTELLIGENCE SECTIONS - LIQUID GLASS SLATES */}
      <section className="w-full py-32 px-6 md:px-24 space-y-48">
        <div className="max-w-7xl mx-auto">
            
            {/* Protocol 01 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-8">
                    <div className="size-16 rounded-3xl bg-primary/10 backdrop-blur-2xl flex items-center justify-center text-primary border border-white/40 shadow-xl">
                        <Barcode size={32} />
                    </div>
                    <h2 className="uppercase">Barcode<br/><span className="text-primary">Decryption</span></h2>
                    <p className="text-xl font-bold text-foreground/60 leading-relaxed">
                        Instant extraction of clinical ingredient strings via global product databases. Decrypts industrial metadata into clean, actionable safety audits.
                    </p>
                    <Link href="/scanner/barcode" className="inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-primary hover:gap-6 transition-all">
                        Initialize Vault <ArrowRight className="size-4" />
                    </Link>
                </div>
                <div className="glass-panel aspect-video flex items-center justify-center p-12">
                    <div className="w-full h-full rounded-[2rem] bg-white/20 border border-white/40 flex items-center justify-center relative">
                        <div className="absolute inset-x-12 h-0.5 bg-secondary/40 shadow-[0_0_15px_rgba(244,162,97,0.5)] animate-pulse" />
                        <Barcode size={120} className="opacity-10" />
                        <div className="absolute top-6 left-6 flex items-center gap-2">
                            <Target size={14} className="text-secondary" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-secondary">Awaiting Signal</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Protocol 02 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center pt-48">
                <div className="glass-panel aspect-video flex items-center justify-center p-12 lg:order-1">
                    <div className="w-full h-full rounded-[2rem] bg-white/20 border border-white/40 flex flex-col items-center justify-center">
                        <Camera size={120} className="opacity-10" />
                        <Activity size={24} className="text-primary animate-pulse mt-8" />
                    </div>
                </div>
                <div className="space-y-8 lg:order-2">
                    <div className="size-16 rounded-3xl bg-secondary/10 backdrop-blur-2xl flex items-center justify-center text-secondary border border-white/40 shadow-xl">
                        <Camera size={32} />
                    </div>
                    <h2 className="uppercase">Vision AI<br/><span className="text-secondary">Intelligence</span></h2>
                    <p className="text-xl font-bold text-foreground/60 leading-relaxed">
                        Multimodal OCR identification for non-standard or damaged packaging. Gemini 2.5 Flash powers real-time hazard identification from raw visual inputs.
                    </p>
                    <Link href="/scanner/food" className="inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-secondary hover:gap-6 transition-all">
                        Initiate Vision <ArrowRight className="size-4" />
                    </Link>
                </div>
            </div>

        </div>
      </section>

      {/* CTA SECTION - CRYSTAL FOCUS */}
      <section className="relative py-48 px-8 overflow-hidden">
        <div className="absolute inset-0 bg-primary/90 backdrop-blur-3xl" />
        <div className="absolute inset-0 opacity-5 pointer-events-none scale-150 flex items-center justify-center">
            <Fingerprint size={1000} className="text-white" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10 text-white">
            <h2 className="text-white text-5xl md:text-8xl leading-none tracking-tighter">
                SECURE YOUR <br/> HEALTH LAYER
            </h2>
            <p className="text-xl md:text-2xl font-bold opacity-80 max-w-2xl mx-auto">
                Synchronize your medical triggers for real-time safety verification across the entire food supply chain.
            </p>
            <div className="pt-12">
                <Link href="/profile">
                    <Button className="h-28 px-16 rounded-[3rem] bg-white text-primary text-3xl font-black uppercase tracking-tighter hover:scale-105 transition-all shadow-3xl">
                        Link Biometrics <Fingerprint className="ml-4 size-8" />
                    </Button>
                </Link>
            </div>
        </div>
      </section>

      {/* FOOTER - MINIMAL GLASS */}
      <footer className="w-full py-24 px-6 md:px-12 bg-white/10 backdrop-blur-3xl border-t border-white/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-24">
            <div className="space-y-8">
                <Logo />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 max-w-xs leading-relaxed">
                    The world's most advanced clinical food safety engine.
                </p>
            </div>
            <div className="grid grid-cols-2 gap-24">
                <div className="space-y-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30">Vault</span>
                    <nav className="flex flex-col gap-4">
                        <Link href="/history" className="text-[11px] font-black uppercase tracking-widest hover:text-primary transition-all">Audit Log</Link>
                        <Link href="/profile" className="text-[11px] font-black uppercase tracking-widest hover:text-primary transition-all">Biometrics</Link>
                    </nav>
                </div>
                <div className="space-y-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30">Legal</span>
                    <nav className="flex flex-col gap-4">
                        <Link href="/" className="text-[11px] font-black uppercase tracking-widest hover:text-primary transition-all">Privacy</Link>
                        <Link href="/" className="text-[11px] font-black uppercase tracking-widest hover:text-primary transition-all">Protocol</Link>
                    </nav>
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto pt-16 border-t border-white/10 mt-16 flex justify-between items-center opacity-30">
            <span className="text-[9px] font-black uppercase tracking-[0.5em]">© 2026 BITE LENS SYSTEMS</span>
            <ShieldCheck size={16} />
        </div>
      </footer>
    </main>
  );
}