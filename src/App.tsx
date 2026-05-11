import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useSpring,
  useInView,
  useMotionValue
} from 'motion/react';
import { 
  Layout, 
  Code2, 
  Smartphone, 
  Palette, 
  TrendingUp, 
  ChevronDown, 
  Instagram, 
  Send,
  MessageCircle,
  Mail,
  ArrowUpRight,
  CheckCircle2,
  Globe,
  Monitor,
  Search,
  Layers,
  Zap,
  Menu,
  X
} from 'lucide-react';

// --- Components ---

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`relative flex flex-col items-center justify-center ${className}`}>
    {/* Swoosh */}
    <svg 
      className="absolute -top-4 w-full h-8 text-accent/60 opacity-80" 
      viewBox="0 0 200 40" 
      preserveAspectRatio="none"
    >
      <path 
        d="M20 35 C 80 10, 150 10, 180 30" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        fill="none" 
        strokeLinecap="round"
      />
      <circle cx="180" cy="30" r="1.5" fill="currentColor" />
    </svg>
    
    <div className="flex flex-col items-center">
      <span className="font-brand text-4xl leading-none text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-accent-glow -mb-1">
        Tboywurld
      </span>
      <span className="font-display text-[0.5rem] uppercase tracking-[0.4em] text-gray-400 font-bold ml-1">
        WEB STUDIO
      </span>
    </div>
  </div>
);

const ProjectPreviewModal = ({ project, isOpen, onClose }: { project: any, isOpen: boolean, onClose: () => void }) => {
  if (!project) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full h-full max-w-6xl glass rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                  <Monitor size={20} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg">{project.title}</h4>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">{project.category}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                  title="Open in new tab"
                >
                  <ArrowUpRight size={20} />
                </a>
                <button 
                  onClick={onClose}
                  className="p-3 bg-white/5 hover:bg-red-500/20 rounded-full transition-colors text-gray-400 hover:text-red-500"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            {/* Modal Content - Iframe */}
            <div className="flex-1 bg-white relative">
              <iframe 
                src={project.link} 
                className="w-full h-full border-none"
                title={`${project.title} Preview`}
                loading="lazy"
              />
              {/* Overlay in case of X-Frame-Options issues */}
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.05)]" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CursorGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 opacity-50 hidden lg:block"
      style={{
        background: useTransform(
          [mouseX, mouseY],
          ([x, y]: any[]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(168, 85, 247, 0.1), transparent 80%)`
        ),
      }}
    />
  );
};

const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    mouseX.set(x * 0.3);
    mouseY.set(y * 0.3);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4 glass-dark' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Logo className="scale-75 origin-left" />
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium text-gray-400 hover:text-accent transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Magnetic>
              <a
                href="#contact"
                className="px-6 py-2.5 bg-accent hover:bg-accent-glow text-white rounded-full text-sm font-semibold transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]"
              >
                Start Project
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Mobile Menu Trigger */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col p-8 md:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-display font-bold text-xl tracking-tight">Tboywurld</span>
              <button onClick={() => setMobileMenuOpen(false)}><X size={32} /></button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl font-display font-bold hover:text-accent transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 px-8 py-4 bg-accent text-white rounded-2xl text-center font-bold text-lg"
              >
                Let's Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[150px]" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8"
        >
          <div className="w-2 h-2 bg-accent rounded-full animate-ping" />
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Available for new projects</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-display font-bold tracking-tight mb-8 leading-[1.1] max-w-5xl mx-auto"
        >
          Building Modern Websites That Make <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-600">Businesses Stand Out</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Tboywurld Web Studio creates premium landing pages and business websites for brands that want a stronger online presence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Magnetic>
            <a
              href="#projects"
              className="group relative px-8 py-4 bg-purple-600 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg shadow-purple-900/40"
            >
              View Projects
              <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="px-8 py-4 glass text-white font-bold rounded-2xl transition-all hover:bg-white/10 active:scale-95 border border-white/20"
            >
              Contact Me
            </a>
          </Magnetic>
        </motion.div>

        {/* Floating Mockup Card */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 50 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 relative max-w-4xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden glass p-4 shadow-2xl border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426" 
              alt="Website Showcase" 
              className="w-full rounded-2xl shadow-inner"
            />
            {/* Float UI Element Case */}
            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-10 -right-10 w-48 glass p-4 rounded-2xl border border-white/20 shadow-2xl hidden md:block"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center"><CheckCircle2 size={16} className="text-green-500" /></div>
                <div className="h-2 w-20 bg-white/20 rounded" />
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded mb-1" />
              <div className="h-1.5 w-2/3 bg-white/10 rounded" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

const AboutSection = () => {
  const stats = [
    { label: 'Projects Built', value: '50+', icon: <Layers size={24} /> },
    { label: 'Responsive Design', value: '100%', icon: <Smartphone size={24} /> },
    { label: 'Modern UI Focus', value: 'Elite', icon: <Palette size={24} /> },
    { label: 'International Reach', value: 'Global', icon: <Globe size={24} /> },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent mb-6">About Tboywurld</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-8">
              A modern creative studio focused on <span className="text-gray-500">Business Growth.</span>
            </h3>
            <p className="text-lg text-gray-400 mb-10 leading-relaxed">
              Introduce Tboywurld Web Studio as a modern creative web design studio focused on helping businesses grow online with clean, responsive, conversion-focused websites. We blend aesthetics with functionality to deliver digital experiences that leave a lasting impression.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {['Modern Design', 'Mobile Focused', 'User Experience', 'Fast Performance'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="text-accent" size={20} />
                  <span className="font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-dark p-8 rounded-3xl border border-white/5 hover:border-accent/40 transition-colors group"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-3xl font-display font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const services = [
    {
      title: 'Landing Pages',
      desc: 'High-converting one-pagers designed to turn visitors into customers instantly.',
      icon: <Layout className="text-white" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Business Websites',
      desc: 'Professional multi-page websites that establish authority and build brand trust.',
      icon: <Globe className="text-white" />,
      color: 'bg-purple-500'
    },
    {
      title: 'UI Design',
      desc: 'Visual interfaces that are stunning, modern, and perfectly aligned with your brand.',
      icon: <Palette className="text-white" />,
      color: 'bg-accent'
    },
    {
      title: 'Mobile Responsive',
      desc: 'Ensuring your website looks and works perfectly on every device, from phone to desktop.',
      icon: <Smartphone className="text-white" />,
      color: 'bg-emerald-500'
    },
  ];

  return (
    <section id="services" className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 text-center mb-20">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent mb-4">Our Services</h2>
        <h3 className="text-4xl md:text-5xl font-display font-bold">Premium Digital Solutions</h3>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group relative p-8 glass rounded-[2.5rem] border border-white/5 hover:border-accent/30 overflow-hidden"
          >
            <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg`}>
              {service.icon}
            </div>
            <h4 className="text-2xl font-display font-bold mb-4">{service.title}</h4>
            <p className="text-gray-400 leading-relaxed mb-6">
              {service.desc}
            </p>
            <div className="absolute bottom-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
              {React.cloneElement(service.icon as React.ReactElement, { size: 120 })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const steps = [
    { title: 'Research & Strategy', desc: 'Understanding your business goals, target audience, and competition to create a roadmap.', icon: <Search /> },
    { title: 'Design & Development', desc: 'Crafting beautiful UI and turning it into a high-performance, pixel-perfect website.', icon: <Code2 /> },
    { title: 'Optimization & Testing', desc: 'Ensuring speed, SEO performance, and cross-device compatibility across all browsers.', icon: <Zap /> },
    { title: 'Launch & Support', desc: 'Going live and providing ongoing support to ensure your growth never stops.', icon: <RocketIcon /> },
  ];

  return (
    <section id="process" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent mb-4">The Workflow</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold">How We Build Magic</h3>
        </div>

        <div className="relative mt-20">
          {/* Animated Line */}
          <div className="absolute top-[2.75rem] left-0 w-full h-0.5 bg-white/5 hidden lg:block">
            <motion.div 
              style={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              className="w-full h-full bg-accent origin-left"
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          <div className="grid lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-black border-2 border-white/10 rounded-full flex items-center justify-center mx-auto mb-8 relative z-20 group-hover:border-accent group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all bg-[#050505]">
                  <span className="text-xl font-display font-bold text-gray-500 group-hover:text-accent">0{i+1}</span>
                </div>
                <h4 className="text-2xl font-display font-bold mb-4">{step.title}</h4>
                <p className="text-gray-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectSection = ({ onProjectClick }: { onProjectClick: (project: any) => void }) => {
  const projects = [
    {
      title: 'Swift Ocean Lounge',
      category: 'Luxury Hospitality',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1470',
      link: 'https://swiftoceanloungeandgrill.netlify.app/'
    },
    {
      title: 'Ivy’s Nail Lounge',
      category: 'Beauty & Wellness',
      image: 'https://images.unsplash.com/photo-1604902396830-aca29e19b067?auto=format&fit=crop&q=80&w=1470',
      link: 'https://ais-pre-k77ojedmz4w3vsm53c5wyz-31238855147.europe-west2.run.app/'
    },
    {
      title: 'James Boswell Hair',
      category: 'Premium Stylist',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1470',
      link: 'https://jamesboswellhair.netlify.app/'
    },
    {
      title: 'Lola’s Cafe',
      category: 'Artisanal Coffee',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1470',
      link: 'https://lolasfoodcafe.netlify.app/'
    },
    {
      title: 'Sparkle Cakes',
      category: 'Elite Bakery',
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=1470',
      link: 'https://ais-pre-kl2fppy2mvpgqqhxno7cvr-31238855147.europe-west2.run.app/'
    },
  ];

  return (
    <section id="projects" className="py-24 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent mb-4">Selected Works</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold">Featured Projects</h3>
          </div>
          <p className="text-gray-400 max-w-sm">Explore our curated collection of premium web experiences designed to elevate brands.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => onProjectClick(project)}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-6">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                    className="w-20 h-20 rounded-full bg-accent text-white flex items-center justify-center font-bold"
                  >
                    View
                  </motion.div>
                </div>
              </div>
              <div className="px-4 text-center">
                <span className="text-sm text-accent font-bold uppercase tracking-widest mb-2 block">{project.category}</span>
                <h4 className="text-2xl font-display font-bold group-hover:text-accent transition-colors">{project.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const faqs = [
    { q: 'How long does a project take?', a: 'Typically a premium landing page takes 1-2 weeks, while a full business website takes 3-6 weeks depending on the complexity and scope of features required.' },
    { q: 'Do you work with international clients?', a: 'Yes! We work with businesses globally, from Nigeria to the US, Europe, and beyond. All communication is handled smoothly via video calls and digital platforms.' },
    { q: 'Is the website mobile responsive?', a: 'Absolutely. Every website we build is 100% responsive, meaning it will look and function flawlessly on smartphones, tablets, and desktops.' },
    { q: 'Can businesses request redesigns?', a: 'Yes, we specialize in revamping outdated websites to give them a modern, premium feel that better represents your current brand identity.' },
    { q: 'Do you offer landing pages only?', a: 'While we specialize in landing pages, we also build comprehensive multi-page business websites, e-commerce stores, and high-end portfolios.' },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent mb-4">FAQ</h2>
          <h3 className="text-4xl font-display font-bold">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              className={`glass rounded-2xl border transition-all ${activeIndex === i ? 'border-accent/40 bg-accent/5' : 'border-white/5'}`}
            >
              <button 
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full p-6 flex justify-between items-center text-left"
              >
                <span className="text-lg font-bold">{faq.q}</span>
                <ChevronDown className={`transition-transform ${activeIndex === i ? 'rotate-180 text-accent' : 'text-gray-500'}`} size={20} />
              </button>
              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent mb-6">Let's Connect</h2>
            <h3 className="text-5xl md:text-6xl font-display font-bold leading-tight mb-8">
              Ready to create something <span className="text-accent underline decoration-white/10 underline-offset-8">legendary?</span>
            </h3>
            <p className="text-xl text-gray-400 mb-12 max-w-md">
              Whether you have a specific project in mind or just want to explore possibilities, we're here to help.
            </p>

            <div className="space-y-6">
              {[
                { icon: <Instagram />, text: '@tboywurldwebstudio', href: 'https://www.instagram.com/tboywurldwebstudio/' },
                { icon: <MessageCircle />, text: '+234 916 105 2803', href: 'https://wa.me/2349161052803' },
                { icon: <Mail />, text: 'btee7746@gmail.com', href: 'mailto:btee7746@gmail.com' },
              ].map((item) => (
                <a 
                  key={item.text}
                  href={item.href}
                  target={item.href.startsWith('http') ? "_blank" : undefined}
                  rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 text-lg hover:text-accent transition-colors group"
                >
                  <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  {item.text}
                </a>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-2xl"
          >
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20"
              >
                <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center text-accent mb-4">
                  <CheckCircle2 size={40} />
                </div>
                <h4 className="text-3xl font-display font-bold">Message Sent!</h4>
                <p className="text-gray-400">Thank you for reaching out. We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-2">Name</label>
                    <input type="text" required placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-2">Email</label>
                    <input type="email" required placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-2">Subject</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-colors">
                    <option className="bg-black">Project Inquiry</option>
                    <option className="bg-black">Partnership</option>
                    <option className="bg-black">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-2">Message</label>
                  <textarea rows={4} required placeholder="Tell us about your project..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-colors resize-none"></textarea>
                </div>
                <button type="submit" className="w-full bg-accent hover:bg-accent-glow text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                  Send Message
                  <Send size={18} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Logo className="scale-75" />
        </div>
        
        <p className="text-gray-500 text-sm">© 2026 Tboywurld Web Studio. All rights reserved.</p>
        
        <div className="flex gap-6">
          <a href="https://www.instagram.com/tboywurldwebstudio/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-accent transition-colors">
            <Instagram size={20} />
          </a>
          <a href="https://wa.me/2349161052803" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-accent transition-colors">
            <MessageCircle size={20} />
          </a>
          <a href="mailto:btee7746@gmail.com" className="text-gray-500 hover:text-accent transition-colors">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

// Helper Icon since Rocket is not always in standard Lucide
const RocketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3"/>
    <path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5"/>
  </svg>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen selection:bg-accent/40 text-white overflow-x-hidden">
      <CursorGlow />
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin" />
              <div className="text-3xl font-display font-bold tracking-widest text-glow">TBOYWURLD</div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Navbar />
      <Hero />
      <AboutSection />
      <ServicesSection />
      <ProcessSection />
      <ProjectSection onProjectClick={(project) => setSelectedProject(project)} />
      <FAQSection />
      <ContactSection />
      <Footer />

      <ProjectPreviewModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      {/* Global Glow Effects */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] -z-10" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/5 rounded-full blur-[120px] -z-10" />
    </div>
  );
}
