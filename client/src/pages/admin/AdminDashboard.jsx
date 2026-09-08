import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useAdminAuth, getApiBase } from '../../context/AdminAuthContext';
import { useTheme } from '../../context/ThemeContext';

import AdminHeader from './components/AdminHeader';
import KpiCards from './components/KpiCards';
import FilterToolbar from './components/FilterToolbar';
import ContactTable from './components/ContactTable';
import ContactDetailModal from './components/ContactDetailModal';
import ChangePasswordModal from './components/ChangePasswordModal';
import CareersView from './components/CareersView';
import SettingsView from './components/SettingsView';

const AdminDashboard = () => {
  const { adminUser, logout, getAuthHeaders } = useAdminAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [activeNote, setActiveNote] = useState('');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState('contacts'); // 'contacts', 'careers', 'settings'

  // Fetch all contact submissions from backend API
  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      const API_BASE = getApiBase();
      const response = await fetch(`${API_BASE}/api/admin/contacts`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();

      if (data.success) {
        setRequests(data.data || []);
      } else {
        toast.error(data.message || 'Failed to fetch contact submissions');
      }
    } catch (error) {
      console.error('Fetch contacts error:', error);
      toast.error('Network error loading submissions.');
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

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
  const handleStatusChange = async (id, newStatus) => {
    try {
      const API_BASE = getApiBase();
      const response = await fetch(`${API_BASE}/api/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();

      if (data.success) {
        setRequests((prev) =>
          prev.map((req) => ((req._id || req.id) === id ? { ...req, status: newStatus } : req))
        );
        if (selectedRequest && (selectedRequest._id || selectedRequest.id) === id) {
          setSelectedRequest((prev) => ({ ...prev, status: newStatus }));
        }
        toast.success(`Status updated to "${newStatus}"`);
      } else {
        toast.error(data.message || 'Failed to update status.');
      }
    } catch (error) {
      console.error('Status update error:', error);
      toast.error('Network error updating status.');
    }
  };

  // Save internal notes
  const handleSaveNote = async () => {
    if (!selectedRequest) return;
    const id = selectedRequest._id || selectedRequest.id;
    try {
      const API_BASE = getApiBase();
      const response = await fetch(`${API_BASE}/api/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ notes: activeNote }),
      });
      const data = await response.json();

      if (data.success) {
        setRequests((prev) =>
          prev.map((req) => ((req._id || req.id) === id ? { ...req, notes: activeNote } : req))
        );
        setSelectedRequest((prev) => ({ ...prev, notes: activeNote }));
        toast.success('Admin note saved successfully!');
      } else {
        toast.error(data.message || 'Failed to save note.');
      }
    } catch (error) {
      console.error('Save note error:', error);
      toast.error('Network error saving note.');
    }
  };

  // Delete request
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete inquiry from "${name}"?`)) return;
    try {
      const API_BASE = getApiBase();
      const response = await fetch(`${API_BASE}/api/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await response.json();

      if (data.success) {
        setRequests((prev) => prev.filter((req) => (req._id || req.id) !== id));
        if (selectedRequest && (selectedRequest._id || selectedRequest.id) === id) {
          setSelectedRequest(null);
        }
        toast.success('Contact inquiry deleted.');
      } else {
        toast.error(data.message || 'Failed to delete submission.');
      }
    } catch (error) {
      console.error('Delete submission error:', error);
      toast.error('Network error deleting submission.');
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
      r._id || r.id,
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

  const openDetailModal = (req) => {
    setSelectedRequest(req);
    setActiveNote(req.notes || '');
  };

  const handleLogout = () => {
    logout();
    toast.success('Signed out successfully.');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ background: 'var(--bg-main)', color: 'var(--text-main)' }}>
      {/* Admin Top Navigation */}
      <AdminHeader
        adminUser={adminUser}
        theme={theme}
        toggleTheme={toggleTheme}
        onLogout={handleLogout}
        onChangePassword={() => setIsPasswordModalOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-container-max mx-auto px-4 md:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b" style={{ borderColor: 'var(--border-color)' }}>
          {['contacts', 'careers', 'settings'].map((view) => (
            <button
              key={view}
              onClick={() => setCurrentView(view)}
              className="px-4 py-2 capitalize font-semibold transition-colors"
              style={{
                color: currentView === view ? '#2563eb' : 'var(--text-muted)',
                borderBottom: currentView === view ? '2px solid #2563eb' : '2px solid transparent',
              }}
            >
              {view}
            </button>
          ))}
        </div>

        {currentView === 'contacts' && (
          <>
            {/* Stats Grid */}
            <KpiCards stats={stats} />

            {/* Toolbar */}
            <FilterToolbar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              requests={requests}
              onExportCSV={handleExportCSV}
            />

            {/* Data Table */}
            {loading ? (
              <div className="p-16 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
                Loading contact submissions from database...
              </div>
            ) : (
              <ContactTable
                filteredRequests={filteredRequests}
                totalCount={requests.length}
                onOpenDetail={openDetailModal}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />
            )}
          </>
        )}

        {currentView === 'careers' && <CareersView />}
        {currentView === 'settings' && <SettingsView />}
      </main>

      {/* Submission Detail Modal */}
      <ContactDetailModal
        selectedRequest={selectedRequest}
        onClose={() => setSelectedRequest(null)}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
        onSaveNote={handleSaveNote}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
};

export default AdminDashboard;
