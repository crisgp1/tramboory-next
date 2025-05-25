// features/auth/constants/index.ts

/**
 * Constantes para el módulo de autenticación
 * Configuraciones centralizadas y type-safe
 */

export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  PROFILE: '/auth/profile',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  CHANGE_PASSWORD: '/auth/change-password',
  VERIFY_EMAIL: '/auth/verify-email'
} as const;

export const AUTH_ROUTES = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  DASHBOARD: '/dashboard',
  HOME: '/'
} as const;

export const AUTH_STORAGE_KEYS = {
  USER: 'auth_user',
  TOKENS: 'auth_tokens',
  STATE: 'auth_state'
} as const;

export const AUTH_CONFIG = {
  TOKEN_REFRESH_THRESHOLD: 5 * 60 * 1000, // 5 minutos
  MAX_IDLE_TIME: 30 * 60 * 1000, // 30 minutos
  ACTIVITY_CHECK_INTERVAL: 60 * 1000, // 1 minuto
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutos
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128
} as const;

export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_FAILED: 'AUTHENTICATION_FAILED',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  ACCOUNT_LOCKED: 'ACCOUNT_LOCKED',
  NETWORK_ERROR: 'NETWORK_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED'
} as const;

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Inicio de sesión exitoso',
  REGISTER_SUCCESS: 'Cuenta creada exitosamente',
  LOGOUT_SUCCESS: 'Sesión cerrada correctamente',
  PASSWORD_RESET_SENT: 'Email de recuperación enviado',
  PASSWORD_RESET_SUCCESS: 'Contraseña reseteada exitosamente',
  PROFILE_UPDATED: 'Perfil actualizado correctamente',
  EMAIL_VERIFIED: 'Email verificado exitosamente'
} as const;

export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  PHONE: /^\+?[1-9]\d{1,14}$/,
  NAME: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
} as const;

export type AuthEndpoint = typeof AUTH_ENDPOINTS[keyof typeof AUTH_ENDPOINTS];
export type AuthRoute = typeof AUTH_ROUTES[keyof typeof AUTH_ROUTES];
export type AuthStorageKey = typeof AUTH_STORAGE_KEYS[keyof typeof AUTH_STORAGE_KEYS];
export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];
export type SuccessMessage = typeof SUCCESS_MESSAGES[keyof typeof SUCCESS_MESSAGES];