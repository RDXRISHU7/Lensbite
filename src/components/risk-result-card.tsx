'use client';

import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ShieldCheck, Activity, DatabaseBackup, CheckCircle, Lightbulb, Share2, Info, Target, Biohazard } from 'lucide-react';
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
        <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 text-left pb-32">
            
            {/* PRODUCT HEADER GLASS */}
            <div className="glass-panel p-10 md:p-16 flex flex-col md:flex-row justify-between gap-12">
                <div className="space-y-6 flex-1">
                    <div className="flex items-center gap-4">
                        <Badge className={cn(
                            "px-4 py-1.5 rounded-md overline border-none",
                            isSafe ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                        )}>
                            {isSafe ? "SAFE TO EAT" : "HIGH RISK"}
                        </Badge>
                        <span className="overline opacity-40">Audit: {Math.random().toString(36).slice(2, 8).toUpperCase()}</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight leading-none">{productName}</h2>
                    <p className="text-lg font-medium opacity-80 leading-relaxed">{summary}</p>
                </div>
                
                <div className="flex flex-col items-center justify-center p-8 bg-white/50 rounded-[24px] border border-white/80 shadow-sm min-w-[200px]">
                    <span className="overline opacity-40 mb-2">Risk Index</span>
                    <span className={cn(
                        "text-7xl font-bold tracking-tighter",
                        riskScore > 75 ? "text-destructive" : riskScore > 50 ? "text-secondary" : "text-primary"
                    )}>
                        {riskScore}%
                    </span>
                    <span className="overline text-primary mt-2">Verified</span>
                </div>
            </div>

            {/* NUTRIENT MATRIX */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-panel p-10 space-y-10">
                    <div className="flex items-center gap-3">
                        <Activity className="size-5 text-primary" />
                        <span className="overline">Clinical Nutrients</span>
                    </div>
                    <div className="space-y-8">
                        {nutrients.map((n: any) => (
                            <div key={n.name} className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="overline">{n.name}</span>
                                    <span className="overline opacity-40">{n.value} · {n.percentage}%</span>
                                </div>
                                <Progress 
                                    value={animatedPercentages[n.name] || 0} 
                                    className="h-2 bg-black/5" 
                                    indicatorClassName={cn(
                                        "transition-all duration-1000",
                                        n.level === 'high' ? "bg-destructive" : n.level === 'moderate' ? "bg-secondary" : "bg-primary"
                                    )}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-panel p-10 flex flex-col justify-between">
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <Target className="size-5 text-secondary" />
                            <span className="overline">Processing Data</span>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <span className="overline opacity-40">NOVA Score</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold">{novaScore}</span>
                                    <span className="text-sm opacity-20">/ 4</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <span className="overline opacity-40">Nutri-Score</span>
                                <div className="size-12 rounded-lg bg-primary text-white flex items-center justify-center text-2xl font-bold">
                                    {nutriScore}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="pt-8 mt-8 border-t border-black/5 flex items-center gap-4 text-primary opacity-60">
                        <ShieldCheck size={20} />
                        <span className="overline">FDA + WHO DATABASE MATCH</span>
                    </div>
                </div>
            </div>

            {/* PERSONALIZED TIP */}
            {tip && (
                <div className="glass-panel p-12 bg-primary/5 border-primary/20 space-y-6">
                    <div className="flex items-center gap-3 text-primary">
                        <Lightbulb size={24} />
                        <span className="overline">Biometric Safety Tip</span>
                    </div>
                    <p className="text-2xl font-medium leading-tight tracking-tight">{tip}</p>
                </div>
            )}

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                    onClick={handleSaveToHistory}
                    disabled={isSaving || isSaved}
                    className={cn(
                        "flex-1 h-16 rounded-[16px] overline transition-all",
                        isSaved ? "bg-primary/10 text-primary border border-primary/20" : "primary-btn"
                    )}
                >
                    {isSaving ? "Syncing..." : isSaved ? "Vault Logged" : "Commit to Vault"}
                    {isSaved ? <CheckCircle className="ml-3 size-5" /> : <DatabaseBackup className="ml-3 size-5" />}
                </Button>
                <Button variant="outline" className="h-16 w-16 rounded-[16px] border-white/80 bg-white/50 backdrop-blur-md flex items-center justify-center">
                    <Share2 size={24} />
                </Button>
            </div>
        </div>
    );
}