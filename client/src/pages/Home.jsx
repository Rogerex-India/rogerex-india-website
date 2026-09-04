import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Layers, Smartphone, Palette, Bot, Cloud, Lightbulb, BadgeCheck, Eye, Users, Gavel, GraduationCap, ArrowRight } from 'lucide-react';
import CallToAction from '../components/CallToAction';
import ServiceCard from '../components/ServiceCard';

/* ── Tech Stack Marquee data ── */
const techStack = [
  'React', 'Next.js', 'Node.js', 'Python', 'TypeScript',
  'AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes',
  'PostgreSQL', 'MongoDB', 'GraphQL', 'TailwindCSS', 'Figma',
  'React', 'Next.js', 'Node.js', 'Python', 'TypeScript',
  'AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes',
  'PostgreSQL', 'MongoDB', 'GraphQL', 'TailwindCSS', 'Figma',
];

/* ── Metrics ── */
const metrics = [
  { label: 'Heritage',   stat: '10+',  unit: 'Yrs', desc: 'Enterprise Tech Experience' },
  { label: 'Execution',  stat: '250+', unit: '',    desc: 'Projects Successfully Shipped' },
  { label: 'Clients',    stat: '50+',  unit: '',    desc: 'Global Enterprise Clients' },
  { label: 'Uptime',     stat: '99.9', unit: '%',   desc: 'Average System Uptime' },
];

/* ── Values ── */
const values = [
  { Icon: Lightbulb,      title: 'Innovation',         desc: 'Pushing boundaries with forward-thinking tech.' },
  { Icon: BadgeCheck,     title: 'Quality',            desc: 'Uncompromising standards in every line of code.' },
  { Icon: Eye,            title: 'Transparency',       desc: 'Open communication and clear project visibility.' },
  { Icon: Users,          title: 'Customer Success',   desc: "Our partners' growth is our primary metric." },
  { Icon: Gavel,          title: 'Integrity',          desc: 'Building trust through ethical and honest practices.' },
  { Icon: GraduationCap,  title: 'Continuous Learning',desc: 'Always evolving with the latest tech trends.' },
];

const Home = () => {
  return (
    <>
      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#10131a', minHeight: '90vh', display: 'flex', alignItems: 'center' }}
      >
        {/* Ambient orbs */}
        <div style={{
          position: 'absolute', top: 48, left: '50%', transform: 'translateX(-50%)',
          width: 700, height: 450, borderRadius: '50%',
          background: 'rgba(37,99,235,0.18)', filter: 'blur(140px)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: 500, right: -128,
          width: 500, height: 400, borderRadius: '50%',
          background: 'rgba(0,117,159,0.12)', filter: 'blur(160px)', pointerEvents: 'none',
        }} />
        {/* Grid bg */}
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

        <div
          className="relative z-10 w-full max-w-container-max mx-auto flex flex-col items-center text-center"
          style={{ padding: '96px 32px 80px' }}
        >
          {/* Top pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <div className="inline-flex items-center gap-2 rounded-full" style={{
              padding: '6px 14px', background: 'rgba(39,42,49,0.8)',
              border: '1px solid rgba(67,70,85,0.5)', backdropFilter: 'blur(12px)',
            }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#7bd0ff' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#a4c9ff', letterSpacing: '0.08em' }}>
                CRAFTING THE FUTURE
              </span>
            </div>
            <div className="hidden sm:inline-flex items-center gap-2 rounded-full" style={{
              padding: '6px 14px', background: 'rgba(27,32,38,0.6)',
              border: '1px solid rgba(67,70,85,0.4)', backdropFilter: 'blur(12px)',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#b4c5ff' }}>verified_user</span>
              <span style={{ fontSize: 12, color: '#c3c6d7' }}>Enterprise Grade Architecture</span>
            </div>
            <div className="hidden md:inline-flex items-center gap-2 rounded-full" style={{
              padding: '6px 14px', background: 'rgba(27,32,38,0.6)',
              border: '1px solid rgba(67,70,85,0.4)', backdropFilter: 'blur(12px)',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#7bd0ff' }}>bolt</span>
              <span style={{ fontSize: 12, color: '#c3c6d7' }}>AI-Driven Engineering</span>
            </div>
          </div>

          {/* Headline */}
          <h1
            style={{
              maxWidth: '4 * 768px',
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: '#e0e2eb',
              marginBottom: 24,
            }}
          >
            Building{' '}
            <span className="text-gradient">Digital Excellence</span>
            {' '}for Global Scale
          </h1>

          {/* Subtext */}
          <p
            style={{
              maxWidth: 560,
              fontSize: 18,
              lineHeight: 1.65,
              color: '#8d90a0',
              marginBottom: 48,
            }}
          >
            Empowering businesses with innovative, scalable, and reliable digital solutions
            tailored to navigate the complexities of the modern tech landscape.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300"
              style={{
                padding: '14px 32px', fontSize: 15,
                background: '#2563eb', color: '#eeefff',
                boxShadow: '0 0 32px rgba(37,99,235,0.45)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 52px rgba(37,99,235,0.65)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 32px rgba(37,99,235,0.45)'; }}
            >
              Get Started
              <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200"
              style={{
                padding: '14px 32px', fontSize: 15, fontWeight: 500,
                background: '#272a31', color: '#e0e2eb',
                border: '1px solid rgba(67,70,85,0.5)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#32353c'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#272a31'; }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#b4c5ff' }}>terminal</span>
              Explore Services
            </Link>
          </div>

          {/* Floating Tech Badges */}
          <div className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: 'cloud_sync',   color: '#7bd0ff', title: '99.9% Uptime',   sub: 'Cloud Infrastructure' },
              { icon: 'smart_toy',    color: '#a4c9ff', title: 'Autonomous AI',  sub: 'Model Pipelines' },
              { icon: 'security',     color: '#b4c5ff', title: 'Zero Trust',     sub: 'Hardened Systems' },
              { icon: 'speed',        color: '#7bd0ff', title: '< 85ms Latency', sub: 'High-Load APIs' },
            ].map(({ icon, color, title, sub }) => (
              <div
                key={title}
                className="flex items-center gap-3 rounded-xl"
                style={{
                  padding: '12px 14px', background: 'rgba(25,28,34,0.7)',
                  border: '1px solid rgba(67,70,85,0.35)', backdropFilter: 'blur(12px)',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 20, color }}>{icon}</span>
                <div className="text-left">
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#e0e2eb', letterSpacing: '-0.01em' }}>{title}</p>
                  <p style={{ fontSize: 11, color: '#8d90a0' }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          METRICS BAR
      ══════════════════════════════════════════════ */}
      <section style={{ background: '#10131a', padding: '0 32px 80px' }}>
        <div
          className="max-w-container-max mx-auto rounded-2xl"
          style={{
            background: '#191c22',
            border: '1px solid rgba(67,70,85,0.4)',
            padding: '40px 48px',
          }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x" style={{ '--tw-divide-opacity': 1, borderColor: 'rgba(67,70,85,0.2)' }}>
            {metrics.map(({ label, stat, unit, desc }) => (
              <div
                key={label}
                className="flex flex-col items-center lg:items-start text-center lg:text-left"
                style={{ padding: '16px 24px' }}
              >
                <span style={{ fontSize: 11, fontWeight: 600, color: '#b4c5ff', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                  {label}
                </span>
                <div className="flex items-baseline gap-1">
                  <span style={{ fontSize: 48, fontWeight: 700, color: '#e0e2eb', letterSpacing: '-0.03em', lineHeight: 1 }}>{stat}</span>
                  {unit && <span style={{ fontSize: 20, fontWeight: 500, color: '#7bd0ff' }}>{unit}</span>}
                </div>
                <p style={{ fontSize: 13, color: '#8d90a0', marginTop: 6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SERVICES GRID
      ══════════════════════════════════════════════ */}
      <section id="services-grid" style={{ background: '#10131a', padding: '80px 32px' }}>
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full mb-5" style={{
              padding: '6px 16px', background: '#1d2026',
              border: '1px solid rgba(67,70,85,0.5)',
            }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#b4c5ff' }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#b4c5ff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Specialized Solutions
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 600, letterSpacing: '-0.02em', color: '#e0e2eb', marginBottom: 16 }}>
              Our Core Expertise
            </h2>
            <p style={{ fontSize: 16, color: '#8d90a0', maxWidth: 560, margin: '0 auto' }}>
              A comprehensive suite of digital services designed to scale your operations and enhance your competitive edge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { Icon: Code,        title: 'Software Development',   desc: 'Custom-built enterprise software that streamlines workflows and powers complex business logic with precision.' },
              { Icon: Layers,      title: 'Full Stack Development',  desc: 'End-to-end web applications built with modern frameworks to ensure seamless performance from frontend to backend.' },
              { Icon: Smartphone,  title: 'Mobile App Development',  desc: 'Intuitive, high-performance iOS and Android applications that keep your users engaged on every device.' },
              { Icon: Palette,     title: 'UI/UX Design',            desc: 'User-centric design systems that prioritize clarity, aesthetics, and effortless interaction across digital interfaces.' },
              { Icon: Bot,         title: 'AI & Automation',         desc: 'Leveraging machine learning and RPA to automate manual tasks and unlock data-driven insights for your business.' },
              { Icon: Cloud,       title: 'Cloud Solutions',         desc: 'Secure, scalable, and cost-effective cloud infrastructure migration and management for modern enterprises.' },
            ].map(({ Icon, title, desc }) => (
              <ServiceCard
                key={title}
                variant="home"
                icon={<Icon className="w-5 h-5" style={{ color: '#b4c5ff' }} />}
                title={title}
                description={desc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TECH STACK MARQUEE
      ══════════════════════════════════════════════ */}
      <section style={{ background: '#0b0e14', padding: '48px 0', overflow: 'hidden', borderTop: '1px solid rgba(67,70,85,0.3)', borderBottom: '1px solid rgba(67,70,85,0.3)' }}>
        <div className="relative overflow-hidden">
          <div className="marquee-track">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-2 rounded-full shrink-0"
                style={{
                  padding: '8px 20px', margin: '0 8px',
                  background: '#191c22', border: '1px solid rgba(67,70,85,0.4)',
                  fontSize: 13, fontWeight: 500, color: '#c3c6d7',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#b4c5ff', display: 'inline-block', flexShrink: 0 }} />
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          ABOUT SNIPPET
      ══════════════════════════════════════════════ */}
      <section style={{ background: '#10131a', padding: '80px 32px' }}>
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div
            className="rounded-[20px] overflow-hidden relative"
            style={{ aspectRatio: '1', border: '1px solid rgba(67,70,85,0.4)' }}
          >
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800"
              alt="Rogerex team collaborating"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(37,99,235,0.15) 0%, transparent 60%)' }} />
          </div>
          {/* Text */}
          <div style={{ paddingLeft: '24px' }}>
            <div className="inline-flex items-center gap-2 rounded-full mb-5" style={{
              padding: '6px 14px', background: '#1d2026',
              border: '1px solid rgba(67,70,85,0.5)',
            }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#a4c9ff', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Our Identity
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(24px,3vw,36px)', fontWeight: 600, color: '#e0e2eb', marginBottom: 16, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              Innovative IT Consulting for the Global Market
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#8d90a0', marginBottom: 32 }}>
              Rogerex India is a premier IT services company dedicated to transforming complex business
              challenges into elegant digital solutions. We combine technical rigor with creative strategy
              to deliver high-impact software, cloud, and AI products.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {[{ val: '10+', label: 'Years Experience' }, { val: '250+', label: 'Projects Delivered' }].map(({ val, label }) => (
                <div key={label}>
                  <div style={{ fontSize: 40, fontWeight: 700, color: '#b4c5ff', letterSpacing: '-0.03em', lineHeight: 1 }}>{val}</div>
                  <div style={{ fontSize: 13, color: '#8d90a0', marginTop: 6, letterSpacing: '0.02em' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CORE VALUES
      ══════════════════════════════════════════════ */}
      <section style={{ background: '#0b0e14', padding: '80px 32px', borderTop: '1px solid rgba(67,70,85,0.3)' }}>
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 600, letterSpacing: '-0.02em', color: '#e0e2eb', marginBottom: 12 }}>
              Values that Drive Excellence
            </h2>
            <p style={{ fontSize: 16, color: '#8d90a0' }}>The DNA behind every solution we build.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl transition-all duration-300"
                style={{
                  padding: '32px', background: '#191c22',
                  border: '1px solid rgba(67,70,85,0.4)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(180,197,255,0.2)';
                  e.currentTarget.style.background = '#1d2026';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(67,70,85,0.4)';
                  e.currentTarget.style.background = '#191c22';
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: 'rgba(37,99,235,0.12)',
                  border: '1px solid rgba(180,197,255,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 16, color: '#b4c5ff',
                }}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 style={{ fontSize: 16, fontWeight: 600, color: '#e0e2eb', marginBottom: 8 }}>{title}</h4>
                <p style={{ fontSize: 14, color: '#8d90a0', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════ */}
      <CallToAction
        title="Ready to transform your business?"
        description="Let's collaborate to build the digital future of your company. Contact our experts today for a free consultation."
        buttonNode={
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 rounded-full font-semibold transition-all duration-300"
            style={{
              padding: '14px 36px', fontSize: 16,
              background: '#2563eb', color: '#eeefff',
              boxShadow: '0 0 32px rgba(37,99,235,0.45)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 52px rgba(37,99,235,0.65)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 32px rgba(37,99,235,0.45)'; }}
          >
            Contact Us Today
            <ArrowRight className="w-5 h-5" />
          </Link>
        }
      />
    </>
  );
};

export default Home;
