import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing auth data on mount
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        setAuth(parsedAuth);
      } catch (error) {
        console.error('Error parsing stored auth:', error);
        localStorage.removeItem('auth');
      }
    }
  }, []);

  const login = (authData) => {
    // Ensure role is properly capitalized
    const normalizedAuthData = {
      ...authData,
      role: authData.role.charAt(0).toUpperCase() + authData.role.slice(1).toLowerCase(),
      isAuthenticated: true
    };
    setAuth(normalizedAuthData);
    localStorage.setItem('auth', JSON.stringify(normalizedAuthData));
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('auth');
    navigate('/login');
  };

  const isAuthenticated = () => {
    return auth?.isAuthenticated === true;
  };

  const getUserRole = () => {
    return auth?.role;
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, isAuthenticated, getUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 