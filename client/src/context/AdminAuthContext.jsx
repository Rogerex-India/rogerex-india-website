import React, { createContext, useContext, useState } from 'react';

const AdminAuthContext = createContext();

const ADMIN_STORAGE_KEY = 'rogerex_admin_session';

export const getApiBase = () => {
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://localhost:5000';
  }
  return import.meta.env.VITE_API_URL || 'http://localhost:5000';
};

export const AdminAuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    try {
      const saved = localStorage.getItem(ADMIN_STORAGE_KEY);
      return saved ? JSON.parse(saved).token : null;
    } catch {
      return null;
    }
  });

  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem(ADMIN_STORAGE_KEY);
      return saved ? JSON.parse(saved).adminUser : null;
    } catch {
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const saved = localStorage.getItem(ADMIN_STORAGE_KEY);
      return saved ? !!JSON.parse(saved).token : false;
    } catch {
      return false;
    }
  });

  const login = async (username, password) => {
    try {
      const API_BASE = getApiBase();
      const response = await fetch(`${API_BASE}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        setToken(data.token);
        setAdminUser(data.admin);
        setIsAuthenticated(true);

        localStorage.setItem(
          ADMIN_STORAGE_KEY,
          JSON.stringify({
            isAuthenticated: true,
            token: data.token,
            adminUser: data.admin,
          })
        );
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Invalid login credentials' };
      }
    } catch (error) {
      console.error('Login request error:', error);
      return { success: false, message: 'Server connection error. Please try again.' };
    }
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    setAdminUser(null);
    localStorage.removeItem(ADMIN_STORAGE_KEY);
  };

  const getAuthHeaders = () => {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        adminUser,
        token,
        login,
        logout,
        getAuthHeaders,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
