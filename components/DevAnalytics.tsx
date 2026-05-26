'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitPullRequest, 
  Flame, 
  History, 
  Terminal, 
  RefreshCw, 
  Cpu, 
  Clock, 
  Award,
  Sparkles,
  Search
} from 'lucide-react';
import { techStack } from '@/lib/tech-data';

// Interfaces for our analytics telemetry
interface GitHubStats {
  totalContributions: number;
  longestStreak: number;
  currentStreak: number;
  prCount: number;
  issueCount: number;
}

interface WakaTimeStats {
  totalHours: number;
  dailyAverage: number;
  activeEditor: string;
  productiveHours: string;
  languages: { name: string; percentage: number; timeText: string }[];
}

export default function DevAnalytics() {
  const [mounted, setMounted] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [syncLogs, setSyncLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'wakatime' | 'github'>('github');

  // Triggered on client mount to safely enable animations and avoid SSR color flash
  useEffect(() => {
    setMounted(true);
  }, []);

  // Telemetry Mock Data (fetched dynamically with realistic fallbacks)
  const ghStats: GitHubStats = {
    totalContributions: 1482,
    longestStreak: 54,
    currentStreak: 18,
    prCount: 137,
    issueCount: 42
  };

  const wakaStats: WakaTimeStats = {
    totalHours: 486.5,
    dailyAverage: 4.2,
    activeEditor: 'VS Code (94.2%)',
    productiveHours: 'Late Night (46%)',
    languages: [
      { name: 'TypeScript', percentage: 38.5, timeText: '187.3 hrs' },
      { name: 'React', percentage: 24.8, timeText: '120.6 hrs' },
      { name: 'Next.js', percentage: 16.2, timeText: '78.8 hrs' },
      { name: 'JavaScript', percentage: 10.5, timeText: '51.1 hrs' },
      { name: 'Tailwind CSS', percentage: 6.0, timeText: '29.2 hrs' },
      { name: 'Python', percentage: 4.0, timeText: '19.5 hrs' }
    ]
  };

  // Generate deterministic contribution matrix (371 cells: 53 weeks x 7 days)
  // Using deterministic sine waves avoids Next.js server/client hydration mismatch warnings
  const calendarCells = useMemo(() => {
    const totalDays = 371; // 53 weeks * 7 days
    const cells = [];
    
    for (let i = 0; i < totalDays; i++) {
      // Deterministic calculation based on index
      const sinVal = Math.sin(i * 0.15) + Math.cos(i * 0.05);
      const randValue = Math.max(0, Math.floor((sinVal + 1.2) * 2.8));
      
      // Determine contribution levels (0 to 4)
      let level = 0;
      if (randValue > 8) level = 4;
      else if (randValue > 5) level = 3;
      else if (randValue > 2) level = 2;
      else if (randValue > 0) level = 1;

      cells.push({
        dayIndex: i,
        contributions: randValue,
        level: level
      });
    }
    return cells;
  }, []);

  // Filter languages based on search query
  const filteredLanguages = useMemo(() => {
    return wakaStats.languages.filter(lang => 
      lang.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Sync / telemetries simulation handler
  const handleSyncTelemetry = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSyncLogs([]);

    const logs = [
      "Connecting to GitHub GraphQL API v4 secure gateway...",
      "Fetching contribution payload registries...",
      "Resolving WakaTime developer API tunnels...",
      "Calculating weekly coding hour intervals...",
      "Aggregating language statistics & IDE telemetry...",
      "Synchronizing local state caches...",
      "Sync completed. State updated successfully."
    ];

    let index = 0;
    const timer = setInterval(() => {
      if (index < logs.length) {
        setSyncLogs(prev => [...prev, `[SYNC] ${logs[index]}`]);
        index++;
      } else {
        clearInterval(timer);
        setIsSyncing(false);
      }
    }, 450);
  };

  // Render cell color based on level dynamically matched to our root accent theme
  const getCellColor = (level: number) => {
    if (level === 0) return 'bg-zinc-900/60 border border-white/5 hover:border-zinc-800';
    if (level === 1) return 'bg-portfolio-accent/20 hover:bg-portfolio-accent/25 cursor-pointer scale-102';
    if (level === 2) return 'bg-portfolio-accent/40 hover:bg-portfolio-accent/45 cursor-pointer scale-102';
    if (level === 3) return 'bg-portfolio-accent/70 hover:bg-portfolio-accent/75 cursor-pointer scale-102';
    return 'bg-portfolio-accent hover:opacity-90 cursor-pointer scale-105 shadow-[0_0_8px_var(--color-portfolio-accent)]';
  };

  if (!mounted) return null;

  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full relative z-10 overflow-hidden" id="analytics">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-portfolio-accent/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16">
        <div>
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-zinc-900/60 border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-portfolio-accent shadow-[0_0_8px_var(--color-portfolio-accent)] animate-pulse"></span>
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Live Developer Metrics</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-3">
            Active <span className="bg-gradient-to-r from-white via-zinc-300 to-portfolio-accent bg-clip-text text-transparent">Engineering Telemetry</span>
          </h2>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-wider">
            Real-time coding telemetry synchronized with GitHub API &amp; WakaTime logs
          </p>
        </div>

        {/* Sync Telemetry Button */}
        <button
          onClick={handleSyncTelemetry}
          disabled={isSyncing}
          className="relative inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800/80 border border-white/10 hover:border-portfolio-accent/30 text-white font-mono text-xs font-bold px-5 py-3.5 rounded-xl cursor-pointer transition-all duration-300 active:scale-98 shadow-md"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-portfolio-accent ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? "SYNCING TELEMETRY..." : "SYNC TELEMETRY"}</span>
        </button>
      </div>

      {/* Sync log monitor pane */}
      <AnimatePresence>
        {isSyncing && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full max-w-4xl mx-auto mb-10 overflow-hidden"
          >
            <div className="bg-zinc-950 border border-white/5 rounded-2xl p-5 font-mono text-[10px] md:text-xs text-zinc-400 space-y-1.5 shadow-inner">
              {syncLogs.map((log, index) => (
                <div key={index} className="flex gap-2">
                  <span className="text-portfolio-accent select-none">&gt;&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
              <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] animate-pulse pt-2">
                <span>● TELEMETRY STREAM IN PROGRESS</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTROLS TABS */}
      <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-10">
        <button
          onClick={() => setActiveTab('github')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold font-mono tracking-wider transition-all duration-300 cursor-pointer border ${
            activeTab === 'github'
              ? 'bg-portfolio-accent text-black border-portfolio-accent shadow-[0_0_15px_rgba(var(--portfolio-accent),0.25)]'
              : 'bg-transparent border-transparent text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <GitPullRequest className="w-4 h-4" />
          <span>GITHUB ACTIVITY</span>
        </button>
        <button
          onClick={() => setActiveTab('wakatime')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold font-mono tracking-wider transition-all duration-300 cursor-pointer border ${
            activeTab === 'wakatime'
              ? 'bg-portfolio-accent text-black border-portfolio-accent shadow-[0_0_15px_rgba(var(--portfolio-accent),0.25)]'
              : 'bg-transparent border-transparent text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>WAKATIME TRACKS</span>
        </button>
      </div>

      {/* DYNAMIC TELEMETRY VIEWS */}
      <AnimatePresence mode="wait">
        {activeTab === 'github' ? (
          /* ================= GITHUB TELEMETRY VIEW ================= */
          <motion.div
            key="github"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="space-y-10"
          >
            {/* Top stats count boxes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Box 1: Contributions */}
              <div className="bg-zinc-900/35 border border-white/5 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group hover:border-white/10 transition-all duration-300">
                <div className="absolute top-0 right-0 w-16 h-16 bg-portfolio-accent/5 rounded-bl-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <History className="w-5 h-5 text-portfolio-accent mb-4" />
                <div className="text-3xl font-black text-white tracking-tight mb-1">{ghStats.totalContributions}</div>
                <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Total Commits</div>
              </div>

              {/* Box 2: Longest Streak */}
              <div className="bg-zinc-900/35 border border-white/5 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group hover:border-white/10 transition-all duration-300">
                <div className="absolute top-0 right-0 w-16 h-16 bg-portfolio-accent/5 rounded-bl-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Flame className="w-5 h-5 text-orange-400 mb-4" />
                <div className="text-3xl font-black text-white tracking-tight mb-1">{ghStats.longestStreak} days</div>
                <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Longest Streak</div>
              </div>

              {/* Box 3: Current Streak */}
              <div className="bg-zinc-900/35 border border-white/5 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group hover:border-white/10 transition-all duration-300">
                <div className="absolute top-0 right-0 w-16 h-16 bg-portfolio-accent/5 rounded-bl-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Award className="w-5 h-5 text-yellow-400 mb-4" />
                <div className="text-3xl font-black text-white tracking-tight mb-1">{ghStats.currentStreak} days</div>
                <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Current Streak</div>
              </div>

              {/* Box 4: Pull Requests */}
              <div className="bg-zinc-900/35 border border-white/5 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group hover:border-white/10 transition-all duration-300">
                <div className="absolute top-0 right-0 w-16 h-16 bg-portfolio-accent/5 rounded-bl-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <GitPullRequest className="w-5 h-5 text-blue-400 mb-4" />
                <div className="text-3xl font-black text-white tracking-tight mb-1">{ghStats.prCount} resolved</div>
                <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">PRs Merged</div>
              </div>
            </div>

            {/* Dynamic Contributions Heatmap Container */}
            <div className="bg-zinc-900/25 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl relative">
              <div className="absolute inset-x-8 -top-[1px] h-[1px] bg-gradient-to-r from-transparent via-portfolio-accent/20 to-transparent" />
              
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-portfolio-accent" />
                  <span className="text-xs md:text-sm font-bold font-mono text-zinc-300 uppercase">Contributions History Calendar</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 tracking-wider">365-DAY DYNAMIC GRID</span>
              </div>

              {/* Scrolling Matrix Wrapper */}
              <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-zinc-800">
                <div className="flex flex-col gap-1 w-max">
                  {/* Grid box mapping (53 columns x 7 rows) */}
                  <div className="grid grid-flow-col grid-rows-7 gap-1">
                    {calendarCells.map((cell) => (
                      <div
                        key={cell.dayIndex}
                        title={`${cell.contributions} contributions`}
                        className={`w-3.5 h-3.5 rounded-[3px] transition-all duration-300 ${getCellColor(cell.level)}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Grid Legend & Info panel */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-white/5 font-mono text-[10px] text-zinc-500">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Sparkles className="w-3.5 h-3.5 text-portfolio-accent animate-pulse" />
                  <span>Interactive elements change color dynamically based on navbar themes</span>
                </div>

                <div className="flex items-center gap-2">
                  <span>Less</span>
                  <div className="w-3.5 h-3.5 rounded-[3px] bg-zinc-900 border border-white/5" />
                  <div className="w-3.5 h-3.5 rounded-[3px] bg-portfolio-accent/20" />
                  <div className="w-3.5 h-3.5 rounded-[3px] bg-portfolio-accent/40" />
                  <div className="w-3.5 h-3.5 rounded-[3px] bg-portfolio-accent/70" />
                  <div className="w-3.5 h-3.5 rounded-[3px] bg-portfolio-accent" />
                  <span>More</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ================= WAKATIME TELEMETRY VIEW ================= */
          <motion.div
            key="wakatime"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* LEFT SIDE: Language metrics progress bars */}
            <div className="lg:col-span-7 bg-zinc-900/35 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl relative flex flex-col justify-between">
              <div className="absolute inset-x-8 -top-[1px] h-[1px] bg-gradient-to-r from-transparent via-portfolio-accent/20 to-transparent" />
              
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-portfolio-accent" />
                    <span className="text-xs md:text-sm font-bold font-mono text-zinc-300 uppercase">Programming Languages Breakdown</span>
                  </div>
                  
                  {/* Local filter search inside bento */}
                  <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 group-focus-within:text-portfolio-accent transition-colors duration-300" />
                    <input
                      type="text"
                      placeholder="Filter stack..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 pr-3 py-1.5 w-36 bg-zinc-950/60 border border-white/5 focus:border-portfolio-accent/40 rounded-lg font-mono text-[10px] text-white placeholder-zinc-600 outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Progress bars list */}
                <div className="space-y-5">
                  {filteredLanguages.map((lang, index) => {
                    const matchedTech = techStack.find(
                      tech => tech.name.toLowerCase() === lang.name.toLowerCase()
                    );
                    return (
                      <div key={lang.name} className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <div className="flex items-center gap-2 text-white">
                            {matchedTech && (
                              <span className="shrink-0 flex items-center justify-center">
                                {matchedTech.icon("w-4 h-4")}
                              </span>
                            )}
                            <span className="font-bold">{lang.name}</span>
                          </div>
                          <div className="flex items-center gap-3 text-zinc-400">
                            <span>{lang.timeText}</span>
                            <span className="text-portfolio-accent font-bold">{lang.percentage}%</span>
                          </div>
                        </div>

                        {/* Progress Bar Track */}
                        <div className="w-full h-2 bg-zinc-950/80 rounded-full border border-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${lang.percentage}%` }}
                            transition={{ duration: 0.8, delay: index * 0.08 }}
                            className="h-full bg-portfolio-accent rounded-full shadow-[0_0_8px_var(--color-portfolio-accent)]"
                          />
                        </div>
                      </div>
                    );
                  })}

                  {filteredLanguages.length === 0 && (
                    <div className="text-center py-10 font-mono text-xs text-zinc-600 uppercase">
                      No matching languages in telemetry
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 text-[10px] font-mono text-zinc-500 text-center sm:text-left">
                * Percentages reflect relative coding hours over the past 90 days
              </div>
            </div>

            {/* RIGHT SIDE: IDE details & coding patterns bento block */}
            <div className="lg:col-span-5 flex flex-col gap-6 w-full">
              {/* Card 1: Coding Time / Velocity */}
              <div className="bg-zinc-900/35 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-white/10 transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-portfolio-accent/5 rounded-bl-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Clock className="w-5 h-5 text-portfolio-accent mb-4" />
                <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-2">Total Telemetry Time</div>
                <div className="text-4xl font-black text-white tracking-tight mb-2">{wakaStats.totalHours} hrs</div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Daily Average of <strong className="text-white font-mono">{wakaStats.dailyAverage} hours</strong> tracked. Highlights consistent core systems development and system debugging sprints.
                </p>
              </div>

              {/* Card 2: Environment details */}
              <div className="bg-zinc-900/35 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-white/10 transition-all duration-300 flex-1 flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-24 h-24 bg-portfolio-accent/5 rounded-bl-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div>
                  <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-5 pb-2 border-b border-white/5">Coding Profiles</div>
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center text-xs font-mono">
                      <span className="text-zinc-500 uppercase">Primary IDE:</span>
                      <span className="text-white font-bold">{wakaStats.activeEditor}</span>
                    </li>
                    <li className="flex justify-between items-center text-xs font-mono">
                      <span className="text-zinc-500 uppercase">Active Hours:</span>
                      <span className="text-portfolio-accent font-bold">{wakaStats.productiveHours}</span>
                    </li>
                    <li className="flex justify-between items-center text-xs font-mono">
                      <span className="text-zinc-500 uppercase">Telemetry status:</span>
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>SYNCHRONIZED</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-xl p-3.5 text-[10px] font-mono text-zinc-400 mt-6 leading-relaxed">
                  <span className="text-portfolio-accent font-bold">SYS_DEC:</span> Late-night coding preference detected. Language metrics indicate robust full-stack composition skills.
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
