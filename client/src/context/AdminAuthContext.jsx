import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

const ADMIN_STORAGE_KEY = 'rogerex_admin_session';

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const saved = localStorage.getItem(ADMIN_STORAGE_KEY);
      return saved ? JSON.parse(saved).isAuthenticated : false;
    } catch {
      return false;
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

  const login = (username, password) => {
    // Basic mock authentication check
    if (
      (username.trim().toLowerCase() === 'admin' && password === 'admin123') ||
      (username.trim().length > 2 && password.length >= 4)
    ) {
      const user = {
        name: 'System Administrator',
        username: username.trim(),
        role: 'Super Admin',
        loginTime: new Date().toISOString(),
      };
      setIsAuthenticated(true);
      setAdminUser(user);
      localStorage.setItem(
        ADMIN_STORAGE_KEY,
        JSON.stringify({ isAuthenticated: true, adminUser: user })
      );
      return { success: true };
    }
    return { success: false, message: 'Invalid username or password' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
    localStorage.removeItem(ADMIN_STORAGE_KEY);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, adminUser, login, logout }}>
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
