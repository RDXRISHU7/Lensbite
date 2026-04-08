'use client';

import { useEffect, useRef, useState, startTransition } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { analyzeFoodProductAction, type FormState } from './action';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RiskResultCard } from '@/components/risk-result-card';
import { Loader2, Camera, CameraOff, CircleAlert, ArrowLeft, RefreshCw, Lightbulb, Zap, Activity } from 'lucide-react';
import Link from 'next/link';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

const initialState: FormState = { type: 'initial' };

export default function FoodScannerPage() {
  const [state, formAction, isPending] = useActionState(analyzeFoodProductAction, initialState);
  const router = useRouter();
  const { toast } = useToast();
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const [step, setStep] = useState<'viewfinder' | 'form'>('viewfinder');
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | undefined>();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

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
  }

  const startCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasCameraPermission(true);
      } catch (error) {
        console.error("Error accessing camera: ", error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings.',
        });
      }
    }
  };

  useEffect(() => {
    if (step === 'viewfinder') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [step]);


  useEffect(() => {
    if (state.type === 'error') {
        toast({ variant: 'destructive', title: 'Analysis Failed', description: state.errorMessage });
    } else if (state.type === 'success') {
        setStep('viewfinder');
    }
  }, [state, toast]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(dataUrl);
      setStep('form');
    }
  };

  const resetAll = () => {
    const formData = new FormData();
    formData.append('reset', 'true');
    startTransition(() => { formAction(formData); });
    setCapturedImage(null);
    setStep('viewfinder');
  }

  const handleRetake = () => {
    setCapturedImage(null);
    setStep('viewfinder');
  }
  
  const submitAction = (formData: FormData) => {
    if (userProfile?.healthReport) formData.append('healthReport', userProfile.healthReport);
    if (capturedImage) formData.append('capturedImage', capturedImage);
    startTransition(() => { formAction(formData); });
  }

  if (isUserLoading || isProfileLoading) {
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-6">
            <Loader2 className="animate-spin text-primary size-12 opacity-20" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Synchronizing Session...</span>
        </div>
    );
  }

  if (!user) return null;

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-24 pb-48 flex flex-col items-center justify-center animate-iris">
        {isPending && (
            <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white/80 backdrop-blur-xl animate-iris">
                <Loader2 className="animate-spin size-16 text-primary mb-8 opacity-20" />
                <h2 className="text-4xl font-black uppercase tracking-tighter">AI Analysis Protocol</h2>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40 mt-4">Extracting Visual Metadata</p>
            </div>
        )}

        {state.type !== 'success' && step === 'viewfinder' && (
             <div className="w-full max-w-3xl space-y-12">
                <div className="text-center space-y-4">
                    <Badge variant="outline" className="px-4 py-1 text-[8px] font-black uppercase tracking-widest border-primary/30 text-primary">Protocol 02</Badge>
                    <h1 className="text-7xl md:text-8xl font-black tracking-tighter uppercase leading-none">Vision <span className="text-primary">Scanner</span></h1>
                </div>

                <div className="relative w-full aspect-[4/5] md:aspect-video bg-black rounded-[4rem] overflow-hidden border-[16px] border-white/5 shadow-2xl">
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                    <canvas ref={canvasRef} className="hidden" />

                    {/* HUD OVERLAY */}
                    <div className="absolute inset-0 pointer-events-none p-12">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="size-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">READY</span>
                            </div>
                            <Badge className="bg-white/10 text-white rounded-md text-[9px] font-black uppercase px-4 py-1">MULTIMODAL-v.4</Badge>
                        </div>
                        <div className="absolute inset-16 border-2 border-white/10 rounded-[3rem] animate-pulse" />
                    </div>

                    {hasCameraPermission === false && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-4 text-center">
                            <CameraOff className="size-12 mb-2" />
                            <p className='font-black uppercase tracking-widest'>Access Denied</p>
                        </div>
                    )}
                </div>

                <Button onClick={handleCapture} className="h-28 px-16 rounded-[3rem] bg-secondary text-white text-3xl font-black uppercase tracking-tighter hover:scale-105 transition-all shadow-xl w-full" disabled={!hasCameraPermission || isPending}>
                    Capture <Camera className="ml-4 size-8" />
                </Button>
            </div>
        )}
        
        {state.type !== 'success' && step === 'form' && capturedImage && (
            <div className="w-full max-w-2xl space-y-8 animate-iris">
                <div className="p-8 rounded-[3rem] bg-white border border-border shadow-2xl space-y-8">
                    <div className="relative aspect-video rounded-3xl overflow-hidden border-4 border-muted/50">
                        <Image src={capturedImage} alt="Captured food product" fill className="object-cover" />
                    </div>
                    
                    <form action={submitAction} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="productName" className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Product Name (Optional)</Label>
                            <Input id="productName" name="productName" placeholder="Identify Automatically..." className="h-16 rounded-2xl bg-muted/30 border-none font-black uppercase tracking-widest px-6" disabled={isPending}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="ingredients" className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-2">Supplementary Ingredients (Optional)</Label>
                            <Textarea id="ingredients" name="ingredients" placeholder="Assist AI Extraction..." rows={4} className="rounded-3xl bg-muted/30 border-none font-bold uppercase p-6" disabled={isPending}/>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <Button type="button" variant="outline" onClick={handleRetake} className="h-20 rounded-2xl font-black uppercase tracking-widest border-2" disabled={isPending}>
                                <RefreshCw className="mr-3" /> Retake
                            </Button>
                            <Button type="submit" className="h-20 rounded-2xl bg-primary text-background text-xl font-black uppercase tracking-tighter" disabled={isPending}>
                                Analyze AI
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )}


        {state.type === 'success' && (
             <div className="w-full space-y-8">
                <RiskResultCard state={state} />
                <Button onClick={resetAll} className="h-20 rounded-full bg-black text-white text-xl font-black uppercase tracking-widest hover:bg-primary transition-all w-full max-w-md mx-auto flex">
                    Scan New Protocol
                </Button>
            </div>
        )}

         {state.type === 'error' && (
             <div className="w-full max-w-lg space-y-12 text-center">
                <div className="p-20 rounded-[4rem] glass-panel border-destructive/20 space-y-8 animate-iris">
                    <CircleAlert size={80} className="text-destructive mx-auto" />
                    <div className="space-y-4">
                        <h2 className="text-5xl font-black uppercase tracking-tighter">Extraction Failed</h2>
                        <p className="text-muted-foreground font-medium text-lg leading-relaxed">{state.errorMessage}</p>
                    </div>
                </div>
                <Button onClick={resetAll} className="h-24 w-full rounded-[3rem] bg-primary text-background text-2xl font-black uppercase tracking-tighter hover:scale-105 transition-all shadow-xl">
                    Retry Protocol
                </Button>
            </div>
        )}

        <Link href="/" className="fixed bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] opacity-40 hover:opacity-100 transition-opacity">
            <ArrowLeft size={14} /> Back to Command Center
        </Link>
    </div>
  );
}