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
        <div className="w-full space-y-8 animate-iris perspective-3d pb-40 text-left">
            {/* Architectural Header */}
            <div className="flex flex-col md:flex-row items-center gap-12 p-12 rounded-[2.5rem] bg-white border border-border shadow-2xl">
                <div className={cn(
                    "size-40 rounded-full flex items-center justify-center transition-all shadow-xl border-[10px] border-muted",
                    isSafe ? "bg-primary text-white" : "bg-destructive text-white"
                )}>
                    {isSafe ? <ShieldCheck className="size-20" /> : <Biohazard className="size-20" />}
                </div>
                <div className="flex-1 space-y-4">
                    <Badge variant="outline" className="text-[10px] font-black uppercase tracking-[0.4em] border-primary text-primary px-4 py-1">Verified Audit</Badge>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8] text-[#1a1a1a]">{productName}</h2>
                </div>
            </div>

            {/* Metric Slates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-12 rounded-[2.5rem] teal-section space-y-4 preserve-3d shadow-2xl">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Classification</span>
                    <div className="text-[12rem] font-black tracking-tighter leading-none text-secondary translate-z-20">{novaScore}</div>
                    <p className="text-xs font-black uppercase tracking-[0.3em] opacity-80">NOVA System Protocol</p>
                </div>
                <div className="p-12 rounded-[2.5rem] bg-white border border-border space-y-4 shadow-2xl">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Nutritional ID</span>
                    <div className="text-[12rem] font-black tracking-tighter leading-none text-primary translate-z-20">{nutriScore}</div>
                    <p className="text-xs font-black uppercase tracking-[0.3em] opacity-80">Nutri-Score Analysis</p>
                </div>
            </div>

            {/* Analysis Sheet */}
            <Card className="rounded-[2.5rem] border-border bg-white overflow-hidden shadow-2xl">
                <CardHeader className="p-12 pb-8 bg-muted/50 border-b border-border">
                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.6em] opacity-60 text-primary">Biometric Scrutiny Data</CardTitle>
                </CardHeader>
                <CardContent className="p-12 space-y-12">
                    {nutrients.map((n: any) => (
                        <div key={n.name} className="space-y-4">
                            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.3em]">
                                <span>{n.name}</span>
                                <span className="text-primary">{n.percentage}%</span>
                            </div>
                            <Progress 
                                value={animatedPercentages[n.name] || 0} 
                                className="h-6 bg-muted rounded-none" 
                                indicatorClassName="bg-primary transition-all duration-1000"
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Intelligence Tips */}
            <div className="p-16 rounded-[2.5rem] teal-section space-y-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Fingerprint size={120} />
                </div>
                <div className="flex items-center gap-6">
                    <Activity size={32} className="text-secondary" />
                    <h3 className="text-4xl font-black uppercase tracking-tighter">Clinical Summary</h3>
                </div>
                <p className="text-2xl font-bold uppercase leading-tight tracking-tighter">{summary}</p>
                {tip && (
                    <div className="pt-8 border-t border-white/10 flex items-start gap-8">
                        <div className="size-16 rounded-full bg-secondary text-black flex items-center justify-center shrink-0 shadow-lg">
                            <Lightbulb size={32} />
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">System Recommendation</p>
                          <p className="text-2xl font-black uppercase leading-tight tracking-tight text-secondary">{tip}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Action Bar */}
            <div className="fixed bottom-0 left-0 w-full p-6 md:p-12 bg-white/80 backdrop-blur-xl border-t border-border z-50">
                <Button 
                    onClick={handleSaveToHistory}
                    disabled={isSaving || isSaved}
                    className={cn(
                        "w-full h-24 rounded-full text-2xl font-black uppercase tracking-widest transition-all",
                        isSaved ? "bg-primary text-white" : "bg-black text-white hover:scale-[1.02]"
                    )}
                >
                    {isSaving ? "Syncing..." : isSaved ? "Report Secured" : "Log to Vault"}
                    {isSaved ? <CheckCircle className="ml-4" /> : <ArrowRight className="ml-4" />}
                </Button>
            </div>
        </div>
    );
}
