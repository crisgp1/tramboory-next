'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/lib/api';
import { User } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  userType: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ user: User; token: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await api.get('/auth/me');
      const userData = response.data;
      setUser(userData);
      setUserType(userData.role || 'customer');
      localStorage.setItem('userType', userData.role || 'customer');
    } catch (error) {
      localStorage.removeItem('auth-token');
      localStorage.removeItem('userType');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    const { user: userData, token } = response.data;
    
    localStorage.setItem('auth-token', token);
    localStorage.setItem('userType', userData.role || 'customer');
    setUser(userData);
    setUserType(userData.role || 'customer');
    
    return { user: userData, token };
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('userType');
    setUser(null);
    setUserType(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userType,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}