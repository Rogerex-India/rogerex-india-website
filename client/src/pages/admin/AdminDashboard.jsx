import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  RotateCcw,
  LogOut,
  Sun,
  Moon,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Mail,
  Phone,
  User,
  Calendar,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles,
  FileText,
  Trash2,
  Eye,
  Check,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  getStoredRequests,
  saveStoredRequests,
  resetStoredRequests,
} from '../../data/mockContactRequests';
import logo from '../../assets/icons2.png';

const EASE = [0.16, 1, 0.3, 1];

const AdminDashboard = () => {
  const { adminUser, logout } = useAdminAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Contact requests state
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [activeNote, setActiveNote] = useState('');

  // Load stored requests on mount
  useEffect(() => {
    const loaded = getStoredRequests();
    setRequests(loaded);
  }, []);

  // Save requests whenever modified
  const updateRequestsState = (updatedList) => {
    setRequests(updatedList);
    saveStoredRequests(updatedList);
  };

  // KPI Calculations
  const stats = useMemo(() => {
    const total = requests.length;
    const pending = requests.filter((r) => r.status === 'Pending').length;
    const contacted = requests.filter((r) => r.status === 'Contacted').length;
    const resolved = requests.filter((r) => r.status === 'Resolved').length;
    return { total, pending, contacted, resolved };
  }, [requests]);

  // Filtered List
  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        req.name.toLowerCase().includes(q) ||
        req.email.toLowerCase().includes(q) ||
        req.phone.toLowerCase().includes(q) ||
        req.subject.toLowerCase().includes(q) ||
        req.message.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [requests, searchQuery, statusFilter]);

  // Change request status handler
  const handleStatusChange = (id, newStatus) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status: newStatus } : req
    );
    updateRequestsState(updated);
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest({ ...selectedRequest, status: newStatus });
    }
    toast.success(`Status updated to "${newStatus}"`);
  };

  // Save internal notes
  const handleSaveNote = () => {
    if (!selectedRequest) return;
    const updated = requests.map((req) =>
      req.id === selectedRequest.id ? { ...req, notes: activeNote } : req
    );
    updateRequestsState(updated);
    setSelectedRequest({ ...selectedRequest, notes: activeNote });
    toast.success('Admin note saved!');
  };

  // Delete request
  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete request from "${name}"?`)) {
      const updated = requests.filter((req) => req.id !== id);
      updateRequestsState(updated);
      if (selectedRequest && selectedRequest.id === id) {
        setSelectedRequest(null);
      }
      toast.success('Contact request deleted.');
    }
  };

  // Reset to initial seed data
  const handleResetData = () => {
    if (window.confirm('Reset contact submissions to default sample data?')) {
      const reset = resetStoredRequests();
      setRequests(reset);
      toast.success('Dataset reset to default mock submissions!');
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (filteredRequests.length === 0) {
      toast.error('No data available to export.');
      return;
    }
    const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Subject', 'Status', 'Message', 'Notes'];
    const rows = filteredRequests.map((r) => [
      r.id,
      new Date(r.createdAt).toLocaleString(),
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.email.replace(/"/g, '""')}"`,
      `"${r.phone.replace(/"/g, '""')}"`,
      `"${r.subject.replace(/"/g, '""')}"`,
      r.status,
      `"${r.message.replace(/"/g, '""')}"`,
      `"${(r.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rogerex_Contact_Requests_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('CSV downloaded successfully!');
  };

  // Open modal
  const openDetailModal = (req) => {
    setSelectedRequest(req);
    setActiveNote(req.notes || '');
  };

  // Handle Logout
  const handleLogout = () => {
    logout();
    toast.success('Signed out successfully.');
    navigate('/admin/login');
  };

  // Status Badge Component
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

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ background: 'var(--bg-main)', color: 'var(--text-main)' }}>
      {/* ── Top Header Navigation Bar ── */}
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
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs" style={{ background: 'var(--bg-pill)', border: '1px solid var(--border-color)' }}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span style={{ color: 'var(--text-muted)' }}>Logged in as:</span>
              <span className="font-semibold" style={{ color: 'var(--text-main)' }}>{adminUser?.username || 'Admin'}</span>
            </div>

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
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-red-500 hover:bg-red-500/10 border border-red-500/20"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Container ── */}
      <main className="max-w-container-max mx-auto px-4 md:px-8 py-8">
        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Card 1: Total Submissions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl p-6 transition-all"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 20px var(--shadow-color)',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Total Submissions
              </span>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-500/10 text-blue-500">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold" style={{ color: 'var(--text-main)' }}>
              {stats.total}
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
              Total inquiries received via form
            </p>
          </motion.div>

          {/* Card 2: Pending */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl p-6 transition-all"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 20px var(--shadow-color)',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Pending Review
              </span>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-500/10 text-amber-500">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-amber-500">
              {stats.pending}
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
              Awaiting admin response
            </p>
          </motion.div>

          {/* Card 3: Contacted */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-2xl p-6 transition-all"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 20px var(--shadow-color)',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                In Progress
              </span>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-500/10 text-blue-500">
                <MessageSquare className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-blue-500">
              {stats.contacted}
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
              Contacted & active leads
            </p>
          </motion.div>

          {/* Card 4: Resolved */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="rounded-2xl p-6 transition-all"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 20px var(--shadow-color)',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Resolved
              </span>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-500/10 text-emerald-500">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-emerald-500">
              {stats.resolved}
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
              Successfully addressed
            </p>
          </motion.div>
        </div>

        {/* ── Search, Filter & Actions Toolbar ── */}
        <div
          className="rounded-2xl p-4 md:p-6 mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            boxShadow: '0 4px 20px var(--shadow-color)',
          }}
        >
          {/* Search Box */}
          <div className="relative flex-grow max-w-md">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by client name, email, phone, or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-4 rounded-xl text-sm outline-none transition-all"
              style={{
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#2563eb')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs p-1 rounded-md"
                style={{ color: 'var(--text-muted)' }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Status Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto p-1 rounded-xl" style={{ background: 'var(--bg-pill)', border: '1px solid var(--border-color-subtle)' }}>
            {['All', 'Pending', 'Contacted', 'Resolved'].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className="px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap"
                style={{
                  background: statusFilter === tab ? 'var(--bg-pill-active)' : 'transparent',
                  color: statusFilter === tab ? '#2563eb' : 'var(--text-muted)',
                  boxShadow: statusFilter === tab ? '0 2px 8px var(--shadow-color)' : 'none',
                }}
              >
                {tab}
                <span className="ml-1.5 opacity-60">
                  ({tab === 'All' ? requests.length : requests.filter((r) => r.status === tab).length})
                </span>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border"
              style={{ background: 'var(--bg-pill)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
              title="Download filtered items as CSV"
            >
              <Download className="w-4 h-4 text-blue-500" />
              Export CSV
            </button>

            <button
              onClick={handleResetData}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border"
              style={{ background: 'var(--bg-pill)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
              title="Reset mock submissions"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Demo Data
            </button>
          </div>
        </div>

        {/* ── Submissions Table ── */}
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
                    <th className="py-4 px-6">Subject & Preview</th>
                    <th className="py-4 px-6">Date & Time</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'var(--border-color-subtle)' }}>
                  {filteredRequests.map((req) => (
                    <motion.tr
                      key={req.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="transition-colors hover:bg-blue-500/5 cursor-pointer"
                      onClick={() => openDetailModal(req)}
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

                      {/* Status badge with interactive dropdown */}
                      <td className="py-4 px-6 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={req.status}
                          onChange={(e) => handleStatusChange(req.id, e.target.value)}
                          className="text-xs font-semibold rounded-lg px-2.5 py-1.5 outline-none cursor-pointer transition-all border"
                          style={{
                            background: 'var(--bg-input)',
                            borderColor: 'var(--border-color)',
                            color:
                              req.status === 'Pending'
                                ? '#f59e0b'
                                : req.status === 'Contacted'
                                ? '#2563eb'
                                : '#10b981',
                          }}
                        >
                          <option value="Pending">⏳ Pending</option>
                          <option value="Contacted">💬 Contacted</option>
                          <option value="Resolved">✅ Resolved</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 whitespace-nowrap text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openDetailModal(req)}
                            className="p-2 rounded-lg transition-colors cursor-pointer hover:bg-blue-500/10 text-blue-500"
                            title="View Full Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(req.id, req.name)}
                            className="p-2 rounded-lg transition-colors cursor-pointer hover:bg-red-500/10 text-red-500"
                            title="Delete Request"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer count info */}
          <div className="p-4 border-t text-xs flex items-center justify-between" style={{ borderColor: 'var(--border-color-subtle)', color: 'var(--text-muted)' }}>
            <span>Showing {filteredRequests.length} of {requests.length} total contact requests</span>
            <span>Rogerex India Internal Admin System</span>
          </div>
        </div>
      </main>

      {/* ── Submission Detail Modal ── */}
      <AnimatePresence>
        {selectedRequest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRequest(null)}
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
                      ID: {selectedRequest.id}
                    </span>
                    {renderStatusBadge(selectedRequest.status)}
                  </div>
                  <h2 className="text-xl font-bold" style={{ color: 'var(--text-main)' }}>
                    {selectedRequest.subject}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedRequest(null)}
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
                        onClick={() => handleStatusChange(selectedRequest.id, st)}
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
                    onClick={handleSaveNote}
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
                  onClick={() => handleDelete(selectedRequest.id, selectedRequest.name)}
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
                    onClick={() => setSelectedRequest(null)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer"
                    style={{ background: 'var(--bg-pill)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
