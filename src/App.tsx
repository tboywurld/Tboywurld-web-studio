/// <reference types="vite/client" />
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
import * as THREE from 'three';
import emailjs from '@emailjs/browser';

// --- Constants & Types ---

const CONTACT = {
  phone: '+234 916 105 2803',
  whatsapp: 'https://wa.me/2349161052803',
  email: 'btee7746@gmail.com',
  instagram: 'https://www.instagram.com/tboywurldwebstudio/',
  handle: '@tboywurldwebstudio',
};

interface Project {
  title: string;
  category: string;
  image: string;
  link: string;
}

// --- Animation Components ---

const FadeUp = ({ children, delay = 0, className = '' }: { 
  children: React.ReactNode; delay?: number; className?: string; key?: React.Key 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}
  >
    {children}
  </motion.div>
);

const CountUp = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { 
        setCount(target); 
        clearInterval(timer); 
      } else {
        setCount(Math.floor(start));
      }
    }, 40);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// --- Components ---

const RocketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3"/>
    <path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5"/>
  </svg>
);

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

const FloatingSphere = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Dimensions
    let width = container.clientWidth || 400;
    let height = container.clientHeight || 400;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 7;

    // Group to hold spheres and control synchronized animations
    const group = new THREE.Group();
    scene.add(group);

    // Geometry
    const geometry = new THREE.SphereGeometry(2.5, 64, 64);

    // Materials
    const mainMaterial = new THREE.MeshStandardMaterial({
      color: 0xA855F7,
      roughness: 0.1,
      metalness: 0.8,
      wireframe: false
    });

    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      opacity: 0.04,
      transparent: true
    });

    // Meshes
    const sphere = new THREE.Mesh(geometry, mainMaterial);
    const wireframeSphere = new THREE.Mesh(geometry, wireMaterial);

    group.add(sphere);
    group.add(wireframeSphere);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xA855F7, 80);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xC084FC, 40);
    pointLight2.position.set(-10, -5, -10);
    scene.add(pointLight2);

    // Animation variable
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      group.rotation.y += 0.003;
      group.rotation.x += 0.001;
      group.position.y = Math.sin(Date.now() * 0.001) * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handling using ResizeObserver as suggested in Responsive guidelines
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = entry.contentRect.width;
        height = entry.contentRect.height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
      }
    });

    resizeObserver.observe(container);

    // Proper Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      
      geometry.dispose();
      mainMaterial.dispose();
      wireMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[350px] flex items-center justify-center relative select-none pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

const ProjectPreviewModal = ({ project, isOpen, onClose }: { project: Project | null, isOpen: boolean, onClose: () => void }) => {
  if (!project) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-10"
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
            className="relative w-full h-full max-w-6xl glass rounded-none md:rounded-[2.5rem] overflow-hidden border-0 md:border border-white/10 shadow-2xl flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/5 bg-black/40 backdrop-blur-md">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                  <Monitor size={18} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-md md:text-lg">{project.title}</h4>
                  <p className="text-[0.65rem] md:text-xs text-gray-400 uppercase tracking-widest">{project.category}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 md:gap-4">
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                  title="Open in new tab"
                >
                  <ArrowUpRight size={20} />
                </a>
                <button 
                  onClick={onClose}
                  className="w-11 h-11 flex items-center justify-center bg-white/5 hover:bg-red-500/20 rounded-full transition-colors text-gray-400 hover:text-red-500"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            {/* Modal Content - Safe Screenshot / Photo Preview */}
            <div className="flex-1 relative overflow-y-auto bg-[#0a0a0a] flex flex-col items-center justify-center gap-4 md:gap-6 p-6 md:p-10 select-none">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full max-w-2xl rounded-2xl shadow-2xl border border-white/10 object-contain max-h-[40vh] md:max-h-[60vh] md:object-cover"
              />
              <p className="text-gray-400 text-xs md:text-sm text-center max-w-md">Live preview unavailable due to browser security. Open the full site below.</p>
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full md:w-auto px-8 py-4 bg-accent text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-accent-glow transition-all shadow-lg shadow-purple-950/25"
              >
                Open Live Site <ArrowUpRight size={20} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CursorGlow = () => {
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || (navigator.maxTouchPoints > 0);
    setIsTouch(isTouchDevice);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    if (isTouch) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isTouch]);

  if (isTouch) return null;

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
  const { scrollYProgress } = useScroll();

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
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 400 }}
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
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-accent hover:bg-accent-glow text-white rounded-full text-sm font-semibold transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] block"
              >
                Start Project
              </motion.a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Mobile Menu Trigger */}
        <button className="lg:hidden text-white p-2 hover:bg-white/5 rounded-full transition-colors" onClick={() => setMobileMenuOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Scroll Progress Bar at the bottom of Navbar */}
      <motion.div 
        style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
        className="h-[2px] bg-gradient-to-r from-accent to-purple-300 w-full absolute bottom-0 left-0"
      />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col p-8 lg:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-display font-bold text-xl tracking-tight">Tboywurld</span>
              <button className="p-2 hover:bg-white/5 rounded-full transition-colors" onClick={() => setMobileMenuOpen(false)}><X size={32} /></button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-display font-medium hover:text-accent transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 px-8 py-4 bg-accent text-white rounded-2xl text-center font-bold text-md shadow-[0_4px_20px_rgba(168,85,247,0.3)] block"
              >
                Start Project
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 lg:pt-40 pb-12 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[150px]" />
      
      {/* Grid Pattern with exact inline URL encoded Noise SVG avoiding external dependency */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20256%20256%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noise%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%224%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noise)%22/%3E%3C/svg%3E')] opacity-20 brightness-50 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
        {/* Responsive Grid Hero (Three.js FloatingSphere Left, content Right on Desktop) */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16 text-center lg:text-left">
          
          {/* Left Column - 3D FloatingSphere (Desktop Only) */}
          <div className="hidden lg:block h-[500px] relative">
            <FloatingSphere />
          </div>

          {/* Right Column - Text & Content */}
          <div className="flex flex-col items-center lg:items-start justify-center">
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
              className="text-4xl lg:text-6xl font-display font-bold tracking-tight mb-8 leading-[1.1] max-w-3xl"
            >
              {['Building', 'Modern', 'Websites', 'That', 'Make'].map((word, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="inline-block mr-3"
                >{word}</motion.span>
              ))}
              <br/>
              {['Businesses', 'Stand', 'Out'].map((word, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i + 5) * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="inline-block mr-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-600"
                >{word}</motion.span>
              ))}
            </motion.h1>

            <FadeUp delay={0.3}>
              <p className="text-lg md:text-xl text-gray-400 max-w-xl mb-12 leading-relaxed">
                Tboywurld Web Studio creates premium landing pages and business websites for brands that want a stronger online presence.
              </p>
            </FadeUp>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
            >
              <Magnetic>
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168,85,247,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative px-8 py-4 bg-purple-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-purple-900/40 w-full sm:w-auto"
                >
                  View Projects
                  <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
                </motion.a>
              </Magnetic>
              <Magnetic>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168,85,247,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 glass text-white font-bold rounded-2xl border border-white/20 w-full sm:w-auto text-center block"
                >
                  Contact Me
                </motion.a>
              </Magnetic>
            </motion.div>
          </div>
        </div>

        {/* Floating Mockup Card remains full width below */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative max-w-4xl mx-auto"
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
    <section id="about" className="py-16 px-4 md:py-24 md:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <FadeUp delay={0}>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent mb-6">About Tboywurld</h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h3 className="text-3xl lg:text-5xl font-display font-bold leading-tight mb-8">
                A modern creative studio focused on <span className="text-gray-500">Business Growth.</span>
              </h3>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-md md:text-lg text-gray-400 mb-10 leading-relaxed">
                We are a modern creative web design studio helping businesses grow online with clean, responsive, and conversion-focused websites. Based in Nigeria, serving clients globally — we blend bold aesthetics with sharp functionality to deliver digital experiences that leave a lasting impression.
              </p>
            </FadeUp>
            
            <div className="grid grid-cols-2 gap-6 mb-8 lg:mb-0">
              {['Modern Design', 'Mobile Focused', 'User Experience', 'Fast Performance'].map((item, i) => (
                <FadeUp key={item} delay={0.3 + i * 0.05}>
                  <div className="flex items-center gap-2 md:gap-3">
                    <CheckCircle2 className="text-accent flex-shrink-0" size={18} />
                    <span className="font-semibold text-sm md:text-base">{item}</span>
                  </div>
                </FadeUp>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 w-full">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-dark p-6 md:p-8 rounded-3xl border border-white/5 hover:border-accent/40 transition-colors group"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                  {React.cloneElement(stat.icon as React.ReactElement, { size: 20 })}
                </div>
                <div className="text-2xl md:text-3xl font-display font-bold mb-2">
                  {stat.label === 'Projects Built' ? (
                    <CountUp target={50} suffix="+" />
                  ) : stat.label === 'Responsive Design' ? (
                    <CountUp target={100} suffix="%" />
                  ) : (
                    stat.value
                  )}
                </div>
                <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
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
    <section id="services" className="py-16 px-4 md:py-24 md:px-6 bg-[#080808]">
      <div className="max-w-7xl mx-auto text-center mb-16 md:mb-20">
        <FadeUp delay={0}>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent mb-4">Our Services</h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h3 className="text-3xl lg:text-5xl font-display font-bold">Premium Digital Solutions</h3>
        </FadeUp>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="group relative p-6 md:p-8 glass rounded-[2.5rem] border border-white/5 hover:border-accent/30 overflow-hidden"
          >
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className={`w-10 h-10 md:w-14 md:h-14 ${service.color} rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-lg flex-shrink-0`}
            >
              {React.cloneElement(service.icon as React.ReactElement, { size: undefined, className: "w-5 h-5 md:w-6 md:h-6" })}
            </motion.div>
            <h4 className="text-xl md:text-2xl font-display font-bold mb-4">{service.title}</h4>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
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
    { title: 'Research & Strategy', desc: 'Understanding your business goals, target audience, and competition to create a roadmap.', icon: <Search size={22} /> },
    { title: 'Design & Development', desc: 'Crafting beautiful UI and turning it into a high-performance, pixel-perfect website.', icon: <Code2 size={22} /> },
    { title: 'Optimization & Testing', desc: 'Ensuring speed, SEO performance, and cross-device compatibility across all browsers.', icon: <Zap size={22} /> },
    { title: 'Launch & Support', desc: 'Going live and providing ongoing support to ensure your growth never stops.', icon: <RocketIcon /> },
  ];

  return (
    <section id="process" className="py-16 px-4 md:py-24 md:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <FadeUp delay={0}>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent mb-4">The Workflow</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h3 className="text-3xl lg:text-5xl font-display font-bold">How We Build Magic</h3>
          </FadeUp>
        </div>

        <div className="relative mt-16 md:mt-20">
          {/* Animated Line */}
          <div className="absolute top-[2.75rem] left-0 w-full h-0.5 bg-white/5 hidden md:block">
            <motion.div 
              style={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              className="w-full h-full bg-accent origin-left"
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: 'easeOut' }}
                className="text-center group"
              >
                {/* Renders icon inside the circle AND show the step number as a small absolute badge */}
                <div className="relative w-20 h-20 bg-black border-2 border-white/10 rounded-full flex items-center justify-center mx-auto mb-8 z-20 group-hover:border-accent group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all bg-[#050505]">
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full text-xs font-bold flex items-center justify-center z-10 text-white">0{i+1}</span>
                  <div className="text-accent">{step.icon}</div>
                </div>
                <h4 className="text-xl md:text-2xl font-display font-bold mb-4">{step.title}</h4>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, i, onProjectClick }: { project: Project, i: number, onProjectClick: (project: Project) => void, key?: React.Key }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03 }}
      className="group cursor-pointer"
      onClick={() => onProjectClick(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 md:h-56 overflow-hidden rounded-[2.5rem] mb-6 w-full">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm"
        >
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm md:text-base"
          >
            View
          </motion.div>
        </motion.div>
      </div>
      <div className="px-4 text-center">
        <span className="text-xs md:text-sm text-accent font-bold uppercase tracking-widest mb-2 block">{project.category}</span>
        <h4 className="text-xl md:text-2xl font-display font-bold group-hover:text-accent transition-colors">{project.title}</h4>
      </div>
    </motion.div>
  );
};

const ProjectSection = ({ onProjectClick }: { onProjectClick: (project: Project) => void }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Luxury Hospitality', 'Beauty & Wellness', 'Premium Stylist', 'Artisanal Coffee', 'Elite Bakery'];

  const projects: Project[] = [
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

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-16 px-4 md:py-24 md:px-6 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6 md:gap-8">
          <div>
            <FadeUp delay={0}>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent mb-4">Selected Works</h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h3 className="text-3xl lg:text-5xl font-display font-bold">Featured Projects</h3>
            </FadeUp>
          </div>
          <p className="text-gray-400 max-w-sm text-sm md:text-base">Explore our curated collection of premium web experiences designed to elevate brands.</p>
        </div>

        {/* Filter buttons: wrap and scroll horizontally on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-10 scrollbar-hide w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="flex-shrink-0 px-4 py-2.5 rounded-2xl text-xs font-bold tracking-wider uppercase border transition-all duration-300 bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20 active:scale-95"
              style={activeCategory === cat ? {
                backgroundColor: '#A855F7',
                borderColor: '#A855F7',
                color: '#fff',
                boxShadow: '0 4px_15px_rgba(168,85,247,0.3)'
              } : {}}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Map filtered items cleanly */}
          {filteredProjects.map((project, i) => (
            <ProjectCard 
              key={project.title} 
              project={project} 
              i={i} 
              onProjectClick={onProjectClick} 
            />
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
    <section className="py-16 px-4 md:py-24 md:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <FadeUp delay={0}>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent mb-4">FAQ</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h3 className="text-3xl lg:text-5xl font-display font-bold">Frequently Asked Questions</h3>
          </FadeUp>
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
  const [isSending, setIsSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      // Connect contact form using EmailJS service
      // Replace these values with your actual EmailJS credentials directly, or via environment variables (recommended)
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current!,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setIsSubmitted(true);
      formRef.current?.reset();
    } catch (error: any) {
      console.error('EmailJS Error:', error);
      const msg = error?.text || error?.message || JSON.stringify(error);
      alert(`Failed to send: ${msg}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-16 px-4 md:py-24 md:px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="flex flex-col justify-center text-center lg:text-left">
            <FadeUp delay={0}>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent mb-6 justify-center lg:justify-start flex">Let's Connect</h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h3 className="text-3xl lg:text-5xl font-display font-bold leading-tight mb-8">
                Ready to create something <span className="text-accent underline decoration-white/10 underline-offset-8">legendary?</span>
              </h3>
            </FadeUp>
            <p className="text-md md:text-xl text-gray-400 mb-10 max-w-md mx-auto lg:mx-0">
              Whether you have a specific project in mind or just want to explore possibilities, we're here to help.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4 md:gap-6 mb-12 lg:mb-0">
              {[
                { label: 'Instagram', icon: <Instagram size={20} />, text: CONTACT.handle, href: CONTACT.instagram },
                { label: 'WhatsApp', icon: <MessageCircle size={20} />, text: CONTACT.phone, href: CONTACT.whatsapp },
                { label: 'Email', icon: <Mail size={20} />, text: CONTACT.email, href: `mailto:${CONTACT.email}` },
              ].map((item) => (
                <a 
                  key={item.text}
                  href={item.href}
                  target={item.href.startsWith('http') ? "_blank" : undefined}
                  rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  className="flex flex-col sm:flex-row lg:flex-row items-center sm:items-start lg:items-center gap-4 p-5 rounded-2xl glass border border-white/5 hover:border-accent/40 hover:text-accent transition-all duration-300 group text-center sm:text-left w-full"
                >
                  <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="overflow-hidden w-full">
                    <span className="text-[0.65rem] text-gray-400 uppercase tracking-widest block mb-0.5">{item.label}</span>
                    <span className="text-sm md:text-md font-medium block truncate">{item.text}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 border border-white/10 shadow-2xl w-full"
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
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-accent underline mt-4 hover:text-accent-glow"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-2">Name</label>
                    <motion.input 
                      whileFocus={{ scale: 1.01, borderColor: '#A855F7' }}
                      type="text" 
                      name="name" 
                      required 
                      placeholder="John Doe" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-colors duration-200" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-2">Email</label>
                    <motion.input 
                      whileFocus={{ scale: 1.01, borderColor: '#A855F7' }}
                      type="email" 
                      name="email" 
                      required 
                      placeholder="john@example.com" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-colors duration-200" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-2">Subject</label>
                  <select name="subject" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-colors duration-200">
                    <option className="bg-black">Project Inquiry</option>
                    <option className="bg-black">Partnership</option>
                    <option className="bg-black">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-2">Message</label>
                  <motion.textarea 
                    whileFocus={{ scale: 1.01, borderColor: '#A855F7' }}
                    name="message" 
                    rows={4} 
                    required 
                    placeholder="Tell us about your project..." 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-colors resize-none duration-200"
                  ></motion.textarea>
                </div>
                <motion.button 
                  type="submit" 
                  disabled={isSending} 
                  whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(168,85,247,0.6)' }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-accent hover:bg-accent-glow disabled:opacity-50 disabled:pointer-events-none text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                >
                  {isSending ? 'Sending...' : 'Send Message'}
                  <Send size={18} />
                </motion.button>
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
    <footer className="py-12 border-t border-white/5 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        <div 
          className="flex items-center justify-center md:justify-start gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Logo className="scale-75" />
        </div>
        
        {/* Nav links in footer: wrap into 2 columns on mobile */}
        <div className="grid grid-cols-2 sm:flex sm:flex-row gap-x-8 gap-y-3 sm:gap-y-0 text-center justify-center text-sm text-gray-500 w-full sm:w-auto">
          <a href="#about" className="hover:text-accent transition-colors">About</a>
          <a href="#services" className="hover:text-accent transition-colors">Services</a>
          <a href="#process" className="hover:text-accent transition-colors">Process</a>
          <a href="#projects" className="hover:text-accent transition-colors">Projects</a>
          <a href="#contact" className="hover:text-accent transition-colors col-span-2 sm:col-span-1">Contact</a>
        </div>
        
        <p className="text-gray-500 text-sm text-center md:text-left">© 2026 Tboywurld Web Studio. All rights reserved.</p>
        
        <div className="flex gap-6 justify-center">
          <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-accent transition-colors" aria-label="Instagram">
            <Instagram size={20} />
          </a>
          <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-accent transition-colors" aria-label="WhatsApp">
            <MessageCircle size={20} />
          </a>
          <a href={`mailto:${CONTACT.email}`} className="text-gray-500 hover:text-accent transition-colors" aria-label="Email">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => { 
    setTimeout(() => setAppReady(true), 100); 
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen selection:bg-accent/40 text-white overflow-x-hidden">
      <AnimatePresence>
        {!appReady && (
          <motion.div
            key="loader"
            initial={{ scaleY: 1 }}
            exit={{ scaleY: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
            style={{ transformOrigin: 'top' }}
            className="fixed inset-0 bg-[#0a0a0a] z-[9999]"
          />
        )}
      </AnimatePresence>

      <CursorGlow />
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader-legacy"
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
