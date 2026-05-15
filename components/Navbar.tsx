import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-xl font-bold tracking-tight text-white">DevOS<span className="text-zinc-500">.</span>Core</span>
        </div>
        
        <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-md">
          <Link href="#portfolio" className="text-sm font-medium text-white bg-white/10 px-4 py-1.5 rounded-full transition-colors">
            Portfolio
          </Link>
          <Link href="#about" className="text-sm font-medium text-zinc-400 hover:text-white px-4 py-1.5 rounded-full transition-colors">
            About
          </Link>
          <Link href="#articles" className="text-sm font-medium text-zinc-400 hover:text-white px-4 py-1.5 rounded-full transition-colors">
            Articles
          </Link>
          <Link href="#contact" className="text-sm font-medium text-zinc-400 hover:text-white px-4 py-1.5 rounded-full transition-colors">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="md:hidden text-zinc-400 hover:text-white">
            <Menu className="w-6 h-6" />
          </button>
          <button className="hidden md:block bg-[#B388FF] text-black px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#c4a1ff] transition-colors shadow-[0_0_15px_rgba(179,136,255,0.3)]">
            Let's Connect
          </button>
        </div>
      </div>
    </nav>
  );
}
