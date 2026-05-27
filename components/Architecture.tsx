'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Globe, Database, Terminal, X } from 'lucide-react';
import { techStack } from '@/lib/tech-data';

// Animated counter hook
function useCountUp(target: number, duration: number = 1.5, trigger: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const steps = 60;
    const increment = target / steps;
    const interval = (duration * 1000) / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [target, duration, trigger]);
  return count;
}

const shimmerStyle = `
  @keyframes animateCable {
    to { stroke-dashoffset: -32; }
  }
  .animated-cable { animation: animateCable 1.8s linear infinite; }
`;

interface NodeDetails {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  specs: { label: string; value: string }[];
  tech: string[];
  metrics: { label: string; value: string; desc: string }[];
}

const nodeDetailsRegistry: Record<'frontend' | 'apis' | 'dbs', NodeDetails> = {
  frontend: {
    title: "Client Interface Layer",
    subtitle: "Tier 01 // Interactive UI & Next.js SSR Delivery",
    description: "The presentation layer of this portfolio, built with Next.js 15 and React 19. Uses TypeScript for end-to-end type safety, Tailwind CSS v4 for utility-first styling with HSL accent theming, and Framer Motion for high-fidelity micro-animations and scroll-driven interactions. All pages are server-side rendered with selective client hydration.",
    icon: <Globe className="w-5 h-5" />,
    specs: [
      { label: "Framework", value: "Next.js 15 (App Router)" },
      { label: "Styling", value: "Tailwind CSS v4 + CSS Variables" },
      { label: "Animations", value: "Framer Motion 12" },
      { label: "Language", value: "TypeScript + React 19" }
    ],
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript"],
    metrics: [
      { label: "Rendering", value: "SSR", desc: "Server-side rendered with client hydration" },
      { label: "Type Safety", value: "100%", desc: "Full TypeScript coverage across components" }
    ]
  },
  apis: {
    title: "Server & API Layer",
    subtitle: "Tier 02 // Serverless Routes & Express REST APIs",
    description: "This portfolio's backend runs as a Next.js serverless API route that securely queries the GitHub GraphQL v4 API with edge revalidation caching. Additionally, an ongoing project (Autonomous Dev Agent — Nexus) uses a Node.js + Express.js REST backend to orchestrate multi-model LLM pipelines and Git automation workflows.",
    icon: <Terminal className="w-5 h-5" />,
    specs: [
      { label: "Portfolio API", value: "Next.js Serverless Route" },
      { label: "Integration", value: "GitHub GraphQL v4 API" },
      { label: "Cache Strategy", value: "Edge Revalidation (3600s)" },
      { label: "Nexus Backend", value: "Node.js + Express.js (ongoing)" }
    ],
    tech: ["Node.js", "Express.js", "JavaScript", "TypeScript"],
    metrics: [
      { label: "Cache TTL", value: "3600s", desc: "GitHub API edge revalidation window" },
      { label: "Token Safety", value: "ENV", desc: "Secrets secured in environment variables" }
    ]
  },
  dbs: {
    title: "Data Persistence Layer",
    subtitle: "Tier 03 // Relational Storage & Structured Queries",
    description: "MySQL is used as the primary relational database in the MindEase mental wellness platform (PHP + MySQL stack) and in the ongoing Nexus autonomous agent project (Node.js + Express.js + MySQL). Structured schemas handle user records, mood analytics, journal entries, and application state with ACID-compliant transactions.",
    icon: <Database className="w-5 h-5" />,
    specs: [
      { label: "Database", value: "MySQL (Relational)" },
      { label: "MindEase Stack", value: "PHP + MySQL" },
      { label: "Nexus Stack", value: "Express.js + MySQL (ongoing)" },
      { label: "Compliance", value: "ACID Transactions" }
    ],
    tech: ["MySQL", "PHP", "Node.js"],
    metrics: [
      { label: "Integrity", value: "ACID", desc: "Full relational transaction compliance" },
      { label: "Projects", value: "2", desc: "MindEase (live) & Nexus (ongoing)" }
    ]
  }
};

export default function Architecture() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [activeNode, setActiveNode] = useState<'frontend' | 'apis' | 'dbs' | null>(null);
  const [hoveredNode, setHoveredNode] = useState<'frontend' | 'apis' | 'dbs' | null>(null);

  const projectCount = useCountUp(3, 1.4, statsInView);

  const getTechIcon = (name: string, className = "w-4 h-4") => {
    const tech = techStack.find(t => t.name.toLowerCase() === name.toLowerCase());
    return tech ? tech.icon(className) : null;
  };

  const tierVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
    visible: (i: number) => ({
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { duration: 0.65, delay: i * 0.15, ease: 'easeOut' as const }
    })
  };

  // Render animated glowing dots/packets along the SVG cables based on hovered or active states
  const renderDataPackets = () => {
    const isFirstSegmentActive = 
      hoveredNode === 'frontend' || hoveredNode === 'apis' || 
      activeNode === 'frontend' || activeNode === 'apis';
      
    const isSecondSegmentActive = 
      hoveredNode === 'apis' || hoveredNode === 'dbs' || 
      activeNode === 'apis' || activeNode === 'dbs';

    return (
      <>
        {/* Packet 1: Tier 1 to Tier 2 */}
        {isFirstSegmentActive && (
          <motion.circle
            r="4.5"
            fill="var(--color-portfolio-accent)"
            filter="drop-shadow(0 0 6px var(--color-portfolio-accent))"
            initial={{ cx: 250, cy: 85 }}
            animate={{ cy: [85, 165] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        )}
        {/* Packet 2: Tier 2 to Tier 3 */}
        {isSecondSegmentActive && (
          <motion.circle
            r="4.5"
            fill="var(--color-portfolio-accent)"
            filter="drop-shadow(0 0 6px var(--color-portfolio-accent))"
            initial={{ cx: 250, cy: 205 }}
            animate={{ cy: [205, 285] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        )}
      </>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="py-28 px-4 md:px-8 max-w-7xl mx-auto w-full relative overflow-hidden"
      id="architecture"
    >
      <style>{shimmerStyle}</style>

      {/* Dynamic ambient backdrop */}
      <motion.div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-portfolio-accent/5 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse"
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        {/* Left Side — 3D stack diagram */}
        <motion.div
          initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="lg:col-span-6 w-full aspect-[4/3.8] sm:aspect-[4/3.2] md:aspect-[4/3] rounded-3xl bg-zinc-950/40 border border-white/5 p-6 md:p-8 flex flex-col justify-center items-center overflow-hidden relative group shadow-2xl"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--portfolio-accent),0.04)_0%,transparent_70%)] opacity-80" />

          {/* SVG cables */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 400">
            <defs>
              <linearGradient id="cgrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--color-portfolio-accent)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--color-portfolio-accent)" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="cgrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--color-portfolio-accent)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--color-portfolio-accent)" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <path d="M250,85 L250,165" stroke="url(#cgrad1)" strokeWidth="1.5" strokeDasharray="6 8" className="animated-cable" />
            <path d="M250,205 L250,285" stroke="url(#cgrad2)" strokeWidth="1.5" strokeDasharray="6 8" className="animated-cable" />
            <path d="M120,185 L250,185" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M380,185 L250,185" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="4 4" />
            {renderDataPackets()}
          </svg>

          {/* Tier cards with staggered reveal */}
          <div className="relative w-full flex flex-col items-center gap-7 z-10">

            {/* Tier 1 */}
            <motion.div
              custom={0}
              variants={tierVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ 
                borderColor: activeNode === 'frontend' ? 'var(--color-portfolio-accent)' : 'rgba(255,255,255,0.1)',
                boxShadow: activeNode === 'frontend' ? '0 0 20px rgba(var(--portfolio-accent), 0.25)' : '0 10px 30px rgba(0,0,0,0.85)'
              }}
              whileHover={{ 
                scale: 1.03, 
                borderColor: 'var(--color-portfolio-accent)', 
                boxShadow: '0 20px 40px rgba(0,0,0,0.8), 0 0 20px rgba(var(--portfolio-accent), 0.15)' 
              }}
              onClick={() => setActiveNode(activeNode === 'frontend' ? null : 'frontend')}
              onMouseEnter={() => setHoveredNode('frontend')}
              onMouseLeave={() => setHoveredNode(null)}
              className="w-72 sm:w-80 md:w-88 rounded-2xl bg-zinc-950/80 border p-4 backdrop-blur-xl transition-all duration-300 flex items-center justify-between group/card select-none cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-portfolio-accent/10 border border-portfolio-accent/20 text-portfolio-accent transition-colors duration-300 shadow-[0_0_8px_rgba(var(--portfolio-accent),0.05)]">
                  <Globe className="w-5 h-5 animate-pulse" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase font-semibold">Tier 01 // Frontend</span>
                  <h4 className="text-sm font-bold text-white tracking-wide mt-0.5">Client Interface Layer</h4>
                </div>
              </div>
              <div className="flex items-center gap-2 pr-1">
                {getTechIcon('React', 'w-4.5 h-4.5')}
                {getTechIcon('Next.js', 'w-4.5 h-4.5')}
                {getTechIcon('TypeScript', 'w-4.5 h-4.5')}
              </div>
            </motion.div>

            {/* Tier 2 */}
            <motion.div
              custom={1}
              variants={tierVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ 
                borderColor: activeNode === 'apis' ? 'var(--color-portfolio-accent)' : 'rgba(255,255,255,0.1)',
                boxShadow: activeNode === 'apis' ? '0 0 20px rgba(var(--portfolio-accent), 0.25)' : '0 10px 30px rgba(0,0,0,0.85)'
              }}
              whileHover={{ 
                scale: 1.03, 
                borderColor: 'var(--color-portfolio-accent)', 
                boxShadow: '0 20px 40px rgba(0,0,0,0.8), 0 0 20px rgba(var(--portfolio-accent), 0.15)' 
              }}
              onClick={() => setActiveNode(activeNode === 'apis' ? null : 'apis')}
              onMouseEnter={() => setHoveredNode('apis')}
              onMouseLeave={() => setHoveredNode(null)}
              className="w-72 sm:w-80 md:w-88 rounded-2xl bg-zinc-950/80 border p-4 backdrop-blur-xl transition-all duration-300 flex items-center justify-between group/card select-none cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-portfolio-accent/10 border border-portfolio-accent/20 text-portfolio-accent transition-colors duration-300 shadow-[0_0_8px_rgba(var(--portfolio-accent),0.05)]">
                  <Terminal className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase font-semibold">Tier 02 // APIs</span>
                  <h4 className="text-sm font-bold text-white tracking-wide mt-0.5">Server & API Layer</h4>
                </div>
              </div>
              <div className="flex items-center gap-2 pr-1">
                {getTechIcon('Node.js', 'w-4.5 h-4.5')}
                {getTechIcon('Express.js', 'w-4.5 h-4.5')}
                {getTechIcon('TypeScript', 'w-4.5 h-4.5')}
              </div>
            </motion.div>

            {/* Tier 3 */}
            <motion.div
              custom={2}
              variants={tierVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              style={{ 
                borderColor: activeNode === 'dbs' ? 'var(--color-portfolio-accent)' : 'rgba(255,255,255,0.1)',
                boxShadow: activeNode === 'dbs' ? '0 0 20px rgba(var(--portfolio-accent), 0.25)' : '0 10px 30px rgba(0,0,0,0.85)'
              }}
              whileHover={{ 
                scale: 1.03, 
                borderColor: 'var(--color-portfolio-accent)', 
                boxShadow: '0 20px 40px rgba(0,0,0,0.8), 0 0 20px rgba(var(--portfolio-accent), 0.15)' 
              }}
              onClick={() => setActiveNode(activeNode === 'dbs' ? null : 'dbs')}
              onMouseEnter={() => setHoveredNode('dbs')}
              onMouseLeave={() => setHoveredNode(null)}
              className="w-72 sm:w-80 md:w-88 rounded-2xl bg-zinc-950/80 border p-4 backdrop-blur-xl transition-all duration-300 flex items-center justify-between group/card select-none cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-portfolio-accent/10 border border-portfolio-accent/20 text-portfolio-accent transition-colors duration-300 shadow-[0_0_8px_rgba(var(--portfolio-accent),0.05)]">
                  <Database className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase font-semibold">Tier 03 // DBs</span>
                  <h4 className="text-sm font-bold text-white tracking-wide mt-0.5">Data Persistence Layer</h4>
                </div>
              </div>
              <div className="flex items-center gap-2 pr-1">
                {getTechIcon('MySQL', 'w-4.5 h-4.5')}
                {getTechIcon('PHP', 'w-4.5 h-4.5')}
                {getTechIcon('Node.js', 'w-4.5 h-4.5')}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side — Content Console (Default Stats vs Node Details Crossfade) */}
        <div className="lg:col-span-6 w-full flex flex-col justify-center min-h-[420px] relative">
          <AnimatePresence mode="wait">
            {!activeNode ? (
              /* Default Stats & Intro Panel */
              <motion.div
                key="default-stats"
                initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex flex-col text-left"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full bg-zinc-900/60 border border-white/5 shadow-[0_4px_12px_rgba(0,0,0,0.5)] self-start select-none">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-portfolio-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-portfolio-accent shadow-[0_0_8px_var(--color-portfolio-accent)]"></span>
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-zinc-300 uppercase">Architecture &amp; Cloud</span>
                </div>

                {/* Shimmer heading */}
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight select-none">
                  Software{' '}
                  <span className="bg-gradient-to-r from-white via-zinc-300 to-portfolio-accent bg-clip-text text-transparent">Ecosystems</span>
                </h2>

                <p className="text-zinc-400 mb-10 text-sm md:text-base leading-relaxed font-sans select-none">
                   I build full-stack web applications with clean separation of concerns — from
                   server-rendered Next.js frontends and serverless API integrations, to structured
                   relational databases. My current projects span PHP + MySQL platforms, Node.js
                   + Express.js REST backends, and ongoing autonomous agent engineering.
                </p>

                {/* Stat Panels with counter roll-up */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                  <motion.div
                    whileHover={{ y: -4, borderColor: 'rgba(var(--portfolio-accent),0.25)', transition: { duration: 0.2 } }}
                    className="group/stat bg-zinc-900/35 border border-white/5 rounded-2xl p-5 md:p-6 backdrop-blur-md transition-all duration-300 hover:bg-zinc-900/50 shadow-md cursor-default"
                  >
                    <div className="flex items-baseline gap-1 select-none">
                      <span className="text-3xl font-extrabold text-white tracking-tight group-hover/stat:text-portfolio-accent transition-colors duration-300 tabular-nums">
                        {projectCount}+
                      </span>
                      <span className="text-xs font-bold text-portfolio-accent uppercase font-mono tracking-wider ml-1">projects</span>
                    </div>
                    <h4 className="text-sm font-bold text-zinc-200 mt-2 select-none">Production Deployed</h4>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed select-none">Integrated MERN stacks fully running across public cloud portals.</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -4, borderColor: 'rgba(var(--portfolio-accent),0.25)', transition: { duration: 0.2 } }}
                    className="group/stat bg-zinc-900/35 border border-white/5 rounded-2xl p-5 md:p-6 backdrop-blur-md transition-all duration-300 hover:bg-zinc-900/50 shadow-md cursor-default"
                  >
                    <div className="flex items-baseline gap-1 select-none">
                      <span className="text-3xl font-extrabold text-portfolio-accent tracking-tight tabular-nums">
                        100%
                      </span>
                      <span className="text-xs font-bold text-portfolio-accent uppercase font-mono tracking-wider ml-1">active</span>
                    </div>
                    <h4 className="text-sm font-bold text-zinc-200 mt-2 select-none">Continuous Learning</h4>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed select-none">Proactively orchestrating DevOps pipelines, health probes, and ML algorithms.</p>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              /* Glassmorphic Node Detail Panel */
              <motion.div
                key={activeNode}
                initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="bg-zinc-900/35 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl relative flex flex-col justify-between text-left"
              >
                {/* Glow accent corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-portfolio-accent/5 rounded-bl-full blur-xl pointer-events-none" />

                <div>
                  {/* Detail Panel Header */}
                  <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <span className="p-2 rounded-xl bg-portfolio-accent/10 border border-portfolio-accent/20 text-portfolio-accent shrink-0">
                        {nodeDetailsRegistry[activeNode].icon}
                      </span>
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-semibold">
                          {nodeDetailsRegistry[activeNode].subtitle}
                        </span>
                        <h3 className="text-lg md:text-xl font-black text-white tracking-wide mt-0.5 select-none">
                          {nodeDetailsRegistry[activeNode].title}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Close Pill */}
                    <button 
                      onClick={() => setActiveNode(null)}
                      className="p-1.5 rounded-lg border border-white/10 hover:border-portfolio-accent/30 text-zinc-400 hover:text-white transition-all duration-200 cursor-pointer flex items-center justify-center bg-zinc-950/60 hover:scale-105 active:scale-95 shadow-md"
                      title="Back to Stats"
                    >
                      <X className="w-3.5 h-3.5 text-portfolio-accent" />
                    </button>
                  </div>

                  {/* Node Tech Description */}
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6 font-sans select-none">
                    {nodeDetailsRegistry[activeNode].description}
                  </p>

                  {/* Specifications dynamic mapping */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {nodeDetailsRegistry[activeNode].specs.map((spec, specIdx) => (
                      <div key={specIdx} className="bg-zinc-950/40 border border-white/5 rounded-xl p-3 flex flex-col justify-center">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">{spec.label}</span>
                        <span className="text-xs font-bold text-white mt-1 truncate">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Core Stack Badges */}
                  <div className="mb-6">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-3">Verified Integration Technologies</span>
                    <div className="flex flex-wrap gap-2">
                      {nodeDetailsRegistry[activeNode].tech.map((tag) => {
                        const matchedTech = techStack.find(t => t.name.toLowerCase() === tag.toLowerCase());
                        return (
                          <span 
                            key={tag} 
                            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold font-sans tracking-wide transition-all duration-300 flex items-center gap-1.5 select-none ${
                              matchedTech ? matchedTech.badgeColor : "bg-white/5 border-white/5 text-zinc-300"
                            }`}
                          >
                            {matchedTech && matchedTech.icon("w-3.5 h-3.5")}
                            <span>{tag}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Key Metrics Bento row */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                  {nodeDetailsRegistry[activeNode].metrics.map((metric, metricIdx) => (
                    <div key={metricIdx} className="flex flex-col">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">{metric.label}</span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-xl font-extrabold text-portfolio-accent tracking-tight">{metric.value}</span>
                        <span className="text-[9px] text-zinc-400 font-sans">{metric.desc}</span>
                      </div>
                    </div>
                  ))}
                  <div className="hidden sm:flex items-center gap-1.5 text-[9px] font-mono text-emerald-400 font-bold bg-emerald-500/5 border border-emerald-500/10 px-2 py-1 rounded-md shrink-0">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                    <span>SECURE PIPELINE</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
