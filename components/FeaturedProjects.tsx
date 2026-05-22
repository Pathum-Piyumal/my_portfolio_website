import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    title: 'Nexus Analytics Dashboard',
    description: 'Real-time data visualization platform processing millions of events per minute. Built with React and WebSockets.',
    tags: ['React', 'Node.js'],
    imageColor: 'from-blue-500/20 to-blue-900/20'
  },
  {
    title: 'Automated API Gateway',
    description: 'Enterprise microservices routing solution optimizing traffic flow with minimal latency and high availability.',
    tags: ['Docker', 'Go'],
    imageColor: 'from-green-500/20 to-emerald-900/20'
  },
  {
    title: 'Cognitive Predictive Engine',
    description: 'Machine learning service for predicting user behavior patterns using neural networks and deep learning.',
    tags: ['Python', 'TensorFlow'],
    imageColor: 'from-purple-500/20 to-pink-900/20'
  }
];

export default function FeaturedProjects() {
  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full" id="portfolio">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Featured Projects</h2>
          <p className="text-zinc-500 text-sm">SELECTED WORK 2021-PRESENT</p>
        </div>
        <Link href="https://github.com/Pathum-Piyumal" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-[#B388FF] hover:text-[#c4a1ff] transition-colors mt-4 md:mt-0">
          View Repository <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <div key={idx} className="group flex flex-col bg-zinc-900/30 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors">
            {/* Image placeholder with abstract background */}
            <div className={`h-48 w-full bg-gradient-to-br ${project.imageColor} relative overflow-hidden flex items-center justify-center`}>
               {/* Abstract visual elements */}
               <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
               <div className="w-full h-full opacity-30 flex items-center justify-center">
                 <div className="w-16 h-16 border border-white/20 rounded-full group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                    <div className="w-8 h-8 border border-white/20 rounded-full"></div>
                 </div>
               </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#B388FF] transition-colors">{project.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">
                {project.description}
              </p>
              
              <div className="flex items-center gap-2 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/5 text-zinc-300 text-xs font-medium rounded-md border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
