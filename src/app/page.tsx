'use client';

import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';
import { ChevronRight, ArrowRight, Search, Activity, Database, ShieldCheck, Zap, Biohazard, Fingerprint, History, Box, Camera, Barcode } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const { user } = useUser();

  return (
    <main className="relative flex flex-col items-center bg-[#F7F9FB] min-h-screen text-[#1F2937] perspective-3d selection:bg-primary/20">
      {/* Precision Header */}
      <header className="w-full h-24 flex items-center justify-between px-6 md:px-12 z-[100] bg-white/80 backdrop-blur-xl sticky top-0 border-b border-[#2E7D32]/10">
        <Logo />
        
        <nav className="hidden lg:flex items-center gap-12">
            {['Protocols', 'Analysis', 'Synchronization', 'Vault'].map((item) => (
                <Link key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-[0.3em] hover:text-[#2E7D32] transition-colors">
                    {item}
                </Link>
            ))}
        </nav>

        <div className="flex items-center gap-4">
            {user ? (
                <UserNav />
            ) : (
                <div className="flex items-center gap-3">
                    <Link href="/login" className="text-[10px] font-black uppercase tracking-widest px-4 opacity-40 hover:opacity-100">Log In</Link>
                    <Link href="/signup">
                        <Button className="h-12 px-8 rounded-xl bg-[#2E7D32] text-white font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-xl">
                            Join Network
                        </Button>
                    </Link>
                </div>
            )}
        </div>
      </header>

      {/* HERO: 3D COMMAND CORE */}
      <section className="w-full min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-12 px-6 relative overflow-hidden">
        <div className="text-center space-y-6 mb-16 relative z-10">
            <Badge variant="outline" className="rounded-full border-[#2E7D32]/20 bg-white px-6 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-[#2E7D32] shadow-sm">
                System Active • Clinical v4.0.1
            </Badge>
            <h1 className="text-[14vw] font-black tracking-tighter leading-[0.75] uppercase text-[#1F2937] floating-3d-text select-none">
                Lens<br />Bite
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.8em] opacity-30">Precision Food Intelligence</p>
        </div>

        {/* 3D HUB OBJECT */}
        <div className="relative size-[400px] md:size-[600px] mb-24 preserve-3d">
            {/* Outer Ring */}
            <div className="absolute inset-0 border-[2px] border-[#2E7D32]/10 rounded-full animate-[spin_20s_linear_infinite]" />
            {/* HUD Rings */}
            <div className="absolute inset-12 border-[20px] border-[#2E7D32]/5 rounded-full animate-[spin_10s_linear_infinite_reverse]" />
            <div className="absolute inset-32 border-[2px] border-dashed border-[#F4A261]/30 rounded-full animate-[pulse_4s_ease-in-out_infinite]" />
            
            {/* Interaction Core */}
            <div className="absolute inset-0 flex items-center justify-center translate-z-40">
                <Link href="/scanner/barcode">
                    <Button className="size-48 md:size-64 rounded-[4rem] bg-[#F4A261] text-white font-black uppercase text-xl tracking-tighter border-[12px] border-white/50 hover:scale-110 transition-all duration-500 shadow-[0_50px_100px_rgba(244,162,97,0.4)]">
                        <Zap size={32} className="mb-2 fill-current" />
                        Scan
                    </Button>
                </Link>
            </div>
            
            {/* Peripheral Data Nodes */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 flex flex-col items-center gap-2 translate-z-60">
                <Activity size={24} className="text-[#2E7D32]" />
                <span className="text-[8px] font-black uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-sm">Real-time Analysis</span>
            </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-20">
            <span className="text-[8px] font-black uppercase tracking-[0.5em]">Scroll to Decrypt</span>
            <div className="w-px h-16 bg-[#1F2937] animate-pulse" />
        </div>
      </section>

      {/* SECTION 01: SCANNING PROTOCOLS */}
      <section id="protocols" className="w-full max-w-7xl px-6 py-32 space-y-24">
        <div className="flex flex-col items-center text-center gap-4 mb-12">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#2E7D32]">Protocol 01</span>
            <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none">Scanning Intelligence</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-12 md:p-16 rounded-[4rem] bg-white border border-[#2E7D32]/5 shadow-2xl space-y-8 group hover:-translate-y-4 transition-all duration-500 preserve-3d">
                <div className="size-24 rounded-3xl bg-[#2E7D32]/5 flex items-center justify-center text-[#2E7D32]">
                    <Barcode size={40} />
                </div>
                <div className="space-y-4">
                    <h3 className="text-4xl font-black uppercase tracking-tighter">Barcode Decryption</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">Instant global lookup via Open Food Facts API. Our system decrypts UPC/EAN signatures to extract verified ingredient metadata in milliseconds.</p>
                </div>
                <div className="pt-8 border-t border-border flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Verification API v2</span>
                    <ArrowRight size={20} className="text-[#2E7D32] group-hover:translate-x-2 transition-transform" />
                </div>
            </div>

            <div className="p-12 md:p-16 rounded-[4rem] bg-[#2E7D32] text-white shadow-2xl space-y-8 group hover:-translate-y-4 transition-all duration-500 preserve-3d">
                <div className="size-24 rounded-3xl bg-white/10 flex items-center justify-center text-white">
                    <Camera size={40} />
                </div>
                <div className="space-y-4">
                    <h3 className="text-4xl font-black uppercase tracking-tighter">AI Vision Lens</h3>
                    <p className="text-white/80 font-medium leading-relaxed">Multimodal AI (Gemini 2.5 Flash) analyzes packaging images to identify ingredients even when labels are damaged, obscured, or non-standard.</p>
                </div>
                <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Neural Extraction Engine</span>
                    <ArrowRight size={20} className="text-white group-hover:translate-x-2 transition-transform" />
                </div>
            </div>
        </div>
      </section>

      {/* SECTION 02: CLINICAL RISK ENGINE */}
      <section id="analysis" className="w-full bg-[#1F2937] py-40 px-6 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#2E7D32]/20 animate-scan" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
                <div className="space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#2E7D32]">Protocol 02</span>
                    <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8]">Clinical Risk Engine</h2>
                </div>
                <p className="text-2xl font-bold uppercase tracking-tight text-white/60 leading-tight">Advanced algorithmic scrutiny of food components, additives, and process-induced toxins.</p>
                
                <div className="grid grid-cols-2 gap-6">
                    <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                        <span className="text-4xl font-black text-[#F4A261]">100%</span>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mt-2">Precision Scoring</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                        <span className="text-4xl font-black text-[#4CAF50]">0ms</span>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mt-2">Latency Analysis</p>
                    </div>
                </div>
            </div>

            <div className="relative preserve-3d">
                <div className="p-12 rounded-[3rem] bg-white text-[#1F2937] shadow-3xl space-y-12 rotate-y-12 translate-z-20">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-40">System Diagnostics</span>
                        <Badge className="bg-[#E53935]">Hazard Detected</Badge>
                    </div>
                    <div className="space-y-6">
                        {['Carcinogen Scan', 'Nutri-Score A-E', 'NOVA Classification', 'Daily Intake %'].map((metric) => (
                            <div key={metric} className="flex items-center justify-between border-b border-border pb-4">
                                <span className="font-black uppercase tracking-tighter text-lg">{metric}</span>
                                <ShieldCheck size={20} className="text-[#2E7D32]" />
                            </div>
                        ))}
                    </div>
                    <div className="p-6 rounded-2xl bg-[#F7F9FB] flex items-center gap-4">
                        <Activity className="text-[#2E7D32] animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Active Clinical Audit</span>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* SECTION 03: BIOMETRIC SYNCHRONIZATION */}
      <section id="synchronization" className="w-full max-w-7xl px-6 py-40">
        <div className="flex flex-col md:flex-row items-center gap-24">
            <div className="flex-1 space-y-12">
                <div className="space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#2E7D32]">Protocol 03</span>
                    <h2 className="text-7xl font-black uppercase tracking-tighter leading-none">Biometric<br /><span className="text-[#2E7D32]">Sync</span></h2>
                </div>
                <div className="p-12 rounded-[3rem] bg-[#F4A261]/5 border-2 border-dashed border-[#F4A261]/20 space-y-6">
                    <div className="flex items-center gap-4">
                        <Fingerprint size={32} className="text-[#F4A261]" />
                        <h3 className="text-2xl font-black uppercase tracking-tight">Health Architecture</h3>
                    </div>
                    <p className="font-medium text-muted-foreground leading-relaxed">Your clinical profile—Height, Weight, BMI, and Medical History—acts as the focal lens for every scan. The AI generates personalized safety tips specifically for your biological triggers.</p>
                </div>
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-4">
                {[
                    { label: 'Diabetes', icon: Activity },
                    { label: 'Celiac', icon: ShieldCheck },
                    { label: 'Hypertension', icon: Biohazard },
                    { label: 'Allergies', icon: CircleAlert },
                ].map((item, i) => (
                    <div key={item.label} className={`p-10 rounded-[2.5rem] bg-white border border-border flex flex-col items-center justify-center gap-4 transition-all hover:scale-105 ${i % 2 === 0 ? 'translate-y-8' : ''}`}>
                        <item.icon size={32} className="text-[#2E7D32]" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* SECTION 04: SECURE VAULT */}
      <section id="vault" className="w-full py-40 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center gap-16">
            <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#2E7D32]">Protocol 04</span>
                <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none">Secure Vault</h2>
                <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Clinical Intelligence History</p>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: 'Audit Logs', desc: 'Immutable records of every food safety scan.', icon: Database },
                    { title: 'Cloud Sync', desc: 'Securely access your history across devices.', icon: History },
                    { title: 'Privacy First', desc: 'Encrypted storage with medical-grade security.', icon: ShieldCheck },
                ].map((node) => (
                    <div key={node.title} className="p-12 rounded-[3rem] bg-[#F7F9FB] border border-[#2E7D32]/5 space-y-6 flex flex-col items-center group cursor-pointer hover:bg-[#2E7D32] hover:text-white transition-all duration-500">
                        <div className="size-20 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#2E7D32] group-hover:scale-110 transition-transform">
                            <node.icon size={32} />
                        </div>
                        <h4 className="text-2xl font-black uppercase tracking-tighter">{node.title}</h4>
                        <p className="text-sm font-medium opacity-60 leading-relaxed">{node.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* CTA FOOTER SYSTEM */}
      <section className="w-full py-40 px-6 flex flex-col items-center text-center gap-12 bg-[#F7F9FB]">
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] max-w-4xl">
            Initialize Your <br />
            <span className="text-[#2E7D32]">Safety Protocol</span>
        </h2>
        <Link href="/scanner/barcode">
            <Button className="h-24 px-16 rounded-full bg-[#2E7D32] text-white text-2xl font-black uppercase tracking-tighter hover:scale-110 hover:rotate-3 transition-all shadow-3xl">
                Activate Lens <ArrowRight className="ml-4" size={32} />
            </Button>
        </Link>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 mt-8">Lens Bite Precision Architecture v4.Precision</p>
      </section>

      {/* FINAL SYSTEM FOOTER */}
      <footer className="w-full bg-white border-t border-border p-12 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-12 mb-8 md:mb-0">
            <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] opacity-30">Studio System</span>
                <span className="text-xs font-bold uppercase tracking-widest">ET.Clinical.01</span>
            </div>
            <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] opacity-30">Encryption</span>
                <span className="text-xs font-bold uppercase tracking-widest">AES-256.Standard</span>
            </div>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-20">© 2026 Lens Bite Precision Architecture</p>
      </footer>

      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(100vh); }
        }
        .rotate-y-12 {
          transform: rotateY(12deg);
        }
        .translate-z-20 {
          transform: translateZ(20px);
        }
        .translate-z-40 {
          transform: translateZ(40px);
        }
        .translate-z-60 {
          transform: translateZ(60px);
        }
      `}</style>
    </main>
  );
}

// Minimal missing component for the list
function CircleAlert(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}
