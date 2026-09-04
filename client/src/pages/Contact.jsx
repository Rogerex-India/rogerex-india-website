import React, { useState } from 'react';
import { Send, Mail, MapPin, Globe, Share2, Users, ChevronDown, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

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

  /* ── Shared dark input style ── */
  const inputStyle = {
    width: '100%', height: 52, padding: '0 20px', borderRadius: 12,
    background: '#1d2026', border: '1px solid rgba(67,70,85,0.5)',
    color: '#e0e2eb', fontSize: 15, outline: 'none',
    fontFamily: 'Inter, sans-serif', transition: 'border-color 0.2s',
  };
  const labelStyle = {
    fontSize: 11, fontWeight: 600, color: '#8d90a0',
    letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6, display: 'block',
  };

  return (
    <>
      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden" style={{ background: '#10131a', padding: '96px 32px 64px' }}>
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 300, borderRadius: '50%', background: 'rgba(37,99,235,0.15)', filter: 'blur(100px)', pointerEvents: 'none' }} />
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

          <div className="relative z-10 max-w-container-max mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full mb-6" style={{ padding: '6px 16px', background: '#1d2026', border: '1px solid rgba(67,70,85,0.5)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#7bd0ff' }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#a4c9ff', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Get In Touch</span>
            </div>
            <h1 style={{ fontSize: 'clamp(36px,5vw,64px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#e0e2eb', marginBottom: 20, lineHeight: 1.08 }}>
              Let's Build Something <span className="text-gradient">Great</span> Together
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.65, color: '#8d90a0', maxWidth: 520, margin: '0 auto' }}>
              Have an idea? We're ready to transform it into a reliable technology solution. Reach out today.
            </p>
          </div>
        </section>

        {/* ── Split Contact Section ── */}
        <section style={{ background: '#10131a', padding: '0 32px 80px' }}>
          <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* ── Contact Form ── */}
            <div className="rounded-[24px]" style={{ padding: '48px', background: '#191c22', border: '1px solid rgba(67,70,85,0.4)' }}>
              <h2 style={{ fontSize: 22, fontWeight: 600, color: '#e0e2eb', marginBottom: 32, letterSpacing: '-0.01em' }}>Send us a Message</h2>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} style={inputStyle} placeholder="John Doe" type="text"
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(180,197,255,0.4)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(67,70,85,0.5)'; }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input name="email" value={formData.email} onChange={handleChange} style={inputStyle} placeholder="john@example.com" type="email"
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(180,197,255,0.4)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(67,70,85,0.5)'; }}
                    />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input name="phone" value={formData.phone} onChange={handleChange} style={inputStyle} placeholder="+91 98765 43210" type="tel"
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(180,197,255,0.4)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(67,70,85,0.5)'; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Subject</label>
                  <input name="subject" value={formData.subject} onChange={handleChange} style={inputStyle} placeholder="Inquiry about custom development" type="text"
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(180,197,255,0.4)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(67,70,85,0.5)'; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Your Message</label>
                  <textarea
                    name="message" value={formData.message} onChange={handleChange}
                    rows={5} placeholder="Tell us about your project or inquiry..."
                    style={{ ...inputStyle, height: 'auto', padding: '16px 20px', resize: 'none', lineHeight: 1.65 }}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(180,197,255,0.4)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(67,70,85,0.5)'; }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300"
                  style={{
                    padding: '16px', fontSize: 15,
                    background: isLoading ? 'rgba(37,99,235,0.5)' : '#2563eb',
                    color: '#eeefff', cursor: isLoading ? 'not-allowed' : 'pointer',
                    boxShadow: isLoading ? 'none' : '0 0 24px rgba(37,99,235,0.35)',
                  }}
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                  {!isLoading && <Send className="w-4 h-4" />}
                </button>
              </form>
            </div>

            {/* ── Info & Map Side ── */}
            <div className="flex flex-col gap-6">
              {/* Info card */}
              <div className="rounded-[24px]" style={{ padding: '40px', background: '#191c22', border: '1px solid rgba(67,70,85,0.4)' }}>
                <h2 style={{ fontSize: 22, fontWeight: 600, color: '#e0e2eb', marginBottom: 28, letterSpacing: '-0.01em' }}>Contact Information</h2>
                <div className="space-y-6">
                  {[
                    { icon: 'mail', label: 'Email Us', value: 'rogerexindia@gmail.com', href: 'mailto:rogerexindia@gmail.com' },
                    { icon: 'location_on', label: 'Our Location', value: 'Bengaluru, Karnataka, India', href: null },
                  ].map(({ icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div style={{
                        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                        background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(180,197,255,0.12)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#b4c5ff' }}>{icon}</span>
                      </div>
                      <div>
                        <p style={{ fontSize: 11, fontWeight: 600, color: '#8d90a0', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</p>
                        {href
                          ? <a href={href} style={{ fontSize: 16, color: '#e0e2eb', transition: 'color 0.2s' }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = '#b4c5ff')}
                              onMouseLeave={(e) => (e.currentTarget.style.color = '#e0e2eb')}>
                              {value}
                            </a>
                          : <p style={{ fontSize: 16, color: '#e0e2eb' }}>{value}</p>
                        }
                      </div>
                    </div>
                  ))}

                  {/* Divider */}
                  <div style={{ height: 1, background: 'rgba(67,70,85,0.4)', margin: '8px 0' }} />

                  {/* Social */}
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#8d90a0', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Follow Us</p>
                    <div className="flex gap-3">
                      {[
                        { icon: <Globe className="w-4 h-4" />, label: 'Website' },
                        { icon: <Share2 className="w-4 h-4" />, label: 'Twitter' },
                        { icon: <Users className="w-4 h-4" />, label: 'LinkedIn' },
                      ].map(({ icon, label }) => (
                        <a
                          key={label}
                          href="#"
                          aria-label={label}
                          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                          style={{
                            background: '#1d2026', color: '#8d90a0',
                            border: '1px solid rgba(67,70,85,0.4)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(180,197,255,0.1)';
                            e.currentTarget.style.color = '#b4c5ff';
                            e.currentTarget.style.borderColor = 'rgba(180,197,255,0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#1d2026';
                            e.currentTarget.style.color = '#8d90a0';
                            e.currentTarget.style.borderColor = 'rgba(67,70,85,0.4)';
                          }}
                        >
                          {icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div
                className="flex-grow rounded-[24px] overflow-hidden relative"
                style={{ minHeight: 200, background: '#191c22', border: '1px solid rgba(67,70,85,0.4)' }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
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
                  <a href="#" style={{ fontSize: 12, fontWeight: 700, color: '#b4c5ff', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    GET DIRECTIONS
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ Section ── */}
        <section style={{ background: '#0b0e14', padding: '80px 32px', borderTop: '1px solid rgba(67,70,85,0.3)' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 rounded-full mb-5" style={{ padding: '6px 16px', background: '#191c22', border: '1px solid rgba(67,70,85,0.5)' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#a4c9ff', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Common Questions</span>
              </div>
              <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 600, letterSpacing: '-0.02em', color: '#e0e2eb' }}>Frequently Asked Questions</h2>
            </div>

            <div className="space-y-3">
              {faqs.map(({ id, q, a }) => (
                <div
                  key={id}
                  className="rounded-2xl overflow-hidden transition-all duration-200"
                  style={{
                    background: '#191c22',
                    border: openFaq === id ? '1px solid rgba(180,197,255,0.25)' : '1px solid rgba(67,70,85,0.4)',
                  }}
                >
                  <button
                    className="w-full flex justify-between items-center text-left"
                    style={{ padding: '20px 24px', cursor: 'pointer', background: 'transparent', border: 'none' }}
                    onClick={() => setOpenFaq(openFaq === id ? null : id)}
                    aria-expanded={openFaq === id}
                  >
                    <span style={{ fontSize: 16, fontWeight: 600, color: openFaq === id ? '#b4c5ff' : '#e0e2eb', paddingRight: 24, lineHeight: 1.5, transition: 'color 0.2s' }}>
                      {q}
                    </span>
                    <ChevronDown
                      className="w-5 h-5 shrink-0 transition-transform duration-300"
                      style={{ color: '#8d90a0', transform: openFaq === id ? 'rotate(180deg)' : 'none' }}
                    />
                  </button>
                  <div
                    style={{
                      maxHeight: openFaq === id ? 400 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.35s ease, opacity 0.35s ease',
                      opacity: openFaq === id ? 1 : 0,
                    }}
                  >
                    <p style={{ padding: '0 24px 20px', fontSize: 15, lineHeight: 1.7, color: '#8d90a0' }}>{a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;
