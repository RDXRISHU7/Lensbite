'use client';

import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';
import { Zap, ArrowRight, Barcode, Camera, Activity, Shield, Database, Target, Fingerprint, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const { user } = useUser();

  return (
    <main className="max-w-[1280px] mx-auto min-h-screen page-fade-in overflow-x-hidden">
      
      {/* PERSISTENT HUD HEADER */}
      <header className="fixed top-0 inset-x-0 z-[100] h-20 px-8 max-w-[1280px] mx-auto flex items-center justify-between bg-white/40 backdrop-blur-xl border-b border-white/50">
        <Logo />
        <nav className="hidden lg:flex items-center gap-12">
            <Link href="/scanner/barcode" className="overline hover:text-primary transition-all">Barcode</Link>
            <Link href="/scanner/food" className="overline hover:text-primary transition-all">Vision AI</Link>
            <Link href="/history" className="overline hover:text-primary transition-all">Vault</Link>
        </nav>
        <div className="flex items-center gap-6">
            {user ? <UserNav /> : (
                <Link href="/login">
                    <Button variant="ghost" className="overline text-primary h-10 px-6">Sync Session</Button>
                </Link>
            )}
        </div>
      </header>

      {/* HERO COMMAND CENTER */}
      <section className="pt-56 pb-32 px-8 text-center space-y-16 max-w-5xl mx-auto relative z-10">
        <div className="space-y-8">
            <Badge variant="outline" className="px-6 py-2 rounded-full border-primary/20 text-primary overline bg-primary/5 backdrop-blur-sm">
                Clinical Intelligence v5.0
            </Badge>
            <h1 className="text-[84px] md:text-[110px] font-black leading-[0.85] tracking-[-0.05em] uppercase font-['Space_Grotesk'] text-[#0F0A2A]">
              BITE<span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#D863F1]">LENS</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#3D3660] font-medium leading-tight max-w-2xl mx-auto">
                A cinematic intelligence system for safe, informed food scanning. Decrypt ingredients via <span className="text-primary font-bold">dual-path AI</span> and biometric health sync.
            </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-8 pt-8">
            <Link href="/scanner/barcode">
                <Button variant="default" className="w-full sm:w-72 h-20 text-xl shadow-[0_20px_40px_rgba(124,67,241,0.2)]">
                    <Barcode className="mr-4 size-6" />
                    Scan Barcode
                </Button>
            </Link>
            <Link href="/scanner/food">
                <Button variant="scan" className="w-full sm:w-72 h-20 text-xl shadow-[0_20px_40px_rgba(248,255,161,0.2)]">
                    <Camera className="mr-4 size-6" />
                    Vision AI
                </Button>
            </Link>
        </div>
      </section>

      {/* PROTOCOL SECTIONS */}
      <section className="px-8 pb-48 space-y-48 relative z-10">
        
        {/* Protocol 01: Barcode Decryption */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
                <span className="overline text-primary font-black">Protocol 01</span>
                <h3 className="text-[44px] font-bold leading-[1] tracking-[-0.03em] uppercase font-['Space_Grotesk']">
                  Barcode <br/> <span className="text-primary">Decryption</span>
                </h3>
                <p className="text-xl leading-relaxed text-[#3D3660]">
                  Instant extraction of clinical ingredient strings via global product databases. Decrypts industrial metadata into clean, actionable safety audits using verified UPC/EAN signals.
                </p>
                <Link href="/scanner/barcode">
                  <Button variant="link" className="p-0 h-auto text-primary overline flex items-center gap-2 group text-sm">
                    Initialize Barcode Path <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
            </div>
            <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[40px] aspect-video flex items-center justify-center relative overflow-hidden group shadow-[0_8px_48px_rgba(31,38,135,0.08)]">
                <div className="absolute inset-x-20 h-px bg-primary/30 animate-pulse" />
                <Barcode size={100} className="opacity-10 text-foreground group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-10 left-10 flex items-center gap-3">
                    <Target size={16} className="text-primary" />
                    <span className="overline text-primary text-[11px] font-black">Signal Verified</span>
                </div>
            </div>
        </div>

        {/* Protocol 02: Vision AI */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[40px] aspect-video flex items-center justify-center lg:order-1 shadow-[0_8px_48px_rgba(31,38,135,0.08)]">
                <div className="relative">
                    <Camera size={100} className="opacity-10 text-foreground" />
                    <Activity size={44} className="absolute -bottom-6 -right-6 text-accent animate-pulse" />
                </div>
            </div>
            <div className="space-y-10 lg:order-2">
                <span className="overline text-primary font-black">Protocol 02</span>
                <h3 className="text-[44px] font-bold leading-[1] tracking-[-0.03em] uppercase font-['Space_Grotesk']">
                  Vision AI <br/> <span className="text-primary">Intelligence</span>
                </h3>
                <p className="text-xl leading-relaxed text-[#3D3660]">
                  Multimodal OCR identification for non-standard or damaged packaging. Gemini 2.5 Flash powers real-time hazard identification from raw visual inputs when barcodes are absent.
                </p>
                <Link href="/scanner/food">
                  <Button variant="link" className="p-0 h-auto text-primary overline flex items-center gap-2 group text-sm">
                    Initialize Vision AI <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
            </div>
        </div>

        {/* Protocol 03: Biometric Sync */}
        <div className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[48px] p-16 md:p-32 text-center space-y-20 shadow-[0_8px_48px_rgba(31,38,135,0.08)]">
            <div className="max-w-3xl mx-auto space-y-8">
                <span className="overline text-primary font-black">Protocol 03</span>
                <h2 className="text-[56px] font-bold leading-[1] tracking-[-0.03em] uppercase font-['Space_Grotesk']">
                  Synchronize Your <br/> <span className="text-primary">Health Architecture</span>
                </h2>
                <p className="text-2xl font-medium text-[#3D3660]">
                  Cross-reference every food scan with your clinical triggers—Allergies, Diabetes, Hypertension, and BMI metrics.
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                {[
                    { label: 'Allergies', icon: Shield },
                    { label: 'Diabetes', icon: Activity },
                    { label: 'Hypertension', icon: Database },
                    { label: 'Biometrics', icon: Fingerprint }
                ].map((item) => (
                    <div key={item.label} className="bg-white/30 backdrop-blur-md p-12 rounded-[40px] flex flex-col items-center gap-6 hover:bg-white/60 border border-white/40 transition-all group shadow-sm">
                        <item.icon className="size-10 text-primary group-hover:scale-110 transition-transform" />
                        <span className="overline text-[11px] font-black">{item.label}</span>
                    </div>
                ))}
            </div>
            <div className="pt-12">
              <Link href="/profile">
                <Button variant="default" className="px-16 rounded-full h-16 text-lg">
                  Configure Architecture
                </Button>
              </Link>
            </div>
        </div>

      </section>

      {/* HUD FOOTER */}
      <footer className="px-8 py-32 border-t border-black/5 bg-white relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16">
            <Logo />
            <div className="grid grid-cols-2 gap-20 md:gap-32">
                <div className="space-y-8">
                    <span className="overline text-muted-foreground text-[11px]">Intelligence</span>
                    <nav className="flex flex-col gap-4">
                        <Link href="/scanner/barcode" className="overline text-[11px] hover:text-primary transition-all">Barcode Scanner</Link>
                        <Link href="/scanner/food" className="overline text-[11px] hover:text-primary transition-all">Vision AI</Link>
                        <Link href="/history" className="overline text-[11px] hover:text-primary transition-all">Clinical Vault</Link>
                    </nav>
                </div>
                <div className="space-y-8">
                    <span className="overline text-muted-foreground text-[11px]">Session</span>
                    <nav className="flex flex-col gap-4">
                        <Link href="/profile" className="overline text-[11px] hover:text-primary transition-all">Biometric Profile</Link>
                        <Link href="/login" className="overline text-[11px] hover:text-primary transition-all">Link Account</Link>
                    </nav>
                </div>
            </div>
        </div>
        <div className="pt-16 mt-16 border-t border-black/5 flex justify-between items-center opacity-40">
            <span className="overline text-[10px]">© 2026 BITE LENS SYSTEMS · LIQUID GLASS v2.0</span>
            <span className="overline text-[10px]">FDA + WHO DATA VERIFIED</span>
        </div>
      </footer>

    </main>
  );
}
