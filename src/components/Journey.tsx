import { motion, useScroll } from 'motion/react';
import { useRef } from 'react';

const steps = [
  {
    id: "01 / GENESIS",
    title: "Breaking the Source Code",
    desc: "My journey began with a fascination for how simple strings of text could manifest into interactive realities. Transitioning from a background of structured problem-solving into the world of Full-Stack development."
  },
  {
    id: "02 / DEEP DIVE",
    title: "The React Ecosystem",
    desc: "Immersing myself in the component-driven world. Mastering hooks, context, and state management while maintaining a strict focus on clean, scalable architecture and pixel-perfect UI execution."
  },
  {
    id: "03 / HORIZON",
    title: "Full-Stack Synthesis",
    desc: "Currently bridging the gap between front-end aesthetics and back-end logic. Integrating Node.js and modern database architectures to build comprehensive digital solutions."
  }
];

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section className="py-32 bg-surface-container-low" id="journey">
      <div className="container max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-5 sticky top-32">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="font-headline text-4xl md:text-5xl font-bold tracking-tighter mb-8"
            >
              THE <br/><span className="text-primary">EVOLUTION</span>
            </motion.h2>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-24 h-1 bg-primary mb-8 origin-left"
            ></motion.div>
          </div>
          
          <div className="md:col-span-7 relative pl-8 md:pl-12 py-8" ref={containerRef}>
            {/* Background Line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-outline-variant/20 transition-colors duration-500" />
            
            {/* Animated Drawing Line tied to scroll */}
            <motion.div 
              style={{ scaleY: scrollYProgress }} 
              className="absolute left-0 top-0 bottom-0 w-px bg-primary origin-top shadow-[0_0_10px_rgba(var(--primary-rgb),0.8)] transition-colors duration-500" 
            />

            <div className="space-y-24">
              {steps.map((step, i) => (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="group relative"
                >
                  {/* Glowing dot on the timeline */}
                  <div className="absolute -left-[36px] md:-left-[52px] top-1 w-2 h-2 rounded-full bg-surface border border-primary group-hover:bg-primary transition-colors duration-500 shadow-[0_0_10px_rgba(var(--primary-rgb),0)] group-hover:shadow-[0_0_10px_rgba(var(--primary-rgb),0.8)]" />
                  
                  <span className="font-label text-primary text-sm tracking-widest">{step.id}</span>
                  <h3 className="text-2xl font-headline font-bold mt-4 mb-6">{step.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed text-lg">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
