import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Edit3, Save, X, LogIn, LogOut, Loader2, Image as ImageIcon, Settings as SettingsIcon, LayoutGrid } from 'lucide-react';

const Admin = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [settings, setSettings] = useState({ heroImageUrl: '', siteTitle: '' });
  const [authLoading, setAuthLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' or 'settings'
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [settingsLoading, setSettingsLoading] = useState(false);
  
  // Project Form State
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    image: '',
    links: [
      { type: 'demo', label: 'Live Site', href: '' },
      { type: 'github', label: 'GitHub', href: '' }
    ]
  });

  const fetchProjects = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
      const res = await fetch(`${baseUrl}/api/projects`);
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchSettings = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
      const res = await fetch(`${baseUrl}/api/settings`);
      const data = await res.json();
      setSettings(data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token && email) {
      setUser({ email, token });
    }
    setAuthLoading(false);
    fetchProjects();
    fetchSettings();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
      const res = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.email);
        setUser(data);
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setUser(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
      const url = editingId ? `${baseUrl}/api/projects/${editingId}` : `${baseUrl}/api/projects`;
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        fetchProjects();
        setEditingId(null);
        setIsAdding(false);
        setFormData({
          title: '',
          category: '',
          description: '',
          image: '',
          links: [
            { type: 'demo', label: 'Live Site', href: '' },
            { type: 'github', label: 'GitHub', href: '' }
          ]
        });
      } else {
        alert("Error saving project");
      }
    } catch (error) {
      alert("Error saving project: " + error.message);
    }
  };

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    setSettingsLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
      const res = await fetch(`${baseUrl}/api/settings`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        alert("Settings updated successfully!");
      } else {
        alert("Error updating settings");
      }
    } catch (error) {
      console.error("Settings update error:", error);
    } finally {
      setSettingsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure?")) {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
      const res = await fetch(`${baseUrl}/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      if (res.ok) fetchProjects();
    }
  };

  const startEdit = (project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      image: project.image,
      links: project.links?.length > 0 ? project.links : [
        { type: 'demo', label: 'Live Site', href: '' },
        { type: 'github', label: 'GitHub', href: '' }
      ]
    });
    setIsAdding(true);
  };

  if (authLoading) return <div className="pt-40 flex justify-center"><Loader2 className="animate-spin text-brand-500" size={40} /></div>;

  if (!user) {
    return (
      <div className="pt-40 px-6 max-w-lg mx-auto flex flex-col items-center justify-center min-h-[60vh] relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-100 blur-[100px] -z-10 rounded-full" />
        <h1 className="text-4xl font-serif text-slate-900 mb-8 italic">Restricted Access</h1>
        <form onSubmit={handleLogin} className="w-full space-y-4 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl">
          <input 
            type="email" 
            placeholder="Email" 
            value={loginData.email}
            onChange={(e) => setLoginData({...loginData, email: e.target.value})}
            className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-slate-900 outline-none focus:border-brand-500 transition-colors"
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={loginData.password}
            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
            className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-slate-900 outline-none focus:border-brand-500 transition-colors"
            required
          />
          <button type="submit" className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-500 to-sky-600 text-white rounded-full font-bold uppercase tracking-widest hover:shadow-lg transition-all">
            <LogIn size={18} /> Sign In
          </button>
        </form>
      </div>
    );
  }

  const isAdmin = user.email === 'gowsikk8@gmail.com';
  if (!isAdmin) {
    return (
      <div className="pt-40 px-6 max-w-7xl mx-auto text-center">
        <h1 className="text-3xl font-serif text-slate-900">Unauthorized</h1>
        <p className="mt-4 text-slate-500">You do not have permission to manage this portfolio.</p>
        <button onClick={handleLogout} className="mt-8 text-brand-600 underline uppercase tracking-widest text-xs font-bold">Logout</button>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto lg:px-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-slate-900 italic">Admin Dashboard</h1>
          <p className="text-slate-500 text-sm mt-2">Manage your digital presence.</p>
        </div>
        <div className="flex items-center gap-4 bg-slate-50 p-1.5 rounded-full border border-slate-100">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all ${activeTab === 'projects' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <LayoutGrid size={14} /> Projects
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all ${activeTab === 'settings' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <SettingsIcon size={14} /> Site Settings
          </button>
          <div className="w-px h-4 bg-slate-200 mx-2" />
          <button onClick={handleLogout} className="p-2.5 text-slate-400 hover:text-red-500 transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {activeTab === 'projects' ? (
        <>
          <div className="flex justify-end mb-8">
            <button 
              onClick={() => { setIsAdding(!isAdding); setEditingId(null); }}
              className="flex items-center gap-2 bg-gradient-to-r from-brand-500 to-sky-600 text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:shadow-lg transition-all"
            >
              {isAdding ? <X size={16} /> : <Plus size={16} />}
              {isAdding ? 'Cancel' : 'Add Project'}
            </button>
          </div>

          <AnimatePresence>
            {isAdding && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-12">
                <form onSubmit={handleSubmit} className="bg-slate-50 border border-slate-100 p-8 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-8 shadow-sm">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-brand-600 font-bold mb-2">Project Title</label>
                      <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-white border border-slate-100 rounded-lg p-4 text-slate-900 focus:border-brand-500 outline-none transition-colors" placeholder="e.g. Abstract Systems" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-brand-600 font-bold mb-2">Category</label>
                      <input required type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-white border border-slate-100 rounded-lg p-4 text-slate-900 focus:border-brand-500 outline-none transition-colors" placeholder="e.g. Branding & Design" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-brand-600 font-bold mb-2">Cover Image URL</label>
                      <input required type="url" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full bg-white border border-slate-100 rounded-lg p-4 text-slate-900 focus:border-brand-500 outline-none transition-colors" placeholder="https://unsplash.com/..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-brand-600 font-bold mb-2">Live Site URL</label>
                        <input 
                          type="url" 
                          value={formData.links.find(l => l.type === 'demo')?.href || ''} 
                          onChange={(e) => {
                            const newLinks = [...formData.links];
                            const demoIdx = newLinks.findIndex(l => l.type === 'demo');
                            if (demoIdx > -1) newLinks[demoIdx].href = e.target.value;
                            setFormData({...formData, links: newLinks});
                          }}
                          className="w-full bg-white border border-slate-100 rounded-lg p-3 text-slate-900 focus:border-brand-500 outline-none transition-colors text-[10px]" 
                          placeholder="https://..." 
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-brand-600 font-bold mb-2">GitHub URL</label>
                        <input 
                          type="url" 
                          value={formData.links.find(l => l.type === 'github')?.href || ''} 
                          onChange={(e) => {
                            const newLinks = [...formData.links];
                            const gitIdx = newLinks.findIndex(l => l.type === 'github');
                            if (gitIdx > -1) newLinks[gitIdx].href = e.target.value;
                            setFormData({...formData, links: newLinks});
                          }}
                          className="w-full bg-white border border-slate-100 rounded-lg p-3 text-slate-900 focus:border-brand-500 outline-none transition-colors text-[10px]" 
                          placeholder="https://github.com/..." 
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-brand-600 font-bold mb-2">Description</label>
                      <textarea required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={5} className="w-full bg-white border border-slate-100 rounded-lg p-4 text-slate-900 focus:border-brand-500 outline-none transition-colors resize-none" placeholder="Describe the project objective..." />
                    </div>
                    <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-lg font-black uppercase tracking-[0.2em] text-xs hover:bg-black transition-colors flex items-center justify-center gap-3 shadow-lg">
                      <Save size={16} /> {editingId ? 'Update project' : 'Publish Project'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project._id} className="bg-white border border-slate-100 p-6 rounded-3xl group relative shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="aspect-video rounded-2xl overflow-hidden mb-6 bg-slate-100">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-serif text-slate-900 mb-1">{project.title}</h3>
                <p className="text-brand-600 text-[10px] uppercase tracking-wider font-bold">{project.category}</p>
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => startEdit(project)} className="p-2 bg-white/80 text-brand-600 hover:text-brand-700 rounded-xl transition-colors shadow-sm backdrop-blur-md border border-slate-100" title="Edit"><Edit3 size={16} /></button>
                  <button onClick={() => handleDelete(project._id)} className="p-2 bg-white/80 text-red-500 hover:text-red-600 rounded-xl transition-colors shadow-sm backdrop-blur-md border border-slate-100" title="Delete"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-sm">
          <h2 className="text-2xl font-serif text-slate-900 mb-8 italic">Homepage Appearance</h2>
          <form onSubmit={handleUpdateSettings} className="space-y-8">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-brand-600 font-bold mb-3">Hero Background Image URL</label>
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="url" 
                    value={settings.heroImageUrl} 
                    onChange={(e) => setSettings({...settings, heroImageUrl: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 pl-12 text-slate-900 focus:border-brand-500 outline-none transition-colors" 
                    placeholder="https://images.unsplash.com/..." 
                  />
                </div>
                {settings.heroImageUrl && (
                  <div className="aspect-video rounded-2xl overflow-hidden border border-slate-100">
                    <img src={settings.heroImageUrl} alt="Hero Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-brand-600 font-bold mb-3">Site Title</label>
              <input 
                type="text" 
                value={settings.siteTitle} 
                onChange={(e) => setSettings({...settings, siteTitle: e.target.value})}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-slate-900 focus:border-brand-500 outline-none transition-colors" 
                placeholder="My Professional Portfolio" 
              />
            </div>
            <button 
              type="submit" 
              disabled={settingsLoading}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full font-bold uppercase tracking-widest hover:bg-black transition-all disabled:opacity-50"
            >
              {settingsLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              Save Changes
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default Admin;
