import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Trash2, Clock, CheckCircle2, XCircle, ChevronDown } from 'lucide-react';

/* ── Status config for careers ─────────────────────────── */
const STATUS_OPTIONS = [
  {
    value: 'Pending',
    label: 'Pending',
    icon: Clock,
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.12)',
    border: 'rgba(245,158,11,0.3)',
  },
  {
    value: 'Reviewed',
    label: 'Reviewed',
    icon: CheckCircle2,
    color: '#2563eb',
    bg: 'rgba(37,99,235,0.12)',
    border: 'rgba(37,99,235,0.3)',
  },
  {
    value: 'Rejected',
    label: 'Rejected',
    icon: XCircle,
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.12)',
    border: 'rgba(239,68,68,0.3)',
  },
];

const getStatus = (val) => STATUS_OPTIONS.find((s) => s.value === val) || STATUS_OPTIONS[0];

/* ── Custom Status Dropdown ────────────────────────────── */
const StatusDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = getStatus(value);
  const Icon = current.icon;

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block" style={{ minWidth: 130 }}>
      {/* Trigger pill */}
      <button
        onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}
        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer"
        style={{
          background: current.bg,
          border: `1px solid ${current.border}`,
          color: current.color,
        }}
      >
        <Icon className="w-3.5 h-3.5 shrink-0" />
        {current.label}
        <ChevronDown
          className="w-3 h-3 ml-auto transition-transform"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute left-0 top-full mt-1.5 z-50 rounded-xl overflow-hidden shadow-xl"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              minWidth: 148,
            }}
          >
            {STATUS_OPTIONS.map((opt) => {
              const OIcon = opt.icon;
              const isActive = opt.value === value;
              return (
                <button
                  key={opt.value}
                  onClick={(e) => { e.stopPropagation(); onChange(opt.value); setOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold transition-colors cursor-pointer"
                  style={{
                    background: isActive ? opt.bg : 'transparent',
                    color: isActive ? opt.color : 'var(--text-muted)',
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'var(--bg-input)'; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                >
                  <OIcon className="w-3.5 h-3.5 shrink-0" style={{ color: opt.color }} />
                  {opt.label}
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: opt.color }} />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Main CareerTable ──────────────────────────────────── */
const CareerTable = ({ careers, totalCount, onOpenDetail, onStatusChange, onDelete }) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-sm" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr style={{ background: 'var(--bg-alt)', borderBottom: '1px solid var(--border-color)' }}>
              <th className="p-4 font-semibold text-sm" style={{ color: 'var(--text-muted)' }}>Date</th>
              <th className="p-4 font-semibold text-sm" style={{ color: 'var(--text-muted)' }}>Applicant</th>
              <th className="p-4 font-semibold text-sm" style={{ color: 'var(--text-muted)' }}>Role</th>
              <th className="p-4 font-semibold text-sm" style={{ color: 'var(--text-muted)' }}>Status</th>
              <th className="p-4 font-semibold text-sm text-right" style={{ color: 'var(--text-muted)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {careers.map((career) => (
              <tr
                key={career._id}
                className="transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                style={{ borderBottom: '1px solid var(--border-color)' }}
              >
                <td className="p-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                  {new Date(career.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <div className="font-medium text-sm" style={{ color: 'var(--text-main)' }}>{career.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{career.email}</div>
                </td>
                <td className="p-4 text-sm font-medium" style={{ color: 'var(--text-main)' }}>
                  {career.role}
                </td>
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <StatusDropdown
                    value={career.status}
                    onChange={(newStatus) => onStatusChange(career._id, newStatus)}
                  />
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onOpenDetail(career)}
                      className="p-1.5 rounded-md transition-colors cursor-pointer hover:bg-blue-500/10"
                      title="View Details"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(career._id, career.name)}
                      className="p-1.5 rounded-md transition-colors cursor-pointer text-red-500 hover:bg-red-500/10"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {careers.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="p-4 text-xs flex justify-between items-center" style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
        <span>Showing {careers.length} of {totalCount} applications</span>
      </div>
    </div>
  );
};

export default CareerTable;
