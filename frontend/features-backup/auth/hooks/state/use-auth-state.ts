// features/auth/hooks/state/use-auth-state.ts
'use client'

import { useState, useEffect, useCallback, useRef } from 'react';
import { authStorageService } from '../../services/storage/auth-storage.service';
import { authApiService } from '../../services/api/auth-api.service';
import type { 
  AuthState, 
  UserProfile, 
  AuthTokens, 
  AuthStatus,
  AuthError,
  LoginCredentials,
  RegisterData 
} from '../../types';

/**
 * Hook para gestión centralizada del estado de autenticación
 * Implementa refresh automático de tokens y sincronización entre tabs
 */

const REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutos antes de expirar
const ACTIVITY_CHECK_INTERVAL = 60 * 1000; // 1 minuto
const MAX_IDLE_TIME = 30 * 60 * 1000; // 30 minutos

interface UseAuthStateConfig {
  autoRefresh?: boolean;
  trackActivity?: boolean;
  enableMultiTabSync?: boolean;
}

export function useAuthState(config: UseAuthStateConfig = {}) {
  const {
    autoRefresh = true,
    trackActivity = true,
    enableMultiTabSync = true
  } = config;

  // Estado principal
  const [state, setState] = useState<AuthState>({
    user: null,
    tokens: null,
    status: AuthStatus.IDLE,
    error: null,
    isLoading: true,
    lastActivity: Date.now()
  });

  // Referencias para cleanup
  const refreshTimeoutRef = useRef<NodeJS.Timeout>();
  const activityTimeoutRef = useRef<NodeJS.Timeout>();
  const storageListenerRef = useRef<() => void>();

  /**
   * Inicialización del estado desde storage
   */
  useEffect(() => {
    initializeAuthState();
  }, []);

  /**
   * Configurar refresh automático
   */
  useEffect(() => {
    if (autoRefresh && state.tokens && state.status === AuthStatus.AUTHENTICATED) {
      scheduleTokenRefresh();
    }

    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [state.tokens, state.status, autoRefresh]);

  /**
   * Configurar tracking de actividad
   */
  useEffect(() => {
    if (trackActivity && state.status === AuthStatus.AUTHENTICATED) {
      setupActivityTracking();
    }

    return () => {
      if (activityTimeoutRef.current) {
        clearTimeout(activityTimeoutRef.current);
      }
    };
  }, [state.status, trackActivity]);

  /**
   * Configurar sincronización entre tabs
   */
  useEffect(() => {
    if (enableMultiTabSync) {
      setupMultiTabSync();
    }

    return () => {
      if (storageListenerRef.current) {
        storageListenerRef.current();
      }
    };
  }, [enableMultiTabSync]);

  /**
   * Inicializar estado desde storage
   */
  const initializeAuthState = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, status: AuthStatus.LOADING }));

      const [storedUser, storedTokens] = await Promise.all([
        authStorageService.getUser(),
        authStorageService.getTokens()
      ]);

      if (storedUser && storedTokens) {
        // Verificar si los tokens están expirados
        const areExpired = await authStorageService.areTokensExpired();
        
        if (areExpired) {
          // Intentar refresh automático
          const refreshed = await attemptTokenRefresh(storedTokens.refreshToken);
          
          if (!refreshed) {
            // Limpiar estado inválido
            await authStorageService.clearAll();
            setState(prev => ({
              ...prev,
              user: null,
              tokens: null,
              status: AuthStatus.UNAUTHENTICATED,
              isLoading: false
            }));
            return;
          }
        } else {
          // Tokens válidos, restaurar estado
          setState(prev => ({
            ...prev,
            user: storedUser,
            tokens: storedTokens,
            status: AuthStatus.AUTHENTICATED,
            isLoading: false,
            lastActivity: Date.now()
          }));
        }
      } else {
        // No hay datos almacenados
        setState(prev => ({
          ...prev,
          status: AuthStatus.UNAUTHENTICATED,
          isLoading: false
        }));
      }
    } catch (error) {
      console.error('Error initializing auth state:', error);
      setState(prev => ({
        ...prev,
        status: AuthStatus.ERROR,
        isLoading: false,
        error: {
          code: 'INITIALIZATION_ERROR',
          message: 'Error al inicializar la sesión',
          timestamp: new Date()
        }
      }));
    }
  }, []);

  /**
   * Login de usuario
   */
  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null, status: AuthStatus.LOADING }));

      const response = await authApiService.login(credentials);

      if (response.success && response.data && response.tokens) {
        // Guardar en storage
        await Promise.all([
          authStorageService.saveUser(response.data),
          authStorageService.saveTokens(response.tokens)
        ]);

        // Actualizar estado
        setState(prev => ({
          ...prev,
          user: response.data!,
          tokens: response.tokens!,
          status: AuthStatus.AUTHENTICATED,
          isLoading: false,
          lastActivity: Date.now()
        }));

        return true;
      } else {
        setState(prev => ({
          ...prev,
          status: AuthStatus.UNAUTHENTICATED,
          isLoading: false,
          error: response.error || null
        }));

        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setState(prev => ({
        ...prev,
        status: AuthStatus.ERROR,
        isLoading: false,
        error: {
          code: 'LOGIN_ERROR',
          message: 'Error durante el inicio de sesión',
          timestamp: new Date()
        }
      }));

      return false;
    }
  }, []);

  /**
   * Registro de usuario
   */
  const register = useCallback(async (userData: RegisterData): Promise<boolean> => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null, status: AuthStatus.LOADING }));

      const response = await authApiService.register(userData);

      if (response.success && response.data && response.tokens) {
        // Guardar en storage
        await Promise.all([
          authStorageService.saveUser(response.data),
          authStorageService.saveTokens(response.tokens)
        ]);

        // Actualizar estado
        setState(prev => ({
          ...prev,
          user: response.data!,
          tokens: response.tokens!,
          status: AuthStatus.AUTHENTICATED,
          isLoading: false,
          lastActivity: Date.now()
        }));

        return true;
      } else {
        setState(prev => ({
          ...prev,
          status: AuthStatus.UNAUTHENTICATED,
          isLoading: false,
          error: response.error || null
        }));

        return false;
      }
    } catch (error) {
      console.error('Register error:', error);
      setState(prev => ({
        ...prev,
        status: AuthStatus.ERROR,
        isLoading: false,
        error: {
          code: 'REGISTER_ERROR',
          message: 'Error durante el registro',
          timestamp: new Date()
        }
      }));

      return false;
    }
  }, []);

  /**
   * Logout de usuario
   */
  const logout = useCallback(async (): Promise<void> => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      // Limpiar storage
      await authStorageService.clearAll();

      // Actualizar estado
      setState({
        user: null,
        tokens: null,
        status: AuthStatus.UNAUTHENTICATED,
        error: null,
        isLoading: false,
        lastActivity: Date.now()
      });

      // Limpiar timeouts
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
      if (activityTimeoutRef.current) {
        clearTimeout(activityTimeoutRef.current);
      }

    } catch (error) {
      console.error('Logout error:', error);
      // Aún así limpiar el estado
      setState({
        user: null,
        tokens: null,
        status: AuthStatus.UNAUTHENTICATED,
        error: null,
        isLoading: false,
        lastActivity: Date.now()
      });
    }
  }, []);

  /**
   * Refresh de tokens
   */
  const refreshTokens = useCallback(async (): Promise<boolean> => {
    if (!state.tokens?.refreshToken) return false;

    return attemptTokenRefresh(state.tokens.refreshToken);
  }, [state.tokens]);

  /**
   * Intentar refresh de tokens
   */
  const attemptTokenRefresh = useCallback(async (refreshToken: string): Promise<boolean> => {
    try {
      const response = await authApiService.refreshTokens(refreshToken);

      if (response.success && response.data) {
        // Guardar nuevos tokens
        await authStorageService.saveTokens(response.data);

        // Actualizar estado
        setState(prev => ({
          ...prev,
          tokens: response.data!,
          lastActivity: Date.now()
        }));

        return true;
      } else {
        // Refresh falló, logout automático
        await logout();
        return false;
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      await logout();
      return false;
    }
  }, [logout]);

  /**
   * Programar refresh automático
   */
  const scheduleTokenRefresh = useCallback(() => {
    if (!state.tokens) return;

    const now = Date.now();
    const expiresAt = state.tokens.expiresAt;
    const timeUntilRefresh = expiresAt - now - REFRESH_THRESHOLD;

    if (timeUntilRefresh > 0) {
      refreshTimeoutRef.current = setTimeout(() => {
        refreshTokens();
      }, timeUntilRefresh);
    } else {
      // Token ya debería ser refrescado
      refreshTokens();
    }
  }, [state.tokens, refreshTokens]);

  /**
   * Configurar tracking de actividad
   */
  const setupActivityTracking = useCallback(() => {
    const checkActivity = () => {
      const now = Date.now();
      const timeSinceLastActivity = now - state.lastActivity;

      if (timeSinceLastActivity > MAX_IDLE_TIME) {
        console.log('User inactive, logging out...');
        logout();
        return;
      }

      // Programar próxima verificación
      activityTimeoutRef.current = setTimeout(checkActivity, ACTIVITY_CHECK_INTERVAL);
    };

    // Listeners para actividad del usuario
    const updateActivity = () => {
      setState(prev => ({ ...prev, lastActivity: Date.now() }));
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true });
    });

    // Iniciar verificación
    checkActivity();

    // Cleanup function
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity);
      });
    };
  }, [state.lastActivity, logout]);

  /**
   * Configurar sincronización entre tabs
   */
  const setupMultiTabSync = useCallback(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_user' || e.key === 'auth_tokens') {
        // Reinicializar estado cuando cambie en otra tab
        initializeAuthState();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    storageListenerRef.current = () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [initializeAuthState]);

  /**
   * Limpiar error
   */
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  /**
   * Utilidades derivadas
   */
  const isAuthenticated = state.status === AuthStatus.AUTHENTICATED;
  const hasRole = useCallback((role: string) => state.user?.role === role, [state.user]);
  const isTokenValid = useCallback(() => {
    if (!state.tokens) return false;
    return Date.now() < state.tokens.expiresAt;
  }, [state.tokens]);

  return {
    // Estado
    state,
    user: state.user,
    tokens: state.tokens,
    status: state.status,
    error: state.error,
    isLoading: state.isLoading,
    
    // Acciones
    login,
    register,
    logout,
    refreshTokens,
    clearError,
    
    // Utilidades
    isAuthenticated,
    hasRole,
    isTokenValid
  };
}