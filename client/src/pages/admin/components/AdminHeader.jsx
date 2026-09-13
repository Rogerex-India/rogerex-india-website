import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Sun, Moon, ExternalLink, KeyRound } from 'lucide-react';
import logo from '../../../assets/icons2.png';

const AdminHeader = ({ adminUser, theme, toggleTheme, onLogout, onChangePassword }) => {
  return (
    <header
      className="sticky top-0 z-40 transition-colors duration-300 border-b backdrop-blur-xl"
      style={{
        background: 'var(--header-bg)',
        borderColor: 'var(--border-color-subtle)',
      }}
    >
      <div className="max-w-container-max mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Logo & Admin Indicator */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Rogerex Logo" className="h-8 w-auto object-contain" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg leading-tight" style={{ color: 'var(--text-main)' }}>
                  Rogerex India
                </span>
                <span
                  className="px-2 py-0.5 rounded-md text-[11px] font-bold tracking-wider uppercase"
                  style={{ background: 'rgba(37,99,235,0.15)', color: '#2563eb', border: '1px solid rgba(37,99,235,0.3)' }}
                >
                  Admin
                </span>
              </div>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Contact Requests Management
              </p>
            </div>
          </Link>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-3">
          <div
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
            style={{ background: 'var(--bg-pill)', border: '1px solid var(--border-color)' }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span style={{ color: 'var(--text-muted)' }}>Logged in as:</span>
            <span className="font-semibold" style={{ color: 'var(--text-main)' }}>
              {adminUser?.username || adminUser?.name || 'Admin'}
            </span>
          </div>

          {/* Change Password Button */}
          <button
            onClick={onChangePassword}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border"
            style={{ background: 'var(--bg-pill)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
            title="Change Password"
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-500" />
            Change Password
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer"
            style={{ background: 'var(--bg-pill)', border: '1px solid var(--border-color)' }}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
          </button>

          {/* View Site */}
          <Link
            to="/"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ background: 'var(--bg-pill)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
          >
            <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
            View Site
          </Link>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-red-500 hover:bg-red-500/10 border border-red-500/20"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
