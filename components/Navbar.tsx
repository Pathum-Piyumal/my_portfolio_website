'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const isAboutPage = pathname === '/about';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8 bg-black/10 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <span className="text-xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity cursor-pointer">
              DevCommand<span className="text-[#B388FF] text-xs font-mono font-medium align-super ml-1">v1.0</span>
            </span>
          </Link>
        </div>
        
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
            href="/#contact" 
            className="text-sm font-medium text-zinc-400 hover:text-white px-4 py-1.5 rounded-full transition-colors"
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="md:hidden text-zinc-400 hover:text-white">
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="hidden md:flex items-center gap-3">
            <span className="text-[10px] tracking-[0.2em] font-mono text-zinc-500 uppercase">Sciences</span>
            <Link href="/#contact">
              <button className="bg-[#B388FF] text-black px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#c4a1ff] transition-all duration-300 shadow-[0_0_15px_rgba(179,136,255,0.3)] hover:shadow-[0_0_25px_rgba(179,136,255,0.5)] cursor-pointer transform hover:-translate-y-0.5">
                Hire Me
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

