import React, { useState, useEffect, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useAdminAuth, getApiBase } from '../../../context/AdminAuthContext';
import CareerTable from './CareerTable';
import CareerDetailModal from './CareerDetailModal';

const CareersView = () => {
  const { getAuthHeaders } = useAdminAuth();
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [activeNote, setActiveNote] = useState('');

  const fetchCareers = useCallback(async () => {
    try {
      setLoading(true);
      const API_BASE = getApiBase();
      const response = await fetch(`${API_BASE}/api/admin/careers`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();

      if (data.success) {
        setCareers(data.data || []);
      } else {
        toast.error(data.message || 'Failed to fetch career applications');
      }
    } catch (error) {
      console.error('Fetch careers error:', error);
      toast.error('Network error loading applications.');
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders]);

  useEffect(() => {
    fetchCareers();
  }, [fetchCareers]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const API_BASE = getApiBase();
      const response = await fetch(`${API_BASE}/api/admin/careers/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();

      if (data.success) {
        setCareers((prev) =>
          prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
        );
        if (selectedCareer && selectedCareer._id === id) {
          setSelectedCareer((prev) => ({ ...prev, status: newStatus }));
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

  const handleSaveNote = async () => {
    if (!selectedCareer) return;
    const id = selectedCareer._id;
    try {
      const API_BASE = getApiBase();
      const response = await fetch(`${API_BASE}/api/admin/careers/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ notes: activeNote }),
      });
      const data = await response.json();

      if (data.success) {
        setCareers((prev) =>
          prev.map((c) => (c._id === id ? { ...c, notes: activeNote } : c))
        );
        setSelectedCareer((prev) => ({ ...prev, notes: activeNote }));
        toast.success('Note saved successfully!');
      } else {
        toast.error(data.message || 'Failed to save note.');
      }
    } catch (error) {
      console.error('Save note error:', error);
      toast.error('Network error saving note.');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete application from "${name}"?`)) return;
    try {
      const API_BASE = getApiBase();
      const response = await fetch(`${API_BASE}/api/admin/careers/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await response.json();

      if (data.success) {
        setCareers((prev) => prev.filter((c) => c._id !== id));
        if (selectedCareer && selectedCareer._id === id) {
          setSelectedCareer(null);
        }
        toast.success('Application deleted.');
      } else {
        toast.error(data.message || 'Failed to delete application.');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Network error deleting application.');
    }
  };

  const openDetailModal = (career) => {
    setSelectedCareer(career);
    setActiveNote(career.notes || '');
  };

  return (
    <div>
      {loading ? (
        <div className="p-16 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
          Loading career applications...
        </div>
      ) : (
        <CareerTable
          careers={careers}
          totalCount={careers.length}
          onOpenDetail={openDetailModal}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}

      <CareerDetailModal
        selectedCareer={selectedCareer}
        onClose={() => setSelectedCareer(null)}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
        onSaveNote={handleSaveNote}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default CareersView;
