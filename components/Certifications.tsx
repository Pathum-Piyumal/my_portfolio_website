'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    glowColor: "rgba(179, 136, 255, 0.15)",
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
    glowColor: "rgba(59, 130, 246, 0.15)",
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
    glowColor: "rgba(16, 185, 129, 0.15)",
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
    glowColor: "rgba(179, 136, 255, 0.12)",
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
    glowColor: "rgba(59, 130, 246, 0.12)",
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
    glowColor: "rgba(16, 185, 129, 0.12)",
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

export default function Certifications() {
  const [activeTab, setActiveTab] = useState<'all' | 'fullstack' | 'devops' | 'ai'>('all');

  const filteredCerts = certifications.filter(cert => {
    if (activeTab === 'all') return true;
    return cert.category === activeTab;
  });

  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full relative z-10 overflow-hidden" id="certifications">
      {/* Dynamic ambient backdrop glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" />

      {/* Title Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div>
          {/* Monospace Badge */}
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-zinc-900/60 border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFB74D] shadow-[0_0_8px_#FFB74D]"></span>
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Verified Credentials</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2 leading-none">
            Earned Certifications
          </h2>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-wider mt-2">
            Professional validation in core software sectors
          </p>
        </div>
      </div>

      {/* Segmented Filter Switcher Controls */}
      <div className="flex justify-center mb-16">
        <div className="flex items-center gap-1.5 bg-zinc-950/80 backdrop-blur-xl border border-white/5 rounded-full p-1.5 max-w-full overflow-x-auto shadow-2xl relative">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id as any)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 focus:outline-none cursor-pointer whitespace-nowrap ${
                  isActive ? 'text-black' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {/* Custom sliding background shape */}
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
      </div>

      {/* Grid Container for Certifications with Framer Motion layout */}
      <motion.div 
        layout 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredCerts.map((cert) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              key={cert.title}
              className="group relative flex flex-col bg-zinc-950/40 border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all duration-500 shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer"
              style={{
                ['--glow-color' as any]: cert.glowColor
              }}
            >
              {/* Outer light glow effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10 blur-xl"
                style={{
                  background: `radial-gradient(circle_at_50%_0%, var(--glow-color), transparent_50%)`
                }}
              />

              {/* Header Box visual style */}
              <div className={`h-24 w-full bg-gradient-to-br ${cert.gradient} relative overflow-hidden flex items-center justify-between px-6 border-b border-white/5`}>
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                
                {/* Issuing Brand Text */}
                <span className="text-white/40 font-mono text-[10px] font-bold tracking-widest uppercase">
                  {cert.issuer}
                </span>

                {/* Floating Glassmorphic Bubble */}
                <div className="w-12 h-12 rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  {getCategoryIcon(cert.iconName)}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  {/* Technology Focus Pill */}
                  <span className="text-[9px] font-mono tracking-widest text-[#FFB74D] uppercase font-bold block mb-2.5">
                    {cert.techFocus}
                  </span>

                  {/* Certification Title */}
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-white transition-colors tracking-tight">
                    {cert.title}
                  </h3>

                  {/* Issuing Authority details */}
                  <div className="flex flex-col gap-1 mb-6 text-zinc-400 text-xs font-sans">
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

                {/* Verified Tag Cloud */}
                <div>
                  <div className="flex flex-wrap gap-2 mt-2 pt-4 border-t border-white/5 mb-6">
                    {cert.skills.map(skill => (
                      <span 
                        key={skill} 
                        className="px-2.5 py-1 bg-white/5 text-zinc-400 text-[9px] font-mono rounded-md border border-white/5 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Verification Verification Button */}
                  <Link 
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#FFB74D]/30 hover:bg-[#FFB74D]/5 transition-all duration-300 text-xs font-bold text-zinc-300 hover:text-[#FFB74D]"
                  >
                    <span>VERIFY CREDENTIAL</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Fallback */}
      {filteredCerts.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 text-zinc-500 font-mono text-xs"
        >
          No matching credentials found.
        </motion.div>
      )}
    </section>
  );
}
