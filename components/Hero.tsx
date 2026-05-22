import { ArrowRight, Code } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full flex flex-col min-h-screen justify-center relative">
      {/* Background glow effects */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#B388FF]/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div className="flex flex-col items-start z-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-bold tracking-wider text-[#FFB74D] uppercase">
              Senior Engineer <span className="text-zinc-600 px-1">//</span> React <span className="text-zinc-600 px-1">//</span> Next.js <span className="text-zinc-600 px-1">//</span> Node.js
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Alex Chen
          </h1>
          
          <p className="text-lg text-zinc-400 mb-10 max-w-lg leading-relaxed">
            I build scalable, high-performance web applications and systems. 
            I am passionate about elegant solutions and clean, maintainable architecture.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mb-16">
            <Link href="#portfolio" className="bg-[#B388FF] text-black px-6 py-3 rounded-full font-bold hover:bg-[#c4a1ff] transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(179,136,255,0.3)] cursor-pointer">
              Explore Portfolio
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="https://github.com/Pathum-Piyumal/my_portfolio_website" target="_blank" rel="noreferrer" className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer">
              <Code className="w-4 h-4" />
              View Repo
            </Link>
          </div>
        </div>

        {/* Right content (Graphic/Image) */}
        <div className="relative w-full aspect-square max-w-md mx-auto lg:ml-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden flex items-center justify-center shadow-2xl z-10">
           {/* Abstract visualization or placeholder */}
           <div className="absolute inset-0 bg-gradient-to-tr from-[#B388FF]/5 to-transparent"></div>
           <div className="w-3/4 h-3/4 rounded-full border border-white/5 flex items-center justify-center animate-[spin_60s_linear_infinite]">
             <div className="w-3/4 h-3/4 rounded-full border border-[#B388FF]/20 border-dashed flex items-center justify-center animate-[spin_40s_linear_infinite_reverse]">
               <div className="w-1/2 h-1/2 rounded-full border border-white/10 shadow-[0_0_50px_rgba(179,136,255,0.2)] bg-[#B388FF]/5 backdrop-blur-md flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#B388FF] shadow-[0_0_10px_#B388FF]"></div>
               </div>
             </div>
           </div>
        </div>
      </div>

      {/* Tech Stack Tags */}
      <div className="mt-20 flex flex-wrap gap-3 items-center justify-center lg:justify-start">
        {['Next.js', 'React', 'TypeScript', 'Tailwind', 'Node.js', 'Python', 'PostgreSQL'].map((tech) => (
          <span key={tech} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-zinc-300">
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
