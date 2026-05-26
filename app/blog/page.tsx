'use client';

import { useState, useMemo } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Calendar, Clock, BookOpen, Sparkles } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";
import { techStack } from "@/lib/tech-data";
import SpotlightCard from "@/components/SpotlightCard";

export default function BlogListingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState("");

  // Extract all unique categories dynamically
  const categories = useMemo(() => {
    const cats = blogPosts.map(post => post.category);
    return ["All", ...Array.from(new Set(cats))];
  }, []);

  // Compute tag frequencies dynamically from blogPosts
  const tagCloud = useMemo(() => {
    const counts: Record<string, number> = {};
    blogPosts.forEach(post => {
      post.tags.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, []);

  // Filter posts based on active search, selected category, and selected tag cloud filter
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      
      if (!matchesCategory || !matchesTag) return false;
      if (!searchQuery.trim()) return true;

      // Tokenized fuzzy keyword matching logic
      const tokens = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
      return tokens.every(token => {
        return (
          post.title.toLowerCase().includes(token) ||
          post.excerpt.toLowerCase().includes(token) ||
          post.category.toLowerCase().includes(token) ||
          post.tags.some(tag => tag.toLowerCase().includes(token))
        );
      });
    });
  }, [searchQuery, selectedCategory, selectedTag]);


  // Animation configurations
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" as const } 
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-black font-sans selection:bg-portfolio-accent/30 text-white overflow-x-hidden">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto w-full relative z-10">
        {/* Dynamic Abstract Ambient Background Glows */}
        <div className="absolute top-20 left-1/4 w-[350px] h-[350px] bg-portfolio-accent/10 rounded-full blur-[120px] -z-10 pointer-events-none animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-[130px] -z-10 pointer-events-none" />

        {/* ================= PAGE HEADER ================= */}
        <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
          {/* Monospace Pill */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-portfolio-accent animate-pulse" />
            <span className="text-[10px] md:text-[11px] font-mono tracking-widest text-zinc-300 uppercase">
              Technical Archives & Write-ups
            </span>
          </motion.div>

          {/* Large Page Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight"
          >
            Developer{" "}
            <span className="bg-gradient-to-r from-white via-zinc-300 to-portfolio-accent bg-clip-text text-transparent">
              Insights & Deep Dives
            </span>
          </motion.h1>

          {/* Excerpt */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-400 text-base md:text-lg max-w-xl leading-relaxed"
          >
            Diving into advanced microservices patterns, next-generation rendering engines, 
            high-fidelity frontends, and vectorized data visualizers.
          </motion.p>
        </div>

        {/* ================= CONTROLS: SEARCH & CATEGORIES ================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col gap-6 w-full max-w-4xl mx-auto mb-16 p-4 md:p-6 bg-zinc-900/25 border border-white/5 rounded-3xl backdrop-blur-md shadow-2xl relative"
        >
          {/* Inner ambient shine accent */}
          <div className="absolute inset-x-8 -top-[1px] h-[1px] bg-gradient-to-r from-transparent via-portfolio-accent/10 to-transparent" />

          {/* Dynamic Search Input */}
          <div className="relative w-full group">
            <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-portfolio-accent transition-colors duration-300" />
            <input
              type="text"
              placeholder="Search by keywords, tags, or components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-zinc-950/80 border border-white/10 rounded-2xl text-sm md:text-base font-sans tracking-wide text-white placeholder-zinc-500 focus:outline-none focus:border-portfolio-accent/40 focus:ring-1 focus:ring-portfolio-accent/30 transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
            />
          </div>

          {/* Categories Pill Selector */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase mr-2">Category:</span>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      // Clear tag when switching categories to avoid empty filter intersections
                      setSelectedTag("");
                    }}
                    className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium tracking-wide border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-portfolio-accent text-black border-portfolio-accent shadow-[0_0_15px_rgba(var(--portfolio-accent),0.25)] font-semibold scale-102"
                        : "bg-white/5 border-white/5 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/10"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Tag Cloud Filter */}
          <div className="flex flex-col gap-2.5 pt-3.5 border-t border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">Tags:</span>
                <span className="text-[10px] text-zinc-600 font-mono italic">(Click to filter by technology)</span>
              </div>
              {selectedTag && (
                <button
                  onClick={() => setSelectedTag("")}
                  className="text-[10px] font-mono text-portfolio-accent hover:underline cursor-pointer flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded border border-white/10"
                >
                  Clear Tag Filter [x]
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {tagCloud.map(({ name, count }) => {
                const isActive = selectedTag === name;
                const matchedTech = techStack.find(
                  (tech) => tech.name.toLowerCase() === name.toLowerCase()
                );
                return (
                  <button
                    key={name}
                    onClick={() => setSelectedTag(isActive ? "" : name)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium tracking-wide border transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? "bg-portfolio-accent text-black border-portfolio-accent shadow-[0_0_12px_rgba(var(--portfolio-accent),0.3)] font-bold scale-102"
                        : matchedTech 
                          ? "bg-zinc-950/60 border-white/5 text-zinc-300 hover:text-white hover:bg-white/10 hover:border-white/10"
                          : "bg-white/5 border-white/5 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/10"
                    }`}
                  >
                    {matchedTech && (
                      <span className="shrink-0 flex items-center justify-center">
                        {matchedTech.icon(isActive ? "w-3 h-3 text-black" : "w-3 h-3 text-portfolio-accent/80")}
                      </span>
                    )}
                    <span>{name}</span>
                    <span className={`text-[9px] font-mono font-black px-1.5 py-0.2 rounded ${
                      isActive ? "bg-black/15 text-black" : "bg-white/5 text-zinc-500"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ================= ARTICLES GRID ================= */}
        <AnimatePresence mode="wait">
          {filteredPosts.length > 0 ? (
            <motion.div 
              key="grid"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-7xl mx-auto"
            >
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.slug}
                  variants={fadeInUp}
                >
                  <SpotlightCard
                    spotlightColor={post.glowColor}
                    glowColor={post.glowColor}
                    className="h-full"
                  >
                  <article
                    className="group relative flex flex-col justify-between bg-zinc-900/35 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-md transition-all duration-500 hover:bg-zinc-900/50 hover:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)] overflow-hidden h-full"
                >
                  {/* Subtle top accent ambient card cover highlight */}
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${post.coverColor} opacity-70 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  {/* Outer corner glow light */}
                  <div 
                    style={{ backgroundColor: post.glowColor }}
                    className="absolute top-0 right-0 w-28 h-28 rounded-bl-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                  />

                  {/* Header / Meta */}
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-5 text-[11px] font-mono text-zinc-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-portfolio-accent/70" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Category Stamp */}
                    <span className="inline-block text-[9px] font-mono font-bold tracking-widest text-portfolio-accent uppercase border border-portfolio-accent/30 px-2 py-0.5 rounded bg-portfolio-accent/5 mb-4 shadow-[0_0_8px_rgba(var(--portfolio-accent),0.05)]">
                      {post.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-4 line-clamp-2 leading-tight group-hover:text-zinc-200 transition-colors duration-300">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-zinc-400 text-sm md:text-base mb-6 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Footer tags & action link */}
                  <div className="mt-4">
                    {/* Visual stack tags matching about page tech */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag) => {
                        const matchedTech = techStack.find(
                          (tech) => tech.name.toLowerCase() === tag.toLowerCase()
                        );
                        return (
                          <span
                            key={tag}
                            className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold font-sans tracking-wide transition-all duration-300 flex items-center gap-1.5 select-none ${
                              matchedTech 
                                ? matchedTech.badgeColor 
                                : "bg-white/5 border-white/5 text-zinc-300 hover:border-white/10"
                            }`}
                          >
                            {matchedTech && (
                              <span className="shrink-0 flex items-center justify-center">
                                {matchedTech.icon("w-3 h-3")}
                              </span>
                            )}
                            <span>{tag}</span>
                          </span>
                        );
                      })}
                    </div>

                    {/* Dynamic Action Trigger */}
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="w-full flex items-center justify-between text-xs font-bold font-mono tracking-wider text-zinc-400 group-hover:text-white pt-4 border-t border-white/5 transition-colors duration-300 cursor-pointer">
                        <span>READ ARTICLE</span>
                        <div className="flex items-center justify-center p-1.5 rounded-full bg-white/5 border border-white/10 group-hover:border-portfolio-accent/30 group-hover:bg-portfolio-accent/10 transition-all duration-300">
                          <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-portfolio-accent group-hover:translate-x-0.5 transition-all duration-300" />
                        </div>
                      </div>
                    </Link>
                  </div>
                  </article>
                  </SpotlightCard>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Empty State */
            <motion.div 
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center py-20 bg-zinc-950/40 border border-white/5 rounded-3xl max-w-xl mx-auto px-6 backdrop-blur-sm"
            >
              <BookOpen className="w-12 h-12 text-portfolio-accent opacity-35 mx-auto mb-4 animate-bounce" />
              <h3 className="text-xl font-bold text-white mb-2">No Articles Found</h3>
              <p className="text-zinc-500 text-sm max-w-xs mx-auto leading-relaxed">
                We couldn't find any write-ups matching "{searchQuery}". Try modifying your keywords or selecting another category.
              </p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setSelectedTag(""); }}
                className="mt-6 text-xs font-bold font-mono tracking-widest text-portfolio-accent border-b border-portfolio-accent/30 hover:border-portfolio-accent pb-0.5 transition-all duration-300 cursor-pointer"
              >
                CLEAR FILTER RULES
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
