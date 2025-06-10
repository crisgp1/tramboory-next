'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/lib/api';
import { User } from '@/types/auth';
import { DEV_CONFIG } from '@/lib/constants';

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
      // Verificar si estamos en el cliente
      if (typeof window === 'undefined') {
        setLoading(false);
        return;
      }

      const token = localStorage.getItem('auth-token');
      const storedUserType = localStorage.getItem('userType');
      
      console.log('CheckAuth - Token:', token);
      console.log('CheckAuth - UserType:', storedUserType);
      
      // AUTO-LOGIN PARA DESARROLLO: Si no hay token y está habilitado el auto-login
      if (!token || !storedUserType) {
        if (DEV_CONFIG.ENABLE_AUTO_LOGIN) {
          console.log('🔓 AuthContext - No token found, creating auto-login for development');
          
          // Crear usuario admin por defecto para desarrollo
          const devUser = {
            ...DEV_CONFIG.DEFAULT_DEV_USER,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          
          const devToken = `mock-token-${devUser.id}-${Date.now()}`;
          
          localStorage.setItem('auth-token', devToken);
          localStorage.setItem('userType', devUser.role);
          setUser(devUser);
          setUserType(devUser.role);
          
          console.log('🔓 AuthContext - Auto-login created:', devUser);
        } else {
          console.log('🔒 AuthContext - No token or userType found, auto-login disabled');
        }
        setLoading(false);
        return;
      }

      // Simulación de verificación de token sin base de datos
      if (token.startsWith('mock-token-')) {
        const tokenParts = token.split('-');
        const userId = tokenParts.length >= 3 ? tokenParts[2] : '1';
        
        const mockUser = {
          id: userId,
          name: storedUserType === 'admin' ? 'Administrador' :
                storedUserType === 'employee' ? 'Empleado Demo' : 'Cliente Demo',
          email: storedUserType === 'admin' ? 'admin@tramboory.com' :
                 storedUserType === 'employee' ? 'empleado@tramboory.com' : 'cliente@tramboory.com',
          role: storedUserType as 'admin' | 'employee' | 'customer',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        console.log('CheckAuth - Setting user:', mockUser);
        setUser(mockUser);
        setUserType(storedUserType);
      } else {
        // Token inválido
        console.log('CheckAuth - Invalid token format');
        localStorage.removeItem('auth-token');
        localStorage.removeItem('userType');
      }
    } catch (error) {
      console.error('CheckAuth - Error:', error);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('userType');
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    // Simulación de login sin base de datos - credenciales hardcodeadas
    const mockUsers = [
      {
        id: '1',
        name: 'Administrador',
        email: 'admin@tramboory.com',
        password: 'admin123',
        role: 'admin' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Empleado Demo',
        email: 'empleado@tramboory.com',
        password: 'empleado123',
        role: 'employee' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Cliente Demo',
        email: 'cliente@tramboory.com',
        password: 'cliente123',
        role: 'customer' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ];

    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    const foundUser = mockUsers.find(user =>
      user.email === email && user.password === password
    );

    if (!foundUser) {
      throw new Error('Credenciales inválidas');
    }

    const { password: _, ...userData } = foundUser;
    const mockToken = `mock-token-${userData.id}-${Date.now()}`;
    
    localStorage.setItem('auth-token', mockToken);
    localStorage.setItem('userType', userData.role);
    setUser(userData);
    setUserType(userData.role);
    
    return { user: userData, token: mockToken };
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