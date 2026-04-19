
'use client';

import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, Float, MeshDistortMaterial, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Realistic 3D Human Biometric Viewer
 * 
 * This component uses Three.js (React Three Fiber) to render a high-fidelity
 * biological model. It is designed to show the specific organs and systems
 * affected by scanned food hazards.
 */

function AnatomyModel({ rotationY }: { rotationY: number }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = rotationY;
    }
  });

  return (
    <group ref={meshRef}>
      {/* 
        ARCHITECTURAL PLACEHOLDER FOR GLB MODEL
        In a production environment, use useGLTF() to load a professional 
        human anatomy model (muscles, organs, nervous system).
      */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[1, 3.5, 32, 64]} />
        <MeshDistortMaterial 
          color="#7C43F1" 
          speed={2} 
          distort={0.2} 
          radius={1} 
          opacity={0.1} 
          transparent 
        />
      </mesh>

      {/* HAZARD NODES - HIGHLIGHTED BIO-SYSTEMS */}
      <mesh position={[0, 1.2, 0.8]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial 
            color="#B9FF61" 
            emissive="#B9FF61" 
            emissiveIntensity={2} 
          />
      </mesh>
      
      <mesh position={[0.4, 0.5, 0.7]}>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial 
            color="#E53935" 
            emissive="#E53935" 
            emissiveIntensity={3} 
          />
      </mesh>

      <mesh position={[-0.3, -0.4, 0.6]}>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial 
            color="#F4A261" 
            emissive="#F4A261" 
            emissiveIntensity={1.5} 
          />
      </mesh>
    </group>
  );
}

export function ClinicalHumanCore() {
  const [rotation, setRotation] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setRotation(window.scrollY * 0.005);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] bg-[#F6F4FB] pointer-events-none">
      <Canvas shadows camera={{ position: [0, 0, 12], fov: 35 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow />
        
        <Suspense fallback={null}>
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
          >
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
              <AnatomyModel rotationY={rotation} />
            </Float>
          </PresentationControls>
          
          <ContactShadows position={[0, -4.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>

      {/* CLINICAL DATA OVERLAY */}
      <div className="absolute inset-0 flex items-center justify-between px-12 opacity-20 pointer-events-none">
        <div className="h-full w-px bg-primary/20 flex flex-col justify-around">
            {[...Array(20)].map((_, i) => <div key={i} className="w-4 h-px bg-primary/40" />)}
        </div>
        <div className="h-full w-px bg-primary/20 flex flex-col justify-around">
            {[...Array(20)].map((_, i) => <div key={i} className="w-4 h-px bg-primary/40" />)}
        </div>
      </div>
    </div>
  );
}
