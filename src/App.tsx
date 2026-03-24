import { motion, useScroll, useSpring } from 'motion/react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { ThemeProvider } from './lib/ThemeContext';

import Home from './pages/Home';
import CapabilitiesPage from './pages/CapabilitiesPage';
import JourneyPage from './pages/JourneyPage';
import StackPage from './pages/StackPage';
import LaboratoryPage from './pages/LaboratoryPage';
import LessonsPage from './pages/LessonsPage';
import CollaboratePage from './pages/CollaboratePage';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-surface text-on-surface font-body selection:bg-primary selection:text-on-primary md:cursor-none">
          <CustomCursor />
          
          {/* Global Scroll Progress Bar */}
          <motion.div 
            className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[100] shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)] transition-colors duration-500" 
            style={{ scaleX }} 
          />
          
          <Header />
          
          {/* Main content wrapper with margin bottom to reveal the sticky footer */}
          <main className="relative z-10 bg-surface mb-[60vh] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-colors duration-500">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/capabilities" element={<CapabilitiesPage />} />
              <Route path="/journey" element={<JourneyPage />} />
              <Route path="/stack" element={<StackPage />} />
              <Route path="/laboratory" element={<LaboratoryPage />} />
              <Route path="/lessons" element={<LessonsPage />} />
              <Route path="/collaborate" element={<CollaboratePage />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}
