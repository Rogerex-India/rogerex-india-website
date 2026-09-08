import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Eye, EyeOff, Lock, User, ArrowRight, Sun, Moon, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useTheme } from '../../context/ThemeContext';
import logo from '../../assets/icons2.png';

const EASE = [0.16, 1, 0.3, 1];

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login, isAuthenticated } = useAdminAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // If already authenticated, redirect to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      toast.error('Please enter both username and password.');
      return;
    }

    setLoading(true);
    const result = await login(username, password);
    setLoading(false);

    if (result.success) {
      toast.success('Welcome back, System Administrator!');
      navigate('/admin/dashboard', { replace: true });
    } else {
      toast.error(result.message || 'Invalid login credentials');
    }
  };

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('admin123');
    toast.success('Demo credentials loaded!');
  };

  const inputStyle = {
    width: '100%',
    height: 50,
    padding: '0 16px 0 44px',
    borderRadius: 12,
    background: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-main)',
    fontSize: 14,
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.2s ease',
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between relative overflow-hidden transition-colors duration-300"
      style={{ background: 'var(--bg-main)', color: 'var(--text-main)' }}
    >
      {/* Background ambient Orbs & Grid */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 700,
          height: 400,
          borderRadius: '50%',
          background: 'var(--orb-primary)',
          filter: 'blur(120px)',
          pointerEvents: 'none',
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />

      {/* Top Bar Navigation */}
      <header className="relative z-10 max-w-container-max w-full mx-auto p-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <img src={logo} alt="Rogerex India Logo" className="h-8 w-auto object-contain" />
          <div className="flex flex-col">
            <span className="font-semibold text-lg leading-tight tracking-tight" style={{ color: 'var(--text-main)' }}>
              Rogerex India
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#2563eb' }} />
              <span className="uppercase tracking-wider text-[10px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                Admin Portal
              </span>
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
            style={{
              background: 'var(--bg-pill)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
            }}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
          </button>
          <Link
            to="/"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
            style={{
              background: 'var(--bg-pill)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-muted)',
            }}
          >
            Back to Main Site
          </Link>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="relative z-10 flex-grow flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="w-full max-w-md rounded-[28px] p-8 md:p-10 shadow-2xl relative overflow-hidden"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            boxShadow: '0 20px 50px var(--shadow-color)',
          }}
        >
          {/* Header section */}
          <div className="text-center mb-8">
            <div
              className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg"
              style={{
                background: 'rgba(37,99,235,0.12)',
                border: '1px solid var(--border-color)',
              }}
            >
              <ShieldCheck className="w-7 h-7" style={{ color: '#2563eb' }} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight mb-2" style={{ color: 'var(--text-main)' }}>
              Admin Sign In
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Enter credentials to access contact requests & analytics dashboard.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                Username / Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = '#2563eb')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ ...inputStyle, paddingRight: 44 }}
                  onFocus={(e) => (e.target.style.borderColor = '#2563eb')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer p-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Quick Demo Fill Helper */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer hover:underline"
                style={{ color: '#2563eb' }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Fill Demo Credentials (admin / admin123)
              </button>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 cursor-pointer py-3.5 text-sm"
              style={{
                background: loading ? 'rgba(37,99,235,0.6)' : '#2563eb',
                color: '#ffffff',
                boxShadow: loading ? 'none' : '0 0 24px rgba(37,99,235,0.4)',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </motion.button>
          </form>

          {/* Footer note inside card */}
          <div className="mt-6 pt-6 border-t text-center text-xs" style={{ borderColor: 'var(--border-color-subtle)', color: 'var(--text-muted)' }}>
            Protected area for Rogerex India Administrators only.
          </div>
        </motion.div>
      </main>

      {/* Page Footer */}
      <footer className="relative z-10 py-4 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
        © {new Date().getFullYear()} Rogerex India. All rights reserved.
      </footer>
    </div>
  );
};

export default AdminLogin;
