/**
 * Hook Enterprise de Estado de Autenticación
 * @module useAuthState
 * @description Gestión completa del estado de autenticación con optimizaciones React
 */

'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { authApiService } from '../../services/api/auth-api.service'
import { authStorageService } from '../../services/storage/auth-storage.service'
import { authConfig } from '../../config/auth.config'
import type { 
  AuthState, 
  UserProfile, 
  LoginCredentials, 
  AuthStatus, 
  AuthError,
  UseAuthReturn,
  AuthTokens
} from '../../types/auth.types'

/**
 * Hook principal de estado de autenticación con gestión enterprise
 */
export function useAuthState(): UseAuthReturn {
  // ============================================================================
  // ESTADO REACTIVO CON TYPESCRIPT ESTRICTO
  // ============================================================================
  
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    tokens: null,
    status: AuthStatus.IDLE,
    error: null,
    isLoading: true,
    lastActivity: Date.now(),
    deviceFingerprint: undefined
  })

  // Referencias para cleanup y control de efectos
  const initializationRef = useRef<boolean>(false)
  const activityTimeoutRef = useRef<NodeJS.Timeout>()
  const refreshTimeoutRef = useRef<NodeJS.Timeout>()
  const isUnmountedRef = useRef<boolean>(false)

  // ============================================================================
  // INICIALIZACIÓN Y RECUPERACIÓN DE SESIÓN
  // ============================================================================

  /**
   * Inicialización del estado de autenticación desde storage
   */
  useEffect(() => {
    if (initializationRef.current) return
    initializationRef.current = true

    const initializeAuthState = async () => {
      try {
        setAuthState(prev => ({ 
          ...prev, 
          status: AuthStatus.LOADING, 
          isLoading: true,
          error: null
        }))

        // Recuperar datos de sesión almacenados
        const [storedUser, storedTokens] = await Promise.all([
          authStorageService.getUser(),
          authStorageService.getTokens()
        ])

        if (isUnmountedRef.current) return

        if (storedUser && storedTokens) {
          // Verificar validez de tokens
          const areExpired = await authStorageService.areTokensExpired()
          
          if (!areExpired) {
            // Sesión válida encontrada
            setAuthState(prev => ({
              ...prev,
              user: storedUser,
              tokens: storedTokens,
              status: AuthStatus.AUTHENTICATED,
              isLoading: false,
              lastActivity: Date.now()
            }))

            // Configurar auto-refresh de tokens
            scheduleTokenRefresh(storedTokens)
            
            // Configurar monitoreo de actividad
            startActivityMonitoring()

            logAuthEvent('session_restored', storedUser.id)
          } else {
            // Tokens expirados - limpiar storage
            await authStorageService.clearAll()
            setAuthState(prev => ({
              ...prev,
              status: AuthStatus.UNAUTHENTICATED,
              isLoading: false
            }))

            logAuthEvent('session_expired')
          }
        } else {
          // No hay sesión almacenada
          setAuthState(prev => ({
            ...prev,
            status: AuthStatus.UNAUTHENTICATED,
            isLoading: false
          }))
        }

      } catch (error) {
        if (isUnmountedRef.current) return
        
        console.error('[useAuthState] Error durante inicialización:', error)
        
        setAuthState(prev => ({
          ...prev,
          status: AuthStatus.ERROR,
          isLoading: false,
          error: {
            code: 'INITIALIZATION_ERROR',
            message: 'Error al inicializar sesión de usuario',
            timestamp: new Date()
          }
        }))

        // Limpiar storage corrupto
        await authStorageService.clearAll()
      }
    }

    initializeAuthState()

    // Cleanup function
    return () => {
      isUnmountedRef.current = true
      clearTimeout(activityTimeoutRef.current)
      clearTimeout(refreshTimeoutRef.current)
    }
  }, [])

  // ============================================================================
  // OPERACIONES DE AUTENTICACIÓN
  // ============================================================================

  /**
   * Función de login con manejo completo de estados
   */
  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      // Actualizar estado a loading
      setAuthState(prev => ({
        ...prev,
        isLoading: true,
        error: null,
        status: AuthStatus.LOADING
      }))

      logAuthEvent('login_attempt', credentials.email)

      // Ejecutar login via API
      const response = await authApiService.login(credentials)

      if (isUnmountedRef.current) return false

      if (response.success && response.data && response.tokens) {
        // Persistir datos de forma atómica
        const [userSaved, tokensSaved] = await Promise.all([
          authStorageService.saveUser(response.data),
          authStorageService.saveTokens(response.tokens)
        ])

        if (userSaved && tokensSaved) {
          // Actualizar estado con datos de login exitoso
          setAuthState(prev => ({
            ...prev,
            user: response.data!,
            tokens: response.tokens!,
            status: AuthStatus.AUTHENTICATED,
            isLoading: false,
            error: null,
            lastActivity: Date.now()
          }))

          // Configurar funcionalidades post-login
          scheduleTokenRefresh(response.tokens)
          startActivityMonitoring()

          logAuthEvent('login_success', response.data.id)
          return true
        } else {
          throw new Error('Error al persistir datos de sesión')
        }
      } else {
        // Login fallido - actualizar estado con error
        setAuthState(prev => ({
          ...prev,
          status: AuthStatus.UNAUTHENTICATED,
          isLoading: false,
          error: response.error || {
            code: 'LOGIN_FAILED',
            message: 'Error desconocido durante el login',
            timestamp: new Date()
          }
        }))

        logAuthEvent('login_failure', credentials.email)
        return false
      }

    } catch (error) {
      if (isUnmountedRef.current) return false

      console.error('[useAuthState] Error durante login:', error)
      
      const authError: AuthError = {
        code: 'LOGIN_EXCEPTION',
        message: error instanceof Error ? error.message : 'Error inesperado durante login',
        timestamp: new Date()
      }

      setAuthState(prev => ({
        ...prev,
        status: AuthStatus.ERROR,
        isLoading: false,
        error: authError
      }))

      logAuthEvent('login_error', credentials.email)
      return false
    }
  }, [])

  /**
   * Función de logout con limpieza completa
   */
  const logout = useCallback(async (): Promise<void> => {
    try {
      const currentTokens = authState.tokens
      const currentUserId = authState.user?.id

      // Limpiar timeouts activos
      clearTimeout(activityTimeoutRef.current)
      clearTimeout(refreshTimeoutRef.current)

      // Actualizar estado inmediatamente
      setAuthState({
        user: null,
        tokens: null,
        status: AuthStatus.UNAUTHENTICATED,
        error: null,
        isLoading: false,
        lastActivity: Date.now()
      })

      // Limpiar storage de forma asíncrona
      await authStorageService.clearAll()

      // Notificar al servidor (opcional, no bloquear logout)
      if (currentTokens?.accessToken) {
        authApiService.logout(currentTokens.accessToken).catch(error => {
          console.warn('[useAuthState] Error al notificar logout al servidor:', error)
        })
      }

      logAuthEvent('logout', currentUserId)

    } catch (error) {
      console.error('[useAuthState] Error durante logout:', error)
      
      // Garantizar logout local incluso si hay errores
      setAuthState({
        user: null,
        tokens: null,
        status: AuthStatus.UNAUTHENTICATED,
        error: null,
        isLoading: false,
        lastActivity: Date.now()
      })

      await authStorageService.clearAll()
    }
  }, [authState.tokens, authState.user?.id])

  /**
   * Refresh automático de tokens
   */
  const refreshTokens = useCallback(async (): Promise<boolean> => {
    try {
      const currentTokens = authState.tokens
      if (!currentTokens?.refreshToken) {
        await logout()
        return false
      }

      const response = await authApiService.refreshTokens(currentTokens.refreshToken)

      if (isUnmountedRef.current) return false

      if (response.success && response.data) {
        // Actualizar tokens en estado y storage
        const newTokens = response.data as AuthTokens
        
        await authStorageService.saveTokens(newTokens)
        
        setAuthState(prev => ({
          ...prev,
          tokens: newTokens,
          lastActivity: Date.now()
        }))

        // Reagendar próximo refresh
        scheduleTokenRefresh(newTokens)

        logAuthEvent('token_refresh', authState.user?.id)
        return true
      } else {
        // Refresh falló - realizar logout
        console.warn('[useAuthState] Token refresh falló, realizando logout')
        await logout()
        return false
      }

    } catch (error) {
      console.error('[useAuthState] Error durante refresh de tokens:', error)
      await logout()
      return false
    }
  }, [authState.tokens, authState.user?.id, logout])

  /**
   * Limpieza de errores
   */
  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }))
  }, [])

  // ============================================================================
  // GESTIÓN DE ACTIVIDAD Y AUTO-REFRESH
  // ============================================================================

  /**
   * Programación de refresh automático de tokens
   */
  const scheduleTokenRefresh = useCallback((tokens: AuthTokens) => {
    clearTimeout(refreshTimeoutRef.current)

    const now = Date.now()
    const expiresAt = tokens.expiresAt
    const refreshThreshold = authConfig.tokenRefreshThreshold // 5 minutos antes
    const timeUntilRefresh = expiresAt - now - refreshThreshold

    if (timeUntilRefresh > 0) {
      refreshTimeoutRef.current = setTimeout(() => {
        if (!isUnmountedRef.current) {
          refreshTokens()
        }
      }, timeUntilRefresh)

      console.log(`[useAuthState] Token refresh programado en ${Math.round(timeUntilRefresh / 1000 / 60)} minutos`)
    } else {
      // Token muy cerca de expirar - refresh inmediato
      refreshTokens()
    }
  }, [refreshTokens])

  /**
   * Monitoreo de actividad del usuario
   */
  const startActivityMonitoring = useCallback(() => {
    const updateActivity = () => {
      if (!isUnmountedRef.current) {
        setAuthState(prev => ({ ...prev, lastActivity: Date.now() }))
      }
    }

    // Eventos que indican actividad del usuario
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
    
    activityEvents.forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true })
    })

    // Cleanup function devuelta para remover listeners
    return () => {
      activityEvents.forEach(event => {
        document.removeEventListener(event, updateActivity)
      })
    }
  }, [])

  // ============================================================================
  // UTILIDADES COMPUTADAS Y MEMOIZADAS
  // ============================================================================

  /**
   * Utilidades derivadas del estado con memoización para performance
   */
  const authUtils = useMemo(() => ({
    isAuthenticated: authState.status === AuthStatus.AUTHENTICATED,
    isLoading: authState.isLoading,
    hasRole: (role: string) => authState.user?.role === role,
    isAdmin: authState.user?.role === 'admin',
    isEmployee: authState.user?.role === 'employee', 
    isCustomer: authState.user?.role === 'customer',
    getDisplayName: () => authState.user 
      ? `${authState.user.firstName} ${authState.user.lastName}`
      : 'Usuario Anónimo',
    getInitials: () => authState.user
      ? `${authState.user.firstName[0]}${authState.user.lastName[0]}`
      : 'UA',
    getTokens: () => authState.tokens,
    isTokenValid: () => {
      if (!authState.tokens) return false
      return Date.now() < authState.tokens.expiresAt - authConfig.tokenRefreshThreshold
    },
    timeUntilExpiry: () => {
      if (!authState.tokens) return 0
      return Math.max(0, authState.tokens.expiresAt - Date.now())
    },
    shouldRefreshToken: () => {
      if (!authState.tokens) return false
      const timeLeft = authState.tokens.expiresAt - Date.now()
      return timeLeft < authConfig.tokenRefreshThreshold
    },
    getLastActivity: () => authState.lastActivity,
    isSessionActive: () => {
      const timeSinceActivity = Date.now() - authState.lastActivity
      return timeSinceActivity < authConfig.maxIdleTime
    }
  }), [authState])

  // ============================================================================
  // LOGGING Y AUDITORÍA
  // ============================================================================

  /**
   * Sistema de logging para eventos de autenticación
   */
  const logAuthEvent = useCallback((
    eventType: string, 
    userId?: string, 
    metadata?: Record<string, unknown>
  ) => {
    if (authConfig.logLevel === 'debug') {
      console.log(`[AuthEvent] ${eventType}:`, {
        eventType,
        userId,
        timestamp: new Date().toISOString(),
        metadata
      })
    }

    // En producción, aquí se enviarían eventos a sistema de analytics
    // analytics.track(eventType, { userId, ...metadata })
  }, [])

  // ============================================================================
  // RETURN INTERFACE ENTERPRISE
  // ============================================================================

  return {
    // Estado base
    user: authState.user,
    isAuthenticated: authUtils.isAuthenticated,
    isLoading: authState.isLoading,
    error: authState.error,
    status: authState.status,

    // Acciones principales
    login,
    logout,
    refreshTokens,
    clearError,

    // Utilidades computadas
    ...authUtils
  }
}

/**
 * Hook simplificado para componentes que solo necesitan estado básico
 */
export function useAuth() {
  const authState = useAuthState()
  
  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    login: authState.login,
    logout: authState.logout
  }
}

/**
 * Hook para verificación de roles específicos
 */
export function useAuthRole(requiredRole: string) {
  const { user, isAuthenticated } = useAuthState()
  
  return useMemo(() => ({
    hasRequiredRole: isAuthenticated && user?.role === requiredRole,
    userRole: user?.role,
    isAuthenticated
  }), [user?.role, isAuthenticated, requiredRole])
}