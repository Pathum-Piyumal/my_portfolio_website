'use client';

import { motion } from 'framer-motion';
import { Cpu, Code, Heart, Sparkles, Calendar, ChevronRight } from 'lucide-react';

const societies = [
  {
    name: "IEEE Computer Society Student Branch",
    focus: "Technical Workshops & Study Circles",
    statusBadge: "Engagement Pipeline",
    statusText: "Incoming Contributor",
    statusColor: "text-portfolio-accent border-portfolio-accent/30 bg-portfolio-accent/10",
    icon: <Cpu className="w-6 h-6 text-portfolio-accent" />,
    iconBg: "bg-portfolio-accent/10 border-portfolio-accent/20 group-hover:border-portfolio-accent/40",
    glowColor: "bg-portfolio-accent/5",
    colorTheme: "var(--color-portfolio-accent)",
    timeline: "Target Launch: Q3 2026",
    initiatives: [
      "Designing study plans for peer-led workshops in Python, Data Science, and basic React.",
      "Preparing to volunteer as a hackathon logistics and developer helper.",
      "Building interactive algorithm visualizations to aid first-year learning groups."
    ]
  }
];

const shimmerCSS = `
  @keyframes shimmerText {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  .vol-shimmer {
    background: linear-gradient(90deg, #ffffff 0%, #22d3ee 35%, var(--color-portfolio-accent) 65%, #ffffff 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmerText 3.5s linear infinite;
  }
`;

export default function Volunteering() {
  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full relative z-10 overflow-hidden" id="volunteering">
      <style>{shimmerCSS}</style>

      {/* Breathing ambient orbs */}
      <motion.div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-portfolio-accent/5 rounded-full blur-[140px] pointer-events-none -z-10"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none -z-10"
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mb-12"
      >
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-zinc-900/60 border border-white/5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
          <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Community &amp; Outreach</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-2 leading-none">
          <span className="vol-shimmer">Volunteering</span>{' '}
          <span className="text-white">&amp; Societies</span>
        </h2>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-wider mt-2">
          Planned Leadership Objectives &amp; Extracurricular Contributions
        </p>
      </motion.div>

      {/* Info callout */}
      <motion.div
        initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative bg-zinc-950/30 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-md mb-12 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
      >
        <div className="flex gap-4 items-start">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 350, damping: 15 }}
            className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 shrink-0"
          >
            <Sparkles className="w-6 h-6 text-cyan-400" />
          </motion.div>
          <div>
            <h3 className="text-sm font-bold text-white font-mono uppercase mb-1">
              Roadmap to Service &amp; Leadership
            </h3>
            <p className="text-zinc-400 text-xs md:text-sm max-w-4xl leading-relaxed">
              As a dedicated software engineering student, I aim to extend my tech skills to volunteer, lead, and contribute to student organizations. I have mapped out active engagement pathways to support regional drives, organize tech panels, and lead study groups in the upcoming semesters.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Society cards — stagger per card */}
      <div className="flex justify-center">
        {societies.map((society, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40, scale: 0.94, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: idx * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
            whileHover={{ y: -8, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
            className="group relative flex flex-col justify-between overflow-hidden bg-zinc-950/40 border border-white/5 rounded-3xl p-8 backdrop-blur-md transition-all duration-300 hover:bg-zinc-950/60 hover:border-white/10 shadow-2xl hover:shadow-[0_25px_50px_rgba(0,0,0,0.5)] max-w-2xl w-full"
          >
            {/* Corner glow */}
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10 ${society.glowColor}`} />

            <div>
              {/* Icon & status */}
              <div className="flex items-center justify-between mb-6">
                <motion.div
                  whileHover={{ scale: 1.12, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 15 }}
                  className={`p-3.5 rounded-2xl border transition-all duration-500 shrink-0 ${society.iconBg}`}
                >
                  {society.icon}
                </motion.div>
                <span className={`px-2.5 py-1 rounded-full border text-[10px] font-mono tracking-wide font-bold ${society.statusColor}`}>
                  {society.statusBadge}
                </span>
              </div>

              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block mb-1">
                {society.focus}
              </span>
              <h3 className="text-lg md:text-xl font-bold text-white leading-tight mb-4 group-hover:text-zinc-200 transition-colors duration-300">
                {society.name}
              </h3>

              <div className="flex items-center gap-2 mb-6 bg-white/5 border border-white/5 rounded-xl px-3 py-2 w-fit">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-[10px] font-mono text-zinc-400">{society.timeline}</span>
              </div>

              <div className="space-y-3 pt-2">
                <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase block">Planned Initiatives:</span>
                <ul className="space-y-2.5">
                  {society.initiatives.map((item, itemIdx) => (
                    <motion.li
                      key={itemIdx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 + itemIdx * 0.08 }}
                      className="flex gap-2 items-start text-xs text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300"
                    >
                      <ChevronRight className="w-3.5 h-3.5 mt-0.5 shrink-0 text-cyan-500/70" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Target Role:</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                <span className="text-[10px] font-mono text-white font-bold">{society.statusText}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
