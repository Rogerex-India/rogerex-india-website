import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const portfolioProjects = [
  {
    id: 1,
    span: 'md:col-span-8 md:row-span-2',
    tags: ['FINTECH', 'BLOCKCHAIN'],
    title: 'VaultX Banking Core',
    desc: 'A high-performance digital core banking solution built for scalability and secure real-time transactions.',
    gradient: 'linear-gradient(to top, rgba(11,14,20,0.9) 0%, rgba(11,14,20,0.3) 60%, transparent 100%)',
    bg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600',
    large: true,
  },
  {
    id: 2,
    span: 'md:col-span-4 md:row-span-1',
    title: 'Nexus AI',
    sub: 'AI & AUTOMATION',
    gradient: 'linear-gradient(to top, rgba(11,14,20,0.8) 0%, transparent 60%)',
    bg: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    span: 'md:col-span-4 md:row-span-2',
    title: 'Aura Boutique',
    sub: 'E-COMMERCE',
    tags: ['REACT NATIVE', 'NODE.JS'],
    gradient: 'linear-gradient(to top, rgba(11,14,20,0.9) 0%, transparent 60%)',
    bg: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 4,
    span: 'md:col-span-8 md:row-span-1',
    title: 'SkyStack Cloud',
    sub: 'CLOUD PLATFORM',
    desc: 'Enterprise-grade cloud migration for a global logistics leader.',
    gradient: 'linear-gradient(to right, rgba(11,14,20,0.95) 0%, transparent 60%)',
    bg: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1400',
  },
];

const testimonials = [
  {
    quote: '"Rogerex India transformed our legacy systems into a modern cloud-native powerhouse. Their technical depth and mission-driven approach are unmatched."',
    name: 'Marcus Chen',
    role: 'CTO, FINSYNC TECH',
  },
  {
    quote: '"The UI/UX design team at Rogerex has a rare eye for detail. They didn\'t just build an app — they crafted an experience that our users love."',
    name: 'Sarah Jenkins',
    role: 'FOUNDER, AURA RETAIL',
  },
];

const categories = ['All Projects', 'Fintech', 'AI Solutions', 'E-commerce', 'Cloud Platforms'];

const Portfolio = () => {
  return (
    <>
      <main>
        {/* ── Hero ── */}
        <section
          className="relative overflow-hidden"
          style={{ background: '#10131a', padding: '96px 32px 64px' }}
        >
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 300, borderRadius: '50%', background: 'rgba(37,99,235,0.15)', filter: 'blur(100px)', pointerEvents: 'none' }} />
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

          <div className="relative z-10 max-w-container-max mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full mb-6" style={{
              padding: '6px 16px', background: '#1d2026',
              border: '1px solid rgba(67,70,85,0.5)',
            }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#7bd0ff' }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#a4c9ff', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Our Portfolio</span>
            </div>
            <h1 style={{ fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, letterSpacing: '-0.025em', color: '#e0e2eb', marginBottom: 20, lineHeight: 1.1 }}>
              Showcasing our{' '}
              <span className="text-gradient">Technical Craftsmanship</span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.65, color: '#8d90a0', maxWidth: 600 }}>
              Explore our journey of transforming ambitious ideas into scalable digital realities across Fintech, AI, and Enterprise solutions.
            </p>
          </div>
        </section>

        {/* ── Category Filter ── */}
        <section style={{ background: '#10131a', padding: '0 32px 32px' }}>
          <div className="max-w-container-max mx-auto flex flex-wrap gap-3">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className="rounded-full font-medium transition-all duration-200"
                style={{
                  padding: '8px 20px', fontSize: 14,
                  background: i === 0 ? '#2563eb' : '#191c22',
                  color: i === 0 ? '#eeefff' : '#c3c6d7',
                  border: i === 0 ? 'none' : '1px solid rgba(67,70,85,0.4)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (i !== 0) {
                    e.currentTarget.style.borderColor = 'rgba(180,197,255,0.3)';
                    e.currentTarget.style.color = '#e0e2eb';
                  }
                }}
                onMouseLeave={(e) => {
                  if (i !== 0) {
                    e.currentTarget.style.borderColor = 'rgba(67,70,85,0.4)';
                    e.currentTarget.style.color = '#c3c6d7';
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* ── Portfolio Bento Grid ── */}
        <section style={{ background: '#10131a', padding: '0 32px 80px' }}>
          <div
            className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-6"
            style={{ gridAutoRows: '280px' }}
          >
            {portfolioProjects.map((proj) => (
              <div
                key={proj.id}
                className={`${proj.span} group relative overflow-hidden rounded-[24px]`}
                style={{
                  border: '1px solid rgba(67,70,85,0.4)',
                  cursor: 'pointer',
                }}
              >
                {/* BG image */}
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-110 bg-cover bg-center"
                  style={{ backgroundImage: `url('${proj.bg}')` }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 z-10" style={{ background: proj.gradient }} />
                {/* Border glow on hover */}
                <div
                  className="absolute inset-0 z-20 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: 'inset 0 0 0 1px rgba(180,197,255,0.2)' }}
                />

                {/* Content */}
                {proj.large ? (
                  <div
                    className="absolute bottom-0 left-0 p-8 z-30 w-full transition-transform duration-300"
                    style={{ transform: 'translateY(4px)' }}
                  >
                    <div className="flex gap-2 mb-3">
                      {proj.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg"
                          style={{
                            padding: '4px 10px', fontSize: 10, fontWeight: 600,
                            background: 'rgba(180,197,255,0.15)', color: '#b4c5ff',
                            border: '1px solid rgba(180,197,255,0.2)',
                            backdropFilter: 'blur(8px)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8, letterSpacing: '-0.02em' }}>{proj.title}</h3>
                    <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', maxWidth: 500, marginBottom: 20, lineHeight: 1.6 }}>
                      {proj.desc}
                    </p>
                    <button className="flex items-center gap-2 font-semibold" style={{ color: '#b4c5ff', fontSize: 14 }}>
                      View Case Study <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="absolute inset-0 p-6 flex flex-col justify-end z-30">
                    <h4 style={{ fontSize: 20, fontWeight: 600, color: '#fff', marginBottom: 4 }}>{proj.title}</h4>
                    {proj.sub && (
                      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.06em', fontWeight: 600 }}>{proj.sub}</p>
                    )}
                    {proj.desc && (
                      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 6, lineHeight: 1.5 }}>{proj.desc}</p>
                    )}
                    {proj.tags && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {proj.tags.map((tag) => (
                          <span key={tag} style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: '0.04em', padding: '3px 8px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 4 }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section style={{ background: '#0b0e14', padding: '80px 32px', borderTop: '1px solid rgba(67,70,85,0.3)' }}>
          <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-4">
              <div className="inline-flex items-center gap-2 rounded-full mb-5" style={{
                padding: '6px 16px', background: '#191c22',
                border: '1px solid rgba(67,70,85,0.5)',
              }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#a4c9ff', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Testimonials
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(24px,3vw,36px)', fontWeight: 600, letterSpacing: '-0.02em', color: '#e0e2eb', marginBottom: 16 }}>
                Client Success Stories
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: '#8d90a0' }}>
                Our commitment to "Customer Success" is at the heart of everything we build.
              </p>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map(({ quote, name, role }, i) => (
                <div
                  key={name}
                  className="rounded-[24px]"
                  style={{
                    padding: '32px',
                    background: '#191c22',
                    border: '1px solid rgba(67,70,85,0.4)',
                    marginTop: i === 1 ? '32px' : 0,
                    position: 'relative',
                  }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(180,197,255,0.15), transparent)' }} />
                  <span className="material-symbols-outlined" style={{ fontSize: 32, color: '#b4c5ff', opacity: 0.5, marginBottom: 16, display: 'block' }}>
                    format_quote
                  </span>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: '#c3c6d7', fontStyle: 'italic', marginBottom: 24 }}>
                    {quote}
                  </p>
                  <div className="flex items-center gap-3">
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(37,99,235,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#b4c5ff' }}>person</span>
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: '#e0e2eb' }}>{name}</p>
                      <p style={{ fontSize: 11, color: '#8d90a0', letterSpacing: '0.06em', fontWeight: 600 }}>{role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ background: '#10131a', padding: '80px 32px' }}>
          <div
            className="max-w-container-max mx-auto rounded-[40px] relative overflow-hidden text-center"
            style={{
              background: 'linear-gradient(135deg, #1d2026, #191c22)',
              border: '1px solid rgba(67,70,85,0.5)',
              padding: '80px 48px',
            }}
          >
            <div style={{ position: 'absolute', top: -40, left: '25%', width: 300, height: 200, borderRadius: '50%', background: 'rgba(37,99,235,0.2)', filter: 'blur(80px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(180,197,255,0.3), transparent)' }} />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 600, letterSpacing: '-0.02em', color: '#e0e2eb', marginBottom: 16 }}>
                Ready to build your next big idea?
              </h2>
              <p style={{ fontSize: 18, color: '#8d90a0', marginBottom: 40, lineHeight: 1.6 }}>
                Let's transform your vision into a scalable technology solution today.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-300"
                style={{
                  padding: '14px 36px', fontSize: 15,
                  background: '#2563eb', color: '#eeefff',
                  boxShadow: '0 0 32px rgba(37,99,235,0.45)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 52px rgba(37,99,235,0.65)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 32px rgba(37,99,235,0.45)'; }}
              >
                Start Your Project
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Portfolio;
