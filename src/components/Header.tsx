import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import Logo from './Logo';
import MagneticButton from './MagneticButton';
import { useTheme } from '../lib/ThemeContext';

export default function Header() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20 shadow-sm transition-colors duration-500"
    >
      <nav className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-3 text-2xl font-black tracking-tighter text-on-surface font-headline transition-colors duration-500">
          <Logo className="w-8 h-8 text-on-surface transition-colors duration-500" />
          AHSAN.DEV
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {['Laboratory', 'Lessons', 'Journey', 'Stack', 'Collaborate'].map((item) => (
            <Link 
              key={item}
              to={`/${item.toLowerCase()}`}
              className="font-headline tracking-tight uppercase text-sm font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <MagneticButton>
            <button 
              onClick={toggleTheme}
              className="flex items-center justify-center p-2.5 rounded-lg border border-outline-variant/30 text-on-surface hover:bg-on-surface/5 transition-all duration-300"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </MagneticButton>
          <MagneticButton>
            <button className="kinetic-glow text-on-primary font-headline font-bold uppercase text-xs tracking-widest px-6 py-2.5 rounded-lg hover:scale-105 transition-transform active:scale-95 shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]">
              Resume
            </button>
          </MagneticButton>
        </div>
      </nav>
    </motion.header>
  );
}
