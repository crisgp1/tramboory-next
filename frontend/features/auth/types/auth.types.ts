/**
 * Sistema de Tipos Enterprise para Autenticación
 * @module AuthTypes
 * @version 1.0.0
 * @author Tramboory Development Team
 */

// ============================================================================
// ENUMS DE DOMINIO
// ============================================================================

export enum UserRole {
  ADMIN = 'admin',
  EMPLOYEE = 'employee', 
  CUSTOMER = 'customer'
}

export enum AuthStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
  ERROR = 'error',
  EXPIRED = 'expired'
}

export enum AuthErrorCode {
  NETWORK_ERROR = 'NETWORK_ERROR',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_INVALID = 'TOKEN_INVALID',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
  EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  SERVER_ERROR = 'SERVER_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR'
}

// ============================================================================
// INTERFACES CORE DE NEGOCIO
// ============================================================================

export interface UserProfile {
  readonly id: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber?: string;
  readonly role: UserRole;
  readonly avatar?: string;
  readonly isEmailVerified: boolean;
  readonly isActive: boolean;
  readonly lastLoginAt?: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly preferences?: UserPreferences;
}

export interface UserPreferences {
  readonly theme: 'light' | 'dark' | 'system';
  readonly language: 'es' | 'en';
  readonly timezone: string;
  readonly notifications: NotificationSettings;
}

export interface NotificationSettings {
  readonly email: boolean;
  readonly push: boolean;
  readonly sms: boolean;
  readonly marketing: boolean;
}

export interface AuthTokens {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly expiresAt: number;
  readonly tokenType: 'Bearer';
  readonly scope: string[];
}

export interface AuthState {
  readonly user: UserProfile | null;
  readonly tokens: AuthTokens | null;
  readonly status: AuthStatus;
  readonly error: AuthError | null;
  readonly isLoading: boolean;
  readonly lastActivity: number;
  readonly deviceFingerprint?: string;
}

export interface AuthError {
  readonly code: AuthErrorCode;
  readonly message: string;
  readonly field?: string;
  readonly timestamp: Date;
  readonly retryAfter?: number;
  readonly details?: Record<string, unknown>;
}

// ============================================================================
// INTERFACES DE OPERACIONES
// ============================================================================

export interface LoginCredentials {
  readonly email: string;
  readonly password: string;
  readonly rememberMe?: boolean;
  readonly captchaToken?: string;
  readonly deviceFingerprint?: string;
}

export interface RegisterData {
  readonly email: string;
  readonly password: string;
  readonly confirmPassword: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber?: string;
  readonly acceptTerms: boolean;
  readonly acceptPrivacy: boolean;
  readonly marketingConsent?: boolean;
}

export interface ForgotPasswordRequest {
  readonly email: string;
  readonly captchaToken?: string;
  readonly redirectUrl?: string;
}

export interface ResetPasswordRequest {
  readonly token: string;
  readonly password: string;
  readonly confirmPassword: string;
}

export interface UpdateProfileRequest {
  readonly firstName?: string;
  readonly lastName?: string;
  readonly phoneNumber?: string;
  readonly avatar?: string;
  readonly preferences?: Partial<UserPreferences>;
}

export interface ChangePasswordRequest {
  readonly currentPassword: string;
  readonly newPassword: string;
  readonly confirmPassword: string;
}

// ============================================================================
// INTERFACES DE RESPUESTA API
// ============================================================================

export interface AuthResponse<T = UserProfile> {
  readonly success: boolean;
  readonly data?: T;
  readonly tokens?: AuthTokens;
  readonly error?: AuthError;
  readonly metadata?: ResponseMetadata;
}

export interface ResponseMetadata {
  readonly requestId: string;
  readonly timestamp: Date;
  readonly version: string;
  readonly rateLimit?: RateLimitInfo;
  readonly performance?: PerformanceInfo;
}

export interface RateLimitInfo {
  readonly limit: number;
  readonly remaining: number;
  readonly reset: Date;
  readonly retryAfter?: number;
}

export interface PerformanceInfo {
  readonly responseTime: number;
  readonly serverTime: number;
  readonly cacheHit: boolean;
}

// ============================================================================
// INTERFACES DE CONTEXTO Y HOOKS
// ============================================================================

export interface AuthContextValue {
  readonly state: AuthState;
  readonly actions: AuthActions;
  readonly utils: AuthUtils;
}

export interface AuthActions {
  readonly login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  readonly register: (data: RegisterData) => Promise<AuthResponse>;
  readonly logout: () => Promise<void>;
  readonly refreshTokens: () => Promise<boolean>;
  readonly updateProfile: (data: UpdateProfileRequest) => Promise<AuthResponse>;
  readonly changePassword: (data: ChangePasswordRequest) => Promise<AuthResponse>;
  readonly forgotPassword: (data: ForgotPasswordRequest) => Promise<AuthResponse>;
  readonly resetPassword: (data: ResetPasswordRequest) => Promise<AuthResponse>;
  readonly clearError: () => void;
  readonly updateLastActivity: () => void;
}

export interface AuthUtils {
  readonly isAuthenticated: boolean;
  readonly hasRole: (role: UserRole) => boolean;
  readonly hasAnyRole: (roles: UserRole[]) => boolean;
  readonly hasPermission: (permission: string) => boolean;
  readonly getDisplayName: () => string;
  readonly getInitials: () => string;
  readonly getTokens: () => AuthTokens | null;
  readonly isTokenValid: () => boolean;
  readonly timeUntilExpiry: () => number;
  readonly shouldRefreshToken: () => boolean;
}

export interface UseAuthReturn {
  readonly user: UserProfile | null;
  readonly isAuthenticated: boolean;
  readonly isLoading: boolean;
  readonly error: AuthError | null;
  readonly status: AuthStatus;
  readonly login: (credentials: LoginCredentials) => Promise<boolean>;
  readonly logout: () => Promise<void>;
  readonly clearError: () => void;
  readonly refreshTokens: () => Promise<boolean>;
}

// ============================================================================
// INTERFACES DE CONFIGURACIÓN
// ============================================================================

export interface AuthConfig {
  readonly apiUrl: string;
  readonly apiTimeout: number;
  readonly maxRetries: number;
  readonly tokenRefreshThreshold: number;
  readonly maxIdleTime: number;
  readonly storageEncryption: boolean;
  readonly enableMockAuth: boolean;
  readonly logLevel: 'debug' | 'info' | 'warn' | 'error';
}

export interface SecurityConfig {
  readonly passwordMinLength: number;
  readonly passwordRequireSpecialChars: boolean;
  readonly maxLoginAttempts: number;
  readonly lockoutDuration: number;
  readonly sessionTimeout: number;
  readonly enableDeviceFingerprinting: boolean;
}

// ============================================================================
// TIPOS DE UTILIDAD Y HELPERS
// ============================================================================

export type AuthEventType = 
  | 'login_success'
  | 'login_failure'
  | 'logout'
  | 'token_refresh'
  | 'session_expired'
  | 'profile_updated'
  | 'password_changed';

export interface AuthEvent {
  readonly type: AuthEventType;
  readonly timestamp: Date;
  readonly userId?: string;
  readonly metadata?: Record<string, unknown>;
}

export type AuthListener = (event: AuthEvent) => void;

// Type guards para runtime validation
export const isUserProfile = (obj: unknown): obj is UserProfile => {
  return typeof obj === 'object' && 
         obj !== null && 
         'id' in obj && 
         'email' in obj && 
         'role' in obj;
};

export const isAuthTokens = (obj: unknown): obj is AuthTokens => {
  return typeof obj === 'object' && 
         obj !== null && 
         'accessToken' in obj && 
         'refreshToken' in obj && 
         'expiresAt' in obj;
};

export const isAuthError = (obj: unknown): obj is AuthError => {
  return typeof obj === 'object' && 
         obj !== null && 
         'code' in obj && 
         'message' in obj;
};