import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  {
    label: 'Features',
    children: ['Publishing', 'Analytics', 'Engagement', 'Start Page', 'AI Assistant', 'Collaboration'],
  },
  {
    label: 'Integrations',
    children: ['Canva', 'ChatGPT', 'Zapier', 'Google Drive', 'Dropbox', 'OneDrive'],
  },
  {
    label: 'Made For',
    children: ['Creators', 'Small Businesses', 'Marketing Teams', 'Agencies', 'Non-profits'],
  },
  {
    label: 'Resources',
    children: ['Blog', 'Help Center', 'Free Tools', 'Social Media 101', 'Best Time to Post'],
  },
];

function NavDropdown({ label, children }: { label: string; children: string[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 py-2"
        onClick={() => setOpen(!open)}
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50">
          {children.map((item) => (
            <a
              key={item}
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#1a1a1a] rounded-lg flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="1" width="5" height="5" rx="1" fill="white" />
                  <rect x="8" y="1" width="5" height="5" rx="1" fill="white" opacity="0.6" />
                  <rect x="1" y="8" width="5" height="5" rx="1" fill="white" opacity="0.6" />
                  <rect x="8" y="8" width="5" height="5" rx="1" fill="white" opacity="0.3" />
                </svg>
              </div>
              <span className="font-bold text-lg tracking-tight text-gray-900">Buffer</span>
            </a>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <NavDropdown key={item.label} label={item.label} children={item.children} />
              ))}
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900 py-2 px-2">Pricing</a>
            </div>
          </div>

          {/* Right CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900">Log in</a>
            <a href="#" className="bg-[#1a1a1a] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              Get started for free
            </a>
          </div>

          {/* Mobile hamburger */}
          <button className="lg:hidden p-2 text-gray-600" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          {NAV_ITEMS.map((item) => (
            <details key={item.label} className="group">
              <summary className="flex items-center justify-between py-2 text-sm font-medium text-gray-700 cursor-pointer list-none">
                {item.label}
                <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="ml-4 mt-1 space-y-1">
                {item.children.map((child) => (
                  <a key={child} href="#" className="block py-1.5 text-sm text-gray-600 hover:text-gray-900">{child}</a>
                ))}
              </div>
            </details>
          ))}
          <a href="#" className="block py-2 text-sm font-medium text-gray-700">Pricing</a>
          <div className="pt-2 flex flex-col gap-2 border-t border-gray-100">
            <a href="#" className="text-sm font-medium text-gray-700 py-2">Log in</a>
            <a href="#" className="bg-[#1a1a1a] text-white text-sm font-semibold px-4 py-2.5 rounded-lg text-center">
              Get started for free
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
