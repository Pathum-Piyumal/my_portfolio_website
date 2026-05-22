'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Terminal, Brain, Database, Cloud, Globe, Quote, ArrowRight, Star } from "lucide-react";

export default function AboutPage() {
  // Bento Grid layout for the Technical Arsenal
  const skills = [
    {
      category: "Frontend Development",
      icon: <Globe className="w-5 h-5 text-[#B388FF]" />,
      iconName: "web",
      tags: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
      spanClass: "md:col-span-2",
      badgeColor: "bg-[#B388FF]/10 text-[#B388FF] border-[#B388FF]/20",
    },
    {
      category: "Backend",
      icon: <Database className="w-5 h-5 text-[#FFB74D]" />,
      iconName: "dns",
      tags: ["Node.js", "Python", "Go"],
      spanClass: "md:col-span-1",
      badgeColor: "bg-[#FFB74D]/10 text-[#FFB74D] border-[#FFB74D]/20",
    },
    {
      category: "AI & ML Focus",
      icon: <Brain className="w-5 h-5 text-[#4CAF50]" />,
      iconName: "neurology",
      tags: ["TensorFlow", "PyTorch", "NLP"],
      spanClass: "md:col-span-1",
      badgeColor: "bg-[#4CAF50]/10 text-[#4CAF50] border-[#4CAF50]/20",
    },
    {
      category: "DevOps & Cloud",
      icon: <Cloud className="w-5 h-5 text-blue-400" />,
      iconName: "cloud",
      tags: ["Docker", "Kubernetes", "AWS", "CI/CD"],
      spanClass: "md:col-span-2",
      badgeColor: "bg-blue-400/10 text-blue-400 border-blue-400/20",
    },
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-black font-sans selection:bg-[#B388FF]/30 text-white overflow-x-hidden">
      <Navbar />

      <main className="flex-1 pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full relative z-10">
        {/* Dynamic Abstract Ambient Background Glows */}
        <div className="absolute top-40 left-1/4 w-[400px] h-[400px] bg-[#B388FF]/10 rounded-full blur-[120px] -z-10 pointer-events-none animate-pulse" />
        <div className="absolute bottom-40 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] -z-10 pointer-events-none" />

        {/* ================= HERO / BIO SECTION ================= */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-32"
        >
          {/* Left Bio Content */}
          <motion.div variants={fadeInUp} className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Monospace Pill */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B388FF] shadow-[0_0_8px_#B388FF] animate-pulse"></span>
              <span className="text-[10px] md:text-[11px] font-mono tracking-wider text-zinc-300 uppercase">
                Software Engineering Undergraduate
              </span>
            </div>

            {/* Rich Headline with Gradient */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
              Building Scalable Systems &{" "}
              <span className="bg-gradient-to-r from-white via-zinc-300 to-[#B388FF] bg-clip-text text-transparent">
                High-Fidelity Experiences
              </span>
            </h1>

            {/* Paragraph Bio */}
            <p className="text-zinc-400 text-base md:text-lg mb-8 max-w-xl leading-relaxed">
              I'm R.M.P.P. Kumarathunga, a Software Engineering Undergraduate and dedicated full-stack 
              developer. Currently focused on building feature-rich MERN stack projects while actively 
              expanding my capabilities into DevOps, cloud environments, and AI/ML algorithms to build the 
              next generation of smart digital solutions.
            </p>

            {/* Call To Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/#portfolio">
                <button className="bg-[#B388FF] text-black px-7 py-3.5 rounded-full text-sm font-bold hover:bg-[#c4a1ff] transition-all duration-300 shadow-[0_0_20px_rgba(179,136,255,0.2)] hover:shadow-[0_0_30px_rgba(179,136,255,0.45)] transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2">
                  View Projects
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              
              <Link href="/contact">
                <button className="bg-white/5 border border-white/10 text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-white/10 transition-all duration-300 hover:border-white/20 transform hover:-translate-y-0.5 cursor-pointer">
                  Contact Me
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Right Portrait Component */}
          <motion.div variants={fadeInUp} className="lg:col-span-5 flex justify-center relative group">
            {/* Sleek Outer Glow Backdrop */}
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#B388FF]/30 to-blue-500/20 rounded-[32px] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 -z-10" />

            {/* Portrait Card */}
            <div className="relative w-full max-w-sm aspect-square rounded-3xl border border-white/15 bg-zinc-950 overflow-hidden shadow-2xl flex items-center justify-center">
              {/* Profile Image Asset */}
              <Image 
                src="/images/alex_portrait.png" 
                alt="R.M.P.P. Kumarathunga Portrait" 
                fill
                priority
                sizes="(max-w-md) 100vw, 400px"
                className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dynamic Inner Darkening overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

              {/* Floating Monospace Badges */}
              {/* Badge 1: Top-Left */}
              <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-3.5 py-1.5 flex items-center gap-1.5 text-[11px] font-mono text-zinc-300 shadow-xl z-20 hover:border-[#B388FF]/40 transition-colors duration-300">
                <Terminal className="w-3.5 h-3.5 text-[#B388FF]" />
                <span>code <strong className="text-white font-semibold">full-stack</strong></span>
              </div>

              {/* Badge 2: Bottom-Right */}
              <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-3.5 py-1.5 flex items-center gap-1.5 text-[11px] font-mono text-zinc-300 shadow-xl z-20 hover:border-[#B388FF]/40 transition-colors duration-300">
                <Brain className="w-3.5 h-3.5 text-[#B388FF]" />
                <span>psychology <strong className="text-white font-semibold">AI/ML</strong></span>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ================= QUOTE SECTION ================= */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="relative bg-zinc-950/60 border-y border-white/5 py-20 px-6 my-32 text-center overflow-hidden"
        >
          {/* Subtle Ambient Light Grid behind the quote */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-40" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            <Quote className="w-12 h-12 text-[#B388FF] opacity-30 mx-auto mb-8 animate-pulse" />
            
            <h2 className="text-2xl md:text-4xl font-semibold text-white tracking-tight leading-relaxed max-w-3xl mx-auto mb-8 selection:bg-[#B388FF]/40">
              "Great software is a balance of robust engineering and high-fidelity user experience. 
              It must be as robust under the hood as it is elegant on the surface."
            </h2>

            {/* Glowing gradient line under quote */}
            <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#B388FF] to-transparent mx-auto rounded-full shadow-[0_0_10px_#B388FF]" />
          </div>
        </motion.section>

        {/* ================= TECHNICAL ARSENAL BENTO GRID ================= */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="my-32"
        >
          <motion.div variants={fadeInUp} className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
              Technical Arsenal
            </h2>
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em]">
              Primary domains & tools in my engineering stack
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skill, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`group relative flex flex-col justify-between ${skill.spanClass} bg-zinc-900/35 border border-white/5 rounded-2xl p-8 backdrop-blur-md transition-all duration-300 hover:bg-zinc-900/50 hover:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]`}
              >
                {/* Glow accent corner inside card */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#B388FF]/5 rounded-bl-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <span className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-all duration-300">
                        {skill.icon}
                      </span>
                      <h3 className="text-lg md:text-xl font-bold text-white tracking-wide group-hover:text-zinc-200">
                        {skill.category}
                      </h3>
                    </div>
                    {/* Small tag name */}
                    <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                      {skill.iconName}
                    </span>
                  </div>

                  {/* Skills Tag Cloud */}
                  <div className="flex flex-wrap gap-2.5">
                    {skill.tags.map((tag, tagIdx) => (
                      <span 
                        key={tagIdx} 
                        className={`px-3.5 py-1.5 rounded-lg border text-xs font-medium font-sans tracking-wide transition-all duration-300 bg-white/5 border-white/5 text-zinc-300 group-hover:border-white/10`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom decorative bar inside cards */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent mt-8 group-hover:via-white/15 transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
