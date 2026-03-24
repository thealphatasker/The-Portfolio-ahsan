import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function Collage() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Group parallax animations: elements moving at different speeds
  const y1 = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-20%", "40%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["30%", "-50%"]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, -5]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <section ref={ref} className="py-32 bg-surface-container-low overflow-hidden relative min-h-[120vh] flex items-center">
      <div className="container max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-12 gap-4 md:gap-8 h-full items-center">
          
          {/* Left Image */}
          <motion.div 
            style={{ y: y1, rotate: rotate1 }} 
            className="col-span-8 md:col-span-4 h-[40vh] md:h-[60vh] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-black/50 border border-outline-variant/20 transition-colors duration-500"
          >
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop" 
              alt="Abstract tech liquid" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110" 
            />
          </motion.div>

          {/* Center Image (Overlapping) */}
          <motion.div 
            style={{ y: y2 }} 
            className="col-span-10 col-start-3 md:col-span-5 md:col-start-auto h-[50vh] md:h-[80vh] rounded-3xl overflow-hidden z-20 md:-ml-12 mt-20 shadow-[0_30px_60px_rgba(0,0,0,0.15)] dark:shadow-black/80 border border-outline-variant/20 transition-colors duration-500"
          >
            <img 
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop" 
              alt="Retro tech setup" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110" 
            />
          </motion.div>

          {/* Right Image */}
          <motion.div 
            style={{ y: y3, rotate: rotate2 }} 
            className="col-span-8 col-start-1 md:col-span-3 md:col-start-auto h-[30vh] md:h-[50vh] rounded-3xl overflow-hidden z-10 md:-ml-12 md:-mt-40 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-black/50 border border-outline-variant/20 mt-10 transition-colors duration-500"
          >
            <img 
              src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop" 
              alt="Matrix code" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110" 
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
