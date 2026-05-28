'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Clock, CheckCircle2, ChevronRight, Terminal, Download, Eye, Sparkles } from "lucide-react";
import { useSearchParams } from 'next/navigation';

function ContactForm() {
  const searchParams = useSearchParams();
  const initialSubject = searchParams ? (searchParams.get('subject') || 'Project Inquiry / Role Opportunity') : 'Project Inquiry / Role Opportunity';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: initialSubject,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [activeField, setActiveField] = useState<string | null>(null);

  // Blinking cursor state
  const [cursorVisible, setCursorVisible] = useState(true);
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setLogs([]);

    // Cosmetic terminal log sequence — shown while the real API call runs in parallel.
    // This gives the user immediate visual feedback that something is happening.
    const logSequence = [
      `[CONNECTING] Establishing secure handshake with DevCommand gateway...`,
      `[HANDSHAKE] TLS 1.3 session established // Cipher: TLS_AES_256_GCM_SHA384`,
      `[VALIDATING] Payload integrity check in progress...`,
      `[VALIDATING] Sender Identity: ${formData.name}`,
      `[VALIDATING] Reply Routing: ${formData.email}`,
      `[ENCRYPTING] Packaging transmission payload (AES-256 encryption keys)...`,
      `[TRANSMITTING] Dispatching data packets to core servers...`,
      `[TRANSMITTING] Routing via secure relays... 35%`,
      `[TRANSMITTING] Routing via secure relays... 74%`,
      `[TRANSMITTING] Routing via secure relays... 100%`,
    ];

    // Start the cosmetic log animation
    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < logSequence.length) {
        // Capture the entry VALUE immediately — do NOT pass logSequence[currentLogIndex]
        // inside the functional updater, because React may defer the update and by then
        // currentLogIndex will have been incremented, causing undefined to be read.
        const entry = logSequence[currentLogIndex];
        currentLogIndex++;
        setLogs(prev => [...prev, entry]);
      } else {
        clearInterval(logInterval);
      }
    }, 280);

    try {
      // Real API call — sends the form data to our Next.js serverless route,
      // which uses Resend to deliver the email to the owner's inbox.
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // Clear the log interval in case the API responded before it finished
      clearInterval(logInterval);

      if (!response.ok || !result.success) {
        // API returned an error — show it to the user
        setLogs(prev => [...prev, `[ERROR] Transmission failed: ${result.error || 'Unknown error'}`]);
        setTimeout(() => {
          setSubmitError(result.error || 'Something went wrong. Please try again.');
          setIsSubmitting(false);
          setLogs([]);
        }, 1200);
        return;
      }

      // Success — show the final log line then transition to success screen
      setLogs(prev => [
        ...prev,
        `[SUCCESS] Signature verified. Transmission acknowledged by gateway.`,
        `[SYS_LOG] Log entry recorded successfully at UNIX epoch: ${Math.floor(Date.now() / 1000)}.`
      ]);

      setTimeout(() => {
        setIsSuccess(true);
        setIsSubmitting(false);
      }, 900);

    } catch {
      // Network-level error (no internet, server totally down, etc.)
      clearInterval(logInterval);
      setLogs(prev => [...prev, `[ERROR] Network failure — could not reach gateway.`]);
      setTimeout(() => {
        setSubmitError('Network error. Please check your connection and try again.');
        setIsSubmitting(false);
        setLogs([]);
      }, 1200);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: 'Project Inquiry / Role Opportunity',
      message: ''
    });
    setIsSuccess(false);
    setIsSubmitting(false);
    setSubmitError(null);
    setLogs([]);
  };

  return (
    <div className="bg-zinc-900/40 border border-white/5 rounded-3xl p-8 md:p-10 backdrop-blur-md relative overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      {/* Top terminal-style bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
          <span className="text-zinc-500 ml-2 select-none">// PROTOCOL_INIT</span>
        </div>
        <div className="flex items-center gap-3 text-zinc-400">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-800 text-[10px] border border-white/5">
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
            SECURE
          </span>
          <span className="text-zinc-500">PORT: 443</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!isSubmitting && !isSuccess ? (
          <motion.form 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit} 
            className="space-y-6"
          >
            {/* Double Column inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name field */}
              <div className="space-y-2">
                <label className="text-xs font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-1.5">
                  Name {activeField === 'name' && <span className="text-portfolio-accent text-[10px] animate-pulse">● active</span>}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setActiveField('name')}
                    onBlur={() => setActiveField(null)}
                    placeholder="John Doe"
                    className="w-full h-12 bg-white text-zinc-900 placeholder:text-zinc-400 rounded-xl px-4 font-sans text-sm outline-none transition-all duration-300 font-medium focus:ring-2 focus:ring-portfolio-accent/30 border border-transparent shadow-[0_4px_12px_rgba(255,255,255,0.05)]"
                  />
                </div>
              </div>

              {/* Email field */}
              <div className="space-y-2">
                <label className="text-xs font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-1.5">
                  Email {activeField === 'email' && <span className="text-portfolio-accent text-[10px] animate-pulse">● active</span>}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setActiveField('email')}
                    onBlur={() => setActiveField(null)}
                    placeholder="john@domain.com"
                    className="w-full h-12 bg-white text-zinc-900 placeholder:text-zinc-400 rounded-xl px-4 font-sans text-sm outline-none transition-all duration-300 font-medium focus:ring-2 focus:ring-portfolio-accent/30 border border-transparent shadow-[0_4px_12px_rgba(255,255,255,0.05)]"
                  />
                </div>
              </div>
            </div>

            {/* Subject field */}
            <div className="space-y-2">
              <label className="text-xs font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-1.5">
                Subject {activeField === 'subject' && <span className="text-portfolio-accent text-[10px] animate-pulse">● active</span>}
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  onFocus={() => setActiveField('subject')}
                  onBlur={() => setActiveField(null)}
                  placeholder="Project Inquiry / Role Opportunity"
                  className="w-full h-12 bg-white text-zinc-900 placeholder:text-zinc-400 rounded-xl px-4 font-sans text-sm outline-none transition-all duration-300 font-medium focus:ring-2 focus:ring-portfolio-accent/30 border border-transparent shadow-[0_4px_12px_rgba(255,255,255,0.05)]"
                />
              </div>
            </div>

            {/* Message field */}
            <div className="space-y-2">
              <label className="text-xs font-mono tracking-widest text-zinc-400 uppercase flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  Message {activeField === 'message' && <span className="text-portfolio-accent text-[10px] animate-pulse">● encoding</span>}
                </span>
                <span className="text-[10px] text-zinc-500 font-normal">CHARACTERS: {formData.message.length}</span>
              </label>
              <div className="relative group/textarea rounded-xl border border-white/10 bg-black/40 overflow-hidden focus-within:border-portfolio-accent/40 transition-colors duration-300">
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setActiveField('message')}
                  onBlur={() => setActiveField(null)}
                  placeholder="Enter transmission details here..."
                  className="w-full bg-transparent text-white placeholder:text-zinc-600 px-4 py-4 font-mono text-sm outline-none resize-none min-h-[160px] relative z-10"
                />
                
                {/* Visual cursor effect inside textarea when active and empty */}
                {activeField === 'message' && formData.message === '' && (
                  <div className="absolute top-4 left-[200px] text-zinc-600 font-mono text-sm pointer-events-none select-none">
                    <span className={cursorVisible ? "opacity-100" : "opacity-0"}>_</span>
                  </div>
                )}
              </div>
              {/* Error message — shown if the API call fails */}
              {submitError && (
                <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-red-500/8 border border-red-500/20 font-mono text-xs text-red-400">
                  <span className="shrink-0 mt-0.5">✕</span>
                  <span>{submitError}</span>
                </div>
              )}

              {/* Submit button with interactive prompt */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-zinc-800 hover:bg-zinc-700/80 border border-white/10 text-white font-mono text-xs font-bold tracking-wider uppercase px-8 py-4 rounded-xl transition-all duration-300 flex items-center gap-2 group cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(var(--portfolio-accent),0.15)] hover:border-portfolio-accent/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Send Message</span>
                  <span className="text-portfolio-accent group-hover:translate-x-1 transition-transform duration-300">
                    ssh://
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-portfolio-accent" />
                </button>
              </div>
            </div>
          </motion.form>
        ) : isSubmitting ? (
          /* Live Terminal Transmission logs screen */
          <motion.div 
            key="logs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col bg-zinc-950 border border-white/5 rounded-2xl p-6 min-h-[380px] font-mono text-xs leading-relaxed justify-between relative shadow-inner"
          >
            <div className="space-y-2.5 overflow-y-auto max-h-[300px] scrollbar-thin scrollbar-thumb-zinc-800">
              {logs.filter((log): log is string => typeof log === 'string').map((log, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`${log.includes('[SUCCESS]') ? 'text-emerald-400 font-bold' : log.includes('[ERROR]') ? 'text-red-400 font-bold' : log.includes('[VALIDATING]') ? 'text-blue-400' : log.includes('[CONNECTING]') || log.includes('[HANDSHAKE]') ? 'text-zinc-400' : log.includes('[ENCRYPTING]') ? 'text-yellow-400' : 'text-zinc-300'}`}
                >
                  {log}
                </motion.div>
              ))}
              
              {/* Blinking cursor at current typing log */}
              <div className="flex items-center gap-1.5 text-zinc-500">
                <span className="animate-pulse">●</span>
                <span>Transmitting data packets</span>
                <span className={cursorVisible ? 'opacity-100' : 'opacity-0'}>_</span>
              </div>
            </div>

            {/* Bottom transmission progress bar */}
            <div className="border-t border-white/5 pt-4 mt-4 flex items-center justify-between text-zinc-500 text-[10px] tracking-widest">
              <span>STATUS: DISPATCHING_PAYLOAD</span>
              <span className="animate-pulse">STREAMING...</span>
            </div>
          </motion.div>
        ) : (
          /* High fidelity Success screen */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-center py-10 px-4 min-h-[380px] space-y-6"
          >
            {/* Big success pulse icon */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse" />
              <div className="relative bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-full">
                <CheckCircle2 className="w-12 h-12 text-emerald-400" />
              </div>
            </div>

            <div className="space-y-3 max-w-md">
              <h3 className="text-2xl font-bold text-white tracking-wide font-sans">
                Transmission Successful!
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Thank you, <strong className="text-white font-medium">{formData.name}</strong>. Your message was encrypted and logged successfully in my core database system under subject:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs font-mono text-portfolio-accent inline-block max-w-full truncate">
                {formData.subject}
              </div>
              <p className="text-zinc-500 text-xs mt-2 leading-relaxed">
                A transmission handshake acknowledgement will be processed to <span className="text-zinc-300 font-mono">{formData.email}</span>. I'll get back to you within 24 to 48 hours.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-mono text-xs font-semibold px-6 py-3 rounded-full transition-all duration-300 cursor-pointer flex items-center gap-2 mt-4 hover:border-white/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Terminal className="w-4 h-4 text-portfolio-accent" />
              Send Another Transmission
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  // Animation presets
  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
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

  return (
    <div className="flex flex-col min-h-screen bg-black font-sans selection:bg-portfolio-accent/30 text-white overflow-x-hidden">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto w-full relative z-10">
        {/* Dynamic Abstract Ambient Background Glows */}
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-portfolio-accent/10 rounded-full blur-[130px] -z-10 pointer-events-none animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[130px] -z-10 pointer-events-none" />

        {/* ================= HERO / HEADER SECTION ================= */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center flex flex-col items-center mb-16 md:mb-20 max-w-3xl mx-auto"
        >
          {/* Glowing Pill Tag */}
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-portfolio-accent shadow-[0_0_8px_var(--color-portfolio-accent)] animate-pulse"></span>
            <span className="text-[10px] md:text-[11px] font-mono tracking-widest text-portfolio-accent uppercase font-bold">
              # let's connect
            </span>
          </motion.div>

          {/* Dynamic Main Title */}
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight"
          >
            Let's Build Something<br />
            <span className="bg-gradient-to-r from-white via-zinc-200 to-portfolio-accent bg-clip-text text-transparent">
              Meaningful Together
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            variants={fadeInUp}
            className="text-zinc-400 text-base md:text-lg mb-8 leading-relaxed max-w-2xl"
          >
            Currently exploring new opportunities in software engineering, open to collaborative projects, technical discussions, and full-time roles in forward-thinking environments.
          </motion.p>

          {/* Metadata Pill Banner */}
          <motion.div 
            variants={fadeInUp}
            className="flex items-center divide-x divide-white/10 bg-zinc-900/60 border border-white/10 rounded-full px-5 py-2.5 text-xs font-mono shadow-md text-zinc-300 backdrop-blur-sm"
          >
            <div className="flex items-center gap-1.5 pr-4 text-[#FFB74D]">
              <Clock className="w-3.5 h-3.5" />
              <span>Response Time: 24-48h</span>
            </div>
            <div className="flex items-center gap-1.5 pl-4 text-zinc-300">
              <Sparkles className="w-3.5 h-3.5 text-portfolio-accent animate-pulse" />
              <span>Open for Roles & Collabs</span>
            </div>
          </motion.div>
        </motion.section>

        {/* ================= MAIN COLUMN GRID SECTION ================= */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24 max-w-6xl mx-auto"
        >
          {/* LEFT SIDE: Info cards */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full">
            {/* Card 1: Email */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative bg-zinc-900/35 border border-white/5 rounded-2xl p-6 backdrop-blur-md transition-all duration-300 hover:bg-zinc-900/50 hover:border-white/10 shadow-[0_4px_25px_rgba(0,0,0,0.3)] overflow-hidden"
            >
              {/* Card glowing accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-portfolio-accent/5 rounded-bl-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="flex flex-col gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-portfolio-accent/30 group-hover:bg-portfolio-accent/5 transition-all duration-300 shadow-md">
                  <Mail className="w-5 h-5 text-portfolio-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base mb-1 tracking-wide">Email</h3>
                  <p className="text-zinc-500 text-xs mb-3 font-sans leading-relaxed">Direct line to my inbox.</p>
                  <a 
                    href="mailto:pathumpiyumal013@gmail.com"
                    className="text-portfolio-accent hover:opacity-80 font-mono text-xs transition-colors duration-200 flex items-center gap-1"
                  >
                    <span>pathumpiyumal013@gmail.com</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Card 2: GitHub */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative bg-zinc-900/35 border border-white/5 rounded-2xl p-6 backdrop-blur-md transition-all duration-300 hover:bg-zinc-900/50 hover:border-white/10 shadow-[0_4px_25px_rgba(0,0,0,0.3)] overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-bl-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="flex flex-col gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-blue-400/30 group-hover:bg-blue-400/5 transition-all duration-300 shadow-md">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-400">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base mb-1 tracking-wide">GitHub</h3>
                  <p className="text-zinc-500 text-xs mb-3 font-sans leading-relaxed">Review my technical architecture.</p>
                  <a 
                    href="https://github.com/Pathum-Piyumal" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-blue-400 hover:text-blue-300 font-mono text-xs transition-colors duration-200 flex items-center gap-1"
                  >
                    <span>@Pathum-Piyumal</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Card 3: LinkedIn */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative bg-zinc-900/35 border border-white/5 rounded-2xl p-6 backdrop-blur-md transition-all duration-300 hover:bg-zinc-900/50 hover:border-white/10 shadow-[0_4px_25px_rgba(0,0,0,0.3)] overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#FFB74D]/5 rounded-bl-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="flex flex-col gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#FFB74D]/30 group-hover:bg-[#FFB74D]/5 transition-all duration-300 shadow-md">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#FFB74D]">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base mb-1 tracking-wide">LinkedIn</h3>
                  <p className="text-zinc-500 text-xs mb-3 font-sans leading-relaxed">Professional history & network.</p>
                  <a 
                    href="https://www.linkedin.com/in/pathum-piyumal-kumarathunga-48185b32b/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[#FFB74D] hover:text-[#ffc570] font-mono text-xs transition-colors duration-200 flex items-center gap-1"
                  >
                    <span>/in/pathum-piyumal-kumarathunga-48185b32b</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Interactive form terminal console */}
          <motion.div variants={fadeInUp} className="lg:col-span-8 w-full">
            <Suspense fallback={
              <div className="bg-zinc-900/40 border border-white/5 rounded-3xl p-10 backdrop-blur-md h-[400px] flex items-center justify-center font-mono text-xs text-zinc-500">
                Initializing safe channels...
              </div>
            }>
              <ContactForm />
            </Suspense>
          </motion.div>
        </motion.section>

        {/* ================= BOTTOM CTA / "READY TO BUILD" SECTION ================= */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="border-t border-white/5 pt-20 pb-12 text-center max-w-4xl mx-auto flex flex-col items-center"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-8"
          >
            Ready to Build Something Great?
          </motion.h2>

          <motion.div 
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link href="/#portfolio">
              <button className="bg-white text-zinc-950 px-8 py-3.5 rounded-full font-bold hover:bg-zinc-200 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.1)] hover:shadow-[0_0_35px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer text-sm">
                <Eye className="w-4 h-4" />
                View Projects
              </button>
            </Link>
            
            <Link href="/about">
              <button className="bg-transparent border border-white/10 text-white px-8 py-3.5 rounded-full font-medium hover:bg-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer text-sm">
                <Download className="w-4 h-4 text-portfolio-accent" />
                Download Resume
              </button>
            </Link>
          </motion.div>
        </motion.section>
      </main>

      {/* ================= sleeker monospace footer bar ================= */}
      <footer className="border-t border-white/5 py-8 px-4 md:px-8 bg-zinc-950/60 backdrop-blur-md relative z-10 w-full">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <span className="text-white font-bold tracking-tight">RMPK</span>
            <span className="text-portfolio-accent text-[10px] font-mono px-1.5 py-0.5 rounded border border-portfolio-accent/20 bg-portfolio-accent/5">.dev</span>
          </div>
          
          <div className="text-center">
            © 2026 Built with Neural Interface. All systems operational.
          </div>
          
          <div className="flex items-center gap-6">
            <a href="https://github.com/Pathum-Piyumal" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200">GitHub</a>
            <a href="https://www.linkedin.com/in/pathum-piyumal-kumarathunga-48185b32b/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200">LinkedIn</a>
            <Link href="/contact" className="hover:text-white transition-colors duration-200">Terminal</Link>
            <Link href="/about" className="hover:text-white transition-colors duration-200">Documentation</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
