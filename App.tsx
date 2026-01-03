
import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Code, 
  Cpu, 
  Layout, 
  GraduationCap, 
  Award,
  ChevronRight,
  MessageSquare,
  Send,
  X,
  Upload,
  Settings,
  Eye,
  CheckCircle2,
  Menu,
  Camera,
  RefreshCcw
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS as INITIAL_PROJECTS, EDUCATION, SKILLS, CERTIFICATIONS } from './data';
import { askEddieAI } from './services/geminiService';
import { Project } from './types';

const Nav: React.FC<{ isEditMode: boolean, toggleEditMode: () => void }> = ({ isEditMode, toggleEditMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          Eddie<span className="text-blue-500">.</span>
          {isEditMode && (
            <span className="text-[10px] bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded-full border border-amber-500/30 uppercase tracking-widest font-black">
              Edit Mode
            </span>
          )}
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-white transition-colors">{link.name}</a>
          ))}
          <button 
            onClick={toggleEditMode}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
              isEditMode 
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' 
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
            title="Toggle Customization Mode"
          >
            <Settings size={16} />
            <span>{isEditMode ? 'Finish' : 'Customize'}</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-slate-400 hover:text-white transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-xl border-b border-white/5 p-6 space-y-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-semibold text-slate-400 hover:text-white transition-colors py-2"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-4 border-t border-white/5">
            <button 
              onClick={() => {
                toggleEditMode();
                setMobileMenuOpen(false);
              }}
              className={`flex w-full items-center justify-between p-4 rounded-xl transition-all border ${
                isEditMode 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' 
                  : 'bg-white/5 border-white/10 text-slate-400'
              }`}
            >
              <span className="flex items-center gap-3 font-bold">
                <Settings size={20} />
                Customization Mode
              </span>
              <span className="text-xs uppercase tracking-widest font-black">
                {isEditMode ? 'Enabled' : 'Disabled'}
              </span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC<{ isEditMode: boolean }> = ({ isEditMode }) => {
  const [profilePic, setProfilePic] = useState(PERSONAL_INFO.profilePicture);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfilePic(url);
    }
  };

  const resetPic = () => {
    setProfilePic(PERSONAL_INFO.profilePicture);
  };

  return (
    <section id="about" className="relative pt-48 pb-20 px-6 overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full"></div>
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
        <div className="relative shrink-0 animate-in fade-in slide-in-from-left duration-700">
          <div className="flex flex-col items-center gap-6">
            {/* Main Photo Wrapper */}
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-[40px] overflow-hidden border-2 border-white/10 shadow-2xl relative group transition-all duration-500 hover:shadow-blue-500/20">
              <img 
                src={profilePic} 
                alt={PERSONAL_INFO.name} 
                className="w-full h-full object-cover transition-all duration-1000 scale-105 group-hover:scale-100 grayscale-[0.2] hover:grayscale-0"
              />
              {isEditMode && (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-blue-600/40 backdrop-blur-sm flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Camera size={40} className="text-white mb-2" />
                </div>
              )}
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handlePicUpload} 
                accept="image/*" 
              />
            </div>

            {/* Edit Mode Buttons */}
            {isEditMode && (
              <div className="flex gap-3 animate-in fade-in zoom-in duration-300">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20"
                >
                  <Upload size={14} /> Upload Photo
                </button>
                <button 
                  onClick={resetPic}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-bold rounded-xl border border-white/10 transition-all"
                >
                  <RefreshCcw size={14} /> Reset
                </button>
              </div>
            )}
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600/20 blur-3xl -z-10 rounded-full"></div>
          <div className="absolute top-1/2 -left-12 w-24 h-24 bg-purple-600/20 blur-3xl -z-10 rounded-full"></div>
        </div>

        <div className="flex-grow animate-in fade-in slide-in-from-right duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] uppercase tracking-widest font-black mb-8 animate-pulse">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Available for Internships
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            Hi, I'm <span className="text-gradient">{PERSONAL_INFO.name}</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed mx-auto md:mx-0">
            {PERSONAL_INFO.bio}
          </p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-12">
            <a 
              href="#projects" 
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-xl shadow-blue-600/25 active:scale-95"
            >
              My Projects
            </a>
            <a 
              href="#contact" 
              className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all active:scale-95"
            >
              Contact Me
            </a>
          </div>

          <div className="flex justify-center md:justify-start gap-6">
            <a href={PERSONAL_INFO.github} target="_blank" className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-white hover:bg-blue-600 transition-all">
              <Github size={24} />
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-white hover:bg-blue-600 transition-all">
              <Linkedin size={24} />
            </a>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-white hover:bg-blue-600 transition-all">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectModal: React.FC<{ project: Project | null, onClose: () => void }> = ({ project, onClose }) => {
  if (!project) return null;
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative glass w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in fade-in duration-300">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
        >
          <X size={24} />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          <div className="h-64 md:h-full bg-slate-900 flex items-center justify-center overflow-hidden">
            <img 
              src={project.image || `https://picsum.photos/seed/${project.title}/800/600`} 
              className="w-full h-full object-cover"
              alt={project.title}
            />
          </div>
          <div className="p-8 md:p-12 overflow-y-auto">
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-[10px] uppercase font-bold tracking-widest border border-blue-500/20">
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">{project.title}</h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              {project.description}
            </p>
            <div className="space-y-4">
              <h4 className="font-bold text-slate-300">Project Features:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-slate-400 text-sm">
                  <CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  <span>Modern responsive user interface</span>
                </li>
                <li className="flex items-start gap-2 text-slate-400 text-sm">
                  <CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  <span>Optimized for multi-device performance</span>
                </li>
                <li className="flex items-start gap-2 text-slate-400 text-sm">
                  <CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  <span>Interactive elements using standard web technologies</span>
                </li>
              </ul>
            </div>
            <div className="mt-12 flex gap-4">
              <a 
                href={project.link} 
                target="_blank" 
                className="flex-grow flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20"
              >
                Launch Project <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC<{ isEditMode: boolean }> = ({ isEditMode }) => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingIdx !== null) {
      const url = URL.createObjectURL(file);
      const newProjects = [...projects];
      newProjects[editingIdx] = { ...newProjects[editingIdx], image: url };
      setProjects(newProjects);
      setEditingIdx(null);
    }
  };

  const triggerUpload = (idx: number) => {
    setEditingIdx(idx);
    fileInputRef.current?.click();
  };

  return (
    <section id="projects" className="py-32 px-6 bg-slate-900/30">
      <input 
        type="file" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleImageUpload} 
        accept="image/*"
      />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Featured <span className="text-gradient">Work</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            A selection of my favorite projects, ranging from food delivery systems to high-end UI clones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className="group relative glass rounded-3xl overflow-hidden flex flex-col h-full border-white/5 hover:border-blue-500/30 transition-all duration-500 shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/5"
            >
              <div className="relative h-60 bg-slate-800 overflow-hidden cursor-pointer" onClick={() => setSelectedProject(project)}>
                <img 
                  src={project.image || `https://picsum.photos/seed/${project.title}/600/400`} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-100 group-hover:opacity-80 transition-opacity"></div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600/10 backdrop-blur-[2px]">
                  <div className="flex gap-4">
                    <button className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all">
                      <Eye size={24} />
                    </button>
                    {isEditMode && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); triggerUpload(idx); }}
                        className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white shadow-lg transition-all"
                        title="Upload Screenshot"
                      >
                        <Upload size={24} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="absolute top-4 right-4">
                  {project.tags.slice(0, 1).map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-lg text-[9px] uppercase tracking-widest font-black text-blue-400 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-base mb-8 leading-relaxed flex-grow">
                  {project.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-blue-400 transition-all group/link"
                  >
                    Explore Demo <ExternalLink size={16} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </a>
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="text-slate-500 hover:text-white transition-colors"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

const Skills: React.FC = () => (
  <section id="skills" className="py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-4xl font-extrabold tracking-tight mb-4">Core <span className="text-gradient">Stack</span></h2>
        <div className="h-1 w-24 bg-blue-600 rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SKILLS.map((group, idx) => (
          <div key={idx} className="glass p-10 rounded-3xl hover:border-white/20 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              {group.category === "Languages" && <Code size={80} />}
              {group.category === "Tools & Technologies" && <Layout size={80} />}
              {group.category === "Operating Systems" && <Cpu size={80} />}
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className={`p-3 rounded-2xl ${
                group.category === "Languages" ? "bg-blue-500/10 text-blue-400" :
                group.category === "Tools & Technologies" ? "bg-purple-500/10 text-purple-400" :
                "bg-emerald-500/10 text-emerald-400"
              }`}>
                {group.category === "Languages" && <Code size={24} />}
                {group.category === "Tools & Technologies" && <Layout size={24} />}
                {group.category === "Operating Systems" && <Cpu size={24} />}
              </div>
              <h3 className="text-2xl font-bold">{group.category}</h3>
            </div>
            <div className="flex flex-wrap gap-3 relative z-10">
              {group.items.map((item, i) => (
                <span key={i} className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-sm font-medium text-slate-300 group-hover:bg-white/10 group-hover:text-white transition-all">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Timeline: React.FC = () => (
  <section id="education" className="py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl">
              <GraduationCap size={32} />
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight">Education</h2>
          </div>
          <div className="space-y-12 relative before:absolute before:left-[23px] before:top-4 before:bottom-4 before:w-[2px] before:bg-slate-800">
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="relative pl-16 group">
                <div className="absolute left-0 top-1.5 w-[48px] h-[48px] rounded-2xl bg-slate-950 border-2 border-slate-800 flex items-center justify-center group-hover:border-blue-500 transition-colors duration-500">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></div>
                </div>
                <div className="text-blue-400 text-sm font-black mb-2 tracking-widest">{edu.period}</div>
                <h3 className="text-2xl font-extrabold mb-2 text-slate-100 group-hover:text-blue-400 transition-colors">{edu.institution}</h3>
                <div className="text-slate-300 text-lg mb-2 font-medium">{edu.degree}</div>
                <div className="text-slate-500 text-sm flex items-center gap-2">
                  <MapPin size={16} /> {edu.location}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-2xl">
              <Award size={32} />
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight">Certifications</h2>
          </div>
          <div className="space-y-8">
            {CERTIFICATIONS.map((cert, idx) => (
              <div key={idx} className="glass p-8 rounded-3xl border-white/5 hover:border-purple-500/30 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-extrabold group-hover:text-purple-400 transition-colors">{cert.name}</h3>
                  <Award className="text-purple-500/20 group-hover:text-purple-500 transition-colors" size={32} />
                </div>
                <div className="text-purple-400 text-sm font-bold mb-4 uppercase tracking-widest">{cert.issuer}</div>
                <p className="text-slate-400 text-base leading-relaxed">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: "Hi! I'm Eddie's Assistant. Ask me anything about his skills, projects, or education!" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    
    setIsTyping(true);
    const aiResponse = await askEddieAI(userMsg);
    setIsTyping(false);
    
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[120]">
      {isOpen ? (
        <div className="glass w-[90vw] md:w-96 rounded-3xl overflow-hidden shadow-2xl flex flex-col border-white/10 animate-in fade-in slide-in-from-bottom-10 duration-500">
          <div className="bg-blue-600 px-6 py-5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageSquare size={18} className="text-white" />
              </div>
              <div>
                <span className="block font-bold text-sm leading-tight text-white">Eddie AI Assistant</span>
                <span className="block text-[10px] text-blue-200">Always active</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-xl transition-colors">
              <X size={20} className="text-white" />
            </button>
          </div>
          <div ref={scrollRef} className="h-96 overflow-y-auto p-6 space-y-6 bg-slate-950/80 scroll-smooth">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white/10 text-slate-200 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-tl-none text-sm flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-white/5 bg-slate-900/50 flex gap-3">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Eddie's AI..."
              className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-500"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-90"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-600/30 transition-all hover:scale-110 active:scale-90 group relative"
        >
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-950"></div>
          <MessageSquare size={30} className="group-hover:rotate-12 transition-transform" />
        </button>
      )}
    </div>
  );
};

const Contact: React.FC = () => (
  <section id="contact" className="py-32 px-6 bg-slate-900/50">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-5xl md:text-7xl font-extrabold mb-10">Get In <span className="text-gradient">Touch</span></h2>
      <p className="text-slate-400 mb-16 max-w-2xl mx-auto text-lg leading-relaxed">
        I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: Mail, label: 'Email Me', value: PERSONAL_INFO.email, link: `mailto:${PERSONAL_INFO.email}` },
          { icon: Phone, label: 'Call Me', value: `+91 ${PERSONAL_INFO.phone}`, link: `tel:${PERSONAL_INFO.phone}` },
          { icon: MapPin, label: 'Location', value: PERSONAL_INFO.location, link: '#' },
          { icon: Linkedin, label: 'Connect', value: 'LinkedIn Profile', link: PERSONAL_INFO.linkedin }
        ].map((item, idx) => (
          <a 
            key={idx}
            href={item.link}
            target={item.link.startsWith('http') ? '_blank' : undefined}
            className="glass p-10 rounded-3xl border-white/5 group hover:border-blue-500/50 hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mx-auto mb-6 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
              <item.icon size={32} />
            </div>
            <div className="text-sm font-black text-slate-500 uppercase tracking-widest mb-2">{item.label}</div>
            <div className="text-slate-200 font-bold group-hover:text-blue-400 transition-colors">{item.value}</div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="py-20 px-6 border-t border-white/5 text-center bg-slate-950">
    <div className="max-w-6xl mx-auto">
      <div className="text-3xl font-black tracking-tight text-white mb-10">
        Eddie<span className="text-blue-500">.</span>
      </div>
      <div className="flex justify-center gap-10 mb-10">
        <a href={PERSONAL_INFO.github} target="_blank" className="text-slate-500 hover:text-white transition-all hover:scale-110"><Github size={24} /></a>
        <a href={PERSONAL_INFO.linkedin} target="_blank" className="text-slate-500 hover:text-white transition-all hover:scale-110"><Linkedin size={24} /></a>
        <a href={`mailto:${PERSONAL_INFO.email}`} className="text-slate-500 hover:text-white transition-all hover:scale-110"><Mail size={24} /></a>
      </div>
      <div className="text-slate-600 text-sm font-medium">
        &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. Crafted with precision and passion.
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 selection:bg-blue-500/30 selection:text-blue-200">
      <Nav isEditMode={isEditMode} toggleEditMode={() => setIsEditMode(!isEditMode)} />
      <main>
        <Hero isEditMode={isEditMode} />
        <Skills />
        <Projects isEditMode={isEditMode} />
        <Timeline />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default App;
