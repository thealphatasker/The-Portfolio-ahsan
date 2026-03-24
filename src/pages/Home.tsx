import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Hero from '../components/Hero';
import Manifesto from '../components/Manifesto';
import Collage from '../components/Collage';

import Capabilities from '../components/Capabilities';
import Journey from '../components/Journey';
import Stack from '../components/Stack';
import Laboratory from '../components/Laboratory';
import Lessons from '../components/Lessons';
import Collaborate from '../components/Collaborate';
import Reviews from '../components/Reviews';

const languagesList = [
  "TypeScript", "React", "Node.js", "Python", "Next.js", 
  "Tailwind CSS", "GraphQL", "PostgreSQL", "Docker", "AWS",
  "Rust", "Go", "Vue", "Svelte", "Kubernetes"
];

const backendList = [
  "Django", "Express", "Spring Boot", "Laravel", "Ruby on Rails", 
  "Flask", "FastAPI", "NestJS", "Dotnet", "Koa"
];

const databasesList = [
  "MongoDB", "Redis", "MySQL", "Cassandra", "Elasticsearch", 
  "Neo4j", "DynamoDB", "MariaDB", "SQLite"
];

const devopsList = [
  "Kubernetes", "Terraform", "Ansible", "Jenkins", "GitLab CI", 
  "GitHub Actions", "CircleCI", "Docker Compose", "Vagrant"
];

const cloudList = [
  "AWS", "GCP", "Azure", "Vercel", "Netlify", 
  "Heroku", "DigitalOcean", "Cloudflare", "Firebase", "Supabase"
];

const designList = [
  "Figma", "Framer Motion", "GSAP", "Three.js", "WebGL", 
  "Spline", "Tailwind", "Sass", "Styled Components"
];

const testingList = [
  "Jest", "Cypress", "Playwright", "Mocha", "Chai", 
  "Vitest", "Selenium", "Puppeteer", "Testing Library"
];

const architectureList = [
  "Microservices", "Serverless", "Event-Driven", "REST", "GraphQL", 
  "gRPC", "WebSockets", "WebRTC", "SOA"
];

const vcsList = [
  "Git", "GitHub", "GitLab", "Bitbucket", "SVN", 
  "Mercurial", "Perforce", "TFS", "Azure DevOps"
];

const editorsList = [
  "Vim", "VS Code", "IntelliJ", "WebStorm", "PyCharm", 
  "Neovim", "Emacs", "Sublime Text", "Atom"
];

const managementList = [
  "Agile", "Scrum", "Kanban", "Sprint", "Jira", 
  "Trello", "Asana", "Notion", "Linear", "Confluence"
];

const MovingScript = ({ items, direction = 1, speed = 40 }: { items: string[], direction?: number, speed?: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const scrollX = useTransform(scrollYProgress, [0, 1], direction === 1 ? ["0%", "-10%"] : ["-10%", "0%"]);

  return (
    <div ref={containerRef} className="w-full overflow-hidden whitespace-nowrap py-16 border-y border-outline-variant/20 bg-surface-container-lowest relative flex items-center transition-colors duration-500">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface-container-lowest to-transparent z-10 pointer-events-none transition-colors duration-500"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface-container-lowest to-transparent z-10 pointer-events-none transition-colors duration-500"></div>
      
      <motion.div style={{ x: scrollX }} className="flex">
        <motion.div
          animate={{ x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: speed }}
          className="inline-flex gap-16 items-center px-8"
        >
          {[...items, ...items, ...items, ...items].map((lang, i) => (
            <span key={i} className="text-5xl md:text-7xl font-headline font-bold text-on-surface/30 dark:text-on-surface/10 uppercase tracking-tighter hover:text-primary/60 transition-colors duration-500 cursor-default">
              {lang}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

const SectionFadeIn = ({ children, id }: { children: React.ReactNode, id?: string }) => {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full relative scroll-mt-24"
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  return (
    <>
      <Hero />
      <MovingScript items={languagesList} direction={1} />
      
      <SectionFadeIn id="capabilities"><Capabilities /></SectionFadeIn>
      <MovingScript items={backendList} direction={-1} speed={45} />
      
      <SectionFadeIn id="laboratory"><Laboratory /></SectionFadeIn>
      <MovingScript items={databasesList} direction={1} speed={35} />

      <SectionFadeIn id="lessons"><Lessons /></SectionFadeIn>
      <MovingScript items={devopsList} direction={-1} speed={50} />

      <SectionFadeIn id="journey"><Journey /></SectionFadeIn>
      <MovingScript items={cloudList} direction={1} speed={40} />

      <SectionFadeIn id="stack"><Stack /></SectionFadeIn>
      <MovingScript items={designList} direction={-1} speed={38} />

      <SectionFadeIn id="reviews"><Reviews /></SectionFadeIn>
      <MovingScript items={testingList} direction={1} speed={42} />

      <SectionFadeIn id="manifesto"><Manifesto /></SectionFadeIn>
      <MovingScript items={architectureList} direction={-1} speed={48} />
      
      <SectionFadeIn id="collage"><Collage /></SectionFadeIn>
      <MovingScript items={vcsList} direction={1} speed={35} />

      <SectionFadeIn id="collaborate"><Collaborate /></SectionFadeIn>
      
      <MovingScript items={editorsList} direction={-1} speed={45} />
      <MovingScript items={managementList} direction={1} speed={50} />
    </>
  );
}
