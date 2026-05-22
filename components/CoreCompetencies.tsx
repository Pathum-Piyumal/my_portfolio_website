'use client';

import { motion } from 'framer-motion';
import { Triangle, Cloud, Zap, Cpu } from 'lucide-react';

const competencies = [
  {
    title: 'Macro Architecture Thinking',
    description: 'Designing modular interfaces, system boundaries, and low-latency communication frameworks for scalable enterprise applications.',
    icon: <Triangle className="w-6 h-6 text-[#B388FF]" />,
    glowColor: 'rgba(179, 136, 255, 0.15)',
    borderHover: 'group-hover:border-[#B388FF]/30'
  },
  {
    title: 'Distributed System Design',
    description: 'Orchestrating high-performance distributed architectures capable of processing massive transactional throughput with high availability.',
    icon: <Cloud className="w-6 h-6 text-blue-400" />,
    glowColor: 'rgba(59, 130, 246, 0.15)',
    borderHover: 'group-hover:border-blue-500/30'
  },
  {
    title: 'DevOps & Containers',
    description: 'Decoupling application layers using Docker container environments and automating integration sequences via resilient CI/CD pipelines.',
    icon: <Zap className="w-6 h-6 text-amber-400" />,
    glowColor: 'rgba(245, 158, 11, 0.15)',
    borderHover: 'group-hover:border-amber-500/30'
  },
  {
    title: 'AI/ML Ecosystems',
    description: 'Integrating analytical data algorithms and predictive neural network nodes directly into responsive production software frameworks.',
    icon: <Cpu className="w-6 h-6 text-emerald-400" />,
    glowColor: 'rgba(16, 185, 129, 0.15)',
    borderHover: 'group-hover:border-emerald-500/30'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" as const } }
};

export default function CoreCompetencies() {
  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full relative z-10 overflow-hidden" id="competencies">
      {/* Ambient background glowing vector */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" />

      {/* Heading Title Area */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16 text-left"
      >
        {/* Monospace Badge */}
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-zinc-900/60 border border-white/5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
          <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Core Frameworks</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2 leading-none">
          Core Competencies
        </h2>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-wider mt-2">
          Key domains of engineering expertise
        </p>
      </motion.div>

      {/* Competency Staggered Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
      >
        {competencies.map((comp, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className={`group relative overflow-hidden bg-zinc-950/40 border border-white/5 p-8 rounded-3xl flex gap-6 backdrop-blur-md transition-all duration-500 hover:bg-zinc-950/60 ${comp.borderHover} shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer`}
            style={{
              ['--glow-color' as any]: comp.glowColor
            }}
          >
            {/* Custom hover spotlight halo */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10 blur-xl"
              style={{
                background: `radial-gradient(circle_at_20%_20%, var(--glow-color), transparent_50%)`
              }}
            />

            <div className="shrink-0 p-3.5 rounded-2xl bg-white/5 border border-white/5 group-hover:border-white/10 shadow-lg group-hover:scale-105 group-hover:rotate-1 transition-all duration-500 h-fit flex items-center justify-center">
              {comp.icon}
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white transition-colors duration-300">
                {comp.title}
              </h3>
              <p className="text-zinc-400 text-[13px] leading-relaxed font-sans group-hover:text-zinc-300 transition-colors duration-300">
                {comp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
