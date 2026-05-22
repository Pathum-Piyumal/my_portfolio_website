export default function Architecture() {
  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full" id="architecture">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side - Graphic */}
        <div className="w-full aspect-[4/3] rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center overflow-hidden relative group">
          {/* Decorative lines/dots to simulate network/architecture */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(179,136,255,0.15)_0%,transparent_70%)] opacity-50"></div>
          
          <div className="relative w-full h-full flex items-center justify-center">
             {/* Central Hub */}
             <div className="w-12 h-12 bg-zinc-800 rounded-lg border border-white/10 z-10 flex items-center justify-center relative">
               <div className="w-4 h-4 bg-[#B388FF] rounded-full animate-pulse shadow-[0_0_15px_#B388FF]"></div>
             </div>
             
             {/* Connecting lines and nodes */}
             <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
               <path d="M200,150 L100,80" stroke="rgba(255,255,255,0.1)" strokeWidth="1" className="path-glow" />
               <circle cx="100" cy="80" r="4" fill="rgba(179,136,255,0.5)" />
               
               <path d="M200,150 L300,60" stroke="rgba(255,255,255,0.1)" strokeWidth="1" className="path-glow" />
               <circle cx="300" cy="60" r="3" fill="rgba(255,255,255,0.3)" />

               <path d="M200,150 L80,220" stroke="rgba(255,255,255,0.1)" strokeWidth="1" className="path-glow" />
               <circle cx="80" cy="220" r="5" fill="rgba(179,136,255,0.8)" />

               <path d="M200,150 L320,240" stroke="rgba(255,255,255,0.1)" strokeWidth="1" className="path-glow" />
               <circle cx="320" cy="240" r="4" fill="rgba(255,255,255,0.4)" />
               
               <path d="M200,150 L250,100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
               <circle cx="250" cy="100" r="2" fill="#B388FF" />
               
               <path d="M200,150 L150,200" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
               <circle cx="150" cy="200" r="2" fill="#B388FF" />
             </svg>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-wider text-white mb-2">Architecture & Cloud</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#FFB74D] mb-6">
            Software Ecosystems
          </h2>
          <p className="text-zinc-400 mb-10 text-lg leading-relaxed">
            I design solid digital ecosystems by integrating clean MERN-stack architectures with modular 
            cloud deployments and efficient database patterns, ensuring resilient, high-speed execution 
            for modern web applications.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-6 flex flex-col justify-center backdrop-blur-sm">
              <span className="text-2xl font-bold text-white mb-1">10+</span>
              <span className="text-sm font-medium text-zinc-500">Completed Projects</span>
            </div>
            <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-6 flex flex-col justify-center backdrop-blur-sm">
              <span className="text-2xl font-bold text-[#FFB74D] mb-1">100%</span>
              <span className="text-sm font-medium text-zinc-500">Dedicated Learner</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
