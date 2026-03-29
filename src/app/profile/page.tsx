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
import { Loader2, User, Settings, Bell, Lock, ShieldCheck, Fingerprint, Activity, Database, Sparkles, ArrowLeft, ChevronRight } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const [activeSection, setActiveSection] = useState<ProfileSection | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (isMobile === false && activeSection === null) {
      setActiveSection('profile');
    }
  }, [isMobile, activeSection]);

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

  const sections = [
    { id: 'profile', icon: <User className="size-5 md:size-6" />, label: 'Health Profile', desc: 'Manage your biometrics and allergies' },
    { id: 'notifications', icon: <Bell className="size-5 md:size-6" />, label: 'Risk Alerts', desc: 'Configure instant hazard notifications' },
    { id: 'security', icon: <Lock className="size-5 md:size-6" />, label: 'Privacy Center', desc: 'Security keys and data encryption' },
    { id: 'settings', icon: <Settings className="size-5 md:size-6" />, label: 'Preferences', desc: 'Language and system settings' }
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6 md:space-y-16 animate-reveal">
            <div className="space-y-1 md:space-y-4 text-left">
              <h2 className="text-2xl md:text-6xl font-black italic tracking-tighter leading-none">Health Profile</h2>
              <p className="text-muted-foreground text-sm md:text-2xl font-light">Update metrics for accurate results.</p>
            </div>

            <Tabs defaultValue="biometrics" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full h-auto p-1 glass-panel rounded-xl md:rounded-3xl mb-4 md:mb-12">
                {['biometrics', 'medical', 'diet', 'habits'].map((tab) => (
                  <TabsTrigger key={tab} value={tab} className="rounded-lg md:rounded-2xl py-2 md:py-6 text-[8px] md:text-xs font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-background transition-all">
                    {tab === 'biometrics' ? 'Metrics' : tab === 'medical' ? 'Medical' : tab === 'diet' ? 'Allergies' : 'Cooking'}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="biometrics" className="space-y-4 md:space-y-10 animate-reveal">
                <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-8">
                  <div className="p-4 md:p-10 rounded-xl md:rounded-[2.5rem] glass-panel space-y-2 md:space-y-6">
                    <Label className="text-[7px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Height (cm)</Label>
                    <Input type="number" placeholder="180" className="h-12 md:h-24 text-2xl md:text-6xl font-black rounded-lg md:rounded-2xl bg-background border-none ring-2 md:ring-4 ring-primary/5 focus-visible:ring-primary p-2 md:p-8" value={formData.height} onChange={(e) => setFormData(p => ({ ...p, height: e.target.value }))} />
                  </div>
                  <div className="p-4 md:p-10 rounded-xl md:rounded-[2.5rem] glass-panel space-y-2 md:space-y-6">
                    <Label className="text-[7px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Weight (kg)</Label>
                    <Input type="number" placeholder="75" className="h-12 md:h-24 text-2xl md:text-6xl font-black rounded-lg md:rounded-2xl bg-background border-none ring-2 md:ring-4 ring-primary/5 focus-visible:ring-primary p-2 md:p-8" value={formData.weight} onChange={(e) => setFormData(p => ({ ...p, weight: e.target.value }))} />
                  </div>
                </div>
                {bmi && (
                  <div className="p-4 md:p-16 rounded-xl md:rounded-[3rem] bg-primary text-background flex flex-col md:flex-row items-center justify-between gap-2 md:gap-12 shadow-2xl relative overflow-hidden group">
                    <div className="relative z-10 space-y-0.5 md:space-y-2 text-center md:text-left">
                      <p className="text-[7px] md:text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Body Mass Index</p>
                      <h3 className="text-4xl md:text-[10rem] font-black tracking-tighter leading-none italic">{bmi}</h3>
                    </div>
                    <div className="text-center md:text-right relative z-10 max-w-xs space-y-1">
                      <p className="text-xl md:text-4xl font-black italic tracking-tighter leading-none">
                        {parseFloat(bmi) < 18.5 ? 'Underweight' : parseFloat(bmi) < 25 ? 'Healthy' : 'Overweight'}
                      </p>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="medical" className="space-y-4 md:space-y-12 animate-reveal">
                <div className="p-4 md:p-12 rounded-xl md:rounded-[2.5rem] glass-panel space-y-4 md:space-y-10">
                  <div className="space-y-3 md:space-y-8">
                    <h3 className="text-lg md:text-3xl font-black italic">Conditions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-4">
                      {CONDITION_OPTIONS.map(condition => (
                        <div 
                          key={condition} 
                          onClick={() => toggleArrayItem('diseases', condition)} 
                          className={cn(
                            "flex items-center space-x-2 md:space-x-6 p-3 md:p-8 rounded-lg md:rounded-2xl border-2 transition-all cursor-pointer min-h-[50px] md:min-h-[100px]",
                            formData.diseases.includes(condition) 
                              ? 'bg-primary border-primary text-background' 
                              : 'bg-background border-primary/10'
                          )}
                        >
                          <Checkbox checked={formData.diseases.includes(condition)} className={cn("size-3 md:size-6", formData.diseases.includes(condition) ? "bg-background text-primary" : "border-primary/20")} />
                          <span className="text-xs md:text-xl font-black italic">{condition}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm md:text-xl font-black italic">Medications</Label>
                    <Textarea placeholder="List meds..." className="min-h-[100px] md:min-h-[250px] text-sm md:text-2xl rounded-lg md:rounded-2xl" value={formData.medicines} onChange={(e) => setFormData(p => ({ ...p, medicines: e.target.value }))} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="diet" className="space-y-4 md:space-y-12 animate-reveal">
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                    {ALLERGY_OPTIONS.map(allergy => (
                        <div 
                          key={allergy} 
                          onClick={() => toggleArrayItem('allergies', allergy)} 
                          className={cn(
                            "flex flex-col gap-2 p-3 md:p-10 rounded-xl md:rounded-[2.5rem] border-2 transition-all text-center cursor-pointer min-h-[80px] md:min-h-[200px] justify-center items-center",
                            formData.allergies.includes(allergy) 
                              ? 'bg-accent border-accent text-background' 
                              : 'bg-secondary/10 border-white/5'
                          )}
                        >
                            <Checkbox checked={formData.allergies.includes(allergy)} className="size-3 md:size-6" />
                            <span className="text-xs md:text-2xl font-black italic uppercase tracking-tighter">{allergy}</span>
                        </div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="habits" className="space-y-4 md:space-y-12 animate-reveal">
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
                    {HABIT_OPTIONS.map(option => (
                        <div 
                          key={option} 
                          onClick={() => toggleArrayItem('cookingPractices', option)} 
                          className={cn(
                            "flex flex-col gap-2 p-3 md:p-10 rounded-xl md:rounded-[2.5rem] border-2 transition-all cursor-pointer min-h-[100px] md:min-h-[220px] justify-center items-center",
                            formData.cookingPractices.includes(option) 
                              ? 'bg-primary text-background' 
                              : 'bg-background border-white/5'
                          )}
                        >
                            <Checkbox checked={formData.cookingPractices.includes(option)} className="size-4 md:size-8" />
                            <span className="text-xs md:text-3xl font-black italic">{option}</span>
                        </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6 md:space-y-16 animate-reveal">
            <div className="space-y-1 md:space-y-4 text-left">
              <h2 className="text-2xl md:text-6xl font-black italic tracking-tighter leading-none">Risk Alerts</h2>
              <p className="text-muted-foreground text-sm md:text-2xl font-light">Custom alert system.</p>
            </div>
            <div className="grid gap-2 md:gap-6">
              {[
                { title: 'Direct Alerts', desc: 'Instant notifications.', icon: <Database className="size-4 md:size-6 text-primary" />, enabled: true },
                { title: 'Monthly Summary', desc: 'Scanning trend reports.', icon: <Activity className="size-4 md:size-6 text-primary" />, enabled: true },
              ].map((item, i) => (
                <div key={i} className="p-4 md:p-10 rounded-xl md:rounded-[2.5rem] glass-panel flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 md:gap-8">
                    <div className="size-10 md:size-16 rounded-lg md:rounded-2xl bg-background flex items-center justify-center border border-white/5">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-sm md:text-2xl font-black italic leading-tight">{item.title}</h3>
                      <p className="text-muted-foreground text-[10px] md:text-md font-medium">{item.desc}</p>
                    </div>
                  </div>
                  <Switch className="scale-90 md:scale-150" defaultChecked={item.enabled} />
                </div>
              ))}
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6 md:space-y-16 animate-reveal">
            <div className="space-y-1 md:space-y-4 text-left">
              <h2 className="text-2xl md:text-6xl font-black italic tracking-tighter leading-none">Privacy</h2>
              <p className="text-muted-foreground text-sm md:text-2xl font-light">Secure your data vault.</p>
            </div>
            <div className="p-6 md:p-16 rounded-xl md:rounded-[2.5rem] glass-panel border-primary/20 space-y-4 md:space-y-8">
               <Fingerprint className="size-10 md:size-16 text-primary" />
               <h3 className="text-lg md:text-3xl font-black italic">Encryption Active</h3>
               <p className="text-muted-foreground text-xs md:text-lg font-medium">All health data is encrypted using AES-256 standards.</p>
               <Button variant="outline" className="h-10 md:h-14 px-4 md:px-8 rounded-lg font-black italic text-xs">Rotate Keys</Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (isMobile && activeSection === null) {
    return (
      <div className="w-full px-4 py-4 space-y-8 animate-reveal pb-32">
        <div className="flex flex-col items-center gap-4 text-center">
            <Avatar className="h-20 w-20 rounded-2xl border-4 border-primary/20">
                <AvatarImage src={user.photoURL ?? ''} className="object-cover" />
                <AvatarFallback className="bg-secondary text-primary text-2xl font-black italic">
                    {user.email?.charAt(0) || <User />}
                </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
                <h1 className="text-3xl font-black italic tracking-tighter leading-none">
                    {user.isAnonymous ? 'Guest User' : (user.displayName || 'My Profile')}
                </h1>
                <Badge className="bg-primary/10 text-primary border-primary/20 px-2 py-0.5 text-[8px] font-black uppercase tracking-widest">Active</Badge>
            </div>
        </div>

        <div className="grid grid-cols-1 gap-2">
            {sections.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setActiveSection(item.id as ProfileSection)}
                  className="w-full text-left p-4 glass-panel rounded-2xl border-white/5 flex items-center justify-between group"
                >
                    <div className="flex items-center gap-4">
                        <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            {item.icon}
                        </div>
                        <div>
                            <h3 className="text-sm font-black italic leading-none">{item.label}</h3>
                            <p className="text-[10px] text-muted-foreground font-medium mt-0.5">{item.desc}</p>
                        </div>
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground opacity-30" />
                </button>
            ))}
        </div>
      </div>
    );
  }

  if (isMobile && activeSection !== null) {
    return (
      <div className="w-full px-4 py-4 space-y-6 animate-reveal pb-48">
          <Button 
            variant="ghost" 
            onClick={() => setActiveSection(null)}
            className="h-8 px-0 text-primary font-black italic uppercase tracking-[0.2em] text-[10px] flex items-center gap-1"
          >
            <ArrowLeft size={14} />
            BACK
          </Button>

          {renderSectionContent()}

          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[110] w-full max-w-xl px-4">
              <div className="glass-panel p-2 rounded-2xl border-primary/30 shadow-2xl">
                  <Button 
                      onClick={handleSave} 
                      disabled={isSaving} 
                      className="w-full h-12 rounded-xl bg-primary text-background text-sm font-black italic transition-all group"
                  >
                      {isSaving ? <Loader2 className="animate-spin mr-2 size-4" /> : <Sparkles className="mr-2 size-4" />}
                      {isSaving ? 'Syncing...' : 'Save Changes'}
                  </Button>
              </div>
          </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl px-4 py-12 pb-64 space-y-20 animate-reveal">
        <div className="flex flex-col md:flex-row gap-12 items-end justify-between relative text-left">
            <div className="flex flex-row items-center gap-10">
                <div className="relative group">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-[2.5rem] animate-pulse" />
                    <Avatar className="h-32 w-32 rounded-[2.5rem] border-4 border-primary/20 shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-105">
                        <AvatarImage src={user.photoURL ?? ''} className="object-cover" />
                        <AvatarFallback className="bg-secondary text-primary text-5xl font-black italic">
                            {user.email?.charAt(0) || <User />}
                        </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 bg-primary text-background p-2 rounded-xl shadow-2xl z-20">
                        <Fingerprint size={20} />
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-start gap-3">
                       <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest">Secure Session</Badge>
                       <span className="text-[10px] uppercase font-black opacity-30 tracking-[0.4em]">ID: {user.uid.slice(0, 8)}</span>
                    </div>
                    <h1 className="text-8xl font-black italic tracking-tighter leading-none text-glow">
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

        <div className="grid grid-cols-[300px_1fr] gap-20">
            <aside className="space-y-12">
                <div className="p-4 glass-panel rounded-[2.5rem] space-y-2">
                    {sections.map((item) => (
                      <Button 
                          key={item.id}
                          variant="ghost" 
                          onClick={() => setActiveSection(item.id as ProfileSection)}
                          className={cn(
                            "w-full justify-start h-16 px-8 rounded-2xl text-lg font-black italic transition-all duration-300",
                            activeSection === item.id 
                              ? 'bg-primary text-background shadow-lg scale-[1.02]' 
                              : 'hover:bg-primary/10 hover:translate-x-1'
                          )}
                      >
                          <span className="mr-4">{item.icon}</span>
                          {item.label}
                      </Button>
                    ))}
                </div>

                <div className="p-10 rounded-[2.5rem] glass-panel border-primary/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                        <Database size={140} />
                    </div>
                    <div className="relative z-10 space-y-6">
                        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <ShieldCheck size={24} />
                        </div>
                        <h4 className="text-xl font-black italic">Your Privacy</h4>
                        <p className="text-muted-foreground text-sm font-medium leading-relaxed">Your data is stored locally and securely.</p>
                    </div>
                </div>
            </aside>

            <main className="min-h-[800px]">
                {renderSectionContent()}
            </main>
        </div>

        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4 animate-reveal">
            <div className="glass-panel p-4 rounded-[2.5rem] border-primary/30 shadow-2xl flex items-center justify-between gap-6">
                <div className="flex-1 px-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Profile Status</p>
                    <p className="text-lg font-black italic">Ready to Sync</p>
                </div>
                <Button 
                    onClick={handleSave} 
                    disabled={isSaving} 
                    className="h-16 px-10 rounded-2xl bg-primary text-background text-xl font-black italic hover:scale-[1.02] active:scale-[0.98] transition-all group"
                >
                    {isSaving ? <Loader2 className="animate-spin mr-3 size-6" /> : <Sparkles className="mr-3 size-6" />}
                    {isSaving ? 'Syncing...' : 'Save Health Profile'}
                </Button>
            </div>
        </div>
    </div>
  );
}