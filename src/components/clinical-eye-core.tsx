'use client';

import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Environment, 
  ContactShadows, 
  Float, 
  PresentationControls, 
  useGLTF, 
  Html
} from '@react-three/drei';
import * as THREE from 'three';

/**
 * Bio-Digital Eye Core v12.0 | High-Fidelity GLTF Loader with Fallback
 * 
 * This component renders a realistic 3D Eye model.
 * It expects a file at /public/eye_model.glb.
 * Now includes error handling to prevent runtime crashes if file is missing.
 */

function EyeModel({ rotationY, dilation }: { rotationY: number, dilation: number }) {
  const [error, setError] = useState(false);
  const groupRef = useRef<THREE.Group>(null);

  // We attempt to load the model. If it fails (404), we set the error state.
  // We use a try-catch block inside a useEffect or handle it via the hook's behavior.
  let model: any = null;
  try {
    model = useGLTF('/eye_model.glb', true);
  } catch (e) {
    // This will be caught by the Suspense boundary or we can handle it here if not using Suspense.
    console.warn("Eye model not found at /public/eye_model.glb. Displaying placeholder.");
  }

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotationY;
      // Bio-mechanical dilation mapping
      const s = dilation;
      groupRef.current.scale.set(s, s, s);
    }
  });

  if (!model || !model.scene) {
    return (
      <mesh ref={groupRef as any}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial 
          color="#7C43F1" 
          transparent 
          opacity={0.1} 
          wireframe 
        />
        <Html center>
          <div className="flex flex-col items-center gap-2 pointer-events-none">
            <div className="px-6 py-2 bg-white/40 backdrop-blur-md rounded-full border border-white/50 shadow-xl">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary whitespace-nowrap">
                Awaiting eye_model.glb
              </span>
            </div>
          </div>
        </Html>
      </mesh>
    );
  }

  return <primitive object={model.scene} ref={groupRef} />;
}

export function ClinicalEyeCore() {
  const [rotation, setRotation] = useState(0);
  const [dilation, setDilation] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Map scroll to rotation and dilation
      setRotation(scrollY * 0.005);
      setDilation(1 + Math.min(scrollY / 1200, 0.4));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] bg-[#F6F4FB] pointer-events-none">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 35 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={<Html center><div className="overline animate-pulse">Synchronizing Optic...</div></Html>}>
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
              <EyeModel rotationY={rotation} dilation={dilation} />
            </Float>
          </PresentationControls>
          
          <ContactShadows position={[0, -4, 0]} opacity={0.3} scale={15} blur={2.5} far={4} />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>

      {/* CLINICAL DATA GRID OVERLAY */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-full h-full border-[0.5px] border-primary/20 bg-[radial-gradient(circle,rgba(124,67,241,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
    </div>
  );
}
