'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Shield, Code, Sparkles, Send } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Admin', href: '/admin', icon: true }
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0a0d14]/85 border-b border-[#1f293d]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo inspired by Muzammil's brand style: Name with accent highlight */}
          <Link href="/" className="group flex items-center space-x-2 text-xl font-bold tracking-tight text-white">
            <span className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-extrabold shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              A
            </span>
            <span>
              Arif <span className="text-cyan-400 font-medium">Hussain</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.icon && <Shield className="w-3.5 h-3.5 text-cyan-400" />}
                  <span>{link.name}</span>
                </Link>
              );
            })}

            <Link
              href="/contact"
              className="ml-3 px-5 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:shadow-cyan-500/40 hover:-translate-y-0.5 flex items-center space-x-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Hire Me</span>
            </Link>
          </nav>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-surface border border-surfaceBorder focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-surfaceBorder bg-[#0f1422] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-gray-300 hover:text-white hover:bg-surface'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {link.icon && <Shield className="w-4 h-4 text-cyan-400" />}
                  <span>{link.name}</span>
                </div>
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full block text-center px-4 py-3 rounded-lg font-medium bg-cyan-500 hover:bg-cyan-400 text-white shadow-md shadow-cyan-500/30"
            >
              Hire Me
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
