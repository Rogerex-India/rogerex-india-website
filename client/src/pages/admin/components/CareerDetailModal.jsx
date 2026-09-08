import React from 'react';
import { X, Save, DownloadCloud } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CareerDetailModal = ({
  selectedCareer,
  onClose,
  activeNote,
  setActiveNote,
  onSaveNote,
  onStatusChange,
  onDelete,
}) => {
  if (!selectedCareer) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
          style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)' }}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b" style={{ background: 'var(--bg-main)', borderColor: 'var(--border-color)' }}>
            <div>
              <h2 className="text-xl font-semibold" style={{ color: 'var(--text-main)' }}>Application Details</h2>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                Received {new Date(selectedCareer.createdAt).toLocaleString()}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={selectedCareer.status}
                onChange={(e) => onStatusChange(selectedCareer._id, e.target.value)}
                className="text-sm font-medium px-4 py-2 rounded-lg outline-none cursor-pointer border hover:border-black/20 dark:hover:border-white/20 transition-colors"
                style={{ background: 'var(--bg-input)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
              >
                <option value="Pending">Status: Pending</option>
                <option value="Reviewed">Status: Reviewed</option>
                <option value="Rejected">Status: Rejected</option>
              </select>

              <a
                href={selectedCareer.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{ background: '#2563eb', color: '#fff' }}
              >
                <DownloadCloud className="w-4 h-4" /> Download Resume
              </a>

              <button
                onClick={() => {
                  onDelete(selectedCareer._id, selectedCareer.name);
                  onClose();
                }}
                className="px-4 py-2 rounded-lg text-sm font-medium text-red-500 border border-red-200 hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-900/20 transition-colors"
              >
                Delete Application
              </button>
            </div>

            {/* Applicant Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border-color-subtle)' }}>
                <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Name</div>
                <div className="font-medium" style={{ color: 'var(--text-main)' }}>{selectedCareer.name}</div>
              </div>
              <div className="p-4 rounded-xl" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border-color-subtle)' }}>
                <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Role</div>
                <div className="font-medium" style={{ color: 'var(--text-main)' }}>{selectedCareer.role}</div>
              </div>
              <div className="p-4 rounded-xl" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border-color-subtle)' }}>
                <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Email</div>
                <div className="font-medium">
                  <a href={`mailto:${selectedCareer.email}`} className="hover:underline" style={{ color: '#2563eb' }}>{selectedCareer.email}</a>
                </div>
              </div>
              <div className="p-4 rounded-xl" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border-color-subtle)' }}>
                <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Phone</div>
                <div className="font-medium">
                  <a href={`tel:${selectedCareer.phone}`} className="hover:underline" style={{ color: '#2563eb' }}>{selectedCareer.phone}</a>
                </div>
              </div>
              <div className="p-4 rounded-xl md:col-span-2" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border-color-subtle)' }}>
                <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>College</div>
                <div className="font-medium" style={{ color: 'var(--text-main)' }}>{selectedCareer.college}</div>
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider mb-2 pl-1" style={{ color: 'var(--text-muted)' }}>Cover Letter</div>
              <div className="p-5 rounded-xl text-sm leading-relaxed whitespace-pre-wrap" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border-color-subtle)', color: 'var(--text-main)' }}>
                {selectedCareer.coverLetter}
              </div>
            </div>

            {/* Admin Notes */}
            <div>
              <div className="flex items-center justify-between mb-2 pl-1">
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Admin Notes (Internal)</span>
              </div>
              <div className="relative">
                <textarea
                  value={activeNote}
                  onChange={(e) => setActiveNote(e.target.value)}
                  placeholder="Add private notes about this applicant..."
                  rows={4}
                  className="w-full p-4 rounded-xl text-sm outline-none transition-colors border"
                  style={{
                    background: 'var(--bg-input)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-main)',
                  }}
                />
                <button
                  onClick={onSaveNote}
                  disabled={activeNote === (selectedCareer.notes || '')}
                  className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: '#2563eb', color: '#fff' }}
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CareerDetailModal;
