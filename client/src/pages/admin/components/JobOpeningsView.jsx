import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Plus,
  Search,
  Edit2,
  Trash2,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle2,
  XCircle,
  Filter,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAdminAuth, getApiBase } from '../../../context/AdminAuthContext';
import JobModal from './JobModal';
import DeleteConfirmModal from './DeleteConfirmModal';

const JobOpeningsView = () => {
  const { getAuthHeaders } = useAdminAuth();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All', 'Active', 'Closed'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // { id, title } | null

  // Fetch all jobs
  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const API_BASE = getApiBase();
      const response = await fetch(`${API_BASE}/api/admin/jobs`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();

      if (data.success) {
        setJobs(data.data || []);
      } else {
        toast.error(data.message || 'Failed to fetch job openings.');
      }
    } catch (error) {
      console.error('Fetch jobs error:', error);
      toast.error('Network error loading job openings.');
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // KPIs
  const stats = useMemo(() => {
    const total = jobs.length;
    const active = jobs.filter((j) => j.isActive).length;
    const closed = total - active;
    return { total, active, closed };
  }, [jobs]);

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((j) => {
      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'Active' && j.isActive) ||
        (statusFilter === 'Closed' && !j.isActive);

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        j.title.toLowerCase().includes(q) ||
        j.type.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q) ||
        (j.comp && j.comp.toLowerCase().includes(q)) ||
        (j.description && j.description.toLowerCase().includes(q));

      return matchesStatus && matchesSearch;
    });
  }, [jobs, searchQuery, statusFilter]);

  // One-click Toggle Status
  const handleToggleStatus = async (job) => {
    try {
      const API_BASE = getApiBase();
      const response = await fetch(`${API_BASE}/api/admin/jobs/${job._id}/toggle`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
      });
      const data = await response.json();

      if (data.success) {
        setJobs((prev) =>
          prev.map((j) => (j._id === job._id ? { ...j, isActive: !j.isActive } : j))
        );
        toast.success(
          `"${job.title}" is now ${!job.isActive ? 'Active (Open)' : 'Closed'}`
        );
      } else {
        toast.error(data.message || 'Failed to toggle status.');
      }
    } catch (error) {
      console.error('Toggle error:', error);
      toast.error('Network error toggling job status.');
    }
  };

  // Add / Edit handlers
  const handleOpenAdd = () => {
    setSelectedJob(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleSaveSuccess = (savedJob, isEditing) => {
    if (isEditing) {
      setJobs((prev) =>
        prev.map((j) => (j._id === savedJob._id ? savedJob : j))
      );
    } else {
      setJobs((prev) => [savedJob, ...prev]);
    }
  };

  // Delete
  const handleDeleteClick = (job) => {
    setDeleteConfirm({ id: job._id, title: job.title });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    const { id, title } = deleteConfirm;
    setDeleteConfirm(null);

    try {
      const API_BASE = getApiBase();
      const response = await fetch(`${API_BASE}/api/admin/jobs/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await response.json();

      if (data.success) {
        setJobs((prev) => prev.filter((j) => j._id !== id));
        toast.success(`Job opening "${title}" deleted.`);
      } else {
        toast.error(data.message || 'Failed to delete job opening.');
      }
    } catch (error) {
      console.error('Delete job error:', error);
      toast.error('Network error deleting job opening.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text-main)' }}>
            Job Openings
          </h2>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Manage positions shown on the public Careers page and application form
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white transition-all duration-200 cursor-pointer self-start md:self-auto"
          style={{
            background: '#2563eb',
            boxShadow: '0 0 20px rgba(37,99,235,0.35)',
          }}
        >
          <Plus className="w-4 h-4" />
          Add Job Opening
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          className="p-5 rounded-2xl border"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Total Positions
            </span>
            <Briefcase className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold mt-2" style={{ color: 'var(--text-main)' }}>
            {stats.total}
          </div>
        </div>

        <div
          className="p-5 rounded-2xl border"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
              Active (Open)
            </span>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold mt-2 text-emerald-500">
            {stats.active}
          </div>
        </div>

        <div
          className="p-5 rounded-2xl border"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Closed / Inactive
            </span>
            <XCircle className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-2xl font-bold mt-2" style={{ color: 'var(--text-muted)' }}>
            {stats.closed}
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div
        className="p-4 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
      >
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search roles, types, locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl outline-none"
            style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
            }}
          />
        </div>

        <div className="flex items-center gap-2 self-stretch md:self-auto overflow-x-auto">
          {['All', 'Active', 'Closed'].map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              style={{
                background:
                  statusFilter === filter ? 'rgba(37,99,235,0.15)' : 'var(--bg-input)',
                color: statusFilter === filter ? '#2563eb' : 'var(--text-muted)',
                border:
                  statusFilter === filter
                    ? '1px solid rgba(37,99,235,0.3)'
                    : '1px solid var(--border-color)',
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Job Openings List */}
      {loading ? (
        <div className="p-16 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
          Loading job openings...
        </div>
      ) : filteredJobs.length === 0 ? (
        <div
          className="p-16 text-center rounded-2xl border"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
        >
          <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-30 text-blue-500" />
          <h3 className="text-lg font-semibold" style={{ color: 'var(--text-main)' }}>
            No Job Openings Found
          </h3>
          <p className="text-sm mt-1 mb-5" style={{ color: 'var(--text-muted)' }}>
            {searchQuery || statusFilter !== 'All'
              ? 'Try adjusting your search or filter.'
              : 'Get started by creating your first job opening.'}
          </p>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add First Job Opening
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((job) => (
            <div
              key={job._id}
              className="p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between"
              style={{
                background: 'var(--bg-card)',
                borderColor: job.isActive ? 'var(--border-color)' : 'rgba(239,68,68,0.2)',
                opacity: job.isActive ? 1 : 0.8,
              }}
            >
              <div>
                {/* Header row: Title & Active Badge */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: 'var(--text-main)' }}>
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span
                        className="text-xs px-2.5 py-1 rounded-md font-medium"
                        style={{
                          background: 'rgba(37,99,235,0.12)',
                          color: '#2563eb',
                          border: '1px solid rgba(37,99,235,0.25)',
                        }}
                      >
                        {job.type}
                      </span>

                      <span
                        className="text-xs px-2.5 py-1 rounded-md font-medium flex items-center gap-1"
                        style={{
                          background: 'var(--bg-input)',
                          color: 'var(--text-muted)',
                          border: '1px solid var(--border-color)',
                        }}
                      >
                        <MapPin className="w-3 h-3 text-blue-500" />
                        {job.location}
                      </span>

                      {job.comp && (
                        <span
                          className="text-xs px-2.5 py-1 rounded-md font-medium"
                          style={{
                            background: 'rgba(16,185,129,0.1)',
                            color: '#10b981',
                            border: '1px solid rgba(16,185,129,0.25)',
                          }}
                        >
                          {job.comp}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Active / Closed toggle */}
                  <button
                    onClick={() => handleToggleStatus(job)}
                    title={`Click to ${job.isActive ? 'close' : 'activate'} this opening`}
                    className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none flex-shrink-0 cursor-pointer"
                    style={{ background: job.isActive ? '#10b981' : 'var(--border-color)' }}
                  >
                    <span
                      className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                      style={{
                        transform: job.isActive ? 'translateX(24px)' : 'translateX(4px)',
                      }}
                    />
                  </button>
                </div>

                {/* Description if present */}
                {job.description && (
                  <p
                    className="text-xs mt-3 line-clamp-2 leading-relaxed"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {job.description}
                  </p>
                )}
              </div>

              {/* Card Footer: Status label & Actions */}
              <div
                className="flex items-center justify-between pt-4 mt-4 border-t"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      job.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'
                    }`}
                  />
                  <span
                    className="text-xs font-semibold"
                    style={{ color: job.isActive ? '#10b981' : 'var(--text-muted)' }}
                  >
                    {job.isActive ? 'Active (Accepting Applications)' : 'Closed'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(job)}
                    className="p-2 rounded-lg transition-colors cursor-pointer text-gray-400 hover:text-blue-500"
                    style={{ background: 'var(--bg-input)' }}
                    title="Edit opening"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(job)}
                    className="p-2 rounded-lg transition-colors cursor-pointer text-gray-400 hover:text-red-500"
                    style={{ background: 'var(--bg-input)' }}
                    title="Delete opening"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Job Create/Edit Modal */}
      <JobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={selectedJob}
        onSaveSuccess={handleSaveSuccess}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteConfirm}
        name={deleteConfirm?.title || ''}
        itemType="job opening"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirm(null)}
      />
    </div>
  );
};

export default JobOpeningsView;

