'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Features from '@/components/Features';
import Learn from '@/components/Learn';
import Events from '@/components/Events';
import Market from '@/components/Market';
import DocsSection from '@/components/DocsSection';
import Build from '@/components/Build';
import Community from '@/components/Community';
import AndroidMockup from '@/components/AndroidMockup';
import Footer from '@/components/Footer';

const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Features />
      <Learn />
      <Events />
      <Market />
      <DocsSection />
      <Build />
      <Community />
      <AndroidMockup />
      <Footer />
    </main>
  );
}
