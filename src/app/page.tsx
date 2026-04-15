'use client';

import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';
import { Zap, ArrowRight, Barcode, Camera, Activity, ShieldCheck, Fingerprint, Database, Search } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function Home() {
  const { user } = useUser();

  return (
    <main className="min-h-screen selection:bg-primary/10 page-fade-in">
      
      {/* ARCHITECTURAL HEADER - GLASS */}
      <header className="w-full h-20 flex items-center justify-between px-6 md:px-12 bg-white/40 backdrop-blur-xl border-b border-white/20 sticky top-0 z-[100]">
        <Logo />
        
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-12">
            <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
                <Input 
                    placeholder="Search clinical intelligence..." 
                    className="h-9 pl-10 bg-white/20 backdrop-blur-md border-white/20 rounded-lg text-[10px] font-bold uppercase tracking-wider"
                />
            </div>
        </div>

        <div className="flex items-center gap-6">
            <div className="hidden xl:flex items-center gap-6 mr-6">
                <Link href="/history" className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors">Vault</Link>
                <Link href="/profile" className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors">Profile</Link>
            </div>
            {user ? (
                <UserNav />
            ) : (
                <Link href="/login">
                    <Button className="primary-btn">Initialize Session</Button>
                </Link>
            )}
        </div>
      </header>

      {/* HERO SECTION - GLASS OVERLAYS */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden perspective-container py-24">
        
        {/* Background Depth Elements */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
            <div className="size-[900px] border-[1px] border-primary rounded-full animate-rings-3d" />
            <div className="absolute size-[700px] border-[1px] border-secondary rounded-full animate-rings-3d" style={{ animationDirection: 'reverse', animationDuration: '45s' }} />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center space-y-12 px-6 max-w-5xl">
            <div className="flex flex-col items-center gap-6">
                <Badge variant="outline" className="px-5 py-1.5 text-[9px] font-bold uppercase tracking-[0.3em] border-primary/20 text-primary bg-primary/5 backdrop-blur-sm rounded-full">
                    Clinical Intelligence Protocol v5.0
                </Badge>
                <h1 className="text-foreground drop-shadow-sm">
                    Lens <span className="text-primary">Bite</span>
                </h1>
            </div>

            <p className="max-w-2xl text-lg md:text-xl font-medium leading-relaxed text-foreground/80">
                High-fidelity ingredient decryption cross-referenced with your <span className="text-foreground font-bold">Clinical Health Architecture</span> for real-time safety verification.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 pt-12">
                <Link href="/scanner/barcode">
                    <Button className="h-20 px-12 rounded-[2rem] bg-secondary text-white text-xl font-bold uppercase tracking-tight hover:scale-[1.02] transition-all shadow-xl shadow-secondary/10">
                        <Zap className="mr-3 size-6 fill-current" />
                        Initiate Scan
                    </Button>
                </Link>
                <Link href="/profile">
                    <Button variant="outline" className="h-20 px-12 rounded-[2rem] border-2 border-white/40 bg-white/20 backdrop-blur-md text-lg font-bold uppercase tracking-tight hover:bg-white/40 hover:border-primary/30 transition-all">
                        Health Profile
                    </Button>
                </Link>
            </div>

            {/* Live Stats HUD */}
            <div className="grid grid-cols-3 gap-12 md:gap-24 pt-24 opacity-60">
                <div className="flex flex-col items-center gap-1">
                    <span className="text-3xl font-bold uppercase tracking-tighter">100k+</span>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">Analyses</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span className="text-3xl font-bold uppercase tracking-tighter">99.8%</span>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">Accuracy</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span className="text-3xl font-bold uppercase tracking-tighter">AES-256</span>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">Encrypted</span>
                </div>
            </div>
        </div>
      </section>

      {/* LONG SCROLL INTELLIGENCE PANELS - GLASS */}
      <section className="w-full py-32 md:py-64 px-6 md:px-24">
        <div className="max-w-7xl mx-auto space-y-48 md:space-y-96">
            
            {/* Protocol 01: Barcode Decryption */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-8">
                    <div className="size-14 rounded-2xl bg-primary/5 backdrop-blur-md flex items-center justify-center text-primary border border-primary/10">
                        <Barcode size={28} />
                    </div>
                    <h2 className="uppercase leading-none">
                        Barcode<br/><span className="text-primary">Decryption</span>
                    </h2>
                    <p className="text-lg md:text-xl max-w-md font-medium leading-relaxed text-foreground/70">
                        Instant signature extraction via verified product databases. Our engine decrypts complex ingredient labels into clean, clinical data points.
                    </p>
                    <Link href="/scanner/barcode" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-primary group">
                        Initialize Protocol <ArrowRight className="size-4 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
                <div className="structural-slate aspect-square flex items-center justify-center p-8 bg-white/20 backdrop-blur-3xl border-white/40">
                    <div className="relative w-full aspect-video bg-white/40 backdrop-blur-2xl rounded-[2rem] shadow-sm border border-white/60 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-secondary/30 shadow-[0_0_15px_rgba(244,162,97,0.3)] animate-pulse" />
                        <Barcode size={100} className="text-muted-foreground/10" />
                        <div className="absolute top-4 left-4 flex items-center gap-2">
                            <div className="size-2 rounded-full bg-secondary" />
                            <span className="text-[8px] font-bold uppercase text-secondary tracking-widest">Awaiting Input</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Protocol 02: Vision AI Lens */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="structural-slate aspect-square flex items-center justify-center p-8 bg-white/20 backdrop-blur-3xl border-white/40 lg:order-1">
                    <div className="relative w-full aspect-video bg-white/40 backdrop-blur-2xl rounded-[2rem] shadow-sm border border-white/60 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                        <Camera size={100} className="text-primary/10" />
                        <div className="absolute bottom-4 right-4 flex flex-col items-end gap-1">
                            <span className="text-[7px] font-bold uppercase opacity-30 tracking-widest">Vision Core</span>
                            <Activity size={16} className="text-primary animate-pulse" />
                        </div>
                    </div>
                </div>
                <div className="space-y-8 lg:order-2">
                    <div className="size-14 rounded-2xl bg-secondary/5 backdrop-blur-md flex items-center justify-center text-secondary border border-secondary/10">
                        <Camera size={28} />
                    </div>
                    <h2 className="uppercase leading-none">
                        Vision AI<br/><span className="text-secondary">Intelligence</span>
                    </h2>
                    <p className="text-lg md:text-xl max-w-md font-medium leading-relaxed text-foreground/70">
                        Multimodal extraction of metadata from non-standard or damaged packaging. Gemini 2.5 Flash powers real-time visual ingredient identification.
                    </p>
                    <Link href="/scanner/food" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary group">
                        Enter Vision Mode <ArrowRight className="size-4 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Protocol 03: Risk Engine */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-8">
                    <div className="size-14 rounded-2xl bg-destructive/5 backdrop-blur-md flex items-center justify-center text-destructive border border-destructive/10">
                        <Activity size={28} />
                    </div>
                    <h2 className="uppercase leading-none">
                        Risk<br/><span className="text-destructive">Scrutiny</span>
                    </h2>
                    <p className="text-lg md:text-xl max-w-md font-medium leading-relaxed text-foreground/70">
                        A rigorous 0-100 hazard scoring system based on NOVA classifications and carcinogen databases, calibrated to your health profile.
                    </p>
                    <div className="flex items-center gap-10 pt-6">
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold uppercase tracking-tighter">4/4</span>
                            <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">NOVA Class</span>
                        </div>
                        <div className="h-10 w-px bg-border/40" />
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold uppercase tracking-tighter">E</span>
                            <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">Nutri-Score</span>
                        </div>
                    </div>
                </div>
                <div className="glass-panel aspect-square flex flex-col justify-between p-12 bg-white/40 backdrop-blur-3xl border-white/40">
                    <div className="flex items-center justify-between">
                        <Badge className="badge-alert rounded-md px-3 py-1 font-bold text-[9px] uppercase">System Alert</Badge>
                        <span className="text-[8px] font-bold uppercase opacity-20 tracking-[0.2em]">ID-7729-X</span>
                    </div>
                    <div className="space-y-4">
                        <div className="h-3 w-full bg-white/30 rounded-full overflow-hidden">
                            <div className="h-full bg-destructive w-[85%] transition-all duration-1000 shadow-[0_0_10px_rgba(229,57,53,0.3)]" />
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold uppercase tracking-tight">Hazard Density</span>
                            <span className="text-4xl font-bold text-destructive">85%</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-destructive/60">
                        <ShieldCheck size={18} />
                        <span className="text-[9px] font-bold uppercase tracking-widest">Clinical Denial Verified</span>
                    </div>
                </div>
            </div>

        </div>
      </section>

      {/* BIOMETRIC SYNC CTA - GLASS FOCUS */}
      <section className="bg-primary/90 backdrop-blur-2xl py-32 md:py-64 px-8 text-white overflow-hidden relative border-y border-white/10">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none scale-150">
            <Fingerprint size={1200} />
        </div>
        <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
            <h2 className="text-white leading-[1] text-4xl md:text-7xl tracking-tighter">
                Synchronize your <br className="hidden md:block" /> Health Architecture
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-medium leading-relaxed">
                Connect your medical triggers—Hypertension, Diabetes, Celiac—to our Clinical Engine for personalized safety audits in real-time.
            </p>
            <div className="flex justify-center pt-8">
                <Link href="/profile">
                    <Button className="h-20 px-16 rounded-[2rem] bg-white text-primary text-2xl font-bold uppercase tracking-tight hover:scale-105 transition-all shadow-xl shadow-white/10">
                        Build Profile <Fingerprint className="ml-3 size-7" />
                    </Button>
                </Link>
            </div>
        </div>
      </section>

      {/* FOOTER - GLASS MINIMALIST */}
      <footer className="w-full bg-white/40 backdrop-blur-xl border-t border-white/20 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-24">
            <div className="space-y-6">
                <Logo />
                <p className="text-sm font-medium uppercase tracking-tight max-w-xs leading-relaxed opacity-60">
                    The world's most advanced clinical food safety platform for individual health architectures.
                </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-32">
                <div className="space-y-6">
                    <h4 className="text-[9px] font-bold uppercase tracking-[0.4em] opacity-30">Command</h4>
                    <nav className="flex flex-col gap-3">
                        <Link href="/scanner/barcode" className="text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors opacity-60">Scanner</Link>
                        <Link href="/history" className="text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors opacity-60">The Vault</Link>
                        <Link href="/profile" className="text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors opacity-60">Profile</Link>
                    </nav>
                </div>
                <div className="space-y-6">
                    <h4 className="text-[9px] font-bold uppercase tracking-[0.4em] opacity-30">Protocol</h4>
                    <nav className="flex flex-col gap-3">
                        <Link href="/privacy" className="text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors opacity-60">Security</Link>
                        <Link href="/terms" className="text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors opacity-60">Architecture</Link>
                    </nav>
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto pt-16 border-t border-white/10 mt-16 flex items-center justify-between">
            <p className="text-[8px] font-bold uppercase tracking-[0.4em] opacity-20">© 2026 BITE LENS CLINICAL SYSTEMS</p>
            <div className="flex items-center gap-2 opacity-20">
                <ShieldCheck size={12} />
                <span className="text-[8px] font-bold uppercase tracking-[0.4em]">AES-256 Verified</span>
            </div>
        </div>
      </footer>
    </main>
  );
}