'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Generate random particles only on the client to avoid SSR hydration mismatches
    const generated = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2,
    }));
    setParticles(generated);

    let current = 0;
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 9) + 2;
      current = Math.min(current + increment, 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        // Pause at 100%, then trigger bloom exit
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsComplete(true);
            document.body.style.overflow = '';
          }, 900);
        }, 600);
      }
    }, 70);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: 'blur(20px)',
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0c0c0a] select-none pointer-events-auto overflow-hidden"
        >
          {/* Ambient matrix grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-30" />

          {/* Floating particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-portfolio-accent pointer-events-none"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Large radial violet glow */}
          <motion.div
            className="absolute w-[500px] h-[500px] bg-portfolio-accent/8 rounded-full blur-[120px] pointer-events-none"
            animate={isExiting ? { scale: 2.5, opacity: 0.3 } : { scale: [1, 1.1, 1] }}
            transition={isExiting ? { duration: 0.7, ease: 'easeOut' } : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[300px] h-[300px] bg-blue-500/6 rounded-full blur-[100px] pointer-events-none"
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Main content */}
          <motion.div
            className="flex flex-col items-center gap-6 relative z-10"
            animate={isExiting ? { scale: 1.06 } : { scale: 1 }}
            transition={isExiting ? { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] } : {}}
          >
            {/* Giant serif counter */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative"
            >
              <span
                className="text-[7rem] md:text-[10rem] font-serif leading-none text-white tracking-tighter font-extrabold tabular-nums"
                style={{
                  textShadow: `0 0 80px rgba(var(--portfolio-accent),${progress / 200}), 0 0 40px rgba(var(--portfolio-accent),${progress / 400})`,
                }}
              >
                {progress}
                <span className="text-portfolio-accent">%</span>
              </span>
            </motion.div>

            {/* Subtitle tag */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut', delay: 0.3 }}
              className="text-[11px] font-mono font-bold tracking-[0.35em] text-portfolio-accent/70 uppercase"
            >
              INITIALIZING PORTFOLIO
            </motion.div>

            {/* Progress bar with shimmer */}
            <div className="w-64 h-[2px] bg-white/8 rounded-full overflow-hidden mt-1 relative">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-portfolio-accent via-blue-400 to-portfolio-accent rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.06, ease: 'linear' }}
              />
              {/* Sweeping shimmer highlight */}
              <motion.div
                className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                animate={{ x: [-80, 280] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
              />
            </div>

            {/* Subtle step dots */}
            <div className="flex gap-2 mt-1">
              {[25, 50, 75, 100].map((threshold) => (
                <motion.div
                  key={threshold}
                  className="w-1 h-1 rounded-full"
                  animate={{
                    backgroundColor: progress >= threshold ? 'var(--color-portfolio-accent)' : 'rgba(255,255,255,0.1)',
                    boxShadow: progress >= threshold ? '0 0 6px var(--color-portfolio-accent)' : 'none',
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
