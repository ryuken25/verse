'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Features from '@/components/Features';
import Learn from '@/components/Learn';
import Build from '@/components/Build';
import Community from '@/components/Community';
import Footer from '@/components/Footer';

// Dynamic import for Hero with 3D (no SSR)
const Hero = dynamic(() => import('@/components/Hero'), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0e27]">
      <div className="animate-pulse">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-4" />
        <p className="text-purple-400 text-lg">Loading VERSE...</p>
      </div>
    </div>
  )
});

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Features />
      <Learn />
      <Build />
      <Community />
      <Footer />
    </main>
  );
}
