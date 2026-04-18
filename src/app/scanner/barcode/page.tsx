'use client';

import { useEffect, useRef, useState, startTransition, useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { analyzeBarcodeAction, type FormState } from './action';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { RiskResultCard } from '@/components/risk-result-card';
import { Loader2, ScanBarcode, CircleAlert, X, Activity, Info, ArrowLeft, Barcode } from 'lucide-react';
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
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Synchronizing Vault</span>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-24 flex flex-col items-center bg-[#F6F4FB] min-h-screen">
        
        {state.type === 'initial' && !isScannerActive && (
            <div className="w-full max-w-2xl space-y-16 py-12 animate-in fade-in duration-700">
                <div className="text-center space-y-6">
                    <Badge variant="outline" className="px-4 py-1 overline border-primary/20 text-primary bg-primary/5">Protocol 01</Badge>
                    <h1 className="text-6xl font-black uppercase tracking-tight font-['Space_Grotesk']">
                      Barcode <br/><span className="text-primary">Decryption</span>
                    </h1>
                    <p className="text-lg text-[#3D3660] max-w-md mx-auto font-medium leading-relaxed">
                        Align any food product barcode within the clinical viewfinder to initiate ingredient extraction.
                    </p>
                </div>

                <div className="bg-white border border-black/5 rounded-[24px] p-8 flex items-start gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                    <Info className="text-primary size-6 shrink-0 mt-0.5" />
                    <p className="text-sm text-[#3D3660] leading-relaxed font-medium">
                        Using verified UPC-A and EAN-13 data signatures. Your results are cross-referenced with your active health architecture.
                    </p>
                </div>

                <Button onClick={() => setIsScannerActive(true)} className="h-20 w-full rounded-[16px] bg-[#7C43F1] text-white text-xl font-bold uppercase tracking-widest hover:bg-[#7C43F1]/90 shadow-lg transition-all active:scale-95">
                    Start Decryption Scan
                </Button>

                <div className="flex justify-center gap-8">
                    <Link href="/" className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] hover:text-primary transition-colors flex items-center gap-2">
                        <ArrowLeft size={14} /> Back
                    </Link>
                    <Link href="/scanner/food" className="text-[10px] font-black text-primary uppercase tracking-[0.3em] hover:opacity-80 transition-opacity">
                        Vision AI Mode
                    </Link>
                </div>
            </div>
        )}

        {isScannerActive && (
            <div className="w-full max-w-3xl space-y-12 py-8 animate-in fade-in zoom-in duration-500">
                <div className="relative w-full aspect-square md:aspect-video bg-black rounded-[32px] overflow-hidden border-[8px] border-white shadow-2xl">
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                    
                    {/* Viewfinder Overlay */}
                    <div className="absolute inset-0 pointer-events-none p-12">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="size-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-[10px] font-bold text-white uppercase tracking-[0.4em]">Signal Active</span>
                            </div>
                            <div className="px-3 py-1 bg-white/10 rounded-full text-[9px] font-bold text-white overline">EAN-13 / UPC-A</div>
                        </div>

                        <div className="absolute inset-x-20 inset-y-12 md:inset-x-32 md:inset-y-16 border-2 border-primary/40 rounded-[24px]">
                             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-primary text-white text-[9px] font-bold uppercase tracking-widest rounded-full">
                                Target Area
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-8">
                    <div className="flex items-center gap-4">
                        <Activity className="size-5 text-primary animate-pulse" />
                        <span className="text-xs font-black text-[#3D3660] uppercase tracking-[0.3em]">Analyzing Signal...</span>
                    </div>
                    <Button variant="outline" onClick={() => setIsScannerActive(false)} className="rounded-full h-14 px-12 border-black/10 text-[11px] font-black uppercase tracking-[0.2em] bg-white shadow-sm hover:bg-muted">
                        <X size={16} className="mr-2" /> Abort Protocol
                    </Button>
                </div>
            </div>
        )}

        {isPending && (
            <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white/90 backdrop-blur-md animate-in fade-in duration-300">
                <Loader2 className="animate-spin size-12 text-primary mb-8" />
                <h2 className="text-3xl font-black uppercase tracking-tight font-['Space_Grotesk']">Processing Metadata</h2>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] mt-3">Connecting to Open Food Facts API</p>
            </div>
        )}

        {state.type === 'success' && (
          <div className="w-full max-w-4xl animate-in slide-in-from-bottom-12 duration-700">
            <RiskResultCard state={state} />
            <div className="mt-12 flex justify-center">
              <Button onClick={() => startTransition(() => { formAction(new FormData()); })} className="h-16 px-12 rounded-full bg-black text-white overline font-bold tracking-widest">
                Scan New Product
              </Button>
            </div>
          </div>
        )}

        {state.type === 'error' && (
            <div className="w-full max-w-xl space-y-12 py-12 animate-in fade-in duration-500">
                <div className="bg-white border border-red-500/10 rounded-[32px] p-16 text-center space-y-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                    <CircleAlert size={64} className="text-red-500 mx-auto" />
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold uppercase font-['Space_Grotesk']">Signal Failed</h2>
                        <p className="text-[#3D3660] font-medium leading-relaxed">{state.errorMessage}</p>
                    </div>
                </div>
                <Button onClick={() => setIsScannerActive(true)} className="h-20 w-full rounded-[16px] bg-[#7C43F1] text-white text-lg font-bold uppercase tracking-widest hover:bg-[#7C43F1]/90 shadow-lg">
                    Retry Decryption
                </Button>
            </div>
        )}
    </div>
  );
}
