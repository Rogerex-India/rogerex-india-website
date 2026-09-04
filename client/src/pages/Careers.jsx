import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Users, GraduationCap, MapPin, Send, FileText, UploadCloud, ArrowRight, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

const benefits = [
  {
    icon: 'home_work',
    title: 'Remote Work',
    desc: 'Work from anywhere. We value results over clock-ins, providing the flexibility you need for a healthy work-life balance.',
  },
  {
    icon: 'school',
    title: 'Learning & Growth',
    desc: 'Access to premium courses, certifications, and internal workshops to keep you at the edge of IT innovation.',
  },
  {
    icon: 'favorite',
    title: 'Health & Wellness',
    desc: 'Comprehensive health insurance and wellness programs to ensure you and your family are always taken care of.',
  },
];

const openings = [
  { title: 'Frontend Developer',  type: 'Full-time',   location: 'Remote / India', comp: 'Competitive' },
  { title: 'UI Designer',         type: 'Full-time',   location: 'Remote',         comp: 'Performance Based' },
  { title: 'Backend Engineer',    type: 'Full-time',   location: 'Hub (Gurgaon)',  comp: 'High-Growth' },
  { title: 'Intern',              type: '6 Months',    location: 'Remote',         comp: 'PPO Potential' },
];

const Careers = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', college: '', role: '', coverLetter: '',
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [isLoading,  setIsLoading]  = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(file.type)) { toast.error('Only PDF, DOC, or DOCX files are allowed.'); return; }
    if (file.size > 10 * 1024 * 1024) { toast.error('File size must be under 10MB.'); return; }
    setResumeFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.college || !formData.role || !formData.coverLetter) {
      toast.error('All fields are required!'); return;
    }
    if (!resumeFile) { toast.error('Please upload your resume.'); return; }

    const payload = new FormData();
    Object.entries(formData).forEach(([key, val]) => payload.append(key, val));
    payload.append('resume', resumeFile);

    setIsLoading(true);
    try {
      const response = await fetch('/api/careers', { method: 'POST', body: payload });
      const data = await response.json();
      if (data.success) {
        toast.success('Application submitted! We will review and get back to you.');
        setFormData({ name: '', email: '', phone: '', college: '', role: '', coverLetter: '' });
        setResumeFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
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
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 350, borderRadius: '50%', background: 'rgba(37,99,235,0.18)', filter: 'blur(120px)', pointerEvents: 'none' }} />
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

          <div className="relative z-10 max-w-container-max mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full mb-6" style={{ padding: '6px 16px', background: '#1d2026', border: '1px solid rgba(67,70,85,0.5)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#7bd0ff' }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#a4c9ff', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Join the Team</span>
            </div>
            <h1 style={{ fontSize: 'clamp(36px,6vw,72px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#e0e2eb', marginBottom: 24, lineHeight: 1.08, maxWidth: '4 * 560px', margin: '0 auto 24px' }}>
              Help Us Build <span className="text-gradient">Digital Excellence</span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.65, color: '#8d90a0', maxWidth: 540, margin: '0 auto 40px' }}>
              At RogerEx, we transform ideas into reliable technology solutions. We're looking for passionate individuals who value innovation, quality, and continuous learning.
            </p>
            <a
              href="#openings"
              className="inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-300"
              style={{ padding: '14px 32px', fontSize: 15, background: '#2563eb', color: '#eeefff', boxShadow: '0 0 28px rgba(37,99,235,0.4)' }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 48px rgba(37,99,235,0.65)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 28px rgba(37,99,235,0.4)'; }}
            >
              View Open Positions <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* ── Life at Rogerex ── */}
        <section style={{ background: '#10131a', padding: '80px 32px' }}>
          <div className="max-w-container-max mx-auto">
            <div className="mb-12">
              <h2 style={{ fontSize: 'clamp(24px,3vw,36px)', fontWeight: 600, letterSpacing: '-0.02em', color: '#e0e2eb', marginBottom: 8 }}>Life at Rogerex</h2>
              <p style={{ fontSize: 16, color: '#8d90a0' }}>A culture driven by innovation and customer success.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6" style={{ minHeight: 480 }}>
              {/* Main image */}
              <div className="md:col-span-8 relative overflow-hidden rounded-[20px] group" style={{ minHeight: 320, border: '1px solid rgba(67,70,85,0.4)' }}>
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1400')" }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,14,20,0.85) 0%, rgba(11,14,20,0.2) 50%, transparent 100%)' }} />
                <div className="absolute bottom-8 left-8 z-20">
                  <h3 style={{ fontSize: 22, fontWeight: 600, color: '#fff', marginBottom: 6 }}>Our Collaborative Workspace</h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>Where ideas meet execution in a high-performance environment.</p>
                </div>
              </div>
              {/* Side cards */}
              <div className="md:col-span-4 grid grid-rows-2 gap-6">
                <div className="rounded-[20px] flex flex-col justify-center" style={{ padding: '28px', background: '#191c22', border: '1px solid rgba(67,70,85,0.4)' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(37,99,235,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, color: '#b4c5ff' }}>
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#e0e2eb', marginBottom: 8 }}>Innovation First</h3>
                  <p style={{ fontSize: 14, color: '#8d90a0', lineHeight: 1.6 }}>We empower our teams to experiment with AI, Cloud, and the latest stack to solve real-world problems.</p>
                </div>
                <div className="relative overflow-hidden rounded-[20px] group" style={{ minHeight: 180, border: '1px solid rgba(67,70,85,0.4)' }}>
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&q=80&w=800')" }} />
                  <div className="absolute inset-0" style={{ background: 'rgba(37,99,235,0.2)', mixBlendMode: 'multiply' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Benefits ── */}
        <section style={{ background: '#0b0e14', padding: '80px 32px', borderTop: '1px solid rgba(67,70,85,0.3)' }}>
          <div className="max-w-container-max mx-auto">
            <div className="text-center mb-16">
              <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 600, letterSpacing: '-0.02em', color: '#e0e2eb', marginBottom: 12 }}>Why Work With Us?</h2>
              <p style={{ fontSize: 16, color: '#8d90a0' }}>Designed for growth, flexibility, and well-being.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benefits.map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-2xl transition-all duration-300"
                  style={{ padding: '36px', background: '#191c22', border: '1px solid rgba(67,70,85,0.4)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(180,197,255,0.2)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(67,70,85,0.4)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(180,197,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 24, color: '#b4c5ff' }}>{icon}</span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: '#e0e2eb', marginBottom: 10 }}>{title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: '#8d90a0' }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Open Positions ── */}
        <section id="openings" style={{ background: '#10131a', padding: '80px 32px' }}>
          <div className="max-w-container-max mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 600, letterSpacing: '-0.02em', color: '#e0e2eb', marginBottom: 8 }}>Open Opportunities</h2>
                <p style={{ fontSize: 16, color: '#8d90a0' }}>Find your next challenge in our growing team.</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full" style={{ padding: '6px 16px', background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.3)' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#b4c5ff', letterSpacing: '0.08em' }}>4 OPENINGS</span>
              </div>
            </div>
            <div className="space-y-4">
              {openings.map(({ title, type, location, comp }) => (
                <div
                  key={title}
                  className="rounded-2xl flex flex-col md:flex-row items-center justify-between transition-all duration-300 group"
                  style={{ padding: '28px 32px', background: '#191c22', border: '1px solid rgba(67,70,85,0.4)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(180,197,255,0.25)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(67,70,85,0.4)'; }}
                >
                  <div className="mb-4 md:mb-0">
                    <h3
                      className="transition-colors duration-300"
                      style={{ fontSize: 20, fontWeight: 600, color: '#e0e2eb', marginBottom: 10 }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#b4c5ff')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#e0e2eb')}
                    >
                      {title}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { icon: 'work', text: type },
                        { icon: 'location_on', text: location },
                        { icon: 'payments', text: comp },
                      ].map(({ icon, text }) => (
                        <span key={text} className="flex items-center gap-1.5" style={{ fontSize: 14, color: '#8d90a0' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#434655' }}>{icon}</span>
                          {text}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    to="/contact"
                    className="w-full md:w-auto text-center rounded-xl font-semibold transition-all duration-200"
                    style={{ padding: '12px 28px', fontSize: 14, background: '#2563eb', color: '#eeefff', display: 'inline-block' }}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 24px rgba(37,99,235,0.4)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    Apply Now
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Application Form ── */}
        <section id="apply" style={{ background: '#0b0e14', padding: '80px 32px', borderTop: '1px solid rgba(67,70,85,0.3)' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full mb-5" style={{ padding: '6px 16px', background: '#191c22', border: '1px solid rgba(67,70,85,0.5)' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#b4c5ff', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Ready to Join?</span>
              </div>
              <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 600, letterSpacing: '-0.02em', color: '#e0e2eb', marginBottom: 12 }}>Submit Your Application</h2>
              <p style={{ fontSize: 16, color: '#8d90a0' }}>Fill out the form below and we'll review your application within 3-5 business days.</p>
            </div>

            <div className="rounded-[24px]" style={{ padding: '48px', background: '#191c22', border: '1px solid rgba(67,70,85,0.4)' }}>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} style={inputStyle} placeholder="John Doe" type="text" />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input name="email" value={formData.email} onChange={handleChange} style={inputStyle} placeholder="john@example.com" type="email" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label style={labelStyle}>Phone Number</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} style={inputStyle} placeholder="+91 98765 43210" type="tel" />
                  </div>
                  <div>
                    <label style={labelStyle}>College / University</label>
                    <input name="college" value={formData.college} onChange={handleChange} style={inputStyle} placeholder="ABC College, Bangalore" type="text" />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Applying for Role</label>
                  <select
                    name="role" value={formData.role} onChange={handleChange}
                    style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                  >
                    <option value="">Select a role...</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="UI Designer">UI Designer</option>
                    <option value="Backend Engineer">Backend Engineer</option>
                    <option value="Intern">Intern</option>
                  </select>
                </div>
                {/* Resume Upload */}
                <div>
                  <label style={labelStyle}>Resume / CV</label>
                  <input
                    ref={fileInputRef}
                    id="resume-upload"
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14, height: 60,
                      padding: '0 20px', borderRadius: 12, cursor: 'pointer',
                      transition: 'all 0.2s',
                      background: resumeFile ? 'rgba(37,99,235,0.08)' : '#1d2026',
                      border: resumeFile ? '1px solid rgba(180,197,255,0.3)' : '2px dashed rgba(67,70,85,0.5)',
                    }}
                    onMouseEnter={(e) => { if (!resumeFile) e.currentTarget.style.borderColor = 'rgba(180,197,255,0.3)'; }}
                    onMouseLeave={(e) => { if (!resumeFile) e.currentTarget.style.borderColor = 'rgba(67,70,85,0.5)'; }}
                  >
                    {resumeFile
                      ? <FileText className="w-5 h-5 shrink-0" style={{ color: '#b4c5ff' }} />
                      : <UploadCloud className="w-5 h-5 shrink-0" style={{ color: '#8d90a0' }} />
                    }
                    <span style={{ fontSize: 14, color: resumeFile ? '#b4c5ff' : '#8d90a0', fontWeight: resumeFile ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {resumeFile ? resumeFile.name : 'Click to upload PDF, DOC or DOCX (max 10MB)'}
                    </span>
                  </div>
                </div>
                {/* Cover Letter */}
                <div>
                  <label style={labelStyle}>Cover Letter / Why Us?</label>
                  <textarea
                    name="coverLetter" value={formData.coverLetter} onChange={handleChange}
                    rows={5} placeholder="Tell us about yourself and why you want to join Rogerex..."
                    style={{
                      ...inputStyle, height: 'auto', padding: '16px 20px',
                      resize: 'none', lineHeight: 1.65,
                    }}
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
                  {isLoading ? 'Submitting...' : 'Submit Application'}
                  {!isLoading && <Send className="w-4 h-4" />}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ── CTA Newsletter ── */}
        <section style={{ background: '#10131a', padding: '80px 32px' }}>
          <div
            className="max-w-container-max mx-auto rounded-[32px] relative overflow-hidden text-center"
            style={{ background: 'linear-gradient(135deg, #1d2026, #191c22)', border: '1px solid rgba(67,70,85,0.5)', padding: '64px 48px' }}
          >
            <div style={{ position: 'absolute', top: -40, left: '25%', width: 300, height: 200, borderRadius: '50%', background: 'rgba(37,99,235,0.2)', filter: 'blur(80px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(180,197,255,0.3), transparent)' }} />
            <div className="relative z-10">
              <h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 600, letterSpacing: '-0.02em', color: '#e0e2eb', marginBottom: 12 }}>Don't see a fit right now?</h2>
              <p style={{ fontSize: 16, color: '#8d90a0', maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.7 }}>
                We're always looking for exceptional talent. Send your resume to{' '}
                <a href="mailto:rogerexindia@gmail.com" style={{ color: '#b4c5ff', fontWeight: 600, textDecoration: 'underline' }}>rogerexindia@gmail.com</a>
                {' '}and we'll reach out when the right role opens up.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  style={{
                    flex: 1, width: '100%', height: 52, padding: '0 20px', borderRadius: 12,
                    background: '#1d2026', border: '1px solid rgba(67,70,85,0.5)',
                    color: '#e0e2eb', fontSize: 15, outline: 'none', fontFamily: 'Inter, sans-serif',
                  }}
                />
                <button
                  className="rounded-xl font-semibold shrink-0 transition-all duration-300"
                  style={{ height: 52, padding: '0 24px', fontSize: 14, background: '#2563eb', color: '#eeefff', cursor: 'pointer' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 24px rgba(37,99,235,0.4)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
                >
                  Get Job Alerts
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Careers;
