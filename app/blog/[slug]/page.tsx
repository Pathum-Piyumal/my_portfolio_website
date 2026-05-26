'use client';

import * as React from 'react';
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Sparkles, BookOpen, ChevronRight, Link as LinkIcon, Check } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";
import { techStack } from "@/lib/tech-data";

// Resilient inline SVG brand icon components to prevent compilation discrepancies
function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

// Custom code component to handle high-fidelity syntax blocks & copying
function CodeContainer({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="bg-zinc-950 border border-white/10 rounded-xl overflow-hidden my-8 font-mono shadow-[0_10px_40px_rgba(0,0,0,0.85)] relative group">
      {/* Top Window Header Accent */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/60 border-b border-white/5 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#EF4444]/60" />
          <span className="w-3 h-3 rounded-full bg-[#F59E0B]/60" />
          <span className="w-3 h-3 rounded-full bg-[#10B981]/60" />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{language}</span>
          <button 
            onClick={handleCopy}
            className="text-[10px] font-mono text-zinc-400 hover:text-white px-2 py-1 rounded bg-white/5 border border-white/10 hover:border-white/15 hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
          >
            {copied ? "COPIED" : "COPY CODE"}
          </button>
        </div>
      </div>
      {/* Scrollable code area */}
      <pre className="p-5 md:p-6 overflow-x-auto text-xs md:text-sm text-zinc-300 leading-relaxed max-w-full selection:bg-portfolio-accent/30">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// Custom callout notification block
function CalloutBlock({ text }: { text: string }) {
  return (
    <div className="relative overflow-hidden bg-portfolio-accent/5 border border-portfolio-accent/15 rounded-2xl p-5 md:p-6 my-8 flex items-start gap-4 shadow-[0_4px_30px_rgba(var(--portfolio-accent),0.02)]">
      {/* Vertical left neon line */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-portfolio-accent to-portfolio-accent/60 shadow-[0_0_10px_rgba(var(--portfolio-accent),0.5)]" />
      <span className="p-2.5 bg-portfolio-accent/10 rounded-xl border border-portfolio-accent/20 text-portfolio-accent shrink-0">
        <Sparkles className="w-4 h-4" />
      </span>
      <div className="flex-1">
        <span className="text-[10px] font-mono font-bold tracking-widest text-portfolio-accent/80 uppercase block mb-1">PRO-TIP ARCHITECTURE</span>
        <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-sans">{text}</p>
      </div>
    </div>
  );
}

// Custom bullet list component
function ListBlock({ items }: { items: string[] }) {
  return (
    <ul className="list-none space-y-4 my-8 pl-1 max-w-3xl">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3.5 text-zinc-300 text-sm md:text-base leading-relaxed">
          <span className="w-1.5 h-1.5 rounded-full bg-portfolio-accent shadow-[0_0_8px_var(--color-portfolio-accent)] mt-2.5 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function BlogPostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrap parameters using React.use() to keep Next.js dynamic routing 100% compliant
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;

  const post = blogPosts.find((p) => p.slug === slug);

  // Scroll progress indicators
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  // SEO document title dynamic sync
  React.useEffect(() => {
    if (post) {
      document.title = `${post.title} | Pathum Piyumal | Dev Blog`;
    }
  }, [post]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };

  const shareLinkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const shareTwitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`Check out this deep dive article: "${post?.title || ''}" by Pathum Piyumal!`)}`;

  // If post slug does not exist
  if (!post) {
    return (
      <div className="flex flex-col min-h-screen bg-black font-sans text-white">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-16 px-4">
          <BookOpen className="w-16 h-16 text-zinc-600 mb-6 animate-pulse" />
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white mb-3">
            Article Not Found
          </h1>
          <p className="text-zinc-500 text-sm md:text-base max-w-md text-center mb-8">
            The write-up dynamic path matches no registered archives in our database registry.
          </p>
          <Link href="/blog">
            <button className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-full text-xs font-mono font-bold tracking-widest hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>RETURN TO ARCHIVES</span>
            </button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-black font-sans selection:bg-portfolio-accent/30 text-white overflow-x-hidden">
      {/* Glowing Top Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3.5px] bg-portfolio-accent origin-left z-[100] shadow-[0_1px_10px_var(--color-portfolio-accent)]"
        style={{ scaleX }}
      />
      <Navbar />

      {/* Dynamic ambient backdrop spotlight */}
      <div 
        style={{ backgroundColor: post.glowColor }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] rounded-full blur-[140px] opacity-10 pointer-events-none -z-10" 
      />

      <main className="flex-1 pt-32 pb-24 px-4 md:px-8 max-w-4xl mx-auto w-full relative z-10">
        
        {/* ================= BACKWARD NAVIGATION TRIGGER ================= */}
        <div className="mb-10">
          <Link href="/blog">
            <motion.button 
              whileHover="hover"
              className="inline-flex items-center gap-2.5 text-xs font-mono font-bold tracking-widest text-zinc-400 hover:text-white cursor-pointer group bg-zinc-900/35 border border-white/5 px-4 py-2 rounded-full backdrop-blur-sm hover:border-white/10 hover:bg-zinc-900/50 transition-all duration-300"
            >
              <motion.span
                variants={{
                  hover: { x: -3 },
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <ArrowLeft className="w-4 h-4 text-zinc-400 group-hover:text-portfolio-accent transition-colors" />
              </motion.span>
              <span>BACK TO ARTICLES</span>
            </motion.button>
          </Link>
        </div>

        {/* ================= BREADCRUMBS ================= */}
        <div className="flex items-center gap-1.5 mb-6 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-zinc-600" />
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <ChevronRight className="w-3 h-3 text-zinc-600" />
          <span className="text-portfolio-accent truncate max-w-[200px] md:max-w-sm">{post.title}</span>
        </div>

        {/* ================= POST HEADER PANEL ================= */}
        <header className="mb-12">
          {/* Category Pill */}
          <span className="inline-block text-[10px] font-mono font-black tracking-widest text-portfolio-accent uppercase border border-portfolio-accent/30 px-3 py-1 rounded bg-portfolio-accent/5 mb-6 shadow-[0_0_12px_rgba(var(--portfolio-accent),0.05)]">
            {post.category}
          </span>

          {/* Large Title */}
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6 leading-[1.15] md:leading-[1.2]">
            {post.title}
          </h1>

          {/* Reading Metadata */}
          <div className="flex flex-wrap items-center gap-6 text-xs md:text-sm text-zinc-400 border-b border-white/10 pb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-portfolio-accent/70" />
              <span>Published on {post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-zinc-500" />
              <span>{post.readTime} reading duration</span>
            </div>
          </div>
        </header>

        {/* ================= POST CONTENT RENDERER ================= */}
        <article className="prose prose-invert max-w-none text-zinc-300 selection:bg-portfolio-accent/40 leading-relaxed font-sans">
          {post.content.map((block, idx) => {
            switch (block.type) {
              case 'paragraph':
                return (
                  <p key={idx} className="text-base md:text-lg text-zinc-300 leading-relaxed mb-6 font-normal">
                    {block.text}
                  </p>
                );
              case 'heading':
                return (
                  <h2 key={idx} className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-12 mb-5 border-b border-white/5 pb-2 font-sans">
                    {block.text}
                  </h2>
                );
              case 'subheading':
                return (
                  <h3 key={idx} className="text-xl md:text-2xl font-bold tracking-tight text-zinc-100 mt-8 mb-4 font-sans">
                    {block.text}
                  </h3>
                );
              case 'code':
                return (
                  <CodeContainer 
                    key={idx} 
                    code={block.code || ""} 
                    language={block.language || "typescript"} 
                  />
                );
              case 'list':
                return (
                  <ListBlock 
                    key={idx} 
                    items={block.items || []} 
                  />
                );
              case 'callout':
                return (
                  <CalloutBlock 
                    key={idx} 
                    text={block.text || ""} 
                  />
                );
              default:
                return null;
            }
          })}
        </article>

        {/* ================= POST SHARE PORTAL ================= */}
        <div className="mt-12 p-6 md:p-8 bg-zinc-900/20 border border-white/5 rounded-3xl backdrop-blur-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute inset-x-8 -top-[1px] h-[1px] bg-gradient-to-r from-transparent via-portfolio-accent/10 to-transparent" />
          
          <div className="text-center md:text-left">
            <h4 className="text-base font-bold text-white mb-1">Found this write-up helpful?</h4>
            <p className="text-zinc-400 text-xs md:text-sm">Spread the knowledge by sharing this article with your professional network!</p>
          </div>

          <div className="flex items-center gap-3 select-none">
            {/* LinkedIn Share */}
            <a 
              href={shareLinkedInUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4.5 py-2.5 rounded-2xl bg-white/5 border border-white/10 hover:border-portfolio-accent/30 text-xs font-bold font-mono tracking-wider text-zinc-300 hover:text-white hover:bg-portfolio-accent/5 active:scale-95 transition-all duration-300"
              aria-label="Share on LinkedIn"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-portfolio-accent" />
              <span>LINKEDIN</span>
            </a>

            {/* X Share */}
            <a 
              href={shareTwitterUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4.5 py-2.5 rounded-2xl bg-white/5 border border-white/10 hover:border-portfolio-accent/30 text-xs font-bold font-mono tracking-wider text-zinc-300 hover:text-white hover:bg-portfolio-accent/5 active:scale-95 transition-all duration-300"
              aria-label="Share on X"
            >
              <TwitterIcon className="w-3.5 h-3.5 text-portfolio-accent" />
              <span>SHARE ON X</span>
            </a>

            {/* Copy link button */}
            <button 
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4.5 py-2.5 rounded-2xl bg-white/5 border border-white/10 hover:border-portfolio-accent/30 text-xs font-bold font-mono tracking-wider text-zinc-300 hover:text-white hover:bg-portfolio-accent/5 active:scale-95 transition-all duration-300 cursor-pointer relative"
              aria-label="Copy link to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400 animate-bounce" /> : <LinkIcon className="w-3.5 h-3.5 text-portfolio-accent" />}
              <span>{copied ? "COPIED!" : "COPY LINK"}</span>
            </button>
          </div>
        </div>

        {/* ================= POST FOOTER (ENG CORE PRACTICED) ================= */}
        <footer className="mt-16 pt-10 border-t border-white/10">
          <h4 className="text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase mb-6">
            Technologies & Frameworks Discussed:
          </h4>
          <div className="flex flex-wrap gap-3">
            {post.tags.map((tag) => {
              const matchedTech = techStack.find(
                (tech) => tech.name.toLowerCase() === tag.toLowerCase()
              );
              return (
                <div
                  key={tag}
                  className={`px-4 py-2 rounded-xl border text-xs md:text-sm font-semibold font-sans tracking-wide transition-all duration-300 flex items-center gap-2 select-none ${
                    matchedTech 
                      ? matchedTech.badgeColor 
                      : "bg-white/5 border-white/5 text-zinc-300 hover:border-white/10"
                  }`}
                >
                  {matchedTech && (
                    <span className="shrink-0 flex items-center justify-center">
                      {matchedTech.icon("w-4 h-4")}
                    </span>
                  )}
                  <span>{tag}</span>
                </div>
              );
            })}
          </div>
        </footer>

      </main>

      {/* Desktop Floating Share Panel */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3.5 bg-zinc-950/75 backdrop-blur-xl border border-white/10 rounded-full px-3 py-6 shadow-2xl z-40 select-none">
        <span 
          className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-2"
          style={{ writingMode: 'vertical-lr', textTransform: 'uppercase' }}
        >
          Share
        </span>
        
        {/* LinkedIn Share */}
        <a 
          href={shareLinkedInUrl}
          target="_blank"
          rel="noreferrer"
          className="p-3 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-portfolio-accent hover:border-portfolio-accent/30 hover:bg-portfolio-accent/5 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center"
          title="Share to LinkedIn"
          aria-label="Share on LinkedIn"
        >
          <LinkedinIcon className="w-4 h-4" />
        </a>

        {/* X (Twitter) Share */}
        <a 
          href={shareTwitterUrl}
          target="_blank"
          rel="noreferrer"
          className="p-3 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-portfolio-accent hover:border-portfolio-accent/30 hover:bg-portfolio-accent/5 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center"
          title="Share to X (Twitter)"
          aria-label="Share on X (Twitter)"
        >
          <TwitterIcon className="w-4 h-4" />
        </a>

        {/* Clipboard Link Copy */}
        <button 
          onClick={copyToClipboard}
          className="p-3 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-portfolio-accent hover:border-portfolio-accent/30 hover:bg-portfolio-accent/5 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer relative flex items-center justify-center"
          title="Copy Link to Clipboard"
          aria-label="Copy article link"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <LinkIcon className="w-4 h-4" />}
          
          <AnimatePresence>
            {copied && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 30 }}
                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1 rounded bg-emerald-500 text-black font-mono font-bold text-[9px] uppercase shadow-lg select-none pointer-events-none whitespace-nowrap"
              >
                Copied!
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <Footer />
    </div>
  );
}
