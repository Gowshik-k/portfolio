import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, ArrowUpRight, Loader2 } from 'lucide-react';
const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:border-brand-300 shadow-sm hover:shadow-2xl transition-all duration-700"
    >
      <div className="aspect-[16/11] overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors duration-700" />
      </div>
      
      <div className="p-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-brand-600 text-[10px] font-bold uppercase tracking-[0.3em] mb-3 block">{project.category}</span>
            <h3 className="text-3xl font-serif text-slate-900 group-hover:text-brand-600 transition-colors duration-500">{project.title}</h3>
          </div>
          <motion.div 
            whileHover={{ rotate: 45, scale: 1.1 }}
            className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-brand-500 group-hover:text-brand-600 transition-all duration-500"
          >
            <ArrowUpRight size={24} />
          </motion.div>
        </div>
        
        <p className="text-slate-500 text-base leading-relaxed mb-10 line-clamp-2 font-light italic">
          {project.description}
        </p>
        
        <div className="flex items-center gap-6">
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
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const fallbackProjects = [
    {
      title: "Abstract Identity",
      category: "Branding",
      description: "A comprehensive brand system for a futuristic fintech startup focused on decentralization.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
      links: [{ type: 'demo', label: 'Live Site', href: '#' }]
    },
    {
      title: "Aura Home App",
      category: "UI/UX Design",
      description: "Smart home management interface designed for clarity and aesthetic minimalis in every interaction.",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
      links: [{ type: 'github', label: 'Source', href: '#' }]
    }
  ];

  const displayProjects = projects.length > 0 ? projects : (loading ? [] : fallbackProjects);

  return (
    <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-40 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-brand-100 blur-[150px] rounded-full" />
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-sky-100 blur-[120px] rounded-full" />
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-12">
        <div className="max-w-2xl">
          <span className="text-brand-600 font-sans font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Selected Works</span>
          <h2 className="text-6xl md:text-8xl font-serif font-bold text-slate-900 leading-[0.9] italic">
            Where design <br /><span className="text-gradient">meets purpose.</span>
          </h2>
        </div>
        <p className="text-slate-400 text-[10px] max-w-[200px] uppercase tracking-[0.3em] leading-relaxed border-l border-slate-200 pl-8">
          A collection of creative solutions across branding and digital products.
        </p>
      </div>

      {loading && projects.length === 0 ? (
        <div className="flex items-center justify-center py-40">
          <Loader2 className="animate-spin text-brand-500" size={48} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {displayProjects.map((project, index) => (
            <ProjectCard key={project.id || index} project={project} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
