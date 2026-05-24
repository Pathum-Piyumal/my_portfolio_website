'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpotlightCard from '@/components/SpotlightCard';
import {
  ArrowRight,
  Layers,
  User,
  Users,
  ArrowUpRight,
  Brain,
  Database,
  Cloud,
  Terminal,
  Cpu,
  Sparkles,
  GitBranch,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import { techStack } from '@/lib/tech-data';

const categories = [
  { id: 'all', label: 'All Projects', icon: Layers },
  { id: 'individual', label: 'Individual', icon: User },
  { id: 'team', label: 'Team Projects', icon: Users },
];

const projects = [
  {
    title: 'Weather Pro – Real-Time Weather Application',
    description: 'Weather Pro is a simple and responsive web application that provides real-time weather information for any city entered by the user. It uses the OpenWeatherMap API to fetch live weather data such as temperature, weather conditions, and corresponding icons. The application is designed with a clean and user-friendly interface, focusing on smooth user experience, responsiveness across devices, and practical understanding of API integration and frontend development concepts.',
    category: 'individual',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Chart.js'],
    role: null,
    imageColor: 'from-blue-500/20 via-sky-500/10 to-transparent',
    borderColor: 'group-hover:border-sky-500/30',
    glowColor: 'rgba(56, 189, 248, 0.2)',
    githubUrl: 'https://github.com/Pathum-Piyumal',
    liveUrl: 'https://github.com/Pathum-Piyumal',
    iconName: 'cloud',
    techFocus: 'Web Development Project',
    isPending: false
  },
  {
    title: 'Interactive Portfolio Canvas',
    description: 'A premium, state-of-the-art interactive digital portfolio engineered with Next.js 16, React 19, TypeScript, and Framer Motion. Engineered for maximum visual impact with high-fidelity micro-interactions, canvas grids, dynamic dark mode accents, and responsive layout structures.',
    category: 'individual',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    role: null,
    imageColor: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    borderColor: 'group-hover:border-cyan-500/30',
    glowColor: 'rgba(6, 182, 212, 0.2)',
    githubUrl: 'https://github.com/Pathum-Piyumal',
    liveUrl: 'https://github.com/Pathum-Piyumal',
    iconName: 'layers',
    techFocus: 'Next.js 16 & React 19',
    isPending: false
  },
  {
    title: 'Autonomous Dev Agent (Nexus)',
    description: 'An upcoming solo project designing an autonomous developer agent. Designed to orchestrate complex Git workflows, automate code linters, and utilize multi-model LLM generation feeds to autonomously build and debug Next.js apps.',
    category: 'individual',
    tags: ['TypeScript', 'Node.js', 'Docker', 'Python'],
    role: null,
    imageColor: 'from-amber-500/20 via-orange-500/10 to-transparent',
    borderColor: 'group-hover:border-amber-500/30',
    glowColor: 'rgba(245, 158, 11, 0.2)',
    githubUrl: 'https://github.com/Pathum-Piyumal',
    liveUrl: 'https://github.com/Pathum-Piyumal',
    iconName: 'clock',
    techFocus: 'Agentic Workflows',
    isPending: true
  },
  {
    title: 'MindEase – Mental Wellness Web App',
    description: 'MindEase is a mental wellness-focused web application developed to help users improve emotional awareness and manage stress through interactive digital experiences. The platform includes secure journaling, mood tracking with visual analytics, motivational wellness features, and calming relaxation tools, all built within a secure and scalable architecture designed for future AI-powered enhancements.',
    category: 'team',
    tags: ['PHP', 'JavaScript', 'HTML5', 'CSS3', 'Chart.js'],
    role: 'Lead Software Engineer & Architect',
    imageColor: 'from-rose-500/20 via-pink-500/10 to-transparent',
    borderColor: 'group-hover:border-rose-500/30',
    glowColor: 'rgba(244, 63, 94, 0.2)',
    githubUrl: 'https://github.com/Pathum-Piyumal',
    liveUrl: 'https://github.com/Pathum-Piyumal',
    iconName: 'brain',
    techFocus: 'AI & Wellness Platform',
    isPending: false
  },
  {
    title: 'SynapseAI Collaborative Grid',
    description: 'A cloud-based dataset processing environment allowing real-time Python model execution, team sharing notebooks, dynamic canvas visualizers, and pre-trained inference pipelines.',
    category: 'team',
    tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Docker'],
    role: 'Backend & ML Service Integrations',
    imageColor: 'from-amber-500/20 via-orange-500/10 to-transparent',
    borderColor: 'group-hover:border-amber-500/30',
    glowColor: 'rgba(245, 158, 11, 0.2)',
    githubUrl: 'https://github.com/Pathum-Piyumal',
    liveUrl: 'https://github.com/Pathum-Piyumal',
    iconName: 'cpu',
    techFocus: 'Collaborative AI Runtime',
    isPending: false
  },
  {
    title: 'Enterprise Analytics Mesh',
    description: 'A collaborative, next-generation data analytics mesh designed to integrate real-time Apache Kafka stream processors, unified cloud storage layers, and sub-second SQL queries across multiple enterprise cloud databases.',
    category: 'team',
    tags: ['Docker', 'Kubernetes', 'AWS', 'MySQL'],
    role: 'System Architect & DevOps Lead',
    imageColor: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    borderColor: 'group-hover:border-emerald-500/30',
    glowColor: 'rgba(16, 185, 129, 0.2)',
    githubUrl: 'https://github.com/Pathum-Piyumal',
    liveUrl: 'https://github.com/Pathum-Piyumal',
    iconName: 'cloud',
    techFocus: 'Cloud Data & DevOps',
    isPending: true
  }
];

const getProjectIcon = (iconName: string) => {
  switch (iconName) {
    case 'brain': return <Brain className="w-7 h-7 text-[#B388FF]" />;
    case 'database': return <Database className="w-7 h-7 text-blue-400" />;
    case 'cloud': return <Cloud className="w-7 h-7 text-emerald-400" />;
    case 'terminal': return <Terminal className="w-7 h-7 text-rose-400" />;
    case 'cpu': return <Cpu className="w-7 h-7 text-amber-400" />;
    case 'layers': return <Layers className="w-7 h-7 text-cyan-400" />;
    case 'clock': return <Clock className="w-7 h-7 text-[#FFB74D] animate-pulse" />;
    default: return <Sparkles className="w-7 h-7 text-white" />;
  }
};



const shimmerCSS = `
  @keyframes shimmerText {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  .shimmer-heading {
    background: linear-gradient(90deg, #ffffff 0%, #B388FF 35%, #60a5fa 60%, #ffffff 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmerText 3.5s linear infinite;
  }
`;

export default function FeaturedProjects() {
  const [activeTab, setActiveTab] = useState<'all' | 'individual' | 'team'>('all');

  const filteredProjects = projects.filter(project => {
    if (activeTab === 'all') return true;
    return project.category === activeTab;
  });

  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full relative z-10 overflow-hidden" id="portfolio">
      <style>{shimmerCSS}</style>

      {/* Decorative background */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B388FF]/5 rounded-full blur-[160px] pointer-events-none -z-10"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
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
            <span className="w-1.5 h-1.5 rounded-full bg-[#B388FF] animate-pulse"></span>
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Interactive Showroom</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-2 leading-none">
            <span className="shimmer-heading">Software</span>{' '}
            <span className="text-white">Creations</span>
          </h2>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-wider mt-2">
            Showcasing individual concepts and team accomplishments
          </p>
        </div>

        <motion.div whileHover={{ scale: 1.04, y: -2 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
          <Link
            href="https://github.com/Pathum-Piyumal"
            target="_blank"
            rel="noreferrer"
            className="group/btn flex items-center gap-2.5 px-5 py-3 rounded-full text-xs font-mono tracking-wider font-bold text-zinc-300 bg-white/5 hover:bg-[#B388FF]/10 border border-white/10 hover:border-[#B388FF]/30 transition-all duration-300 shadow-xl"
          >
            EXPLORE REPOSITORIES
            <ArrowRight className="w-4 h-4 text-[#B388FF] group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
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
                onClick={() => setActiveTab(cat.id as 'all' | 'individual' | 'team')}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 focus:outline-none cursor-pointer whitespace-nowrap ${isActive ? 'text-black' : 'text-zinc-400 hover:text-white'}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-[#B388FF] rounded-full shadow-[0_0_15px_rgba(179,136,255,0.4)]"
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

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(8px)' }}
              transition={{ duration: 0.45, delay: idx * 0.07, ease: [0.34, 1.56, 0.64, 1] as any }}
              key={project.title}
            >
              <SpotlightCard
                spotlightColor={project.glowColor.replace('0.2)', '0.18)')}
                glowColor={project.glowColor}
                className="h-full"
              >
                <div
                  className="group relative flex flex-col bg-zinc-950/40 border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all duration-500 shadow-2xl hover:shadow-[0_25px_60px_rgba(0,0,0,0.6)] cursor-pointer h-full"
                  style={{ ['--glow-color' as any]: project.glowColor }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10 blur-xl"
                    style={{ background: `radial-gradient(circle_at_50%_0%, var(--glow-color), transparent_55%)` }}
                  />

                  {/* Header */}
                  <div className={`h-44 w-full bg-gradient-to-br ${project.imageColor} relative overflow-hidden flex items-center justify-center border-b border-white/5`}>
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

                    <motion.div
                      whileHover={{ scale: 1.18, rotate: 6 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 18 }}
                      className="relative z-10 w-16 h-16 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-xl flex items-center justify-center"
                    >
                      {getProjectIcon(project.iconName)}
                    </motion.div>

                    <div className="absolute top-4 right-4 z-20 flex gap-2">
                      {project.isPending && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 text-[#FFB74D] backdrop-blur-md animate-pulse">
                          Pending
                        </span>
                      )}
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-black/60 border border-white/10 backdrop-blur-md ${project.category === 'team' ? 'text-[#FFB74D]' : 'text-[#B388FF]'}`}>
                        {project.category === 'team' ? <><Users className="w-2.5 h-2.5" />Team</> : <><User className="w-2.5 h-2.5" />Solo</>}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between relative">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-[#B388FF] uppercase font-bold block mb-2.5">
                        {project.techFocus}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-3 tracking-tight flex items-center gap-2">
                        {project.title}
                        {!project.isPending && (
                          <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-[#B388FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                        )}
                      </h3>
                      <p className="text-zinc-400 text-[13px] leading-relaxed mb-6">{project.description}</p>

                      {project.category === 'team' && project.role && (
                        <div className="mb-6 px-4 py-3 rounded-2xl bg-orange-500/5 border border-orange-500/10 backdrop-blur-md">
                          <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold tracking-wider text-[#FFB74D] uppercase mb-1">
                            <GitBranch className="w-3.5 h-3.5" />
                            Collaborative Role
                          </div>
                          <p className="text-zinc-300 text-xs font-medium">{project.role}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
                      {project.tags.map(tag => {
                        const matchedTech = techStack.find(tech => tech.name.toLowerCase() === tag.toLowerCase());
                        return (
                          <span
                            key={tag}
                            className={`px-2.5 py-1 rounded-md border text-[10px] font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-default select-none ${matchedTech ? matchedTech.badgeColor : 'bg-white/5 border-white/5 text-zinc-400 hover:border-white/10 hover:bg-white/10'}`}
                          >
                            {matchedTech && <span className="shrink-0 flex items-center">{matchedTech.icon("w-3 h-3")}</span>}
                            <span>{tag}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-zinc-500 font-mono text-xs">
          No matching developments found.
        </motion.div>
      )}
    </section>
  );
}
