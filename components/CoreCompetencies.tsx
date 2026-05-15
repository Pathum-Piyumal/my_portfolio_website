import { Triangle, Cloud, Zap, Cpu } from 'lucide-react';

const competencies = [
  {
    title: 'Macro Architecture Thinking',
    description: 'Designing system interfaces, module boundaries, and communication frameworks for scale.',
    icon: <Triangle className="w-6 h-6 text-white" />
  },
  {
    title: 'Distributed System Design',
    description: 'Building distributed applications capable of handling high throughput and ensuring high availability.',
    icon: <Cloud className="w-6 h-6 text-[#B388FF]" />
  },
  {
    title: 'DevOps Foundation',
    description: 'Integrating deployments and automated operations with streamlined CI/CD tooling and deployment systems.',
    icon: <Zap className="w-6 h-6 text-white" />
  },
  {
    title: 'AI/ML Integration',
    description: 'Seamlessly embedding machine learning workflows to build intelligent, predictive applications.',
    icon: <Cpu className="w-6 h-6 text-[#FFB74D]" />
  }
];

export default function CoreCompetencies() {
  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-[#FFB74D] mb-12">Core Competencies</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {competencies.map((comp, idx) => (
          <div key={idx} className="bg-zinc-900/30 border border-white/5 p-8 rounded-2xl flex gap-6 hover:bg-zinc-900/50 transition-colors">
            <div className="shrink-0 mt-1">
              {comp.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">{comp.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {comp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
