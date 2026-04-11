'use client';

import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';
import { Search, Zap, ArrowRight, Barcode, Camera, Activity, ShieldCheck, Heart, Database, Fingerprint, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function Home() {
  const { user } = useUser();

  return (
    <main className="min-h-screen bg-background selection:bg-primary/10 iris-shutter">
      
      {/* ARCHITECTURAL HEADER */}
      <header className="w-full h-20 flex items-center justify-between px-8 md:px-16 bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-[100]">
        <Logo />
        
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-12">
            <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
                <Input 
                    placeholder="Search clinical intelligence..." 
                    className="h-9 pl-10 bg-muted/20 border-none rounded-md text-[10px] font-bold uppercase tracking-wider"
                />
            </div>
        </div>

        <div className="flex items-center gap-6">
            <div className="hidden xl:flex items-center gap-6 mr-6">
                <Link href="/history" className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary">Vault</Link>
                <Link href="/profile" className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary">Profile</Link>
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

      {/* HERO SECTION - MASSIVE 3D DASHBOARD */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden perspective-container">
        
        {/* Background 3D Elements */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="size-[800px] border-[20px] border-primary/20 rounded-full animate-3d-rings" />
            <div className="absolute size-[600px] border-[10px] border-secondary/10 rounded-full animate-3d-rings" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center space-y-12 px-6">
            <div className="flex flex-col items-center gap-4">
                <Badge variant="outline" className="px-6 py-1.5 text-[9px] font-black uppercase tracking-[0.4em] border-primary/30 text-primary bg-primary/5">
                    Clinical System Protocol v4.0
                </Badge>
                <h1 className="text-[10vw] font-black tracking-[-0.05em] leading-[0.8] uppercase flex flex-col items-center">
                    <span>Lens</span>
                    <span className="text-primary">Bite</span>
                </h1>
            </div>

            <p className="max-w-xl text-lg md:text-xl text-muted-foreground font-medium uppercase tracking-tight leading-tight">
                High-fidelity ingredient decryption cross-referenced with your clinical health architecture.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 pt-8">
                <Link href="/scanner/barcode">
                    <Button className="h-20 px-12 rounded-2xl bg-secondary text-white text-xl font-black uppercase tracking-tighter hover:scale-105 transition-all shadow-[0_20px_40px_rgba(244,162,97,0.2)]">
                        <Zap className="mr-3 size-6 fill-current" />
                        Initiate Scan
                    </Button>
                </Link>
                <Link href="/profile">
                    <Button variant="outline" className="h-20 px-12 rounded-2xl border-2 border-border text-lg font-black uppercase tracking-tighter hover:bg-muted/50 transition-all">
                        Health Profile
                    </Button>
                </Link>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-12 opacity-40">
                <div className="flex flex-col items-center gap-1">
                    <span className="text-2xl font-black uppercase">100k+</span>
                    <span className="text-[8px] font-bold uppercase tracking-widest">Products</span>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="flex flex-col items-center gap-1">
                    <span className="text-2xl font-black uppercase">99.8%</span>
                    <span className="text-[8px] font-bold uppercase tracking-widest">Accuracy</span>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="flex flex-col items-center gap-1">
                    <span className="text-2xl font-black uppercase">AES-256</span>
                    <span className="text-[8px] font-bold uppercase tracking-widest">Security</span>
                </div>
            </div>
        </div>
      </section>

      {/* LONG SCROLL INTELLIGENCE PANELS */}
      <section className="w-full bg-white py-48 px-8 md:px-24">
        <div className="max-w-7xl mx-auto space-y-96">
            
            {/* Panel 01: Barcode Decryption */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-8">
                    <div className="size-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                        <Barcode size={32} />
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
                        Barcode<br/><span className="text-primary">Decryption</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-md font-medium uppercase leading-tight">
                        Instant lookup via Open Food Facts API for verified ingredient signatures. No manual entry required.
                    </p>
                    <Link href="/scanner/barcode" className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-primary group">
                        Enter Protocol <ArrowRight className="size-4 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
                <div className="structural-slate aspect-square flex items-center justify-center p-12 bg-muted/20">
                    <div className="relative w-full aspect-video bg-white rounded-3xl shadow-inner border border-border flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-secondary shadow-[0_0_15px_rgba(244,162,97,0.8)] animate-pulse" />
                        <Barcode size={120} className="text-muted-foreground/20" />
                        <div className="absolute top-4 left-4 flex items-center gap-2">
                            <div className="size-2 rounded-full bg-secondary" />
                            <span className="text-[8px] font-black uppercase text-secondary">Awaiting Signature</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Panel 02: Vision AI Lens */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center direction-reverse">
                <div className="structural-slate aspect-square flex items-center justify-center p-12 bg-muted/20 lg:order-1">
                    <div className="relative w-full aspect-video bg-white rounded-3xl shadow-inner border border-border flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                        <Camera size={120} className="text-primary/20" />
                        <div className="absolute bottom-4 right-4 flex flex-col items-end gap-1">
                            <span className="text-[8px] font-black uppercase opacity-40">System Heartbeat</span>
                            <Activity size={16} className="text-primary animate-pulse" />
                        </div>
                    </div>
                </div>
                <div className="space-y-8 lg:order-2">
                    <div className="size-16 rounded-2xl bg-secondary/5 flex items-center justify-center text-secondary border border-secondary/10">
                        <Camera size={32} />
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
                        Vision AI<br/><span className="text-secondary">Intelligence</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-md font-medium uppercase leading-tight">
                        Multimodal extraction of label data even from damaged, non-standard, or blurred packaging.
                    </p>
                    <Link href="/scanner/food" className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-secondary group">
                        Enter Vision AI <ArrowRight className="size-4 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Panel 03: Risk Engine */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-8">
                    <div className="size-16 rounded-2xl bg-destructive/5 flex items-center justify-center text-destructive border border-destructive/10">
                        <Activity size={32} />
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
                        Risk<br/><span className="text-destructive">Scrutiny</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-md font-medium uppercase leading-tight">
                        A rigorous 0-100 hazard scoring system based on NOVA classifications and carcinogen databases.
                    </p>
                    <div className="flex items-center gap-12 pt-8">
                        <div className="flex flex-col">
                            <span className="text-4xl font-black">4/4</span>
                            <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">NOVA Class</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-4xl font-black">E</span>
                            <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">Nutri-Score</span>
                        </div>
                    </div>
                </div>
                <div className="structural-slate aspect-square flex flex-col justify-between p-16 bg-white border-2 border-border">
                    <div className="flex items-center justify-between">
                        <Badge className="badge-alert">System Alert</Badge>
                        <span className="text-[10px] font-black uppercase opacity-20">ID-7729-X</span>
                    </div>
                    <div className="space-y-4">
                        <div className="h-4 w-full bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-destructive w-[88%]" />
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xl font-black uppercase">Critical Risk</span>
                            <span className="text-4xl font-black text-destructive">88%</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-destructive">
                        <ShieldCheck size={20} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Clinical Denial Verified</span>
                    </div>
                </div>
            </div>

        </div>
      </section>

      {/* BIOMETRIC SYNC CTA */}
      <section className="bg-primary py-48 px-8 text-white overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <Fingerprint size={1200} />
        </div>
        <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
                Synchronize your <br/> Health Architecture
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-medium uppercase">
                Cross-reference scanned ingredients with your medical profile to receive biometric-specific safety tips in real-time.
            </p>
            <div className="flex justify-center pt-8">
                <Link href="/profile">
                    <Button className="h-24 px-16 rounded-[3rem] bg-white text-primary text-3xl font-black uppercase tracking-tighter hover:scale-105 transition-all shadow-2xl">
                        Build Profile <Fingerprint className="ml-4 size-8" />
                    </Button>
                </Link>
            </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-white border-t border-border py-24 px-8 md:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-24">
            <div className="space-y-8">
                <Logo />
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-tight max-w-xs">
                    The world's most advanced clinical food safety platform for individual health architectures.
                </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-24">
                <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Command</h4>
                    <nav className="flex flex-col gap-4">
                        <Link href="/scanner/barcode" className="text-sm font-black uppercase hover:text-primary transition-colors">Scanner</Link>
                        <Link href="/history" className="text-sm font-black uppercase hover:text-primary transition-colors">The Vault</Link>
                        <Link href="/profile" className="text-sm font-black uppercase hover:text-primary transition-colors">Profile</Link>
                    </nav>
                </div>
                <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Protocol</h4>
                    <nav className="flex flex-col gap-4">
                        <Link href="/privacy" className="text-sm font-black uppercase hover:text-primary transition-colors">Security</Link>
                        <Link href="/terms" className="text-sm font-black uppercase hover:text-primary transition-colors">Architecture</Link>
                    </nav>
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto pt-24 border-t border-border mt-24 flex items-center justify-between">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-30">© 2026 BITE LENS CLINICAL SYSTEMS</p>
            <div className="flex items-center gap-2 opacity-30">
                <ShieldCheck size={12} />
                <span className="text-[9px] font-black uppercase tracking-[0.4em]">AES-256 Verified</span>
            </div>
        </div>
      </footer>
    </main>
  );
}