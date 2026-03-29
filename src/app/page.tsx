'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScanBarcode, ShieldCheck, Activity, ChefHat, ArrowRight, Dna, Cpu, Zap } from 'lucide-react';
import { useUser } from '@/firebase';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function Home() {
  const { user } = useUser();

  return (
    <div className="flex flex-col h-screen overflow-hidden md:h-auto md:overflow-visible bg-background">
      <Header />
      
      <main className="flex-1 flex flex-col">
        {/* Mobile App Dashboard / Desktop Hero */}
        <section className="flex-1 flex items-center justify-center px-4 relative overflow-hidden">
          <div className="container relative z-10 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
              <div className="space-y-6 md:space-y-12">
                <div className="space-y-3 md:space-y-6 animate-reveal">
                  <Badge variant="outline" className="text-primary border-primary/20 px-3 md:px-6 py-1 md:py-2 uppercase tracking-[0.4em] text-[8px] md:text-[10px] font-black bg-primary/5 rounded-full">
                    Lens Bite Network • Live Intelligence
                  </Badge>
                  <h1 className="text-4xl md:text-9xl font-black tracking-tighter leading-[0.9] italic text-glow">
                    Food Safety <br />
                    <span className="text-primary">Redefined</span>.
                  </h1>
                  <p className="max-w-xl text-md md:text-xl text-muted-foreground font-medium leading-relaxed">
                    Instantly cross-reference ingredients against your <span className="text-foreground">Health Architecture</span>.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 md:gap-6 animate-reveal [animation-delay:200ms]">
                  <Link href={user ? "/scanner/barcode" : "/login"} className="w-full sm:w-auto">
                    <Button size="lg" className="w-full h-14 md:h-20 px-6 md:px-12 rounded-2xl md:rounded-[2rem] text-md md:text-xl font-black bg-primary text-background hover:scale-105 active:scale-95 transition-all shadow-xl">
                      <ScanBarcode className="mr-2 md:mr-4 size-5 md:size-8" />
                      Start Scan
                    </Button>
                  </Link>
                  <Link href={user ? "/profile" : "/login"} className="w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="w-full h-14 md:h-20 px-6 md:px-12 rounded-2xl md:rounded-[2rem] text-md md:text-xl font-black border-white/10 glass-panel hover:bg-white/5 transition-all">
                      Health Vault
                    </Button>
                  </Link>
                </div>

                {/* Mobile Stats - Condensed */}
                <div className="flex items-center gap-4 md:gap-10 pt-6 md:pt-12 border-t border-white/5 animate-reveal [animation-delay:400ms]">
                    {[
                      { label: "Scans", value: "24k+", icon: <Cpu className="size-3 md:size-4 text-primary" /> },
                      { label: "Sync", value: "Live", icon: <Zap className="size-3 md:size-4 text-accent" /> },
                      { label: "Status", value: "OK", icon: <ShieldCheck className="size-3 md:size-4 text-primary" /> },
                    ].map((stat) => (
                      <div key={stat.label} className="space-y-0.5">
                        <div className="flex items-center gap-1">
                          {stat.icon}
                          <p className="text-[7px] md:text-[8px] uppercase tracking-[0.2em] text-muted-foreground font-black">{stat.label}</p>
                        </div>
                        <p className="text-md md:text-2xl font-black tracking-tight">{stat.value}</p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Decorative HUD Element */}
              <div className="hidden lg:flex relative justify-center items-center h-[600px] animate-reveal [animation-delay:600ms]">
                <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full animate-pulse" />
                <div className="relative z-10 w-[400px] h-[400px] border-[20px] border-primary/10 rounded-[4rem] flex items-center justify-center group overflow-hidden animate-float">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent group-hover:scale-150 transition-transform duration-1000" />
                  <Dna className="size-32 text-primary animate-pulse" />
                  <div className="absolute inset-4 border-2 border-dashed border-primary/20 rounded-[3rem] animate-[spin_20000ms_linear_infinite]" />
                  <div className="absolute inset-12 border border-primary/10 rounded-[2.5rem] animate-[spin_10000ms_linear_infinite_reverse]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Laptop Only */}
        <section className="hidden md:block py-40 border-y border-white/5 bg-card/10 relative overflow-hidden">
          <div className="container px-4 mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { 
                  icon: <Activity className="size-10" />, 
                  title: "Safety Intelligence", 
                  desc: "Identify specific hazards based on your unique biometric markers." 
                },
                { 
                  icon: <ChefHat className="size-10" />, 
                  title: "Privacy Protocol", 
                  desc: "Your physical data is fully encrypted and stored privately." 
                },
                { 
                  icon: <ShieldCheck className="size-10" />, 
                  title: "Hazard Analysis", 
                  desc: "Instantly detect thousands of additives and potential carcinogens." 
                }
              ].map((feature, i) => (
                <div key={i} className="group p-12 rounded-[3rem] glass-panel hover-lift space-y-8 relative overflow-hidden animate-reveal" style={{ animationDelay: `${(i+1)*200}ms` }}>
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

      <footer className="hidden md:block py-20 bg-background border-t border-white/5 relative">
        <div className="container px-4 mx-auto flex flex-col items-center space-y-8">
           <div className="flex items-center gap-3 opacity-30 group">
              <div className="size-8 bg-foreground rounded-[0.5rem] flex items-center justify-center group-hover:bg-primary transition-colors">
                <ShieldCheck className="size-5 text-background" />
              </div>
              <span className="text-lg font-black tracking-tighter uppercase italic">Lens Bite Secure Platform</span>
           </div>
           <p className="text-[10px] text-muted-foreground uppercase tracking-[1em] font-black opacity-40">© 2025 LENS BITE • V1.10 DEPLOYED</p>
        </div>
      </footer>
    </div>
  );
}