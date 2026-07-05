'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function CursorOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x += (mouse.current.x * 3 - meshRef.current.position.x) * 0.05;
      meshRef.current.position.y += (mouse.current.y * 2 - meshRef.current.position.y) * 0.05;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#7c3aed"
          attach="material"
          distort={0.4}
          speed={3}
          roughness={0.2}
          metalness={0.9}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const count = 150;
  const ref = useRef<THREE.Points>(null);
  const geoRef = useRef<THREE.BufferGeometry>(null);

  useEffect(() => {
    if (geoRef.current) {
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 15;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
      }
      geoRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry ref={geoRef} />
      <pointsMaterial size={0.03} color="#7c3aed" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function Logo3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={{ pointerEvents: 'none' }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#7c3aed" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />
        <CursorOrb />
        <Particles />
      </Canvas>
    </div>
  );
}
