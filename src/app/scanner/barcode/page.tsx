'use client';

import { useEffect, useRef, useState, startTransition } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { analyzeBarcodeAction, type FormState } from './action';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { RiskResultCard } from '@/components/risk-result-card';
import { Loader2, ScanBarcode, CircleAlert, X, Zap } from 'lucide-react';
import { BrowserMultiFormatReader, NotFoundException, ChecksumException, FormatException } from '@zxing/library';
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
  const [hasPermission, setHasPermission] = useState<boolean | undefined>();
  const codeReaderRef = useRef(new BrowserMultiFormatReader());
  
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(() => {
      if (!user) return null;
      return doc(firestore, 'users', user.uid);
  }, [user, firestore]);
  
  const { data: userProfile, isLoading: isProfileLoading } = useDoc(userDocRef);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
  }, [user, isUserLoading, router]);

  const stopCamera = () => {
    if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
    }
    codeReaderRef.current.reset();
  }

  // Main scanner effect
  useEffect(() => {
    if (!isScannerActive || !videoRef.current) {
        stopCamera();
        return;
    }

    const codeReader = codeReaderRef.current;
    const videoElement = videoRef.current;
    
    const startScanner = async () => {
        setHasPermission(undefined);
        try {
            const constraints: MediaStreamConstraints = {
                video: { facingMode: 'environment' }
            };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            streamRef.current = stream;
            videoElement.srcObject = stream;
            
            // Wait for the video to start playing to get correct dimensions
            await videoElement.play();
            setHasPermission(true);

            codeReader.decodeFromStream(stream, videoElement, (result, err) => {
                if (isPending || !isScannerActive) return;

                if (result) {
                    const barcodeValue = result.getText();
                    if (barcodeValue) {
                        const formData = new FormData();
                        formData.append('barcode', barcodeValue);
                        formData.append('healthReport', userProfile?.healthReport || '');
                        startTransition(() => {
                            formAction(formData);
                        });
                        setIsScannerActive(false);
                    }
                }

                if (err && !(err instanceof NotFoundException || err instanceof ChecksumException || err instanceof FormatException)) {
                    console.error('Barcode decoding error:', err);
                }
            });
        } catch (err) {
            console.error('Error starting scanner:', err);
            setHasPermission(false);
            setIsScannerActive(false);
            if (err instanceof Error && (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError' || err.message.includes('permission denied'))) {
                toast({
                  variant: 'destructive',
                  title: 'Camera Access Needed',
                  description: 'Please enable camera permissions in your settings to scan barcodes.',
                });
             } else {
                toast({
                  variant: 'destructive',
                  title: 'Scanner Failed',
                  description: 'Could not start the camera. Please try again.',
                });
             }
        }
    };
    
    startScanner();

    // Cleanup function
    return () => {
      stopCamera();
    };
  }, [isScannerActive, formAction, isPending, userProfile, toast]);

  useEffect(() => {
    if (state.type === 'error') {
        toast({
            variant: 'destructive',
            title: 'Scan Failed',
            description: state.errorMessage,
        });
    }
  }, [state, toast]);

  const resetScanner = () => {
      const formData = new FormData();
      formData.append('barcode', 'reset');
      startTransition(() => {
        formAction(formData);
      });
      setIsScannerActive(true);
  }

  if (isUserLoading || isProfileLoading) {
    return (
        <div className="flex flex-col justify-center items-center h-[80vh] gap-8">
            <Loader2 className="animate-spin text-primary size-24 opacity-20" />
            <p className="text-2xl font-black font-headline tracking-tighter uppercase opacity-50 italic">Opening Lens...</p>
        </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-12">
        
        {state.type === 'initial' && !isScannerActive && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-12 animate-reveal">
                <div className="size-48 rounded-[3.5rem] bg-secondary/10 border-4 border-primary/20 flex items-center justify-center relative group">
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-1000" />
                    <ScanBarcode className="size-24 text-primary relative z-10" />
                </div>
                <div className="space-y-4">
                    <h1 className="text-7xl font-black font-headline tracking-tighter italic leading-none">Scan a <br /> <span className="text-primary">Product</span></h1>
                    <p className="text-muted-foreground text-2xl font-light max-w-lg leading-relaxed">Ready to analyze food ingredients based on your health profile.</p>
                </div>
                <Button onClick={() => setIsScannerActive(true)} size="xl" className="h-32 px-16 rounded-[3rem] text-3xl font-black shadow-3xl hover-lift bg-primary text-white group">
                    Launch Scanner <Zap className="ml-4 size-10 group-hover:rotate-12 transition-transform" />
                </Button>
            </div>
        )}

        {isScannerActive && (
            <div className="w-full flex flex-col items-center space-y-10 animate-reveal">
                <div className="relative w-full aspect-[9/12] max-w-md bg-black rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-8 border-primary/20 group">
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                    
                    {/* HUD Overlays */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-12 left-12 flex items-center gap-4 text-white/50">
                            <Zap size={20} className="animate-pulse" />
                            <span className="text-xs font-black uppercase tracking-[0.4em]">Lens v3.0 Active</span>
                        </div>
                        
                        <div className="absolute inset-20 border-2 border-white/20 rounded-[3rem] animate-pulse">
                            <div className="absolute inset-[-4px] border-4 border-primary rounded-[3rem] opacity-40 animate-pulse" />
                        </div>

                        <div className="absolute bottom-12 inset-x-0 flex justify-center">
                            <div className="px-6 py-2 rounded-full glass border-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] animate-reveal">
                                Align Barcode in Frame
                            </div>
                        </div>
                    </div>

                    {hasPermission === undefined && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white p-8">
                            <Loader2 className="animate-spin size-16 mb-4 text-primary" />
                            <p className="text-xl font-bold font-headline tracking-tight uppercase">Accessing Camera...</p>
                        </div>
                    )}
                    
                    {isPending && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 pointer-events-none text-white z-50">
                            <div className="relative">
                                <Loader2 className="animate-spin h-24 w-24 text-primary opacity-20" />
                                <div className="absolute inset-0 m-auto size-10 bg-primary rounded-full animate-pulse" />
                            </div>
                            <p className="mt-8 text-3xl font-black font-headline tracking-tighter uppercase italic">Analyzing Ingredients...</p>
                        </div>
                    )}
                </div>
                
                <Button variant="ghost" size="lg" onClick={() => setIsScannerActive(false)} className="h-16 px-10 rounded-full border-2 border-primary/10 text-lg font-bold hover:bg-destructive hover:text-white hover:border-destructive transition-all">
                    <X className="mr-2" /> Stop Scan
                </Button>
            </div>
        )}

        {state.type === 'success' && (
             <div className="w-full max-w-2xl mx-auto pb-40">
                <RiskResultCard state={state} />
                <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50">
                    <Button onClick={resetScanner} size="xl" className="h-24 px-12 rounded-[2rem] bg-background border-2 border-primary text-primary text-xl font-black hover:bg-primary hover:text-white transition-all shadow-3xl">
                        Scan Another Item
                    </Button>
                </div>
            </div>
        )}

         {state.type === 'error' && (
             <div className="w-full max-w-2xl mx-auto space-y-8 animate-reveal">
                <div className="p-16 rounded-[4rem] bg-destructive/5 border-4 border-destructive/20 text-center space-y-8">
                    <div className="size-24 rounded-3xl bg-destructive text-white flex items-center justify-center mx-auto shadow-2xl">
                        <CircleAlert size={48} />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-4xl font-black font-headline tracking-tighter italic">Analysis Failed</h2>
                        <p className="text-xl text-muted-foreground font-light">{state.errorMessage || "The product information could not be found."}</p>
                    </div>
                </div>
                <Button onClick={resetScanner} size="xl" className="w-full h-24 rounded-[2.5rem] bg-primary text-white text-2xl font-black hover-lift">
                    Try New Scan
                </Button>
            </div>
        )}
    </div>
  );
}
