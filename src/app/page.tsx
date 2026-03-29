'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScanBarcode, ShieldCheck, Activity, ChefHat, Sparkles, Zap, ArrowRight, Dna, Cpu } from 'lucide-react';
import { useUser } from '@/firebase';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const { user } = useUser();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-4 pt-20 overflow-hidden">
          <div className="container relative z-10 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-12 animate-reveal">
                <div className="space-y-6">
                  <Badge variant="outline" className="text-primary border-primary/20 px-6 py-2 uppercase tracking-[0.4em] text-[10px] font-black bg-primary/5 rounded-full">
                    Lens Bite Network • Safety Intelligence Live
                  </Badge>
                  <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] italic text-glow">
                    Food Safety <br />
                    <span className="text-primary">Redefined</span>. <br />
                    Precision.
                  </h1>
                  <p className="max-w-xl text-xl text-muted-foreground font-medium leading-relaxed">
                    Instantly cross-reference ingredients against your unique <span className="text-foreground">Health Architecture</span>. Professional-grade safety analysis calibrated to your physical profile.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-6">
                  <Link href={user ? "/scanner/barcode" : "/login"}>
                    <Button size="lg" className="h-20 px-12 rounded-[2rem] text-xl font-black bg-primary text-background hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(0,230,118,0.3)]">
                      <ScanBarcode className="mr-4 size-8" />
                      Start Safety Scan
                    </Button>
                  </Link>
                  <Link href={user ? "/profile" : "/login"}>
                    <Button variant="outline" size="lg" className="h-20 px-12 rounded-[2rem] text-xl font-black border-white/10 glass-panel hover:bg-white/5 transition-all">
                      My Health Vault
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center gap-10 pt-12 border-t border-white/5">
                    {[
                      { label: "Safety Scans", value: "24,801", icon: <Cpu className="size-4 text-primary" /> },
                      { label: "Analysis Sync", value: "Real-time", icon: <Zap className="size-4 text-accent" /> },
                      { label: "Data Integrity", value: "Verified", icon: <ShieldCheck className="size-4 text-primary" /> },
                    ].map((stat) => (
                      <div key={stat.label} className="space-y-2">
                        <div className="flex items-center gap-2">
                          {stat.icon}
                          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-black">{stat.label}</p>
                        </div>
                        <p className="text-2xl font-black tracking-tight">{stat.value}</p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Decorative HUD Element */}
              <div className="hidden lg:flex relative justify-center items-center h-[600px] animate-reveal">
                <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full animate-pulse" />
                <div className="relative z-10 w-[400px] h-[400px] border-[20px] border-primary/10 rounded-[4rem] flex items-center justify-center group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent group-hover:scale-150 transition-transform duration-1000" />
                  <Dna className="size-32 text-primary animate-pulse" />
                  
                  {/* Rotating Rings */}
                  <div className="absolute inset-4 border-2 border-dashed border-primary/20 rounded-[3rem] animate-[spin_20000ms_linear_infinite]" />
                  <div className="absolute inset-12 border border-primary/10 rounded-[2.5rem] animate-[spin_10000ms_linear_infinite_reverse]" />
                </div>
                
                {/* Floating Badges */}
                <div className="absolute top-0 right-0 p-8 glass-panel rounded-[2rem]">
                   <Badge className="bg-primary text-background font-black">ENCRYPTED PROTOCOL</Badge>
                </div>
                <div className="absolute bottom-10 left-0 p-6 glass-panel rounded-[2rem]">
                   <p className="text-[10px] font-black uppercase opacity-40 mb-1">Response Latency</p>
                   <p className="text-xl font-black">0.22ms</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-40 border-y border-white/5 bg-card/10 relative overflow-hidden">
          <div className="container px-4 mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { 
                  icon: <Activity className="size-10" />, 
                  title: "Safety Intelligence", 
                  desc: "Identify specific hazards based on your unique biometric markers and health objectives." 
                },
                { 
                  icon: <ChefHat className="size-10" />, 
                  title: "Privacy Protocol", 
                  desc: "Your physical data is fully encrypted and stored exclusively in your private profile." 
                },
                { 
                  icon: <ShieldCheck className="size-10" />, 
                  title: "Hazard Analysis", 
                  desc: "Instantly detect thousands of additives, preservatives, and potential carcinogens." 
                }
              ].map((feature, i) => (
                <div key={i} className="group p-12 rounded-[3rem] glass-panel hover-lift space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-700">
                    {feature.icon}
                  </div>
                  <div className="size-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-colors duration-500">
                    {feature.icon}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black italic tracking-tighter">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed font-medium">{feature.desc}</p>
                  </div>
                  <ArrowRight className="size-6 text-primary translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 bg-background border-t border-white/5 relative">
        <div className="container px-4 mx-auto flex flex-col items-center space-y-8">
           <div className="flex items-center gap-3 opacity-30 group">
              <div className="size-8 bg-foreground rounded-[0.5rem] flex items-center justify-center group-hover:bg-primary transition-colors">
                <ShieldCheck className="size-5 text-background" />
              </div>
              <span className="text-lg font-black tracking-tighter uppercase italic">Lens Bite Secure Platform</span>
           </div>
           <p className="text-[10px] text-muted-foreground uppercase tracking-[1em] font-black opacity-40">© 2024 LENS BITE. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}
