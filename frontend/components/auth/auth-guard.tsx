'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: string;
}

export function AuthGuard({ children, requireAuth = true, requiredRole }: AuthGuardProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  // DESARROLLO: Deshabilitar autenticación completamente
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  useEffect(() => {
    // En desarrollo, saltarse todas las verificaciones de autenticación
    if (isDevelopment) {
      console.log('🔓 AuthGuard: Modo desarrollo - autenticación deshabilitada');
      return;
    }

    if (!loading) {
      if (requireAuth && !isAuthenticated) {
        console.log('🔒 AuthGuard: Redirigiendo a signin - no autenticado');
        router.push('/signin');
        return;
      }

      if (requiredRole && user?.role !== requiredRole) {
        console.log('🔒 AuthGuard: Redirigiendo a dashboard - rol incorrecto');
        router.push('/dashboard');
        return;
      }
    }
  }, [loading, isAuthenticated, user, requireAuth, requiredRole, router, isDevelopment]);

  // En desarrollo, mostrar contenido directamente sin verificaciones
  if (isDevelopment) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}
