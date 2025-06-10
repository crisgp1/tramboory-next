'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';

export function QuickLogin() {
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  const handleQuickLogin = async (email: string, password: string, role: string) => {
    setLoading(true);
    try {
      const result = await login(email, password);
      console.log('Login result:', result);
      toast.success(`Logged in as ${role}`);
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Error en login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada');
  };

  if (isAuthenticated) {
    return (
      <div className="fixed top-4 right-4 z-50 bg-green-600 text-white p-4 rounded-lg shadow-lg">
        <div className="text-sm mb-2">
          Logged in as: <strong>{user?.name}</strong> ({user?.role})
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => router.push('/dashboard')}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
          >
            Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-white/10 backdrop-blur-lg text-white p-4 rounded-lg shadow-lg">
      <div className="text-sm mb-3 font-semibold">🔑 Quick Login (Demo)</div>
      <div className="space-y-2">
        <button
          onClick={() => handleQuickLogin('admin@tramboory.com', 'admin123', 'Admin')}
          disabled={loading}
          className="block w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded text-sm disabled:opacity-50"
        >
          Login as Admin
        </button>
        <button
          onClick={() => handleQuickLogin('empleado@tramboory.com', 'empleado123', 'Employee')}
          disabled={loading}
          className="block w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm disabled:opacity-50"
        >
          Login as Employee
        </button>
        <button
          onClick={() => handleQuickLogin('cliente@tramboory.com', 'cliente123', 'Customer')}
          disabled={loading}
          className="block w-full px-3 py-2 bg-green-600 hover:bg-green-700 rounded text-sm disabled:opacity-50"
        >
          Login as Customer
        </button>
      </div>
      {loading && (
        <div className="text-xs mt-2 text-yellow-300">Logging in...</div>
      )}
    </div>
  );
}