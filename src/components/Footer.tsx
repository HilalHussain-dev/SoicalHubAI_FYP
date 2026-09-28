import React from 'react';

const FOOTER_COLS = [
  {
    heading: 'Features',
    links: ['Publishing', 'Analytics', 'Engagement', 'Start Page', 'AI Assistant', 'Collaboration', 'Mobile App'],
  },
  {
    heading: 'Channels',
    links: ['Instagram', 'TikTok', 'Facebook', 'LinkedIn', 'X / Twitter', 'Pinterest', 'Threads', 'Bluesky', 'YouTube', 'Mastodon'],
  },
  {
    heading: 'Made For',
    links: ['Creators', 'Small Businesses', 'Marketing Teams', 'Agencies', 'Non-profits'],
  },
  {
    heading: 'Resources',
    links: ['Blog', 'Help Center', 'Podcast', 'Free Tools', 'Content Library', 'Browser Extension', 'Free Templates'],
  },
  {
    heading: 'Company',
    links: ['About Buffer', 'Open Dashboard', 'Careers', 'Customers', 'Press', 'Security', 'Transparency'],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#f9f8f6] border-t border-gray-200 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Logo + social */}
        <div className="flex flex-col md:flex-row md:items-start gap-10 mb-14">
          <div className="shrink-0">
            <a href="#" className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 bg-[#1a1a1a] rounded-lg flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="1" width="5" height="5" rx="1" fill="white"/>
                  <rect x="8" y="1" width="5" height="5" rx="1" fill="white" opacity="0.6"/>
                  <rect x="1" y="8" width="5" height="5" rx="1" fill="white" opacity="0.6"/>
                  <rect x="8" y="8" width="5" height="5" rx="1" fill="white" opacity="0.3"/>
                </svg>
              </div>
              <span className="font-bold text-gray-900">Buffer</span>
            </a>
            <div className="flex gap-3">
              {['IG','FB','X','LI','TH'].map((s) => (
                <a key={s} href="#" className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center text-[10px] font-bold text-gray-500 hover:bg-gray-300 transition-colors">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Footer columns */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 flex-1">
            {FOOTER_COLS.map((col) => (
              <div key={col.heading}>
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4">{col.heading}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Free tools row */}
        <div className="border-t border-gray-200 pt-8 pb-6">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Free Tools</div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {[
              'Instagram Caption Generator','Twitter Bio Generator','LinkedIn Post Generator',
              'Hashtag Generator','Social Media Calendar','Image Resizer',
              'Video Thumbnail Maker','Bio Link Creator','Post Idea Generator',
            ].map((tool) => (
              <a key={tool} href="#" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">{tool}</a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span>© 2026 Buffer · All rights reserved</span>
            <select className="bg-transparent text-xs text-gray-400 cursor-pointer focus:outline-none">
              {['English','Español','Français','Deutsch','Italiano','Português','日本語'].map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-5 text-xs text-gray-400">
            {['Privacy Policy','Terms of Service','Security','Cookie Policy','GDPR'].map((link) => (
              <a key={link} href="#" className="hover:text-gray-700 transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
