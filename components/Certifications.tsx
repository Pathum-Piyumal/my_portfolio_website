'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
  Award,
  Layers,
  Globe,
  Cloud,
  Brain,
  ArrowUpRight,
  Calendar,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { techStack } from '@/lib/tech-data';

const categories = [
  { id: 'all', label: 'All Credentials', icon: Layers },
  { id: 'fullstack', label: 'Full-Stack & Web', icon: Globe },
  { id: 'devops', label: 'Cloud & DevOps', icon: Cloud },
  { id: 'ai', label: 'AI & Machine Learning', icon: Brain },
];

const certifications = [
  {
    title: "MERN Stack Developer (Advanced)",
    issuer: "HackerRank",
    date: "Mar 2025",
    credentialId: "HR-MERN-89410A",
    category: "fullstack",
    skills: ["React", "Node.js", "Express.js", "MongoDB", "TypeScript"],
    verifyUrl: "https://www.linkedin.com/in/pathum-piyumal-kumarathunga-48185b32b/",
    iconName: "globe",
    glowColor: "rgba(179, 136, 255, 0.18)",
    gradient: "from-purple-500/20 via-[#B388FF]/5 to-transparent",
    techFocus: "Full-Stack & Web Showcase"
  },
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    date: "Nov 2025",
    credentialId: "AWS-CCP-2287B9",
    category: "devops",
    skills: ["AWS", "Docker", "Kubernetes", "Cloud Infrastructure"],
    verifyUrl: "https://www.linkedin.com/in/pathum-piyumal-kumarathunga-48185b32b/",
    iconName: "cloud",
    glowColor: "rgba(59, 130, 246, 0.18)",
    gradient: "from-blue-500/20 via-indigo-500/5 to-transparent",
    techFocus: "Cloud Infrastructure Specialist"
  },
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI / Coursera",
    date: "Feb 2026",
    credentialId: "DL-AI-55734D",
    category: "ai",
    skills: ["Python", "NumPy", "Scikit-Learn", "Neural Networks"],
    verifyUrl: "https://www.linkedin.com/in/pathum-piyumal-kumarathunga-48185b32b/",
    iconName: "brain",
    glowColor: "rgba(16, 185, 129, 0.18)",
    gradient: "from-emerald-500/20 via-teal-500/5 to-transparent",
    techFocus: "Neural Network Architecture"
  },
  {
    title: "Advanced React & Next.js Frameworks",
    issuer: "Meta",
    date: "Jul 2025",
    credentialId: "META-NEXT-90132",
    category: "fullstack",
    skills: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    verifyUrl: "https://www.linkedin.com/in/pathum-piyumal-kumarathunga-48185b32b/",
    iconName: "globe",
    glowColor: "rgba(179, 136, 255, 0.14)",
    gradient: "from-purple-500/20 via-[#B388FF]/5 to-transparent",
    techFocus: "High-Fidelity UI Systems"
  },
  {
    title: "Docker & Kubernetes Orchestration",
    issuer: "Linux Foundation",
    date: "Jan 2026",
    credentialId: "LF-DK8S-77291B",
    category: "devops",
    skills: ["Docker", "Kubernetes", "Jenkins", "AWS"],
    verifyUrl: "https://www.linkedin.com/in/pathum-piyumal-kumarathunga-48185b32b/",
    iconName: "cloud",
    glowColor: "rgba(59, 130, 246, 0.14)",
    gradient: "from-blue-500/20 via-indigo-500/5 to-transparent",
    techFocus: "Container & Scale Operations"
  },
  {
    title: "Python for Data Science & ML",
    issuer: "IBM",
    date: "Aug 2025",
    credentialId: "IBM-DSML-4091A",
    category: "ai",
    skills: ["Python", "NumPy", "Pandas", "Matplotlib", "Scikit-Learn"],
    verifyUrl: "https://www.linkedin.com/in/pathum-piyumal-kumarathunga-48185b32b/",
    iconName: "brain",
    glowColor: "rgba(16, 185, 129, 0.14)",
    gradient: "from-emerald-500/20 via-teal-500/5 to-transparent",
    techFocus: "Statistical Models & Analytics"
  }
];

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'globe': return <Globe className="w-6 h-6 text-[#B388FF]" />;
    case 'cloud': return <Cloud className="w-6 h-6 text-blue-400" />;
    case 'brain': return <Brain className="w-6 h-6 text-emerald-400" />;
    default: return <Award className="w-6 h-6 text-white" />;
  }
};

// Tilt card component
function TiltCard({ children, glowColor }: { children: React.ReactNode; glowColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springCfg = { stiffness: 180, damping: 22 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), springCfg);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), springCfg);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 700 }}
    >
      {children}
    </motion.div>
  );
}

const shimmerCSS = `
  @keyframes shimmerText {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  .cert-shimmer-heading {
    background: linear-gradient(90deg, #ffffff 0%, #FFB74D 35%, #B388FF 65%, #ffffff 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmerText 3.5s linear infinite;
  }
`;

export default function Certifications() {
  const [activeTab, setActiveTab] = useState<'all' | 'fullstack' | 'devops' | 'ai'>('all');

  const filteredCerts = certifications.filter(cert => {
    if (activeTab === 'all') return true;
    return cert.category === activeTab;
  });

  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full relative z-10 overflow-hidden" id="certifications">
      <style>{shimmerCSS}</style>

      {/* Breathing ambient glow */}
      <motion.div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none -z-10"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
      >
        <div>
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-zinc-900/60 border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFB74D] shadow-[0_0_8px_#FFB74D]"></span>
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Verified Credentials</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-2 leading-none">
            <span className="cert-shimmer-heading">Earned</span>{' '}
            <span className="text-white">Certifications</span>
          </h2>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-wider mt-2">
            Professional validation in core software sectors
          </p>
        </div>
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex justify-center mb-16"
      >
        <div className="flex items-center gap-1.5 bg-zinc-950/80 backdrop-blur-xl border border-white/5 rounded-full p-1.5 max-w-full overflow-x-auto shadow-2xl">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id as 'all' | 'fullstack' | 'devops' | 'ai')}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 focus:outline-none cursor-pointer whitespace-nowrap ${isActive ? 'text-black' : 'text-zinc-400 hover:text-white'}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCertIndicator"
                    className="absolute inset-0 bg-[#FFB74D] rounded-full shadow-[0_0_15px_rgba(255,183,77,0.35)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5" />
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredCerts.map((cert, idx) => (
            <motion.div
              layout
              key={cert.title}
              initial={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(8px)' }}
              transition={{ duration: 0.45, delay: idx * 0.07, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <TiltCard glowColor={cert.glowColor}>
                <div
                  className="group relative flex flex-col bg-zinc-950/40 border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all duration-500 shadow-2xl hover:shadow-[0_25px_60px_rgba(0,0,0,0.5)] cursor-pointer h-full"
                  style={{ ['--glow-color' as any]: cert.glowColor }}
                >
                  {/* Glow halo */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10 blur-xl"
                    style={{ background: `radial-gradient(circle_at_50%_0%, var(--glow-color), transparent_55%)` }}
                  />

                  {/* Header */}
                  <div className={`h-24 w-full bg-gradient-to-br ${cert.gradient} relative overflow-hidden flex items-center justify-between px-6 border-b border-white/5`}>
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                    <span className="text-white/40 font-mono text-[10px] font-bold tracking-widest uppercase">{cert.issuer}</span>
                    <motion.div
                      whileHover={{ scale: 1.18, rotate: 6 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 18 }}
                      className="w-12 h-12 rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-xl flex items-center justify-center"
                    >
                      {getCategoryIcon(cert.iconName)}
                    </motion.div>
                  </div>

                  {/* Body */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-mono tracking-widest text-[#FFB74D] uppercase font-bold block mb-2.5">
                        {cert.techFocus}
                      </span>
                      <h3 className="text-lg font-bold text-white mb-2 leading-tight tracking-tight">{cert.title}</h3>
                      <div className="flex flex-col gap-1 mb-6 text-zinc-400 text-xs">
                        <div className="flex items-center gap-1.5 font-medium">
                          <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
                          <span>{cert.issuer} Verified</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-[11px]">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Earned: {cert.date}</span>
                        </div>
                        <div className="text-[10px] font-mono text-zinc-600 mt-0.5">
                          Credential ID: {cert.credentialId}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-2 mt-2 pt-4 border-t border-white/5 mb-6">
                        {cert.skills.map(skill => {
                          const matchedTech = techStack.find(tech => tech.name.toLowerCase() === skill.toLowerCase());
                          return (
                            <span
                              key={skill}
                              className={`px-2.5 py-1 rounded-md border text-[10px] font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-default select-none ${matchedTech ? matchedTech.badgeColor : 'bg-white/5 border-white/5 text-zinc-400 hover:border-white/10 hover:bg-white/10'}`}
                            >
                              {matchedTech && <span className="shrink-0">{matchedTech.icon("w-3 h-3")}</span>}
                              <span>{skill}</span>
                            </span>
                          );
                        })}
                      </div>

                      <motion.div whileHover={{ scale: 1.02, y: -1 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
                        <Link
                          href={cert.verifyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#FFB74D]/30 hover:bg-[#FFB74D]/5 transition-all duration-300 text-xs font-bold text-zinc-300 hover:text-[#FFB74D]"
                        >
                          <span>VERIFY CREDENTIAL</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredCerts.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-zinc-500 font-mono text-xs">
          No matching credentials found.
        </motion.div>
      )}
    </section>
  );
}
