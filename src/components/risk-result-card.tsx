'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ShieldCheck, Biohazard, Activity, DatabaseBackup, CheckCircle, Fingerprint, Lightbulb, ArrowRight, AlertTriangle } from 'lucide-react';
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
        setTimeout(() => { setIsSaving(false); setIsSaved(true); toast({ title: "Audit Secured", description: "Verification added to Vault." }); }, 1000);
    };

    return (
        <div className="w-full space-y-8 animate-iris perspective-3d pb-40">
            {/* Clinical Header */}
            <div className="flex items-center gap-8 p-10 rounded-[3rem] glass-panel bg-white/80 border-primary/20 shadow-xl">
                <div className={cn(
                    "size-28 rounded-[2.5rem] flex items-center justify-center transition-all shadow-lg",
                    isSafe ? "bg-primary text-white" : riskScore > 70 ? "bg-destructive text-white" : "bg-[#F4C542] text-white"
                )}>
                    {isSafe ? <ShieldCheck className="size-14" /> : riskScore > 70 ? <Biohazard className="size-14" /> : <AlertTriangle className="size-14" />}
                </div>
                <div className="flex-1 text-left">
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85] text-foreground">{productName}</h2>
                    <div className="flex items-center gap-4 mt-4">
                        <Badge className="bg-primary/10 text-primary border-none text-[10px] font-black tracking-widest uppercase px-3 py-1">Verified Protocol</Badge>
                        <span className="text-[10px] font-black opacity-40 uppercase tracking-[0.4em]">Audit: Alpha-Secure</span>
                    </div>
                </div>
            </div>

            {/* Metrics Architecture */}
            <div className="grid grid-cols-2 gap-6">
                <div className="p-12 rounded-[3.5rem] glass-panel flex flex-col items-center justify-center text-center space-y-4 bg-white shadow-lg border-primary/5">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Classification</span>
                    <div className="text-8xl md:text-[10rem] font-black tracking-tighter text-foreground leading-none">{novaScore}</div>
                    <p className="text-xs font-black uppercase opacity-80 tracking-[0.3em] text-primary">NOVA Protocol</p>
                </div>
                <div className="p-12 rounded-[3.5rem] glass-panel flex flex-col items-center justify-center text-center space-y-4 bg-white shadow-lg border-accent/5">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Nutritional ID</span>
                    <div className={cn(
                        "text-8xl md:text-[10rem] font-black tracking-tighter leading-none",
                        nutriScore === 'A' ? 'text-primary' : nutriScore === 'B' ? 'text-primary/70' : 'text-accent'
                    )}>
                        {nutriScore}
                    </div>
                    <p className="text-xs font-black uppercase opacity-80 tracking-[0.3em] text-accent">Nutri-Score</p>
                </div>
            </div>

            {/* Analysis Data Sheet */}
            <Card className="rounded-[4rem] glass-panel bg-white border-primary/10 overflow-hidden shadow-xl">
                <CardHeader className="p-12 pb-8 border-b border-primary/5">
                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.6em] opacity-60 text-primary">Clinical Nutrient Profiling</CardTitle>
                </CardHeader>
                <CardContent className="p-12 space-y-10">
                    {nutrients.map((n: any) => (
                        <div key={n.name} className="space-y-4">
                            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.3em]">
                                <span className="text-foreground/80">{n.name}</span>
                                <span className={n.percentage > 100 ? "text-accent" : "text-primary"}>{n.percentage}%</span>
                            </div>
                            <Progress 
                                value={animatedPercentages[n.name] || 0} 
                                className="h-4 bg-muted rounded-full overflow-hidden" 
                                indicatorClassName={cn("transition-all duration-1000", n.percentage > 100 ? "bg-accent" : "bg-primary")}
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Intelligence Output */}
            <div className="p-14 rounded-[4.5rem] glass-panel bg-white border-primary/10 space-y-10 shadow-xl">
                <div className="flex items-center gap-6">
                    <Activity className="size-10 text-primary" />
                    <h3 className="text-4xl font-black tracking-tighter uppercase text-foreground">Scrutiny Report</h3>
                </div>
                <p className="text-foreground text-2xl font-bold leading-tight text-left uppercase tracking-tighter">{summary}</p>
                {tip && (
                    <div className="pt-10 border-t border-primary/5 flex items-start gap-8">
                        <div className="size-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                            <Lightbulb size={24} />
                        </div>
                        <div className="space-y-2 text-left">
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 text-accent">Biometric Recommendation</p>
                          <p className="text-xl font-black uppercase leading-tight text-foreground tracking-tight">{tip}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Action Secure */}
            <div className="pt-10">
                <Button 
                    onClick={handleSaveToHistory}
                    disabled={isSaving || isSaved}
                    className={cn(
                        "w-full h-28 rounded-[3rem] text-3xl font-black uppercase tracking-tighter transition-all border-b-8 active:border-b-0",
                        isSaved ? "bg-primary text-white border-[#1B5E20]" : "bg-accent text-white hover:scale-[1.02] border-orange-700/20"
                    )}
                >
                    {isSaving ? <Activity className="mr-6 animate-spin" /> : isSaved ? <CheckCircle className="mr-6" /> : <DatabaseBackup className="mr-6" />}
                    {isSaving ? "Synchronizing..." : isSaved ? "Report Secured" : "Secure to Vault"}
                </Button>
            </div>
        </div>
    );
}