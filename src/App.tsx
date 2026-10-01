import React, { useState, useEffect } from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { CoreFeatures } from './components/CoreFeatures';
import { MoreFeatures } from './components/MoreFeatures';
import { TrustedBy } from './components/TrustedBy';
import { AISection } from './components/AISection';
import { Support } from './components/Support';
import { Metrics } from './components/Metrics';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { PricingPage } from './components/pricing/PricingPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setCurrentPath(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Nav />
      {currentPath === '#pricing' ? (
        <PricingPage />
      ) : (
        <main className="pt-16">
          <Hero />
          <TrustedBy />
          <CoreFeatures />
          <MoreFeatures />
          <AISection />
          <Support />
          <Metrics />
          <CTA />
        </main>
      )}
      <Footer />
    </div>
  );
}
