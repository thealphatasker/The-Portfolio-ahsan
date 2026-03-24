import React from 'react';
import { motion } from 'motion/react';
import Capabilities from '../components/Capabilities';

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

export default function CapabilitiesPage() {
  return (
    <div className="pt-24">
      <SectionFadeIn><Capabilities /></SectionFadeIn>
    </div>
  );
}
