import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/icons2.png';

const navLinks = [
  { label: 'Home',      path: '/' },
  { label: 'About',     path: '/about' },
  { label: 'Services',  path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Careers',   path: '/careers' },
  { label: 'Contact',   path: '/contact' },
];

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsMenuOpen(false); }, [location]);

  const isActive = (path) => currentPath === path;

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'shadow-[0_1px_12px_rgba(0,0,0,0.7)]'
            : ''
        }`}
        style={{
          background: 'rgba(11,14,20,0.85)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderBottom: '1px solid rgba(67,70,85,0.35)',
        }}
      >
        <div
          className="h-20 max-w-container-max mx-auto flex items-center justify-between"
          style={{ padding: '0 32px' }}
        >
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img
              alt="Rogerex India Logo"
              className="h-8 w-auto object-contain"
              src={logo}
            />
            <div className="flex flex-col">
              <span
                className="font-semibold leading-tight tracking-tight"
                style={{ fontSize: 18, color: '#e0e2eb' }}
              >
                Rogerex India
              </span>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: '#7bd0ff' }}
                />
                <span
                  className="uppercase tracking-wider"
                  style={{ fontSize: 10, color: '#8d90a0', fontWeight: 600, letterSpacing: '0.08em' }}
                >
                  Enterprise Tech
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav — pill container */}
          <nav
            className="hidden lg:flex items-center gap-1 rounded-full p-1"
            style={{ background: '#191c22' }}
          >
            {navLinks.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className="rounded-full transition-all duration-200"
                style={{
                  padding: '6px 16px',
                  fontSize: 14,
                  fontWeight: isActive(path) ? 600 : 400,
                  color: isActive(path) ? '#e0e2eb' : '#8d90a0',
                  background: isActive(path) ? '#272a31' : 'transparent',
                  letterSpacing: '0.01em',
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300"
              style={{
                padding: '8px 20px',
                fontSize: 14,
                background: '#2563eb',
                color: '#eeefff',
                boxShadow: '0 0 24px rgba(37,99,235,0.4)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 40px rgba(37,99,235,0.65)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 24px rgba(37,99,235,0.4)';
              }}
            >
              Consult Experts
            </Link>

            {/* Hamburger */}
            <button
              className="lg:hidden flex flex-col gap-[5px] p-2 rounded-lg transition-colors"
              style={{ background: isMenuOpen ? '#272a31' : 'transparent' }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span
                className="block w-5 h-[2px] rounded-full transition-all duration-300 origin-center"
                style={{
                  background: '#e0e2eb',
                  transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
                }}
              />
              <span
                className="block w-5 h-[2px] rounded-full transition-all duration-300"
                style={{
                  background: '#e0e2eb',
                  opacity: isMenuOpen ? 0 : 1,
                  transform: isMenuOpen ? 'scaleX(0)' : 'scaleX(1)',
                }}
              />
              <span
                className="block w-5 h-[2px] rounded-full transition-all duration-300 origin-center"
                style={{
                  background: '#e0e2eb',
                  transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
                }}
              />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div
          className="lg:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: isMenuOpen ? '420px' : '0',
            borderTop: isMenuOpen ? '1px solid rgba(67,70,85,0.35)' : 'none',
            background: 'rgba(11,14,20,0.95)',
          }}
        >
          <div className="flex flex-col p-4 gap-1">
            {navLinks.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className="rounded-xl px-4 py-3 transition-all duration-200"
                style={{
                  fontSize: 15,
                  fontWeight: isActive(path) ? 600 : 400,
                  color: isActive(path) ? '#b4c5ff' : '#c3c6d7',
                  background: isActive(path) ? 'rgba(180,197,255,0.08)' : 'transparent',
                }}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="mt-2 rounded-xl px-4 py-3 text-center font-semibold transition-all duration-300"
              style={{
                background: '#2563eb',
                color: '#eeefff',
                fontSize: 15,
                boxShadow: '0 0 20px rgba(37,99,235,0.35)',
              }}
            >
              Consult Experts
            </Link>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-20" />
    </>
  );
};

export default Header;
