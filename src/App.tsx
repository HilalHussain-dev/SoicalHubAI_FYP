import React from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { CoreFeatures } from './components/CoreFeatures';
import { MoreFeatures } from './components/MoreFeatures';
import { Channels } from './components/Channels';
import { AISection } from './components/AISection';
import { Support } from './components/Support';
import { Resources } from './components/Resources';
import { Metrics } from './components/Metrics';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Nav />
      <main className="pt-16">
        <Hero />
        <CoreFeatures />
        <MoreFeatures />
        <Channels />
        <AISection />
        <Support />
        <Resources />
        <Metrics />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
