'use client';

import { useEffect, useRef, useState, startTransition, useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { analyzeBarcodeAction, type FormState } from './action';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { RiskResultCard } from '@/components/risk-result-card';
import { Loader2, ScanBarcode, CircleAlert, X, Zap, Activity, Barcode } from 'lucide-react';
import { BrowserMultiFormatReader } from '@zxing/library';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Badge } from '@/components/ui/badge';

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

  if (isUserLoading || isProfileLoading) return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
        <Loader2 className="animate-spin text-primary size-12 opacity-20" />
        <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Synchronizing Session...</span>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-24 pb-48 h-full flex flex-col items-center justify-center animate-iris">
        
        {state.type === 'initial' && !isScannerActive && (
            <div className="flex flex-col items-center justify-center text-center space-y-16 max-w-xl">
                <div className="relative size-64 group">
                    <div className="absolute inset-0 bg-primary/5 rounded-[4rem] border-2 border-primary/20 group-hover:scale-105 transition-all duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <ScanBarcode className="size-32 text-primary" />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-center gap-4">
                        <Badge variant="outline" className="px-4 py-1 text-[8px] font-black uppercase tracking-widest border-primary/30 text-primary">Protocol 01</Badge>
                        <span className="text-[8px] font-black uppercase tracking-[0.4em] opacity-30">Lens Active Status</span>
                    </div>
                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-none">
                        Barcode <br />
                        <span className="text-primary">Intelligence</span>
                    </h1>
                    <p className="text-muted-foreground text-xs font-black uppercase tracking-[0.5em] opacity-40 max-w-sm mx-auto leading-loose">
                        Structural ingredient decryption via global API synchronization.
                    </p>
                </div>

                <Button onClick={() => setIsScannerActive(true)} className="h-28 px-16 rounded-[3rem] bg-secondary text-white text-3xl font-black uppercase tracking-tighter hover:scale-105 transition-all shadow-xl w-full">
                    Initiate Lens <Zap className="ml-4 size-8 fill-current" />
                </Button>
            </div>
        )}

        {isScannerActive && (
            <div className="flex flex-col items-center space-y-12 w-full max-w-3xl">
                {/* STRUCTURAL RECTANGLE VIEWPORT */}
                <div className="relative w-full aspect-[4/5] md:aspect-video bg-black rounded-[4rem] overflow-hidden border-[16px] border-white/5 shadow-2xl transition-all duration-700">
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                    
                    {/* HUD OVERLAY LAYERS */}
                    <div className="absolute inset-0 pointer-events-none p-12">
                        {/* Top HUD */}
                        <div className="flex items-start justify-between">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <div className="size-2 rounded-full bg-primary animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">SYSTEM ACTIVE</span>
                                </div>
                                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/40">FOCAL LENS: 85MM</span>
                            </div>
                            <Badge className="bg-white/10 text-white rounded-md text-[9px] font-black uppercase px-4 py-1">UPC-DECODER</Badge>
                        </div>

                        {/* Structural Frame Brackets */}
                        <div className="absolute inset-16 border-2 border-primary/20 rounded-[3rem] animate-pulse">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-black text-primary text-[8px] font-black uppercase tracking-widest">
                                ALIGN SIGNATURE
                            </div>
                        </div>

                        {/* Bottom HUD */}
                        <div className="absolute bottom-12 inset-x-12 flex items-end justify-between">
                            <div className="flex flex-col gap-1">
                                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/40 opacity-60">LATENCY</span>
                                <span className="text-xl font-black text-white">0.02ms</span>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/40 opacity-60">BITRATE</span>
                                <span className="text-xl font-black text-white">4K-RAW</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-8">
                    <div className="flex items-center gap-6">
                        <Activity className="size-6 text-primary animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] opacity-40">Analyzing Structural Field</span>
                    </div>
                    <Button variant="ghost" onClick={() => setIsScannerActive(false)} className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 hover:opacity-100 transition-opacity">
                        <X size={14} className="mr-3" /> Terminate Session
                    </Button>
                </div>
            </div>
        )}

        {isPending && (
            <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white/80 backdrop-blur-xl animate-iris">
                <Loader2 className="animate-spin size-16 text-primary mb-8 opacity-20" />
                <h2 className="text-4xl font-black uppercase tracking-tighter">Decrypting Signature</h2>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40 mt-4">Cross-referencing Global Data</p>
            </div>
        )}

        {state.type === 'success' && <RiskResultCard state={state} />}

        {state.type === 'error' && (
            <div className="space-y-12 text-center max-w-lg">
                <div className="p-20 rounded-[4rem] glass-panel border-destructive/20 space-y-8 animate-iris">
                    <CircleAlert size={80} className="text-destructive mx-auto" />
                    <div className="space-y-4">
                        <h2 className="text-5xl font-black uppercase tracking-tighter">Signature Rejected</h2>
                        <p className="text-muted-foreground font-medium text-lg leading-relaxed">{state.errorMessage}</p>
                    </div>
                </div>
                <Button onClick={() => setIsScannerActive(true)} className="h-24 w-full rounded-[3rem] bg-primary text-background text-2xl font-black uppercase tracking-tighter hover:scale-105 transition-all shadow-xl">
                    Retry Protocol
                </Button>
            </div>
        )}
    </div>
  );
}