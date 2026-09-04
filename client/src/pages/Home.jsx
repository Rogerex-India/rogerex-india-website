import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Layers, Smartphone, Palette, Bot, Cloud, Lightbulb, BadgeCheck, Eye, Users, Gavel, GraduationCap, ArrowRight } from 'lucide-react';
import CallToAction from '../components/CallToAction';
import ServiceCard from '../components/ServiceCard';

/* ─── Reusable animation presets ────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
};
const slideLeft = {
  hidden: { opacity: 0, x: -48 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } },
};
const slideRight = {
  hidden: { opacity: 0, x: 48 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } },
};

function stagger(children = 0.14, delay = 0) {
  return {
    hidden: {},
    show: { transition: { staggerChildren: children, delayChildren: delay } },
  };
}

const VP = { once: true, amount: 0.18, margin: '0px 0px -40px 0px' };

/* ─── Data ───────────────────────────────────────────────────────── */
const techStack = [
  'React', 'Next.js', 'Node.js', 'Python', 'TypeScript',
  'AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes',
  'PostgreSQL', 'MongoDB', 'GraphQL', 'TailwindCSS', 'Figma',
  'React', 'Next.js', 'Node.js', 'Python', 'TypeScript',
  'AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes',
  'PostgreSQL', 'MongoDB', 'GraphQL', 'TailwindCSS', 'Figma',
];

const metrics = [
  { label: 'Heritage',  stat: '10+',  unit: 'Yrs', desc: 'Enterprise Tech Experience' },
  { label: 'Execution', stat: '250+', unit: '',    desc: 'Projects Successfully Shipped' },
  { label: 'Clients',   stat: '50+',  unit: '',    desc: 'Global Enterprise Clients' },
  { label: 'Uptime',    stat: '99.9', unit: '%',   desc: 'Average System Uptime' },
];

const coreServices = [
  { Icon: Code,       title: 'Software Development',  desc: 'Custom-built enterprise software that streamlines workflows and powers complex business logic with precision.' },
  { Icon: Layers,     title: 'Full Stack Development', desc: 'End-to-end web applications built with modern frameworks to ensure seamless performance from frontend to backend.' },
  { Icon: Smartphone, title: 'Mobile App Development', desc: 'Intuitive, high-performance iOS and Android applications that keep your users engaged on every device.' },
  { Icon: Palette,    title: 'UI/UX Design',           desc: 'User-centric design systems that prioritize clarity, aesthetics, and effortless interaction across digital interfaces.' },
  { Icon: Bot,        title: 'AI & Automation',        desc: 'Leveraging machine learning and RPA to automate manual tasks and unlock data-driven insights for your business.' },
  { Icon: Cloud,      title: 'Cloud Solutions',        desc: 'Secure, scalable, and cost-effective cloud infrastructure migration and management for modern enterprises.' },
];

const values = [
  { Icon: Lightbulb,     title: 'Innovation',          desc: 'Pushing boundaries with forward-thinking tech.' },
  { Icon: BadgeCheck,    title: 'Quality',             desc: 'Uncompromising standards in every line of code.' },
  { Icon: Eye,           title: 'Transparency',        desc: 'Open communication and clear project visibility.' },
  { Icon: Users,         title: 'Customer Success',    desc: "Our partners' growth is our primary metric." },
  { Icon: Gavel,         title: 'Integrity',           desc: 'Building trust through ethical and honest practices.' },
  { Icon: GraduationCap, title: 'Continuous Learning', desc: 'Always evolving with the latest tech trends.' },
];

const heroPills = [
  { always: true,  dotColor: '#2563eb', text: 'CRAFTING THE FUTURE' },
  { sm: true,      icon: 'verified_user', iconColor: '#2563eb', text: 'Enterprise Grade Architecture' },
  { md: true,      icon: 'bolt', iconColor: '#0284c7', text: 'AI-Driven Engineering' },
];

const heroBadges = [
  { icon: 'cloud_sync', color: '#2563eb', title: '99.9% Uptime',   sub: 'Cloud Infrastructure' },
  { icon: 'smart_toy',  color: '#0284c7', title: 'Autonomous AI',  sub: 'Model Pipelines' },
  { icon: 'security',   color: '#059669', title: 'Zero Trust',     sub: 'Hardened Systems' },
  { icon: 'speed',      color: '#d97706', title: '< 85ms Latency', sub: 'High-Load APIs' },
];

const Home = () => (
  <>
    {/* ══ HERO ════════════════════════════════════════════════════ */}
    <section
      className="relative overflow-hidden transition-colors duration-300"
      style={{ background: 'var(--bg-main)', minHeight: '90vh', display: 'flex', alignItems: 'center' }}
    >
      {/* Orbs */}
      <div style={{ position: 'absolute', top: 48, left: '50%', transform: 'translateX(-50%)', width: 700, height: 450, borderRadius: '50%', background: 'var(--orb-primary)', filter: 'blur(140px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 500, right: -128, width: 500, height: 400, borderRadius: '50%', background: 'var(--orb-secondary)', filter: 'blur(160px)', pointerEvents: 'none' }} />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-container-max mx-auto flex flex-col items-center text-center" style={{ padding: '96px 32px 80px' }}>

        {/* Pills row */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
          initial="hidden" animate="show"
          variants={stagger(0.14, 0.05)}
        >
          {heroPills.map(({ always, sm, md, dotColor, icon, iconColor, text }) => (
            <motion.div
              key={text}
              variants={fadeIn}
              className={`inline-flex items-center gap-2 rounded-full${sm ? ' hidden sm:inline-flex' : ''}${md ? ' hidden md:inline-flex' : ''}`}
              style={{
                padding: '6px 14px',
                background: 'var(--bg-pill)',
                border: '1px solid var(--border-color)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {dotColor && <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: dotColor }} />}
              {icon && <span className="material-symbols-outlined" style={{ fontSize: 14, color: iconColor }}>{icon}</span>}
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-main)', letterSpacing: '0.08em' }}>{text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial="hidden" animate="show"
          variants={fadeUp}
          style={{ maxWidth: 900, fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.03em', color: 'var(--text-main)', marginBottom: 24 }}
        >
          Building{' '}
          <span className="text-gradient">Digital Excellence</span>
          {' '}for Global Scale
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial="hidden" animate="show"
          variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE, delay: 0.22 } } }}
          style={{ maxWidth: 560, fontSize: 18, lineHeight: 1.65, color: 'var(--text-muted)', marginBottom: 48 }}
        >
          Empowering businesses with innovative, scalable, and reliable digital solutions
          tailored to navigate the complexities of the modern tech landscape.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
          initial="hidden" animate="show"
          variants={stagger(0.14, 0.35)}
        >
          <motion.div variants={fadeUp} whileTap={{ scale: 0.96 }}>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300"
              style={{ padding: '14px 32px', fontSize: 15, background: '#2563eb', color: '#eeefff', boxShadow: '0 0 32px rgba(37,99,235,0.45)' }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 52px rgba(37,99,235,0.65)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 32px rgba(37,99,235,0.45)'; }}
            >
              Get Started
              <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} whileTap={{ scale: 0.96 }}>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200"
              style={{ padding: '14px 32px', fontSize: 15, fontWeight: 500, background: 'var(--bg-pill)', color: 'var(--text-main)', border: '1px solid var(--border-color)' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#2563eb' }}>terminal</span>
              Explore Services
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating badges */}
        <motion.div
          className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-3"
          initial="hidden" animate="show"
          variants={stagger(0.12, 0.55)}
        >
          {heroBadges.map(({ icon, color, title, sub }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="flex items-center gap-3 rounded-xl transition-colors duration-300"
              style={{ padding: '12px 14px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: '0 4px 16px var(--shadow-color)', backdropFilter: 'blur(12px)' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20, color }}>{icon}</span>
              <div className="text-left">
                <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-main)' }}>{title}</p>
                <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* ══ METRICS BAR ══════════════════════════════════════════════ */}
    <section style={{ background: 'var(--bg-main)', padding: '0 32px 80px' }} className="transition-colors duration-300">
      <motion.div
        className="max-w-container-max mx-auto rounded-2xl"
        initial="hidden" whileInView="show" viewport={VP}
        variants={fadeUp}
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '40px 48px', boxShadow: '0 8px 32px var(--shadow-color)' }}
      >
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          variants={stagger(0.14)}
        >
          {metrics.map(({ label, stat, unit, desc }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="flex flex-col items-center lg:items-start text-center lg:text-left"
              style={{ padding: '16px 24px' }}
            >
              <span style={{ fontSize: 11, fontWeight: 600, color: '#2563eb', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{label}</span>
              <div className="flex items-baseline gap-1">
                <span style={{ fontSize: 48, fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1 }}>{stat}</span>
                {unit && <span style={{ fontSize: 20, fontWeight: 500, color: '#60A5FA' }}>{unit}</span>}
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 6 }}>{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>

    {/* ══ SERVICES GRID ════════════════════════════════════════════ */}
    <section id="services-grid" style={{ background: 'var(--bg-main)', padding: '80px 32px' }} className="transition-colors duration-300">
      <div className="max-w-container-max mx-auto">
        <motion.div className="text-center mb-16" initial="hidden" whileInView="show" viewport={VP} variants={fadeUp}>
          <div className="inline-flex items-center gap-2 rounded-full mb-5" style={{ padding: '6px 16px', background: 'var(--bg-pill)', border: '1px solid var(--border-color)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#2563eb' }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#2563eb', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Specialized Solutions</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-main)', marginBottom: 16 }}>Our Core Expertise</h2>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', maxWidth: 560, margin: '0 auto' }}>
            A comprehensive suite of digital services designed to scale your operations and enhance your competitive edge.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden" whileInView="show" viewport={VP}
          variants={stagger(0.12)}
        >
          {coreServices.map(({ Icon, title, desc }) => (
            <motion.div key={title} variants={fadeUp}>
              <ServiceCard
                variant="home"
                icon={<Icon className="w-5 h-5" style={{ color: '#2563eb' }} />}
                title={title}
                description={desc}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* ══ TECH STACK MARQUEE ════════════════════════════════════════ */}
    <section style={{ background: 'var(--bg-alt)', padding: '48px 0', overflow: 'hidden', borderTop: '1px solid var(--border-color-subtle)', borderBottom: '1px solid var(--border-color-subtle)' }} className="transition-colors duration-300">
      <div className="relative overflow-hidden">
        <div className="marquee-track">
          {techStack.map((tech, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2 rounded-full shrink-0"
              style={{ padding: '8px 20px', margin: '0 8px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', fontSize: 13, fontWeight: 500, color: 'var(--text-main)', whiteSpace: 'nowrap' }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563eb', display: 'inline-block', flexShrink: 0 }} />
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ══ ABOUT SNIPPET — slide from sides ═════════════════════════ */}
    <section style={{ background: 'var(--bg-main)', padding: '80px 32px' }} className="transition-colors duration-300">
      <motion.div
        className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        initial="hidden" whileInView="show" viewport={VP}
        variants={stagger(0.18)}
      >
        {/* Image from left */}
        <motion.div
          variants={slideLeft}
          className="rounded-[20px] overflow-hidden relative"
          style={{ aspectRatio: '1', border: '1px solid var(--border-color)', boxShadow: '0 8px 32px var(--shadow-color)' }}
        >
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800"
            alt="Rogerex team collaborating"
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(37,99,235,0.15) 0%, transparent 60%)' }} />
        </motion.div>

        {/* Text from right */}
        <motion.div variants={slideRight} style={{ paddingLeft: '24px' }}>
          <div className="inline-flex items-center gap-2 rounded-full mb-5" style={{ padding: '6px 14px', background: 'var(--bg-pill)', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#2563eb', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Our Identity</span>
          </div>
          <h2 style={{ fontSize: 'clamp(24px,3vw,36px)', fontWeight: 600, color: 'var(--text-main)', marginBottom: 16, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Innovative IT Consulting for the Global Market
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: 32 }}>
            Rogerex India is a premier IT services company dedicated to transforming complex business
            challenges into elegant digital solutions. We combine technical rigor with creative strategy
            to deliver high-impact software, cloud, and AI products.
          </p>
          <div className="grid grid-cols-2 gap-8">
            {[{ val: '10+', label: 'Years Experience' }, { val: '250+', label: 'Projects Delivered' }].map(({ val, label }) => (
              <div key={label}>
                <div style={{ fontSize: 40, fontWeight: 700, color: '#2563eb', letterSpacing: '-0.03em', lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 6 }}>{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>

    {/* ══ VALUES — stagger on scroll ════════════════════════════════ */}
    <section style={{ background: 'var(--bg-alt)', padding: '80px 32px', borderTop: '1px solid var(--border-color-subtle)' }} className="transition-colors duration-300">
      <div className="max-w-container-max mx-auto">
        <motion.div className="text-center mb-16" initial="hidden" whileInView="show" viewport={VP} variants={fadeUp}>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-main)', marginBottom: 12 }}>
            Values that Drive Excellence
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-muted)' }}>The DNA behind every solution we build.</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden" whileInView="show" viewport={VP}
          variants={stagger(0.12)}
        >
          {values.map(({ Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="rounded-2xl"
              style={{ padding: '32px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px var(--shadow-color)', cursor: 'default' }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(37,99,235,0.12)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, color: '#2563eb' }}>
                <Icon className="w-5 h-5" />
              </div>
              <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-main)', marginBottom: 8 }}>{title}</h4>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* ══ CTA ══════════════════════════════════════════════════════ */}
    <motion.div initial="hidden" whileInView="show" viewport={VP} variants={fadeUp}>
      <CallToAction
        title="Ready to transform your business?"
        description="Let's collaborate to build the digital future of your company. Contact our experts today for a free consultation."
        buttonNode={
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 rounded-full font-semibold transition-all duration-300"
            style={{ padding: '14px 36px', fontSize: 16, background: '#2563eb', color: '#eeefff', boxShadow: '0 0 32px rgba(37,99,235,0.45)' }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 52px rgba(37,99,235,0.65)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 32px rgba(37,99,235,0.45)'; }}
          >
            Contact Us Today
            <ArrowRight className="w-5 h-5" />
          </Link>
        }
      />
    </motion.div>
  </>
);

export default Home;
