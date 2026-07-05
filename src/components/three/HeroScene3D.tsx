'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Floating VERSE orb
function VerseOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={0.4}
          chromaticAberration={0.15}
          anisotropy={0.2}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color="#7c3aed"
          transmission={0.95}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
}

// Small orbiting tokens
function OrbitingToken({ radius, speed, offset, color }: { radius: number; speed: number; offset: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * speed + offset;
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.z = Math.sin(t) * radius;
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.3;
      meshRef.current.rotation.y = t * 2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[0.15, 0.15, 0.03, 32]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

// Mouse-follow parallax
function MouseParallax({ children }: { children: React.ReactNode }) {
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const x = (state.pointer.x * viewport.width) / 8;
      const y = (state.pointer.y * viewport.height) / 8;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.05, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.05, 0.05);
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

// Ambient glow orbs
function GlowOrb({ position, color, scale }: { position: [number, number, number]; color: string; scale: number }) {
  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.08} />
    </mesh>
  );
}

export default function HeroScene3D() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#7c3aed" />
        <pointLight position={[-5, -5, 3]} intensity={0.4} color="#3b82f6" />
        <pointLight position={[0, 3, -3]} intensity={0.3} color="#06b6d4" />

        <MouseParallax>
          <VerseOrb />

          {/* Orbiting tokens */}
          <OrbitingToken radius={2.5} speed={0.3} offset={0} color="#7c3aed" />
          <OrbitingToken radius={2.8} speed={0.25} offset={2} color="#3b82f6" />
          <OrbitingToken radius={3.1} speed={0.2} offset={4} color="#06b6d4" />

          {/* Ambient glow orbs */}
          <GlowOrb position={[-3, 2, -2]} color="#7c3aed" scale={1.5} />
          <GlowOrb position={[3, -1, -3]} color="#3b82f6" scale={1.2} />
          <GlowOrb position={[0, -2, -1]} color="#06b6d4" scale={0.8} />
        </MouseParallax>

        {/* Sparkles */}
        <Sparkles count={40} scale={8} size={1.5} speed={0.3} opacity={0.4} color="#7c3aed" />
        <Sparkles count={20} scale={6} size={1} speed={0.2} opacity={0.3} color="#3b82f6" />

        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
