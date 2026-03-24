import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const capabilities = [
  { 
    title: "Frontend Architecture", 
    desc: "Building scalable, component-driven interfaces with React, Next.js, and Framer Motion. Focusing on atomic design principles and flawless user experiences.",
    number: "01"
  },
  { 
    title: "Backend Systems", 
    desc: "Engineering robust APIs and microservices using Node.js, Express, and PostgreSQL. Ensuring high availability, security, and optimal database performance.",
    number: "02"
  },
  { 
    title: "Cloud Infrastructure", 
    desc: "Deploying and managing containerized applications with Docker, AWS, and modern CI/CD pipelines for seamless continuous integration.",
    number: "03"
  },
  { 
    title: "UI/UX Engineering", 
    desc: "Bridging the gap between design and code. Implementing complex design systems with Tailwind CSS while maintaining strict accessibility standards.",
    number: "04"
  },
];

export default function Capabilities() {
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: targetRef,
  });
  
  // Horizontal scroll transform: 4 items = 400vw width. We shift by -75% to see all 4.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="h-[400vh] bg-surface relative" id="capabilities">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex w-[400vw] h-full items-center">
          {capabilities.map((cap, i) => (
            <div key={i} className="w-screen flex items-center justify-center px-8 md:px-24">
              <div className="max-w-4xl w-full grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-4">
                  <span className="font-headline text-8xl md:text-[12rem] font-black text-transparent stroke-text opacity-20" style={{ WebkitTextStroke: '2px var(--color-primary)' }}>
                    {cap.number}
                  </span>
                </div>
                <div className="md:col-span-8">
                  <h2 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter mb-8 uppercase leading-tight">
                    {cap.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-on-surface-variant font-light leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
