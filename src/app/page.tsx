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
    <main className="max-w-[1280px] mx-auto min-h-screen page-fade-in bg-[#F6F4FB]">
      
      {/* Cinematic Navigation */}
      <header className="fixed top-0 inset-x-0 z-[100] h-20 px-8 max-w-[1280px] mx-auto flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-black/5">
        <Logo />
        <nav className="hidden lg:flex items-center gap-12">
            <Link href="/scanner/barcode" className="overline hover:text-primary transition-all">Barcode</Link>
            <Link href="/scanner/food" className="overline hover:text-primary transition-all">Vision AI</Link>
            <Link href="/history" className="overline hover:text-primary transition-all">Vault</Link>
        </nav>
        <div className="flex items-center gap-6">
            {user ? <UserNav /> : (
                <Link href="/login">
                    <Button variant="ghost" className="overline text-primary">Sync Session</Button>
                </Link>
            )}
        </div>
      </header>

      {/* Hero Narrative */}
      <section className="pt-48 pb-32 px-8 text-center space-y-12 max-w-4xl mx-auto">
        <div className="space-y-6">
            <Badge variant="outline" className="px-6 py-2 rounded-full border-primary/20 text-primary overline bg-primary/5">
                Cinematic Noir Protocol v2.0
            </Badge>
            <h1 className="text-[72px] font-black leading-[0.9] tracking-[-0.04em] uppercase font-['Space_Grotesk']">
              BITE<span className="text-primary">LENS</span>
            </h1>
            <p className="text-xl text-[#3D3660] font-medium leading-tight max-w-2xl mx-auto">
                A cinematic intelligence system for safe, informed food scanning. Decrypt ingredients via <span className="text-primary font-bold">dual-path AI</span> and biometric health sync.
            </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
            <Link href="/scanner/barcode">
                <Button className="h-14 px-8 bg-[#7C43F1] text-white rounded-[16px] font-medium tracking-tight hover:bg-[#7C43F1]/90 active:scale-[0.98] transition-all w-full sm:w-64 text-lg">
                    <Barcode className="mr-3 size-5" />
                    Scan Barcode
                </Button>
            </Link>
            <Link href="/scanner/food">
                <Button variant="outline" className="h-14 px-8 rounded-[16px] overline w-full sm:w-64 border-black/10 bg-white hover:bg-muted">
                    <Camera className="mr-3 size-5 text-primary" />
                    Vision AI
                </Button>
            </Link>
        </div>
      </section>

      {/* System Sections */}
      <section className="px-8 pb-48 space-y-32">
        
        {/* Protocol 01: Barcode Decryption */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
                <span className="overline text-primary font-black">Protocol 01</span>
                <h3 className="text-[32px] font-bold leading-[1] tracking-[-0.03em] uppercase font-['Space_Grotesk']">
                  Barcode <br/> <span className="text-primary">Decryption</span>
                </h3>
                <p className="text-lg leading-relaxed text-[#3D3660]">
                  Instant extraction of clinical ingredient strings via global product databases. Decrypts industrial metadata into clean, actionable safety audits using verified UPC/EAN signals.
                </p>
                <div className="flex gap-4">
                    <div className="px-4 py-2 bg-primary/5 rounded-lg overline text-primary text-[10px]">UPC-A Verified</div>
                    <div className="px-4 py-2 bg-primary/5 rounded-lg overline text-primary text-[10px]">EAN-13 Match</div>
                </div>
                <Link href="/scanner/barcode">
                  <Button variant="link" className="p-0 h-auto text-primary overline flex items-center gap-2 group">
                    Initialize Barcode Path <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
            </div>
            <div className="bg-white border border-black/5 rounded-[24px] aspect-video flex items-center justify-center relative overflow-hidden group shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="absolute inset-x-12 h-px bg-primary/20 animate-pulse" />
                <Barcode size={80} className="opacity-10 text-foreground group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-8 left-8 flex items-center gap-2">
                    <Target size={14} className="text-primary" />
                    <span className="overline text-primary text-[10px]">Signal Verified</span>
                </div>
            </div>
        </div>

        {/* Protocol 02: Vision AI */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="bg-white border border-black/5 rounded-[24px] aspect-video flex items-center justify-center lg:order-1 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="relative">
                    <Camera size={80} className="opacity-10 text-foreground" />
                    <Activity size={32} className="absolute -bottom-4 -right-4 text-[#F8FFA1] animate-pulse" />
                </div>
            </div>
            <div className="space-y-8 lg:order-2">
                <span className="overline text-primary font-black">Protocol 02</span>
                <h3 className="text-[32px] font-bold leading-[1] tracking-[-0.03em] uppercase font-['Space_Grotesk']">
                  Vision AI <br/> <span className="text-primary">Intelligence</span>
                </h3>
                <p className="text-lg leading-relaxed text-[#3D3660]">
                  Multimodal OCR identification for non-standard or damaged packaging. Gemini 2.5 Flash powers real-time hazard identification from raw visual inputs when barcodes are absent.
                </p>
                <Link href="/scanner/food">
                  <Button variant="link" className="p-0 h-auto text-primary overline flex items-center gap-2 group">
                    Initialize Vision AI <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
            </div>
        </div>

        {/* Protocol 03: Biometric Sync */}
        <div className="bg-white border border-black/5 rounded-[32px] p-12 md:p-24 text-center space-y-16 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="max-w-3xl mx-auto space-y-6">
                <span className="overline text-primary font-black">Protocol 03</span>
                <h2 className="text-[44px] font-bold leading-[1] tracking-[-0.03em] uppercase font-['Space_Grotesk']">
                  Synchronize Your <br/> <span className="text-primary">Health Architecture</span>
                </h2>
                <p className="text-xl font-medium text-[#3D3660]">
                  Cross-reference every food scan with your clinical triggers—Allergies, Diabetes, Hypertension, and BMI metrics.
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    { label: 'Allergies', icon: Shield, color: 'text-[#7C43F1]' },
                    { label: 'Diabetes', icon: Activity, color: 'text-[#7C43F1]' },
                    { label: 'Hypertension', icon: Database, color: 'text-[#7C43F1]' },
                    { label: 'Biometrics', icon: Fingerprint, color: 'text-[#7C43F1]' }
                ].map((item) => (
                    <div key={item.label} className="bg-[#F6F4FB] p-10 rounded-[24px] flex flex-col items-center gap-4 hover:bg-white border border-transparent hover:border-black/5 transition-all group">
                        <item.icon className={`size-8 ${item.color} group-hover:scale-110 transition-transform`} />
                        <span className="overline text-[10px] font-black">{item.label}</span>
                    </div>
                ))}
            </div>
            <div className="pt-8">
              <Link href="/profile">
                <Button className="h-14 px-12 rounded-full bg-black text-white overline text-xs font-bold tracking-widest hover:bg-primary transition-all">
                  Configure Architecture
                </Button>
              </Link>
            </div>
        </div>

      </section>

      {/* Footer */}
      <footer className="px-8 py-24 border-t border-black/5 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <Logo />
            <div className="grid grid-cols-2 gap-12 md:gap-24">
                <div className="space-y-6">
                    <span className="overline text-muted-foreground text-[10px]">Intelligence</span>
                    <nav className="flex flex-col gap-3">
                        <Link href="/scanner/barcode" className="overline text-[10px] hover:text-primary">Barcode Scanner</Link>
                        <Link href="/scanner/food" className="overline text-[10px] hover:text-primary">Vision AI</Link>
                        <Link href="/history" className="overline text-[10px] hover:text-primary">Clinical Vault</Link>
                    </nav>
                </div>
                <div className="space-y-6">
                    <span className="overline text-muted-foreground text-[10px]">Session</span>
                    <nav className="flex flex-col gap-3">
                        <Link href="/profile" className="overline text-[10px] hover:text-primary">Biometric Profile</Link>
                        <Link href="/login" className="overline text-[10px] hover:text-primary">Link Account</Link>
                    </nav>
                </div>
            </div>
        </div>
        <div className="pt-16 mt-16 border-t border-black/5 flex justify-between items-center opacity-40">
            <span className="overline text-[9px]">© 2026 BITE LENS SYSTEMS · NOIR v2.0</span>
            <span className="overline text-[9px]">FDA + WHO DATA VERIFIED</span>
        </div>
      </footer>

    </main>
  );
}
