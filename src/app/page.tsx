import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Learn from '@/components/Learn';
import Build from '@/components/Build';
import Community from '@/components/Community';
import Footer from '@/components/Footer';

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
