import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/* ─── Animation presets ─────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
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
const portfolioProjects = [
  {
    id: 1, span: 'md:col-span-8 md:row-span-2', tags: ['FINTECH', 'BLOCKCHAIN'],
    title: 'VaultX Banking Core',
    desc: 'A high-performance digital core banking solution built for scalability and secure real-time transactions.',
    gradient: 'linear-gradient(to top, rgba(11,14,20,0.9) 0%, rgba(11,14,20,0.3) 60%, transparent 100%)',
    bg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600', large: true,
  },
  {
    id: 2, span: 'md:col-span-4 md:row-span-1',
    title: 'Nexus AI', sub: 'AI & AUTOMATION',
    gradient: 'linear-gradient(to top, rgba(11,14,20,0.8) 0%, transparent 60%)',
    bg: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3, span: 'md:col-span-4 md:row-span-2',
    title: 'Aura Boutique', sub: 'E-COMMERCE', tags: ['REACT NATIVE', 'NODE.JS'],
    gradient: 'linear-gradient(to top, rgba(11,14,20,0.9) 0%, transparent 60%)',
    bg: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 4, span: 'md:col-span-8 md:row-span-1',
    title: 'SkyStack Cloud', sub: 'CLOUD PLATFORM',
    desc: 'Enterprise-grade cloud migration for a global logistics leader.',
    gradient: 'linear-gradient(to right, rgba(11,14,20,0.95) 0%, transparent 60%)',
    bg: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1400',
  },
];

const testimonials = [
  {
    quote: '"Rogerex India transformed our legacy systems into a modern cloud-native powerhouse. Their technical depth and mission-driven approach are unmatched."',
    name: 'Marcus Chen', role: 'CTO, FINSYNC TECH',
  },
  {
    quote: '"The team delivered our mobile app weeks ahead of schedule without sacrificing security or design elegance. Truly exceptional IT partners."',
    name: 'Sarah Jenkins', role: 'VP PRODUCT, AURA INC.',
  },
];

const categories = ['ALL WORK', 'ENTERPRISE', 'MOBILE', 'AI & AUTOMATION', 'CLOUD'];

const Portfolio = () => (
  <>
    <main>
      {/* ══ HERO ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden transition-colors duration-300" style={{ background: 'var(--bg-main)', padding: '96px 32px 64px' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 350, borderRadius: '50%', background: 'var(--orb-primary)', filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

        <motion.div
          className="relative z-10 max-w-container-max mx-auto text-center"
          initial="hidden" animate="show"
          variants={stagger(0.14, 0.05)}
        >
          <motion.div variants={fadeIn} className="inline-flex items-center gap-2 rounded-full mb-6" style={{ padding: '6px 16px', background: 'var(--bg-pill)', border: '1px solid var(--border-color)' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#2563eb' }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#2563eb', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Selected Works</span>
          </motion.div>

          <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-main)', marginBottom: 20, lineHeight: 1.08 }}>
            Engineered for <span className="text-gradient">Impact</span>
          </motion.h1>

          <motion.p variants={fadeUp} style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--text-muted)', maxWidth: 540, margin: '0 auto 40px' }}>
            Explore our showcase of digital solutions built with technical precision, scalability, and modern aesthetic design.
          </motion.p>

          {/* Filter Pills */}
          <motion.div variants={stagger(0.08)} className="flex flex-wrap justify-center gap-2">
            {categories.map((cat, i) => (
              <motion.button
                key={cat}
                variants={fadeScale}
                whileTap={{ scale: 0.95 }}
                className="rounded-full font-semibold transition-all duration-200"
                style={{
                  padding: '8px 20px', fontSize: 12, letterSpacing: '0.06em',
                  background: i === 0 ? '#2563eb' : 'var(--bg-pill)',
                  color: i === 0 ? '#eeefff' : 'var(--text-muted)',
                  border: i === 0 ? 'none' : '1px solid var(--border-color)',
                  cursor: 'pointer',
                  boxShadow: i === 0 ? '0 0 20px rgba(37,99,235,0.4)' : 'none',
                }}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ══ BENTO GRID ═════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-main)', padding: '0 32px 80px' }} className="transition-colors duration-300">
        <div className="max-w-container-max mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-12 gap-6"
            style={{ autoRows: '300px' }}
            initial="hidden" whileInView="show" viewport={VP}
            variants={stagger(0.14)}
          >
            {portfolioProjects.map((p) => (
              <motion.div
                key={p.id}
                variants={fadeScale}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className={`relative overflow-hidden rounded-[24px] group ${p.span}`}
                style={{ border: '1px solid var(--border-color)', minHeight: 280, boxShadow: '0 8px 32px var(--shadow-color)' }}
              >
                {/* Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${p.bg}')` }}
                />
                <div className="absolute inset-0" style={{ background: p.gradient }} />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between" style={{ padding: '32px' }}>
                  {/* Top tags */}
                  <div className="flex flex-wrap gap-2">
                    {p.tags?.map((t) => (
                      <span key={t} className="rounded-full" style={{ padding: '4px 12px', fontSize: 10, fontWeight: 700, background: 'rgba(11,14,20,0.75)', border: '1px solid rgba(255,255,255,0.2)', color: '#eeefff', letterSpacing: '0.08em', backdropFilter: 'blur(8px)' }}>
                        {t}
                      </span>
                    ))}
                    {p.sub && (
                      <span className="rounded-full" style={{ padding: '4px 12px', fontSize: 10, fontWeight: 700, background: 'rgba(11,14,20,0.75)', border: '1px solid rgba(255,255,255,0.2)', color: '#eeefff', letterSpacing: '0.08em', backdropFilter: 'blur(8px)' }}>
                        {p.sub}
                      </span>
                    )}
                  </div>

                  {/* Bottom title & desc */}
                  <div>
                    <h3 style={{ fontSize: p.large ? 28 : 22, fontWeight: 700, color: '#fff', marginBottom: p.desc ? 8 : 0, letterSpacing: '-0.02em' }}>
                      {p.title}
                    </h3>
                    {p.desc && <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', maxWidth: 480, lineHeight: 1.6 }}>{p.desc}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ═════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-alt)', padding: '80px 32px', borderTop: '1px solid var(--border-color-subtle)' }} className="transition-colors duration-300">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Left label */}
          <motion.div
            className="md:col-span-4"
            initial="hidden" whileInView="show" viewport={VP}
            variants={fadeUp}
          >
            <div className="inline-flex items-center gap-2 rounded-full mb-5" style={{ padding: '6px 16px', background: 'var(--bg-pill)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#2563eb', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Testimonials</span>
            </div>
            <h2 style={{ fontSize: 'clamp(24px,3vw,36px)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-main)', marginBottom: 16 }}>Client Success Stories</h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-muted)' }}>Our commitment to "Customer Success" is at the heart of everything we build.</p>
          </motion.div>

          {/* Testimonial cards — staggered */}
          <motion.div
            className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden" whileInView="show" viewport={VP}
            variants={stagger(0.16)}
          >
            {testimonials.map(({ quote, name, role }, i) => (
              <motion.div
                key={name}
                variants={fadeScale}
                className="rounded-[24px] relative"
                style={{ padding: '32px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: '0 4px 24px var(--shadow-color)', marginTop: i === 1 ? '32px' : 0 }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.2), transparent)' }} />
                <span className="material-symbols-outlined" style={{ fontSize: 32, color: '#2563eb', opacity: 0.7, marginBottom: 16, display: 'block' }}>format_quote</span>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-main)', fontStyle: 'italic', marginBottom: 24 }}>{quote}</p>
                <div className="flex items-center gap-3">
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(37,99,235,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#2563eb' }}>person</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-main)' }}>{name}</p>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.06em', fontWeight: 600 }}>{role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ CTA ══════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-main)', padding: '80px 32px' }} className="transition-colors duration-300">
        <motion.div
          className="max-w-container-max mx-auto rounded-[40px] relative overflow-hidden text-center"
          initial="hidden" whileInView="show" viewport={VP}
          variants={fadeUp}
          style={{ background: 'var(--cta-gradient)', border: '1px solid var(--border-color)', padding: '80px 48px', boxShadow: '0 12px 40px var(--shadow-color)' }}
        >
          <div style={{ position: 'absolute', top: -40, left: '25%', width: 300, height: 200, borderRadius: '50%', background: 'var(--orb-primary)', filter: 'blur(80px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.3), transparent)' }} />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-main)', marginBottom: 16 }}>
              Ready to build your next big idea?
            </h2>
            <p style={{ fontSize: 18, color: 'var(--text-muted)', marginBottom: 40, lineHeight: 1.6 }}>
              Let's transform your vision into a scalable technology solution today.
            </p>
            <motion.div whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-300"
                style={{ padding: '14px 36px', fontSize: 15, background: '#2563eb', color: '#eeefff', boxShadow: '0 0 32px rgba(37,99,235,0.45)' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 52px rgba(37,99,235,0.65)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 32px rgba(37,99,235,0.45)'; }}
              >
                Start Your Project <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  </>
);

export default Portfolio;
