'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const isAboutPage = pathname === '/about';
  const isContactPage = pathname === '/contact';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8 bg-black/10 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <span className="text-xl font-black tracking-tighter text-white hover:opacity-90 transition-opacity cursor-pointer group flex items-center gap-1.5 font-sans">
              <span className="bg-gradient-to-r from-white via-zinc-100 to-[#B388FF] bg-clip-text text-transparent group-hover:from-white group-hover:to-[#c4a1ff] transition-all duration-300">
                RMPK
              </span>
              <span className="text-[#B388FF] text-xs font-mono font-bold px-1.5 py-0.5 rounded border border-[#B388FF]/30 bg-[#B388FF]/5 shadow-[0_0_10px_rgba(179,136,255,0.15)] group-hover:border-[#B388FF]/50 transition-all duration-300">
                .dev
              </span>
            </span>
          </Link>
        </div>
        
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-4 py-2">
          <Link 
            href="/#architecture" 
            className="text-sm font-medium text-zinc-400 hover:text-white px-4 py-1.5 rounded-full transition-colors"
          >
            Architecture
          </Link>
          <Link 
            href="/#portfolio" 
            className="text-sm font-medium text-zinc-400 hover:text-white px-4 py-1.5 rounded-full transition-colors"
          >
            Projects
          </Link>
          <Link 
            href="/about" 
            className={`text-sm font-medium px-4 py-1.5 rounded-full transition-colors ${
              isAboutPage 
                ? 'text-white bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/10' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className={`text-sm font-medium px-4 py-1.5 rounded-full transition-colors ${
              isContactPage 
                ? 'text-white bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/10' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-zinc-400 hover:text-white p-2 rounded-xl bg-white/5 border border-white/10 z-50 relative focus:outline-none transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          {/* Desktop Right Panel Actions */}
          <div className="hidden md:flex items-center">
            <Link href="/contact">
              <button className="bg-[#B388FF] text-black px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#c4a1ff] transition-all duration-300 shadow-[0_0_15px_rgba(179,136,255,0.3)] hover:shadow-[0_0_25px_rgba(179,136,255,0.5)] cursor-pointer transform hover:-translate-y-0.5">
                Hire Me
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Glassmorphic Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-2 mx-4 p-6 bg-zinc-950/95 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col gap-4 shadow-2xl z-40 md:hidden"
          >
            <Link 
              href="/#architecture" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-zinc-300 hover:text-white py-2 border-b border-white/5 transition-colors"
            >
              Architecture
            </Link>
            <Link 
              href="/#portfolio" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-zinc-300 hover:text-white py-2 border-b border-white/5 transition-colors"
            >
              Projects
            </Link>
            <Link 
              href="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className={`text-base font-semibold py-2 border-b border-white/5 transition-colors ${
                isAboutPage ? 'text-[#B388FF]' : 'text-zinc-300 hover:text-white'
              }`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className={`text-base font-semibold py-2 border-b border-white/5 transition-colors ${
                isContactPage ? 'text-[#B388FF]' : 'text-zinc-300 hover:text-white'
              }`}
            >
              Contact
            </Link>
            
            <div className="pt-2 flex flex-col gap-3">
              <div className="h-[1px] bg-white/10 w-full my-1"></div>
              
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full bg-[#B388FF] text-black py-3.5 rounded-xl text-sm font-bold hover:bg-[#c4a1ff] transition-all duration-300 shadow-[0_0_15px_rgba(179,136,255,0.2)] cursor-pointer">
                  Hire Me
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
