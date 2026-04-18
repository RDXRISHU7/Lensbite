
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore, useMemoFirebase, setDocumentNonBlocking } from '@/firebase';
import { useDoc } from '@/firebase/firestore/use-doc';
import { doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Fingerprint, Sparkles, ArrowLeft, Heart, Microscope, Banana, CheckCircle2 } from 'lucide-react';
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
      <div className="flex flex-col justify-center items-center h-screen gap-6 bg-[#F6F4FB]">
        <Loader2 className="animate-spin text-primary size-12 opacity-30" />
        <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Synchronizing Health Layer</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F6F4FB] p-6 md:p-12 pb-96 animate-in fade-in duration-700 w-full flex flex-col items-center">
        
        {/* Navigation HUD */}
        <div className="flex items-center justify-between mb-20 max-w-4xl mx-auto w-full">
            <Button variant="ghost" onClick={() => router.back()} className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 px-6 h-10 rounded-full bg-white/40 border border-white/50 backdrop-blur-md">
                <ArrowLeft size={14} /> Back to Hub
            </Button>
            <div className="flex items-center gap-3 px-6 py-2 rounded-full bg-white/40 border border-white/50 backdrop-blur-md">
                <Fingerprint size={16} className="text-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Session ID: {user.uid.slice(0, 6)}</span>
            </div>
        </div>

        {/* Identity Architecture */}
        <div className="flex flex-col items-center text-center gap-10 mb-20">
            <div className="relative">
              <Avatar className="h-44 w-44 rounded-[3rem] border-8 border-white shadow-2xl">
                  <AvatarImage src={user.photoURL ?? ''} />
                  <AvatarFallback className="bg-primary text-background text-6xl font-black uppercase">{user.email?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-4 -right-4 size-14 bg-[#F8FFA1] rounded-2xl flex items-center justify-center shadow-lg border-4 border-white">
                <CheckCircle2 size={24} className="text-[#0F0A2A]" />
              </div>
            </div>
            <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none text-[#0F0A2A] font-['Space_Grotesk']">
                    {user.isAnonymous ? 'Guest Node' : 'Clinical User'}
                </h1>
                <Badge variant="outline" className="border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.4em] bg-primary/5 rounded-full px-10 py-3 backdrop-blur-sm">
                    Clinical Data Sync Active
                </Badge>
            </div>
        </div>

        {/* Intelligence Selection Interface */}
        <Tabs defaultValue="biometrics" className="w-full max-w-3xl mx-auto">
            <TabsList className="grid grid-cols-3 w-full h-auto p-2 bg-white/60 backdrop-blur-3xl rounded-[3rem] mb-20 border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
                {[
                    { id: 'biometrics', label: 'Metrics', icon: Heart },
                    { id: 'medical', label: 'Clinical', icon: Microscope },
                    { id: 'diet', label: 'Dietary', icon: Banana }
                ].map((tab) => (
                    <TabsTrigger 
                        key={tab.id} 
                        value={tab.id} 
                        className="rounded-[2.8rem] py-6 text-[11px] font-black uppercase tracking-widest transition-all data-[state=active]:liquid-glass-base data-[state=active]:liquid-glass-purple data-[state=active]:shadow-2xl group"
                    >
                        <tab.icon className="size-4 mr-3 opacity-40 group-data-[state=active]:opacity-100" />
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>

            <TabsContent value="biometrics" className="space-y-12 animate-in slide-in-from-bottom-8 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="p-16 rounded-[3.5rem] bg-white border border-black/5 shadow-sm space-y-8 flex flex-col items-center">
                        <Label className="text-[11px] font-black uppercase tracking-[0.4em] text-[#7E7A9A]">Height Signal (cm)</Label>
                        <Input type="number" className="h-24 text-6xl font-black text-center rounded-[2.5rem] bg-[#F6F4FB] border-none focus-visible:ring-primary px-10 font-['Space_Grotesk']" value={formData.height} onChange={(e) => setFormData(p => ({ ...p, height: e.target.value }))} />
                    </div>
                    <div className="p-16 rounded-[3.5rem] bg-white border border-black/5 shadow-sm space-y-8 flex flex-col items-center">
                        <Label className="text-[11px] font-black uppercase tracking-[0.4em] text-[#7E7A9A]">Weight Mass (kg)</Label>
                        <Input type="number" className="h-24 text-6xl font-black text-center rounded-[2.5rem] bg-[#F6F4FB] border-none focus-visible:ring-primary px-10 font-['Space_Grotesk']" value={formData.weight} onChange={(e) => setFormData(p => ({ ...p, weight: e.target.value }))} />
                    </div>
                </div>
                <div className="h-32" /> {/* Layout Spacer */}
            </TabsContent>

            <TabsContent value="medical" className="space-y-12 animate-in slide-in-from-bottom-8 duration-500">
                <div className="p-16 rounded-[4rem] bg-white border border-black/5 shadow-sm space-y-16">
                    <div className="text-center space-y-4">
                        <h3 className="text-3xl font-black uppercase tracking-tight text-[#0F0A2A] font-['Space_Grotesk']">Clinical Conditions</h3>
                        <p className="text-sm font-medium text-[#3D3660] opacity-60">Select active medical triggers for high-fidelity hazard decryption.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                        {CONDITION_OPTIONS.map(c => (
                            <div 
                                key={c} 
                                onClick={() => setFormData(p => ({ ...p, diseases: p.diseases.includes(c) ? p.diseases.filter(i => i !== c) : [...p.diseases, c] }))} 
                                className={cn(
                                    "flex items-center justify-between p-12 rounded-[3rem] border-2 cursor-pointer transition-all duration-500", 
                                    formData.diseases.includes(c) 
                                        ? "liquid-glass-base liquid-glass-purple border-transparent scale-[1.03] shadow-2xl" 
                                        : "bg-[#F6F4FB] border-transparent hover:bg-white hover:border-black/5"
                                )}
                            >
                                <span className="text-2xl font-black uppercase tracking-tight ml-4">{c}</span>
                                <div className={cn(
                                  "size-10 rounded-full flex items-center justify-center transition-all",
                                  formData.diseases.includes(c) ? "bg-white/30" : "bg-black/5"
                                )}>
                                  <Checkbox checked={formData.diseases.includes(c)} className={cn("size-6 rounded-full border-none", formData.diseases.includes(c) ? "bg-white" : "bg-transparent")} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="h-32" /> {/* Layout Spacer */}
            </TabsContent>

            <TabsContent value="diet" className="space-y-12 animate-in slide-in-from-bottom-8 duration-500">
                <div className="grid grid-cols-2 gap-8">
                    {ALLERGY_OPTIONS.map(a => (
                        <div 
                            key={a} 
                            onClick={() => setFormData(p => ({ ...p, allergies: p.allergies.includes(a) ? p.allergies.filter(i => i !== a) : [...p.allergies, a] }))} 
                            className={cn(
                                "flex flex-col items-center justify-center p-16 rounded-[4rem] border-2 cursor-pointer transition-all duration-500", 
                                formData.allergies.includes(a) 
                                    ? "liquid-glass-base liquid-glass-lime border-transparent scale-[1.03] shadow-2xl" 
                                    : "bg-white border-black/5 hover:bg-[#F6F4FB]"
                            )}
                        >
                            <Checkbox checked={formData.allergies.includes(a)} className={cn("size-8 mb-10 rounded-full transition-all border-2", formData.allergies.includes(a) ? "border-black bg-black" : "border-black/10")} />
                            <span className="text-[12px] font-black uppercase tracking-[0.3em]">{a}</span>
                        </div>
                    ))}
                </div>
                <div className="h-32" /> {/* Layout Spacer */}
            </TabsContent>
        </Tabs>

        {/* Clinical Command Bar - Floating non-obstructive HUD */}
        <div className="fixed bottom-16 inset-x-0 flex justify-center px-8 z-[100] pointer-events-none">
            <div className="w-full max-w-xl bg-white/40 backdrop-blur-3xl p-6 rounded-[4.5rem] border border-white/60 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] pointer-events-auto">
                <Button 
                    onClick={handleSave} 
                    disabled={isSaving} 
                    className="w-full h-28 rounded-[3.5rem] liquid-glass-base liquid-glass-purple text-3xl font-black uppercase tracking-tight shadow-2xl scale-100 active:scale-95 transition-all"
                >
                    {isSaving ? <Loader2 className="animate-spin mr-6 size-10" /> : <Sparkles className="mr-6 size-10 text-[#F8FFA1]" />}
                    {isSaving ? "Synchronizing" : "Secure Architecture"}
                </Button>
            </div>
        </div>

    </div>
  );
}
