'use client';

import { useEffect, useRef, useState, startTransition, useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { analyzeBarcodeAction, type FormState } from './action';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { RiskResultCard } from '@/components/risk-result-card';
import { Loader2, ScanBarcode, CircleAlert, X, Zap, Activity, Box } from 'lucide-react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

const initialState: FormState = { type: 'initial' };

export default function BarcodeScannerPage() {
  const [state, formAction, isPending] = useActionState(analyzeBarcodeAction, initialState);
  const router = useRouter();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isScannerActive, setIsScannerActive] = useState(false);
  const codeReaderRef = useRef(new BrowserMultiFormatReader());
  
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(() => user ? doc(firestore, 'users', user.uid) : null, [user, firestore]);
  const { data: userProfile, isLoading: isProfileLoading } = useDoc(userDocRef);

  useEffect(() => {
    if (!isUserLoading && !user) router.replace('/login');
  }, [user, isUserLoading, router]);

  const stopCamera = () => {
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    codeReaderRef.current.reset();
  };

  useEffect(() => {
    if (!isScannerActive || !videoRef.current) { stopCamera(); return; }
    const startScanner = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
        codeReaderRef.current.decodeFromStream(stream, videoRef.current!, (result, err) => {
          if (isPending || !isScannerActive) return;
          if (result) {
            const formData = new FormData();
            formData.append('barcode', result.getText());
            formData.append('healthReport', userProfile?.healthReport || '');
            startTransition(() => { formAction(formData); });
            setIsScannerActive(false);
          }
        });
      } catch (err) {
        setIsScannerActive(false);
        toast({ variant: 'destructive', title: 'Scanner Failed', description: 'Access denied.' });
      }
    };
    startScanner();
    return () => stopCamera();
  }, [isScannerActive, formAction, isPending, userProfile, toast]);

  if (isUserLoading || isProfileLoading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-12 pb-48 h-full flex flex-col justify-center animate-iris">
        {state.type === 'initial' && !isScannerActive && (
            <div className="flex flex-col items-center justify-center text-center space-y-12">
                <div className="size-48 rounded-[3rem] bg-white/5 border-4 border-primary/20 flex items-center justify-center relative animate-float">
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                    <ScanBarcode className="size-24 text-primary relative z-10" />
                </div>
                <div className="space-y-4">
                    <h1 className="text-6xl font-black tracking-tighter uppercase leading-none">Scanner <br /><span className="text-primary">Intelligence</span></h1>
                    <p className="text-muted-foreground text-sm font-black uppercase tracking-[0.4em] opacity-40">Ready to decrypt ingredients</p>
                </div>
                <Button onClick={() => setIsScannerActive(true)} className="h-24 px-12 rounded-[2.5rem] bg-primary text-background text-2xl font-black uppercase tracking-tighter hover:scale-105 transition-all shadow-3xl w-full">
                    Launch Lens <Zap className="ml-3 fill-current" />
                </Button>
            </div>
        )}

        {isScannerActive && (
            <div className="flex flex-col items-center space-y-10">
                <div className="relative w-full aspect-[4/5] bg-black rounded-[4rem] overflow-hidden border-8 border-primary/20 shadow-3xl preserve-3d">
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-8 left-8 flex items-center gap-3">
                            <Activity size={16} className="text-primary animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Lens Active</span>
                        </div>
                        <div className="absolute inset-16 border-2 border-primary/40 rounded-[3rem] animate-pulse" />
                        <div className="absolute bottom-8 inset-x-0 flex justify-center">
                            <span className="px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest">Align Barcode</span>
                        </div>
                    </div>
                </div>
                <Button variant="ghost" onClick={() => setIsScannerActive(false)} className="text-[10px] font-black uppercase tracking-widest">
                    <X size={14} className="mr-2" /> Stop Session
                </Button>
            </div>
        )}

        {state.type === 'success' && <RiskResultCard state={state} />}

        {state.type === 'error' && (
            <div className="space-y-8 text-center">
                <div className="p-16 rounded-[4rem] glass-panel border-destructive/20 space-y-6">
                    <CircleAlert size={64} className="text-destructive mx-auto" />
                    <h2 className="text-4xl font-black uppercase tracking-tighter">Decryption Failed</h2>
                    <p className="text-muted-foreground font-medium">{state.errorMessage}</p>
                </div>
                <Button onClick={() => setIsScannerActive(true)} className="h-20 w-full rounded-[2.5rem] bg-primary text-background text-xl font-black uppercase tracking-tighter">Try Again</Button>
            </div>
        )}
    </div>
  );
}
