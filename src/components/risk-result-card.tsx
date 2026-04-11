'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ShieldCheck, Activity, DatabaseBackup, CheckCircle, Lightbulb, Share2 } from 'lucide-react';
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

    const { productName, ingredients, analysis, tip } = state;
    const { riskScore, isSafe, summary, novaScore, nutriScore, nutrients } = analysis;

    const handleSaveToHistory = () => {
        if (!user || !firestore) return;
        setIsSaving(true);
        addDocumentNonBlocking(collection(firestore, 'users', user.uid, 'scans'), {
            productName, ingredients, riskScore, isSafe, summary, novaScore, nutriScore, timestamp: serverTimestamp()
        });
        setTimeout(() => { 
            setIsSaving(false); 
            setIsSaved(true); 
            toast({ title: "Audit Saved", description: "Record added to your medical vault." }); 
        }, 800);
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 page-fade-in text-left pb-32">
            
            {/* PRODUCT SUMMARY CARD */}
            <div className="medical-card overflow-hidden">
                <div className="p-8 md:p-12 flex flex-col md:flex-row justify-between gap-12 items-start">
                    <div className="space-y-6 flex-1">
                        <div className="flex items-center gap-3">
                            <Badge className={cn("px-4 py-1 text-[10px] font-bold uppercase rounded-md", isSafe ? "badge-safe" : "badge-alert")}>
                                {isSafe ? "Safe for consumption" : "High clinical risk"}
                            </Badge>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Clinical Audit</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight uppercase leading-[1.1]">{productName}</h2>
                        <p className="text-lg leading-relaxed font-medium">{summary}</p>
                    </div>
                    
                    <div className="flex flex-col items-center gap-2 p-8 bg-background rounded-3xl min-w-[180px] border border-border/50">
                        <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Risk Score</span>
                        <span className={cn("text-6xl font-bold", riskScore > 70 ? "text-destructive" : riskScore > 30 ? "text-secondary" : "text-primary")}>
                            {riskScore}
                        </span>
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Protocol-v4</span>
                    </div>
                </div>

                <div className="bg-muted/30 border-t border-border p-8 flex flex-wrap gap-12 items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest mb-1">NOVA Class</span>
                            <div className="flex items-center gap-2">
                                <span className="text-3xl font-bold">{novaScore}</span>
                                <span className="text-xs font-medium text-muted-foreground">/ 4</span>
                            </div>
                        </div>
                        <div className="h-10 w-px bg-border" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest mb-1">Nutri-Score</span>
                            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-white text-xl font-bold">
                                {nutriScore}
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-primary/70">
                        <ShieldCheck size={22} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Clinical Denial Verified</span>
                    </div>
                </div>
            </div>

            {/* NUTRIENT PROFILING */}
            <Card className="medical-card border-none shadow-none bg-white">
                <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-[11px] font-bold uppercase tracking-[0.3em] flex items-center gap-3 text-muted-foreground">
                        <Activity size={18} className="text-primary" />
                        Nutrient Profile Matrix
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-4 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                    {nutrients.map((n: any) => (
                        <div key={n.name} className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-foreground text-sm uppercase tracking-tight">{n.name}</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-muted-foreground">{n.value}</span>
                                    <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-full">{n.percentage}% DV</span>
                                </div>
                            </div>
                            <Progress 
                                value={animatedPercentages[n.name] || 0} 
                                className="h-2.5 bg-muted rounded-full overflow-hidden" 
                                indicatorClassName={cn(
                                    "transition-all duration-1000",
                                    n.level === 'high' ? "bg-destructive" : n.level === 'moderate' ? "bg-secondary" : "bg-primary"
                                )}
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* PERSONALIZED HEALTH TIP */}
            {tip && (
                <div className="medical-card p-10 bg-primary/5 border-primary/10 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <Lightbulb size={20} />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">Personalized Safety Tip</span>
                    </div>
                    <p className="text-2xl font-medium text-foreground leading-relaxed italic-no-more">{tip}</p>
                </div>
            )}

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <Button 
                    onClick={handleSaveToHistory}
                    disabled={isSaving || isSaved}
                    className={cn(
                        "flex-1 h-16 text-sm font-bold uppercase tracking-widest rounded-2xl transition-all shadow-md",
                        isSaved ? "bg-[#E8F5E9] text-[#2E7D32] hover:bg-[#E8F5E9] border border-[#2E7D32]/20" : "primary-btn"
                    )}
                >
                    {isSaving ? "Syncing to vault..." : isSaved ? "Saved to history" : "Commit Audit to Vault"}
                    {isSaved ? <CheckCircle className="ml-3 size-5" /> : <DatabaseBackup className="ml-3 size-5" />}
                </Button>
                <Button variant="outline" className="h-16 w-16 md:w-20 border-border rounded-2xl hover:bg-white hover:border-primary/30 transition-all flex items-center justify-center">
                    <Share2 size={24} className="text-muted-foreground" />
                </Button>
            </div>
        </div>
    );
}