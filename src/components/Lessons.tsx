import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useAnimation } from 'motion/react';
import { Terminal, Play, CheckCircle2 } from 'lucide-react';

const lessons = [
  {
    id: '01',
    title: 'The React useState Hook',
    description: 'Learn how to manage local state in functional components.',
    code: `const [count, setCount] = useState(0);\n\nreturn (\n  <button \n    onClick={() => setCount(count + 1)}\n    className="bg-primary text-on-primary px-6 py-3 rounded-full font-bold"\n  >\n    Clicks: {count}\n  </button>\n);`,
    output: 'Interactive Counter'
  },
  {
    id: '02',
    title: 'Framer Motion Basics',
    description: 'Animate elements effortlessly with declarative props.',
    code: `<motion.div\n  initial={{ opacity: 0, y: 20 }}\n  animate={{ opacity: 1, y: 0 }}\n  whileHover={{ scale: 1.1, rotate: 5 }}\n  className="w-24 h-24 bg-primary/20 border border-primary rounded-xl flex items-center justify-center text-primary font-bold"\n>\n  Hover me!\n</motion.div>`,
    output: 'Animated Box'
  },
  {
    id: '03',
    title: 'Tailwind CSS Gradients',
    description: 'Create stunning text gradients using utility classes.',
    code: `<h1 className="text-4xl font-black bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent">\n  Gradient Text\n</h1>`,
    output: 'Gradient Text'
  },
  {
    id: '04',
    title: 'Magnetic Physics',
    description: 'Use motion values to create a magnetic pull effect.',
    code: `const x = useMotionValue(0);\nconst y = useMotionValue(0);\n\nconst handleMouseMove = (e) => {\n  const rect = ref.current.getBoundingClientRect();\n  x.set(e.clientX - rect.left - rect.width / 2);\n  y.set(e.clientY - rect.top - rect.height / 2);\n};\n\n<motion.button style={{ x, y }}>Magnetic</motion.button>`,
    output: 'Magnetic Button'
  },
  {
    id: '05',
    title: '3D Card Tilt',
    description: 'Calculate mouse position to rotate elements in 3D space.',
    code: `const rotateX = useTransform(y, [-100, 100], [15, -15]);\nconst rotateY = useTransform(x, [-100, 100], [-15, 15]);\n\n<motion.div style={{ rotateX, rotateY, perspective: 1000 }}>\n  <Card />\n</motion.div>`,
    output: '3D Card'
  },
  {
    id: '06',
    title: 'SVG Path Drawing',
    description: 'Animate SVG paths using pathLength and Framer Motion.',
    code: `<motion.path\n  d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"\n  initial={{ pathLength: 0 }}\n  animate={{ pathLength: 1 }}\n  transition={{ duration: 2 }}\n/>`,
    output: 'SVG Path'
  },
  {
    id: '07',
    title: 'Text Reveal Scramble',
    description: 'Create a hacker-style text decoding effect.',
    code: `const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";\nlet iterations = 0;\nconst interval = setInterval(() => {\n  setText(t => t.split("").map((l, i) => {\n    if(i < iterations) return original[i];\n    return letters[Math.floor(Math.random() * 26)];\n  }).join(""));\n  iterations += 1 / 3;\n}, 30);`,
    output: 'Text Reveal'
  },
  {
    id: '08',
    title: 'Custom Cursor Follower',
    description: 'Track mouse coordinates to move a custom DOM element.',
    code: `useEffect(() => {\n  const moveCursor = (e) => {\n    cursorX.set(e.clientX - 16);\n    cursorY.set(e.clientY - 16);\n  };\n  window.addEventListener('mousemove', moveCursor);\n}, []);`,
    output: 'Custom Cursor'
  },
  {
    id: '09',
    title: 'Parallax Scroll Depth',
    description: 'Link scroll progress to vertical translation for depth.',
    code: `const { scrollYProgress } = useScroll();\nconst y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);\nconst y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);\n\n<motion.div style={{ y: y1 }}>Foreground</motion.div>\n<motion.div style={{ y: y2 }}>Background</motion.div>`,
    output: 'Parallax'
  },
  {
    id: '10',
    title: 'Staggered List Animation',
    description: 'Animate children with a staggered delay using variants.',
    code: `const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };\nconst item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };\n\n<motion.ul variants={container} initial="hidden" animate="show">\n  <motion.li variants={item}>Item 1</motion.li>\n</motion.ul>`,
    output: 'Staggered List'
  }
];

export default function Lessons() {
  const [activeLesson, setActiveLesson] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [outputVisible, setOutputVisible] = useState(false);
  const [count, setCount] = useState(0); // For lesson 1

  // Lesson 4: Magnetic Button
  const magRef = useRef<HTMLButtonElement>(null);
  const magX = useMotionValue(0);
  const magY = useMotionValue(0);
  const magSpringX = useSpring(magX, { stiffness: 150, damping: 15, mass: 0.1 });
  const magSpringY = useSpring(magY, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMagMove = (e: React.MouseEvent) => {
    if (!magRef.current) return;
    const rect = magRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    magX.set(x * 0.5);
    magY.set(y * 0.5);
  };
  const handleMagLeave = () => {
    magX.set(0);
    magY.set(0);
  };

  // Lesson 5: 3D Card
  const cardRef = useRef<HTMLDivElement>(null);
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const cardRotateX = useTransform(cardY, [-100, 100], [20, -20]);
  const cardRotateY = useTransform(cardX, [-100, 100], [-20, 20]);

  const handleCardMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardX.set(e.clientX - (rect.left + rect.width / 2));
    cardY.set(e.clientY - (rect.top + rect.height / 2));
  };
  const handleCardLeave = () => {
    cardX.set(0);
    cardY.set(0);
  };

  // Lesson 7: Text Scramble
  const [scrambleText, setScrambleText] = useState("DECRYPTING...");
  const originalText = "SYSTEM BREACHED";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
  
  const startScramble = () => {
    let iterations = 0;
    const interval = setInterval(() => {
      setScrambleText(originalText.split("").map((l, i) => {
        if(i < iterations) return originalText[i];
        return letters[Math.floor(Math.random() * letters.length)];
      }).join(""));
      if(iterations >= originalText.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    if (activeLesson === 6 && outputVisible) {
      startScramble();
    }
  }, [activeLesson, outputVisible]);

  const handleRun = () => {
    setIsRunning(true);
    setOutputVisible(false);
    setTimeout(() => {
      setIsRunning(false);
      setOutputVisible(true);
    }, 800);
  };

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="lessons" ref={ref} className="py-32 bg-surface-container-lowest relative overflow-hidden transition-colors duration-500">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      <div className="container max-w-7xl mx-auto px-8 relative z-10">
        <motion.div style={{ y }} className="mb-16">
          <span className="font-label text-primary text-xs tracking-[0.4em] uppercase mb-4 block">Interactive Playground</span>
          <h2 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            CODING <span className="text-primary">LESSONS</span>
          </h2>
          <p className="text-on-surface-variant text-lg max-w-2xl font-light">
            Dive into the code. Select a lesson, review the syntax, and execute the protocol to see it in action.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Lesson List */}
          <div className="lg:col-span-5 space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {lessons.map((lesson, idx) => (
                <button
                key={lesson.id}
                onClick={() => { setActiveLesson(idx); setOutputVisible(false); setCount(0); }}
                className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 ${activeLesson === idx ? 'bg-surface-container-high border-primary shadow-[0_0_30px_rgba(var(--primary-rgb),0.1)]' : 'bg-transparent border-outline-variant/20 hover:border-outline-variant/40'}`}
              >
                <div className="flex items-center gap-4 mb-2">
                  <span className={`font-mono text-sm ${activeLesson === idx ? 'text-primary' : 'text-on-surface-variant'}`}>{lesson.id}</span>
                  <h3 className="font-headline font-bold text-xl">{lesson.title}</h3>
                </div>
                <p className="text-on-surface-variant text-sm font-light leading-relaxed">{lesson.description}</p>
              </button>
            ))}
          </div>

          {/* Code Editor & Output */}
          <div className="lg:col-span-7 bg-surface rounded-2xl border border-outline-variant/20 overflow-hidden flex flex-col shadow-2xl h-[600px] transition-colors duration-500">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/20 bg-surface-container-low transition-colors duration-500">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-on-surface-variant" />
                <span className="font-mono text-sm text-on-surface-variant">editor.tsx</span>
              </div>
              <button 
                onClick={handleRun}
                className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-1.5 rounded-md font-mono text-sm transition-colors"
              >
                {isRunning ? <span className="animate-pulse">Compiling...</span> : <><Play className="w-3 h-3" /> Run Code</>}
              </button>
            </div>
            
            {/* Code Area */}
            <div className="p-6 font-mono text-sm text-on-surface-variant whitespace-pre-wrap overflow-y-auto flex-1 leading-relaxed custom-scrollbar transition-colors duration-500">
              {lessons[activeLesson].code}
            </div>

            {/* Output Area */}
            <div className="border-t border-outline-variant/20 bg-surface-container-low p-8 h-[250px] flex items-center justify-center relative overflow-hidden transition-colors duration-500">
              {!outputVisible && !isRunning && (
                <span className="text-on-surface-variant/50 font-mono text-sm border border-dashed border-outline-variant/30 px-6 py-3 rounded-lg transition-colors duration-500">
                  Click 'Run Code' to execute
                </span>
              )}
              {isRunning && (
                <div className="flex items-center gap-3 text-primary font-mono text-sm">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  Executing...
                </div>
              )}
              {outputVisible && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {/* Simulated Outputs */}
                  {activeLesson === 0 && (
                    <button 
                      onClick={() => setCount(c => c + 1)}
                      className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold hover:scale-105 active:scale-95 transition-transform shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)]"
                    >
                      Clicks: {count}
                    </button>
                  )}
                  {activeLesson === 1 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-32 h-32 bg-primary/20 border border-primary rounded-2xl flex items-center justify-center text-primary font-bold cursor-pointer shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)]"
                    >
                      Hover me!
                    </motion.div>
                  )}
                  {activeLesson === 2 && (
                    <h1 className="text-5xl font-black bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent">
                      Gradient Text
                    </h1>
                  )}
                  {activeLesson === 3 && (
                    <motion.button
                      ref={magRef}
                      onMouseMove={handleMagMove}
                      onMouseLeave={handleMagLeave}
                      style={{ x: magSpringX, y: magSpringY }}
                      className="bg-surface-container-high border border-outline-variant/30 text-on-surface px-8 py-4 rounded-full font-bold shadow-lg transition-colors duration-500"
                    >
                      Magnetic Pull
                    </motion.button>
                  )}
                  {activeLesson === 4 && (
                    <motion.div
                      ref={cardRef}
                      onMouseMove={handleCardMove}
                      onMouseLeave={handleCardLeave}
                      style={{ rotateX: cardRotateX, rotateY: cardRotateY, perspective: 1000 }}
                      className="w-48 h-64 bg-gradient-to-br from-primary/20 to-purple-500/20 border border-outline-variant/30 rounded-2xl flex items-center justify-center shadow-2xl transition-colors duration-500"
                    >
                      <span className="text-on-surface font-bold tracking-widest uppercase transition-colors duration-500">Tilt Me</span>
                    </motion.div>
                  )}
                  {activeLesson === 5 && (
                    <svg width="200" height="200" viewBox="0 0 200 200">
                      <motion.path
                        d="M 20 100 Q 50 20 100 100 T 180 100"
                        fill="transparent"
                        stroke="#00fd87"
                        strokeWidth="4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                      />
                    </svg>
                  )}
                  {activeLesson === 6 && (
                    <h1 className="text-4xl font-mono font-bold text-primary tracking-widest cursor-pointer" onClick={startScramble}>
                      {scrambleText}
                    </h1>
                  )}
                  {activeLesson === 7 && (
                    <div className="relative w-full h-full border border-dashed border-outline-variant/30 rounded-xl overflow-hidden cursor-none group flex items-center justify-center transition-colors duration-500">
                      <span className="text-on-surface-variant font-mono text-sm">Move mouse here</span>
                      <motion.div
                        className="absolute w-8 h-8 rounded-full border-2 border-primary pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                        animate={{
                          x: magX.get() * 2,
                          y: magY.get() * 2,
                        }}
                        transition={{ type: "spring", stiffness: 150, damping: 15 }}
                      />
                    </div>
                  )}
                  {activeLesson === 8 && (
                    <div className="w-full h-full overflow-y-auto relative bg-surface-container rounded-xl custom-scrollbar border border-outline-variant/20 transition-colors duration-500">
                      <div className="h-[400px] relative p-8">
                        <motion.div 
                          className="absolute w-24 h-24 bg-primary/20 border border-primary rounded-xl top-20 left-10"
                          initial={{ y: 0 }}
                          whileInView={{ y: -50 }}
                          viewport={{ root: cardRef }}
                        />
                        <motion.div 
                          className="absolute w-32 h-32 bg-purple-500/20 border border-purple-500 rounded-xl top-40 right-10"
                          initial={{ y: 0 }}
                          whileInView={{ y: -100 }}
                          viewport={{ root: cardRef }}
                        />
                        <div className="mt-[200px] text-center text-on-surface-variant font-mono text-sm">Scroll down inside</div>
                      </div>
                    </div>
                  )}
                  {activeLesson === 9 && (
                    <motion.ul 
                      variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1, transition: { staggerChildren: 0.15 } }
                      }}
                      initial="hidden"
                      animate="show"
                      className="flex flex-col gap-3 w-full max-w-xs"
                    >
                      {[1, 2, 3, 4].map((i) => (
                        <motion.li 
                          key={i}
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            show: { opacity: 1, x: 0 }
                          }}
                          className="w-full bg-surface-container-high border border-outline-variant/20 p-4 rounded-lg text-on-surface font-mono text-sm transition-colors duration-500"
                        >
                          List Item {i}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
