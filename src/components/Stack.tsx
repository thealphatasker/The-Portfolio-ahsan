import { motion } from 'motion/react';
import { Terminal, Code2, Database } from 'lucide-react';

const stackItems = [
  {
    icon: Terminal,
    title: "JavaScript / ES6+",
    desc: "The foundation of modern interaction. Proficient in functional programming and asynchronous operations.",
    tags: ["Async/Await", "Proxies"]
  },
  {
    icon: Code2,
    title: "React / Next.js",
    desc: "Building scalable interfaces with atomic design principles and optimized state management.",
    tags: ["Server Components", "Tailwind"]
  },
  {
    icon: Database,
    title: "Node.js / SQL",
    desc: "Engineered backend services focusing on RESTful API design and database optimization.",
    tags: ["Express", "PostgreSQL"]
  }
];

export default function Stack() {
  return (
    <section className="py-32" id="stack">
      <div className="container max-w-7xl mx-auto px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="font-headline text-5xl font-bold tracking-tighter mb-4 uppercase">Tech <span className="text-primary">Arsenal</span></h2>
          <p className="text-on-surface-variant font-label tracking-widest text-sm uppercase">Curated Stack for Modern Performance</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stackItems.map((item, i) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-surface-container p-12 group hover:bg-surface-container-high transition-colors duration-500 border border-outline-variant/10 rounded-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <item.icon className="text-primary w-12 h-12 mb-8 relative z-10" />
              <h4 className="font-headline text-2xl font-bold mb-4 uppercase tracking-tighter relative z-10">{item.title}</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-8 relative z-10">{item.desc}</p>
              <div className="flex flex-wrap gap-2 relative z-10">
                {item.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-secondary-container/20 text-secondary text-[10px] font-label uppercase tracking-widest rounded-full border border-secondary/10">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
