'use client';

import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Environment, 
  ContactShadows, 
  Float, 
  PresentationControls, 
  useGLTF, 
  Html,
  Loader
} from '@react-three/drei';
import * as THREE from 'three';

/**
 * Bio-Digital Eye Core v11.0 | High-Fidelity GLTF Loader
 * 
 * This component renders a realistic 3D Eye model.
 * It expects a file at /public/eye_model.glb.
 */

function EyeModel({ rotationY, dilation }: { rotationY: number, dilation: number }) {
  // This hook will attempt to load the model from the public folder.
  // We use a try/catch or fallback since the file might not exist yet.
  const { scene } = useGLTF('/eye_model.glb', true) || { scene: null };
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotationY;
      // We simulate a mechanical/biological dilation by scaling the iris part
      // if we can find it in the model, otherwise we scale the whole group.
      groupRef.current.scale.set(dilation, dilation, dilation);
    }
  });

  if (!scene) {
    return (
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="#0F0A2A" transparent opacity={0.2} wireframe />
        <Html center>
          <div className="text-[10px] font-black uppercase tracking-[0.5em] text-primary whitespace-nowrap bg-white/40 p-4 rounded-full backdrop-blur-md">
            Waiting for eye_model.glb
          </div>
        </Html>
      </mesh>
    );
  }

  return <primitive object={scene} ref={groupRef} />;
}

export function ClinicalEyeCore() {
  const [rotation, setRotation] = useState(0);
  const [dilation, setDilation] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setRotation(scrollY * 0.005);
      // Map scroll to dilation (1.0 to 1.5)
      setDilation(1 + Math.min(scrollY / 1000, 0.5));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] bg-[#F6F4FB] pointer-events-none">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 35 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={<Html center><div className="overline animate-pulse">Initializing 3D Optic...</div></Html>}>
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
