import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
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
  const { theme, toggleTheme } = useTheme();
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
          scrolled ? 'shadow-md' : ''
        }`}
        style={{
          background: 'var(--header-bg)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderBottom: '1px solid var(--border-color-subtle)',
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
                className="font-semibold leading-tight tracking-tight transition-colors duration-200"
                style={{ fontSize: 18, color: 'var(--text-main)' }}
              >
                Rogerex India
              </span>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: '#2563eb' }}
                />
                <span
                  className="uppercase tracking-wider transition-colors duration-200"
                  style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.08em' }}
                >
                  Enterprise Tech
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav — pill container */}
          <nav
            className="hidden lg:flex items-center gap-1 rounded-full p-1 transition-colors duration-200"
            style={{ background: 'var(--bg-pill)', border: '1px solid var(--border-color-subtle)' }}
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
                  color: isActive(path) ? 'var(--text-main)' : 'var(--text-muted)',
                  background: isActive(path) ? 'var(--bg-pill-active)' : 'transparent',
                  boxShadow: isActive(path) ? '0 2px 8px var(--shadow-color)' : 'none',
                  letterSpacing: '0.01em',
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Actions: Theme Toggle + CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
              style={{
                background: 'var(--bg-pill)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
              }}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" style={{ color: '#f59e0b' }} />
              ) : (
                <Moon className="w-4 h-4" style={{ color: '#2563eb' }} />
              )}
            </button>

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
              className="lg:hidden flex flex-col gap-[5px] p-2 rounded-lg transition-colors cursor-pointer"
              style={{ background: isMenuOpen ? 'var(--bg-pill)' : 'transparent' }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span
                className="block w-5 h-[2px] rounded-full transition-all duration-300 origin-center"
                style={{
                  background: 'var(--text-main)',
                  transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
                }}
              />
              <span
                className="block w-5 h-[2px] rounded-full transition-all duration-300"
                style={{
                  background: 'var(--text-main)',
                  opacity: isMenuOpen ? 0 : 1,
                  transform: isMenuOpen ? 'scaleX(0)' : 'scaleX(1)',
                }}
              />
              <span
                className="block w-5 h-[2px] rounded-full transition-all duration-300 origin-center"
                style={{
                  background: 'var(--text-main)',
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
            borderTop: isMenuOpen ? '1px solid var(--border-color-subtle)' : 'none',
            background: 'var(--mobile-menu-bg)',
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
                  color: isActive(path) ? '#2563eb' : 'var(--text-main)',
                  background: isActive(path) ? 'var(--bg-pill)' : 'transparent',
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
