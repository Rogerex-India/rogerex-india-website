import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Eye, BadgeCheck, Lightbulb, Gavel, Globe, TrendingUp, Users, GraduationCap, ArrowRight } from 'lucide-react';
import CallToAction from '../components/CallToAction';

const values = [
  { Icon: Lightbulb,     title: 'Innovation' },
  { Icon: BadgeCheck,    title: 'Quality' },
  { Icon: Eye,           title: 'Transparency' },
  { Icon: Users,         title: 'Customer Success' },
  { Icon: GraduationCap, title: 'Continuous Learning' },
  { Icon: Gavel,         title: 'Integrity' },
];

const whyUs = [
  { Icon: Globe,      title: 'Global Expertise',    desc: 'Serving clients across borders with a deep understanding of international tech standards and markets.' },
  { Icon: BadgeCheck, title: 'Certified Quality',   desc: 'Rigorous QA processes ensuring every line of code meets the highest benchmarks for performance.' },
  { Icon: TrendingUp, title: 'Agile Scale',         desc: 'Dynamic team structures that scale rapidly to meet the evolving demands of growing enterprises.' },
];

const leadership = [
  { name: 'Rohan Gupta',    role: 'Chief Technology Officer',    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600' },
  { name: 'Ananya Sharma',  role: 'Head of UX Design',           img: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?auto=format&fit=crop&q=80&w=600' },
  { name: 'Vikram Singh',   role: 'Head of AI & Automation',     img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600' },
  { name: 'Siddharth Rao',  role: 'Director of Operations',      img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600' },
];

const About = () => {
  return (
    <>
      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden" style={{ background: '#10131a', padding: '96px 32px 64px' }}>
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 350, borderRadius: '50%', background: 'rgba(37,99,235,0.15)', filter: 'blur(120px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -80, right: -80, width: 400, height: 300, borderRadius: '50%', background: 'rgba(0,117,159,0.1)', filter: 'blur(120px)', pointerEvents: 'none' }} />
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

          <div className="relative z-10 max-w-container-max mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full mb-6" style={{
              padding: '6px 16px', background: '#1d2026',
              border: '1px solid rgba(67,70,85,0.5)',
            }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#7bd0ff' }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#a4c9ff', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Who We Are</span>
            </div>
            <h1 style={{ fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#e0e2eb', marginBottom: 24, lineHeight: 1.08 }}>
              Building <span className="text-gradient">Digital Excellence</span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.65, color: '#8d90a0', maxWidth: 580 }}>
              RogerEx is a modern IT services company focused on building innovative digital solutions for startups, businesses, and enterprises. We transform ideas into reliable technology solutions.
            </p>
          </div>
        </section>

        {/* ── Our Story ── */}
        <section style={{ background: '#10131a', padding: '80px 32px' }}>
          <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            <div
              className="md:col-span-7 rounded-[20px] flex flex-col justify-center"
              style={{
                padding: '48px',
                background: '#191c22',
                border: '1px solid rgba(67,70,85,0.4)',
              }}
            >
              <h2 style={{ fontSize: 'clamp(24px,3vw,36px)', fontWeight: 600, color: '#e0e2eb', marginBottom: 20, letterSpacing: '-0.02em' }}>
                Our Story
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: '#8d90a0', marginBottom: 16 }}>
                We specialize in custom software development, web and mobile applications, UI/UX design, cloud solutions, AI-powered automation, and scalable digital products. Our journey began with a simple goal: to help businesses navigate the complex landscape of technology while delivering exceptional quality, performance, and long-term value.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: '#8d90a0' }}>
                Today, Rogerex India stands as a beacon of technical precision and creative innovation, bridging the gap between visionary concepts and functional reality.
              </p>
            </div>
            <div className="md:col-span-5 relative min-h-[360px] rounded-[20px] overflow-hidden" style={{ border: '1px solid rgba(67,70,85,0.4)' }}>
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                alt="Rogerex team"
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(37,99,235,0.2) 0%, transparent 70%)' }} />
            </div>
          </div>
        </section>

        {/* ── Mission & Vision ── */}
        <section style={{ background: '#0b0e14', padding: '80px 32px', borderTop: '1px solid rgba(67,70,85,0.3)' }}>
          <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { Icon: Rocket, color: '#2563eb', glowColor: 'rgba(37,99,235,0.25)', title: 'Mission', desc: 'To empower businesses with innovative, scalable, and reliable digital solutions.' },
              { Icon: Eye,    color: '#00759f', glowColor: 'rgba(0,117,159,0.2)',   title: 'Vision',  desc: 'To become a globally trusted technology partner known for innovation, quality, and digital excellence.' },
            ].map(({ Icon, color, glowColor, title, desc }) => (
              <div
                key={title}
                className="rounded-[20px] flex flex-col gap-6 relative overflow-hidden"
                style={{
                  padding: '48px',
                  background: '#191c22',
                  border: '1px solid rgba(67,70,85,0.4)',
                }}
              >
                <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: glowColor, filter: 'blur(60px)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }} />
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: `${color}25`, border: `1px solid ${color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#b4c5ff',
                }}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 style={{ fontSize: 28, fontWeight: 600, color: '#e0e2eb', marginBottom: 12, letterSpacing: '-0.02em' }}>{title}</h3>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: '#8d90a0' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section style={{ background: '#10131a', padding: '80px 32px' }}>
          <div className="max-w-container-max mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 rounded-full mb-5" style={{
                padding: '6px 16px', background: '#1d2026',
                border: '1px solid rgba(67,70,85,0.5)',
              }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#a4c9ff', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Global Consulting</span>
              </div>
              <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 600, letterSpacing: '-0.02em', color: '#e0e2eb', marginBottom: 12 }}>Why Choose Us</h2>
              <p style={{ fontSize: 16, color: '#8d90a0' }}>We combine local passion with global standards to deliver world-class IT consultancy.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {whyUs.map(({ Icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-2xl transition-all duration-300"
                  style={{
                    padding: '36px',
                    background: '#191c22',
                    border: '1px solid rgba(67,70,85,0.4)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(180,197,255,0.25)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(67,70,85,0.4)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: 'rgba(37,99,235,0.12)',
                    border: '1px solid rgba(180,197,255,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 20, color: '#b4c5ff',
                  }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 style={{ fontSize: 18, fontWeight: 600, color: '#e0e2eb', marginBottom: 10 }}>{title}</h4>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: '#8d90a0' }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Core Values ── */}
        <section style={{ background: '#0b0e14', padding: '80px 32px', borderTop: '1px solid rgba(67,70,85,0.3)' }}>
          <div className="max-w-container-max mx-auto">
            <div className="mb-16">
              <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 600, letterSpacing: '-0.02em', color: '#e0e2eb', marginBottom: 12 }}>Our Core Values</h2>
              <div style={{ width: 64, height: 3, borderRadius: 2, background: 'linear-gradient(90deg, #2563eb, #7bd0ff)' }} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {values.map(({ Icon, title }) => (
                <div
                  key={title}
                  className="flex flex-col items-center rounded-2xl transition-all duration-300 group"
                  style={{
                    padding: '24px 16px',
                    background: '#191c22',
                    border: '1px solid rgba(67,70,85,0.4)',
                    cursor: 'default',
                    textAlign: 'center',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#2563eb';
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.querySelector('.val-icon').style.color = '#eeefff';
                    e.currentTarget.querySelector('.val-title').style.color = '#eeefff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#191c22';
                    e.currentTarget.style.borderColor = 'rgba(67,70,85,0.4)';
                    e.currentTarget.querySelector('.val-icon').style.color = '#b4c5ff';
                    e.currentTarget.querySelector('.val-title').style.color = '#e0e2eb';
                  }}
                >
                  <div className="val-icon" style={{ color: '#b4c5ff', marginBottom: 12, transition: 'color 0.3s' }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="val-title" style={{ fontSize: 13, fontWeight: 600, color: '#e0e2eb', transition: 'color 0.3s' }}>{title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Leadership ── */}
        <section style={{ background: '#10131a', padding: '80px 32px' }}>
          <div className="max-w-container-max mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 600, letterSpacing: '-0.02em', color: '#e0e2eb', marginBottom: 8 }}>Leadership Team</h2>
                <p style={{ fontSize: 16, color: '#8d90a0' }}>The minds behind Rogerex India, dedicated to transforming your vision into digital reality.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {leadership.map(({ name, role, img }) => (
                <div key={name} className="group">
                  <div
                    className="rounded-[20px] overflow-hidden mb-5 relative"
                    style={{ aspectRatio: '3/4', border: '1px solid rgba(67,70,85,0.4)' }}
                  >
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={img}
                      alt={name}
                    />
                    <div
                      className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                      style={{ background: 'linear-gradient(to top, rgba(11,14,20,0.8), transparent)' }}
                    />
                  </div>
                  <h5 style={{ fontSize: 20, fontWeight: 600, color: '#e0e2eb', marginBottom: 4, letterSpacing: '-0.01em' }}>{name}</h5>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#b4c5ff', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <CallToAction
          title="Ready to transform your ideas?"
          description="Partner with Rogerex India and leverage our expertise in custom software development and digital strategy."
          buttonNode={
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
              Consult Our Experts
              <ArrowRight className="w-4 h-4" />
            </Link>
          }
        />
      </main>
    </>
  );
};

export default About;
