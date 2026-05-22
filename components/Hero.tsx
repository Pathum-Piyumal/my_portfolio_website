'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Code } from 'lucide-react';
import Link from 'next/link';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { techStack } from '@/lib/tech-data';

const roles = [
  { text: "SE Undergraduate", color: "text-[#FFB74D] border-[#FFB74D]/20 bg-[#FFB74D]/5 shadow-[0_0_15px_rgba(255,183,77,0.15)]" },
  { text: "Fullstack Developer", color: "text-[#B388FF] border-[#B388FF]/20 bg-[#B388FF]/5 shadow-[0_0_15px_rgba(179,136,255,0.15)]" },
  { text: "MERN Stack Specialist", color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5 shadow-[0_0_15px_rgba(52,211,153,0.15)]" },
  { text: "AI/ML Aspirant", color: "text-blue-400 border-blue-500/20 bg-blue-500/5 shadow-[0_0_15px_rgba(96,165,250,0.15)]" }
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // Mouse tracking for photo parallax
  const photoRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 120, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-8, 8]), springConfig);
  const photoTranslateX = useSpring(useTransform(mouseX, [-200, 200], [-8, 8]), springConfig);
  const photoTranslateY = useSpring(useTransform(mouseY, [-200, 200], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!photoRef.current) return;
    const rect = photoRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseX.set(e.clientX - cx);
    mouseY.set(e.clientY - cy);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Typewriter effect
  useEffect(() => {
    const activeRole = roles[roleIndex].text;
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(activeRole.substring(0, currentText.length - 1));
        setTypingSpeed(40);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText(activeRole.substring(0, currentText.length + 1));
        setTypingSpeed(80);
      }, typingSpeed);
    }

    if (!isDeleting && currentText === activeRole) {
      timer = setTimeout(() => { setIsDeleting(true); }, 1800);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      setTypingSpeed(200);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, typingSpeed]);

  const name = "R.M.P.P. Kumarathunga";
  const nameWords = name.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.035, delayChildren: 0.1 }
    }
  } as const;

  const letterVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(6px)", scale: 0.8 },
    visible: {
      opacity: 1, y: 0, filter: "blur(0px)", scale: 1,
      transition: { type: "spring" as const, damping: 14, stiffness: 160 }
    }
  } as const;

  // Stagger variants for left-column content
  const contentStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.6 }
    }
  };
  const contentChild = {
    hidden: { opacity: 0, y: 22, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: 'easeOut' as const } }
  };

  return (
    <section className="pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full flex flex-col min-h-screen justify-center relative select-none">
      {/* Animated background orbs */}
      <motion.div
        className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#B388FF]/10 rounded-full blur-[120px] -z-10 pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10 pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div className="flex flex-col items-start z-10">

          {/* Role tag — fades in first */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className={`px-4 py-1.5 rounded-full border text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-500 ${roles[roleIndex].color}`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
              </span>
              <span>
                {currentText}
                <span className="animate-[pulse_1s_infinite] font-semibold">|</span>
              </span>
            </span>
          </motion.div>

          {/* Letter-by-letter name */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 flex flex-wrap gap-x-4 gap-y-2 justify-center lg:justify-start"
          >
            {nameWords.map((word, wordIdx) => (
              <span key={wordIdx} className="whitespace-nowrap inline-block">
                {word.split("").map((char, charIdx) => (
                  <motion.span
                    key={charIdx}
                    variants={letterVariants}
                    whileHover={{
                      scale: 1.18,
                      color: "#B388FF",
                      textShadow: "0px 0px 20px rgba(179,136,255,1)",
                      y: -8,
                      transition: { type: "spring", stiffness: 400, damping: 10 }
                    }}
                    className="inline-block cursor-default select-none transition-colors"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          {/* Staggered paragraph + buttons */}
          <motion.div
            variants={contentStagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start gap-0"
          >
            <motion.p
              variants={contentChild}
              className="text-lg text-zinc-400 mb-10 max-w-lg leading-relaxed"
            >
              I am a dedicated software engineering undergraduate student and active learner.
              Currently building feature-rich MERN stack projects while expanding my core expertise into
              DevOps, cloud environments, and future-forward AI/ML engineering.
            </motion.p>

            <motion.div
              variants={contentChild}
              className="flex flex-wrap items-center gap-4 mb-16"
            >
              {/* Magnetic primary CTA */}
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Link
                  href="#portfolio"
                  className="bg-[#B388FF] text-black px-6 py-3 rounded-full font-bold hover:bg-[#c4a1ff] transition-all duration-300 flex items-center gap-2 shadow-[0_0_30px_rgba(179,136,255,0.45)] cursor-pointer"
                >
                  Explore Portfolio
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </motion.div>

              {/* Secondary CTA */}
              <motion.div
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Link
                  href="https://github.com/Pathum-Piyumal/my_portfolio_website"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-2 cursor-pointer"
                >
                  <Code className="w-4 h-4" />
                  View Repo
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right content — Photo with mouse parallax */}
        <motion.div
          ref={photoRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, scale: 0.85, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative w-full aspect-square max-w-lg md:max-w-xl mx-auto lg:ml-auto z-10 flex items-center justify-center p-4 sm:p-8"
          style={{ perspective: 800 }}
        >
          {/* Ambient Glow — breathes */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-[#B388FF]/15 via-blue-500/10 to-transparent rounded-full blur-3xl -z-10"
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.06, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Orbit rings */}
          <div className="absolute w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] lg:w-[360px] lg:h-[360px] rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] rounded-full border border-[#B388FF]/10 border-dashed animate-[spin_80s_linear_infinite_reverse] pointer-events-none" />
          <div className="absolute w-[360px] h-[360px] sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px] lg:w-[540px] lg:h-[540px] rounded-full border border-white/5 animate-[spin_120s_linear_infinite] pointer-events-none" />

          {/* Parallax photo container */}
          <motion.div
            style={{ rotateX, rotateY, translateX: photoTranslateX, translateY: photoTranslateY }}
            className="relative w-52 h-52 sm:w-60 sm:h-60 md:w-68 md:h-68 lg:w-76 lg:h-76 rounded-full p-[3px] bg-gradient-to-tr from-[#B388FF] via-blue-500 to-[#FFB74D] shadow-[0_0_60px_rgba(179,136,255,0.3)] group z-10"
          >
            <div className="w-full h-full rounded-full bg-zinc-950 overflow-hidden relative flex items-center justify-center">
              <img
                src="/images/profile.jpg"
                alt="R.M.P.P. Kumarathunga"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Tech Stack Section */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="mt-28 flex flex-col items-center text-center z-10 select-none"
      >
        <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-[#B388FF] uppercase font-extrabold flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B388FF] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B388FF]"></span>
          </span>
          Core Technical Arsenal
        </span>
        <h2 className="text-xl md:text-2xl font-bold text-zinc-200 mt-3 tracking-tight font-sans">
          Frameworks, Languages &amp; Cloud Environments
        </h2>
      </motion.div>

      {/* Marquee */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.05 }}
        className="tech-marquee-container mt-10 w-full overflow-hidden relative py-8 flex flex-col gap-6"
      >
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-black via-black/40 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-black via-black/40 to-transparent z-20 pointer-events-none" />

        {/* Row 1: right to left */}
        <div className="tech-marquee-wrapper overflow-hidden flex w-full">
          <div className="tech-marquee-track-left">
            {[...techStack.slice(0, 11), ...techStack.slice(0, 11)].map((tech, idx) => (
              <motion.div
                key={`row1-${idx}`}
                whileHover={{ scale: 1.1, y: -3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className={`px-5 py-3 md:px-6 md:py-3.5 rounded-full border border-white/10 bg-zinc-950/60 backdrop-blur-xl text-sm md:text-base font-semibold text-zinc-200 flex items-center gap-3.5 select-none cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.65)] ${tech.glow}`}
              >
                <span className="shrink-0 flex items-center justify-center">
                  {tech.icon("w-5 h-5 md:w-6 h-6")}
                </span>
                <span>{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Row 2: left to right */}
        <div className="tech-marquee-wrapper overflow-hidden flex w-full">
          <div className="tech-marquee-track-right">
            {[...techStack.slice(11), ...techStack.slice(11)].map((tech, idx) => (
              <motion.div
                key={`row2-${idx}`}
                whileHover={{ scale: 1.1, y: -3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className={`px-5 py-3 md:px-6 md:py-3.5 rounded-full border border-white/10 bg-zinc-950/60 backdrop-blur-xl text-sm md:text-base font-semibold text-zinc-200 flex items-center gap-3.5 select-none cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.65)] ${tech.glow}`}
              >
                <span className="shrink-0 flex items-center justify-center">
                  {tech.icon("w-5 h-5 md:w-6 h-6")}
                </span>
                <span>{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes techMarqueeLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes techMarqueeRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .tech-marquee-track-left {
            display: flex;
            gap: 20px;
            width: max-content;
            animation: techMarqueeLeft 28s linear infinite;
          }
          .tech-marquee-track-right {
            display: flex;
            gap: 20px;
            width: max-content;
            animation: techMarqueeRight 28s linear infinite;
          }
          .tech-marquee-container:hover .tech-marquee-track-left,
          .tech-marquee-container:hover .tech-marquee-track-right {
            animation-play-state: paused;
          }
        `}</style>
      </motion.div>
    </section>
  );
}
