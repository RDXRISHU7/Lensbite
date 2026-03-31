'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScanBarcode, ShieldCheck, Activity, Search, LayoutDashboard, Database, ActivitySquare, CheckCircle2 } from 'lucide-react';
import { useUser } from '@/firebase';
import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function Home() {
  const { user } = useUser();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden">
      <Header />
      
      <main className="flex-1 flex flex-col px-4">
        {/* Modern Hero Section */}
        <section className="flex-1 flex flex-col items-center justify-center py-8 md:py-24 max-w-5xl mx-auto w-full">
          <div className="w-full space-y-8 md:space-y-12 text-center">
            
            {/* Header Group */}
            <div className="space-y-4 md:space-y-6 animate-reveal">
              <div className="flex justify-center">
                <Badge variant="secondary" className="px-4 py-1.5 rounded-full font-bold text-primary bg-primary/10 border-none tracking-tight">
                  <Activity className="size-3.5 mr-2 animate-pulse" />
                  Real-time Ingredient Analysis
                </Badge>
              </div>
              <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-[0.9] text-foreground italic">
                Professional Food <br />
                <span className="text-primary">Intelligence.</span>
              </h1>
              <p className="max-w-xl mx-auto text-base md:text-xl text-muted-foreground font-medium leading-tight">
                Instantly cross-reference product ingredients against your unique biometric health architecture.
              </p>
            </div>
            
            {/* Action Group */}
            <div className="flex flex-col sm:flex-row gap-3 w-full justify-center animate-reveal [animation-delay:150ms]">
              <Link href={user ? "/scanner/barcode" : "/login"} className="w-full sm:w-auto">
                <Button size="lg" className="w-full h-14 md:h-18 px-10 rounded-2xl text-lg font-bold bg-primary text-white hover:scale-105 transition-all shadow-xl shadow-primary/20">
                  <ScanBarcode className="mr-3 size-5" />
                  Start Smart Scan
                </Button>
              </Link>
              <Link href={user ? "/history" : "/login"} className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full h-14 md:h-18 px-10 rounded-2xl text-lg font-bold border-border bg-white hover:bg-muted/5 transition-all">
                  <LayoutDashboard className="mr-3 size-5 text-primary" />
                  View Vault
                </Button>
              </Link>
            </div>

            {/* New Replacement Section: Dashboard Status */}
            <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 animate-reveal [animation-delay:300ms]">
              <div className="p-6 md:p-8 rounded-3xl glass-panel flex flex-col items-start text-left gap-4 hover-lift group">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Database className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black italic uppercase tracking-tighter">Clinical Data</h3>
                  <p className="text-sm text-muted-foreground font-medium leading-snug">Synced with the latest FDA and European food safety standards.</p>
                </div>
              </div>

              <div className="p-6 md:p-8 rounded-3xl glass-panel flex flex-col items-start text-left gap-4 hover-lift group border-accent/20">
                <div className="size-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                  <ActivitySquare className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black italic uppercase tracking-tighter">Safety Feed</h3>
                  <p className="text-sm text-muted-foreground font-medium leading-snug">Identifying over 12,000 potential allergens and carcinogenic additives.</p>
                </div>
              </div>

              <div className="p-6 md:p-8 rounded-3xl glass-panel flex flex-col items-start text-left gap-4 hover-lift group">
                <div className="size-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                  <CheckCircle2 className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black italic uppercase tracking-tighter">Verified Scans</h3>
                  <p className="text-sm text-muted-foreground font-medium leading-snug">99.9% accuracy on over 2.5 million consumer products globally.</p>
                </div>
              </div>
            </div>

            {/* Compact Mobile Footer Stats */}
            <div className="flex items-center justify-center gap-6 md:gap-12 pt-4 opacity-40 animate-reveal [animation-delay:450ms]">
              {[
                { label: "Uptime", value: "99.9%" },
                { label: "Encryption", value: "AES-256" },
                { label: "Standards", value: "ISO-27001" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <span className="text-[8px] font-black uppercase tracking-widest">{stat.label}</span>
                  <span className="text-sm font-black italic">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Hidden elements on mobile for absolute focus */}
      <footer className="hidden md:block py-10 border-t border-border bg-white">
        <div className="container px-4 mx-auto flex flex-col items-center gap-2">
           <div className="flex items-center gap-2 opacity-60">
              <ShieldCheck className="size-4 text-primary" />
              <span className="text-xs font-bold tracking-tight uppercase">Lens Bite Global Safety Network</span>
           </div>
           <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.3em]">© 2025 LENS BITE • ENTERPRISE GRADE FOOD ANALYSIS</p>
        </div>
      </footer>
    </div>
  );
}