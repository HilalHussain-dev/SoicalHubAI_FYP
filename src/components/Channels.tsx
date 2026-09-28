import React from 'react';

const CHANNELS = [
  { name: 'LinkedIn', color: '#0A66C2', initial: 'in' },
  { name: 'Threads', color: '#1a1a1a', initial: '⊕' },
  { name: 'Pinterest', color: '#E60023', initial: 'P' },
  { name: 'Bluesky', color: '#0085FF', initial: '🦋' },
  { name: 'YouTube', color: '#FF0000', initial: '▶' },
  { name: 'X / Twitter', color: '#1a1a1a', initial: 'X' },
  { name: 'Google Business', color: '#4285F4', initial: 'G' },
  { name: 'Instagram', color: '#E1306C', initial: '◻' },
  { name: 'Mastodon', color: '#6364FF', initial: 'M' },
  { name: 'TikTok', color: '#010101', initial: '♪' },
  { name: 'Facebook', color: '#1877F2', initial: 'f' },
];

export function Channels() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
          Post everywhere, manage from one place
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          11 platforms and counting — we add new channels as they grow.
        </p>
      </div>
      <div className="relative overflow-hidden -mx-4">
        <div className="channel-track">
          {[...CHANNELS, ...CHANNELS].map((ch, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer shrink-0"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: ch.color }}
              >
                {ch.initial}
              </div>
              <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">{ch.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
