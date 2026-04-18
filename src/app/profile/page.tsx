'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore, useMemoFirebase, setDocumentNonBlocking } from '@/firebase';
import { useDoc } from '@/firebase/firestore/use-doc';
import { doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Fingerprint, Sparkles, ArrowLeft, Heart, Microscope, Banana } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const ALLERGY_OPTIONS = ['Gluten', 'Dairy', 'Peanuts', 'Soy', 'Shellfish', 'Eggs'];
const CONDITION_OPTIONS = ['Diabetes', 'Hypertension', 'Celiac'];

interface HealthData {
  allergies: string[];
  diseases: string[];
  height: string;
  weight: string;
  medicines: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const userDocRef = useMemoFirebase(() => {
      if (!user) return null;
      return doc(firestore, 'users', user.uid);
  }, [user, firestore]);
  
  const { data: userProfile, isLoading: isProfileLoading } = useDoc(userDocRef);

  const [formData, setFormData] = useState<HealthData>({
    allergies: [], diseases: [], height: '', weight: '', medicines: ''
  });

  useEffect(() => {
    if (userProfile && userProfile.healthReport) {
        try { setFormData(JSON.parse(userProfile.healthReport)); } catch {}
    }
  }, [userProfile]);

  const handleSave = async () => {
    if (!userDocRef || !user) return;
    setIsSaving(true);
    setDocumentNonBlocking(userDocRef, {
        id: user.uid,
        email: user.email || 'guest@lensbite.local',
        healthReport: JSON.stringify(formData),
    }, { merge: true });
    toast({ title: 'Profile Updated', description: 'Biometrics synchronized.' });
    setTimeout(() => setIsSaving(false), 800);
  };

  if (isUserLoading || isProfileLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <Loader2 className="animate-spin text-primary size-12 opacity-20" />
        <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Syncing Health Layer...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F6F4FB] p-6 md:p-12 pb-64 animate-in fade-in duration-700 w-full flex flex-col items-center">
        
        {/* Navigation HUD */}
        <div className="flex items-center justify-between mb-16 max-w-2xl mx-auto w-full">
            <Button variant="ghost" onClick={() => router.back()} className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                <ArrowLeft size={14} /> Back
            </Button>
            <div className="flex items-center gap-2">
                <Fingerprint size={16} className="text-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">CLINICAL-PROFILE-CORE</span>
            </div>
        </div>

        {/* Identity Section */}
        <div className="flex flex-col items-center text-center gap-8 mb-16">
            <Avatar className="h-40 w-40 rounded-[2.5rem] border-8 border-white shadow-2xl">
                <AvatarImage src={user.photoURL ?? ''} />
                <AvatarFallback className="bg-primary text-background text-5xl font-black uppercase">{user.email?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-4">
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none text-[#0F0A2A]">
                    {user.isAnonymous ? 'Guest Node' : 'Clinical User'}
                </h1>
                <Badge variant="outline" className="border-primary/20 text-primary text-[9px] font-black uppercase tracking-[0.4em] bg-primary/5 rounded-full px-8 py-2">
                    SESSION ID: {user.uid.slice(0, 8).toUpperCase()}
                </Badge>
            </div>
        </div>

        {/* Intelligence Input Area */}
        <Tabs defaultValue="biometrics" className="w-full max-w-2xl mx-auto">
            <TabsList className="grid grid-cols-3 w-full h-auto p-2 bg-white/60 backdrop-blur-3xl rounded-[2.5rem] mb-16 border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
                {[
                    { id: 'biometrics', label: 'Biometrics', icon: Heart },
                    { id: 'medical', label: 'Medical', icon: Microscope },
                    { id: 'diet', label: 'Dietary', icon: Banana }
                ].map((tab) => (
                    <TabsTrigger 
                        key={tab.id} 
                        value={tab.id} 
                        className="rounded-[2.2rem] py-5 text-[10px] font-black uppercase tracking-widest transition-all data-[state=active]:liquid-glass-base data-[state=active]:liquid-glass-purple data-[state=active]:shadow-xl group"
                    >
                        <tab.icon className="size-4 mr-2 opacity-40 group-data-[state=active]:opacity-100" />
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>

            <TabsContent value="biometrics" className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-12 rounded-[2.5rem] bg-white border border-black/5 shadow-sm space-y-6">
                        <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Physiological Height (cm)</Label>
                        <Input type="number" className="h-20 text-4xl font-black rounded-3xl bg-[#F6F4FB] border-none focus-visible:ring-primary px-8" value={formData.height} onChange={(e) => setFormData(p => ({ ...p, height: e.target.value }))} />
                    </div>
                    <div className="p-12 rounded-[2.5rem] bg-white border border-black/5 shadow-sm space-y-6">
                        <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Body Weight Mass (kg)</Label>
                        <Input type="number" className="h-20 text-4xl font-black rounded-3xl bg-[#F6F4FB] border-none focus-visible:ring-primary px-8" value={formData.weight} onChange={(e) => setFormData(p => ({ ...p, weight: e.target.value }))} />
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="medical" className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                <div className="p-12 rounded-[3rem] bg-white border border-black/5 shadow-sm space-y-12">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-black uppercase tracking-tight text-[#0F0A2A]">Clinical Conditions</h3>
                        <p className="text-xs font-medium text-muted-foreground">Select all active medical triggers for risk cross-referencing.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {CONDITION_OPTIONS.map(c => (
                            <div 
                                key={c} 
                                onClick={() => setFormData(p => ({ ...p, diseases: p.diseases.includes(c) ? p.diseases.filter(i => i !== c) : [...p.diseases, c] }))} 
                                className={cn(
                                    "flex items-center justify-between p-10 rounded-[2.2rem] border-2 cursor-pointer transition-all duration-300", 
                                    formData.diseases.includes(c) 
                                        ? "liquid-glass-base liquid-glass-purple border-transparent scale-[1.02] shadow-2xl" 
                                        : "bg-[#F6F4FB] border-transparent hover:bg-white hover:border-black/5"
                                )}
                            >
                                <span className="text-xl font-black uppercase tracking-tight">{c}</span>
                                <Checkbox checked={formData.diseases.includes(c)} className={cn("size-8 rounded-full transition-all", formData.diseases.includes(c) ? "border-white bg-white/20" : "border-black/10")} />
                            </div>
                        ))}
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="diet" className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-2 gap-6">
                    {ALLERGY_OPTIONS.map(a => (
                        <div 
                            key={a} 
                            onClick={() => setFormData(p => ({ ...p, allergies: p.allergies.includes(a) ? p.allergies.filter(i => i !== a) : [...p.allergies, a] }))} 
                            className={cn(
                                "flex flex-col items-center justify-center p-12 rounded-[3rem] border-2 cursor-pointer transition-all duration-300", 
                                formData.allergies.includes(a) 
                                    ? "liquid-glass-base liquid-glass-lime border-transparent scale-[1.02] shadow-2xl" 
                                    : "bg-white border-black/5 hover:bg-[#F6F4FB]"
                            )}
                        >
                            <Checkbox checked={formData.allergies.includes(a)} className={cn("size-6 mb-8 transition-all", formData.allergies.includes(a) ? "border-black/20" : "border-black/10")} />
                            <span className="text-sm font-black uppercase tracking-widest">{a}</span>
                        </div>
                    ))}
                </div>
            </TabsContent>
        </Tabs>

        {/* Static HUD Action Bar - Non-overlapping fixed placement */}
        <div className="fixed bottom-12 inset-x-0 flex justify-center px-6 z-[100] pointer-events-none">
            <div className="w-full max-w-md bg-white/40 backdrop-blur-3xl p-4 rounded-[3.5rem] border border-white/50 shadow-2xl pointer-events-auto">
                <Button 
                    onClick={handleSave} 
                    disabled={isSaving} 
                    className="w-full h-24 rounded-[3rem] liquid-glass-base liquid-glass-purple text-2xl font-black uppercase tracking-tighter shadow-xl scale-100 active:scale-95 transition-all"
                >
                    {isSaving ? <Loader2 className="animate-spin mr-4 size-8" /> : <Sparkles className="mr-4 size-8 text-accent" />}
                    {isSaving ? "Synchronizing..." : "Secure Architecture"}
                </Button>
            </div>
        </div>

    </div>
  );
}