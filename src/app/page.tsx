'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScanBarcode, ShieldCheck, Activity, ChefHat, ArrowRight, Dna, Cpu, Zap, Search } from 'lucide-react';
import { useUser } from '@/firebase';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const { user } = useUser();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="flex-1 flex flex-col">
        {/* Main Hero Section */}
        <section className="flex-1 flex items-center justify-center px-4 py-12 md:py-24 relative overflow-hidden">
          <div className="container relative z-10 max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-8 md:space-y-12 max-w-4xl mx-auto">
              
              <div className="space-y-4 md:space-y-6 animate-reveal">
                <Badge variant="outline" className="text-primary border-primary/30 px-4 py-1.5 rounded-full bg-primary/5 font-bold tracking-wide">
                  Intelligence Dashboard • v1.20
                </Badge>
                <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight leading-[1.05] text-foreground">
                  Know exactly what's <br />
                  in your <span className="text-primary">food</span>.
                </h1>
                <p className="max-w-2xl mx-auto text-lg md:text-2xl text-muted-foreground font-medium leading-relaxed">
                  Advanced AI analysis that cross-references every ingredient against your unique health profile.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center animate-reveal [animation-delay:200ms]">
                <Link href={user ? "/scanner/barcode" : "/login"} className="w-full sm:w-auto">
                  <Button size="lg" className="w-full h-16 px-10 rounded-2xl text-lg font-bold bg-primary text-white hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
                    <ScanBarcode className="mr-3 size-6" />
                    Start Fast Scan
                  </Button>
                </Link>
                <Link href={user ? "/profile" : "/login"} className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full h-16 px-10 rounded-2xl text-lg font-bold border-border bg-white hover:bg-muted/10 transition-all shadow-sm">
                    View Health Vault
                  </Button>
                </Link>
              </div>

              {/* Stats & Trust Indicators */}
              <div className="grid grid-cols-3 gap-8 md:gap-16 pt-8 animate-reveal [animation-delay:400ms]">
                {[
                  { label: "Scans", value: "24.5k", icon: <Search className="size-4 text-primary" /> },
                  { label: "Uptime", value: "99.9%", icon: <Zap className="size-4 text-secondary" /> },
                  { label: "Security", value: "AES-256", icon: <ShieldCheck className="size-4 text-accent" /> },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center space-y-1">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      {stat.icon}
                      <span className="text-[10px] font-bold uppercase tracking-wider">{stat.label}</span>
                    </div>
                    <span className="text-2xl md:text-3xl font-extrabold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="hidden md:block py-24 bg-muted/30 border-t border-border">
          <div className="container px-4 mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  icon: <Activity className="size-8" />, 
                  title: "Clinical Accuracy", 
                  desc: "Identify potential carcinogens and allergens using clinical-grade data." 
                },
                { 
                  icon: <ChefHat className="size-8" />, 
                  title: "Cooking Habits", 
                  desc: "Personalized advice based on your favorite preparation methods." 
                },
                { 
                  icon: <Dna className="size-8" />, 
                  title: "Biometric Sync", 
                  desc: "Calculations based on your BMI, age, and existing medical conditions." 
                }
              ].map((feature, i) => (
                <div key={i} className="group p-10 rounded-3xl bg-white border border-border shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 space-y-6 animate-reveal" style={{ animationDelay: `${(i+1)*150}ms` }}>
                  <div className="size-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    {feature.icon}
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">{feature.desc}</p>
                  </div>
                  <ArrowRight className="size-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="hidden md:block py-12 border-t border-border bg-white">
        <div className="container px-4 mx-auto flex flex-col items-center space-y-4">
           <div className="flex items-center gap-2 opacity-60">
              <ShieldCheck className="size-4 text-primary" />
              <span className="text-sm font-bold tracking-tight uppercase">Lens Bite Secure Infrastructure</span>
           </div>
           <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">© 2025 LENS BITE • ENTERPRISE GRADE FOOD ANALYSIS</p>
        </div>
      </footer>
    </div>
  );
}