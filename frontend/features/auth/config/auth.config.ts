/**
 * Configuración Enterprise para Módulo de Autenticación
 * @module AuthConfig
 */

import type { AuthConfig, SecurityConfig } from '../types/auth.types';

/**
 * Configuración principal de autenticación
 */
export const authConfig: AuthConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  apiTimeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000'),
  maxRetries: parseInt(process.env.NEXT_PUBLIC_API_RETRY_ATTEMPTS || '3'),
  tokenRefreshThreshold: 5 * 60 * 1000, // 5 minutos
  maxIdleTime: 30 * 60 * 1000, // 30 minutos
  storageEncryption: process.env.NEXT_PUBLIC_AUTH_STORAGE_ENCRYPTION === 'true',
  enableMockAuth: process.env.NEXT_PUBLIC_ENABLE_MOCK_AUTH === 'true',
  logLevel: (process.env.NODE_ENV === 'development' ? 'debug' : 'error') as 'debug' | 'error'
};

/**
 * Configuración de seguridad
 */
export const securityConfig: SecurityConfig = {
  passwordMinLength: 8,
  passwordRequireSpecialChars: true,
  maxLoginAttempts: 5,
  lockoutDuration: 15 * 60 * 1000, // 15 minutos
  sessionTimeout: 8 * 60 * 60 * 1000, // 8 horas
  enableDeviceFingerprinting: true
};

/**
 * Endpoints de API
 */
export const apiEndpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    profile: '/auth/profile',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    changePassword: '/auth/change-password',
    verifyEmail: '/auth/verify-email'
  },
  user: {
    profile: '/users/profile',
    preferences: '/users/preferences',
    avatar: '/users/avatar'
  }
} as const;

/**
 * Credenciales de desarrollo para testing
 */
export const developmentCredentials = {
  admin: {
    email: 'admin@tramboory.com',
    password: 'Admin123!',
    role: 'admin' as const
  },
  employee: {
    email: 'daniel@tramboory.com',
    password: 'Dev123!',
    role: 'employee' as const
  },
  customer: {
    email: 'test@example.com',
    password: 'Test123!',
    role: 'customer' as const
  }
} as const;

/**
 * Configuración de logs
 */
export const logConfig = {
  enableConsoleLogging: process.env.NODE_ENV === 'development',
  enableRemoteLogging: process.env.NODE_ENV === 'production',
  logLevels: ['debug', 'info', 'warn', 'error'] as const,
  maxLogEntries: 1000
};