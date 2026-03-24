import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 40%"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, 0]);

  return (
    <section ref={ref} className="py-40 md:py-64 bg-surface flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.03)_0%,transparent_70%)] pointer-events-none"></div>
      <motion.div 
        style={{ opacity, scale, y }} 
        className="container max-w-6xl mx-auto px-8 text-center relative z-10"
      >
        <h2 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1]">
          WE DON'T JUST WRITE CODE.<br/>
          <span className="text-primary italic font-light">WE ENGINEER REALITIES.</span>
        </h2>
      </motion.div>
    </section>
  );
}
