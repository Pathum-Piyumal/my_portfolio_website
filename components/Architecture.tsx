'use client';

import { motion } from 'framer-motion';
import { Globe, Database, Terminal, Server } from 'lucide-react';
import { techStack } from '@/lib/tech-data';

export default function Architecture() {
  const getTechIcon = (name: string, className = "w-4 h-4") => {
    const tech = techStack.find(t => t.name.toLowerCase() === name.toLowerCase());
    return tech ? tech.icon(className) : null;
  };

  return (
    <section className="py-28 px-4 md:px-8 max-w-7xl mx-auto w-full relative overflow-hidden" id="architecture">
      {/* Dynamic ambient backdrop */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#FFB74D]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side - 3D Isometric Microservices Stack Diagram */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-6 w-full aspect-[4/3.8] sm:aspect-[4/3.2] md:aspect-[4/3] rounded-3xl bg-zinc-950/40 border border-white/5 p-6 md:p-8 flex flex-col justify-center items-center overflow-hidden relative group shadow-2xl"
        >
          {/* Cybernetic grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(179,136,255,0.08)_0%,transparent_70%)] opacity-80" />

          {/* Connected data stream cables in SVG background */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 400">
            <defs>
              <linearGradient id="cgrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#B388FF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FFB74D" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="cgrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFB74D" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#34D399" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            {/* Connecting cables between Frontend -> API Gateway */}
            <path d="M250,85 L250,165" stroke="url(#cgrad1)" strokeWidth="1.5" strokeDasharray="6 8" className="animated-cable" />
            
            {/* Connecting cables between API Gateway -> DB Layer */}
            <path d="M250,205 L250,285" stroke="url(#cgrad2)" strokeWidth="1.5" strokeDasharray="6 8" className="animated-cable" />
            
            {/* Auxiliary side lines to represent background systems */}
            <path d="M120,185 L250,185" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M380,185 L250,185" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="4 4" />
          </svg>

          {/* Interactive Stacking Layer Cards */}
          <div className="relative w-full flex flex-col items-center gap-7 z-10">
            
            {/* Tier 1: Client Gateway */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.03, borderColor: "rgba(179, 136, 255, 0.45)", boxShadow: "0 20px 40px rgba(0,0,0,0.8), 0 0 20px rgba(179,136,255,0.1)" }}
              className="w-72 sm:w-80 md:w-88 rounded-2xl bg-zinc-950/80 border border-white/10 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-all duration-300 flex items-center justify-between group/card select-none"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#B388FF]/10 border border-[#B388FF]/20 text-[#B388FF]">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase font-semibold">Tier 01 // Frontend</span>
                  <h4 className="text-sm font-bold text-white tracking-wide mt-0.5">High-Fidelity Gateway</h4>
                </div>
              </div>
              <div className="flex items-center gap-2 pr-1">
                {getTechIcon('React', 'w-4.5 h-4.5')}
                {getTechIcon('Next.js', 'w-4.5 h-4.5')}
                {getTechIcon('Tailwind CSS', 'w-4.5 h-4.5')}
              </div>
            </motion.div>

            {/* Tier 2: Compute Engine */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.03, borderColor: "rgba(255, 183, 77, 0.45)", boxShadow: "0 20px 40px rgba(0,0,0,0.8), 0 0 20px rgba(255,183,77,0.1)" }}
              className="w-72 sm:w-80 md:w-88 rounded-2xl bg-zinc-950/80 border border-white/10 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-all duration-300 flex items-center justify-between group/card select-none"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FFB74D]/10 border border-[#FFB74D]/20 text-[#FFB74D]">
                  <Terminal className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase font-semibold">Tier 02 // APIs</span>
                  <h4 className="text-sm font-bold text-white tracking-wide mt-0.5">Microservice Compute</h4>
                </div>
              </div>
              <div className="flex items-center gap-2 pr-1">
                {getTechIcon('Node.js', 'w-4.5 h-4.5')}
                {getTechIcon('Express.js', 'w-4.5 h-4.5')}
                {getTechIcon('Python', 'w-4.5 h-4.5')}
              </div>
            </motion.div>

            {/* Tier 3: Persistence Cluster */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.03, borderColor: "rgba(52, 211, 153, 0.45)", boxShadow: "0 20px 40px rgba(0,0,0,0.8), 0 0 20px rgba(52,211,153,0.1)" }}
              className="w-72 sm:w-80 md:w-88 rounded-2xl bg-zinc-950/80 border border-white/10 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-all duration-300 flex items-center justify-between group/card select-none"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Database className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase font-semibold">Tier 03 // DBs</span>
                  <h4 className="text-sm font-bold text-white tracking-wide mt-0.5">Persistence Cluster</h4>
                </div>
              </div>
              <div className="flex items-center gap-2 pr-1">
                {getTechIcon('MongoDB', 'w-4.5 h-4.5')}
                {getTechIcon('MySQL', 'w-4.5 h-4.5')}
                <Server className="w-4.5 h-4.5 text-zinc-400" />
              </div>
            </motion.div>

          </div>

          {/* Embedded Custom CSS for dash speed animations */}
          <style>{`
            @keyframes animateCable {
              to {
                stroke-dashoffset: -32;
              }
            }
            .animated-cable {
              animation: animateCable 1.8s linear infinite;
            }
          `}</style>
        </motion.div>

        {/* Right Side - Content & Statistics */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-6 flex flex-col text-left"
        >
          {/* Neon pill indicator */}
          <div className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full bg-zinc-900/60 border border-white/5 shadow-[0_4px_12px_rgba(0,0,0,0.5)] self-start select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB74D] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFB74D]"></span>
            </span>
            <span className="text-[10px] font-mono tracking-widest text-zinc-300 uppercase">Architecture & Cloud</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight select-none">
            Software <span className="bg-gradient-to-r from-[#FFB74D] via-[#FFE873] to-[#B388FF] bg-clip-text text-transparent">Ecosystems</span>
          </h2>

          <p className="text-zinc-400 mb-10 text-base md:text-lg leading-relaxed font-sans">
            I engineer resilient, highly-scalable software architectures by cleanly decoupling 
            front-end client systems from transaction-heavy API processors. My designs feature 
            secure microservices gateway routing, health container virtualization, and high-performance database cluster configurations, ensuring zero-latency execution.
          </p>

          {/* Elevated Dashboard Stat Panels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
            
            <div className="group/stat bg-zinc-900/35 border border-white/5 rounded-2xl p-5 md:p-6 backdrop-blur-md transition-all duration-300 hover:border-white/10 hover:bg-zinc-900/50 shadow-md">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-white tracking-tight group-hover:text-[#B388FF] transition-colors duration-300">3+</span>
                <span className="text-xs font-bold text-[#B388FF]">projects</span>
              </div>
              <h4 className="text-sm font-bold text-zinc-200 mt-2">Production Deployed</h4>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Integrated MERN stacks fully running across public cloud portals.</p>
            </div>

            <div className="group/stat bg-zinc-900/35 border border-white/5 rounded-2xl p-5 md:p-6 backdrop-blur-md transition-all duration-300 hover:border-[#FFB74D]/20 hover:bg-zinc-900/50 shadow-md">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-[#FFB74D] tracking-tight">100%</span>
                <span className="text-xs font-bold text-[#FFB74D]">active</span>
              </div>
              <h4 className="text-sm font-bold text-zinc-200 mt-2">Continuous Learning</h4>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Proactively orchestrating DevOps pipelines, health probes, and ML algorithms.</p>
            </div>

          </div>

        </motion.div>
      </div>
    </section>
  );
}
