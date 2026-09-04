import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/icons2.png';

const footerLinks = {
  Solutions: [
    { label: 'Software Dev',    path: '/services' },
    { label: 'Cloud Solutions', path: '/services' },
    { label: 'AI & Automation', path: '/services' },
    { label: 'UI/UX Design',    path: '/services' },
    { label: 'Mobile Apps',     path: '/services' },
  ],
  Company: [
    { label: 'About Us',   path: '/about' },
    { label: 'Portfolio',  path: '/portfolio' },
    { label: 'Careers',    path: '/careers' },
    { label: 'Contact',    path: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy',   path: '#' },
    { label: 'Terms of Service', path: '#' },
  ],
};

const Footer = () => {
  return (
    <footer
      style={{
        background: '#0b0e14',
        borderTop: '1px solid rgba(67,70,85,0.4)',
      }}
    >
      {/* Main footer grid */}
      <div
        className="max-w-container-max mx-auto"
        style={{ padding: '80px 32px 48px' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <img alt="Logo" className="h-8 w-auto object-contain" src={logo} />
              <span
                className="font-semibold tracking-tight"
                style={{ fontSize: 20, color: '#e0e2eb' }}
              >
                Rogerex India
              </span>
            </Link>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: '#8d90a0', maxWidth: 300 }}>
              Leading the digital transformation journey for enterprises globally through
              innovative, scalable, and reliable tech solutions.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              {[
                {
                  label: 'LinkedIn',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  ),
                },
                {
                  label: 'Twitter',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                    </svg>
                  ),
                },
                {
                  label: 'GitHub',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
                    </svg>
                  ),
                },
              ].map(({ label, icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    background: '#1d2026',
                    color: '#8d90a0',
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

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="md:col-span-2">
              <h5
                className="font-semibold mb-5 uppercase tracking-widest"
                style={{ fontSize: 11, color: '#8d90a0', letterSpacing: '0.1em' }}
              >
                {title}
              </h5>
              <ul className="flex flex-col gap-3">
                {links.map(({ label, path }) => (
                  <li key={label}>
                    <Link
                      to={path}
                      style={{ fontSize: 14, color: '#c3c6d7', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#b4c5ff')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#c3c6d7')}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div className="md:col-span-2">
            <h5
              className="font-semibold mb-5 uppercase tracking-widest"
              style={{ fontSize: 11, color: '#8d90a0', letterSpacing: '0.1em' }}
            >
              Contact
            </h5>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:rogerexindia@gmail.com"
                  style={{ fontSize: 14, color: '#c3c6d7', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#b4c5ff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#c3c6d7')}
                >
                  rogerexindia@gmail.com
                </a>
              </li>
              <li style={{ fontSize: 14, color: '#8d90a0' }}>Bengaluru, Karnataka</li>
              <li style={{ fontSize: 14, color: '#8d90a0' }}>India</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid rgba(67,70,85,0.3)',
          padding: '20px 32px',
        }}
      >
        <div
          className="max-w-container-max mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p style={{ fontSize: 13, color: '#8d90a0' }}>
            © 2026 Rogerex India. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: '#7bd0ff' }}
            />
            <span style={{ fontSize: 12, color: '#8d90a0' }}>
              Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
