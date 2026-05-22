'use client';

import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

const shimmerCSS = `
  @keyframes shimmerText {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  .honors-shimmer {
    background: linear-gradient(90deg, #ffffff 0%, #fbbf24 35%, #FFB74D 60%, #ffffff 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmerText 3s linear infinite;
  }
`;

export default function Honors() {
  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full relative z-10 overflow-hidden" id="honors">
      <style>{shimmerCSS}</style>

      {/* Breathing gold glow */}
      <motion.div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/6 rounded-full blur-[140px] pointer-events-none -z-10"
        animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.65, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mb-12"
      >
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-zinc-900/60 border border-white/5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]"></span>
          <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Distinguished Recognition</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-2 leading-none">
          <span className="honors-shimmer">Honors</span>{' '}
          <span className="text-white">&amp; Recognition</span>
        </h2>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-wider mt-2">
          Academic Achievements &amp; Excellence Milestones
        </p>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative group overflow-hidden bg-zinc-950/40 border border-white/5 rounded-3xl p-8 md:p-12 backdrop-blur-md transition-all duration-500 hover:bg-zinc-950/60 hover:border-white/10 shadow-2xl hover:shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
      >
        {/* Corner glow */}
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-bl-full blur-3xl pointer-events-none -z-10"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
          <div className="flex gap-6 items-start">

            {/* Trophy — spring bounce on entry */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0, rotate: -15 }}
              whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.2 }}
              whileHover={{ scale: 1.12, rotate: 5, transition: { type: 'spring', stiffness: 300, damping: 12 } }}
              className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 group-hover:border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)] group-hover:shadow-[0_0_35px_rgba(245,158,11,0.3)] transition-all duration-500 shrink-0 cursor-default"
            >
              <motion.div
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
              >
                <Trophy className="w-8 h-8 text-amber-400" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-bold block mb-2">
                University Distinction
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                Dean&apos;s List Award — Academic Excellence Honor
              </h3>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-3xl">
                Recognized and awarded on the Dean&apos;s List for securing exceptional academic performance and maintaining a top-tier GPA during the first year of the Software Engineering undergraduate curriculum.
              </p>
            </motion.div>
          </div>

          {/* Stats panel */}
          <motion.div
            initial={{ opacity: 0, x: 25, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="flex flex-col gap-2 bg-black/40 border border-white/5 rounded-2xl p-6 min-w-[200px] shrink-0 font-mono text-xs text-zinc-400 hover:border-amber-500/15 transition-all duration-300"
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
