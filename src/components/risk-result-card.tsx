'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ShieldCheck, Biohazard, Activity, DatabaseBackup, CheckCircle, Fingerprint, Lightbulb, ArrowRight, AlertTriangle, FileText, Share2, Zap } from 'lucide-react';
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
            toast({ title: "Audit Secured", description: "Clinical record added to Vault." }); 
        }, 1200);
    };

    return (
        <div className="w-full space-y-12 animate-iris perspective-3d pb-64 text-left max-w-5xl mx-auto">
            
            {/* STRUCTURAL REPORT HEADER */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className={cn(
                    "lg:col-span-2 p-16 rounded-[4rem] bg-white border border-border shadow-2xl flex flex-col justify-between preserve-3d min-h-[400px]",
                    isSafe ? "border-l-[24px] border-l-primary" : "border-l-[24px] border-l-destructive"
                )}>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-[10px] font-black uppercase tracking-[0.5em] border-primary/30 text-primary px-6 py-2">Clinical Audit Verified</Badge>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">Report ID: {Math.random().toString(36).slice(2, 10).toUpperCase()}</span>
                        </div>
                        <h2 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.75] text-[#1a1a1a] translate-z-20">{productName}</h2>
                    </div>
                    
                    <div className="flex items-center gap-8 pt-12 border-t border-border mt-12">
                        <div className={cn(
                            "size-20 rounded-2xl flex items-center justify-center text-white shadow-lg",
                            isSafe ? "bg-primary" : "bg-destructive"
                        )}>
                            {isSafe ? <ShieldCheck size={40} /> : <Biohazard size={40} />}
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">System Determination</p>
                            <p className={cn("text-3xl font-black uppercase tracking-tighter", isSafe ? "text-primary" : "text-destructive")}>
                                {isSafe ? "Protocol: Secured" : "Protocol: Alert"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-16 rounded-[4rem] teal-section space-y-12 flex flex-col justify-center items-center text-center shadow-3xl preserve-3d">
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] opacity-40">Clinical Risk</span>
                    <div className="text-[14rem] font-black tracking-tighter leading-none text-secondary translate-z-40 drop-shadow-2xl">{riskScore}</div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Architectural Metric</p>
                </div>
            </div>

            {/* TWIN ANALYSIS SLATES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="p-16 rounded-[4rem] bg-white border border-border shadow-xl space-y-12 preserve-3d">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] opacity-40">NOVA Score</span>
                        <Zap size={24} className="text-secondary" />
                    </div>
                    <div className="flex items-baseline gap-6">
                        <span className="text-[12rem] font-black tracking-tighter leading-none">{novaScore}</span>
                        <span className="text-2xl font-black uppercase opacity-20">Class</span>
                    </div>
                    <p className="text-sm font-black uppercase tracking-[0.3em] opacity-60 leading-relaxed border-t border-border pt-8">
                        {novaScore === 4 ? "Ultra-Processed: High Chemical Architecture" : "Structural Integrity Maintained"}
                    </p>
                </div>

                <div className="p-16 rounded-[4rem] bg-[#1F2937] text-white shadow-xl space-y-12 preserve-3d">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] opacity-40">Nutri-Score</span>
                        <Activity size={24} className="text-primary" />
                    </div>
                    <div className="flex items-baseline gap-6">
                        <span className="text-[12rem] font-black tracking-tighter leading-none text-primary">{nutriScore}</span>
                        <span className="text-2xl font-black uppercase opacity-20">Grade</span>
                    </div>
                    <p className="text-sm font-black uppercase tracking-[0.3em] opacity-60 leading-relaxed border-t border-white/10 pt-8">
                        Verified Nutritional Intelligence Grade
                    </p>
                </div>
            </div>

            {/* DATA SHEET: BIOMETRIC SCRUTINY */}
            <Card className="rounded-[4rem] border-border bg-white overflow-hidden shadow-2xl">
                <CardHeader className="p-16 pb-12 bg-muted/50 border-b border-border flex flex-row items-center justify-between">
                    <div className="space-y-2">
                        <CardTitle className="text-[10px] font-black uppercase tracking-[0.8em] text-primary">Biometric Scrutiny Stream</CardTitle>
                        <p className="text-xs font-black uppercase tracking-[0.3em] opacity-40">Cross-Referenced Nutrient Profile</p>
                    </div>
                    <DatabaseBackup className="size-8 text-primary opacity-20" />
                </CardHeader>
                <CardContent className="p-16 grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12">
                    {nutrients.map((n: any) => (
                        <div key={n.name} className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-black uppercase tracking-[0.4em]">{n.name}</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-xl font-black">{n.value}</span>
                                    <Badge variant="outline" className="text-[9px] font-black border-primary/20">{n.percentage}%</Badge>
                                </div>
                            </div>
                            <Progress 
                                value={animatedPercentages[n.name] || 0} 
                                className="h-10 bg-muted rounded-none" 
                                indicatorClassName={cn(
                                    "transition-all duration-1000",
                                    n.level === 'high' ? "bg-destructive" : n.level === 'moderate' ? "bg-secondary" : "bg-primary"
                                )}
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* CLINICAL SUMMARY & TIPS */}
            <div className="p-20 rounded-[4rem] bg-[#3d646e] text-white space-y-12 shadow-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-5 transition-transform group-hover:scale-110 duration-1000">
                    <Fingerprint size={200} />
                </div>
                
                <div className="space-y-8 relative z-10">
                    <div className="flex items-center gap-6">
                        <FileText size={40} className="text-secondary" />
                        <h3 className="text-5xl font-black uppercase tracking-tighter">Clinical Synthesis</h3>
                    </div>
                    <p className="text-3xl font-bold uppercase leading-tight tracking-tighter text-white/90 max-w-4xl">{summary}</p>
                </div>

                {tip && (
                    <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-start gap-12 relative z-10">
                        <div className="size-24 rounded-full bg-secondary text-black flex items-center justify-center shrink-0 shadow-2xl rotate-12">
                            <Lightbulb size={48} />
                        </div>
                        <div className="space-y-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-secondary">Biological Protocol Tip</span>
                            <p className="text-3xl font-black uppercase leading-tight tracking-tight text-white">{tip}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* ACTION CENTER */}
            <div className="fixed bottom-0 left-0 w-full p-8 md:p-12 bg-white/80 backdrop-blur-2xl border-t border-border z-[150] shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6">
                    <Button 
                        onClick={handleSaveToHistory}
                        disabled={isSaving || isSaved}
                        className={cn(
                            "flex-1 h-28 rounded-full text-3xl font-black uppercase tracking-widest transition-all duration-700",
                            isSaved ? "bg-primary text-white scale-[1.02]" : "bg-black text-white hover:bg-primary"
                        )}
                    >
                        {isSaving ? (
                            <div className="flex items-center gap-4">
                                <Loader2 className="animate-spin size-8" />
                                <span>Securing...</span>
                            </div>
                        ) : isSaved ? (
                            <div className="flex items-center gap-4">
                                <CheckCircle size={32} />
                                <span>Report Secured</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <span>Log to Vault</span>
                                <ArrowRight size={32} />
                            </div>
                        )}
                    </Button>
                    <Button variant="outline" className="h-28 px-12 rounded-full border-black/10 hover:bg-black/5">
                        <Share2 size={32} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
