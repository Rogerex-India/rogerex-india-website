import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAdminAuth, getApiBase } from '../../../context/AdminAuthContext';

const SettingsView = () => {
  const { getAuthHeaders } = useAdminAuth();
  const [isCareerFormEnabled, setIsCareerFormEnabled] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const API_BASE = getApiBase();
        const response = await fetch(`${API_BASE}/api/admin/settings`, {
          headers: getAuthHeaders(),
        });
        const data = await response.json();
        if (data.success) {
          setIsCareerFormEnabled(data.data.isCareerFormEnabled);
        }
      } catch (error) {
        console.error("Fetch settings error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [getAuthHeaders]);

  const handleToggle = async () => {
    const newValue = !isCareerFormEnabled;
    setIsCareerFormEnabled(newValue); // optimistic update
    try {
      const API_BASE = getApiBase();
      const response = await fetch(`${API_BASE}/api/admin/settings`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ isCareerFormEnabled: newValue }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success(`Career form is now ${newValue ? 'Enabled' : 'Disabled'}`);
      } else {
        setIsCareerFormEnabled(!newValue); // revert
        toast.error('Failed to update settings');
      }
    } catch (error) {
      setIsCareerFormEnabled(!newValue); // revert
      toast.error('Network error');
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-sm" style={{ color: 'var(--text-muted)' }}>Loading settings...</div>;
  }

  return (
    <div className="bg-card rounded-2xl p-8 shadow-sm" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
      <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--text-main)' }}>Global Settings</h2>
      
      <div className="flex items-center justify-between py-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
        <div>
          <h3 className="font-medium" style={{ color: 'var(--text-main)' }}>Career Form Visibility</h3>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Toggle whether the career application form is visible to users. Turn this off when there are no active openings.
          </p>
        </div>
        <button
          onClick={handleToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
          style={{ background: isCareerFormEnabled ? '#2563eb' : 'var(--border-color)' }}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            style={{ transform: isCareerFormEnabled ? 'translateX(24px)' : 'translateX(4px)' }}
          />
        </button>
      </div>
    </div>
  );
};

export default SettingsView;
