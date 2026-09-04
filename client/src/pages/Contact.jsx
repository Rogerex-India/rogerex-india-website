import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, Globe, Share2, Users, ChevronDown, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

/* ─── Animation presets ────────────────────── */
const EASE = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE, delay: custom },
  }),
};

const popIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75, ease: EASE, delay: custom },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const VP = { once: true, amount: 0.18, margin: '0px 0px -40px 0px' };

const faqs = [
  {
    id: 'faq-1',
    q: 'What services does Rogerex India specialize in?',
    a: 'We specialize in custom software development, web and mobile applications, UI/UX design, cloud solutions, and AI-powered automation. We focus on transforming ideas into reliable, scalable technology solutions for businesses of all sizes.',
  },
  {
    id: 'faq-2',
    q: 'How long does it typically take to start a project?',
    a: 'Once we\'ve discussed your requirements and finalized the project scope, we can typically begin development within 1-2 weeks. Our streamlined onboarding process ensures we hit the ground running with a clear roadmap.',
  },
  {
    id: 'faq-3',
    q: 'Do you offer post-launch maintenance and support?',
    a: 'Yes, we provide comprehensive Maintenance & Support services to ensure your digital products continue to perform at their best. This includes security updates, performance optimization, and scaling as your business grows.',
  },
  {
    id: 'faq-4',
    q: 'How does Rogerex handle project communication?',
    a: 'Transparency is one of our core values. We use collaborative tools and provide regular progress reports, scheduled check-ins, and direct access to your dedicated project team to ensure you\'re always in the loop.',
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      toast.error('All fields are required!'); return;
    }
    setIsLoading(true);
    try {
      const API_BASE = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Message sent successfully! We will get back to you soon.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        toast.error(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /* ── Theme-aware input style ── */
  const inputStyle = {
    width: '100%', height: 52, padding: '0 20px', borderRadius: 12,
    background: 'var(--bg-input)', border: '1px solid var(--border-color)',
    color: 'var(--text-main)', fontSize: 15, outline: 'none',
    fontFamily: 'Inter, sans-serif', transition: 'border-color 0.2s, background-color 0.3s',
  };
  const labelStyle = {
    fontSize: 11, fontWeight: 600, color: 'var(--text-muted)',
    letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6, display: 'block',
  };

  return (
    <>
      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden transition-colors duration-300" style={{ background: 'var(--bg-main)', padding: '96px 32px 64px' }}>
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 300, borderRadius: '50%', background: 'var(--orb-primary)', filter: 'blur(100px)', pointerEvents: 'none' }} />
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

          <div className="relative z-10 max-w-container-max mx-auto text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={popIn}
              custom={0}
              className="inline-flex items-center gap-2 rounded-full mb-6"
              style={{ padding: '6px 16px', background: 'var(--bg-pill)', border: '1px solid var(--border-color)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#2563eb' }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#2563eb', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Get In Touch</span>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.12}
              style={{ fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-main)', marginBottom: 20, lineHeight: 1.08 }}
            >
              Let's Build Something <span className="text-gradient">Great</span> Together
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0.24}
              style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto' }}
            >
              Have an idea? We're ready to transform it into a reliable technology solution. Reach out today.
            </motion.p>
          </div>
        </section>

        {/* ── Split Contact Section ── */}
        <section style={{ background: 'var(--bg-main)', padding: '0 32px 80px' }} className="transition-colors duration-300">
          <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* ── Contact Form ── */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              variants={popIn}
              className="rounded-[24px]"
              style={{ padding: '48px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: '0 8px 32px var(--shadow-color)' }}
            >
              <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--text-main)', marginBottom: 32, letterSpacing: '-0.01em' }}>Send us a Message</h2>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} style={inputStyle} placeholder="John Doe" type="text"
                      onFocus={(e) => { e.target.style.borderColor = '#2563eb'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input name="email" value={formData.email} onChange={handleChange} style={inputStyle} placeholder="john@example.com" type="email"
                      onFocus={(e) => { e.target.style.borderColor = '#2563eb'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; }}
                    />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input name="phone" value={formData.phone} onChange={handleChange} style={inputStyle} placeholder="+91 98765 43210" type="tel"
                    onFocus={(e) => { e.target.style.borderColor = '#2563eb'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Subject</label>
                  <input name="subject" value={formData.subject} onChange={handleChange} style={inputStyle} placeholder="Inquiry about custom development" type="text"
                    onFocus={(e) => { e.target.style.borderColor = '#2563eb'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Your Message</label>
                  <textarea
                    name="message" value={formData.message} onChange={handleChange}
                    rows={5} placeholder="Tell us about your project or inquiry..."
                    style={{ ...inputStyle, height: 'auto', padding: '16px 20px', resize: 'none', lineHeight: 1.65 }}
                    onFocus={(e) => { e.target.style.borderColor = '#2563eb'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; }}
                  />
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 cursor-pointer"
                  style={{
                    padding: '16px', fontSize: 15,
                    background: isLoading ? 'rgba(37,99,235,0.5)' : '#2563eb',
                    color: '#eeefff', cursor: isLoading ? 'not-allowed' : 'pointer',
                    boxShadow: isLoading ? 'none' : '0 0 24px rgba(37,99,235,0.35)',
                  }}
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                  {!isLoading && <Send className="w-4 h-4" />}
                </motion.button>
              </form>
            </motion.div>

            {/* ── Info & Map Side ── */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              variants={staggerContainer}
              className="flex flex-col gap-6"
            >
              {/* Info card */}
              <motion.div variants={fadeUp} className="rounded-[24px]" style={{ padding: '40px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: '0 8px 32px var(--shadow-color)' }}>
                <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--text-main)', marginBottom: 28, letterSpacing: '-0.01em' }}>Contact Information</h2>
                <div className="space-y-6">
                  {[
                    { icon: 'mail', label: 'Email Us', value: 'rogerexindia@gmail.com', href: 'mailto:rogerexindia@gmail.com' },
                    { icon: 'location_on', label: 'Our Location', value: 'Bengaluru, Karnataka, India', href: null },
                  ].map(({ icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div style={{
                        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                        background: 'rgba(37,99,235,0.12)', border: '1px solid var(--border-color)',
                        display: 'flex', items: 'center', justifyContent: 'center',
                      }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#2563eb' }}>{icon}</span>
                      </div>
                      <div>
                        <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</p>
                        {href
                          ? <a href={href} style={{ fontSize: 16, color: 'var(--text-main)', transition: 'color 0.2s' }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = '#2563eb')}
                              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-main)')}>
                              {value}
                            </a>
                          : <p style={{ fontSize: 16, color: 'var(--text-main)' }}>{value}</p>
                        }
                      </div>
                    </div>
                  ))}

                  {/* Divider */}
                  <div style={{ height: 1, background: 'var(--border-color-subtle)', margin: '8px 0' }} />

                  {/* Social */}
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Follow Us</p>
                    <div className="flex gap-3">
                      {[
                        { icon: <Globe className="w-4 h-4" />, label: 'Website' },
                        { icon: <Share2 className="w-4 h-4" />, label: 'Twitter' },
                        { icon: <Users className="w-4 h-4" />, label: 'LinkedIn' },
                      ].map(({ icon, label }) => (
                        <motion.a
                          key={label}
                          href="#"
                          aria-label={label}
                          whileTap={{ scale: 0.92 }}
                          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
                          style={{
                            background: 'var(--bg-pill)', color: 'var(--text-muted)',
                            border: '1px solid var(--border-color)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#2563eb';
                            e.currentTarget.style.color = '#ffffff';
                            e.currentTarget.style.borderColor = '#2563eb';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'var(--bg-pill)';
                            e.currentTarget.style.color = 'var(--text-muted)';
                            e.currentTarget.style.borderColor = 'var(--border-color)';
                          }}
                        >
                          {icon}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Map placeholder */}
              <motion.div
                variants={fadeUp}
                className="flex-grow rounded-[24px] overflow-hidden relative group"
                style={{ minHeight: 200, background: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: '0 8px 32px var(--shadow-color)' }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800')" }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,14,20,0.6)' }} />
                <div
                  className="absolute bottom-4 left-4 right-4 rounded-xl flex items-center justify-between"
                  style={{ padding: '12px 16px', background: 'rgba(11,14,20,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(67,70,85,0.4)' }}
                >
                  <div>
                    <h4 style={{ fontSize: 15, fontWeight: 600, color: '#e0e2eb' }}>Headquarters</h4>
                    <p style={{ fontSize: 13, color: '#8d90a0' }}>Bengaluru, India</p>
                  </div>
                  <a href="#" style={{ fontSize: 12, fontWeight: 700, color: '#60A5FA', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    GET DIRECTIONS
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── FAQ Section ── */}
        <section style={{ background: 'var(--bg-alt)', padding: '80px 32px', borderTop: '1px solid var(--border-color-subtle)' }} className="transition-colors duration-300">
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              variants={fadeUp}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 rounded-full mb-5" style={{ padding: '6px 16px', background: 'var(--bg-pill)', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#2563eb', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Common Questions</span>
              </div>
              <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-main)' }}>Frequently Asked Questions</h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={VP}
              variants={staggerContainer}
              className="space-y-3"
            >
              {faqs.map(({ id, q, a }) => (
                <motion.div
                  key={id}
                  variants={fadeUp}
                  className="rounded-2xl overflow-hidden transition-all duration-200"
                  style={{
                    background: 'var(--bg-card)',
                    border: openFaq === id ? '1px solid #2563eb' : '1px solid var(--border-color)',
                    boxShadow: '0 4px 16px var(--shadow-color)',
                  }}
                >
                  <button
                    className="w-full flex justify-between items-center text-left cursor-pointer"
                    style={{ padding: '20px 24px', background: 'transparent', border: 'none' }}
                    onClick={() => setOpenFaq(openFaq === id ? null : id)}
                    aria-expanded={openFaq === id}
                  >
                    <span style={{ fontSize: 16, fontWeight: 600, color: openFaq === id ? '#2563eb' : 'var(--text-main)', paddingRight: 24, lineHeight: 1.5, transition: 'color 0.2s' }}>
                      {q}
                    </span>
                    <ChevronDown
                      className="w-5 h-5 shrink-0 transition-transform duration-300"
                      style={{ color: 'var(--text-muted)', transform: openFaq === id ? 'rotate(180deg)' : 'none' }}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                      >
                        <p style={{ padding: '0 24px 20px', fontSize: 15, lineHeight: 1.7, color: 'var(--text-muted)' }}>{a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;
