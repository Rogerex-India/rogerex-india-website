import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, X, AlertTriangle } from 'lucide-react';

/**
 * DeleteConfirmModal
 * Props:
 *  - isOpen: boolean
 *  - name: string  — name of the item being deleted
 *  - itemType: string — e.g. "contact inquiry" | "application"
 *  - onConfirm: () => void
 *  - onCancel: () => void
 */
const DeleteConfirmModal = ({ isOpen, name, itemType = 'record', onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="delete-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
          onClick={onCancel}
        >
          <motion.div
            key="delete-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top accent bar */}
            <div style={{ height: 3, background: 'linear-gradient(90deg, #ef4444, #f97316)' }} />

            {/* Close button */}
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 p-1.5 rounded-lg transition-colors cursor-pointer hover:bg-black/10 dark:hover:bg-white/10"
              style={{ color: 'var(--text-muted)' }}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6">
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)' }}
              >
                <AlertTriangle className="w-7 h-7" style={{ color: '#ef4444' }} />
              </div>

              {/* Text */}
              <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-main)' }}>
                Delete {itemType}?
              </h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                You are about to permanently delete the {itemType} from{' '}
                <span className="font-semibold" style={{ color: 'var(--text-main)' }}>
                  &quot;{name}&quot;
                </span>
                . This action cannot be undone.
              </p>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onCancel}
                  className="flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                  style={{
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-main)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--text-muted)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  style={{
                    background: '#ef4444',
                    color: '#fff',
                    boxShadow: '0 0 20px rgba(239,68,68,0.3)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#dc2626'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#ef4444'; }}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;
