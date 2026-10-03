/// <reference types="vite/client" />
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Code2,
  Instagram,
  Layout,
  Mail,
  Menu,
  MessageCircle,
  PenTool,
  Send,
  Smartphone,
  X,
} from 'lucide-react';
import emailjs from '@emailjs/browser';

const CONTACT = {
  phone: '+234 916 105 2803',
  whatsapp: 'https://wa.me/2349161052803',
  email: 'btee7746@gmail.com',
  instagram: 'https://www.instagram.com/tboywurldwebstudio/',
  handle: '@tboywurldwebstudio',
};

const projects = [
  {
    title: 'Swift Ocean Lounge',
    category: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=85&w=1200',
    link: 'https://swiftoceanloungeandgrill.netlify.app/',
    number: '01',
  },
  {
    title: "Jeff's Flowers London",
    category: 'Floristry',
    image: 'https://jeffflowers.vercel.app/assets/luxury_flower_hero_1780400080160-CsJkWKz9.png',
    link: 'https://jeffflowers.vercel.app/',
    number: '02',
  },
  {
    title: 'James Boswell Hair',
    category: 'Personal care',
    image: '/james-boswell-preview.png',
    link: 'https://jamesboswellhair.netlify.app/',
    number: '03',
  },
  {
    title: 'Stirchley Spoon',
    category: 'Food & drink',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=800',
    link: 'https://stirchleyspooncafe.vercel.app/',
    number: '04',
  },
  {
    title: 'Four Walls Painting & Decorating',
    category: 'Painting & decorating',
    image: 'https://four-walls-painting-decorating-a6j5.vercel.app/assets/living_room_decorated_1784545234381-DHTSvSMD.jpg',
    link: 'https://four-walls-painting-decorating-a6j5.vercel.app/',
    number: '05',
  },
  {
    title: 'Haven & Co. Realty',
    category: 'Real estate',
    image: 'https://havenco-two.vercel.app/images/estate-exterior.webp',
    link: 'https://havenco-two.vercel.app/',
    number: '06',
  },
  {
    title: 'NIDSUG Delta State Chapter',
    category: 'Education & community',
    image: 'https://nidsug-delta-portal.vercel.app/_next/image?url=%2Fnidsug-hero.png&w=1080&q=75',
    link: 'https://nidsug-delta-portal.vercel.app/',
    number: '07',
  },
  {
    title: 'NairaPass',
    category: 'Education & technology',
    image: '/nairapass-preview.png',
    link: 'https://nairapass.com.ng/',
    number: '08',
  },
  {
    title: 'AJ EMPIRE — The Nail Boss',
    category: 'Beauty & wellness',
    image: 'https://ajempirenailboss.vercel.app/assets/hero-nails-DOsrPHAC.jpg',
    link: 'https://ajempirenailboss.vercel.app/',
    number: '09',
  },
  {
    title: "D. Webb's Plumbing",
    category: 'Plumbing & home services',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&q=85&w=1200',
    link: 'https://d-webb-s-plumbing.vercel.app/',
    number: '10',
  },
  {
    title: 'Astoria Kitchen',
    category: 'Restaurant & dining',
    image: 'https://astoriakitchenmcr.vercel.app/assets/astoria_hero_banner_1780193850202-DAkN2ftN.png',
    link: 'https://astoriakitchenmcr.vercel.app/',
    number: '11',
  },
  {
    title: 'Hale Road Dental Practice',
    category: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
    link: 'https://hale-road-dental-practice.vercel.app/',
    number: '12',
  },
];

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

function FadeIn({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  key?: React.Key;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#top"
      aria-label="Tboywurld Web Studio home"
      className={`inline-flex items-center gap-3 ${light ? 'text-paper' : 'text-ink'}`}
    >
      <span className="grid size-10 place-items-center bg-ink text-paper font-display text-xl font-bold">
        T.
      </span>
      <span className="leading-tight">
        <span className="block font-display text-[0.95rem] font-bold tracking-tight">Tboywurld</span>
        <span className={`mt-0.5 block text-[0.58rem] font-semibold uppercase tracking-[0.2em] ${light ? 'text-paper/55' : 'text-ink/55'}`}>
          Web studio
        </span>
      </span>
    </a>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-paper/95 backdrop-blur-md">
      <nav className="site-width flex h-[76px] items-center justify-between" aria-label="Main navigation">
        <Brand />
        <div className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
          <a href="#contact" className="button button-dark !min-h-11 !px-5 !text-sm">
            Let’s talk <ArrowUpRight size={16} />
          </a>
        </div>
        <button
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="grid size-11 place-items-center border border-ink/15 md:hidden"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-ink/10 bg-paper md:hidden"
          >
            <div className="site-width flex flex-col py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-ink/10 py-4 font-display text-lg"
                >
                  {link.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)} className="button button-dark mt-5">
                Start a conversation <ArrowUpRight size={17} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-44">
      <div className="site-width">
        <div className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink/55">
          <span className="size-2 rounded-full bg-terracotta" />
          Independent web design & development
        </div>
        <div className="grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl font-display text-[clamp(3.4rem,6vw,6rem)] font-medium leading-[0.92] tracking-[-0.075em]"
            >
              Good websites
              <br />
              make room for
              <br />
              <span className="font-editorial italic text-terracotta">what’s next.</span>
            </motion.h1>
            <FadeIn delay={0.18} className="mt-8 max-w-xl">
              <p className="text-lg leading-relaxed text-ink/65 md:text-xl">
                Thoughtful websites for ambitious businesses—designed to tell your story clearly and help the right people take action.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href="#work" className="button button-dark">
                  Explore selected work <ArrowUpRight size={17} />
                </a>
                <a href="#contact" className="text-link">
                  Tell me about your project <ArrowRight size={16} />
                </a>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} className="relative mx-auto w-full max-w-[530px] lg:mb-2">
            <div className="relative aspect-[1.08/1] overflow-hidden bg-forest text-paper">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=85&w=1400"
                alt="Developer's laptop and workspace during a web design project"
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#211038]/95 via-[#211038]/30 to-[#211038]/15" />
              <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-8">
                <div className="flex items-center justify-between border border-white/25 bg-[#211038]/30 px-4 py-3 text-[0.62rem] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm">
                  <span>Design · Develop · Launch</span>
                  <span className="text-saffron">T. / Studio</span>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.17em] text-saffron">
                      Thoughtful digital work
                    </p>
                    <p className="mt-2 max-w-[16rem] font-editorial text-3xl leading-tight sm:text-4xl">
                      Built around your next big idea.
                    </p>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-ink">
                    <ArrowDown size={19} />
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink/50">
              <span>Designing for the web</span>
              <span>Lagos, Nigeria · Worldwide</span>
            </div>
          </FadeIn>
        </div>
        <div className="mt-20 flex items-center gap-4 border-t border-ink/15 pt-5 text-xs font-semibold uppercase tracking-[0.16em] text-ink/45 md:mt-28">
          <span>Design that works as hard as you do</span>
          <span className="h-px flex-1 bg-ink/15" />
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className={`mb-12 md:mb-16 ${light ? 'text-paper' : 'text-ink'}`}>
      <p className={`eyebrow ${light ? 'text-saffron' : 'text-terracotta'}`}>{eyebrow}</p>
      <h2 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-[-0.055em] md:text-6xl">
        {title}
      </h2>
      {description && (
        <p className={`mt-5 max-w-2xl text-base leading-relaxed md:text-lg ${light ? 'text-paper/65' : 'text-ink/60'}`}>
          {description}
        </p>
      )}
    </div>
  );
}

function WorkSection() {
  const categories = ['All work', ...new Set(projects.map((project) => project.category))];
  const [activeCategory, setActiveCategory] = useState('All work');
  const visibleProjects = activeCategory === 'All work'
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="work" className="section-space bg-paper-deep">
      <div className="site-width">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title={<>Small details. <span className="font-editorial italic text-terracotta">Strong</span> first impressions.</>}
            description="A selection of websites created for businesses across hospitality, food, beauty and personal care."
          />
          <span className="mb-14 hidden text-xs font-semibold uppercase tracking-[0.16em] text-ink/45 md:block">
            {String(projects.length).padStart(2, '0')} projects
          </span>
        </div>

        <div className="mb-9 flex flex-wrap gap-2" aria-label="Filter projects by category">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={`filter-chip ${activeCategory === category ? 'filter-chip-active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-x-6 gap-y-11 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.a
                layout
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.3, delay: index * 0.035 }}
                className="project-card group"
              >
                <div className="relative aspect-[1.28/1] overflow-hidden bg-[#ddd8cc]">
                  <img
                    src={project.image}
                    alt={`${project.title} website project`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                  />
                  <span className="absolute left-4 top-4 bg-paper px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink">
                    {project.category}
                  </span>
                  <span className="absolute bottom-4 right-4 grid size-10 place-items-center rounded-full bg-paper text-ink transition-colors group-hover:bg-terracotta group-hover:text-white">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-3 border-b border-ink/15 py-4">
                  <h3 className="font-display text-xl font-medium tracking-tight">{project.title}</h3>
                  <span className="text-xs font-semibold tabular-nums text-ink/40">{project.number}</span>
                </div>
                <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink/55 transition-colors group-hover:text-terracotta">
                  Visit website <ArrowUpRight size={14} />
                </span>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

const services = [
  {
    number: '01',
    title: 'Website design',
    description: 'A visual direction that feels unmistakably yours and makes your business easy to understand.',
    icon: <PenTool size={21} />,
  },
  {
    number: '02',
    title: 'Web development',
    description: 'A considered, responsive website built to work smoothly across screens and devices.',
    icon: <Code2 size={21} />,
  },
  {
    number: '03',
    title: 'Landing pages',
    description: 'A focused page with a clear message and a natural next step for your visitors.',
    icon: <Layout size={21} />,
  },
  {
    number: '04',
    title: 'Responsive design',
    description: 'Thoughtful layouts and interactions that feel right on mobile, tablet and desktop.',
    icon: <Smartphone size={21} />,
  },
];

function ServicesSection() {
  return (
    <section id="services" className="section-space bg-forest">
      <div className="site-width">
        <SectionHeading
          eyebrow="What I do"
          title={<>A good-looking site is just the <span className="font-editorial italic text-saffron">beginning.</span></>}
          description="Every part of your website should earn its place—from the first headline to the final click."
          light
        />
        <div className="grid border-l border-t border-paper/20 sm:grid-cols-2">
          {services.map((service) => (
            <FadeIn key={service.number}>
              <article className="h-full min-h-56 border-b border-r border-paper/20 p-6 md:p-9">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.16em] text-saffron">{service.number}</span>
                  <span className="text-paper/70">{service.icon}</span>
                </div>
                <h3 className="mt-10 font-display text-2xl font-medium tracking-tight text-paper">{service.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-paper/60 md:text-base">{service.description}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const steps = [
    ['01', 'Listen', 'We start with your goals, your customers and what makes your business different.'],
    ['02', 'Plan', 'Together we shape the content, structure and visual direction before the build.'],
    ['03', 'Build', 'I develop the site, share progress and make thoughtful refinements along the way.'],
    ['04', 'Launch', 'We review the details, get your website live and make sure you know what comes next.'],
  ];

  return (
    <>
      <section id="about" className="section-space">
        <div className="site-width grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="eyebrow text-terracotta">A little about the studio</p>
            <h2 className="mt-5 font-display text-4xl font-medium leading-[1.08] tracking-[-0.055em] md:text-5xl">
              Independent by choice. <span className="font-editorial italic text-terracotta">Personal</span> by design.
            </h2>
          </div>
          <div className="max-w-2xl">
            <p className="text-xl leading-relaxed text-ink/80 md:text-2xl">
              Tboywurld is an independent web studio in Nigeria, working with businesses near and far.
            </p>
            <p className="mt-6 leading-relaxed text-ink/60">
              You work directly with me from the first conversation to launch. That means clear communication, considered decisions and a website shaped around your business—not a one-size-fits-all template.
            </p>
            <a href="#contact" className="text-link mt-8">
              Get to know how I work <ArrowRight size={16} />
            </a>
            <div className="relative mt-9 aspect-[2.1/1] overflow-hidden bg-paper-deep">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=85&w=1200"
                alt="Creative team working together around a laptop"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <span className="absolute bottom-4 left-4 bg-white/95 px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink">
                Collaborative by nature
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-[#eee9df] py-16 md:py-24">
        <div className="site-width">
          <div className="mb-10 flex flex-col justify-between gap-4 md:mb-14 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-terracotta">A clear process</p>
              <h2 className="mt-4 font-display text-4xl font-medium tracking-[-0.05em] md:text-5xl">
                From first chat to launch.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-ink/60 md:text-base">
              No mystery hand-offs. You’ll know what’s happening, what I need from you and what’s coming next.
            </p>
          </div>
          <div className="grid border-l border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([number, title, description]) => (
              <article key={number} className="min-h-52 border-b border-r border-ink/15 p-6 md:p-7">
                <span className="text-xs font-semibold tracking-[0.16em] text-terracotta">{number}</span>
                <h3 className="mt-8 font-display text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function FAQSection() {
  const questions = [
    {
      question: 'How do we get started?',
      answer: 'Send a short note about your business and what you need. We’ll arrange a conversation to understand the project, answer your questions and agree on the right next steps.',
    },
    {
      question: 'How long will my website take?',
      answer: 'Timing depends on the scope, content and features. Once we’ve discussed your needs, I’ll share a realistic timeline before any work begins.',
    },
    {
      question: 'Can you work with businesses outside Nigeria?',
      answer: 'Yes. Tboywurld is based in Nigeria and works with clients remotely. We can keep in touch through email and online calls.',
    },
    {
      question: 'Will my website work on mobile?',
      answer: 'Yes. Responsive layouts are part of the process, so your site is designed to work across mobile, tablet and desktop screens.',
    },
    {
      question: 'Can you update or redesign an existing site?',
      answer: 'Yes. Share your current website and what you’d like to improve, and we can discuss the best approach for a refresh or redesign.',
    },
  ];
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);

  return (
    <section className="section-space">
      <div className="site-width grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
        <div>
          <p className="eyebrow text-terracotta">Good to know</p>
          <h2 className="mt-4 font-display text-4xl font-medium tracking-[-0.05em] md:text-5xl">A few things you might be wondering.</h2>
          <p className="mt-5 leading-relaxed text-ink/60">
            Still have a question? <a href="#contact" className="underline decoration-terracotta underline-offset-4">Just ask me.</a>
          </p>
        </div>
        <div className="border-t border-ink/15">
          {questions.map((item, index) => (
            <div key={item.question} className="border-b border-ink/15">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-5 py-5 text-left md:py-6"
                aria-expanded={openQuestion === index}
                onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
              >
                <span className="font-display text-lg font-medium md:text-xl">{item.question}</span>
                <ChevronDown
                  size={19}
                  className={`shrink-0 text-terracotta transition-transform ${openQuestion === index ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {openQuestion === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl pb-6 pr-10 leading-relaxed text-ink/60">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [isSending, setIsSending] = useState(false);
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setNotice({
        type: 'error',
        message: 'The contact form is not configured yet. Please email me directly or get in touch on WhatsApp.',
      });
      return;
    }

    setIsSending(true);
    setNotice(null);
    try {
      await emailjs.sendForm(serviceId, templateId, form, publicKey);
      setNotice({ type: 'success', message: 'Thanks for reaching out. Your message has been sent.' });
      form.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      setNotice({ type: 'error', message: 'Your message could not be sent. Please try again or contact me directly.' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="bg-forest py-20 md:py-28">
      <div className="site-width grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="text-paper">
          <p className="eyebrow text-saffron">Have a project in mind?</p>
          <h2 className="mt-5 max-w-xl font-display text-5xl font-medium leading-[1.02] tracking-[-0.06em] md:text-7xl">
            Let’s make it <span className="font-editorial italic text-saffron">happen.</span>
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-paper/65">
            Tell me a little about your business and what you’re looking to build. I’ll be in touch to talk through the next steps.
          </p>
          <div className="mt-10 space-y-4">
            <a href={`mailto:${CONTACT.email}`} className="contact-link">
              <Mail size={18} /> {CONTACT.email}
            </a>
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="contact-link">
              <MessageCircle size={18} /> {CONTACT.phone}
            </a>
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="contact-link">
              <Instagram size={18} /> {CONTACT.handle}
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-paper p-6 sm:p-8 md:p-10">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="form-label">
              Your name
              <input className="form-input" type="text" name="name" autoComplete="name" placeholder="Name" required />
            </label>
            <label className="form-label">
              Email address
              <input className="form-input" type="email" name="email" autoComplete="email" placeholder="you@example.com" required />
            </label>
          </div>
          <label className="form-label mt-5">
            What can I help with?
            <select className="form-input" name="subject" defaultValue="New website" required>
              <option>New website</option>
              <option>Website redesign</option>
              <option>Landing page</option>
              <option>Something else</option>
            </select>
          </label>
          <label className="form-label mt-5">
            A little about your project
            <textarea
              className="form-input min-h-32 resize-y"
              name="message"
              placeholder="What are you looking to create?"
              required
            />
          </label>
          {notice && (
            <p
              role="status"
              className={`mt-5 border px-4 py-3 text-sm leading-relaxed ${notice.type === 'success' ? 'border-forest/20 bg-forest/5 text-forest' : 'border-terracotta/30 bg-terracotta/5 text-terracotta'}`}
            >
              {notice.message}
            </p>
          )}
          <button type="submit" disabled={isSending} className="button button-dark mt-6 w-full disabled:cursor-wait disabled:opacity-60">
            {isSending ? 'Sending your message…' : 'Send project enquiry'}
            {isSending ? <Send size={16} /> : <ArrowUpRight size={17} />}
          </button>
          <p className="mt-4 flex items-center gap-2 text-xs text-ink/50">
            <Check size={14} /> Your details are only used to respond to your enquiry.
          </p>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-forest text-paper">
      <div className="site-width flex flex-col gap-8 border-t border-paper/20 py-7 sm:flex-row sm:items-center sm:justify-between">
        <Brand light />
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-paper/60">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-saffron">
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-xs text-paper/50">© {new Date().getFullYear()} Tboywurld Web Studio</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />
      <main>
        <Hero />
        <WorkSection />
        <ServicesSection />
        <AboutSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
