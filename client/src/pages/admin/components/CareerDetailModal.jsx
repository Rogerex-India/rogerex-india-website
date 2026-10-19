import React, { useState } from 'react';
import { X, Save, Mail, Eye, ChevronDown, Clock, CheckCircle2, XCircle, Send, Linkedin, Github, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAdminAuth, getApiBase } from '../../../context/AdminAuthContext';

const RECRUITMENT_STATUSES = [
  'Application Received',
  'Shortlisted',
  'Rejected',
  'Project Details Requested',
  'Project Submission Instructions Sent',
  'Project Submitted',
  'Internship Offer Sent',
  'Offer Accepted',
  'Internship Completed',
];

const EMAIL_TEMPLATES = [
  { id: 'shortlist', name: 'Shortlist Confirmation', fields: [] },
  { id: 'rejection', name: 'Rejection Notice', fields: [] },
  { id: 'project-details-request', name: 'Project Details Request', fields: ['projectName', 'deadline'] },
  { id: 'project-submission', name: 'Project Submission Instructions', fields: ['projectName', 'deadline'] },
  { id: 'offer-letter', name: 'Internship Offer Letter', fields: ['internshipStartDate'] },
  { id: 'offer-acceptance', name: 'Offer Acceptance Confirmation', fields: ['internshipStartDate'] },
  { id: 'completion', name: 'Internship Completion', fields: [] },
];

const CareerDetailModal = ({
  selectedCareer,
  onClose,
  activeNote,
  setActiveNote,
  onSaveNote,
  onStatusChange,
  onDelete,
}) => {
  const { getAuthHeaders } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'email' | 'history'
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [templateVars, setTemplateVars] = useState({ projectName: '', deadline: '', internshipStartDate: '' });
  const [emailPreview, setEmailPreview] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  if (!selectedCareer) return null;

  const currentTemplate = EMAIL_TEMPLATES.find((t) => t.id === selectedTemplate);

  const handlePreview = async () => {
    if (!selectedTemplate) { toast.error('Please select an email template.'); return; }
    setPreviewLoading(true);
    setEmailPreview(null);
    try {
      const API_BASE = getApiBase();
      const resp = await fetch(`${API_BASE}/api/admin/careers/${selectedCareer._id}/email/preview`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ templateType: selectedTemplate, variables: templateVars }),
      });
      const data = await resp.json();
      if (data.success) {
        setEmailPreview(data.data);
        setConfirmed(false);
      } else {
        toast.error(data.message || 'Failed to generate preview.');
      }
    } catch {
      toast.error('Network error generating preview.');
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleSend = async () => {
    if (!confirmed) { toast.error('Please confirm before sending.'); return; }
    setSendLoading(true);
    try {
      const API_BASE = getApiBase();
      const resp = await fetch(`${API_BASE}/api/admin/careers/${selectedCareer._id}/email/send`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          templateType: selectedTemplate,
          variables: templateVars,
          updateStatus: true,
          newStatus: emailPreview?.recruitmentStatus,
        }),
      });
      const data = await resp.json();
      if (data.success) {
        toast.success(`Email sent to ${selectedCareer.email}`);
        onStatusChange(selectedCareer._id, data.data.career.status);
        setEmailPreview(null);
        setConfirmed(false);
        setSelectedTemplate('');
        setActiveTab('history');
      } else {
        toast.error(data.message || 'Failed to send email.');
      }
    } catch {
      toast.error('Network error sending email.');
    } finally {
      setSendLoading(false);
    }
  };

  const labelStyle = { fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4, display: 'block' };

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
              <h2 className="text-xl font-semibold" style={{ color: 'var(--text-main)' }}>{selectedCareer.name}</h2>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                {selectedCareer.role} · Applied {new Date(selectedCareer.appliedAt || selectedCareer.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors" style={{ color: 'var(--text-muted)' }}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Status + Delete */}
          <div className="px-6 pt-4 flex flex-wrap items-center gap-3">
            <select
              value={selectedCareer.status}
              onChange={(e) => onStatusChange(selectedCareer._id, e.target.value)}
              className="text-sm font-medium px-4 py-2 rounded-lg outline-none cursor-pointer border transition-colors"
              style={{ background: 'var(--bg-input)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
            >
              {RECRUITMENT_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <button
              onClick={() => { onDelete(selectedCareer._id, selectedCareer.name); onClose(); }}
              className="px-4 py-2 rounded-lg text-sm font-medium text-red-500 border border-red-200 hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-900/20 transition-colors"
            >
              Delete
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 px-6 pt-4 pb-0 border-b" style={{ borderColor: 'var(--border-color)' }}>
            {['profile', 'email', 'history'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-2 capitalize text-sm font-semibold transition-colors"
                style={{
                  color: activeTab === tab ? '#2563eb' : 'var(--text-muted)',
                  borderBottom: activeTab === tab ? '2px solid #2563eb' : '2px solid transparent',
                }}
              >
                {tab === 'email' ? 'Send Email' : tab === 'history' ? `History (${(selectedCareer.communicationHistory || []).length})` : tab}
              </button>
            ))}
          </div>

          {/* Body */}
          <div className="p-6 space-y-5">

            {/* ── PROFILE TAB ── */}
            {activeTab === 'profile' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: 'Name', value: selectedCareer.name },
                    { label: 'Role', value: selectedCareer.role },
                    { label: 'Degree', value: selectedCareer.degree || '—' },
                    { label: 'Graduation Year', value: selectedCareer.graduationYear || '—' },
                    { label: 'College', value: selectedCareer.college, span: true },
                  ].map(({ label, value, span }) => (
                    <div key={label} className={`p-4 rounded-xl ${span ? 'md:col-span-2' : ''}`} style={{ background: 'var(--bg-alt)', border: '1px solid var(--border-color-subtle)' }}>
                      <div style={labelStyle}>{label}</div>
                      <div className="font-medium" style={{ color: 'var(--text-main)' }}>{value}</div>
                    </div>
                  ))}

                  <div className="p-4 rounded-xl" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border-color-subtle)' }}>
                    <div style={labelStyle}>Email</div>
                    <a href={`mailto:${selectedCareer.email}`} className="font-medium hover:underline" style={{ color: '#2563eb' }}>{selectedCareer.email}</a>
                  </div>

                  <div className="p-4 rounded-xl" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border-color-subtle)' }}>
                    <div style={labelStyle}>Phone</div>
                    <a href={`tel:${selectedCareer.phone}`} className="font-medium hover:underline" style={{ color: '#2563eb' }}>{selectedCareer.phone}</a>
                  </div>

                  {selectedCareer.linkedin && (
                    <div className="p-4 rounded-xl" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border-color-subtle)' }}>
                      <div style={labelStyle}>LinkedIn</div>
                      <a href={selectedCareer.linkedin} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline flex items-center gap-1" style={{ color: '#2563eb' }}>
                        {selectedCareer.linkedin.replace('https://', '')} <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}

                  {selectedCareer.github && (
                    <div className="p-4 rounded-xl" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border-color-subtle)' }}>
                      <div style={labelStyle}>GitHub</div>
                      <a href={selectedCareer.github} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline flex items-center gap-1" style={{ color: '#2563eb' }}>
                        {selectedCareer.github.replace('https://', '')} <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>

                {selectedCareer.coverLetter && (
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider mb-2 pl-1" style={{ color: 'var(--text-muted)' }}>Cover Letter</div>
                    <div className="p-5 rounded-xl text-sm leading-relaxed whitespace-pre-wrap" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border-color-subtle)', color: 'var(--text-main)' }}>
                      {selectedCareer.coverLetter}
                    </div>
                  </div>
                )}

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
                      style={{ background: 'var(--bg-input)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
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
              </>
            )}

            {/* ── EMAIL TAB ── */}
            {activeTab === 'email' && (
              <div className="space-y-5">
                <div>
                  <label style={labelStyle}>Select Email Template</label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => { setSelectedTemplate(e.target.value); setEmailPreview(null); setConfirmed(false); }}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none border cursor-pointer"
                    style={{ background: 'var(--bg-input)', borderColor: 'var(--border-color)', color: 'var(--text-main)', height: 52 }}
                  >
                    <option value="">Choose a template...</option>
                    {EMAIL_TEMPLATES.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>

                {/* Dynamic template variable fields */}
                {currentTemplate && currentTemplate.fields.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentTemplate.fields.includes('projectName') && (
                      <div>
                        <label style={labelStyle}>Project Name / Topic</label>
                        <input
                          value={templateVars.projectName}
                          onChange={(e) => setTemplateVars({ ...templateVars, projectName: e.target.value })}
                          placeholder="e.g. Practical Milestone Challenge"
                          className="w-full px-4 rounded-xl text-sm outline-none border"
                          style={{ height: 48, background: 'var(--bg-input)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
                        />
                      </div>
                    )}
                    {currentTemplate.fields.includes('deadline') && (
                      <div>
                        <label style={labelStyle}>Deadline</label>
                        <input
                          value={templateVars.deadline}
                          onChange={(e) => setTemplateVars({ ...templateVars, deadline: e.target.value })}
                          placeholder="e.g. within 3 days / 20 Oct 2026"
                          className="w-full px-4 rounded-xl text-sm outline-none border"
                          style={{ height: 48, background: 'var(--bg-input)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
                        />
                      </div>
                    )}
                    {currentTemplate.fields.includes('internshipStartDate') && (
                      <div>
                        <label style={labelStyle}>Internship Start Date</label>
                        <input
                          value={templateVars.internshipStartDate}
                          onChange={(e) => setTemplateVars({ ...templateVars, internshipStartDate: e.target.value })}
                          placeholder="e.g. 1 Nov 2026"
                          className="w-full px-4 rounded-xl text-sm outline-none border"
                          style={{ height: 48, background: 'var(--bg-input)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
                        />
                      </div>
                    )}
                  </div>
                )}

                <button
                  onClick={handlePreview}
                  disabled={!selectedTemplate || previewLoading}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-50"
                  style={{ background: 'rgba(37,99,235,0.12)', color: '#2563eb', border: '1px solid rgba(37,99,235,0.3)' }}
                >
                  <Eye className="w-4 h-4" />
                  {previewLoading ? 'Generating Preview...' : 'Generate Preview'}
                </button>

                {emailPreview && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border-color-subtle)' }}>
                      <div style={labelStyle}>Subject</div>
                      <div className="font-medium text-sm" style={{ color: 'var(--text-main)' }}>{emailPreview.subject}</div>
                    </div>
                    <div className="p-4 rounded-xl" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border-color-subtle)' }}>
                      <div style={labelStyle}>Recipient</div>
                      <div className="font-medium text-sm" style={{ color: '#2563eb' }}>{emailPreview.recipient}</div>
                    </div>
                    {emailPreview.recruitmentStatus && (
                      <div className="p-4 rounded-xl" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border-color-subtle)' }}>
                        <div style={labelStyle}>Will Update Status To</div>
                        <div className="font-medium text-sm" style={{ color: '#10b981' }}>{emailPreview.recruitmentStatus}</div>
                      </div>
                    )}

                    <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'var(--border-color)' }}>
                      <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider" style={{ background: 'var(--bg-alt)', color: 'var(--text-muted)' }}>Email Body Preview</div>
                      <iframe
                        srcDoc={emailPreview.html}
                        title="Email Preview"
                        style={{ width: '100%', height: 400, border: 'none' }}
                      />
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl" style={{ background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.2)' }}>
                      <input
                        type="checkbox"
                        checked={confirmed}
                        onChange={(e) => setConfirmed(e.target.checked)}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <span className="text-sm font-medium" style={{ color: 'var(--text-main)' }}>
                        I confirm I want to send this email to <strong>{selectedCareer.email}</strong>
                      </span>
                    </label>

                    <button
                      onClick={handleSend}
                      disabled={!confirmed || sendLoading}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ background: confirmed ? '#2563eb' : 'rgba(37,99,235,0.4)', color: '#fff' }}
                    >
                      <Send className="w-4 h-4" />
                      {sendLoading ? 'Sending...' : 'Send Email Now'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ── HISTORY TAB ── */}
            {activeTab === 'history' && (
              <div className="space-y-3">
                {!selectedCareer.communicationHistory || selectedCareer.communicationHistory.length === 0 ? (
                  <div className="p-8 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
                    No communication history yet. Use the "Send Email" tab to contact this applicant.
                  </div>
                ) : (
                  [...selectedCareer.communicationHistory]
                    .sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt))
                    .map((item, i) => (
                      <div key={i} className="p-4 rounded-xl" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border-color-subtle)' }}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-sm" style={{ color: 'var(--text-main)' }}>{item.templateType}</span>
                          <span className="text-xs px-2 py-1 rounded-full font-semibold"
                            style={{
                              background: item.status === 'Sent' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                              color: item.status === 'Sent' ? '#10b981' : '#ef4444',
                            }}>
                            {item.status}
                          </span>
                        </div>
                        <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                          To: <span style={{ color: '#2563eb' }}>{item.recipient}</span>
                        </div>
                        <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                          Subject: {item.subject}
                        </div>
                        {item.relatedRecruitmentStatus && (
                          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                            Status set: <strong style={{ color: 'var(--text-main)' }}>{item.relatedRecruitmentStatus}</strong>
                          </div>
                        )}
                        <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                          {new Date(item.sentAt).toLocaleString()}
                        </div>
                        {item.error && (
                          <div className="text-xs mt-1 text-red-500">Error: {item.error}</div>
                        )}
                      </div>
                    ))
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CareerDetailModal;
