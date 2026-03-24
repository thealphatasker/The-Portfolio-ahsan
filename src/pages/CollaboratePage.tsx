import React from 'react';
import { motion } from 'motion/react';
import Collaborate from '../components/Collaborate';

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

export default function CollaboratePage() {
  return (
    <div className="pt-24">
      <SectionFadeIn><Collaborate /></SectionFadeIn>
    </div>
  );
}
