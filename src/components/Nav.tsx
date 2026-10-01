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
    label: 'Made for',
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
        className="flex items-center gap-1 text-[15px] font-medium text-gray-700 hover:text-gray-900 py-2 px-3"
        onClick={() => setOpen(!open)}
      >
        {label}
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
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
    <nav className="fixed top-0 w-full bg-white z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-[72px]">
          {/* Logo */}
          <div className="flex items-center gap-10">
            <a href="#" className="flex items-center gap-2">
              <div className="flex items-center justify-center text-[#1a1a1a]">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 6L3 11.5L16 17L29 11.5L16 6Z" fill="currentColor"/>
                  <path d="M16 21L3 15.5V18.5L16 24L29 18.5V15.5L16 21Z" fill="currentColor"/>
                  <path d="M16 26L3 20.5V23.5L16 29L29 23.5V20.5L16 26Z" fill="currentColor"/>
                </svg>
              </div>
              <span className="font-extrabold text-[22px] tracking-tight text-gray-900">Buffer</span>
            </a>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <NavDropdown key={item.label} label={item.label} children={item.children} />
              ))}
              <a href="#pricing" className="text-[15px] font-medium text-gray-700 hover:text-gray-900 py-2 px-3">Pricing</a>
            </div>
          </div>

          {/* Right CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="#" className="text-[15px] font-semibold text-gray-800 border border-gray-400 rounded-full px-5 py-2.5 hover:bg-gray-50 transition-colors">Log in</a>
            <a href="#" className="bg-[#a6e59a] text-gray-900 text-[15px] font-semibold px-5 py-2.5 rounded-full hover:bg-[#95d489] transition-colors">
              Get started for free
            </a>
          </div>

          {/* Mobile hamburger */}
          <button className="lg:hidden p-2 text-gray-600" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3 shadow-lg">
          {NAV_ITEMS.map((item) => (
            <details key={item.label} className="group">
              <summary className="flex items-center justify-between py-2 text-[15px] font-medium text-gray-700 cursor-pointer list-none">
                {item.label}
                <ChevronDown className="w-4 h-4 text-gray-500 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="ml-4 mt-1 space-y-1">
                {item.children.map((child) => (
                  <a key={child} href="#" className="block py-1.5 text-sm text-gray-600 hover:text-gray-900">{child}</a>
                ))}
              </div>
            </details>
          ))}
          <a href="#pricing" className="block py-2 text-[15px] font-medium text-gray-700">Pricing</a>
          <div className="pt-4 flex flex-col gap-3 border-t border-gray-100">
            <a href="#" className="text-[15px] font-semibold text-gray-800 border border-gray-400 rounded-full px-5 py-2.5 text-center hover:bg-gray-50 transition-colors">Log in</a>
            <a href="#" className="bg-[#a6e59a] text-gray-900 text-[15px] font-semibold px-5 py-2.5 rounded-full text-center hover:bg-[#95d489] transition-colors">
              Get started for free
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
