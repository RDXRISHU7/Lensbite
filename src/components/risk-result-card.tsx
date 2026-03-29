'use client';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
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
                description: "This analysis has been added to your Health History.",
            });
        }, 1000);
    };

    return (
        <div className="w-full space-y-6 md:space-y-8 animate-reveal">
            
            {/* Analysis Header */}
            <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-4 md:gap-6">
                    <div className={cn(
                        "size-12 md:size-16 rounded-xl md:rounded-[1.25rem] flex items-center justify-center text-white shadow-2xl transition-all duration-700",
                        isSafe ? "bg-primary" : "bg-destructive animate-pulse"
                    )}>
                        {isSafe ? <ShieldCheck className="size-6 md:size-8" /> : <Biohazard className="size-6 md:size-8" />}
                    </div>
                    <div className="flex-1 text-left">
                        <h2 className="text-2xl md:text-5xl font-black font-headline tracking-tighter leading-none italic uppercase">{productName}</h2>
                        <div className="flex items-center gap-2 md:gap-3 mt-1 md:mt-2">
                            <Badge variant="outline" className="border-primary/20 text-primary text-[8px] md:text-[10px] uppercase font-black tracking-widest bg-primary/5">Intelligence Result</Badge>
                            <span className="text-[8px] md:text-[10px] uppercase font-black opacity-30 tracking-[0.3em]">REF: 0x{Math.floor(Math.random()*1000).toString(16)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scores */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] glass-panel flex flex-col items-center justify-center text-center space-y-2 md:space-y-4 group hover:bg-primary/5 transition-all">
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Processing</span>
                    <div className="text-5xl md:text-8xl font-black font-headline tracking-tighter text-primary italic leading-none">{novaScore}</div>
                    <p className="text-[8px] md:text-[10px] font-black uppercase opacity-60 leading-tight tracking-widest">
                        {novaScore === 4 ? 'Ultra' : novaScore === 3 ? 'Mod' : 'Natural'}
                    </p>
                </div>
                <div className="p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] glass-panel flex flex-col items-center justify-center text-center space-y-2 md:space-y-4 group hover:bg-primary/5 transition-all">
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Safety Grade</span>
                    <div className={cn(
                        "text-5xl md:text-8xl font-black font-headline tracking-tighter italic leading-none",
                        nutriScore === 'A' ? 'text-green-500' : nutriScore === 'B' ? 'text-primary' : 'text-yellow-600'
                    )}>
                        {nutriScore}
                    </div>
                    <p className="text-[8px] md:text-[10px] font-black uppercase opacity-60 leading-tight tracking-widest">Nutri-Score</p>
                </div>
            </div>

            {/* Allergen Alert */}
            {detectedAllergens.length > 0 && (
                <div className="p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] bg-destructive text-white shadow-3xl flex items-center gap-4 md:gap-6 animate-pulse">
                    <div className="size-10 md:size-14 rounded-xl md:rounded-2xl bg-white/20 flex items-center justify-center border border-white/10 shrink-0">
                        <CircleAlert className="size-5 md:size-7" />
                    </div>
                    <div className="text-left">
                        <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest opacity-60">Health Warning</p>
                        <p className="text-lg md:text-xl font-black font-headline leading-tight italic uppercase">{detectedAllergens.join(', ')}</p>
                    </div>
                </div>
            )}

            {/* Nutritional Architecture */}
            <Card className="rounded-2xl md:rounded-[3rem] bg-card/40 backdrop-blur-md border-white/5 shadow-2xl overflow-hidden">
                <CardHeader className="p-6 md:p-10 pb-2 md:pb-4">
                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Nutritional Architecture</CardTitle>
                </CardHeader>
                <CardContent className="p-6 md:p-10 pt-0 space-y-6 md:space-y-8">
                    {nutrients.map((n) => (
                        <div key={n.name} className="space-y-2 md:space-y-3 group">
                            <div className="flex items-center justify-between">
                                <span className={cn(
                                    "text-md md:text-lg font-black italic tracking-tighter transition-colors uppercase",
                                    getNutrientTextClass(n.name, n.percentage)
                                )}>
                                    {n.name}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className={cn(
                                        "font-black tracking-tight text-md md:text-lg",
                                        getNutrientTextClass(n.name, n.percentage)
                                    )}>
                                        {n.percentage}%
                                    </span>
                                    {n.percentage > 100 && (
                                        <TriangleAlert className="size-3.5 md:size-4 text-destructive animate-bounce" />
                                    )}
                                </div>
                            </div>
                            <Progress 
                                value={animatedPercentages[n.name] || 0} 
                                className="h-2 md:h-2.5 bg-secondary/30 rounded-full overflow-hidden" 
                                indicatorClassName={cn("transition-all duration-1000 ease-out", getNutrientColor(n.name, n.percentage))}
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Dietary Flags */}
            <div className="grid grid-cols-3 gap-3">
                <div className={cn("p-4 md:p-8 rounded-xl md:rounded-[2rem] glass-panel border flex flex-col items-center gap-2 md:gap-4 transition-all duration-500", dietaryFlags.isVegan ? "border-green-500/20 bg-green-500/5 text-green-500" : "opacity-20 border-white/5")}>
                    <Leaf className="size-[18px] md:size-6" />
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-center">Vegan</span>
                </div>
                <div className={cn("p-4 md:p-8 rounded-xl md:rounded-[2rem] glass-panel border flex flex-col items-center gap-2 md:gap-4 transition-all duration-500", dietaryFlags.isVegetarian ? "border-primary/20 bg-primary/5 text-primary" : "opacity-20 border-white/5")}>
                    <Zap className="size-[18px] md:size-6" />
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-center">Veg</span>
                </div>
                <div className={cn("p-4 md:p-8 rounded-xl md:rounded-[2rem] glass-panel border flex flex-col items-center gap-2 md:gap-4 transition-all duration-500", dietaryFlags.palmOilFree ? "border-accent/20 bg-accent/5 text-accent" : "opacity-20 border-white/5")}>
                    <DropletOff className="size-[18px] md:size-6" />
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-center">Palm-Free</span>
                </div>
            </div>

            {/* Analysis Summary */}
            <div className="p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] glass-panel space-y-6 md:space-y-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                    <Fingerprint className="size-[120px] md:size-[160px]" />
                </div>
                <div className="flex items-center gap-3 md:gap-5 relative z-10">
                    <div className="size-10 md:size-12 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                        <HeartPulse className="size-5 md:size-6" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-black font-headline tracking-tighter leading-none italic uppercase">Safety Status</h3>
                </div>
                <p className="text-muted-foreground text-md md:text-xl font-light leading-relaxed text-left relative z-10">{summary}</p>
                {tip && (
                    <div className="pt-6 md:pt-8 flex items-start gap-3 md:gap-5 border-t border-white/5 relative z-10">
                        <div className="size-8 md:size-10 rounded-lg md:rounded-xl bg-primary flex items-center justify-center shrink-0">
                           <Lightbulb className="size-4 md:size-5 text-background" />
                        </div>
                        <p className="text-sm md:text-md font-bold text-primary italic leading-tight">{tip}</p>
                    </div>
                )}
            </div>

            {/* Persistence Actions */}
            <div className="pt-6 md:pt-10 pb-40">
                <Button 
                    size="icon" 
                    onClick={handleSaveToHistory}
                    disabled={isSaving || isSaved}
                    className={cn(
                        "w-full h-20 md:h-32 rounded-[1.5rem] md:rounded-[3rem] text-xl md:text-3xl font-black italic uppercase tracking-tighter transition-all shadow-3xl group relative overflow-hidden",
                        isSaved ? "bg-green-500 text-white" : "bg-primary text-background hover:scale-[1.02] active:scale-[0.98]"
                    )}
                >
                    <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                    {isSaving ? <Fingerprint className="mr-3 md:mr-4 size-8 md:size-10 animate-pulse" /> : isSaved ? <CheckCircle className="mr-3 md:mr-4 size-8 md:size-10" /> : <DatabaseBackup className="mr-3 md:mr-4 size-8 md:size-10" />}
                    {isSaving ? "Syncing..." : isSaved ? "Secured" : "Secure History"}
                </Button>
            </div>
        </div>
    );
}
