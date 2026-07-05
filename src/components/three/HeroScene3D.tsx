'use client';

import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles, Environment } from '@react-three/drei';
import * as THREE from 'three';
import OrbitingLogoCoin from './OrbitingLogoCoin';

// Inner globe — brighter purple/blue with emissive glow
function InnerGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => { if (meshRef.current) meshRef.current.rotation.y = state.clock.elapsedTime * 0.08; });
  return (
    <mesh ref={meshRef} scale={1.5} castShadow={false} receiveShadow={false}>
      <sphereGeometry args={[1, 96, 96]} />
      <meshStandardMaterial
        color="#24105f"
        roughness={0.38}
        metalness={0.08}
        emissive="#3b20a8"
        emissiveIntensity={0.45}
      />
    </mesh>
  );
}

// Gradient glow sphere (additive)
function GradientGlow() {
  return (
    <mesh scale={1.58} castShadow={false} receiveShadow={false}>
      <sphereGeometry args={[1, 96, 96]} />
      <meshBasicMaterial
        color="#7c3aed"
        transparent
        opacity={0.16}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// Atmosphere rim (backside)
function AtmosphereRim() {
  return (
    <mesh scale={1.65} castShadow={false} receiveShadow={false}>
      <sphereGeometry args={[1, 96, 96]} />
      <meshBasicMaterial
        color="#38bdf8"
        transparent
        opacity={0.10}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// Grid lines on globe
function GlobeGrid() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => { if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.08; });

  return (
    <group ref={groupRef}>
      {/* Latitude rings */}
      {[-0.8, -0.4, 0, 0.4, 0.8].map((y, i) => {
        const r = Math.sqrt(1 - y * y) * 1.52;
        return (
          <mesh key={`lat-${i}`} position={[0, y * 1.52, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow={false} receiveShadow={false}>
            <torusGeometry args={[r, 0.005, 8, 64]} />
            <meshBasicMaterial color="#22d3ee" transparent opacity={0.25} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        );
      })}
      {/* Longitude rings */}
      {[0, Math.PI / 3, Math.PI * 2 / 3].map((rot, i) => (
        <mesh key={`lon-${i}`} rotation={[0, rot, 0]} castShadow={false} receiveShadow={false}>
          <torusGeometry args={[1.52, 0.005, 8, 64]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

// Orbit ring visual
function OrbitRing({ radius, tilt, color }: { radius: number; tilt: [number, number, number]; color: string }) {
  return (
    <mesh rotation={tilt} castShadow={false} receiveShadow={false}>
      <torusGeometry args={[radius, 0.008, 8, 128]} />
      <meshBasicMaterial color={color} transparent opacity={0.18} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
}

// Mouse parallax
function MouseParallax({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const idleRef = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Idle rotation
    idleRef.current += delta * 0.05;

    // Cursor follow
    const targetY = state.pointer.x * 0.22;
    const targetX = -state.pointer.y * 0.12;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, idleRef.current + targetY, 0.06);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.06);
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function HeroScene3D() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* Bright lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#7c3aed" />
        <pointLight position={[-5, -3, 3]} intensity={0.8} color="#3b82f6" />
        <pointLight position={[0, 3, -5]} intensity={0.5} color="#06b6d4" />
        <pointLight position={[2, 1.5, 2]} color="#22d3ee" intensity={1.2} />
        <pointLight position={[-2, -1, 1]} color="#8b5cf6" intensity={0.9} />
        <directionalLight position={[0, 2, 3]} color="#ffffff" intensity={0.6} />

        <MouseParallax>
          <Float speed={1} rotationIntensity={0.15} floatIntensity={0.4}>
            {/* Globe layers */}
            <InnerGlobe />
            <GradientGlow />
            <AtmosphereRim />
            <GlobeGrid />

            {/* Orbit rings */}
            <OrbitRing radius={3.0} tilt={[0.35, 0, 0.18]} color="#f59e0b" />
            <OrbitRing radius={2.55} tilt={[0.85, 0.2, -0.35]} color="#7c3aed" />
            <OrbitRing radius={3.3} tilt={[1.2, -0.1, 0.7]} color="#8b5cf6" />

            {/* Orbiting logo coins — true XYZ spin */}
            <OrbitingLogoCoin
              textureUrl="/brand/bitcoin-logo.png"
              orbitRadius={3.0}
              orbitSpeed={0.36}
              spinSpeedY={1.8}
              spinSpeedX={0.45}
              spinSpeedZ={0.25}
              wobbleAmountX={0.18}
              wobbleAmountZ={0.12}
              wobbleSpeedX={0.8}
              wobbleSpeedZ={0.6}
              size={0.32}
              tilt={[0.35, 0, 0.18]}
              color="#f59e0b"
              emissiveColor="#f59e0b"
              phase={0}
            />
            <OrbitingLogoCoin
              textureUrl="/brand/verse-logo.png"
              orbitRadius={2.55}
              orbitSpeed={-0.48}
              spinSpeedY={1.35}
              spinSpeedX={0.65}
              spinSpeedZ={0.35}
              wobbleAmountX={0.14}
              wobbleAmountZ={0.20}
              wobbleSpeedX={0.7}
              wobbleSpeedZ={0.9}
              size={0.36}
              tilt={[0.85, 0.2, -0.35]}
              color="#7c3aed"
              emissiveColor="#7c3aed"
              phase={1.7}
            />
            <OrbitingLogoCoin
              textureUrl="/brand/polygon-logo.png"
              orbitRadius={3.3}
              orbitSpeed={0.28}
              spinSpeedY={2.05}
              spinSpeedX={0.35}
              spinSpeedZ={0.55}
              wobbleAmountX={0.22}
              wobbleAmountZ={0.10}
              wobbleSpeedX={1.0}
              wobbleSpeedZ={0.5}
              size={0.28}
              tilt={[1.2, -0.1, 0.7]}
              color="#8b5cf6"
              emissiveColor="#6366f1"
              phase={3.2}
            />
          </Float>
        </MouseParallax>

        {/* Star scatter / space dust */}
        <Sparkles count={90} scale={[7, 4, 2]} size={1.2} speed={0.18} opacity={0.45} color="#60a5fa" />
        <Sparkles count={40} scale={[5, 3, 2]} size={0.8} speed={0.12} opacity={0.3} color="#a78bfa" />
        <Sparkles count={25} scale={[6, 4, 3]} size={1.0} speed={0.15} opacity={0.25} color="#22d3ee" />

        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
