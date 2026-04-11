'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ShieldCheck, Biohazard, Activity, DatabaseBackup, CheckCircle, Fingerprint, Lightbulb, ArrowRight, FileText, Share2 } from 'lucide-react';
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
            toast({ title: "Audit Saved", description: "Record added to your medical history." }); 
        }, 800);
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 page-fade-in text-left pb-32">
            
            {/* PRODUCT SUMMARY CARD */}
            <div className="medical-card overflow-hidden">
                <div className="p-8 md:p-12 flex flex-col md:flex-row justify-between gap-8 items-start">
                    <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-3">
                            <Badge className={cn("px-3 py-1 text-[10px] font-bold uppercase", isSafe ? "badge-safe" : "badge-alert")}>
                                {isSafe ? "Safe for consumption" : "High clinical risk"}
                            </Badge>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Clinical Audit</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">{productName}</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">{summary}</p>
                    </div>
                    
                    <div className="flex flex-col items-center gap-2 p-6 bg-muted/20 rounded-2xl min-w-[160px] border border-border">
                        <span className="text-[10px] font-bold uppercase text-muted-foreground">Clinical Risk</span>
                        <span className={cn("text-6xl font-bold", riskScore > 70 ? "text-destructive" : riskScore > 30 ? "text-secondary" : "text-primary")}>
                            {riskScore}
                        </span>
                        <span className="text-[8px] font-bold text-muted-foreground uppercase">Out of 100</span>
                    </div>
                </div>

                <div className="bg-muted/10 border-t border-border p-6 flex flex-wrap gap-8 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase text-muted-foreground">NOVA Class</span>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold">{novaScore}</span>
                                <span className="text-xs text-muted-foreground">/ 4</span>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-border" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase text-muted-foreground">Nutri-Score</span>
                            <Badge className="bg-primary text-white text-lg font-bold px-3 py-0 h-8">{nutriScore}</Badge>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-primary">
                        <ShieldCheck size={20} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Protocol Verified</span>
                    </div>
                </div>
            </div>

            {/* NUTRIENT PROFILING */}
            <Card className="medical-card">
                <CardHeader className="p-8 border-b border-border">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                        <Activity size={16} className="text-primary" />
                        Nutrient Profile Analysis
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {nutrients.map((n: any) => (
                        <div key={n.name} className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-bold text-foreground">{n.name}</span>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-muted-foreground">{n.value}</span>
                                    <span className="text-[10px] font-bold text-primary">{n.percentage}% DV</span>
                                </div>
                            </div>
                            <Progress 
                                value={animatedPercentages[n.name] || 0} 
                                className="h-2 bg-muted rounded-full" 
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
                <div className="medical-card p-8 bg-primary/5 border-primary/20 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <Lightbulb size={18} />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">Clinical Advice</span>
                    </div>
                    <p className="text-xl font-medium text-foreground leading-relaxed">{tip}</p>
                </div>
            )}

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                    onClick={handleSaveToHistory}
                    disabled={isSaving || isSaved}
                    className={cn(
                        "flex-1 h-14 text-base font-bold uppercase tracking-wider rounded-xl transition-all",
                        isSaved ? "badge-safe" : "primary-btn"
                    )}
                >
                    {isSaving ? "Saving to vault..." : isSaved ? "Saved to history" : "Save Analysis"}
                    {isSaved ? <CheckCircle className="ml-2 size-5" /> : <DatabaseBackup className="ml-2 size-5" />}
                </Button>
                <Button variant="outline" className="h-14 px-8 border-border rounded-xl">
                    <Share2 size={20} />
                </Button>
            </div>
        </div>
    );
}