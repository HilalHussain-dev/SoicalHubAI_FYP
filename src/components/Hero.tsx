import React, { useState } from 'react';
import { Zap, ArrowRight, Check } from 'lucide-react';

const LOGOS = [
  'Metallica', 'Benefit', 'Wired', 'Semrush', 'Crocs',
  'ElevenLabs', 'Pizza Hut', 'Vice', 'Shopify', 'Stripe',
];
export function Hero() {
  const [email, setEmail] = useState('');
  const [count] = useState(267037);

  return (
    <section className="text-center px-4 pt-16 pb-0 md:pt-24 md:pb-0 max-w-5xl mx-auto">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 mb-8">
        <Zap className="w-3.5 h-3.5 text-amber-500" />
        Now with AI-powered scheduling and MCP integration
        <ArrowRight className="w-3.5 h-3.5" />
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.05] mb-6">
        Your SocialHub workspace
      </h1>
      <p className="text-lg md:text-xl text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
        Works with every platform and all your favorite tools.
      </p>

      {/* Email capture */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Your work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full sm:flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
        />
        <a href="#" className="w-full sm:w-auto shrink-0 bg-[#1a1a1a] text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap">
          Get started for free
        </a>
      </div>
      <p className="text-xs text-gray-400 mb-12">
        <Check className="w-3.5 h-3.5 inline mr-1 text-green-500" />
        Free forever · No credit card required
      </p>

      {/* Social proof counter */}
      <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-sm mb-14">
        <div className="flex -space-x-2">
          {['#6366f1', '#f59e0b', '#10b981', '#f43f5e'].map((c, i) => (
            <div key={i} className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: c }}>
              {['A', 'M', 'S', 'J'][i]}
            </div>
          ))}
        </div>
        <span className="text-sm font-medium text-gray-700">
          <strong className="text-gray-900">{count.toLocaleString()}</strong> creators, brands, and agencies
        </span>
      </div>

      {/* Ticker logos */}
      <div className="relative overflow-hidden -mx-4 sm:-mx-6 py-3 border-y border-gray-100 bg-gray-50/50">
        <div className="ticker-track">
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div key={i} className="mx-8 text-sm font-bold text-gray-300 tracking-tight whitespace-nowrap">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
