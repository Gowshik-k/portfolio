import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, ArrowUpRight, Loader2, LayoutGrid } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:border-brand-300 shadow-sm hover:shadow-2xl transition-all duration-700 h-full"
    >
      <a 
        href={project.links?.find(l => l.type === 'demo')?.href || '#'} 
        target="_blank" 
        rel="noreferrer" 
        className="aspect-[16/11] overflow-hidden block"
      >
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors duration-700" />
      </a>
      
      <div className="p-10 flex flex-col h-[calc(100%-aspect-[16/11])]">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <span className="text-brand-600 text-[10px] font-bold uppercase tracking-[0.3em] mb-3 block">{project.category}</span>
            <h3 className="text-3xl font-serif text-slate-900 group-hover:text-brand-600 transition-colors duration-500 line-clamp-1">{project.title}</h3>
          </div>
          <a 
            href={project.links?.find(l => l.type === 'demo')?.href || '#'} 
            target="_blank" 
            rel="noreferrer"
          >
            <motion.div 
              whileHover={{ rotate: 45, scale: 1.1 }}
              className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-brand-500 group-hover:text-brand-600 transition-all duration-500 shrink-0 ml-4"
            >
              <ArrowUpRight size={24} />
            </motion.div>
          </a>
        </div>
        
        <p className="text-slate-500 text-base leading-relaxed mb-10 line-clamp-2 font-light italic flex-grow">
          {project.description}
        </p>
        
        <div className="flex items-center gap-6 mt-auto">
          {project.links?.map((link, i) => (
            <a 
              key={i} 
              href={link.href} 
              target="_blank"
              rel="noreferrer"
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-brand-600 flex items-center gap-2 transition-colors duration-300"
            >
              {link.type === 'github' ? <Github size={14} /> : <ExternalLink size={14} />}
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
        const res = await fetch(`${baseUrl}/api/projects`);
        const data = await res.json();
        setProjects(data);
        
        // Extract unique categories
        const uniqueCats = ['All', ...new Set(data.map(p => p.category))];
        setCategories(uniqueCats);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-40 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-brand-100 blur-[150px] rounded-full" />
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-sky-100 blur-[120px] rounded-full" />
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-12">
        <div className="max-w-2xl">
          <span className="text-brand-600 font-sans font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Selected Works</span>
          <h2 className="text-6xl md:text-8xl font-serif font-bold text-slate-900 leading-[0.9] italic">
            Where design <br /><span className="text-gradient">meets purpose.</span>
          </h2>
        </div>
        <div className="flex flex-col gap-6 items-start md:items-end">
           <p className="text-slate-400 text-[10px] max-w-[200px] uppercase tracking-[0.3em] leading-relaxed md:text-right border-l md:border-l-0 md:border-r border-slate-200 pl-8 md:pl-0 md:pr-8">
            A collection of creative solutions across branding and digital products.
          </p>
          <div className="flex items-center gap-2 text-brand-600 font-bold text-[10px] uppercase tracking-widest bg-brand-50 px-4 py-2 rounded-full border border-brand-100">
            <LayoutGrid size={12} />
            {filteredProjects.length} Projects
          </div>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="flex flex-wrap gap-3 mb-16 border-b border-slate-100 pb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${
              activeCategory === cat 
              ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
              : 'bg-white text-slate-500 border-slate-100 hover:border-brand-200 hover:text-brand-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <Loader2 className="animate-spin text-brand-500" size={48} />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Loading Archive...</span>
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 min-h-[400px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {!loading && filteredProjects.length === 0 && (
        <div className="py-40 text-center">
          <h3 className="text-2xl font-serif text-slate-300 italic">No projects found in this category.</h3>
        </div>
      )}
    </div>
  );
};

export default Projects;
