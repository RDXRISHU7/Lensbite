'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
            toast({ title: "Audit Saved", description: "Record committed to your secure vault." }); 
        }, 800);
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 page-reveal text-left pb-32">
            
            {/* PRODUCT HEADER GLASS SLATE */}
            <div className="glass-panel overflow-hidden">
                <div className="p-10 md:p-16 flex flex-col md:flex-row justify-between gap-16 items-start">
                    <div className="space-y-8 flex-1">
                        <div className="flex items-center gap-4">
                            <Badge className={cn("px-6 py-2 text-[10px] font-black uppercase rounded-lg", isSafe ? "badge-safe" : "badge-alert")}>
                                {isSafe ? "Safe Entry" : "Clinical Hazard"}
                            </Badge>
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">Audit: {Math.random().toString(36).slice(2, 10).toUpperCase()}</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter">{productName}</h2>
                        <p className="text-2xl font-bold leading-tight text-foreground/80">{summary}</p>
                    </div>
                    
                    <div className="flex flex-col items-center gap-4 p-12 bg-white/10 backdrop-blur-3xl rounded-[2.5rem] min-w-[220px] border border-white/30 shadow-2xl">
                        <span className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.5em]">Risk Score</span>
                        <span className={cn("text-8xl font-black tracking-tighter", riskScore > 70 ? "text-destructive" : riskScore > 30 ? "text-secondary" : "text-primary")}>
                            {riskScore}
                        </span>
                        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.4em]">System Protocol</span>
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-3xl border-t border-white/20 p-10 flex flex-wrap gap-16 items-center justify-between">
                    <div className="flex items-center gap-12">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.4em] mb-3">NOVA Index</span>
                            <div className="flex items-center gap-3">
                                <span className="text-4xl font-black">{novaScore}</span>
                                <span className="text-sm font-black text-muted-foreground">/ 4</span>
                            </div>
                        </div>
                        <div className="h-12 w-px bg-white/20" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.4em] mb-3">Nutri-Score</span>
                            <div className="h-12 w-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary text-2xl font-black">
                                {nutriScore}
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-primary/60">
                        <ShieldCheck size={24} />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Verified Integrity</span>
                    </div>
                </div>
            </div>

            {/* NUTRIENT MATRIX GLASS SLATE */}
            <div className="glass-panel p-10 md:p-16 space-y-12">
                <div className="flex items-center gap-4 mb-4">
                    <Activity size={24} className="text-primary" />
                    <h3 className="text-sm font-black uppercase tracking-[0.5em] text-muted-foreground">Nutrient Profile Matrix</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12">
                    {nutrients.map((n: any) => (
                        <div key={n.name} className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="font-black text-foreground text-lg uppercase tracking-tight">{n.name}</span>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-black text-muted-foreground">{n.value}</span>
                                    <span className="text-[11px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full">{n.percentage}% DV</span>
                                </div>
                            </div>
                            <Progress 
                                value={animatedPercentages[n.name] || 0} 
                                className="h-3 bg-white/20 rounded-full overflow-hidden" 
                                indicatorClassName={cn(
                                    "transition-all duration-1000",
                                    n.level === 'high' ? "bg-destructive shadow-[0_0_15px_rgba(229,57,53,0.3)]" : n.level === 'moderate' ? "bg-secondary" : "bg-primary"
                                )}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* CLINICAL TIP GLASS SLATE */}
            {tip && (
                <div className="glass-panel p-12 md:p-20 bg-primary/5 border-primary/20 space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-white/40 shadow-lg">
                            <Lightbulb size={24} />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-[0.5em] text-primary">Personalized Safety tip</span>
                    </div>
                    <p className="text-3xl font-bold text-foreground leading-tight tracking-tight">{tip}</p>
                </div>
            )}

            {/* SYSTEM ACTIONS */}
            <div className="flex flex-col sm:row gap-8 pt-8">
                <Button 
                    onClick={handleSaveToHistory}
                    disabled={isSaving || isSaved}
                    className={cn(
                        "flex-1 h-20 text-[11px] font-black uppercase tracking-[0.4em] rounded-[1.5rem] transition-all shadow-2xl",
                        isSaved ? "bg-primary/10 text-primary border border-primary/30" : "primary-btn"
                    )}
                >
                    {isSaving ? "Syncing..." : isSaved ? "Entry Logged" : "Commit to Vault"}
                    {isSaved ? <CheckCircle className="ml-4 size-5" /> : <DatabaseBackup className="ml-4 size-5" />}
                </Button>
                <Button variant="outline" className="h-20 w-20 rounded-[1.5rem] border-white/40 bg-white/10 backdrop-blur-3xl hover:bg-white/20 transition-all flex items-center justify-center shadow-xl">
                    <Share2 size={24} className="text-muted-foreground" />
                </Button>
            </div>

            <div className="flex items-center gap-3 opacity-30 justify-center pt-8">
                <Info size={14} />
                <span className="text-[9px] font-black uppercase tracking-[0.5em]">Clinical audit protocol v5.0.4-X</span>
            </div>
        </div>
    );
}