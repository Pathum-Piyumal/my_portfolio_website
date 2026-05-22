'use client';

import { motion } from 'framer-motion';
import { Triangle, Cloud, Zap, Cpu } from 'lucide-react';

const competencies = [
  {
    title: 'Macro Architecture Thinking',
    description: 'Designing modular interfaces, system boundaries, and low-latency communication frameworks for scalable enterprise applications.',
    icon: <Triangle className="w-6 h-6 text-[#B388FF]" />,
    glowColor: 'rgba(179, 136, 255, 0.18)',
    borderHover: 'group-hover:border-[#B388FF]/30',
    accentColor: '#B388FF'
  },
  {
    title: 'Distributed System Design',
    description: 'Orchestrating high-performance distributed architectures capable of processing massive transactional throughput with high availability.',
    icon: <Cloud className="w-6 h-6 text-blue-400" />,
    glowColor: 'rgba(59, 130, 246, 0.18)',
    borderHover: 'group-hover:border-blue-500/30',
    accentColor: '#60a5fa'
  },
  {
    title: 'DevOps & Containers',
    description: 'Decoupling application layers using Docker container environments and automating integration sequences via resilient CI/CD pipelines.',
    icon: <Zap className="w-6 h-6 text-amber-400" />,
    glowColor: 'rgba(245, 158, 11, 0.18)',
    borderHover: 'group-hover:border-amber-500/30',
    accentColor: '#fbbf24'
  },
  {
    title: 'AI/ML Ecosystems',
    description: 'Integrating analytical data algorithms and predictive neural network nodes directly into responsive production software frameworks.',
    icon: <Cpu className="w-6 h-6 text-emerald-400" />,
    glowColor: 'rgba(16, 185, 129, 0.18)',
    borderHover: 'group-hover:border-emerald-500/30',
    accentColor: '#34d399'
  }
];

const shimmerCSS = `
  @keyframes shimmerText {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  .comp-shimmer {
    background: linear-gradient(90deg, #ffffff 0%, #34d399 35%, #B388FF 65%, #ffffff 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmerText 3.5s linear infinite;
  }
`;

export default function CoreCompetencies() {
  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full relative z-10 overflow-hidden" id="competencies">
      <style>{shimmerCSS}</style>

      {/* Breathing ambient glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none -z-10"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.65, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mb-16 text-left"
      >
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-zinc-900/60 border border-white/5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
          <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Core Frameworks</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-2 leading-none">
          <span className="comp-shimmer">Core</span>{' '}
          <span className="text-white">Competencies</span>
        </h2>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-wider mt-2">
          Key domains of engineering expertise
        </p>
      </motion.div>

      {/* Competency cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {competencies.map((comp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 35, scale: 0.95, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: idx * 0.14, ease: [0.34, 1.56, 0.64, 1] }}
            whileHover={{ y: -7, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
            className={`group relative overflow-hidden bg-zinc-950/40 border border-white/5 p-8 rounded-3xl flex gap-6 backdrop-blur-md transition-all duration-500 hover:bg-zinc-950/60 ${comp.borderHover} shadow-2xl hover:shadow-[0_25px_55px_rgba(0,0,0,0.5)] cursor-pointer`}
            style={{ ['--glow-color' as any]: comp.glowColor }}
          >
            {/* Hover spotlight */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10 blur-xl"
              style={{ background: `radial-gradient(circle_at_20%_20%, var(--glow-color), transparent_55%)` }}
            />

            {/* Accent bar */}
            <motion.div
              className="absolute left-0 top-8 bottom-8 w-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ backgroundColor: comp.accentColor }}
            />

            {/* Icon with scale+rotate */}
            <motion.div
              whileHover={{ scale: 1.2, rotate: 12 }}
              transition={{ type: 'spring', stiffness: 380, damping: 16 }}
              className="shrink-0 p-3.5 rounded-2xl bg-white/5 border border-white/5 group-hover:border-white/10 shadow-lg h-fit flex items-center justify-center"
            >
              {comp.icon}
            </motion.div>

            <div>
              <motion.h3
                className="text-lg font-bold text-white mb-2 transition-colors duration-300"
                whileHover={{ color: comp.accentColor }}
              >
                {comp.title}
              </motion.h3>
              <p className="text-zinc-400 text-[13px] leading-relaxed font-sans group-hover:text-zinc-300 transition-colors duration-300">
                {comp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
