import { MessageSquare, FileText } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-20 pt-24 pb-8 px-4 md:px-8 max-w-7xl mx-auto w-full border-t border-white/5 relative">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-portfolio-accent/5 rounded-t-full blur-[100px] -z-10 pointer-events-none" />

      <div className="bg-zinc-900/40 border border-white/5 rounded-3xl p-12 md:p-20 flex flex-col items-center text-center max-w-4xl mx-auto mb-24 backdrop-blur-sm relative overflow-hidden">
        {/* Subtle inner glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-portfolio-accent/5 pointer-events-none" />
        
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 z-10">
          Let's Build<br />Together
        </h2>
        <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10 z-10">
          Presently open for new opportunities and collaborations. 
          If you're building something ambitious, let's connect.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4 z-10">
          <Link href="/contact">
            <button className="bg-portfolio-accent text-black px-8 py-3.5 rounded-full font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(var(--portfolio-accent),0.2)] cursor-pointer font-sans">
              <MessageSquare className="w-5 h-5" />
              Let's Talk
            </button>
          </Link>
          <Link href="/contact?subject=Resume%20Request">
            <button className="bg-zinc-900 border border-white/10 text-white px-8 py-3.5 rounded-full font-medium hover:bg-zinc-800 transition-colors flex items-center gap-2 cursor-pointer">
              <FileText className="w-5 h-5" />
              Resume Request
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center">
          <span className="text-xl font-black tracking-tighter text-white flex items-center gap-1.5 font-sans">
            <span className="bg-gradient-to-r from-white to-portfolio-accent bg-clip-text text-transparent">RMPK</span>
            <span className="text-portfolio-accent text-xs font-mono font-bold px-1.5 py-0.5 rounded border border-portfolio-accent/20 bg-portfolio-accent/5">.dev</span>
          </span>
        </div>
        
        <div className="flex items-center gap-8 text-sm font-medium text-zinc-500">
          <Link href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Twitter</Link>
          <Link href="https://www.linkedin.com/in/pathum-piyumal-kumarathunga-48185b32b/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</Link>
          <Link href="https://github.com/Pathum-Piyumal" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</Link>
          <a href="mailto:pathumpiyumal013@gmail.com" className="hover:text-white transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
}
