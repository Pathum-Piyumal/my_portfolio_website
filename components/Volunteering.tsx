'use client';

import { motion } from 'framer-motion';
import { Cpu, Code, Heart, Sparkles, Calendar, ChevronRight } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const societies = [
  {
    name: "IEEE Computer Society Student Branch",
    focus: "Technical Workshops & Study Circles",
    statusBadge: "Engagement Pipeline",
    statusText: "Incoming Contributor",
    statusColor: "text-violet-400 border-violet-500/30 bg-violet-500/10",
    icon: <Cpu className="w-6 h-6 text-violet-400" />,
    iconBg: "bg-violet-500/10 border-violet-500/20 group-hover:border-violet-500/40",
    glowColor: "bg-violet-500/5",
    colorTheme: "#8B5CF6",
    timeline: "Target Launch: Q3 2026",
    initiatives: [
      "Designing study plans for peer-led workshops in Python, Data Science, and basic React.",
      "Preparing to volunteer as a hackathon logistics and developer helper.",
      "Building interactive algorithm visualizations to aid first-year learning groups."
    ]
  },
  {
    name: "Software Engineering Association",
    focus: "Open Source & Student Tech Programs",
    statusBadge: "Academic Outreach",
    statusText: "Proposed Peer Mentor",
    statusColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    icon: <Code className="w-6 h-6 text-cyan-400" />,
    iconBg: "bg-cyan-500/10 border-cyan-500/20 group-hover:border-cyan-500/40",
    glowColor: "bg-cyan-500/5",
    colorTheme: "#06B6D4",
    timeline: "Target Launch: Q4 2026",
    initiatives: [
      "Structuring peer programming sessions to support junior undergraduates.",
      "Co-designing open-source repository templates for university bootcamps.",
      "Contributing to codebase templates and developer guides for local student projects."
    ]
  },
  {
    name: "Rotaract Club & Welfare Societies",
    focus: "Social Impact Software Projects",
    statusBadge: "Community Service",
    statusText: "Incoming Tech Volunteer",
    statusColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    icon: <Heart className="w-6 h-6 text-emerald-400" />,
    iconBg: "bg-emerald-500/10 border-emerald-500/20 group-hover:border-emerald-500/40",
    glowColor: "bg-emerald-500/5",
    colorTheme: "#10B981",
    timeline: "Target Launch: Q3 2026",
    initiatives: [
      "Planning to build lightweight web platforms for regional donation collections.",
      "Proposing basic computer literacy and safe web browsing workshops in schools.",
      "Designing responsive promotional landing pages for ecological campaigns."
    ]
  }
];

export default function Volunteering() {
  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full relative z-10 overflow-hidden" id="volunteering">
      {/* Soft dynamic purple-cyan ambient backdrop glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-[#B388FF]/5 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="mb-12">
          {/* Monospace Pill */}
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-zinc-900/60 border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Community & Outreach</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2 leading-none">
            Volunteering & Societies
          </h2>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-wider mt-2">
            Planned Leadership Objectives & Extracurricular Contributions
          </p>
        </motion.div>

        {/* Info Callout Card */}
        <motion.div 
          variants={fadeInUp}
          className="relative bg-zinc-950/30 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-md mb-12 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
        >
          <div className="flex gap-4 items-start">
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 shrink-0">
              <Sparkles className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase mb-1">
                Roadmap to Service & Leadership
              </h3>
              <p className="text-zinc-400 text-xs md:text-sm max-w-4xl leading-relaxed">
                As a dedicated software engineering student, I aim to extend my tech skills to volunteer, lead, and contribute to student organizations. I have mapped out active engagement pathways to support regional drives, organize tech panels, and lead study groups in the upcoming semesters.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Society Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {societies.map((society, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative flex flex-col justify-between overflow-hidden bg-zinc-950/40 border border-white/5 rounded-3xl p-8 backdrop-blur-md transition-all duration-300 hover:bg-zinc-950/60 hover:border-white/10 shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            >
              {/* Corner Glow Layer */}
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10 ${society.glowColor}`} />

              <div>
                {/* Icon & Status */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3.5 rounded-2xl border transition-all duration-500 shrink-0 ${society.iconBg}`}>
                    {society.icon}
                  </div>
                  <span className={`px-2.5 py-1 rounded-full border text-[10px] font-mono tracking-wide font-bold ${society.statusColor}`}>
                    {society.statusBadge}
                  </span>
                </div>

                {/* Info Text */}
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block mb-1">
                  {society.focus}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-white leading-tight mb-4 group-hover:text-zinc-200 transition-colors duration-300">
                  {society.name}
                </h3>

                {/* Target Timeline */}
                <div className="flex items-center gap-2 mb-6 bg-white/5 border border-white/5 rounded-xl px-3 py-2 w-fit">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="text-[10px] font-mono text-zinc-400">{society.timeline}</span>
                </div>

                {/* Planned Contributions List */}
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase block">
                    Planned Initiatives:
                  </span>
                  <ul className="space-y-2.5">
                    {society.initiatives.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex gap-2 items-start text-xs text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                        <ChevronRight className="w-3.5 h-3.5 mt-0.5 shrink-0 text-cyan-500/70" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer Status Indicator */}
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
      </motion.div>
    </section>
  );
}
