'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase';
import {
  signInWithEmailAndPassword,
  signInAnonymously,
  AuthError,
} from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Loader2, Zap, ShieldCheck } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function LoginPage() {
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnonymousLoading, setAnonymousLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error) {
      const authError = error as AuthError;
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: authError.message,
      });
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleAnonymousLogin = async () => {
    setAnonymousLoading(true);
    try {
      await signInAnonymously(auth);
      router.push('/');
    } catch (error) {
      const authError = error as AuthError;
      toast({
        variant: 'destructive',
        title: 'Access Failed',
        description: authError.message,
      });
    } finally {
        setAnonymousLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 p-6 animate-reveal">
        <div className="text-center space-y-4">
            <Logo className="justify-center scale-125 mb-6" />
            <h1 className="text-4xl font-black italic tracking-tighter">Welcome Back</h1>
            <p className="text-muted-foreground font-medium">Join the Lens Bite network to protect your health.</p>
        </div>

        {/* Instant Access Section */}
        <div className="space-y-4">
            <Button 
                variant="default" 
                size="lg"
                className="w-full h-20 rounded-2xl bg-primary text-background text-xl font-black italic hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_15px_40px_rgba(0,230,118,0.2)]"
                onClick={handleAnonymousLogin} 
                disabled={isLoading || isAnonymousLoading}
            >
                {isAnonymousLoading ? <Loader2 className="animate-spin" /> : (
                  <div className="flex items-center gap-3">
                    <Zap className="size-6" />
                    Instant Guest Access
                  </div>
                )}
            </Button>
            <p className="text-[10px] text-center uppercase tracking-[0.3em] font-black opacity-40">Quick Start • No Account Needed</p>
        </div>

        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.4em]">
                <span className="bg-background px-4 text-muted-foreground/40">
                    OR SECURE LOGIN
                </span>
            </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-[10px] uppercase font-black tracking-widest opacity-40 ml-1">Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="user@example.com"
                        required
                        className="h-14 rounded-xl bg-secondary/20 border-white/5 focus:ring-primary font-medium"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading || isAnonymousLoading}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password" className="text-[10px] uppercase font-black tracking-widest opacity-40 ml-1">Security Key</Label>
                    <Input
                        id="password"
                        type="password"
                        required
                        className="h-14 rounded-xl bg-secondary/20 border-white/5 focus:ring-primary font-medium"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading || isAnonymousLoading}
                    />
                </div>
            </div>
            <Button type="submit" className="w-full h-14 rounded-xl font-black italic text-lg" variant="outline" disabled={isLoading || isAnonymousLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : 'Sign In To Profile'}
            </Button>
        </form>

        <div className="text-center pt-4">
            <p className="text-sm text-muted-foreground font-medium">
                First time here?{' '}
                <Link href="/signup" className="font-black text-primary hover:underline italic">
                    Create Profile
                </Link>
            </p>
        </div>

        <div className="flex items-center justify-center gap-2 opacity-20 pt-8">
            <ShieldCheck size={14} />
            <span className="text-[8px] uppercase font-black tracking-[0.4em]">Secure Encrypted Connection</span>
        </div>
    </div>
  );
}
