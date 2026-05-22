'use client';

import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const cardReveal = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" as const } }
};

const trophySpring = {
  hidden: { scale: 0.6, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring" as const, stiffness: 180, damping: 12 } }
};

const detailsSlide = {
  hidden: { opacity: 0, x: 15 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

export default function Honors() {
  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full relative z-10 overflow-hidden" id="honors">
      {/* Soft gold glowing backdrop */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" />

      {/* Title block with scroll reveal */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="mb-12"
      >
        {/* Monospace Badge */}
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-zinc-900/60 border border-white/5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]"></span>
          <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Distinguished Recognition</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2 leading-none">
          Honors & Recognition
        </h2>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-wider mt-2">
          Academic Achievements & Excellence Milestones
        </p>
      </motion.div>

      {/* Main card with stagger reveal */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={cardReveal}
        className="relative group overflow-hidden bg-zinc-950/40 border border-white/5 rounded-3xl p-8 md:p-12 backdrop-blur-md transition-all duration-500 hover:bg-zinc-950/60 hover:border-white/10 shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        {/* Soft gold glowing corner inside the card */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-bl-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10" />

        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
          <div className="flex gap-6 items-start">
            <motion.div 
              variants={trophySpring}
              className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 group-hover:border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)] group-hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] transition-all duration-500 shrink-0"
            >
              <Trophy className="w-8 h-8 text-amber-400 animate-pulse" />
            </motion.div>
            
            <motion.div variants={detailsSlide}>
              <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-bold block mb-2">
                University Distinction
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                Dean's List Award — Academic Excellence Honor
              </h3>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-3xl">
                Recognized and awarded on the Dean's List for securing exceptional academic performance and maintaining a top-tier GPA during the first year of the Software Engineering undergraduate curriculum.
              </p>
            </motion.div>
          </div>

          {/* Extra details on the right */}
          <motion.div 
            variants={detailsSlide}
            className="flex flex-col gap-2 bg-black/40 border border-white/5 rounded-2xl p-6 min-w-[200px] shrink-0 font-mono text-xs text-zinc-400"
          >
            <div className="flex justify-between gap-4">
              <span>LEVEL:</span>
              <strong className="text-white">Year 1 (Level 1)</strong>
            </div>
            <div className="flex justify-between gap-4 border-t border-white/5 pt-2 mt-2">
              <span>FACULTY:</span>
              <strong className="text-white">Computing</strong>
            </div>
            <div className="flex justify-between gap-4 border-t border-white/5 pt-2 mt-2">
              <span>AWARDED:</span>
              <strong className="text-[#FFB74D] font-bold">First Class Standing</strong>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
