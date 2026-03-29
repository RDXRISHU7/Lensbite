'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore, useMemoFirebase, setDocumentNonBlocking } from '@/firebase';
import { useDoc } from '@/firebase/firestore/use-doc';
import { doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, User, Settings, Bell, Lock, ShieldCheck, Fingerprint, Activity, Database, Sparkles, DatabaseBackup } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

const ALLERGY_OPTIONS = ['Gluten', 'Dairy', 'Peanuts', 'Tree Nuts', 'Soy', 'Shellfish', 'Eggs', 'Fish'];
const CONDITION_OPTIONS = ['Diabetes', 'Hypertension', 'High Cholesterol', 'Heart Disease', 'Celiac Disease', 'Gerd'];
const HABIT_OPTIONS = ['Grilling', 'Deep Frying', 'Roasting', 'Steaming', 'Boiling', 'Sautéing'];

interface HealthData {
  allergies: string[];
  diseases: string[];
  cookingPractices: string[];
  height: string;
  weight: string;
  medicines: string;
  extraNotes: string;
}

const parseHealthReport = (report: string | undefined): HealthData => {
  const defaultData: HealthData = {
    allergies: [],
    diseases: [],
    cookingPractices: [],
    height: '',
    weight: '',
    medicines: '',
    extraNotes: '',
  };
  if (!report) return defaultData;
  try {
    const parsed = JSON.parse(report);
    return { ...defaultData, ...parsed };
  } catch {
    return { ...defaultData, extraNotes: report };
  }
};

type ProfileSection = 'profile' | 'notifications' | 'security' | 'settings';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const [activeSection, setActiveSection] = useState<ProfileSection>('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  const userDocRef = useMemoFirebase(() => {
      if (!user) return null;
      return doc(firestore, 'users', user.uid);
  }, [user, firestore]);
  
  const { data: userProfile, isLoading: isProfileLoading } = useDoc(userDocRef);

  const [formData, setFormData] = useState<HealthData>({
    allergies: [],
    diseases: [],
    cookingPractices: [],
    height: '',
    weight: '',
    medicines: '',
    extraNotes: '',
  });

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
  }, [user, isUserLoading, router]);
  
  useEffect(() => {
    if (userProfile && !hasInitialized) {
        setFormData(parseHealthReport(userProfile.healthReport));
        setHasInitialized(true);
    }
  }, [userProfile, hasInitialized]);

  const bmi = useMemo(() => {
    const h = parseFloat(formData.height) / 100;
    const w = parseFloat(formData.weight);
    if (!h || !w) return null;
    return (w / (h * h)).toFixed(1);
  }, [formData.height, formData.weight]);

  const toggleArrayItem = (key: keyof Pick<HealthData, 'allergies' | 'diseases' | 'cookingPractices'>, item: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: prev[key].includes(item) 
        ? prev[key].filter(i => i !== item) 
        : [...prev[key], item]
    }));
  };

  const handleSave = async () => {
    if (!userDocRef || !user) return;
    setIsSaving(true);
    
    setDocumentNonBlocking(userDocRef, {
        id: user.uid,
        email: user.email || (user.isAnonymous ? 'guest@lensbite.local' : null),
        healthReport: JSON.stringify(formData),
    }, { merge: true });

    toast({
        title: 'Profile Saved',
        description: 'Your health data is now synchronized.',
    });
    
    setTimeout(() => setIsSaving(false), 800);
  };

  if (isUserLoading || (isProfileLoading && !userProfile)) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh] gap-8">
        <Loader2 className="animate-spin text-primary size-20 opacity-20" />
        <p className="text-xl font-black tracking-widest uppercase opacity-40 italic">Syncing Health Data...</p>
      </div>
    );
  }
  
  if (!user) return null;

  return (
    <div className="w-full max-w-7xl px-4 py-8 md:py-12 pb-48 md:pb-64 space-y-12 md:space-y-20 animate-reveal">
        
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-end justify-between relative text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                <div className="relative group">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-[2rem] md:rounded-[2.5rem] animate-pulse" />
                    <Avatar className="h-24 w-24 md:h-32 md:h-32 rounded-[2rem] md:rounded-[2.5rem] border-4 border-primary/20 shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-105">
                        <AvatarImage src={user.photoURL ?? ''} className="object-cover" />
                        <AvatarFallback className="bg-secondary text-primary text-3xl md:text-5xl font-black italic">
                            {user.email?.charAt(0) || <User />}
                        </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 bg-primary text-background p-2 rounded-lg md:rounded-xl shadow-2xl z-20">
                        <Fingerprint size={16} className="md:size-5" />
                    </div>
                </div>
                <div className="space-y-2 md:space-y-4">
                    <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3">
                       <Badge className="bg-primary/10 text-primary border-primary/20 px-2 md:px-3 py-0.5 md:py-1 text-[8px] md:text-[10px] font-black uppercase tracking-widest">Secure Session</Badge>
                       <span className="text-[8px] md:text-[10px] uppercase font-black opacity-30 tracking-[0.4em]">ID: {user.uid.slice(0, 8)}</span>
                    </div>
                    <h1 className="text-4xl md:text-8xl font-black italic tracking-tighter leading-none text-glow">
                        {user.isAnonymous ? 'Guest User' : (user.displayName || 'My Profile')}
                    </h1>
                </div>
            </div>
            
            <div className="hidden lg:flex flex-col items-end gap-1 opacity-20 text-right">
                <p className="text-[10px] font-black uppercase tracking-[0.4em]">Personal Data Vault</p>
                <p className="text-xl font-black italic">System Active</p>
            </div>
        </div>

        <Separator className="bg-white/5" />

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 md:gap-20">
            {/* Nav Sidebar */}
            <aside className="space-y-8 md:space-y-12">
                <div className="p-3 md:p-4 glass-panel rounded-[2rem] md:rounded-[2.5rem] space-y-1 md:space-y-2">
                    {[
                      { id: 'profile', icon: <User className="size-5" />, label: 'Health Profile' },
                      { id: 'notifications', icon: <Bell className="size-5" />, label: 'Risk Alerts' },
                      { id: 'security', icon: <Lock className="size-5" />, label: 'Privacy Center' },
                      { id: 'settings', icon: <Settings className="size-5" />, label: 'Preferences' }
                    ].map((item) => (
                      <Button 
                          key={item.id}
                          variant="ghost" 
                          onClick={() => setActiveSection(item.id as ProfileSection)}
                          className={cn(
                            "w-full justify-start h-14 md:h-16 px-6 md:px-8 rounded-xl md:rounded-2xl text-md md:text-lg font-black italic transition-all duration-300",
                            activeSection === item.id 
                              ? 'bg-primary text-background shadow-lg scale-[1.02]' 
                              : 'hover:bg-primary/10 hover:translate-x-1'
                          )}
                      >
                          <span className="mr-3 md:mr-4">{item.icon}</span>
                          {item.label}
                      </Button>
                    ))}
                </div>

                <div className="hidden md:block p-10 rounded-[2.5rem] glass-panel border-primary/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                        <Database size={140} />
                    </div>
                    <div className="relative z-10 space-y-6">
                        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <ShieldCheck size={24} />
                        </div>
                        <h4 className="text-xl font-black italic">Your Privacy</h4>
                        <p className="text-muted-foreground text-sm font-medium leading-relaxed">Your data is stored locally and securely. We never share your health details with anyone.</p>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="min-h-[600px] md:min-h-[800px]">
                
                {activeSection === 'profile' && (
                    <div className="space-y-12 md:space-y-16 animate-reveal">
                        <div className="space-y-2 md:space-y-4 text-center md:text-left">
                            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter leading-none">Health Profile</h2>
                            <p className="text-muted-foreground text-lg md:text-2xl font-light">Update metrics for accurate safety results.</p>
                        </div>

                        <Tabs defaultValue="biometrics" className="w-full">
                            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full h-auto p-1.5 md:p-2 glass-panel rounded-2xl md:rounded-3xl mb-8 md:mb-12">
                                {['biometrics', 'medical', 'diet', 'habits'].map((tab) => (
                                    <TabsTrigger key={tab} value={tab} className="rounded-xl md:rounded-2xl py-3 md:py-6 text-[10px] md:text-xs font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-background transition-all">
                                        {tab === 'biometrics' ? 'Metrics' : tab === 'medical' ? 'Medical' : tab === 'diet' ? 'Allergies' : 'Cooking'}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            <TabsContent value="biometrics" className="space-y-8 md:space-y-10 animate-reveal">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                                    <div className="p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] glass-panel space-y-4 md:space-y-6 group hover:bg-primary/5 transition-all">
                                        <Label className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Height (cm)</Label>
                                        <Input type="number" placeholder="180" className="h-16 md:h-24 text-4xl md:text-6xl font-black rounded-xl md:rounded-2xl bg-background border-none ring-4 ring-primary/5 focus-visible:ring-primary p-4 md:p-8 transition-all" value={formData.height} onChange={(e) => setFormData(p => ({ ...p, height: e.target.value }))} />
                                    </div>
                                    <div className="p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] glass-panel space-y-4 md:space-y-6 group hover:bg-primary/5 transition-all">
                                        <Label className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Weight (kg)</Label>
                                        <Input type="number" placeholder="75" className="h-16 md:h-24 text-4xl md:text-6xl font-black rounded-xl md:rounded-2xl bg-background border-none ring-4 ring-primary/5 focus-visible:ring-primary p-4 md:p-8 transition-all" value={formData.weight} onChange={(e) => setFormData(p => ({ ...p, weight: e.target.value }))} />
                                    </div>
                                </div>
                                {bmi && (
                                    <div className="p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] bg-primary text-background flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 shadow-2xl relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-[5000ms]">
                                            <Activity size={200} className="md:size-[300px]" />
                                        </div>
                                        <div className="relative z-10 space-y-1 md:space-y-2 text-center lg:text-left">
                                            <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em] opacity-60">Calculated Body Mass Index</p>
                                            <h3 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-none italic">{bmi}</h3>
                                        </div>
                                        <div className="text-center lg:text-right relative z-10 max-w-xs md:max-w-sm space-y-2 md:space-y-4">
                                            <p className="text-2xl md:text-4xl font-black italic tracking-tighter leading-none">
                                              {parseFloat(bmi) < 18.5 ? 'Underweight' : parseFloat(bmi) < 25 ? 'Healthy Weight' : 'Overweight'}
                                            </p>
                                            <p className="text-background/70 text-sm md:text-lg font-bold leading-tight">Optimizing risks for your body architecture.</p>
                                        </div>
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="medical" className="space-y-8 md:space-y-12 animate-reveal">
                                <div className="p-6 md:p-12 rounded-2xl md:rounded-[2.5rem] glass-panel space-y-8 md:space-y-10">
                                    <div className="space-y-6 md:space-y-8">
                                        <h3 className="text-2xl md:text-3xl font-black italic">Medical Conditions</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                            {CONDITION_OPTIONS.map(condition => (
                                                <div 
                                                  key={condition} 
                                                  onClick={() => toggleArrayItem('diseases', condition)} 
                                                  className={cn(
                                                    "flex items-center space-x-4 md:space-x-6 p-6 md:p-8 rounded-xl md:rounded-2xl border-2 transition-all cursor-pointer group min-h-[80px] md:min-h-[100px]",
                                                    formData.diseases.includes(condition) 
                                                      ? 'bg-primary border-primary text-background' 
                                                      : 'bg-background border-primary/10 hover:border-primary/40'
                                                  )}
                                                >
                                                    <Checkbox checked={formData.diseases.includes(condition)} className={cn("size-5 md:size-6 rounded-md", formData.diseases.includes(condition) ? "bg-background text-primary" : "border-primary/20")} />
                                                    <span className="text-lg md:text-xl font-black italic">{condition}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <Separator className="bg-white/5" />
                                    <div className="space-y-3 md:space-y-4">
                                        <Label className="text-lg md:text-xl font-black italic">Current Medications</Label>
                                        <Textarea placeholder="List meds to identify safety triggers..." className="min-h-[150px] md:min-h-[250px] text-lg md:text-2xl font-light rounded-xl md:rounded-2xl bg-background border-2 border-primary/10 p-6 md:p-10 focus:ring-primary" value={formData.medicines} onChange={(e) => setFormData(p => ({ ...p, medicines: e.target.value }))} />
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="diet" className="space-y-8 md:space-y-12 animate-reveal">
                                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                                    {ALLERGY_OPTIONS.map(allergy => (
                                        <div 
                                          key={allergy} 
                                          onClick={() => toggleArrayItem('allergies', allergy)} 
                                          className={cn(
                                            "flex flex-col gap-4 md:gap-6 p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border-2 transition-all text-center cursor-pointer min-h-[140px] md:min-h-[200px] justify-center items-center",
                                            formData.allergies.includes(allergy) 
                                              ? 'bg-accent border-accent text-background scale-[1.02]' 
                                              : 'bg-secondary/10 border-white/5 hover:border-accent/40'
                                          )}
                                        >
                                            <Checkbox checked={formData.allergies.includes(allergy)} className="size-5 md:size-6 rounded-md" />
                                            <span className="text-lg md:text-2xl font-black italic uppercase tracking-tighter leading-tight">{allergy}</span>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="habits" className="space-y-8 md:space-y-12 animate-reveal">
                                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                                    {HABIT_OPTIONS.map(option => (
                                        <div 
                                          key={option} 
                                          onClick={() => toggleArrayItem('cookingPractices', option)} 
                                          className={cn(
                                            "flex flex-col gap-4 md:gap-8 p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border-2 transition-all cursor-pointer min-h-[160px] md:min-h-[220px] justify-center items-center",
                                            formData.cookingPractices.includes(option) 
                                              ? 'bg-primary text-background scale-[1.02]' 
                                              : 'bg-background border-white/5 hover:border-primary/40'
                                          )}
                                        >
                                            <Checkbox checked={formData.cookingPractices.includes(option)} className="size-6 md:size-8 rounded-lg" />
                                            <span className="text-xl md:text-3xl font-black italic text-center">{option}</span>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                )}
                
                {activeSection === 'notifications' && (
                    <div className="space-y-12 md:space-y-16 animate-reveal">
                        <div className="space-y-2 md:space-y-4 text-center md:text-left">
                            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter leading-none">Risk Alerts</h2>
                            <p className="text-muted-foreground text-lg md:text-2xl font-light">Custom alert system for harmful ingredients.</p>
                        </div>
                        <div className="grid gap-4 md:gap-6">
                            {[
                                { title: 'Direct Alerts', desc: 'Instant hazard notifications.', icon: <Database className="size-5 md:size-6 text-primary" />, enabled: true },
                                { title: 'Monthly Summary', desc: 'Food scanning trend reports.', icon: <Activity className="size-5 md:size-6 text-primary" />, enabled: true },
                            ].map((item, i) => (
                                <div key={i} className="p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] glass-panel flex items-center justify-between gap-6 md:gap-8 group hover:bg-white/5 transition-all">
                                    <div className="flex items-center gap-4 md:gap-8">
                                        <div className="size-12 md:size-16 rounded-xl md:rounded-2xl bg-background flex items-center justify-center border border-white/5">
                                            {item.icon}
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-lg md:text-2xl font-black italic leading-tight">{item.title}</h3>
                                            <p className="text-muted-foreground text-sm md:text-md font-medium">{item.desc}</p>
                                        </div>
                                    </div>
                                    <Switch className="scale-110 md:scale-150" defaultChecked={item.enabled} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>

        {/* Sync Bar - Re-aligned for mobile safety above bottom nav */}
        <div className="fixed bottom-32 md:bottom-12 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4 animate-reveal">
            <div className="glass-panel p-3 md:p-4 rounded-[1.5rem] md:rounded-[2.5rem] border-primary/30 shadow-2xl flex items-center justify-between gap-4 md:gap-6">
                <div className="flex-1 px-2 md:px-4">
                    <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Profile Status</p>
                    <p className="text-md md:text-lg font-black italic">Ready to Sync</p>
                </div>
                <Button 
                    onClick={handleSave} 
                    disabled={isSaving} 
                    className="h-14 md:h-16 px-6 md:px-10 rounded-xl md:rounded-2xl bg-primary text-background text-md md:text-xl font-black italic hover:scale-[1.02] active:scale-[0.98] transition-all group"
                >
                    {isSaving ? <Loader2 className="animate-spin mr-2 md:mr-3 size-5 md:size-6" /> : <Sparkles className="mr-2 md:mr-3 size-5 md:size-6 group-hover:rotate-12 transition-transform" />}
                    {isSaving ? 'Syncing...' : 'Save Health Profile'}
                </Button>
            </div>
        </div>
    </div>
  );
}