'use client';

import { useEffect, useRef, useState, startTransition } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { analyzeFoodProductAction, type FormState } from './action';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RiskResultCard } from '@/components/risk-result-card';
import { Loader2, Camera, CameraOff, CircleAlert, ArrowLeft, RefreshCw, Activity, Sparkles, X } from 'lucide-react';
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
        <div className="h-screen flex flex-col items-center justify-center gap-6 bg-[#F6F4FB]">
            <Loader2 className="animate-spin text-primary size-12 opacity-20" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Synchronizing Session...</span>
        </div>
    );
  }

  if (!user) return null;

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-24 flex flex-col items-center bg-[#F6F4FB] min-h-screen">
        {isPending && (
            <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white/90 backdrop-blur-md animate-in fade-in duration-300">
                <Loader2 className="animate-spin size-16 text-primary mb-12" />
                <h2 className="text-4xl font-black uppercase tracking-tight font-['Space_Grotesk']">Vision AI Processing</h2>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mt-4">Analyzing Visual Ingredient Signatures</p>
            </div>
        )}

        {state.type !== 'success' && step === 'viewfinder' && (
             <div className="w-full max-w-3xl space-y-16 py-12 animate-in fade-in duration-700">
                <div className="text-center space-y-6">
                    <Badge variant="outline" className="px-4 py-1 overline border-primary/20 text-primary bg-primary/5">Protocol 02</Badge>
                    <h1 className="text-6xl font-black uppercase tracking-tight font-['Space_Grotesk']">
                      Vision <span className="text-primary">Intelligence</span>
                    </h1>
                    <p className="text-lg text-[#3D3660] max-w-md mx-auto font-medium leading-relaxed">
                        Multimodal identification for products without barcodes. Captures visual data for high-fidelity OCR extraction.
                    </p>
                </div>

                <div className="relative w-full aspect-square md:aspect-video bg-black rounded-[40px] overflow-hidden border-[12px] border-white shadow-2xl group">
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                    <canvas ref={canvasRef} className="hidden" />

                    <div className="absolute inset-0 pointer-events-none p-12">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="size-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">VISION ACTIVE</span>
                            </div>
                            <Badge className="bg-white/10 text-white rounded-md text-[9px] font-black uppercase px-4 py-1 overline">Gemini 2.5 Flash</Badge>
                        </div>
                        <div className="absolute inset-16 border-2 border-white/10 rounded-[40px] animate-pulse" />
                    </div>

                    {hasCameraPermission === false && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-8 text-center">
                            <CameraOff className="size-16 mb-4 opacity-40" />
                            <p className='text-xl font-bold uppercase tracking-widest'>Camera Access Denied</p>
                        </div>
                    )}
                </div>

                <Button onClick={handleCapture} className="h-24 px-16 rounded-[24px] bg-[#7C43F1] text-white text-2xl font-bold uppercase tracking-widest hover:bg-[#7C43F1]/90 transition-all shadow-xl w-full active:scale-95" disabled={!hasCameraPermission || isPending}>
                    Capture Frame <Camera className="ml-4 size-8" />
                </Button>

                <div className="flex justify-center gap-8">
                    <Link href="/" className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] hover:text-primary transition-colors flex items-center gap-2">
                        <ArrowLeft size={14} /> Back
                    </Link>
                    <Link href="/scanner/barcode" className="text-[10px] font-black text-primary uppercase tracking-[0.3em] hover:opacity-80 transition-opacity">
                        Barcode Mode
                    </Link>
                </div>
            </div>
        )}
        
        {state.type !== 'success' && step === 'form' && capturedImage && (
            <div className="w-full max-w-2xl space-y-12 animate-in slide-in-from-bottom-12 duration-700">
                <div className="bg-white p-10 rounded-[32px] border border-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] space-y-10">
                    <div className="relative aspect-video rounded-[24px] overflow-hidden border-4 border-[#F6F4FB] group">
                        <Image src={capturedImage} alt="Captured food product" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Activity size={32} className="text-white animate-pulse" />
                        </div>
                    </div>
                    
                    <form action={submitAction} className="space-y-8">
                        <div className="space-y-3">
                            <Label htmlFor="productName" className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Identified Name (Optional)</Label>
                            <Input id="productName" name="productName" placeholder="Leave blank for AI detection..." className="h-16 rounded-[16px] bg-[#F6F4FB] border-none font-bold px-6 focus-visible:ring-primary" disabled={isPending}/>
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="ingredients" className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground ml-2">Manual Ingredient Assist (Optional)</Label>
                            <Textarea id="ingredients" name="ingredients" placeholder="Assist extraction if text is obscured..." rows={4} className="rounded-[24px] bg-[#F6F4FB] border-none font-medium p-6 focus-visible:ring-primary" disabled={isPending}/>
                        </div>
                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <Button type="button" variant="outline" onClick={handleRetake} className="h-20 rounded-[20px] overline font-black border-2 hover:bg-muted" disabled={isPending}>
                                <RefreshCw className="mr-3" /> Retake
                            </Button>
                            <Button type="submit" className="h-20 rounded-[20px] bg-[#7C43F1] text-white text-xl font-bold uppercase tracking-widest hover:bg-[#7C43F1]/90 shadow-lg" disabled={isPending}>
                                Start AI Analysis
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )}

        {state.type === 'success' && (
             <div className="w-full max-w-4xl space-y-12 animate-in slide-in-from-bottom-12 duration-700">
                <RiskResultCard state={state} />
                <div className="flex justify-center">
                  <Button onClick={resetAll} className="h-20 rounded-full bg-black text-white text-xl font-bold uppercase tracking-widest hover:bg-primary transition-all w-full max-w-md mx-auto shadow-xl">
                      Scan New Protocol
                  </Button>
                </div>
            </div>
        )}

         {state.type === 'error' && (
             <div className="w-full max-w-lg space-y-12 text-center animate-in fade-in duration-500">
                <div className="bg-white p-16 rounded-[40px] border border-red-500/10 space-y-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                    <CircleAlert size={80} className="text-red-500 mx-auto" />
                    <div className="space-y-4">
                        <h2 className="text-4xl font-bold uppercase font-['Space_Grotesk']">Analysis Failed</h2>
                        <p className="text-[#3D3660] font-medium leading-relaxed">{state.errorMessage}</p>
                    </div>
                </div>
                <Button onClick={resetAll} className="h-20 w-full rounded-[24px] bg-[#7C43F1] text-white text-2xl font-bold uppercase tracking-tight hover:scale-[1.02] transition-all shadow-xl">
                    Retry Protocol
                </Button>
            </div>
        )}
    </div>
  );
}
