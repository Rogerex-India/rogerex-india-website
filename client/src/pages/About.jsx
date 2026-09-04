import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Eye, BadgeCheck, Lightbulb, Gavel, Globe, TrendingUp, Users, GraduationCap, ArrowRight } from 'lucide-react';
import CallToAction from '../components/CallToAction';

/* ─── Animation presets ─────────────────────────────────────────── */
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
const values = [
  { Icon: Lightbulb,     title: 'Innovation' },
  { Icon: BadgeCheck,    title: 'Quality' },
  { Icon: Eye,           title: 'Transparency' },
  { Icon: Users,         title: 'Customer Success' },
  { Icon: GraduationCap, title: 'Continuous Learning' },
  { Icon: Gavel,         title: 'Integrity' },
];

const whyUs = [
  { Icon: Globe,      title: 'Global Expertise',  desc: 'Serving clients across borders with a deep understanding of international tech standards and markets.' },
  { Icon: BadgeCheck, title: 'Certified Quality', desc: 'Rigorous QA processes ensuring every line of code meets the highest benchmarks for performance.' },
  { Icon: TrendingUp, title: 'Agile Scale',       desc: 'Dynamic team structures that scale rapidly to meet the evolving demands of growing enterprises.' },
];

const leadership = [
  { name: 'Rohan Gupta',   role: 'Chief Technology Officer',  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600' },
  { name: 'Ananya Sharma', role: 'Head of UX Design',         img: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?auto=format&fit=crop&q=80&w=600' },
  { name: 'Vikram Singh',  role: 'Head of AI & Automation',   img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600' },
  { name: 'Siddharth Rao', role: 'Director of Operations',    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600' },
];

const About = () => (
  <>
    <main>
      {/* ══ HERO ════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden transition-colors duration-300" style={{ background: 'var(--bg-main)', padding: '96px 32px 64px' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 350, borderRadius: '50%', background: 'var(--orb-primary)', filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, right: -80, width: 400, height: 300, borderRadius: '50%', background: 'var(--orb-secondary)', filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

        <motion.div
          className="relative z-10 max-w-container-max mx-auto"
          style={{ maxWidth: 760 }}
          initial="hidden" animate="show"
          variants={stagger(0.14, 0.05)}
        >
          {/* Badge */}
          <motion.div variants={fadeIn}>
            <div className="inline-flex items-center gap-2 rounded-full mb-6" style={{ padding: '6px 16px', background: 'var(--bg-pill)', border: '1px solid var(--border-color)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#2563eb' }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#2563eb', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Who We Are</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-main)', marginBottom: 24, lineHeight: 1.08 }}>
            Building <span className="text-gradient">Digital Excellence</span>
          </motion.h1>

          {/* Description */}
          <motion.p variants={fadeUp} style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--text-muted)', maxWidth: 580 }}>
            RogerEx is a modern IT services company focused on building innovative digital solutions for startups, businesses, and enterprises. We transform ideas into reliable technology solutions.
          </motion.p>
        </motion.div>
      </section>

      {/* ══ OUR STORY — slide from sides ════════════════════════ */}
      <section style={{ background: 'var(--bg-main)', padding: '80px 32px' }} className="transition-colors duration-300">
        <motion.div
          className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch"
          initial="hidden" whileInView="show" viewport={VP}
          variants={stagger(0.18)}
        >
          {/* Left card */}
          <motion.div
            variants={slideLeft}
            className="md:col-span-7 rounded-[24px] flex flex-col justify-between"
            style={{ padding: '48px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: '0 8px 32px var(--shadow-color)' }}
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full mb-6" style={{ padding: '6px 14px', background: 'var(--bg-pill)', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#2563eb', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Our Foundation</span>
              </div>
              <h2 style={{ fontSize: 'clamp(24px,3vw,36px)', fontWeight: 600, color: 'var(--text-main)', marginBottom: 20, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                Driven by Technical Precision & Customer Trust
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: 24 }}>
                Founded with a mission to bridge the gap between complex enterprise requirements and scalable software delivery, Rogerex India has grown into a trusted technology partner for global brands.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--text-muted)' }}>
                We believe that software should not only meet functional goals but also provide an exceptional user experience, rock-solid security, and future-proof adaptability.
              </p>
            </div>
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-[var(--border-color-subtle)] mt-8">
              {[
                { val: '250+', label: 'Shipped Projects' },
                { val: '50+',  label: 'Global Clients' },
                { val: '99.9%', label: 'SLA Uptime' },
              ].map(({ val, label }) => (
                <div key={label}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#2563eb', letterSpacing: '-0.02em' }}>{val}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right image */}
          <motion.div
            variants={slideRight}
            className="md:col-span-5 rounded-[24px] overflow-hidden relative group"
            style={{ minHeight: 380, border: '1px solid var(--border-color)', boxShadow: '0 8px 32px var(--shadow-color)' }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000')" }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,14,20,0.85) 0%, transparent 60%)' }} />
            <div className="absolute bottom-8 left-8 right-8">
              <span style={{ fontSize: 11, fontWeight: 600, color: '#60A5FA', letterSpacing: '0.1em', textTransform: 'uppercase' }}>ENGINEERING EXCELLENCE</span>
              <h3 style={{ fontSize: 20, fontWeight: 600, color: '#ffffff', marginTop: 4 }}>Where Tech Meets Purpose</h3>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ══ MISSION & VISION ════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-alt)', padding: '80px 32px', borderTop: '1px solid var(--border-color-subtle)' }} className="transition-colors duration-300">
        <div className="max-w-container-max mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden" whileInView="show" viewport={VP}
            variants={stagger(0.16)}
          >
            {/* Mission */}
            <motion.div
              variants={fadeUp}
              className="rounded-[24px]"
              style={{ padding: '44px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: '0 4px 24px var(--shadow-color)' }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(37,99,235,0.15)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, color: '#2563eb' }}>
                <Rocket className="w-6 h-6" />
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 600, color: 'var(--text-main)', marginBottom: 14, letterSpacing: '-0.01em' }}>Our Mission</h3>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-muted)' }}>
                To empower businesses through scalable software, cutting-edge AI integrations, and intuitive designs that drive measurable growth, operational efficiency, and lasting market impact.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              variants={fadeUp}
              className="rounded-[24px]"
              style={{ padding: '44px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: '0 4px 24px var(--shadow-color)' }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(37,99,235,0.15)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, color: '#2563eb' }}>
                <Eye className="w-6 h-6" />
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 600, color: 'var(--text-main)', marginBottom: 14, letterSpacing: '-0.01em' }}>Our Vision</h3>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-muted)' }}>
                To be a globally recognized IT consulting firm known for unwavering technical quality, ethical execution, and transformative digital experiences that define industry standards.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══ WHY CHOOSE US ═══════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-main)', padding: '80px 32px' }} className="transition-colors duration-300">
        <div className="max-w-container-max mx-auto">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="show" viewport={VP} variants={fadeUp}>
            <div className="inline-flex items-center gap-2 rounded-full mb-5" style={{ padding: '6px 16px', background: 'var(--bg-pill)', border: '1px solid var(--border-color)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#2563eb' }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#2563eb', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Why Choose Us</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-main)' }}>Built for Long-Term Success</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden" whileInView="show" viewport={VP}
            variants={stagger(0.14)}
          >
            {whyUs.map(({ Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="rounded-2xl"
                style={{ padding: '36px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px var(--shadow-color)' }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(37,99,235,0.12)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, color: '#2563eb' }}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-main)', marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-muted)' }}>{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ CORE VALUES ═════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-alt)', padding: '80px 32px', borderTop: '1px solid var(--border-color-subtle)' }} className="transition-colors duration-300">
        <div className="max-w-container-max mx-auto">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="show" viewport={VP} variants={fadeUp}>
            <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-main)', marginBottom: 12 }}>Our Core Values</h2>
            <p style={{ fontSize: 16, color: 'var(--text-muted)' }}>The principles that guide our team every day.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden" whileInView="show" viewport={VP}
            variants={stagger(0.12)}
          >
            {values.map(({ Icon, title }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="rounded-2xl flex items-center gap-4 transition-all duration-300 group"
                style={{ padding: '24px 28px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: '0 4px 16px var(--shadow-color)', cursor: 'default' }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <div
                  className="rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-[#2563eb]"
                  style={{ width: 44, height: 44, background: 'rgba(37,99,235,0.12)', border: '1px solid var(--border-color)', color: '#2563eb' }}
                >
                  <Icon className="w-5 h-5 group-hover:text-white transition-colors duration-300" />
                </div>
                <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-main)' }}>{title}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ LEADERSHIP ══════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-main)', padding: '80px 32px' }} className="transition-colors duration-300">
        <div className="max-w-container-max mx-auto">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="show" viewport={VP} variants={fadeUp}>
            <div className="inline-flex items-center gap-2 rounded-full mb-5" style={{ padding: '6px 16px', background: 'var(--bg-pill)', border: '1px solid var(--border-color)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#2563eb' }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#2563eb', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Leadership</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-main)' }}>Meet Our Team</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden" whileInView="show" viewport={VP}
            variants={stagger(0.14)}
          >
            {leadership.map(({ name, role, img }) => (
              <motion.div
                key={name}
                variants={fadeUp}
                className="rounded-[20px] overflow-hidden group"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: '0 6px 24px var(--shadow-color)' }}
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: '1' }}>
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={img}
                    alt={name}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,14,20,0.8) 0%, transparent 60%)' }} />
                </div>
                <div style={{ padding: '20px 24px' }}>
                  <h4 style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-main)' }}>{name}</h4>
                  <p style={{ fontSize: 13, color: '#2563eb', marginTop: 4 }}>{role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ CTA ═════════════════════════════════════════════════ */}
      <motion.div initial="hidden" whileInView="show" viewport={VP} variants={fadeUp}>
        <CallToAction
          title="Ready to build your next project?"
          description="Get in touch with our team of engineers and designers today to turn your concept into software reality."
          buttonNode={
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 rounded-full font-semibold transition-all duration-300"
              style={{ padding: '14px 36px', fontSize: 16, background: '#2563eb', color: '#eeefff', boxShadow: '0 0 32px rgba(37,99,235,0.45)' }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 52px rgba(37,99,235,0.65)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 32px rgba(37,99,235,0.45)'; }}
            >
              Start Conversation
              <ArrowRight className="w-5 h-5" />
            </Link>
          }
        />
      </motion.div>
    </main>
  </>
);

export default About;
