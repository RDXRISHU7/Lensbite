'use client';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { FormState as BarcodeFormState } from '@/app/scanner/barcode/action';
import type { FormState as FoodFormState } from '@/app/scanner/food/action';
import { CircleAlert, ShieldCheck, Lightbulb, Leaf, DropletOff, Biohazard, HeartPulse, Fingerprint, DatabaseBackup, TriangleAlert, Zap, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { useUser, useFirestore, addDocumentNonBlocking } from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

type RiskResultCardProps = {
    state: FoodFormState | BarcodeFormState;
}

const getNutrientColor = (name: string, percentage: number) => {
  const n = name.toLowerCase();
  if (n === 'sugar' || percentage > 100) return 'bg-destructive';
  if (n === 'calories') return 'bg-orange-500';
  if (n === 'protein') return 'bg-primary';
  if (n === 'carbs') return 'bg-blue-500';
  if (n === 'sodium') return 'bg-primary';
  return 'bg-secondary';
};

const getNutrientTextClass = (name: string, percentage: number) => {
  if (name.toLowerCase() === 'sugar' || percentage > 100) return 'text-destructive';
  return 'text-foreground';
};

export function RiskResultCard({ state }: RiskResultCardProps) {
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
                state.analysis?.nutrients.forEach(n => {
                    newPercentages[n.name] = n.percentage;
                });
                setAnimatedPercentages(newPercentages);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [state]);

    if (state.type !== 'success' || !state.analysis) {
        return null;
    }

    const { productName, ingredients, analysis, tip } = state;
    const { 
        riskScore, 
        summary, 
        isSafe, 
        carcinogens, 
        novaScore, 
        nutriScore, 
        nutrients, 
        dietaryFlags,
        detectedAllergens 
    } = analysis;

    const handleSaveToHistory = () => {
        if (!user || !firestore) return;
        setIsSaving(true);

        const scansRef = collection(firestore, 'users', user.uid, 'scans');
        addDocumentNonBlocking(scansRef, {
            productName,
            ingredients,
            riskScore,
            isSafe,
            summary,
            novaScore,
            nutriScore,
            timestamp: serverTimestamp(),
        });

        setTimeout(() => {
            setIsSaving(false);
            setIsSaved(true);
            toast({
                title: "Scan Secured",
                description: "This analysis has been added to your vault.",
            });
        }, 1000);
    };

    return (
        <div className="w-full space-y-8 animate-reveal preserve-3d">
            
            <div className="space-y-6">
                <div className="flex items-center gap-6">
                    <div className={cn(
                        "size-20 rounded-2xl flex items-center justify-center text-white shadow-2xl transition-all duration-700 border-2",
                        isSafe ? "bg-primary border-primary/20" : "bg-destructive border-destructive/20 animate-pulse"
                    )}>
                        {isSafe ? <ShieldCheck className="size-10" /> : <Biohazard className="size-10" />}
                    </div>
                    <div className="flex-1 text-left">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none uppercase">{productName}</h2>
                        <div className="flex items-center gap-4 mt-3">
                            <Badge variant="outline" className="border-primary/30 text-primary text-[10px] uppercase font-black tracking-[0.3em] bg-primary/5">INTELLIGENCE RESULT</Badge>
                            <span className="text-[10px] uppercase font-black opacity-20 tracking-[0.4em]">REF: 0x{Math.floor(Math.random()*1000).toString(16)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="p-10 rounded-[2.5rem] glass-panel flex flex-col items-center justify-center text-center space-y-4 hover:bg-primary/5 transition-all preserve-3d">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">PROCESSING</span>
                    <div className="text-7xl md:text-9xl font-black tracking-tighter text-primary leading-none">{novaScore}</div>
                    <p className="text-[10px] font-black uppercase opacity-60 tracking-widest leading-none">
                        {novaScore === 4 ? 'ULTRA' : novaScore === 3 ? 'MOD' : 'NATURAL'}
                    </p>
                </div>
                <div className="p-10 rounded-[2.5rem] glass-panel flex flex-col items-center justify-center text-center space-y-4 hover:bg-primary/5 transition-all preserve-3d">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">SAFETY GRADE</span>
                    <div className={cn(
                        "text-7xl md:text-9xl font-black tracking-tighter leading-none",
                        nutriScore === 'A' ? 'text-green-500' : nutriScore === 'B' ? 'text-primary' : 'text-yellow-600'
                    )}>
                        {nutriScore}
                    </div>
                    <p className="text-[10px] font-black uppercase opacity-60 tracking-widest leading-none">NUTRI-SCORE</p>
                </div>
            </div>

            {detectedAllergens.length > 0 && (
                <div className="p-10 rounded-[3rem] bg-destructive text-white shadow-3xl flex items-center gap-8 animate-pulse">
                    <div className="size-16 rounded-2xl bg-white/20 flex items-center justify-center border border-white/10 shrink-0">
                        <CircleAlert className="size-8" />
                    </div>
                    <div className="text-left">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">HEALTH WARNING</p>
                        <p className="text-2xl font-black leading-tight uppercase tracking-tighter">{detectedAllergens.join(', ')}</p>
                    </div>
                </div>
            )}

            <Card className="rounded-[3rem] bg-card/40 backdrop-blur-xl border-white/5 shadow-2xl overflow-hidden preserve-3d">
                <CardHeader className="p-10 pb-4">
                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.6em] opacity-40">NUTRITIONAL ARCHITECTURE</CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-0 space-y-8">
                    {nutrients.map((n) => (
                        <div key={n.name} className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className={cn(
                                    "text-xl font-black tracking-tighter uppercase",
                                    getNutrientTextClass(n.name, n.percentage)
                                )}>
                                    {n.name}
                                </span>
                                <div className="flex items-center gap-3">
                                    <span className={cn(
                                        "font-black tracking-tight text-xl",
                                        getNutrientTextClass(n.name, n.percentage)
                                    )}>
                                        {n.percentage}%
                                    </span>
                                    {n.percentage > 100 && (
                                        <TriangleAlert className="size-5 text-destructive animate-bounce" />
                                    )}
                                </div>
                            </div>
                            <Progress 
                                value={animatedPercentages[n.name] || 0} 
                                className="h-3 bg-secondary/30 rounded-full overflow-hidden" 
                                indicatorClassName={cn("transition-all duration-1000 ease-out", getNutrientColor(n.name, n.percentage))}
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-4">
                <div className={cn("p-8 rounded-[2rem] glass-panel border flex flex-col items-center gap-4 transition-all duration-500", dietaryFlags.isVegan ? "border-green-500/30 bg-green-500/5 text-green-500" : "opacity-20 border-white/5")}>
                    <Leaf className="size-8" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-center">VEGAN</span>
                </div>
                <div className={cn("p-8 rounded-[2rem] glass-panel border flex flex-col items-center gap-4 transition-all duration-500", dietaryFlags.isVegetarian ? "border-primary/30 bg-primary/5 text-primary" : "opacity-20 border-white/5")}>
                    <Zap className="size-8" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-center">VEG</span>
                </div>
                <div className={cn("p-8 rounded-[2rem] glass-panel border flex flex-col items-center gap-4 transition-all duration-500", dietaryFlags.palmOilFree ? "border-accent/30 bg-accent/5 text-accent" : "opacity-20 border-white/5")}>
                    <DropletOff className="size-8" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-center">PALM-FREE</span>
                </div>
            </div>

            <div className="p-12 rounded-[3.5rem] glass-panel space-y-8 relative overflow-hidden group preserve-3d">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                    <Fingerprint className="size-48" />
                </div>
                <div className="flex items-center gap-5 relative z-10">
                    <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                        <HeartPulse className="size-7" />
                    </div>
                    <h3 className="text-3xl font-black tracking-tighter uppercase">SAFETY STATUS</h3>
                </div>
                <p className="text-muted-foreground text-xl font-medium leading-relaxed text-left relative z-10">{summary}</p>
                {tip && (
                    <div className="pt-10 flex items-start gap-6 border-t border-white/5 relative z-10">
                        <div className="size-12 rounded-2xl bg-primary flex items-center justify-center shrink-0">
                           <Lightbulb className="size-6 text-background" />
                        </div>
                        <p className="text-lg font-black text-primary uppercase leading-tight tracking-tight">{tip}</p>
                    </div>
                )}
            </div>

            <div className="pt-12 pb-48">
                <Button 
                    size="icon" 
                    onClick={handleSaveToHistory}
                    disabled={isSaving || isSaved}
                    className={cn(
                        "w-full h-24 md:h-32 rounded-[2rem] md:rounded-[3.5rem] text-2xl md:text-4xl font-black uppercase tracking-tighter transition-all shadow-3xl group relative overflow-hidden",
                        isSaved ? "bg-green-500 text-white" : "bg-primary text-background hover:scale-[1.02] active:scale-[0.98]"
                    )}
                >
                    <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                    {isSaving ? <Fingerprint className="mr-4 size-10 animate-pulse" /> : isSaved ? <CheckCircle className="mr-4 size-10" /> : <DatabaseBackup className="mr-4 size-10" />}
                    {isSaving ? "SYNCING..." : isSaved ? "SECURED" : "SECURE TO VAULT"}
                </Button>
            </div>
        </div>
    );
}