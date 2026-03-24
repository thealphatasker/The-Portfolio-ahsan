import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Hero from '../components/Hero';
import Manifesto from '../components/Manifesto';
import Collage from '../components/Collage';

const languages = [
  "TypeScript", "React", "Node.js", "Python", "Next.js", 
  "Tailwind CSS", "GraphQL", "PostgreSQL", "Docker", "AWS",
  "Rust", "Go", "Vue", "Svelte", "Kubernetes"
];

const MovingScript = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Add a slight scroll-based parallax to the continuous movement
  const scrollX = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <div ref={containerRef} className="w-full overflow-hidden whitespace-nowrap py-16 border-y border-outline-variant/20 bg-surface-container-lowest relative flex items-center transition-colors duration-500">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface-container-lowest to-transparent z-10 pointer-events-none transition-colors duration-500"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface-container-lowest to-transparent z-10 pointer-events-none transition-colors duration-500"></div>
      
      <motion.div style={{ x: scrollX }} className="flex">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          className="inline-flex gap-16 items-center px-8"
        >
          {[...languages, ...languages, ...languages, ...languages].map((lang, i) => (
            <span key={i} className="text-5xl md:text-7xl font-headline font-bold text-on-surface/30 dark:text-on-surface/10 uppercase tracking-tighter hover:text-primary/60 transition-colors duration-500 cursor-default">
              {lang}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

const SectionFadeIn = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full relative"
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  return (
    <>
      <Hero />
      <MovingScript />
      <SectionFadeIn><Manifesto /></SectionFadeIn>
      <SectionFadeIn><Collage /></SectionFadeIn>
    </>
  );
}
