import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, MapPin, DollarSign, Layers, AlignLeft, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAdminAuth, getApiBase } from '../../../context/AdminAuthContext';

const EASE = [0.16, 1, 0.3, 1];

const COMMON_TYPES = ['Full-time', 'Internship', '6 Months', 'Part-time', 'Contract'];
const COMMON_LOCATIONS = ['Remote / India', 'Remote', 'Hub (Gurgaon)', 'Bangalore', 'Hybrid'];

const JobModal = ({ isOpen, onClose, job, onSaveSuccess }) => {
  const { getAuthHeaders } = useAdminAuth();

  const [formData, setFormData] = useState({
    title: '',
    type: 'Full-time',
    location: 'Remote / India',
    comp: 'Competitive',
    description: '',
    isActive: true,
    order: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || '',
        type: job.type || 'Full-time',
        location: job.location || 'Remote / India',
        comp: job.comp || 'Competitive',
        description: job.description || '',
        isActive: job.isActive !== false,
        order: job.order || 0,
      });
    } else {
      setFormData({
        title: '',
        type: 'Full-time',
        location: 'Remote / India',
        comp: 'Competitive',
        description: '',
        isActive: true,
        order: 0,
      });
    }
  }, [job, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error('Job title is required.');
      return;
    }
    if (!formData.type.trim()) {
      toast.error('Job type is required.');
      return;
    }
    if (!formData.location.trim()) {
      toast.error('Location is required.');
      return;
    }

    setLoading(true);
    try {
      const API_BASE = getApiBase();
      const isEditing = !!job;
      const url = isEditing
        ? `${API_BASE}/api/admin/jobs/${job._id}`
        : `${API_BASE}/api/admin/jobs`;
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify({
          title: formData.title.trim(),
          type: formData.type.trim(),
          location: formData.location.trim(),
          comp: formData.comp.trim() || 'Competitive',
          description: formData.description.trim(),
          isActive: formData.isActive,
          order: Number(formData.order) || 0,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (data.success) {
        toast.success(
          isEditing
            ? `Job opening "${formData.title}" updated!`
            : `Job opening "${formData.title}" added!`
        );
        onSaveSuccess(data.data, isEditing);
        onClose();
      } else {
        toast.error(data.message || 'Failed to save job opening.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Job save error:', error);
      toast.error('Network error saving job opening.');
    }
  };

  const inputStyle = {
    width: '100%',
    height: 44,
    padding: '0 16px',
    borderRadius: 10,
    background: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-main)',
    fontSize: 14,
    outline: 'none',
  };

  const labelStyle = {
    fontSize: 12,
    fontWeight: 600,
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: 6,
    display: 'block',
  };

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
          className="relative w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl text-gray-400 hover:text-white transition-colors"
            style={{ background: 'var(--bg-input)' }}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(37,99,235,0.12)' }}
            >
              <Briefcase className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold" style={{ color: 'var(--text-main)' }}>
                {job ? 'Edit Job Opening' : 'Add New Job Opening'}
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {job ? 'Update the details for this position' : 'Create a new opening for candidate applications'}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Job Title */}
            <div>
              <label style={labelStyle}>
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer, UI Designer, Intern"
                style={inputStyle}
                autoFocus
              />
            </div>

            {/* Type & Location Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label style={labelStyle}>
                  Employment Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="type"
                    list="job-types-list"
                    value={formData.type}
                    onChange={handleChange}
                    placeholder="e.g. Full-time, Internship"
                    style={inputStyle}
                  />
                  <datalist id="job-types-list">
                    {COMMON_TYPES.map((t) => (
                      <option key={t} value={t} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div>
                <label style={labelStyle}>
                  Location <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="location"
                    list="job-locations-list"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Remote / India, Remote"
                    style={inputStyle}
                  />
                  <datalist id="job-locations-list">
                    {COMMON_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc} />
                    ))}
                  </datalist>
                </div>
              </div>
            </div>

            {/* Compensation & Display Order */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label style={labelStyle}>Compensation / Perks</label>
                <input
                  type="text"
                  name="comp"
                  value={formData.comp}
                  onChange={handleChange}
                  placeholder="e.g. Competitive, PPO Potential, Stipend"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Display Order</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  placeholder="0 (Lower numbers show first)"
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Description / Summary */}
            <div>
              <label style={labelStyle}>Description / Key Responsibilities (Optional)</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Brief summary of requirements or what the role entails..."
                style={{
                  ...inputStyle,
                  height: 'auto',
                  padding: '12px 16px',
                  resize: 'vertical',
                }}
              />
            </div>

            {/* Active Status Switch */}
            <div
              className="flex items-center justify-between p-4 rounded-xl"
              style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)' }}
            >
              <div>
                <div className="font-semibold text-sm" style={{ color: 'var(--text-main)' }}>
                  Opening Status
                </div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {formData.isActive
                    ? 'Active — Visible on Careers page & open for applications'
                    : 'Closed — Hidden or marked as inactive'}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, isActive: !prev.isActive }))}
                className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
                style={{ background: formData.isActive ? '#2563eb' : 'var(--border-color)' }}
              >
                <span
                  className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  style={{ transform: formData.isActive ? 'translateX(24px)' : 'translateX(4px)' }}
                />
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl font-medium transition-colors cursor-pointer"
                style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                style={{
                  background: loading ? 'rgba(37,99,235,0.6)' : '#2563eb',
                  boxShadow: '0 0 20px rgba(37,99,235,0.35)',
                }}
              >
                {loading ? 'Saving...' : job ? 'Save Changes' : 'Create Opening'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default JobModal;

