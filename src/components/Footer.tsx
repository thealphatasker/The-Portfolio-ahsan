import { motion } from 'motion/react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full h-[60vh] bg-surface-container-lowest flex flex-col justify-center border-t border-outline-variant/20 -z-10 transition-colors duration-500">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col md:flex-row justify-between items-center px-8 w-full max-w-7xl mx-auto gap-12"
      >
        <div className="text-center md:text-left flex flex-col items-center md:items-start">
          <div className="flex items-center gap-4 text-4xl md:text-6xl font-black text-on-surface font-headline tracking-tighter mb-4 transition-colors duration-500">
            <Logo className="w-12 h-12 md:w-16 md:h-16 text-on-surface transition-colors duration-500" />
            AHSAN.DEV
          </div>
          <div className="font-label text-xs tracking-[0.3em] uppercase text-primary">
            DIGITAL ARCHITECT
          </div>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-6">
          <div className="flex gap-8">
            {['GitHub', 'LinkedIn', 'Twitter', 'CodePen'].map((link) => (
              <a 
                key={link}
                href="#"
                className="font-label text-xs tracking-[0.2em] uppercase text-on-surface-variant hover:text-primary transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="font-label text-[10px] tracking-[0.2em] uppercase text-on-surface-variant/50 mt-4">
            © {new Date().getFullYear()} ALL RIGHTS RESERVED
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
