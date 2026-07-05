'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Text, Sparkles, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Inner globe — bright purple/blue
function InnerGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.5}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#1a1040"
        emissive="#7c3aed"
        emissiveIntensity={0.3}
        roughness={0.35}
        metalness={0.1}
      />
    </mesh>
  );
}

// Network lines / grid on globe
function GlobeGrid() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < 30; i++) {
      const phi = Math.random() * Math.PI;
      const theta = Math.random() * Math.PI * 2;
      const r = 1.52;
      pts.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      ));
    }
    return pts;
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(points.length * 3);
    points.forEach((p, i) => {
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    });
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [points]);

  return (
    <group ref={groupRef}>
      <points geometry={geometry}>
        <pointsMaterial color="#06b6d4" size={0.04} transparent opacity={0.7} sizeAttenuation />
      </points>
      {/* Latitude rings */}
      {[-0.8, -0.4, 0, 0.4, 0.8].map((y, i) => {
        const r = Math.sqrt(1 - y * y) * 1.52;
        return (
          <mesh key={i} position={[0, y * 1.52, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[r, 0.005, 8, 64]} />
            <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} transparent opacity={0.3} />
          </mesh>
        );
      })}
      {/* Longitude rings */}
      {[0, Math.PI / 3, Math.PI * 2 / 3].map((rot, i) => (
        <mesh key={i} rotation={[0, rot, 0]}>
          <torusGeometry args={[1.52, 0.005, 8, 64]} />
          <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.5} transparent opacity={0.25} />
        </mesh>
      ))}
    </group>
  );
}

// Atmosphere glow
function Atmosphere() {
  return (
    <mesh scale={1.75}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="#7c3aed" transparent opacity={0.06} side={THREE.BackSide} />
    </mesh>
  );
}

// Orbiting token
function OrbitToken({ radius, speed, tilt, offset, color, label }: {
  radius: number; speed: number; tilt: [number, number, number]; offset: number; color: string; label: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const discRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * speed + offset;
    }
    if (discRef.current) {
      discRef.current.rotation.y = state.clock.elapsedTime * 1.5;
    }
  });

  return (
    <group ref={groupRef} rotation={tilt}>
      <group position={[radius, 0, 0]}>
        <mesh ref={discRef}>
          <cylinderGeometry args={[0.2, 0.2, 0.04, 32]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} metalness={0.7} roughness={0.2} />
        </mesh>
        <Text
          position={[0, 0.15, 0]}
          fontSize={0.08}
          color="white"
          anchorX="center"
          anchorY="middle"
          font={undefined}
        >
          {label}
        </Text>
      </group>
    </group>
  );
}

// Orbit rings
function OrbitRing({ radius, tilt, color }: { radius: number; tilt: [number, number, number]; color: string }) {
  return (
    <mesh rotation={tilt}>
      <torusGeometry args={[radius, 0.008, 8, 128]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} transparent opacity={0.2} />
    </mesh>
  );
}

// Mouse parallax
function MouseParallax({ children }: { children: React.ReactNode }) {
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const targetY = state.pointer.x * 0.15;
      const targetX = -state.pointer.y * 0.08;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.04);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.04);
    }
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
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#7c3aed" />
        <pointLight position={[-5, -3, 3]} intensity={0.6} color="#3b82f6" />
        <pointLight position={[0, 3, -5]} intensity={0.4} color="#06b6d4" />

        <MouseParallax>
          <Float speed={1} rotationIntensity={0.15} floatIntensity={0.4}>
            {/* Globe layers */}
            <InnerGlobe />
            <GlobeGrid />
            <Atmosphere />

            {/* Orbit rings */}
            <OrbitRing radius={2.5} tilt={[Math.PI / 5, 0, Math.PI / 8] } color="#7c3aed" />
            <OrbitRing radius={3} tilt={[Math.PI / 3, 0, -Math.PI / 6] } color="#3b82f6" />
            <OrbitRing radius={2.2} tilt={[Math.PI / 2.5, 0, Math.PI / 4] } color="#06b6d4" />

            {/* Orbiting tokens */}
            <OrbitToken radius={2.5} speed={0.35} tilt={[Math.PI / 5, 0, Math.PI / 8] } offset={0} color="#7c3aed" label="VERSE" />
            <OrbitToken radius={3} speed={0.25} tilt={[Math.PI / 3, 0, -Math.PI / 6] } offset={2} color="#f59e0b" label="Bitcoin" />
            <OrbitToken radius={2.2} speed={0.3} tilt={[Math.PI / 2.5, 0, Math.PI / 4] } offset={4} color="#3b82f6" label="POL" />
          </Float>
        </MouseParallax>

        {/* Sparkles */}
        <Sparkles count={50} scale={10} size={1.5} speed={0.3} opacity={0.5} color="#7c3aed" />
        <Sparkles count={30} scale={8} size={1} speed={0.2} opacity={0.3} color="#3b82f6" />

        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
