'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const isAboutPage = pathname === '/about';
  const isContactPage = pathname === '/contact';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const navLinks = [
    { name: 'Architecture', href: '/#architecture' },
    { name: 'Projects', href: '/#portfolio' },
    { name: 'Credentials', href: '/#certifications' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:py-6 flex justify-center pointer-events-none">
      {/* Centered Suspended Dock Container */}
      <div className="w-full max-w-5xl pointer-events-auto bg-zinc-950/65 backdrop-blur-xl border border-white/10 rounded-full px-5 py-3 md:px-6 md:py-3.5 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:border-white/15 transition-all duration-300 relative">
        {/* Soft bottom glow accent line */}
        <div className="absolute inset-x-12 -bottom-[1px] h-[1px] bg-gradient-to-r from-transparent via-[#B388FF]/30 to-transparent pointer-events-none" />

        {/* Brand Logo & Active Status Dot */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <span className="text-lg md:text-xl font-black tracking-tighter text-white hover:opacity-90 transition-opacity cursor-pointer group flex items-center gap-1.5 font-sans">
              <span className="bg-gradient-to-r from-white via-zinc-100 to-[#B388FF] bg-clip-text text-transparent group-hover:from-white group-hover:to-[#c4a1ff] transition-all duration-300">
                RMPK
              </span>
              <span className="text-[#B388FF] text-[10px] md:text-xs font-mono font-bold px-1.5 py-0.5 rounded border border-[#B388FF]/30 bg-[#B388FF]/5 shadow-[0_0_10px_rgba(179,136,255,0.15)] group-hover:border-[#B388FF]/50 transition-all duration-300">
                .dev
              </span>
            </span>
          </Link>

          {/* Availability Status Dot Indicator */}
          <div className="hidden lg:flex items-center gap-2 bg-zinc-900/60 border border-white/5 px-2.5 py-1 rounded-full text-[10px] font-mono text-zinc-400 select-none">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span>Active open for roles</span>
          </div>
        </div>
        
        {/* Centered Desktop Navigation with Sliding Hover Background */}
        <div 
          className="hidden md:flex items-center gap-1 bg-white/5 border border-white/5 rounded-full px-2.5 py-1.5"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {navLinks.map((link, idx) => {
            const isActive = 
              (link.href === '/about' && isAboutPage) || 
              (link.href === '/contact' && isContactPage) || 
              (link.href.startsWith('/#') && !isAboutPage && !isContactPage);

            return (
              <Link 
                key={link.name}
                href={link.href} 
                onMouseEnter={() => setHoveredIndex(idx)}
                className={`relative text-xs lg:text-sm font-medium px-4 py-1.5 rounded-full transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {/* Sliding Active/Hover Pill */}
                {hoveredIndex === idx && (
                  <motion.span
                    layoutId="navbarHoverBg"
                    className="absolute inset-0 bg-white/10 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Active Indicator Dot */}
                {isActive && !hoveredIndex && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#B388FF] shadow-[0_0_8px_#B388FF]" />
                )}

                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* CTA Panel */}
        <div className="flex items-center gap-3">
          {/* Desktop Right Action */}
          <div className="hidden md:flex items-center">
            <Link href="/contact">
              <button className="relative overflow-hidden group bg-[#B388FF] text-black px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-[0_0_15px_rgba(179,136,255,0.3)] hover:shadow-[0_0_25px_rgba(179,136,255,0.6)] cursor-pointer transform hover:-translate-y-0.5 flex items-center gap-1">
                {/* Magnetic color flow overlay */}
                <span className="absolute inset-0 bg-gradient-to-r from-[#c4a1ff] to-[#B388FF] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                <span>Hire Me</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-zinc-400 hover:text-white p-2 rounded-full bg-white/5 border border-white/10 z-50 relative focus:outline-none transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Glassmorphic Navigation Drawer (Suspended Card Style) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 mt-3 p-6 bg-zinc-950/95 backdrop-blur-xl border border-white/10 rounded-[28px] flex flex-col gap-4 shadow-2xl z-40 md:hidden overflow-hidden"
            >
              {/* Backglow element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B388FF]/10 rounded-full blur-2xl pointer-events-none -z-10 animate-pulse" />

              {navLinks.map((link) => {
                const isActive = 
                  (link.href === '/about' && isAboutPage) || 
                  (link.href === '/contact' && isContactPage) || 
                  (link.href.startsWith('/#') && !isAboutPage && !isContactPage);

                return (
                  <Link 
                    key={link.name}
                    href={link.href} 
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-semibold py-2.5 border-b border-white/5 transition-colors flex items-center justify-between ${
                      isActive ? 'text-[#B388FF]' : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#B388FF] shadow-[0_0_8px_#B388FF]" />}
                  </Link>
                );
              })}
              
              <div className="pt-2 flex flex-col gap-3">
                <div className="h-[1px] bg-white/10 w-full my-1"></div>
                
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full bg-[#B388FF] text-black py-3.5 rounded-2xl text-sm font-bold hover:bg-[#c4a1ff] transition-all duration-300 shadow-[0_0_15px_rgba(179,136,255,0.2)] cursor-pointer flex items-center justify-center gap-1">
                    <span>Hire Me</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
