'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface OrbitingLogoCoinProps {
  textureUrl: string;
  orbitRadius?: number;
  orbitSpeed?: number;
  spinSpeedY?: number;
  spinSpeedX?: number;
  spinSpeedZ?: number;
  wobbleAmountX?: number;
  wobbleAmountZ?: number;
  wobbleSpeedX?: number;
  wobbleSpeedZ?: number;
  size?: number;
  tilt?: [number, number, number];
  color?: string;
  emissiveColor?: string;
  phase?: number;
}

export default function OrbitingLogoCoin({
  textureUrl,
  orbitRadius = 2.8,
  orbitSpeed = 0.35,
  spinSpeedY = 1.6,
  spinSpeedX = 0.45,
  spinSpeedZ = 0.25,
  wobbleAmountX = 0.18,
  wobbleAmountZ = 0.12,
  wobbleSpeedX = 0.8,
  wobbleSpeedZ = 0.6,
  size = 0.34,
  tilt = [0.4, 0, 0.2],
  color = '#7c3aed',
  emissiveColor = '#3b82f6',
  phase = 0,
}: OrbitingLogoCoinProps) {
  const orbitPlaneRef = useRef<THREE.Group>(null);
  const orbitPositionRef = useRef<THREE.Group>(null);
  const coinSpinRef = useRef<THREE.Group>(null);
  const texture = useTexture(textureUrl);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime + phase;

    // 1. Orbit around globe
    if (orbitPlaneRef.current) {
      orbitPlaneRef.current.rotation.y = t * orbitSpeed;
    }

    // 2. Coin local self-spin + wobble
    if (coinSpinRef.current) {
      // Y spin (main rotation)
      coinSpinRef.current.rotation.y += delta * spinSpeedY;
      // X tumble
      coinSpinRef.current.rotation.x += delta * spinSpeedX * 0.25;
      // Z tumble
      coinSpinRef.current.rotation.z += delta * spinSpeedZ * 0.2;
      // Wobble overlay
      coinSpinRef.current.rotation.x += Math.sin(t * wobbleSpeedX) * wobbleAmountX * delta;
      coinSpinRef.current.rotation.z += Math.cos(t * wobbleSpeedZ) * wobbleAmountZ * delta;
    }
  });

  return (
    <group ref={orbitPlaneRef} rotation={tilt}>
      <group ref={orbitPositionRef} position={[orbitRadius, 0, 0]}>
        <group ref={coinSpinRef}>
          {/* Coin body — no shadow casting */}
          <mesh castShadow={false} receiveShadow={false}>
            <cylinderGeometry args={[size, size, 0.045, 64]} />
            <meshStandardMaterial
              color={color}
              metalness={0.45}
              roughness={0.22}
              emissive={emissiveColor}
              emissiveIntensity={0.25}
            />
          </mesh>

          {/* Front face — logo */}
          <mesh position={[0, 0.026, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow={false} receiveShadow={false}>
            <circleGeometry args={[size * 0.88, 64]} />
            <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
          </mesh>

          {/* Back face — logo */}
          <mesh position={[0, -0.026, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow={false} receiveShadow={false}>
            <circleGeometry args={[size * 0.88, 64]} />
            <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
          </mesh>

          {/* Primary glow halo — additive */}
          <mesh scale={1.25} castShadow={false} receiveShadow={false} renderOrder={-1}>
            <circleGeometry args={[size * 0.95, 48]} />
            <meshBasicMaterial
              color={emissiveColor}
              transparent
              opacity={0.12}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
          {/* Secondary outer glow */}
          <mesh scale={1.45} castShadow={false} receiveShadow={false} renderOrder={-2}>
            <circleGeometry args={[size * 1.05, 48]} />
            <meshBasicMaterial
              color={emissiveColor}
              transparent
              opacity={0.06}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}
