'use client';

import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ShieldCheck, Activity, DatabaseBackup, CheckCircle, Lightbulb, Share2, Target, Info, AlertTriangle, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { useUser, useFirestore, addDocumentNonBlocking } from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

export function RiskResultCard({ state }: { state: any }) {
    const [animatedPercentages, setAnimatedPercentages] = useState<Record<string, number>>({});
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const { user } = useUser();
    const firestore = useFirestore();
    const { toast } = useToast();

    useEffect(() => {
        if (state.type === 'success' && state.analysis) {
            const timer = setTimeout(() => {
                const newPercentages: Record<string, number> = {};
                state.analysis.nutrients.forEach((n: any) => {
                    newPercentages[n.name] = n.percentage;
                });
                setAnimatedPercentages(newPercentages);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [state]);

    if (state.type !== 'success' || !state.analysis) return null;

    const { productName, analysis, tip } = state;
    const { riskScore, isSafe, summary, novaScore, nutriScore, nutrients, detectedAllergens, carcinogens } = analysis;

    const handleSaveToHistory = () => {
        if (!user || !firestore) return;
        setIsSaving(true);
        addDocumentNonBlocking(collection(firestore, 'users', user.uid, 'scans'), {
            productName, riskScore, isSafe, summary, novaScore, nutriScore, timestamp: serverTimestamp()
        });
        setTimeout(() => { 
            setIsSaving(false); 
            setIsSaved(true); 
            toast({ title: "Audit Logged", description: "Committed to secure vault." }); 
        }, 800);
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 text-left pb-32">
            
            {/* PRODUCT HEADER */}
            <div className="bg-white border border-black/5 rounded-[32px] p-12 md:p-16 flex flex-col md:flex-row justify-between gap-12 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="space-y-8 flex-1">
                    <div className="flex items-center gap-4">
                        <Badge variant="outline" className={cn(
                            "px-4 py-1.5 rounded-lg overline font-black border-2",
                            isSafe ? "border-[#E8F5E9] text-[#2E7D32] bg-[#E8F5E9]" : "border-[#FDECEA] text-[#E53935] bg-[#FDECEA]"
                        )}>
                            {isSafe ? "SAFE TO EAT" : "HIGH RISK"}
                        </Badge>
                        <span className="overline text-[10px] opacity-40 font-black tracking-widest">ID: {Math.random().toString(36).slice(2, 10).toUpperCase()}</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.9] font-['Space_Grotesk']">{productName}</h2>
                    <p className="text-lg font-medium text-[#3D3660] leading-relaxed max-w-xl">{summary}</p>
                </div>
                
                <div className="flex flex-col items-center justify-center p-10 bg-[#F6F4FB] rounded-[24px] border border-black/5 min-w-[220px] shadow-inner">
                    <span className="overline text-[10px] opacity-40 font-black mb-2">Risk Index</span>
                    <span className={cn(
                        "text-7xl font-black tracking-tighter",
                        riskScore > 75 ? "text-[#E53935]" : riskScore > 50 ? "text-[#F59E0B]" : "text-[#2E7D32]"
                    )}>
                        {riskScore}%
                    </span>
                    <Badge variant="outline" className="mt-4 overline text-[9px] border-primary/20 text-primary">Clinical Verified</Badge>
                </div>
            </div>

            {/* NUTRIENT & PROCESSING MATRIX */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white border border-black/5 rounded-[32px] p-12 space-y-12 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                    <div className="flex items-center gap-3">
                        <Activity className="size-5 text-primary" />
                        <span className="overline text-[10px] font-black">Nutritional Signatures</span>
                    </div>
                    <div className="space-y-8">
                        {nutrients.map((n: any) => (
                            <div key={n.name} className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="overline text-[10px] font-bold text-[#3D3660]">{n.name}</span>
                                    <span className="overline text-[10px] opacity-40 font-black">{n.value} · {n.percentage}%</span>
                                </div>
                                <Progress 
                                    value={animatedPercentages[n.name] || 0} 
                                    className="h-2.5 bg-[#F6F4FB]" 
                                    indicatorClassName={cn(
                                        "transition-all duration-1000",
                                        n.level === 'high' ? "bg-[#EF4444]" : n.level === 'moderate' ? "bg-[#F59E0B]" : "bg-[#10B981]"
                                    )}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white border border-black/5 rounded-[32px] p-12 flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                    <div className="space-y-12">
                        <div className="flex items-center gap-3">
                            <Target className="size-5 text-primary" />
                            <span className="overline text-[10px] font-black">Processing & Grade</span>
                        </div>
                        <div className="grid grid-cols-2 gap-10">
                            <div className="space-y-3">
                                <span className="overline text-[10px] opacity-40 font-black tracking-widest">NOVA Class</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-6xl font-black font-['Space_Grotesk']">{novaScore}</span>
                                    <span className="text-sm font-bold opacity-20">/ 4</span>
                                </div>
                                <p className="text-[10px] font-bold text-muted-foreground overline">
                                  {novaScore === 4 ? "Ultra-Processed" : novaScore === 3 ? "Processed" : "Minimally Processed"}
                                </p>
                            </div>
                            <div className="space-y-3">
                                <span className="overline text-[10px] opacity-40 font-black tracking-widest">Nutri-Score</span>
                                <div className={cn(
                                  "size-16 rounded-2xl text-white flex items-center justify-center text-3xl font-black font-['Space_Grotesk'] shadow-lg",
                                  nutriScore === 'A' ? "bg-[#10B981]" : nutriScore === 'B' ? "bg-[#84CC16]" : nutriScore === 'C' ? "bg-[#FACC15]" : nutriScore === 'D' ? "bg-[#F59E0B]" : "bg-[#EF4444]"
                                )}>
                                    {nutriScore}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="pt-12 mt-12 border-t border-black/5 flex items-center gap-4 text-primary opacity-60">
                        <ShieldCheck size={20} />
                        <span className="overline text-[9px] font-black tracking-widest">WHO 2025 DATABASE SYNCHRONIZED</span>
                    </div>
                </div>
            </div>

            {/* HAZARD SCRUTINY */}
            {(detectedAllergens?.length > 0 || carcinogens?.length > 0) && (
              <div className="bg-white border border-black/5 rounded-[32px] p-12 shadow-[0_2px_8px_rgba(0,0,0,0.04)] space-y-10">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="size-5 text-[#E53935]" />
                  <span className="overline text-[10px] font-black">Hazard Scrutiny</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {carcinogens?.length > 0 && (
                    <div className="space-y-6">
                      <span className="text-xs font-black uppercase tracking-widest text-[#E53935] flex items-center gap-2">
                        <AlertTriangle size={14} /> Carcinogens Identified
                      </span>
                      <div className="space-y-4">
                        {carcinogens.map((c: any) => (
                          <div key={c.name} className="p-5 rounded-[16px] bg-[#FDECEA] border border-[#E53935]/10 space-y-2">
                            <h4 className="font-black text-sm uppercase text-[#E53935]">{c.name}</h4>
                            <p className="text-xs font-medium text-[#E53935]/80 leading-relaxed">{c.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {detectedAllergens?.length > 0 && (
                    <div className="space-y-6">
                      <span className="text-xs font-black uppercase tracking-widest text-[#F59E0B] flex items-center gap-2">
                        <Info size={14} /> Allergens Detected
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {detectedAllergens.map((a: string) => (
                          <Badge key={a} variant="outline" className="px-4 py-2 rounded-xl border-[#F59E0B]/20 text-[#F59E0B] bg-[#FFF8E1] overline text-[10px] font-black">
                            {a}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* PERSONALIZED TIP */}
            {tip && (
                <div className="bg-[#7C43F1]/5 border border-[#7C43F1]/20 rounded-[32px] p-12 md:p-16 space-y-8 animate-in zoom-in-95 duration-700">
                    <div className="flex items-center gap-3 text-primary">
                        <Lightbulb size={28} className="animate-pulse" />
                        <span className="overline text-[12px] font-black">Biometric Clinical Tip</span>
                    </div>
                    <p className="text-2xl md:text-3xl font-medium leading-[1.2] tracking-tight text-[#0F0A2A]">{tip}</p>
                    <div className="pt-4 flex items-center gap-3 text-[10px] font-black text-primary/40 uppercase tracking-[0.3em]">
                      <Fingerprint size={14} /> Profile Sync: Active
                    </div>
                </div>
            )}

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                    onClick={handleSaveToHistory}
                    disabled={isSaving || isSaved}
                    className={cn(
                        "flex-1 h-20 rounded-[20px] overline font-black text-xs tracking-[0.2em] transition-all",
                        isSaved ? "bg-[#7C43F1]/10 text-[#7C43F1] border-2 border-[#7C43F1]/20" : "bg-[#7C43F1] text-white hover:bg-[#7C43F1]/90 shadow-xl"
                    )}
                >
                    {isSaving ? "Synchronizing..." : isSaved ? "Vauled Logged" : "Commit to Clinical Vault"}
                    {isSaved ? <CheckCircle className="ml-4 size-5" /> : <DatabaseBackup className="ml-4 size-5" />}
                </Button>
                <Button variant="outline" className="h-20 w-20 rounded-[20px] border-black/10 bg-white hover:bg-muted flex items-center justify-center transition-all shadow-sm">
                    <Share2 size={24} className="text-primary" />
                </Button>
            </div>
        </div>
    );
}
