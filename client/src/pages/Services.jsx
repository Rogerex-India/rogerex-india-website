import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Layers, Globe, Smartphone, Palette, Bot, Cloud, Plug, Briefcase, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import ServiceCard from '../components/ServiceCard';

/* ─── Animation presets ─────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};
const fadeScale = {
  hidden: { opacity: 0, scale: 0.93 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE } },
};
function stagger(children = 0.14, delay = 0) {
  return { hidden: {}, show: { transition: { staggerChildren: children, delayChildren: delay } } };
}
const VP = { once: true, amount: 0.18, margin: '0px 0px -40px 0px' };

/* ─── Data ──────────────────────────────────────────────── */
const services = [
  { Icon: Code,       title: 'Software Development',  desc: 'Custom-built enterprise software designed to streamline operations and drive business efficiency at scale.' },
  { Icon: Layers,     title: 'Full Stack Development', desc: 'End-to-end development covering both front-end aesthetics and robust back-end architecture for seamless performance.' },
  { Icon: Globe,      title: 'Website Development',    desc: 'Responsive, high-performance websites that blend cutting-edge design with powerful functionality to engage users.' },
  { Icon: Smartphone, title: 'Mobile App Development', desc: 'Native and cross-platform mobile applications that provide intuitive user experiences on iOS and Android devices.' },
  { Icon: Palette,    title: 'UI/UX Design',           desc: 'User-centric design strategies that prioritize usability and visual delight to create meaningful digital interactions.' },
  { Icon: Bot,        title: 'AI & Automation',        desc: 'Intelligent systems and automated workflows that leverage machine learning to optimize productivity and data insights.' },
  { Icon: Cloud,      title: 'Cloud Solutions',        desc: 'Scalable cloud infrastructure and migration services ensuring high availability, security, and global accessibility.' },
  { Icon: Plug,       title: 'API Integration',        desc: 'Connecting diverse platforms through robust APIs to ensure data synchronization and unified digital ecosystems.' },
  { Icon: Briefcase,  title: 'IT Consulting',          desc: 'Strategic guidance on technology stacks, digital transformation, and future-ready IT roadmaps for growth.' },
];

const processSteps = [
  { num: '01', title: 'Discovery',   desc: "We dive deep into your requirements, business goals, and user needs to create a strategic project foundation." },
  { num: '02', title: 'Design',      desc: "Crafting intuitive user interfaces and architecting robust systems that prioritize performance and aesthetics." },
  { num: '03', title: 'Development', desc: "Agile engineering where we turn designs into functional, high-quality digital products with clean, scalable code." },
  { num: '04', title: 'Launch',      desc: "Rigorous testing followed by seamless deployment and continuous monitoring to ensure a successful release." },
];

const Services = () => (
  <>
    <main>
      {/* ══ HERO ═══════════════════════════════════════════════ */}
      <PageHero
        subtitle="OUR EXPERTISE"
        title="Comprehensive IT Solutions for the"
        highlightText="Digital Age"
        description="Transforming ideas into reliable technology solutions through innovation, quality, and technical precision."
      />

      {/* ══ SERVICES GRID ════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-main)', padding: '80px 32px' }} className="transition-colors duration-300">
        <div className="max-w-container-max mx-auto">
          {/* Section label */}
          <motion.div
            className="text-center mb-12"
            initial="hidden" whileInView="show" viewport={VP}
            variants={fadeUp}
          >
            <div className="inline-flex items-center gap-2 rounded-full mb-4" style={{ padding: '6px 16px', background: 'var(--bg-pill)', border: '1px solid var(--border-color)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#2563eb' }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#2563eb', letterSpacing: '0.1em', textTransform: 'uppercase' }}>What We Do</span>
            </div>
          </motion.div>

          {/* Staggered cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden" whileInView="show" viewport={VP}
            variants={stagger(0.12)}
          >
            {services.map(({ Icon, title, desc }) => (
              <motion.div key={title} variants={fadeUp}>
                <ServiceCard
                  icon={<Icon className="w-5 h-5" style={{ color: '#2563eb' }} />}
                  title={title}
                  description={desc}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ PROCESS STEPS ════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-alt)', padding: '80px 32px', borderTop: '1px solid var(--border-color-subtle)' }} className="transition-colors duration-300">
        <div className="max-w-container-max mx-auto">
          {/* Heading */}
          <motion.div
            className="text-center mb-16"
            initial="hidden" whileInView="show" viewport={VP}
            variants={fadeUp}
          >
            <div className="inline-flex items-center gap-2 rounded-full mb-5" style={{ padding: '6px 16px', background: 'var(--bg-pill)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#2563eb', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Our Approach</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
              The Way We Work
            </h2>
          </motion.div>

          {/* Process cards — staggered with a slight scale on entry */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden" whileInView="show" viewport={VP}
            variants={stagger(0.14)}
          >
            {processSteps.map(({ num, title, desc }) => (
              <motion.div
                key={num}
                variants={fadeScale}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="rounded-2xl relative"
                style={{ padding: '32px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px var(--shadow-color)' }}
              >
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#2563eb', color: '#eeefff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, marginBottom: 20, boxShadow: '0 0 16px rgba(37,99,235,0.4)' }}>
                  {num}
                </div>
                <h4 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-main)', marginBottom: 10 }}>{title}</h4>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--text-muted)' }}>{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ CTA ══════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-main)', padding: '80px 32px' }} className="transition-colors duration-300">
        <motion.div
          className="max-w-container-max mx-auto rounded-[32px] relative overflow-hidden text-center"
          initial="hidden" whileInView="show" viewport={VP}
          variants={fadeUp}
          style={{ background: 'var(--cta-gradient)', border: '1px solid var(--border-color)', padding: '80px 48px', boxShadow: '0 12px 40px var(--shadow-color)' }}
        >
          <div style={{ position: 'absolute', top: -40, left: '25%', width: 300, height: 200, borderRadius: '50%', background: 'var(--orb-primary)', filter: 'blur(80px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -60, right: '20%', width: 280, height: 200, borderRadius: '50%', background: 'var(--orb-secondary)', filter: 'blur(80px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.3), transparent)' }} />

          <div className="relative z-10">
            <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--text-main)', marginBottom: 16 }}>
              Ready to Build Something <span className="text-gradient">Extraordinary?</span>
            </h2>
            <p style={{ fontSize: 18, color: 'var(--text-muted)', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.6 }}>
              Let's collaborate to transform your vision into a high-impact digital reality. Our experts are ready to guide your journey.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <motion.div whileTap={{ scale: 0.97 }}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-300"
                  style={{ padding: '14px 32px', fontSize: 15, background: '#2563eb', color: '#eeefff', boxShadow: '0 0 32px rgba(37,99,235,0.45)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 52px rgba(37,99,235,0.65)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 32px rgba(37,99,235,0.45)'; }}
                >
                  Start Your Project <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <a href="mailto:rogerexindia@gmail.com" style={{ fontSize: 15, color: '#2563eb', fontWeight: 600, borderBottom: '1px solid rgba(37,99,235,0.3)', paddingBottom: 2 }}>
                rogerexindia@gmail.com
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  </>
);

export default Services;
