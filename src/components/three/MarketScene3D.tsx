'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Sparkles, Environment } from '@react-three/drei';
import * as THREE from 'three';

function VersePlanet() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.4}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.3}
          chromaticAberration={0.1}
          anisotropy={0.15}
          distortion={0.05}
          distortionScale={0.1}
          temporalDistortion={0.05}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1200]}
          color="#7c3aed"
          transmission={0.92}
          roughness={0.15}
        />
      </mesh>
      {/* Orbiting ring */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]} scale={2}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} transparent opacity={0.4} />
      </mesh>
    </Float>
  );
}

export default function MarketScene3D() {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 md:w-72 md:h-72 pointer-events-none opacity-60">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[3, 3, 3]} intensity={0.6} color="#7c3aed" />
        <pointLight position={[-3, -2, 2]} intensity={0.3} color="#3b82f6" />
        <VersePlanet />
        <Sparkles count={15} scale={4} size={1} speed={0.2} opacity={0.3} color="#7c3aed" />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
