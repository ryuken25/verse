'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Zap, Globe } from 'lucide-react';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const count = 2000;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
      ref.current.rotation.y = state.clock.elapsedTime * 0.075;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#7c3aed"
        size={0.05}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

function FloatingOrb() {
  return (
    <Float speed={4} rotationIntensity={2} floatIntensity={3}>
      <Sphere args={[1, 64, 64]} scale={2}>
        <MeshDistortMaterial
          color="#7c3aed"
          attach="material"
          distort={0.4}
          speed={4}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <ParticleField />
      <FloatingOrb />
    </>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <Scene />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0e27]/50 to-[#0a0e27] z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-8"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">Welcome to the Future of Web3</span>
          </motion.div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Build.</span>
            <br />
            <span className="text-white">Learn.</span>
            <br />
            <span className="gradient-text">Earn.</span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12"
          >
            Join the VERSE ecosystem and unlock unlimited possibilities in decentralized finance, 
            community building, and Web3 innovation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Get Started</span>
            </button>
            <button className="px-8 py-4 glass rounded-xl text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Explore</span>
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: '50K+', label: 'Community Members' },
              { value: '$10M+', label: 'Total Value Locked' },
              { value: '100+', label: 'Projects Built' },
              { value: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <div key={index} className="glass p-6 rounded-xl">
                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </div>
    </section>
  );
}
