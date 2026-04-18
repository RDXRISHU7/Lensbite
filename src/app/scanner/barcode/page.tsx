'use client';

import { useEffect, useRef, useState, startTransition, useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { analyzeBarcodeAction, type FormState } from './action';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { RiskResultCard } from '@/components/risk-result-card';
import { Loader2, ScanBarcode, CircleAlert, X, Activity, Info } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#F6F4FB]">
        <Loader2 className="animate-spin text-primary size-8" />
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Accessing Medical Data</span>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-12 pb-32 flex flex-col items-center page-fade-in">
        
        {state.type === 'initial' && !isScannerActive && (
            <div className="w-full space-y-12 py-12">
                <div className="text-center space-y-6">
                    <Badge variant="outline" className="px-4 py-1 overline border-black/10 text-muted-foreground">Protocol 01</Badge>
                    <h1 className="text-5xl font-black uppercase tracking-tight">Scanner <span className="text-primary">Ready</span></h1>
                    <p className="text-muted-foreground max-w-sm mx-auto font-medium">
                        Align any food product barcode within the clinical viewfinder to begin analysis.
                    </p>
                </div>

                <div className="clinical-card p-6 flex items-start gap-4 bg-primary/5 border-primary/10">
                    <Info className="text-primary size-5 shrink-0 mt-1" />
                    <p className="text-sm text-primary leading-relaxed">
                        Your scan history is encrypted and stored in your private clinical vault.
                    </p>
                </div>

                <Button onClick={() => setIsScannerActive(true)} className="scanner-btn h-16 w-full text-lg shadow-sm">
                    Start Scan Protocol
                </Button>

                <div className="flex justify-center">
                    <Link href="/scanner/food" className="text-xs font-bold text-muted-foreground uppercase tracking-widest hover:text-primary transition-colors">
                        Use Vision AI Mode
                    </Link>
                </div>
            </div>
        )}

        {isScannerActive && (
            <div className="w-full space-y-8 py-8 animate-in fade-in zoom-in duration-500">
                <div className="relative w-full aspect-square md:aspect-video bg-black rounded-[24px] overflow-hidden shadow-2xl">
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                    
                    <div className="absolute inset-0 pointer-events-none p-6">
                        <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-accent animate-pulse" />
                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Scanner Active</span>
                        </div>

                        <div className="absolute inset-12 border-2 border-white/20 rounded-[24px]">
                             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 bg-accent text-black text-[8px] font-bold uppercase tracking-widest rounded-full">
                                Align Target
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-6">
                    <div className="flex items-center gap-3">
                        <Activity className="size-4 text-primary animate-pulse" />
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Analyzing Stream...</span>
                    </div>
                    <Button variant="outline" onClick={() => setIsScannerActive(false)} className="rounded-xl h-12 px-8 border-black/10 text-xs font-bold uppercase tracking-widest">
                        <X size={14} className="mr-2" /> End Session
                    </Button>
                </div>
            </div>
        )}

        {isPending && (
            <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm page-fade-in">
                <Loader2 className="animate-spin size-12 text-primary mb-6" />
                <h2 className="text-2xl font-black uppercase">Decryption Logic</h2>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-2">Connecting to Clinical Database</p>
            </div>
        )}

        {state.type === 'success' && <RiskResultCard state={state} />}

        {state.type === 'error' && (
            <div className="w-full space-y-8 py-12">
                <div className="clinical-card p-12 text-center border-red-500/10 space-y-6">
                    <CircleAlert size={64} className="text-red-500 mx-auto" />
                    <div className="space-y-2">
                        <h2 className="text-2xl font-black uppercase">Signal Lost</h2>
                        <p className="text-muted-foreground font-medium">{state.errorMessage}</p>
                    </div>
                </div>
                <Button onClick={() => setIsScannerActive(true)} className="scanner-btn h-14 w-full text-base">
                    Retry Scan
                </Button>
            </div>
        )}
    </div>
  );
}