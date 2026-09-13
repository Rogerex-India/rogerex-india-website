import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MessageSquare, CheckCircle2, X, User, Mail, Phone, Calendar, Check, Trash2 } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1];

const renderStatusBadge = (status) => {
  switch (status) {
    case 'Pending':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-500 border border-amber-500/30">
          <Clock className="w-3.5 h-3.5" />
          Pending
        </span>
      );
    case 'Contacted':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-500 border border-blue-500/30">
          <MessageSquare className="w-3.5 h-3.5" />
          Contacted
        </span>
      );
    case 'Resolved':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Resolved
        </span>
      );
    default:
      return null;
  }
};

const ContactDetailModal = ({
  selectedRequest,
  onClose,
  activeNote,
  setActiveNote,
  onSaveNote,
  onStatusChange,
  onDelete,
}) => {
  if (!selectedRequest) return null;

  const reqId = selectedRequest._id || selectedRequest.id;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="relative w-full max-w-2xl rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
          }}
        >
          {/* Modal Header */}
          <div className="flex items-start justify-between pb-4 border-b mb-6" style={{ borderColor: 'var(--border-color-subtle)' }}>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20">
                  ID: {reqId}
                </span>
                {renderStatusBadge(selectedRequest.status)}
              </div>
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-main)' }}>
                {selectedRequest.subject}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full transition-colors cursor-pointer hover:bg-gray-500/10"
              style={{ color: 'var(--text-muted)' }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="overflow-y-auto space-y-6 flex-grow pr-1">
            {/* Client Contact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl" style={{ background: 'var(--bg-container)', border: '1px solid var(--border-color-subtle)' }}>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold block mb-1" style={{ color: 'var(--text-muted)' }}>
                  Client Name
                </span>
                <div className="text-sm font-semibold flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                  <User className="w-4 h-4 text-blue-500" />
                  {selectedRequest.name}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold block mb-1" style={{ color: 'var(--text-muted)' }}>
                  Email Address
                </span>
                <a
                  href={`mailto:${selectedRequest.email}?subject=Re: ${selectedRequest.subject}`}
                  className="text-sm font-semibold flex items-center gap-2 hover:underline text-blue-500"
                >
                  <Mail className="w-4 h-4" />
                  {selectedRequest.email}
                </a>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold block mb-1" style={{ color: 'var(--text-muted)' }}>
                  Phone Number
                </span>
                <a href={`tel:${selectedRequest.phone}`} className="text-sm font-semibold flex items-center gap-2 hover:underline text-emerald-500">
                  <Phone className="w-4 h-4" />
                  {selectedRequest.phone}
                </a>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold block mb-1" style={{ color: 'var(--text-muted)' }}>
                  Submission Date
                </span>
                <div className="text-sm font-semibold flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                  <Calendar className="w-4 h-4 text-amber-500" />
                  {new Date(selectedRequest.createdAt).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Full Message Box */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold mb-2" style={{ color: 'var(--text-muted)' }}>
                Message Content
              </h4>
              <div
                className="p-5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap font-sans"
                style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                }}
              >
                {selectedRequest.message}
              </div>
            </div>

            {/* Status Management */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold mb-2" style={{ color: 'var(--text-muted)' }}>
                Update Inquiry Status
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Pending', 'Contacted', 'Resolved'].map((st) => (
                  <button
                    key={st}
                    onClick={() => onStatusChange(reqId, st)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 border"
                    style={{
                      background: selectedRequest.status === st ? '#2563eb' : 'var(--bg-pill)',
                      color: selectedRequest.status === st ? '#ffffff' : 'var(--text-main)',
                      borderColor: selectedRequest.status === st ? '#2563eb' : 'var(--border-color)',
                    }}
                  >
                    {selectedRequest.status === st && <Check className="w-3.5 h-3.5" />}
                    Set {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Internal Admin Notes */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold mb-2 flex items-center justify-between" style={{ color: 'var(--text-muted)' }}>
                <span>Internal Admin Notes</span>
                <span className="text-[10px] font-normal text-amber-500">(Visible only to admin)</span>
              </h4>
              <textarea
                rows={3}
                value={activeNote}
                onChange={(e) => setActiveNote(e.target.value)}
                placeholder="Add internal notes or follow-up logs regarding this client inquiry..."
                className="w-full p-4 rounded-2xl text-xs leading-relaxed outline-none transition-all"
                style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                }}
              />
              <button
                onClick={onSaveNote}
                className="mt-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                style={{ background: 'var(--bg-pill)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
              >
                Save Note
              </button>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t mt-6" style={{ borderColor: 'var(--border-color-subtle)' }}>
            <button
              onClick={() => onDelete(reqId, selectedRequest.name)}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-500/10 border border-red-500/20 cursor-pointer flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete Request
            </button>

            <div className="flex items-center gap-2">
              <a
                href={`mailto:${selectedRequest.email}?subject=Re: ${selectedRequest.subject}`}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all flex items-center gap-1.5 shadow-lg shadow-blue-500/20"
              >
                <Mail className="w-3.5 h-3.5" />
                Reply via Email
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer"
                style={{ background: 'var(--bg-pill)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ContactDetailModal;
