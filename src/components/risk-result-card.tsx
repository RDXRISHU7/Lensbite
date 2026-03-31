'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ShieldCheck, Biohazard, Activity, DatabaseBackup, CheckCircle, Fingerprint, Lightbulb, ArrowRight } from 'lucide-react';
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
        setTimeout(() => { setIsSaving(false); setIsSaved(true); toast({ title: "Analysis Secured", description: "Added to Vault." }); }, 1000);
    };

    return (
        <div className="w-full space-y-8 animate-iris perspective-3d">
            {/* Clinical Header */}
            <div className="flex items-center gap-8 p-8 rounded-[2.5rem] glass-panel bg-white/[0.02]">
                <div className={cn(
                    "size-24 rounded-[2rem] flex items-center justify-center text-black shadow-2xl transition-all",
                    isSafe ? "bg-white" : "bg-destructive text-white"
                )}>
                    {isSafe ? <ShieldCheck className="size-12" /> : <Biohazard className="size-12" />}
                </div>
                <div className="flex-1 text-left">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">{productName}</h2>
                    <div className="flex items-center gap-4 mt-3">
                        <Badge variant="outline" className="border-white/20 text-white text-[10px] font-bold tracking-widest uppercase bg-white/5">Verified Report</Badge>
                        <span className="text-[10px] font-bold opacity-30 uppercase tracking-widest">Integrity Check: Pass</span>
                    </div>
                </div>
            </div>

            {/* Metrics Architecture */}
            <div className="grid grid-cols-2 gap-6">
                <div className="p-10 rounded-[3rem] glass-panel flex flex-col items-center justify-center text-center space-y-3 bg-white/[0.01]">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30">Classification</span>
                    <div className="text-7xl md:text-9xl font-black tracking-tighter text-white leading-none">{novaScore}</div>
                    <p className="text-xs font-bold uppercase opacity-60 tracking-[0.2em]">NOVA Grade</p>
                </div>
                <div className="p-10 rounded-[3rem] glass-panel flex flex-col items-center justify-center text-center space-y-3 bg-white/[0.01]">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30">Nutritional ID</span>
                    <div className={cn(
                        "text-7xl md:text-9xl font-black tracking-tighter leading-none",
                        nutriScore === 'A' ? 'text-accent' : nutriScore === 'B' ? 'text-primary' : 'text-yellow-600'
                    )}>
                        {nutriScore}
                    </div>
                    <p className="text-xs font-bold uppercase opacity-60 tracking-[0.2em]">Nutri-Score</p>
                </div>
            </div>

            {/* Analysis Data Sheet */}
            <Card className="rounded-[3.5rem] glass-panel border-white/5 bg-white/[0.01] overflow-hidden">
                <CardHeader className="p-10 pb-6 border-b border-white/5">
                    <CardTitle className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-40">Clinical Nutrient Profiling</CardTitle>
                </CardHeader>
                <CardContent className="p-10 space-y-8">
                    {nutrients.map((n: any) => (
                        <div key={n.name} className="space-y-3">
                            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
                                <span>{n.name}</span>
                                <span className={n.percentage > 100 ? "text-destructive" : "text-primary"}>{n.percentage}%</span>
                            </div>
                            <Progress 
                                value={animatedPercentages[n.name] || 0} 
                                className="h-3 bg-white/5 rounded-full overflow-hidden" 
                                indicatorClassName={cn("transition-all duration-1000 bg-white")}
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Intelligence Output */}
            <div className="p-12 rounded-[4rem] glass-panel bg-white/[0.02] space-y-8">
                <div className="flex items-center gap-5">
                    <Activity className="size-8 text-primary" />
                    <h3 className="text-3xl font-black tracking-tighter uppercase">Executive Summary</h3>
                </div>
                <p className="text-white/70 text-xl font-medium leading-relaxed text-left">{summary}</p>
                {tip && (
                    <div className="pt-8 border-t border-white/10 flex items-start gap-6">
                        <Lightbulb className="size-8 text-primary shrink-0" />
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Precision Recommendation</p>
                          <p className="text-lg font-bold uppercase leading-tight text-white">{tip}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Action Secure */}
            <div className="pt-8 pb-32">
                <Button 
                    onClick={handleSaveToHistory}
                    disabled={isSaving || isSaved}
                    className={cn(
                        "w-full h-24 rounded-[2.5rem] text-2xl font-black uppercase tracking-tighter transition-all",
                        isSaved ? "bg-accent text-white" : "bg-white text-black hover:scale-[1.02]"
                    )}
                >
                    {isSaving ? <Activity className="mr-4 animate-spin" /> : isSaved ? <CheckCircle className="mr-4" /> : <DatabaseBackup className="mr-4" />}
                    {isSaving ? "Synchronizing..." : isSaved ? "Report Secured" : "Secure Analysis to Vault"}
                </Button>
            </div>
        </div>
    );
}