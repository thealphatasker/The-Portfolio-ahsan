import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import MagneticButton from './MagneticButton';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  // 1. Background parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  
  // 2. Text splitting animations (horizontal scroll)
  const textLeftX = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const textRightX = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  // 3. Content fade out
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 overflow-hidden">
        <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 -top-[15%] -bottom-[15%]">
          <img 
            alt="Digital matrix pattern with glowing circuit lines" 
            className="w-full h-full object-cover mix-blend-multiply dark:invert-0 invert transition-all duration-500" 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
          />
        </motion.div>
      </div>
      <div className="container max-w-7xl mx-auto px-8 relative z-10">
        <div className="max-w-5xl">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ opacity: contentOpacity }}
            className="inline-block font-label text-primary uppercase tracking-[0.3em] text-xs mb-6 border-l-2 border-primary pl-4"
          >
            Digital Architect in Training
          </motion.span>
          
          <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] mb-8 overflow-hidden py-2">
            <motion.div style={{ x: textLeftX }} className="whitespace-nowrap">
              BUILDING <span className="text-primary text-glow italic">LOGIC</span>
            </motion.div>
            <motion.div style={{ x: textRightX }} className="whitespace-nowrap">
              WITH <span className="text-on-surface">PRECISION.</span>
            </motion.div>
          </h1>
          
          <motion.div style={{ opacity: contentOpacity, y: contentY }}>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-on-surface-variant text-lg md:text-xl max-w-xl mb-12 font-light leading-relaxed"
            >
              Full-stack developer student specializing in React architectures and high-performance digital environments.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-6"
            >
              <MagneticButton>
                <Link className="kinetic-glow text-on-primary px-8 py-4 font-headline font-bold uppercase tracking-widest text-sm rounded transition-all hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.4)] inline-block" to="/laboratory">
                  View Laboratory
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link className="border border-outline-variant/30 text-on-surface px-8 py-4 font-headline font-bold uppercase tracking-widest text-sm rounded hover:bg-on-surface/5 transition-all inline-block" to="/collaborate">
                  Initiate Protocol
                </Link>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
      {/* Ambient Glow */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
    </section>
  );
}
