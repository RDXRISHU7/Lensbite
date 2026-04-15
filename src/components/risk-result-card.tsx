'use client';

import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ShieldCheck, Activity, DatabaseBackup, CheckCircle, Lightbulb, Share2, Info } from 'lucide-react';
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
    const { riskScore, isSafe, summary, novaScore, nutriScore, nutrients } = analysis;

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
        <div className="w-full max-w-4xl mx-auto space-y-8 animate-iris text-left pb-32">
            
            {/* PRODUCT HEADER DEEP GLASS */}
            <div className="glass-panel">
                <div className="p-10 md:p-16 flex flex-col md:flex-row justify-between gap-16 items-start">
                    <div className="space-y-8 flex-1">
                        <div className="flex items-center gap-4">
                            <Badge className={cn("px-6 py-2 text-[10px] font-black uppercase rounded-lg border-none", isSafe ? "bg-primary text-[#24316B]" : "bg-destructive text-white")}>
                                {isSafe ? "Safe Entry" : "Clinical Alert"}
                            </Badge>
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Audit: {Math.random().toString(36).slice(2, 10).toUpperCase()}</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black uppercase text-white leading-none tracking-tighter">{productName}</h2>
                        <p className="text-2xl font-bold leading-tight text-white/80">{summary}</p>
                    </div>
                    
                    <div className="flex flex-col items-center gap-4 p-12 bg-white/5 backdrop-blur-3xl rounded-[3rem] min-w-[240px] border border-white/10 shadow-2xl">
                        <span className="text-[10px] font-black uppercase text-white/40 tracking-[0.5em]">Risk Index</span>
                        <span className={cn("text-8xl font-black tracking-tighter", riskScore > 70 ? "text-destructive" : riskScore > 30 ? "text-secondary" : "text-primary")}>
                            {riskScore}
                        </span>
                        <span className="text-[9px] font-black text-primary uppercase tracking-[0.4em]">System Scrutiny</span>
                    </div>
                </div>

                <div className="bg-white/5 backdrop-blur-3xl border-t border-white/10 p-10 flex flex-wrap gap-16 items-center justify-between">
                    <div className="flex items-center gap-12">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase text-white/40 tracking-[0.4em] mb-4">NOVA Classification</span>
                            <div className="flex items-center gap-3">
                                <span className="text-4xl font-black text-white">{novaScore}</span>
                                <span className="text-sm font-black text-white/30">/ 4</span>
                            </div>
                        </div>
                        <div className="h-16 w-px bg-white/10" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase text-white/40 tracking-[0.4em] mb-4">Nutri-Score</span>
                            <div className="h-14 w-14 rounded-2xl bg-primary text-[#24316B] flex items-center justify-center text-3xl font-black">
                                {nutriScore}
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-primary/60">
                        <ShieldCheck size={28} />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Verified Integrity</span>
                    </div>
                </div>
            </div>

            {/* NUTRIENT MATRIX GLASS */}
            <div className="glass-panel p-10 md:p-16 space-y-12">
                <div className="flex items-center gap-4 mb-4">
                    <Activity size={24} className="text-secondary" />
                    <h3 className="text-sm font-black uppercase tracking-[0.5em] text-white/40">Clinical Nutrient Matrix</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12">
                    {nutrients.map((n: any) => (
                        <div key={n.name} className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="font-black text-white text-lg uppercase tracking-tight">{n.name}</span>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-black text-white/40">{n.value}</span>
                                    <span className="text-[11px] font-black text-[#7C4DFF] bg-tertiary/20 px-4 py-1.5 rounded-full border border-tertiary/30">{n.percentage}% DV</span>
                                </div>
                            </div>
                            <Progress 
                                value={animatedPercentages[n.name] || 0} 
                                className="h-4 bg-white/5 rounded-full overflow-hidden" 
                                indicatorClassName={cn(
                                    "transition-all duration-1000",
                                    n.level === 'high' ? "bg-destructive shadow-[0_0_20px_rgba(229,57,53,0.4)]" : n.level === 'moderate' ? "bg-secondary shadow-[0_0_20px_rgba(246,213,238,0.3)]" : "bg-primary shadow-[0_0_20px_rgba(251,255,161,0.3)]"
                                )}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* PERSONALIZED TIP GLASS */}
            {tip && (
                <div className="glass-panel p-12 md:p-20 bg-primary/5 border-primary/20 space-y-10">
                    <div className="flex items-center gap-4">
                        <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-white/10 shadow-lg">
                            <Lightbulb size={28} />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-[0.5em] text-primary">Biometric Safety Synthesis</span>
                    </div>
                    <p className="text-3xl md:text-4xl font-bold text-white leading-[1.1] tracking-tight">{tip}</p>
                </div>
            )}

            {/* SYSTEM ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-8 pt-8">
                <Button 
                    onClick={handleSaveToHistory}
                    disabled={isSaving || isSaved}
                    className={cn(
                        "flex-1 h-20 text-[11px] font-black uppercase tracking-[0.4em] rounded-[1.5rem] transition-all border-none",
                        isSaved ? "bg-primary/20 text-primary border border-primary/30" : "primary-btn"
                    )}
                >
                    {isSaving ? "Syncing..." : isSaved ? "Vault Entry Logged" : "Commit to Secure Vault"}
                    {isSaved ? <CheckCircle className="ml-4 size-6" /> : <DatabaseBackup className="ml-4 size-6" />}
                </Button>
                <Button variant="outline" className="h-20 w-20 rounded-[1.5rem] border-white/10 bg-white/5 backdrop-blur-3xl hover:bg-white/10 transition-all flex items-center justify-center text-white">
                    <Share2 size={24} />
                </Button>
            </div>

            <div className="flex items-center gap-3 opacity-20 justify-center pt-8 text-white">
                <Info size={14} />
                <span className="text-[9px] font-black uppercase tracking-[0.5em]">System Logic Protocol v5.0.4-Midnight</span>
            </div>
        </div>
    );
}
