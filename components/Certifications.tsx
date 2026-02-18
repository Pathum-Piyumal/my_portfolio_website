'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Award, Copy, Check, Sparkles, Brain, Cloud, Globe, 
  Terminal, Shield, Database, Palette, Beaker, Monitor, 
  UserCheck, ExternalLink, Calendar, ChevronDown, ChevronUp, CopyIcon
} from 'lucide-react';

interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialId: string | null;
  category: 'ai' | 'cloud' | 'fullstack' | 'devtools' | 'other';
  subCategory: string;
  url: string;
}

const certificationsData: Certification[] = [
  // AI & GenAI
  {
    title: "Career Essentials in Generative AI",
    issuer: "Microsoft & LinkedIn",
    date: "Dec 2024",
    credentialId: "a72c4b140c3872b792d7c86c45f7fcc0cf160e2a5086f1728c2711f802582420",
    category: "ai",
    subCategory: "Artificial Intelligence",
    url: "https://www.linkedin.com/learning/"
  },
  {
    title: "Claude 101",
    issuer: "Anthropic Education",
    date: "Apr 2026",
    credentialId: "certificate-x7pskx5qtnwj-1776783482",
    category: "ai",
    subCategory: "Artificial Intelligence",
    url: "https://www.anthropic.com"
  },
  {
    title: "Advanced Prompt Engineering Techniques",
    issuer: "LinkedIn",
    date: "Jan 2026",
    credentialId: "7cb4e12bd26e017b05d2157ec131e5706400e905f7cf46b3a50a411c1000a64d",
    category: "ai",
    subCategory: "Prompt Engineering",
    url: "https://www.linkedin.com/learning/"
  },
  {
    title: "Practical GitHub Copilot",
    issuer: "LinkedIn",
    date: "Jan 2026",
    credentialId: "9c781cf86b0fb6c4a14632112e33c78dfd7df6a080c3e16fbc40d1ec90c31d1b",
    category: "ai",
    subCategory: "AI Tools",
    url: "https://www.linkedin.com/learning/"
  },
  {
    title: "Ethics in the Age of Generative AI",
    issuer: "LinkedIn",
    date: "Dec 2024",
    credentialId: "4fd5d9f4cbd4e5e6f29cd0ce7663400b318f4a49c7e32dd2457a2e8d7a4bf003",
    category: "ai",
    subCategory: "Ethics & Safety",
    url: "https://www.linkedin.com/learning/"
  },
  {
    title: "Generative AI: The Evolution of Thoughtful Online Search",
    issuer: "LinkedIn",
    date: "Dec 2024",
    credentialId: "708766dae525155af61e77e25bfe777e5024959d968b6359aca694aa1c88d017",
    category: "ai",
    subCategory: "Artificial Intelligence",
    url: "https://www.linkedin.com/learning/"
  },
  {
    title: "What is Generative AI",
    issuer: "LinkedIn",
    date: "Dec 2024",
    credentialId: "a3187fdfc0e5e31ef99dd6b853e2e40894a7df1b716f695ffa7606b6aebddc6f",
    category: "ai",
    subCategory: "Artificial Intelligence",
    url: "https://www.linkedin.com/learning/"
  },
  {
    title: "GenAI 101 with Pieces",
    issuer: "Canvas Credentials",
    date: "Nov 2024",
    credentialId: "6743928280e3752944b4e43b",
    category: "ai",
    subCategory: "Artificial Intelligence",
    url: "https://canvas.instructure.com/"
  },

  // Cloud & Networking
  {
    title: "Multicloud Network Associate",
    issuer: "Aviatrix",
    date: "Oct 2025",
    credentialId: "2025-28434",
    category: "cloud",
    subCategory: "Cloud Networking",
    url: "https://aviatrix.com/"
  },
  {
    title: "Cloud Foundations – Advanced",
    issuer: "Great Learning",
    date: "Nov 2024",
    credentialId: null,
    category: "cloud",
    subCategory: "Cloud Computing",
    url: "https://www.mygreatlearning.com/"
  },
  {
    title: "Introduction to Microsoft Cloud Concept",
    issuer: "Microsoft Imagine Cup",
    date: "Dec 2024",
    credentialId: null,
    category: "cloud",
    subCategory: "Cloud Computing",
    url: "https://imaginecup.microsoft.com/"
  },

  // Full-Stack
  {
    title: "Learning Full-Stack JavaScript Development (MongoDB, Node, React)",
    issuer: "LinkedIn",
    date: "Jan 2026",
    credentialId: "7f8f065d5ab9ca0dda7deaf5eb38b50b51509cbf815a0a3bd25a6faae8d0dcd1",
    category: "fullstack",
    subCategory: "MERN Stack",
    url: "https://www.linkedin.com/learning/"
  },
  {
    title: "JavaScript Programming Essentials",
    issuer: "IBM",
    date: "Oct 2025",
    credentialId: "BIF7FHC866UE",
    category: "fullstack",
    subCategory: "JavaScript",
    url: "https://www.ibm.com/"
  },
  {
    title: "Learning Functional Programming with JavaScript ES6+",
    issuer: "LinkedIn",
    date: "Jan 2026",
    credentialId: "f2010a86ea8e0b7f02a04d5bec445a137bc5f7997ea5dcfaab19ce9517140872",
    category: "fullstack",
    subCategory: "JavaScript",
    url: "https://www.linkedin.com/learning/"
  },
  {
    title: "Web Design for Beginners",
    issuer: "University of Moratuwa",
    date: "Nov 2024",
    credentialId: "Not Provided (PDF certificate)",
    category: "fullstack",
    subCategory: "Web Design",
    url: "https://www.mrt.ac.lk/"
  },

  // Developer Tools & Platforms
  {
    title: "Career Essentials in GitHub Professional Certificate",
    issuer: "GitHub",
    date: "Jan 2026",
    credentialId: "7a4b4fca1b795e2901486d1f3da02568f681190e74be69d0541e780899654cee",
    category: "devtools",
    subCategory: "GitHub & Version Control",
    url: "https://github.com/"
  },
  {
    title: "Getting Started with Git and GitHub",
    issuer: "IBM",
    date: "Nov 2024",
    credentialId: null,
    category: "devtools",
    subCategory: "Git & Version Control",
    url: "https://www.ibm.com/"
  },
  {
    title: "Practical GitHub Actions",
    issuer: "LinkedIn",
    date: "Jan 2026",
    credentialId: "439da17620f16f22b5bf3fde09f8c55f83a9a4c24a0cda86332b03f5306ab2a1",
    category: "devtools",
    subCategory: "CI/CD & Actions",
    url: "https://www.linkedin.com/learning/"
  },
  {
    title: "Practical GitHub Project Management and Collaboration",
    issuer: "LinkedIn",
    date: "Jan 2026",
    credentialId: "aec3bb3568e1d87d34be2bb735643bca8aea936e58e7af123e977149c3ef56a8",
    category: "devtools",
    subCategory: "Project Management",
    url: "https://www.linkedin.com/learning/"
  },
  {
    title: "Practical GitHub Code Search",
    issuer: "LinkedIn",
    date: "Jan 2026",
    credentialId: "8048f5c6d88137c6833c85a720ef6650dcd8e53341a73222e2a345f5ef69799b",
    category: "devtools",
    subCategory: "Code Search",
    url: "https://www.linkedin.com/learning/"
  },
  {
    title: "Postman API Fundamentals Student Expert",
    issuer: "Postman",
    date: "Nov 2025",
    credentialId: "690887d82c9959ec271de9aa",
    category: "devtools",
    subCategory: "API Development",
    url: "https://www.postman.com/"
  },

  // Other Fields
  {
    title: "ISO 27005 – Information Security Risk Management",
    issuer: "Alison",
    date: "Apr 2026",
    credentialId: "7083-44108838",
    category: "other",
    subCategory: "Cybersecurity",
    url: "https://alison.com/"
  },
  {
    title: "SQL for Data Science",
    issuer: "Great Learning",
    date: "Nov 2024",
    credentialId: null,
    category: "other",
    subCategory: "Data & Databases",
    url: "https://www.mygreatlearning.com/"
  },
  {
    title: "UI/UX for Beginners",
    issuer: "Great Learning",
    date: "Nov 2024",
    credentialId: null,
    category: "other",
    subCategory: "UI/UX & Design",
    url: "https://www.mygreatlearning.com/"
  },
  {
    title: "Introduction to Design Thinking",
    issuer: "Great Learning",
    date: "Nov 2024",
    credentialId: null,
    category: "other",
    subCategory: "UI/UX & Design",
    url: "https://www.mygreatlearning.com/"
  },
  {
    title: "Software Testing Tutorial",
    issuer: "Great Learning",
    date: "Nov 2024",
    credentialId: null,
    category: "other",
    subCategory: "Software Engineering",
    url: "https://www.mygreatlearning.com/"
  },
  {
    title: "Learning Microsoft 365 Copilot and Business Chat",
    issuer: "LinkedIn",
    date: "Dec 2024",
    credentialId: "458f4e56e688a72f0c99ddf637e4e9c9c2dc4e92212cbf48f7d0b833f1eccfa2",
    category: "other",
    subCategory: "Productivity & Copilot",
    url: "https://www.linkedin.com/learning/"
  },
  {
    title: "Streamlining Your Work with Microsoft Copilot",
    issuer: "LinkedIn",
    date: "Dec 2024",
    credentialId: "b44428d04007757bce4418b392b456322b832bd3cba3fdb2ca4da5d236ce5532",
    category: "other",
    subCategory: "Productivity & Copilot",
    url: "https://www.linkedin.com/learning/"
  },
  {
    title: "Microsoft Learn Student Ambassador – Introduction",
    issuer: "Microsoft Learn",
    date: "Dec 2024",
    credentialId: null,
    category: "other",
    subCategory: "Ambassador",
    url: "https://learn.microsoft.com/"
  }
];

const categories = [
  { id: 'all', label: 'All Credentials', icon: <Award className="w-4 h-4" /> },
  { id: 'ai', label: 'AI & GenAI', icon: <Brain className="w-4 h-4 text-[#B388FF]" /> },
  { id: 'cloud', label: 'Cloud & Networking', icon: <Cloud className="w-4 h-4 text-blue-400" /> },
  { id: 'fullstack', label: 'Full-Stack JS', icon: <Globe className="w-4 h-4 text-emerald-400" /> },
  { id: 'devtools', label: 'Developer Tools', icon: <Terminal className="w-4 h-4 text-amber-400" /> },
  { id: 'other', label: 'Core & Specialized', icon: <Shield className="w-4 h-4 text-violet-400" /> },
];

const shimmerCSS = `
  @keyframes certShimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  .cert-shimmer {
    background: linear-gradient(90deg, #ffffff 0%, #B388FF 35%, #60a5fa 65%, #ffffff 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: certShimmer 4s linear infinite;
  }
`;

export default function Certifications() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleExpand = (title: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'ai':
        return {
          glow: 'rgba(179, 136, 255, 0.15)',
          border: 'group-hover:border-[#B388FF]/30',
          accent: '#B388FF',
          badge: 'bg-[#B388FF]/10 text-[#B388FF] border-[#B388FF]/20',
          icon: <Brain className="w-5 h-5 text-[#B388FF]" />
        };
      case 'cloud':
        return {
          glow: 'rgba(96, 165, 250, 0.15)',
          border: 'group-hover:border-blue-500/30',
          accent: '#60a5fa',
          badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
          icon: <Cloud className="w-5 h-5 text-blue-400" />
        };
      case 'fullstack':
        return {
          glow: 'rgba(52, 211, 153, 0.15)',
          border: 'group-hover:border-emerald-500/30',
          accent: '#34d399',
          badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          icon: <Globe className="w-5 h-5 text-emerald-400" />
        };
      case 'devtools':
        return {
          glow: 'rgba(245, 158, 11, 0.15)',
          border: 'group-hover:border-amber-500/30',
          accent: '#fbbf24',
          badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          icon: <Terminal className="w-5 h-5 text-amber-400" />
        };
      default:
        return {
          glow: 'rgba(139, 92, 246, 0.15)',
          border: 'group-hover:border-violet-500/30',
          accent: '#a78bfa',
          badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
          icon: <Award className="w-5 h-5 text-violet-400" />
        };
    }
  };

  const filteredCertifications = certificationsData.filter(cert => {
    const matchesCategory = selectedCategory === 'all' || cert.category === selectedCategory;
    const matchesSearch = 
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.subCategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full relative z-10 overflow-hidden" id="certifications">
      <style>{shimmerCSS}</style>

      {/* Ambient background glows */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-[#B388FF]/5 rounded-full blur-[140px] pointer-events-none -z-10"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[130px] pointer-events-none -z-10"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-zinc-900/60 border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B388FF] shadow-[0_0_8px_#B388FF] animate-pulse"></span>
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Verified Qualifications</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-2 leading-none">
            <span className="cert-shimmer">Licenses</span>{' '}
            <span className="text-white">&amp; Certifications</span>
          </h2>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-wider mt-2">
            Professional Credentials &amp; Specialized Domain Training
          </p>
        </motion.div>

        {/* Dynamic Search Box */}
        <motion.div 
          initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-sm w-full md:w-[320px] self-start md:self-end"
        >
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-zinc-500" />
          </div>
          <input
            type="text"
            placeholder="Search credentials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950/50 border border-white/5 focus:border-[#B388FF]/30 text-white rounded-full py-2.5 pl-10 pr-4 text-xs placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#B388FF]/20 shadow-inner transition-all duration-300 font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Clear
            </button>
          )}
        </motion.div>
      </div>

      {/* Centered Tab Selectors with Sliding Pill background */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-wrap items-center gap-2 border border-white/5 bg-zinc-950/25 backdrop-blur-md rounded-2xl md:rounded-full p-2 mb-12 overflow-x-auto scrollbar-none"
      >
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-xl md:rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer select-none whitespace-nowrap ${
                isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="certTabActiveBg"
                  className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl md:rounded-full -z-10 shadow-lg"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </motion.div>

      {/* Grid List */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredCertifications.map((cert) => {
            const theme = getCategoryTheme(cert.category);
            const isExpanded = !!expandedCards[cert.title];
            const hasId = cert.credentialId !== null && cert.credentialId !== 'Not Provided';

            return (
              <motion.div
                layout
                key={cert.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92, filter: 'blur(4px)' }}
                transition={{ duration: 0.45 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                onClick={() => toggleExpand(cert.title)}
                className={`group relative overflow-hidden bg-zinc-950/40 border border-white/5 rounded-3xl p-6 flex flex-col justify-between backdrop-blur-md transition-all duration-500 hover:bg-zinc-950/60 ${theme.border} shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer`}
                style={{ ['--glow-color' as any]: theme.glow }}
              >
                {/* Internal Card Spotlight Glow on Hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10 blur-2xl"
                  style={{ background: `radial-gradient(circle_at_20%_20%, var(--glow-color), transparent_50%)` }}
                />

                {/* Left boundary accent colored bar */}
                <motion.div
                  className="absolute left-0 top-6 bottom-6 w-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundColor: theme.accent }}
                />

                <div>
                  {/* Top card header */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <span className="p-2.5 rounded-xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-colors shadow-inner shrink-0">
                      {theme.icon}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-semibold tracking-wider ${theme.badge}`}>
                      {cert.subCategory}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-tight mb-2 group-hover:text-[#B388FF] transition-colors duration-300">
                    {cert.title}
                  </h3>

                  <div className="flex flex-col gap-1 text-[11px] font-mono text-zinc-500 mb-6">
                    <div className="flex items-center gap-1.5">
                      <span className="text-zinc-400 font-semibold">{cert.issuer}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                      <span>{cert.date}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom interactive zone */}
                <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(cert.title);
                      }}
                      className="text-[10px] font-mono tracking-widest text-[#B388FF] font-bold uppercase hover:text-white transition-colors duration-200 flex items-center gap-1 focus:outline-none"
                    >
                      <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                    
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-zinc-500 hover:text-white transition-colors p-1"
                      title={`Verify at ${cert.issuer}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Expandable credential drawer */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden bg-black/50 border border-white/5 rounded-2xl p-3.5 text-[11px] font-mono flex flex-col gap-2 shrink-0 select-text"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="text-zinc-500 uppercase text-[9px] tracking-wider font-semibold">Credential ID</div>
                        {hasId ? (
                          <div className="flex items-center justify-between gap-3 bg-zinc-950 border border-white/5 rounded-lg px-2.5 py-1.5 select-all">
                            <span className="text-zinc-300 break-all leading-normal font-sans pr-2">{cert.credentialId}</span>
                            <button
                              onClick={() => handleCopy(cert.credentialId!)}
                              className="shrink-0 text-[#B388FF] hover:text-white p-1 transition-colors relative"
                              title="Copy ID to clipboard"
                            >
                              {copiedId === cert.credentialId ? (
                                <span className="flex items-center text-[10px] text-emerald-400 font-sans font-bold gap-0.5">
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Copied!</span>
                                </span>
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        ) : (
                          <div className="text-zinc-400 italic bg-zinc-950 border border-white/5 rounded-lg px-2.5 py-2">
                            {cert.credentialId === "Not Provided (PDF certificate)" ? "Not Provided (PDF certificate)" : "No Credential ID required"}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Empty search result fallback */}
        {filteredCertifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full bg-zinc-950/20 border border-white/5 rounded-3xl p-12 text-center"
          >
            <Award className="w-10 h-10 text-zinc-600 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-bold text-zinc-300">No certifications found</h3>
            <p className="text-zinc-500 text-sm mt-1">Try expanding your search query or switching categories.</p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
