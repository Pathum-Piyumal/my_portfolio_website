'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Trash2 } from 'lucide-react';

interface TerminalLine {
  command?: string;
  output: React.ReactNode;
}

export default function TerminalSandbox() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const consoleEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input automatically on terminal window clicks
  const focusTerminalInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Scroll console to bottom on history modifications
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  // Load welcome greeting on mount
  useEffect(() => {
    setHistory([
      {
        output: (
          <div className="font-mono text-zinc-400 leading-relaxed text-xs md:text-sm select-none">
            <div className="text-portfolio-accent font-bold mb-2">
{`■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
■  ____   _  _____  _   _  _   _  __  __  ■
■ |  _ \\ / \\|_   _|| | | || | | ||  \\/  | ■
■ | |_) / _ \\ | |  | |_| || | | || |\\/| | ■
■ |  __/ ___ \\| |  |  _  || |_| || |  | | ■
■ |_| /_/   \\_\\_|  |_| |_| \\___/ |_|  |_| ■
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■`}
            </div>
            <p className="mt-4 text-white font-bold">SYSTEM BOOT SUCCESSFUL // SHELL LOADED</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Interactive Sandbox Console v1.1.0</p>
            <p className="mt-3 text-zinc-300">Welcome to Pathum's secure interactive developer sandbox terminal.</p>
            <p className="mt-1 text-zinc-400">
              Type <strong className="text-portfolio-accent">help</strong> or click any of the quick execution badges in the system registry panel to query active credentials.
            </p>
          </div>
        )
      }
    ]);
  }, []);

  const executeCommand = (cmdString: string) => {
    const cleanCmd = cmdString.trim().toLowerCase();
    if (!cleanCmd) return;

    let outputElement: React.ReactNode;

    switch (cleanCmd) {
      case 'help':
      case '/help':
        outputElement = (
          <div className="font-mono text-xs md:text-sm text-zinc-300 space-y-2 select-none">
            <p className="text-portfolio-accent font-bold uppercase tracking-wider">Available Commands</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5 mt-2">
              <div className="flex gap-2">
                <span className="text-portfolio-accent font-bold min-w-[70px]">help</span>
                <span className="text-zinc-500">- Display command directory</span>
              </div>
              <div className="flex gap-2">
                <span className="text-portfolio-accent font-bold min-w-[70px]">about</span>
                <span className="text-zinc-500">- Profile overview (JSON spec)</span>
              </div>
              <div className="flex gap-2">
                <span className="text-portfolio-accent font-bold min-w-[70px]">projects</span>
                <span className="text-zinc-500">- Deployed software systems</span>
              </div>
              <div className="flex gap-2">
                <span className="text-portfolio-accent font-bold min-w-[70px]">skills</span>
                <span className="text-zinc-500">- Visual capabilities graph</span>
              </div>
              <div className="flex gap-2">
                <span className="text-portfolio-accent font-bold min-w-[70px]">contact</span>
                <span className="text-zinc-500">- Active networking gateways</span>
              </div>
              <div className="flex gap-2">
                <span className="text-portfolio-accent font-bold min-w-[70px]">clear</span>
                <span className="text-zinc-500">- Flush terminal shell buffer</span>
              </div>
            </div>
          </div>
        );
        break;

      case 'about':
      case '/about':
        outputElement = (
          <div className="font-mono text-xs md:text-sm text-zinc-400 select-none">
            <p className="text-zinc-500">{"{"}</p>
            <div className="pl-5 space-y-1.5">
              <p>
                <span className="text-zinc-500">"name":</span> <span className="text-portfolio-accent">"R.M.P.P. Kumarathunga"</span>,
              </p>
              <p>
                <span className="text-zinc-500">"role":</span> <span className="text-portfolio-accent">"Software Engineering Undergraduate"</span>,
              </p>
              <p>
                <span className="text-zinc-500">"focus":</span> <span className="text-portfolio-accent">"Full-Stack Development (MERN), DevOps, AI/ML"</span>,
              </p>
              <p>
                <span className="text-zinc-500">"academic":</span> <span className="text-portfolio-accent">"Software Engineering Student"</span>,
              </p>
              <p>
                <span className="text-zinc-500">"mission":</span> <span className="text-zinc-300">"Decoupling complex server ecosystems, orchestrating automated edge gates, and engineering responsive high-fidelity interfaces."</span>
              </p>
            </div>
            <p className="text-zinc-500">{"}"}</p>
          </div>
        );
        break;

      case 'projects':
      case '/projects':
        outputElement = (
          <div className="font-mono text-xs md:text-sm text-zinc-300 select-none overflow-x-auto pb-2">
            <div className="border border-white/5 rounded-xl bg-zinc-950/60 p-4 w-max min-w-full">
              <p className="text-portfolio-accent font-bold uppercase tracking-wider mb-3">Ingressed Projects Directory</p>
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-zinc-500 uppercase font-mono tracking-wider">
                    <th className="pb-2 pr-6">Project Name</th>
                    <th className="pb-2 pr-6">Primary Tech Stack</th>
                    <th className="pb-2">Deployment Target</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-300 font-mono">
                  <tr className="border-b border-white/5">
                    <td className="py-2.5 pr-6 font-bold text-white">WeatherPro</td>
                    <td className="py-2.5 pr-6">MERN Stack, Chart.js</td>
                    <td className="py-2.5">Render Cloud Engine</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2.5 pr-6 font-bold text-white">Developer Portfolio</td>
                    <td className="py-2.5 pr-6">Next.js 16, React 19, Tailwind v4</td>
                    <td className="py-2.5">Vercel Edge Gateway</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-6 font-bold text-white">Task Management App</td>
                    <td className="py-2.5 pr-6">Node.js, Express, MongoDB</td>
                    <td className="py-2.5">Render Cloud Engine</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
        break;

      case 'skills':
      case '/skills':
        const skillsMetrics = [
          { name: 'TypeScript', pct: 85 },
          { name: 'React/Next.js', pct: 90 },
          { name: 'Node/Express', pct: 80 },
          { name: 'Python/AI-ML', pct: 60 },
          { name: 'DevOps/Docker', pct: 55 }
        ];
        outputElement = (
          <div className="font-mono text-xs md:text-sm text-zinc-300 space-y-3 select-none">
            <p className="text-portfolio-accent font-bold uppercase tracking-wider">Capabilities Vector Matrix</p>
            <div className="space-y-2 mt-2">
              {skillsMetrics.map((skill) => {
                const barWidth = Math.floor(skill.pct / 3.3);
                const barChars = '█'.repeat(barWidth);
                const emptyChars = '░'.repeat(30 - barWidth);
                return (
                  <div key={skill.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 font-mono">
                    <span className="text-white font-bold min-w-[120px]">{skill.name}</span>
                    <div className="flex items-center gap-2 flex-1 max-w-lg">
                      <span className="text-portfolio-accent truncate">{barChars}</span>
                      <span className="text-zinc-800 shrink-0">{emptyChars}</span>
                    </div>
                    <span className="text-portfolio-accent font-bold w-12 text-right">{skill.pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
        break;

      case 'contact':
      case '/contact':
        outputElement = (
          <div className="font-mono text-xs md:text-sm text-zinc-300 space-y-2 select-none">
            <p className="text-portfolio-accent font-bold uppercase tracking-wider">Network Gateways Connected</p>
            <ul className="space-y-1.5 mt-2">
              <li className="flex items-center gap-2">
                <span className="text-zinc-500 min-w-[70px]">Email:</span>
                <a 
                  href="mailto:pathumkumarathunga@gmail.com" 
                  className="text-portfolio-accent hover:underline font-bold transition-all duration-200"
                >
                  pathumkumarathunga@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-zinc-500 min-w-[70px]">GitHub:</span>
                <a 
                  href="https://github.com/Pathum-Piyumal" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-portfolio-accent hover:underline font-bold transition-all duration-200"
                >
                  github.com/Pathum-Piyumal
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-zinc-500 min-w-[70px]">LinkedIn:</span>
                <a 
                  href="https://www.linkedin.com/in/pathum-piyumal-kumarathunga/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-portfolio-accent hover:underline font-bold transition-all duration-200"
                >
                  linkedin.com/in/pathum-piyumal-kumarathunga/
                </a>
              </li>
            </ul>
          </div>
        );
        break;

      case 'clear':
      case '/clear':
        setHistory([]);
        setInput('');
        return;

      default:
        outputElement = (
          <div className="font-mono text-xs md:text-sm text-rose-500 select-none">
            <p>Command not found: "{cmdString}".</p>
            <p className="text-zinc-500 mt-1">Type <strong className="text-portfolio-accent">help</strong> to view all operational options.</p>
          </div>
        );
    }

    setHistory(prev => [...prev, { command: cmdString, output: outputElement }]);
    setInput('');
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
  };

  const handleClearTerminal = () => {
    setHistory([]);
    setInput('');
  };

  return (
    <section className="py-24 px-4 md:px-8 max-w-6xl mx-auto w-full relative z-10 overflow-hidden" id="sandbox">
      {/* Dynamic ambient backdrop glow */}
      <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] bg-portfolio-accent/5 rounded-full blur-[130px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* HEADER SECTION */}
      <div className="mb-12 text-left select-none">
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-zinc-900/60 border border-white/5">
          <Sparkles className="w-3.5 h-3.5 text-portfolio-accent animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Interactive Recruiter Sandbox</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-3">
          Interactive{' '}
          <span className="bg-gradient-to-r from-white via-zinc-300 to-portfolio-accent bg-clip-text text-transparent">Developer Console</span>
        </h2>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-wider">
          Query credential structures, system specifications, and coding parameters directly
        </p>
      </div>

      {/* TERMINAL WINDOW CARD WITH SPLIT PANE */}
      <div 
        onClick={focusTerminalInput}
        className="w-full bg-zinc-950/80 border border-white/10 hover:border-portfolio-accent/20 rounded-[28px] overflow-hidden shadow-2xl transition-all duration-300 backdrop-blur-xl relative cursor-text group"
      >
        {/* Sleek dynamic top edge highlight */}
        <div className="absolute inset-x-12 top-0 h-[1px] bg-gradient-to-r from-transparent via-portfolio-accent/30 to-transparent pointer-events-none" />

        {/* Console Header Bar */}
        <div className="bg-zinc-950/95 border-b border-white/5 px-6 py-3.5 flex items-center justify-between select-none">
          {/* Left: Dynamic Pulsing System Indicator */}
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-portfolio-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-portfolio-accent shadow-[0_0_8px_var(--color-portfolio-accent)]"></span>
            </span>
            <span className="text-[10px] font-mono font-black tracking-widest text-zinc-400 uppercase">Interactive Developer Shell</span>
          </div>

          {/* Right: Trash / Clear Trigger */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleClearTerminal();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/10 hover:border-portfolio-accent/30 bg-white/5 text-[9px] font-mono text-zinc-500 hover:text-portfolio-accent transition-all duration-200 cursor-pointer shadow hover:scale-105 active:scale-95"
            title="Clear Console Buffer"
          >
            <Trash2 className="w-3 h-3 text-portfolio-accent" />
            <span className="uppercase font-bold">Clear Shell</span>
          </button>
        </div>

        {/* Split Pane Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* LEFT SIDEBAR: System Details & Quick Shortcuts */}
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/5 bg-zinc-950/40 p-6 flex flex-col justify-between font-mono select-none">
            <div className="space-y-6">
              {/* System Specs Bento */}
              <div>
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-3">System Registry</span>
                <div className="space-y-2 bg-black/40 border border-white/5 p-3.5 rounded-2xl text-[10px] text-zinc-400">
                  <div className="flex justify-between">
                    <span className="text-zinc-600">SHELL:</span>
                    <span className="text-white font-bold">zsh / node-v20</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">GATEWAY:</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                      <span>SECURE_ONLINE</span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">HOST:</span>
                    <span className="text-white">localhost:3000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">RESOURCES:</span>
                    <span className="text-portfolio-accent font-bold">100% active</span>
                  </div>
                </div>
              </div>

              {/* Clickable Shortcuts Bento */}
              <div>
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-3">Quick Execution Badges</span>
                <div className="flex flex-col gap-2">
                  {[
                    { label: 'help', desc: 'Command Dictionary' },
                    { label: 'about', desc: 'JSON Developer Profile' },
                    { label: 'projects', desc: 'Deployed App Systems' },
                    { label: 'skills', desc: 'Capabilities Graph' },
                    { label: 'contact', desc: 'Active Network Gates' }
                  ].map((badge) => (
                    <button
                      key={badge.label}
                      onClick={(e) => {
                        e.stopPropagation();
                        executeCommand(badge.label);
                      }}
                      className="w-full text-left p-2.5 rounded-xl border border-white/5 hover:border-portfolio-accent/30 bg-black/35 hover:bg-portfolio-accent/5 text-zinc-400 hover:text-white transition-all duration-300 hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-portfolio-accent font-bold text-xs group-hover:translate-x-0.5 transition-transform duration-300">&gt; {badge.label}</span>
                      </div>
                      <span className="text-[9px] text-zinc-600 font-bold group-hover:text-zinc-500 transition-colors uppercase font-mono tracking-wider">{badge.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Matrix Decoy / Telemetry Signal */}
            <div className="pt-6 mt-6 border-t border-white/5 text-[9px] text-zinc-600 leading-relaxed hidden lg:block">
              <span className="text-portfolio-accent font-bold block mb-1">SYS_NOTICE:</span>
              Clicking quick badges executes queries inside the main console array in real-time.
            </div>
          </div>

          {/* RIGHT SIDE: Interactive Command Line Terminal */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            {/* TERMINAL CONTENT SCREEN */}
            <div className="p-6 md:p-8 h-[340px] md:h-[400px] overflow-y-auto font-mono text-left space-y-6 scrollbar-thin scrollbar-thumb-zinc-800">
              {/* History Lines */}
              <AnimatePresence initial={false}>
                {history.map((line, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3.5"
                  >
                    {/* Command Line Input Record */}
                    {line.command !== undefined && (
                      <div className="flex items-center gap-2 select-none text-xs md:text-sm font-bold font-mono">
                        <span className="text-zinc-500">guest@pathum-piyumal:~$</span>
                        <span className="text-white">{line.command}</span>
                      </div>
                    )}

                    {/* Command Output Response */}
                    <div className="pl-0 sm:pl-5 leading-relaxed">
                      {line.output}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div ref={consoleEndRef} />
            </div>

            {/* INPUT SHELL FORM */}
            <form 
              onSubmit={handleCommandSubmit}
              className="border-t border-white/5 bg-zinc-950/90 px-6 py-4 flex items-center gap-3 relative"
            >
              <span className="text-zinc-500 font-mono text-xs md:text-sm font-bold select-none shrink-0">guest@pathum-piyumal:~$</span>
              
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type 'help' or click quick badges..."
                className="flex-1 bg-transparent text-white font-mono text-xs md:text-sm placeholder:text-zinc-700 outline-none border-none focus:ring-0 w-full"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
              />

              <button 
                type="submit"
                className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-portfolio-accent/30 text-zinc-500 hover:text-white transition-all duration-200 cursor-pointer flex items-center justify-center shadow hover:scale-105 active:scale-95"
              >
                <Send className="w-3.5 h-3.5 text-portfolio-accent" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
