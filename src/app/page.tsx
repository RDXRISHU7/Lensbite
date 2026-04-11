'use client';

import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';
import { Search, Zap, ArrowRight, Barcode, Camera, Activity, ShieldCheck, Heart, Info } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function Home() {
  const { user } = useUser();

  return (
    <main className="min-h-screen bg-background selection:bg-primary/10">
      
      {/* MEDICAL HEADER */}
      <header className="w-full h-20 flex items-center justify-between px-6 md:px-12 bg-white border-b border-border sticky top-0 z-[100]">
        <Logo />
        
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input 
                    placeholder="Search clinical ingredients..." 
                    className="h-10 pl-10 bg-muted/30 border-border rounded-lg text-sm"
                />
            </div>
        </div>

        <div className="flex items-center gap-4">
            {!user && (
                <Link href="/login">
                    <Button variant="ghost" className="text-sm font-medium">Log In</Button>
                </Link>
            )}
            {user ? (
                <UserNav />
            ) : (
                <Link href="/signup">
                    <Button className="primary-btn h-10 px-6">Get Started</Button>
                </Link>
            )}
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 page-fade-in">
            <Badge variant="outline" className="badge-safe py-1 px-4 font-medium uppercase tracking-wider text-[10px]">
                Medical-Grade Food Safety
            </Badge>
            <h1 className="text-4xl md:text-6xl text-foreground font-bold leading-tight">
                Decipher your food.<br/>
                <span className="text-primary">Protect your health.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-lg">
                BiteLens provides clinical-grade analysis of food ingredients, cross-referencing them with your unique biometric health profile in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/scanner/barcode">
                    <Button className="scanner-btn h-14 px-8 text-base w-full sm:w-auto">
                        <Zap className="mr-2 size-5 fill-current" />
                        Start Scanning
                    </Button>
                </Link>
                <Link href="/signup">
                    <Button variant="outline" className="h-14 px-8 text-base border-border w-full sm:w-auto">
                        Learn More
                    </Button>
                </Link>
            </div>
            <div className="flex items-center gap-8 pt-8 border-t border-border">
                <div className="flex flex-col">
                    <span className="text-2xl font-bold">100k+</span>
                    <span className="text-xs text-muted-foreground uppercase font-medium">Products Indexed</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-2xl font-bold">99.8%</span>
                    <span className="text-xs text-muted-foreground uppercase font-medium">Accuracy Rate</span>
                </div>
            </div>
        </div>

        <div className="relative aspect-square md:aspect-video lg:aspect-square bg-muted/20 rounded-[24px] overflow-hidden border border-border flex items-center justify-center p-8 page-fade-in">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-[20px] shadow-lg border border-border space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <Activity size={20} />
                        </div>
                        <span className="font-bold text-sm">System Analysis</span>
                    </div>
                    <Badge className="badge-safe">Safe</Badge>
                </div>
                <div className="space-y-2">
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[85%]" />
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase">
                        <span>Purity Metric</span>
                        <span>85%</span>
                    </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                    Based on your hypertension profile, this item is categorized as safe with moderate sodium levels.
                </p>
                <div className="pt-4 border-t border-border flex items-center gap-2">
                    <ShieldCheck className="text-primary size-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Clinical Protocol v4.0</span>
                </div>
            </div>
        </div>
      </section>

      {/* CORE PROTOCOLS */}
      <section className="bg-white border-y border-border py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold">Designated Safety Protocols</h2>
                <p className="text-muted-foreground">Our multi-layered system scrutinizes every ingredient through a rigorous clinical framework.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: Barcode, title: 'Barcode Decryption', desc: 'Instant lookup via Open Food Facts API for verified ingredient signatures.' },
                    { icon: Camera, title: 'Vision AI Lens', desc: 'Multimodal extraction of label data even from damaged or non-standard packaging.' },
                    { icon: Heart, title: 'Biometric Sync', desc: 'Cross-referencing ingredients with your clinical medical profile in real-time.' }
                ].map((item, i) => (
                    <div key={i} className="medical-card p-8 space-y-6 hover:translate-y-[-4px] transition-transform">
                        <div className="size-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                            <item.icon size={24} />
                        </div>
                        <h3 className="text-lg font-bold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                        <Link href="/scanner/barcode" className="inline-flex items-center text-primary text-xs font-bold uppercase tracking-wider hover:gap-3 transition-all">
                            Initialize <ArrowRight className="ml-2 size-4" />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-background border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <Logo />
            <div className="flex gap-8">
                <Link href="/history" className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors">HISTORY</Link>
                <Link href="/profile" className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors">PROFILE</Link>
                <Link href="/privacy" className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors">PRIVACY</Link>
            </div>
            <p className="text-[10px] font-bold text-muted-foreground opacity-60">© 2026 BITE LENS CLINICAL SYSTEMS</p>
        </div>
      </footer>
    </main>
  );
}