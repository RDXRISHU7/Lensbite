'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ShieldCheck, Biohazard, TriangleAlert, Activity, DatabaseBackup, CheckCircle, Fingerprint, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { useUser, useFirestore, addDocumentNonBlocking } from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import type { FormState } from '@/app/scanner/barcode/action';

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
    const { riskScore, isSafe, summary, novaScore, nutriScore, nutrients, detectedAllergens } = analysis;

    const handleSaveToHistory = () => {
        if (!user || !firestore) return;
        setIsSaving(true);
        addDocumentNonBlocking(collection(firestore, 'users', user.uid, 'scans'), {
            productName, ingredients, riskScore, isSafe, summary, novaScore, nutriScore, timestamp: serverTimestamp()
        });
        setTimeout(() => { setIsSaving(false); setIsSaved(true); toast({ title: "Analysis Secured", description: "Added to Vault." }); }, 1000);
    };

    return (
        <div className="w-full space-y-6 md:space-y-10 animate-iris preserve-3d">
            {/* Header Hero */}
            <div className="flex items-center gap-6 p-6 rounded-[2.5rem] glass-panel border-primary/20">
                <div className={cn(
                    "size-20 rounded-[2rem] flex items-center justify-center text-white shadow-2xl transition-all border-2",
                    isSafe ? "bg-primary border-primary/20" : "bg-destructive border-destructive/20 animate-pulse"
                )}>
                    {isSafe ? <ShieldCheck className="size-10" /> : <Biohazard className="size-10" />}
                </div>
                <div className="flex-1 text-left">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">{productName}</h2>
                    <div className="flex items-center gap-3 mt-2">
                        <Badge variant="outline" className="border-primary/30 text-primary text-[8px] font-black tracking-widest uppercase bg-primary/5">Intelligence Match</Badge>
                        <span className="text-[8px] font-black opacity-20 uppercase tracking-widest">Confidence: {(100 - riskScore)}%</span>
                    </div>
                </div>
            </div>

            {/* Main Stats 3D */}
            <div className="grid grid-cols-2 gap-4 md:gap-8">
                <div className="p-8 rounded-[2.5rem] glass-panel flex flex-col items-center justify-center text-center space-y-2 hover:bg-primary/5 transition-all">
                    <span className="text-[8px] font-black uppercase tracking-[0.4em] opacity-40">Processing</span>
                    <div className="text-6xl md:text-8xl font-black tracking-tighter text-primary leading-none">{novaScore}</div>
                    <p className="text-[10px] font-black uppercase opacity-60 tracking-widest leading-none">NOVA Score</p>
                </div>
                <div className="p-8 rounded-[2.5rem] glass-panel flex flex-col items-center justify-center text-center space-y-2 hover:bg-primary/5 transition-all">
                    <span className="text-[8px] font-black uppercase tracking-[0.4em] opacity-40">Quality Grade</span>
                    <div className={cn(
                        "text-6xl md:text-8xl font-black tracking-tighter leading-none",
                        nutriScore === 'A' ? 'text-green-500' : nutriScore === 'B' ? 'text-primary' : 'text-yellow-600'
                    )}>
                        {nutriScore}
                    </div>
                    <p className="text-[10px] font-black uppercase opacity-60 tracking-widest leading-none">Nutri-Score</p>
                </div>
            </div>

            {/* Nutrients Architecture */}
            <Card className="rounded-[3rem] glass-panel border-white/5 shadow-2xl overflow-hidden">
                <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Clinical Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-6">
                    {nutrients.map((n: any) => (
                        <div key={n.name} className="space-y-2">
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                <span>{n.name}</span>
                                <span className={n.percentage > 100 ? "text-destructive" : "text-primary"}>{n.percentage}%</span>
                            </div>
                            <Progress 
                                value={animatedPercentages[n.name] || 0} 
                                className="h-2 bg-white/5 rounded-full overflow-hidden" 
                                indicatorClassName={cn("transition-all duration-1000", n.name.toLowerCase() === 'sugar' ? 'bg-destructive' : 'bg-primary')}
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Action Summary */}
            <div className="p-10 rounded-[3.5rem] glass-panel space-y-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform pointer-events-none">
                    <Fingerprint className="size-48" />
                </div>
                <div className="flex items-center gap-4 relative z-10">
                    <Activity className="size-6 text-primary" />
                    <h3 className="text-2xl font-black tracking-tighter uppercase">Intelligence Output</h3>
                </div>
                <p className="text-muted-foreground text-lg font-medium leading-relaxed text-left relative z-10">{summary}</p>
                {tip && (
                    <div className="pt-6 border-t border-white/10 flex items-start gap-4">
                        <Lightbulb className="size-6 text-primary shrink-0" />
                        <p className="text-sm font-black uppercase leading-tight tracking-tight text-primary">{tip}</p>
                    </div>
                )}
            </div>

            {/* Persistent Secure Button */}
            <div className="pt-8 pb-32">
                <Button 
                    onClick={handleSaveToHistory}
                    disabled={isSaving || isSaved}
                    className={cn(
                        "w-full h-24 rounded-[2.5rem] text-2xl font-black uppercase tracking-tighter transition-all shadow-3xl",
                        isSaved ? "bg-green-500 text-white" : "bg-primary text-background hover:scale-[1.02]"
                    )}
                >
                    {isSaving ? <Activity className="mr-3 animate-spin" /> : isSaved ? <CheckCircle className="mr-3" /> : <DatabaseBackup className="mr-3" />}
                    {isSaving ? "Syncing..." : isSaved ? "Secured" : "Secure to Vault"}
                </Button>
            </div>
        </div>
    );
}
