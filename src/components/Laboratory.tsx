import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Code, ExternalLink, Star, Terminal, Loader2, GitFork, Search, Moon, Sun } from 'lucide-react';
import Fuse from 'fuse.js';
import { useTheme } from '../lib/ThemeContext';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
}

function RepoCard({ repo, index }: { repo: Repo; index: number }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt Effect Variables
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Spotlight position
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    
    // 3D Tilt calculation
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5, boxShadow: "0 20px 40px -10px rgba(var(--primary-rgb), 0.15)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative flex flex-col justify-between p-8 rounded-2xl border overflow-hidden h-full transition-colors duration-500 bg-surface-container-low border-outline-variant/20"
    >
      {/* Spotlight Hover Effect */}
      <div 
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--primary-rgb),0.06), transparent 40%)`
        }}
      />
      
      {/* Abstract background element */}
      <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl transition-colors duration-500 pointer-events-none z-0 bg-primary/5 group-hover:bg-primary/10"></div>
      
      <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
        <div className="flex justify-between items-start mb-8">
          <div className="p-3 rounded-xl border shadow-lg transition-colors duration-500 bg-surface border-outline-variant/20 text-primary shadow-black/5">
            <Terminal className="w-6 h-6" />
          </div>
          <div className="flex gap-3">
            {repo.html_url && (
              <a href={repo.html_url} target="_blank" rel="noreferrer" className="p-2 rounded-full transition-all bg-surface-container text-on-surface-variant hover:text-primary hover:bg-surface-container-high">
                <Code className="w-4 h-4" />
              </a>
            )}
            {repo.homepage && (
              <a href={repo.homepage} target="_blank" rel="noreferrer" className="p-2 rounded-full transition-all bg-surface-container text-on-surface-variant hover:text-primary hover:bg-surface-container-high">
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
        
        <h3 className="font-headline text-2xl font-bold mb-3 tracking-tight transition-colors line-clamp-1 group-hover:text-primary text-on-surface">
          {repo.name.replace(/-/g, ' ')}
        </h3>
        
        <p className="text-sm leading-relaxed mb-8 line-clamp-3 font-light transition-colors duration-500 text-on-surface-variant">
          {repo.description || "No description provided for this repository. Exploring the source code is required to understand its architecture."}
        </p>
      </div>

      <div className="relative z-10 mt-auto pt-6 border-t flex flex-wrap items-center justify-between gap-4 transition-colors duration-500 border-outline-variant/20" style={{ transform: "translateZ(10px)" }}>
        <div className="flex items-center gap-4 text-xs font-label tracking-widest uppercase transition-colors duration-500 text-on-surface-variant">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.8)]"></span>
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5" />
            {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1.5">
            <GitFork className="w-3.5 h-3.5" />
            {repo.forks_count}
          </span>
        </div>
        
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex gap-2">
            <span className="px-2 py-1 text-[10px] font-label tracking-widest uppercase rounded border transition-colors duration-500 bg-surface-container border-outline-variant/20 text-on-surface-variant">
              {repo.topics[0]}
            </span>
            {repo.topics.length > 1 && (
              <span className="px-2 py-1 text-[10px] font-label tracking-widest uppercase rounded border transition-colors duration-500 bg-surface-container border-outline-variant/20 text-on-surface-variant">
                +{repo.topics.length - 1}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Laboratory() {
  const { isDark, toggleTheme } = useTheme();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fuse = new Fuse(repos, {
    keys: ['name', 'topics'],
    threshold: 0.4,
    distance: 100,
  });

  const filteredRepos = searchQuery 
    ? fuse.search(searchQuery).map(result => result.item)
    : repos;

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        // Fetching from GitHub API for user 'thealphatasker'
        const res = await fetch(`https://api.github.com/users/thealphatasker/repos?sort=updated&per_page=6&page=${page}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        
        if (data.length < 6) {
          setHasMore(false);
        }
        
        setRepos(prev => page === 1 ? data : [...prev, ...data]);
      } catch (error) {
        console.error("Error fetching repos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [page]);

  return (
    <section className="py-32 transition-colors duration-500 bg-surface-container-lowest" id="laboratory">
      <div className="container max-w-7xl mx-auto px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8"
        >
          <div>
            <span className="font-label text-primary text-xs tracking-[0.4em] uppercase">Live Data Feed</span>
            <h2 className="font-headline text-6xl font-bold tracking-tighter mt-4 transition-colors duration-500 text-on-surface">
              LABO<span className="text-primary">RATORY</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm font-light transition-colors duration-500 text-on-surface-variant">
            Real-time synchronization with GitHub. Exploring the latest architectural experiments and functional deployments.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col sm:flex-row gap-4 max-w-2xl"
        >
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 transition-colors duration-500 text-on-surface-variant" />
            </div>
            <input
              type="text"
              placeholder="Search repositories by name or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-500 bg-surface-container-low border-outline-variant/20 text-on-surface placeholder:text-on-surface-variant"
            />
          </div>
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center p-3 rounded-xl border transition-all duration-500 bg-surface-container-low border-outline-variant/20 text-on-surface hover:bg-surface-container-high"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepos.map((repo, index) => (
            <RepoCard key={repo.id} repo={repo} index={index} />
          ))}
        </div>

        {loading && (
          <div className="flex justify-center mt-16">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        )}

        {!loading && hasMore && (
          <div className="flex justify-center mt-16">
            <button 
              onClick={() => setPage(p => p + 1)}
              className="kinetic-glow text-on-primary px-8 py-4 font-headline font-bold uppercase tracking-widest text-sm rounded-xl hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] transition-all active:scale-[0.98]"
            >
              Load More Projects
            </button>
          </div>
        )}
        
        {!loading && !hasMore && repos.length > 0 && (
          <div className="flex justify-center mt-16">
            <span className="font-label text-on-surface-variant text-xs tracking-[0.3em] uppercase">
              End of repository feed
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
