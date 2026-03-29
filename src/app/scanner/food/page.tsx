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
import { Loader2, Camera, CameraOff, CircleAlert, ArrowLeft, RefreshCw, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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

  // Effect for starting camera when switching to viewfinder
  useEffect(() => {
    if (step === 'viewfinder') {
      startCamera();
    } else {
      stopCamera();
    }
    // Cleanup on unmount
    return () => stopCamera();
  }, [step]);


  useEffect(() => {
    if (state.type === 'error') {
        toast({
            variant: 'destructive',
            title: 'Analysis Failed',
            description: state.errorMessage,
        });
    } else if (state.type === 'success') {
        setStep('viewfinder'); // This is a bit of a hack to hide the form and show the result view
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
    startTransition(() => {
        formAction(formData);
    });
    setCapturedImage(null);
    setStep('viewfinder');
  }

  const handleRetake = () => {
    setCapturedImage(null);
    setStep('viewfinder');
  }
  
  const submitAction = (formData: FormData) => {
    if (userProfile?.healthReport) {
        formData.append('healthReport', userProfile.healthReport);
    }
    if (capturedImage) {
        formData.append('capturedImage', capturedImage);
    }
    startTransition(() => {
        formAction(formData);
    });
  }

  if (isUserLoading || isProfileLoading) {
    return <div className="flex justify-center items-center h-full"><Loader2 className="animate-spin" size={48} /></div>;
  }

  if (!user) {
    return null; // Will be redirected
  }

  return (
    <div className="w-full max-w-2xl text-center">
        {isPending && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 z-20">
                <Loader2 className="animate-spin h-12 w-12 text-primary" />
                <p className="mt-4 font-semibold text-lg">Analyzing your food...</p>
            </div>
        )}

        {state.type !== 'success' && step === 'viewfinder' && (
             <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-2xl">Scan Food Product</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
                        <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                        <canvas ref={canvasRef} className="hidden" />

                        {hasCameraPermission === undefined && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-4">
                                <Loader2 className="animate-spin size-12 mb-2" />
                                <p>Starting camera...</p>
                            </div>
                        )}

                        {hasCameraPermission === false && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-4 text-center">
                                <CameraOff className="size-12 mb-2" />
                                <p className='font-semibold'>Camera access denied.</p>
                                <p className='text-sm text-muted-foreground'>Please enable camera permissions.</p>
                            </div>
                        )}
                    </div>
                    <Button onClick={handleCapture} size="lg" disabled={!hasCameraPermission || isPending}>
                        <Camera className="mr-2" />
                        Capture Photo
                    </Button>
                </CardContent>
            </Card>
        )}
        
        {state.type !== 'success' && step === 'form' && capturedImage && (
            <Card className="w-full text-left">
                <CardHeader>
                    <CardTitle>Confirm & Analyze</CardTitle>
                    <CardDescription>
                        The AI will analyze this image to identify the product and its ingredients. You can provide extra details below to improve accuracy.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={submitAction} className="space-y-4">
                        <Image src={capturedImage} alt="Captured food product" width={640} height={480} className="rounded-lg mb-4" />
                        <div className="space-y-1">
                            <Label htmlFor="productName">Product Name (optional)</Label>
                            <Input id="productName" name="productName" placeholder="AI will try to identify this from the image" disabled={isPending}/>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="ingredients">Ingredients (optional)</Label>
                            <Textarea id="ingredients" name="ingredients" placeholder="Help the AI by providing ingredients if you can see them." rows={4} disabled={isPending}/>
                            <p className="text-xs text-muted-foreground">Separate ingredients with a comma, period, or new line.</p>
                        </div>
                        <div className="flex gap-4">
                            <Button type="button" variant="outline" onClick={handleRetake} className="w-full" disabled={isPending}>
                                <RefreshCw className="mr-2" />
                                Retake
                            </Button>
                            <Button type="submit" className="w-full" disabled={isPending}>Analyze with AI</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        )}


        {state.type === 'success' && (
             <div className="w-full space-y-4">
                <RiskResultCard state={state} />
                <Button onClick={resetAll} className="w-full mt-4">
                    Scan Another Food
                </Button>
            </div>
        )}

         {state.type === 'error' && (
             <div className="w-full space-y-4 text-left">
                <Alert variant="destructive">
                    <CircleAlert className="h-4 w-4" />
                    <AlertTitle>Analysis Failed</AlertTitle>
                    <AlertDescription>
                        {state.errorMessage || "Could not analyze the food product. Please try again."}
                    </AlertDescription>
                </Alert>
                 {state.aiNotes && (
                  <Alert variant="default">
                      <Lightbulb className="h-4 w-4" />
                      <AlertTitle>AI Note</AlertTitle>
                      <AlertDescription>
                          {state.aiNotes}
                      </AlertDescription>
                  </Alert>
              )}
                <Button onClick={resetAll} className="w-full mt-4">
                    Try Again
                </Button>
            </div>
        )}

        <Link href="/" className="inline-block mt-8 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="inline-block mr-1 h-4 w-4" />
            Back to Home
        </Link>
    </div>
  );
}
