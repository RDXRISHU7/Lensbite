'use client';

import { useEffect, useRef, useState, startTransition, useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { analyzeBarcodeAction, type FormState } from './action';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { RiskResultCard } from '@/components/risk-result-card';
import { Loader2, ScanBarcode, CircleAlert, X, Zap, Activity, Info } from 'lucide-react';
import { BrowserMultiFormatReader } from '@zxing/library';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

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
        toast({ variant: 'destructive', title: 'Scanner Error', description: 'Could not access camera.' });
      }
    };
    startScanner();
    return () => stopCamera();
  }, [isScannerActive, formAction, isPending, userProfile, toast]);

  if (isUserLoading || isProfileLoading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
        <Loader2 className="animate-spin text-primary size-8" />
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Accessing Medical Data</span>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-12 pb-32 flex flex-col items-center page-fade-in">
        
        {state.type === 'initial' && !isScannerActive && (
            <div className="w-full space-y-12 py-12">
                <div className="text-center space-y-4">
                    <div className="size-20 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mx-auto">
                        <ScanBarcode size={40} />
                    </div>
                    <h1 className="text-3xl font-bold">Initialize Scanner</h1>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                        Scan any food product barcode to begin the clinical risk assessment protocol.
                    </p>
                </div>

                <div className="medical-card p-6 flex items-start gap-4 bg-primary/5 border-primary/10">
                    <Info className="text-primary size-5 shrink-0 mt-1" />
                    <p className="text-sm text-primary leading-relaxed">
                        <strong>Privacy Notice:</strong> Your scan history is encrypted and only accessible through your secure biometric vault.
                    </p>
                </div>

                <Button onClick={() => setIsScannerActive(true)} className="scanner-btn h-16 w-full text-lg shadow-md">
                    Start Scan Protocol
                </Button>

                <div className="flex justify-center">
                    <Link href="/scanner/food" className="text-xs font-bold text-muted-foreground uppercase tracking-widest hover:text-primary transition-colors">
                        Use Vision AI Instead
                    </Link>
                </div>
            </div>
        )}

        {isScannerActive && (
            <div className="w-full space-y-8 py-8 animate-in fade-in zoom-in duration-500">
                <div className="relative w-full aspect-square md:aspect-video bg-black rounded-[20px] overflow-hidden shadow-xl border-4 border-white">
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                    
                    <div className="absolute inset-0 pointer-events-none p-6">
                        <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-secondary animate-pulse" />
                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Scanner Active</span>
                        </div>

                        <div className="absolute inset-12 border-2 border-secondary/50 rounded-2xl">
                             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 bg-secondary text-white text-[8px] font-bold uppercase tracking-widest rounded-full">
                                Align Barcode
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-6">
                    <div className="flex items-center gap-3">
                        <Activity className="size-4 text-secondary animate-pulse" />
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Decoding Signature...</span>
                    </div>
                    <Button variant="outline" onClick={() => setIsScannerActive(false)} className="rounded-lg h-10 border-border text-xs font-bold uppercase">
                        <X size={14} className="mr-2" /> Cancel
                    </Button>
                </div>
            </div>
        )}

        {isPending && (
            <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm page-fade-in">
                <Loader2 className="animate-spin size-12 text-primary mb-6" />
                <h2 className="text-2xl font-bold">Analyzing Product</h2>
                <p className="text-sm text-muted-foreground mt-2">Connecting to clinical database...</p>
            </div>
        )}

        {state.type === 'success' && <RiskResultCard state={state} />}

        {state.type === 'error' && (
            <div className="w-full space-y-8 py-12">
                <div className="medical-card p-12 text-center border-destructive/20 space-y-6">
                    <CircleAlert size={64} className="text-destructive mx-auto" />
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold">Analysis Failed</h2>
                        <p className="text-muted-foreground">{state.errorMessage}</p>
                    </div>
                </div>
                <Button onClick={() => setIsScannerActive(true)} className="scanner-btn h-14 w-full text-base">
                    Try Again
                </Button>
            </div>
        )}
    </div>
  );
}