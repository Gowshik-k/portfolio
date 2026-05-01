import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, ArrowRight, LayoutGrid, User, BookOpen } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

import Projects from './components/Projects.jsx';
import Admin from './components/Admin.jsx';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Components
const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Works', path: '/projects' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link 
            to="/admin" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-2xl font-serif font-bold tracking-tighter text-slate-900 hover:text-brand-500 transition-colors"
          >
            Gowshik's
          </Link>
          <Link 
            to="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-brand-500 font-sans text-sm tracking-widest uppercase hover:text-brand-600 transition-colors"
          >
            Portfolio
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={cn(
                "text-sm font-medium uppercase tracking-widest transition-colors hover:text-brand-500",
                location.pathname === link.path ? "text-brand-600 font-bold" : "text-slate-500"
              )}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="mailto:hello@designer.com"
            className="px-6 py-2.5 bg-gradient-to-r from-brand-500 to-sky-600 hover:from-brand-600 hover:to-sky-700 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all shadow-[0_4px_20px_rgba(14,165,233,0.15)] hover:shadow-[0_4px_30px_rgba(14,165,233,0.25)] hover:scale-105 active:scale-95"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute top-24 left-6 right-6 bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-8 z-[60] md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => {
                    setIsOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={cn(
                    "text-2xl font-serif font-bold transition-all flex items-center justify-between group",
                    location.pathname === link.path ? "text-brand-600" : "text-slate-900"
                  )}
                >
                  {link.name}
                  <ArrowRight size={20} className={cn(
                    "transition-transform",
                    location.pathname === link.path ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                  )} />
                </Link>
              ))}
              
              <div className="pt-8 mt-4 border-t border-slate-50 flex justify-between items-center">
                <div className="flex gap-6">
                  <a href="#" className="text-slate-400 hover:text-brand-500"><Github size={18} /></a>
                  <a href="#" className="text-slate-400 hover:text-brand-500"><Linkedin size={18} /></a>
                </div>
                <a href="mailto:hello@designer.com" className="text-[10px] font-bold uppercase tracking-widest text-brand-600">Contact Me</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-slate-50 border-t border-slate-100 py-20 px-6 mt-20">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
      <div>
        <h3 className="text-4xl font-serif font-bold text-slate-900 mb-4 italic text-gradient">Let's create something<br />legendary.</h3>
        <p className="text-slate-500 max-w-md">Currently looking for new projects and collaborations. Feel free to reach out for business inquiries or just to say hi.</p>
      </div>
      <div className="flex flex-col gap-4">
        <a href="mailto:hello@designer.com" className="group flex items-center gap-4 text-2xl font-serif text-slate-900 hover:text-brand-600 transition-colors">
          hello@designer.com
          <ArrowRight className="text-brand-500 group-hover:translate-x-2 transition-transform" />
        </a>
        <div className="flex gap-6 mt-4">
          <Github className="text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
          <Linkedin className="text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
          <Mail className="text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-slate-100 flex justify-between items-center text-[10px] uppercase tracking-widest text-slate-400 font-bold">
      <span>© 2026 DESIGN PORTFOLIO. ALL RIGHTS RESERVED.</span>
      <span>BUILT WITH MERN STACK & MOTION</span>
    </div>
  </footer>
);

const Home = () => {
  const [projects, setProjects] = React.useState([]);
  const [settings, setSettings] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, setRes] = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/settings")
        ]);
        const projData = await projRes.json();
        const setData = await setRes.json();
        
        setProjects(projData.slice(0, 3));
        setSettings(setData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  return (
    <div className="pt-12">
      {/* Hybrid Hero: Mobile Optimized */}
      <section className="pt-16 pb-24 md:pt-20 md:pb-32 flex items-center px-6 max-w-7xl mx-auto relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            <span className="text-brand-600 font-sans font-bold uppercase tracking-[0.4em] text-[8px] md:text-[10px] mb-6 block">Visual Designer & Developer</span>
            <h1 className="text-4xl md:text-6xl xl:text-7xl font-serif font-bold tracking-tight text-slate-900 mb-8 leading-[1.1] lg:leading-[0.9]">
              Turning <br className="hidden md:block" />
              <span className="italic text-gradient">logic</span> into <br className="hidden md:block" />
              visual <span className="text-brand-500">poetry.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-md mx-auto lg:mx-0 leading-relaxed mb-10">
              I build high-end digital experiences where technical precision meets aesthetic excellence. Let's make your vision legendary.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-5 items-center">
              <Link to="/projects" className="group px-6 py-3 md:px-8 md:py-4 bg-slate-900 text-white rounded-full font-bold uppercase tracking-widest text-[9px] md:text-[10px] flex items-center gap-3 hover:bg-brand-600 transition-all shadow-xl shadow-brand-500/10">
                Explore Works
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="mailto:hello@designer.com" className="px-6 py-3 md:px-8 md:py-4 border border-slate-200 text-slate-900 rounded-full font-bold uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-slate-50 transition-colors">
                Get in Touch
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-4 lg:col-start-9 hidden lg:block"
          >
            <div className="relative aspect-[3/4] max-w-sm ml-auto rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img 
                src={settings?.heroImageUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200"} 
                alt="Design Abstract" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-500/10 to-transparent" />
            </div>
          </motion.div>
        </div>
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-brand-100/30 blur-[120px] -z-10 rounded-full" />
      </section>

      {/* Featured Work: Dynamic 1 Large + 2 Grid items */}
      <section className="py-16 md:py-20 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-2 italic">Recent <span className="text-brand-500">Craft.</span></h2>
              <p className="text-slate-500 uppercase tracking-[0.3em] text-[9px] md:text-[10px] font-bold">Selected works from the archive</p>
            </div>
            <Link to="/projects" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-[10px] font-bold uppercase tracking-widest text-brand-600 md:text-slate-400 hover:text-brand-500 transition-colors border-b border-slate-200 pb-1">View Portfolio</Link>
          </div>

          {loading ? (
            <div className="h-64 md:h-96 flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest text-xs">
              Loading recent works...
            </div>
          ) : projects.length > 0 ? (
            <>
              {/* Large Featured (First Project) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative mb-8 md:mb-12"
              >
                <div className="aspect-video md:aspect-[21/9] overflow-hidden rounded-[1.5rem] md:rounded-[2rem] shadow-lg border border-slate-200 bg-slate-100">
                  <img 
                    src={`${projects[0].image}?auto=format&fit=crop&q=80&w=2000`}
                    alt={projects[0].title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 md:from-slate-900/40 via-transparent to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all md:translate-y-4 group-hover:translate-y-0">
                    <span className="text-white/80 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] block mb-1">{projects[0].category}</span>
                    <h3 className="text-2xl md:text-3xl font-serif text-white italic">{projects[0].title}.</h3>
                  </div>
                </div>
              </motion.div>

              {/* Two Column Grid (Next Two Projects) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {projects.slice(1, 3).map((project) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group relative aspect-[4/3] bg-white overflow-hidden rounded-[1.2rem] md:rounded-[1.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500"
                  >
                    <img
                      src={`${project.image}?auto=format&fit=crop&q=80&w=1200`}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/95 md:from-white/90 via-transparent to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-5 left-5 md:bottom-6 md:left-6 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all md:translate-y-2 group-hover:translate-y-0">
                      <span className="text-brand-600 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] block mb-1">{project.category}</span>
                      <h3 className="text-lg md:text-xl font-serif text-slate-900 italic">{project.title}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-64 md:h-96 flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest text-xs">
              No recent projects found.
            </div>
          )}
        </div>
      </section>

      {/* Refined Bento Philosophy: Mobile Optimized */}
      <section className="py-20 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          <div className="md:col-span-8 p-8 md:p-10 bg-slate-900 rounded-[1.5rem] md:rounded-[2.5rem] text-white flex flex-col justify-between group overflow-hidden relative min-h-[300px] md:min-h-[350px]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 blur-[80px]" />
            <div className="relative z-10">
              <h4 className="text-2xl md:text-4xl font-serif font-bold italic mb-4 md:mb-6">Philosophy.</h4>
              <p className="text-xl md:text-2xl text-slate-400 max-w-xl leading-relaxed">
                "Design is the silent ambassador of your brand. I build interfaces that speak fluently."
              </p>
            </div>
            <div className="flex justify-between items-end relative z-10">
              <div className="text-5xl md:text-7xl font-serif font-bold italic text-brand-500/20">01</div>
              <Link 
                to="/about" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-500 hover:border-brand-500 transition-all duration-500"
              >
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
          
          <div className="md:col-span-4 p-8 md:p-10 bg-brand-50 rounded-[1.5rem] md:rounded-[2.5rem] border border-brand-100 flex flex-col justify-between min-h-[250px] md:min-h-[350px]">
            <h4 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 italic">Strategy.</h4>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed italic">
              I merge creative intuition with data-driven strategy to deliver results that matter.
            </p>
            <div className="text-4xl md:text-5xl font-serif font-bold italic text-slate-200">02</div>
          </div>

          <div className="md:col-span-4 p-8 md:p-10 bg-slate-50 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 flex flex-col justify-between min-h-[250px] md:min-h-[300px]">
            <h4 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 italic">Craft.</h4>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed italic">
              Pixel-perfection is the standard, not the goal. Every detail is meticulously crafted.
            </p>
            <div className="text-4xl md:text-5xl font-serif font-bold italic text-slate-200">03</div>
          </div>

          <div className="md:col-span-8 p-8 md:p-10 bg-gradient-to-br from-brand-500 to-sky-600 rounded-[1.5rem] md:rounded-[2.5rem] text-white flex flex-col justify-between min-h-[300px] shadow-xl shadow-brand-500/20">
            <h4 className="text-3xl md:text-4xl font-serif font-bold italic">Execution.</h4>
            <div className="flex gap-8 md:gap-16">
              <div>
                <div className="text-5xl md:text-7xl font-bold font-serif italic mb-1">99%</div>
                <div className="text-[10px] uppercase tracking-widest text-white/70">Efficiency</div>
              </div>
              <div>
                <div className="text-5xl md:text-7xl font-bold font-serif italic mb-1">20+</div>
                <div className="text-[10px] uppercase tracking-widest text-white/70">Partners</div>
              </div>
            </div>
            <p className="text-sm md:text-base text-white/80 max-w-md italic">
              Leveraging modern stacks and fluid motion design to create high-performance products.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
const About = () => (
  <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
    <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-20 italic">Curiosity-driven <span className="text-brand-500">design.</span></h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
      <div className="space-y-8 text-slate-600 text-lg leading-relaxed">
        <p>I am a designer with over 5 years of experience in creating digital products that are both beautiful and functional. My background in computer science allows me to bridge the gap between design and development effortlessly.</p>
        <p>I believe that the best designs are not just seen, but felt. Every pixel should serve a purpose, and every interaction should feel natural.</p>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h4 className="text-slate-900 text-[10px] font-bold uppercase tracking-[0.3em] mb-6 text-brand-600">Core Skills</h4>
          <ul className="space-y-3 text-sm text-slate-500">
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand-500 rounded-full" /> UI/UX Design</li>
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand-500 rounded-full" /> Brand Identity</li>
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand-500 rounded-full" /> React Development</li>
            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-brand-500 rounded-full" /> Motion Graphics</li>
          </ul>
        </div>
        <div>
          <h4 className="text-slate-900 text-[10px] font-bold uppercase tracking-[0.3em] mb-6 text-brand-600">Experience</h4>
          <ul className="space-y-3 text-sm text-slate-500">
            <li>Senior Designer @ Air</li>
            <li>Lead Designer @ Flow</li>
            <li>Freelance @ Various</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
        <AdminButton />
      </div>
    </Router>
  );
}

// Sneaky Admin Button for development/quick access
const AdminButton = () => (
  <Link 
    to="/admin" 
    className="fixed bottom-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full flex items-center justify-center text-white/20 hover:text-white/40 transition-all z-[100] backdrop-blur-sm"
    title="Admin Login"
  >
    <User size={16} />
  </Link>
);
