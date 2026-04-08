'use client';

import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';
import { ChevronRight, ArrowRight, Search, Activity, Database, ShieldCheck, Zap, Biohazard, Fingerprint, History, Camera, Barcode } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function Home() {
  const { user } = useUser();

  return (
    <main className="relative flex flex-col items-center bg-background min-h-screen text-foreground perspective-3d selection:bg-primary/20">
      
      {/* Awwwards Minimal Header */}
      <header className="w-full h-24 flex items-center justify-between px-6 md:px-12 z-[100] bg-white/80 backdrop-blur-xl sticky top-0 border-b border-border">
        <Logo />
        
        {/* Modern Search HUD */}
        <div className="hidden lg:flex items-center flex-1 max-w-xl mx-12">
            <div className="relative w-full group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                    placeholder="Search by Clinical Ingredient..." 
                    className="h-12 pl-12 rounded-xl bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary text-[10px] font-black uppercase tracking-widest"
                />
            </div>
        </div>

        <div className="flex items-center gap-6">
            <nav className="hidden xl:flex items-center gap-8 mr-8">
                {['Directory', 'Protocols', 'Vault', 'Network'].map((item) => (
                    <Link key={item} href={`#${item.toLowerCase()}`} className="text-[9px] font-black uppercase tracking-[0.4em] hover:text-primary transition-colors">
                        {item}
                    </Link>
                ))}
            </nav>
            {user ? (
                <UserNav />
            ) : (
                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100">Log In</Link>
                    <Link href="/signup">
                        <Button className="h-11 px-8 rounded-full bg-foreground text-background font-black uppercase text-[10px] tracking-widest hover:bg-primary transition-all">
                            Be Pro
                        </Button>
                    </Link>
                </div>
            )}
        </div>
      </header>

      {/* HERO: ARCHITECTURAL HUD */}
      <section className="w-full min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-6 relative overflow-hidden">
        <div className="text-center space-y-8 mb-24 relative z-10">
            <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-[9px] font-black uppercase tracking-[0.5em] opacity-30">Site of the System</span>
                <Badge variant="secondary" className="rounded-md px-3 py-1 text-[9px] font-black uppercase tracking-[0.3em]">Apr 8, 2026</Badge>
                <span className="text-[9px] font-black uppercase tracking-[0.5em] opacity-30">Score 9.85 of 10</span>
            </div>
            
            <h1 className="text-[14vw] font-black tracking-tighter leading-[0.7] uppercase floating-3d-text select-none">
                Lens<br />Bite
            </h1>
            <p className="text-[11px] font-black uppercase tracking-[1em] opacity-20 mt-8">Precision Food Intelligence Architecture</p>
        </div>

        {/* 3D CORE OBJECT */}
        <div className="relative size-[400px] md:size-[650px] mb-32 preserve-3d">
            <div className="absolute inset-0 border-[1px] border-primary/20 rounded-full animate-rings-3d" />
            <div className="absolute inset-16 border-[1px] border-dashed border-secondary/40 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
            <div className="absolute inset-32 border-[15px] border-primary/5 rounded-full animate-[pulse_6s_ease-in-out_infinite]" />
            
            <div className="absolute inset-0 flex items-center justify-center translate-z-40">
                <Link href="/scanner/barcode">
                    <Button className="size-56 md:size-72 rounded-[4rem] bg-secondary text-white font-black uppercase text-2xl tracking-tighter border-[12px] border-white/50 hover:scale-110 transition-all duration-700 shadow-[0_60px_120px_rgba(244,162,97,0.3)]">
                        <Zap size={36} className="mb-2 fill-current" />
                        Initiate
                    </Button>
                </Link>
            </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 flex flex-col items-center gap-6 opacity-20">
            <span className="text-[8px] font-black uppercase tracking-[0.6em]">Scroll to Decrypt</span>
            <div className="w-px h-24 bg-foreground animate-pulse" />
        </div>
      </section>

      {/* SECTION 01: SYSTEM PROTOCOLS */}
      <section id="protocols" className="w-full max-w-7xl px-6 py-40 space-y-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-end">
            <div className="space-y-8">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Protocol 01</span>
                <h2 className="text-8xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.8]">Neural<br />Scanner</h2>
            </div>
            <p className="text-2xl font-bold uppercase tracking-tight opacity-60 max-w-md pb-4">
                Dual-path intelligence decrypts food signatures in milliseconds. Multi-layered vision extraction meets verified API synchronization.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-16 rounded-[4rem] bg-white border border-border space-y-12 group hover:-translate-y-4 transition-all duration-700 preserve-3d shadow-xl">
                <div className="size-24 rounded-3xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Barcode size={44} />
                </div>
                <div className="space-y-6">
                    <h3 className="text-5xl font-black tracking-tighter">Barcode Decryption</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">Instant global lookup via Open Food Facts API. Our system decrypts UPC/EAN signatures to extract verified ingredient metadata in milliseconds.</p>
                </div>
                <div className="pt-8 border-t border-border flex items-center justify-between">
                    <Badge variant="outline" className="px-4 py-1 text-[9px] tracking-widest">SYSTEM-VERIFIED v4</Badge>
                    <ArrowRight size={24} className="text-primary group-hover:translate-x-4 transition-transform" />
                </div>
            </div>

            <div className="p-16 rounded-[4rem] teal-section space-y-12 group hover:-translate-y-4 transition-all duration-700 preserve-3d shadow-2xl">
                <div className="size-24 rounded-3xl bg-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Camera size={44} />
                </div>
                <div className="space-y-6">
                    <h3 className="text-5xl font-black tracking-tighter">Vision AI Lens</h3>
                    <p className="text-white/80 font-medium leading-relaxed">Multimodal AI (Gemini 2.5 Flash) analyzes packaging images to identify ingredients even when labels are damaged or non-standard.</p>
                </div>
                <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                    <Badge variant="secondary" className="px-4 py-1 text-[9px] tracking-widest bg-white/10 text-white">NEURAL ENGINE</Badge>
                    <ArrowRight size={24} className="text-white group-hover:translate-x-4 transition-transform" />
                </div>
            </div>
        </div>
      </section>

      {/* SECTION 02: CLINICAL ENGINE */}
      <section id="analysis" className="w-full bg-[#1F2937] py-48 px-6 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-12 relative z-10">
                <div className="space-y-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Protocol 02</span>
                    <h2 className="text-[8rem] md:text-[12rem] font-black uppercase tracking-tighter leading-[0.75]">Risk<br />Scrutiny</h2>
                </div>
                <p className="text-2xl font-bold uppercase tracking-tight text-white/50 leading-tight">Advanced algorithmic scrutiny of food components, additives, and process-induced toxins.</p>
                
                <div className="grid grid-cols-2 gap-8">
                    <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 flex flex-col gap-4">
                        <Activity size={32} className="text-primary" />
                        <span className="text-5xl font-black">99.8%</span>
                        <p className="text-[9px] font-black uppercase tracking-widest opacity-40">Accuracy Metric</p>
                    </div>
                    <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 flex flex-col gap-4">
                        <History size={32} className="text-secondary" />
                        <span className="text-5xl font-black">0ms</span>
                        <p className="text-[9px] font-black uppercase tracking-widest opacity-40">Latency Target</p>
                    </div>
                </div>
            </div>

            <div className="relative preserve-3d lg:rotate-y-12">
                <div className="p-16 rounded-[4rem] bg-white text-[#1F2937] shadow-[0_100px_200px_rgba(0,0,0,0.4)] space-y-12 translate-z-20">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Clinical Diagnostics</span>
                        <Badge className="bg-destructive text-white rounded-md px-3 py-1">Hazard Alert</Badge>
                    </div>
                    <div className="space-y-8">
                        {['Carcinogen Scan', 'Nutri-Score A-E', 'NOVA Classification', 'Daily Intake %'].map((metric) => (
                            <div key={metric} className="flex items-center justify-between border-b border-border pb-6">
                                <span className="font-black uppercase tracking-tighter text-2xl">{metric}</span>
                                <ShieldCheck size={28} className="text-primary" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* SECTION 03: BIOMETRIC SYNC */}
      <section id="synchronization" className="w-full max-w-7xl px-6 py-48">
        <div className="flex flex-col md:flex-row items-center gap-32">
            <div className="flex-1 space-y-12">
                <div className="space-y-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Protocol 03</span>
                    <h2 className="text-8xl font-black uppercase tracking-tighter leading-[0.8]">Biometric<br /><span className="text-primary">Architecture</span></h2>
                </div>
                <div className="p-16 rounded-[4rem] bg-muted/30 border-2 border-dashed border-border space-y-8">
                    <div className="flex items-center gap-6">
                        <Fingerprint size={48} className="text-primary" />
                        <h3 className="text-3xl font-black tracking-tight">Personalized Safety Logic</h3>
                    </div>
                    <p className="text-xl font-medium text-muted-foreground leading-relaxed">Your clinical profile—Height, Weight, BMI, and Medical History—acts as the focal lens for every scan. The AI generates safety tips specifically for your biological triggers.</p>
                </div>
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-6">
                {[
                    { label: 'Diabetes', icon: Activity },
                    { label: 'Celiac', icon: ShieldCheck },
                    { label: 'Hypertension', icon: Biohazard },
                    { label: 'Allergies', icon: Database },
                ].map((item, i) => (
                    <div key={item.label} className={`p-12 rounded-[3rem] bg-white border border-border flex flex-col items-center justify-center gap-6 transition-all hover:scale-105 shadow-sm ${i % 2 === 1 ? 'translate-y-12' : ''}`}>
                        <item.icon size={40} className="text-primary" />
                        <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="w-full py-64 px-6 flex flex-col items-center text-center gap-16 bg-muted/20">
        <h2 className="text-[10vw] font-black tracking-tighter leading-[0.75] max-w-5xl">
            Secure Your <br />
            <span className="text-primary">Safety Protocol</span>
        </h2>
        <Link href="/scanner/barcode">
            <Button className="h-28 px-20 rounded-full bg-primary text-white text-3xl font-black uppercase tracking-tighter hover:scale-110 transition-all shadow-3xl">
                Activate Lens <ArrowRight className="ml-6" size={40} />
            </Button>
        </Link>
        <p className="text-[11px] font-black uppercase tracking-[0.6em] opacity-30 mt-12">LENS BITE CLINICAL ARCHITECTURE v4.0.1</p>
      </section>

      {/* FINAL SYSTEM FOOTER */}
      <footer className="w-full bg-white border-t border-border p-12 md:p-24 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-16 mb-12 md:mb-0">
            <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">Studio Node</span>
                <span className="text-sm font-bold tracking-widest">ET.CLINICAL.01</span>
            </div>
            <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">Security Protocol</span>
                <span className="text-sm font-bold tracking-widest">AES-256.ENCRYPTED</span>
            </div>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-20">© 2026 Lens Bite Precision Architecture • No Italics</p>
      </footer>

      <style jsx global>{`
        .rotate-y-12 {
          transform: rotateY(12deg);
        }
        .translate-z-20 {
          transform: translateZ(40px);
        }
        .translate-z-40 {
          transform: translateZ(80px);
        }
      `}</style>
    </main>
  );
}
