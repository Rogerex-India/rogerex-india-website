import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Calendar, Eye, Trash2, AlertCircle, Clock, MessageSquare, CheckCircle2, ChevronDown } from 'lucide-react';

/* ── Status config ─────────────────────────────────────── */
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
    value: 'Contacted',
    label: 'Contacted',
    icon: MessageSquare,
    color: '#2563eb',
    bg: 'rgba(37,99,235,0.12)',
    border: 'rgba(37,99,235,0.3)',
  },
  {
    value: 'Resolved',
    label: 'Resolved',
    icon: CheckCircle2,
    color: '#10b981',
    bg: 'rgba(16,185,129,0.12)',
    border: 'rgba(16,185,129,0.3)',
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

/* ── Main ContactTable ─────────────────────────────────── */
const ContactTable = ({
  filteredRequests,
  totalCount,
  onOpenDetail,
  onStatusChange,
  onDelete,
}) => {
  return (
    <div
      className="rounded-2xl overflow-hidden border shadow-xl"
      style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--border-color)',
      }}
    >
      {filteredRequests.length === 0 ? (
        <div className="p-12 text-center">
          <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center bg-gray-500/10 text-gray-400">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-main)' }}>
            No contact requests found
          </h3>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Try clearing your search query or status filter to view all submissions.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr
                className="border-b text-xs font-semibold uppercase tracking-wider"
                style={{
                  background: 'var(--bg-container)',
                  borderColor: 'var(--border-color-subtle)',
                  color: 'var(--text-muted)',
                }}
              >
                <th className="py-4 px-6">Client Info</th>
                <th className="py-4 px-6">Subject &amp; Preview</th>
                <th className="py-4 px-6">Date &amp; Time</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--border-color-subtle)' }}>
              {filteredRequests.map((req) => {
                const reqId = req._id || req.id;
                return (
                  <motion.tr
                    key={reqId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="transition-colors hover:bg-blue-500/5 cursor-pointer"
                    onClick={() => onOpenDetail(req)}
                  >
                    {/* Client Info */}
                    <td className="py-4 px-6">
                      <div className="font-semibold text-sm" style={{ color: 'var(--text-main)' }}>
                        {req.name}
                      </div>
                      <div className="text-xs flex items-center gap-1 mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        <Mail className="w-3 h-3 text-blue-500 shrink-0" />
                        <span>{req.email}</span>
                      </div>
                      <div className="text-xs flex items-center gap-1 mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        <Phone className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span>{req.phone}</span>
                      </div>
                    </td>

                    {/* Subject & Message preview */}
                    <td className="py-4 px-6 max-w-xs">
                      <div className="font-medium text-sm truncate" style={{ color: 'var(--text-main)' }}>
                        {req.subject}
                      </div>
                      <p className="text-xs truncate mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        {req.message}
                      </p>
                      {req.notes && (
                        <span className="inline-flex items-center gap-1 text-[10px] mt-1 text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
                          Note attached
                        </span>
                      )}
                    </td>

                    {/* Date & Time */}
                    <td className="py-4 px-6 whitespace-nowrap text-xs" style={{ color: 'var(--text-muted)' }}>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        {new Date(req.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="text-[11px] opacity-75 mt-0.5">
                        {new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>

                    {/* Status dropdown */}
                    <td className="py-4 px-6 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <StatusDropdown
                        value={req.status}
                        onChange={(newStatus) => onStatusChange(reqId, newStatus)}
                      />
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 whitespace-nowrap text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onOpenDetail(req)}
                          className="p-2 rounded-lg transition-colors cursor-pointer hover:bg-blue-500/10 text-blue-500"
                          title="View Full Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(reqId, req.name)}
                          className="p-2 rounded-lg transition-colors cursor-pointer hover:bg-red-500/10 text-red-500"
                          title="Delete Request"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer count info */}
      <div className="p-4 border-t text-xs flex items-center justify-between" style={{ borderColor: 'var(--border-color-subtle)', color: 'var(--text-muted)' }}>
        <span>Showing {filteredRequests.length} of {totalCount} total contact requests</span>
        <span>Rogerex India Internal Admin System</span>
      </div>
    </div>
  );
};

export default ContactTable;
