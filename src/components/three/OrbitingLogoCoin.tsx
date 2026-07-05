'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface OrbitingLogoCoinProps {
  textureUrl: string;
  orbitRadius?: number;
  orbitSpeed?: number;
  spinSpeed?: number;
  size?: number;
  tilt?: [number, number, number];
  color?: string;
  emissiveColor?: string;
}

export default function OrbitingLogoCoin({
  textureUrl,
  orbitRadius = 2.8,
  orbitSpeed = 0.35,
  spinSpeed = 1.6,
  size = 0.34,
  tilt = [0.4, 0, 0.2],
  color = '#7c3aed',
  emissiveColor = '#3b82f6',
}: OrbitingLogoCoinProps) {
  const orbitRef = useRef<THREE.Group>(null);
  const coinRef = useRef<THREE.Group>(null);
  const texture = useTexture(textureUrl);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Orbit around globe
    if (orbitRef.current) {
      orbitRef.current.rotation.y += delta * orbitSpeed;
    }

    // Coin self-spin + wobble
    if (coinRef.current) {
      coinRef.current.rotation.y += delta * spinSpeed;
      coinRef.current.rotation.x = Math.sin(t * 0.8) * 0.12;
      coinRef.current.rotation.z = Math.cos(t * 0.6) * 0.08;
    }
  });

  return (
    <group ref={orbitRef} rotation={tilt}>
      <group position={[orbitRadius, 0, 0]} ref={coinRef}>
        {/* Coin body */}
        <mesh>
          <cylinderGeometry args={[size, size, 0.045, 64]} />
          <meshStandardMaterial
            color={color}
            metalness={0.6}
            roughness={0.22}
            emissive={emissiveColor}
            emissiveIntensity={0.25}
          />
        </mesh>

        {/* Front face — logo */}
        <mesh position={[0, 0.026, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[size * 0.88, 64]} />
          <meshBasicMaterial map={texture} transparent side={THREE.FrontSide} />
        </mesh>

        {/* Back face — logo */}
        <mesh position={[0, -0.026, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[size * 0.88, 64]} />
          <meshBasicMaterial map={texture} transparent side={THREE.FrontSide} />
        </mesh>

        {/* Glow halo behind coin */}
        <mesh position={[0, 0, -0.01]}>
          <circleGeometry args={[size * 1.3, 32]} />
          <meshBasicMaterial color={emissiveColor} transparent opacity={0.15} />
        </mesh>
      </group>
    </group>
  );
}
