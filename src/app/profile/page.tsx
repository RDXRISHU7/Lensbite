'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore, useMemoFirebase, setDocumentNonBlocking } from '@/firebase';
import { useDoc } from '@/firebase/firestore/use-doc';
import { doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, User, Database, ShieldCheck, Activity, Fingerprint, Sparkles, ArrowLeft, ChevronRight } from 'lucide-react';
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
        <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40 italic">Syncing Health Layer...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 pb-48 animate-iris">
        <div className="flex items-center justify-between mb-12">
            <Button variant="ghost" onClick={() => router.back()} className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                <ArrowLeft size={14} /> Back
            </Button>
            <div className="flex items-center gap-2">
                <Fingerprint size={16} className="text-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">USER-PROFILE-CORE</span>
            </div>
        </div>

        <div className="flex flex-col items-center text-center gap-6 mb-12">
            <Avatar className="h-32 w-32 rounded-3xl border-4 border-primary/20 shadow-2xl">
                <AvatarImage src={user.photoURL ?? ''} />
                <AvatarFallback className="bg-primary text-background text-4xl font-black uppercase">{user.email?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">{user.isAnonymous ? 'Guest Node' : 'Clinical Profile'}</h1>
                <Badge variant="outline" className="border-primary/30 text-primary text-[8px] font-black uppercase tracking-[0.3em] bg-primary/5">Session: {user.uid.slice(0, 8)}</Badge>
            </div>
        </div>

        <Tabs defaultValue="biometrics" className="w-full max-w-2xl mx-auto">
            <TabsList className="grid grid-cols-3 w-full h-auto p-1 glass-panel rounded-2xl mb-12">
                {['biometrics', 'medical', 'diet'].map((tab) => (
                    <TabsTrigger key={tab} value={tab} className="rounded-xl py-4 text-[9px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-background">
                        {tab}
                    </TabsTrigger>
                ))}
            </TabsList>

            <TabsContent value="biometrics" className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-8 rounded-[2rem] glass-panel space-y-4">
                        <Label className="text-[8px] font-black uppercase tracking-widest opacity-40">Height (cm)</Label>
                        <Input type="number" className="h-16 text-3xl font-black rounded-xl bg-background/50 border-white/5 focus-visible:ring-primary" value={formData.height} onChange={(e) => setFormData(p => ({ ...p, height: e.target.value }))} />
                    </div>
                    <div className="p-8 rounded-[2rem] glass-panel space-y-4">
                        <Label className="text-[8px] font-black uppercase tracking-widest opacity-40">Weight (kg)</Label>
                        <Input type="number" className="h-16 text-3xl font-black rounded-xl bg-background/50 border-white/5 focus-visible:ring-primary" value={formData.weight} onChange={(e) => setFormData(p => ({ ...p, weight: e.target.value }))} />
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="medical" className="space-y-6">
                <div className="p-8 rounded-[2rem] glass-panel space-y-8 text-left">
                    <h3 className="text-xl font-black uppercase">Active Conditions</h3>
                    <div className="grid grid-cols-1 gap-3">
                        {CONDITION_OPTIONS.map(c => (
                            <div key={c} onClick={() => setFormData(p => ({ ...p, diseases: p.diseases.includes(c) ? p.diseases.filter(i => i !== c) : [...p.diseases, c] }))} className={cn("flex items-center gap-4 p-6 rounded-2xl border-2 cursor-pointer transition-all", formData.diseases.includes(c) ? "bg-primary border-primary text-background" : "bg-white/5 border-white/10")}>
                                <Checkbox checked={formData.diseases.includes(c)} className="size-5" />
                                <span className="text-lg font-black uppercase">{c}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="diet" className="space-y-6">
                <div className="grid grid-cols-2 gap-3">
                    {ALLERGY_OPTIONS.map(a => (
                        <div key={a} onClick={() => setFormData(p => ({ ...p, allergies: p.allergies.includes(a) ? p.allergies.filter(i => i !== a) : [...p.allergies, a] }))} className={cn("flex flex-col items-center justify-center p-8 rounded-3xl border-2 cursor-pointer transition-all", formData.allergies.includes(a) ? "bg-accent border-accent text-background" : "bg-white/5 border-white/10")}>
                            <Checkbox checked={formData.allergies.includes(a)} className="size-5 mb-4" />
                            <span className="text-xs font-black uppercase tracking-widest">{a}</span>
                        </div>
                    ))}
                </div>
            </TabsContent>
        </Tabs>

        {/* Global Save Button */}
        <div className="fixed bottom-32 left-1/2 -translate-x-1/2 w-full max-w-sm px-6">
            <Button onClick={handleSave} disabled={isSaving} className="w-full h-20 rounded-3xl bg-primary text-background text-xl font-black uppercase tracking-tighter hover:scale-[1.02] shadow-3xl">
                {isSaving ? <Loader2 className="animate-spin mr-3" /> : <Sparkles className="mr-3" />}
                {isSaving ? "Syncing..." : "Secure Profile"}
            </Button>
        </div>
    </div>
  );
}
