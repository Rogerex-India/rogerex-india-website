import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Layers, Globe, Smartphone, Palette, Bot, Cloud, Plug, Briefcase, Wrench, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import ServiceCard from '../components/ServiceCard';

const services = [
  { Icon: Code,        title: 'Software Development',   desc: 'Custom-built enterprise software designed to streamline operations and drive business efficiency at scale.' },
  { Icon: Layers,      title: 'Full Stack Development',  desc: 'End-to-end development covering both front-end aesthetics and robust back-end architecture for seamless performance.' },
  { Icon: Globe,       title: 'Website Development',     desc: 'Responsive, high-performance websites that blend cutting-edge design with powerful functionality to engage users.' },
  { Icon: Smartphone,  title: 'Mobile App Development',  desc: 'Native and cross-platform mobile applications that provide intuitive user experiences on iOS and Android devices.' },
  { Icon: Palette,     title: 'UI/UX Design',            desc: 'User-centric design strategies that prioritize usability and visual delight to create meaningful digital interactions.' },
  { Icon: Bot,         title: 'AI & Automation',         desc: 'Intelligent systems and automated workflows that leverage machine learning to optimize productivity and data insights.' },
  { Icon: Cloud,       title: 'Cloud Solutions',         desc: 'Scalable cloud infrastructure and migration services ensuring high availability, security, and global accessibility.' },
  { Icon: Plug,        title: 'API Integration',         desc: 'Connecting diverse platforms through robust APIs to ensure data synchronization and unified digital ecosystems.' },
  { Icon: Briefcase,   title: 'IT Consulting',           desc: 'Strategic guidance on technology stacks, digital transformation, and future-ready IT roadmaps for growth.' },
  // { Icon: Wrench,      title: 'Maintenance & Support',   desc: 'Continuous monitoring, updates, and dedicated technical support to keep your digital assets running at peak performance.' },
];

const processSteps = [
  { num: '01', title: 'Discovery',    desc: "We dive deep into your requirements, business goals, and user needs to create a strategic project foundation." },
  { num: '02', title: 'Design',       desc: "Crafting intuitive user interfaces and architecting robust systems that prioritize performance and aesthetics." },
  { num: '03', title: 'Development',  desc: "Agile engineering where we turn designs into functional, high-quality digital products with clean, scalable code." },
  { num: '04', title: 'Launch',       desc: "Rigorous testing followed by seamless deployment and continuous monitoring to ensure a successful release." },
];

const Services = () => {
  return (
    <>
      <main>
        {/* Hero */}
        <PageHero
          subtitle="OUR EXPERTISE"
          title="Comprehensive IT Solutions for the"
          highlightText="Digital Age"
          description="Transforming ideas into reliable technology solutions through innovation, quality, and technical precision."
        />

        {/* ── Services Grid ── */}
        <section style={{ background: '#10131a', padding: '80px 32px' }}>
          <div className="max-w-container-max mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(({ Icon, title, desc }) => (
                <ServiceCard
                  key={title}
                  icon={<Icon className="w-5 h-5" style={{ color: '#b4c5ff' }} />}
                  title={title}
                  description={desc}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Process Section ── */}
        <section style={{ background: '#0b0e14', padding: '80px 32px', borderTop: '1px solid rgba(67,70,85,0.3)' }}>
          <div className="max-w-container-max mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 rounded-full mb-5" style={{
                padding: '6px 16px', background: '#191c22',
                border: '1px solid rgba(67,70,85,0.5)',
              }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#b4c5ff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Our Approach
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 600, letterSpacing: '-0.02em', color: '#e0e2eb' }}>
                The Way We Work
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map(({ num, title, desc }) => (
                <div
                  key={num}
                  className="rounded-2xl transition-all duration-300"
                  style={{
                    padding: '32px', background: '#191c22',
                    border: '1px solid rgba(67,70,85,0.4)',
                    position: 'relative',
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
                    width: 44, height: 44, borderRadius: '50%',
                    background: '#2563eb', color: '#eeefff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: 14, marginBottom: 20,
                    boxShadow: '0 0 16px rgba(37,99,235,0.4)',
                  }}>
                    {num}
                  </div>
                  <h4 style={{ fontSize: 18, fontWeight: 600, color: '#e0e2eb', marginBottom: 10 }}>{title}</h4>
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: '#8d90a0' }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ background: '#10131a', padding: '80px 32px' }}>
          <div
            className="max-w-container-max mx-auto rounded-[32px] relative overflow-hidden text-center"
            style={{
              background: 'linear-gradient(135deg, #1d2026, #191c22)',
              border: '1px solid rgba(67,70,85,0.5)',
              padding: '80px 48px',
            }}
          >
            {/* Orbs */}
            <div style={{ position: 'absolute', top: -40, left: '25%', width: 300, height: 200, borderRadius: '50%', background: 'rgba(37,99,235,0.2)', filter: 'blur(80px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -60, right: '20%', width: 280, height: 200, borderRadius: '50%', background: 'rgba(0,117,159,0.15)', filter: 'blur(80px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(180,197,255,0.3), transparent)' }} />

            <div className="relative z-10">
              <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, letterSpacing: '-0.025em', color: '#e0e2eb', marginBottom: 16 }}>
                Ready to Build Something <span className="text-gradient">Extraordinary?</span>
              </h2>
              <p style={{ fontSize: 18, color: '#8d90a0', maxWidth: 560, margin: '0 auto 40px' }}>
                Let's collaborate to transform your vision into a high-impact digital reality. Our experts are ready to guide your journey.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-300"
                  style={{
                    padding: '14px 32px', fontSize: 15,
                    background: '#2563eb', color: '#eeefff',
                    boxShadow: '0 0 32px rgba(37,99,235,0.45)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 52px rgba(37,99,235,0.65)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 32px rgba(37,99,235,0.45)'; }}
                >
                  Start Your Project
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="mailto:rogerexindia@gmail.com"
                  style={{ fontSize: 15, color: '#b4c5ff', fontWeight: 500, borderBottom: '1px solid rgba(180,197,255,0.3)', paddingBottom: 2 }}
                >
                  rogerexindia@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Services;
