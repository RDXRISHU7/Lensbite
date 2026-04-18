'use client';

import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';
import { Zap, ArrowRight, Barcode, Camera, Activity, Shield, Database, Target, Fingerprint } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const { user } = useUser();

  return (
    <main className="max-w-[1280px] mx-auto min-h-screen page-fade-in">
      
      {/* Cinematic Navigation */}
      <header className="fixed top-0 inset-x-0 z-[100] h-20 px-8 max-w-[1280px] mx-auto flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-black/5">
        <Logo />
        <nav className="hidden lg:flex items-center gap-12">
            <Link href="/scanner/barcode" className="overline hover:text-primary transition-all">Scanner</Link>
            <Link href="/history" className="overline hover:text-primary transition-all">Vault</Link>
            <Link href="/profile" className="overline hover:text-primary transition-all">Profile</Link>
        </nav>
        <div className="flex items-center gap-6">
            {user ? <UserNav /> : (
                <Link href="/login">
                    <Button variant="ghost" className="overline text-primary">Sync Session</Button>
                </Link>
            )}
        </div>
      </header>

      {/* Hero Narrative - Typographically Focused */}
      <section className="pt-48 pb-32 px-8 text-center space-y-12 max-w-4xl mx-auto">
        <div className="space-y-6">
            <Badge variant="outline" className="px-6 py-2 rounded-full border-primary/20 text-primary overline bg-primary/5">
                Cinematic Noir Protocol v2.0
            </Badge>
            <h1>BITE<span className="text-primary">LENS</span></h1>
            <p className="text-xl text-[#3D3660] font-medium leading-tight">
                A cinematic visual system for safe, informed food scanning — built with high-fidelity <span className="text-primary font-bold">clinical precision</span> and data-driven intelligence.
            </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
            <Link href="/scanner/barcode">
                <Button className="primary-btn w-full sm:w-64 text-lg">
                    <Zap className="mr-3 size-5" />
                    Initiate Scan
                </Button>
            </Link>
            <Link href="/profile">
                <Button variant="outline" className="h-14 px-8 rounded-[16px] overline w-full sm:w-64 border-black/10 bg-white">
                    Link Biometrics
                </Button>
            </Link>
        </div>
      </section>

      {/* System Sections - Structural Slates */}
      <section className="px-8 pb-48 space-y-24">
        
        {/* Protocol 01: Decryption */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
                <span className="overline text-primary">Protocol 01</span>
                <h3>Barcode <br/> <span className="text-primary">Decryption</span></h3>
                <p>Instant extraction of clinical ingredient strings via global product databases. Decrypts industrial metadata into clean, actionable safety audits.</p>
                <div className="flex gap-4">
                    <div className="px-4 py-2 bg-primary/5 rounded-lg overline text-primary">EAN-13</div>
                    <div className="px-4 py-2 bg-primary/5 rounded-lg overline text-primary">UPC-A</div>
                    <div className="px-4 py-2 bg-primary/5 rounded-lg overline text-primary">QR-CORE</div>
                </div>
            </div>
            <div className="clinical-card aspect-video flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-x-12 h-px bg-primary/20" />
                <Barcode size={80} className="opacity-10 text-foreground group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-8 left-8 flex items-center gap-2">
                    <Target size={14} className="text-primary" />
                    <span className="overline text-primary">Signal Verified</span>
                </div>
            </div>
        </div>

        {/* Protocol 02: Vision AI */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-16">
            <div className="clinical-card aspect-video flex items-center justify-center lg:order-1">
                <div className="relative">
                    <Camera size={80} className="opacity-10 text-foreground" />
                    <Activity size={32} className="absolute -bottom-4 -right-4 text-secondary animate-pulse" />
                </div>
            </div>
            <div className="space-y-8 lg:order-2">
                <span className="overline text-secondary">Protocol 02</span>
                <h3>Vision AI <br/> <span className="text-secondary">Intelligence</span></h3>
                <p>Multimodal OCR identification for non-standard or damaged packaging. Gemini 2.5 Flash powers real-time hazard identification from raw visual inputs.</p>
                <Link href="/scanner/food" className="inline-flex items-center gap-3 overline text-secondary hover:gap-6 transition-all">
                    Initiate Vision <ArrowRight size={14} />
                </Link>
            </div>
        </div>

        {/* Protocol 03: Biometric Sync */}
        <div className="clinical-card p-12 md:p-20 text-center space-y-12">
            <div className="max-w-3xl mx-auto space-y-6">
                <span className="overline text-accent">Protocol 03</span>
                <h2>Synchronize Your <br/> <span className="text-primary">Health Architecture</span></h2>
                <p className="text-lg">Cross-reference every food scan with your clinical triggers—Allergies, Diabetes, Hypertension, and BMI metrics.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                    { label: 'Allergies', icon: Shield, color: 'text-primary' },
                    { label: 'Diabetes', icon: Activity, color: 'text-secondary' },
                    { label: 'Hypertension', icon: Database, color: 'text-accent' },
                    { label: 'Biometrics', icon: Fingerprint, color: 'text-foreground' }
                ].map((item) => (
                    <div key={item.label} className="bg-[#F6F4FB] p-8 rounded-[24px] flex flex-col items-center gap-4 hover:bg-white border border-transparent hover:border-black/5 transition-all">
                        <item.icon className={`size-8 ${item.color}`} />
                        <span className="overline">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>

      </section>

      {/* Footer */}
      <footer className="px-8 py-24 border-t border-black/5 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <Logo />
            <div className="grid grid-cols-2 gap-12 md:gap-24">
                <div className="space-y-6">
                    <span className="overline text-muted-foreground">Intelligence</span>
                    <nav className="flex flex-col gap-3">
                        <Link href="/scanner/barcode" className="overline hover:text-primary">Scanner</Link>
                        <Link href="/history" className="overline hover:text-primary">Vault</Link>
                    </nav>
                </div>
                <div className="space-y-6">
                    <span className="overline text-muted-foreground">Session</span>
                    <nav className="flex flex-col gap-3">
                        <Link href="/profile" className="overline hover:text-primary">Profile</Link>
                        <Link href="/login" className="overline hover:text-primary">Sync Access</Link>
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