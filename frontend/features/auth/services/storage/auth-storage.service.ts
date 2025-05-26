/**
 * Servicio de Almacenamiento Seguro para Autenticación Enterprise
 * @module AuthStorageService
 */

import CryptoJS from 'crypto-js';
import type { AuthTokens, UserProfile } from '../../types/auth.types';
import { authConfig } from '../../config/auth.config';

/**
 * Servicio de almacenamiento con encriptación y fallbacks
 */
class AuthStorageService {
  private readonly storageKeys = {
    USER: 'tramboory_auth_user_v1',
    TOKENS: 'tramboory_auth_tokens_v1',
    DEVICE_ID: 'tramboory_device_id_v1',
    PREFERENCES: 'tramboory_user_preferences_v1'
  } as const;

  private readonly encryptionKey = 'TramboorySecureKey2024';
  private memoryFallback = new Map<string, string>();
  private deviceId: string | null = null;

  constructor() {
    this.initializeDeviceId();
  }

  // ============================================================================
  // GESTIÓN DE TOKENS
  // ============================================================================

  /**
   * Persistencia segura de tokens con metadatos
   */
  async saveTokens(tokens: AuthTokens): Promise<boolean> {
    try {
      const tokenData = {
        ...tokens,
        storedAt: Date.now(),
        deviceId: await this.getDeviceId(),
        version: '1.0'
      };

      const success = await this.secureStore(
        this.storageKeys.TOKENS, 
        JSON.stringify(tokenData)
      );

      if (success) {
        this.logOperation('saveTokens', 'success');
      } else {
        this.logOperation('saveTokens', 'failure');
      }

      return success;
    } catch (error) {
      this.logOperation('saveTokens', 'error', error);
      return false;
    }
  }

  /**
   * Recuperación y validación de tokens
   */
  async getTokens(): Promise<AuthTokens | null> {
    try {
      const encryptedData = await this.secureRetrieve(this.storageKeys.TOKENS);
      if (!encryptedData) return null;

      const tokenData = JSON.parse(encryptedData);

      // Validación de integridad del dispositivo
      const currentDeviceId = await this.getDeviceId();
      if (tokenData.deviceId !== currentDeviceId) {
        this.logOperation('getTokens', 'device_mismatch');
        await this.clearTokens();
        return null;
      }

      // Validación de versión de esquema
      if (tokenData.version !== '1.0') {
        this.logOperation('getTokens', 'version_mismatch');
        await this.clearTokens();
        return null;
      }

      // Remover metadatos internos
      const { storedAt, deviceId, version, ...tokens } = tokenData;
      
      this.logOperation('getTokens', 'success');
      return tokens as AuthTokens;

    } catch (error) {
      this.logOperation('getTokens', 'error', error);
      await this.clearTokens();
      return null;
    }
  }

  /**
   * Verificación de expiración con buffer de seguridad
   */
  async areTokensExpired(): Promise<boolean> {
    try {
      const tokens = await this.getTokens();
      if (!tokens) return true;

      const now = Date.now();
      const bufferTime = authConfig.tokenRefreshThreshold;
      
      const isExpired = now >= (tokens.expiresAt - bufferTime);
      
      if (isExpired) {
        this.logOperation('areTokensExpired', 'expired');
      }

      return isExpired;
    } catch (error) {
      this.logOperation('areTokensExpired', 'error', error);
      return true;
    }
  }

  /**
   * Limpieza segura de tokens
   */
  async clearTokens(): Promise<void> {
    try {
      await this.secureRemove(this.storageKeys.TOKENS);
      this.logOperation('clearTokens', 'success');
    } catch (error) {
      this.logOperation('clearTokens', 'error', error);
    }
  }

  // ============================================================================
  // GESTIÓN DE USUARIO
  // ============================================================================

  /**
   * Persistencia de perfil de usuario
   */
  async saveUser(user: UserProfile): Promise<boolean> {
    try {
      const userData = {
        ...user,
        storedAt: Date.now(),
        deviceId: await this.getDeviceId()
      };

      const success = await this.secureStore(
        this.storageKeys.USER,
        JSON.stringify(userData)
      );

      this.logOperation('saveUser', success ? 'success' : 'failure');
      return success;
    } catch (error) {
      this.logOperation('saveUser', 'error', error);
      return false;
    }
  }

  /**
   * Recuperación de perfil de usuario
   */
  async getUser(): Promise<UserProfile | null> {
    try {
      const encryptedData = await this.secureRetrieve(this.storageKeys.USER);
      if (!encryptedData) return null;

      const userData = JSON.parse(encryptedData);

      // Validación de dispositivo
      const currentDeviceId = await this.getDeviceId();
      if (userData.deviceId !== currentDeviceId) {
        await this.clearUser();
        return null;
      }

      // Remover metadatos
      const { storedAt, deviceId, ...user } = userData;
      
      this.logOperation('getUser', 'success');
      return user as UserProfile;
    } catch (error) {
      this.logOperation('getUser', 'error', error);
      await this.clearUser();
      return null;
    }
  }

  /**
   * Limpieza de datos de usuario
   */
  async clearUser(): Promise<void> {
    try {
      await this.secureRemove(this.storageKeys.USER);
      this.logOperation('clearUser', 'success');
    } catch (error) {
      this.logOperation('clearUser', 'error', error);
    }
  }

  // ============================================================================
  // OPERACIONES GLOBALES
  // ============================================================================

  /**
   * Limpieza completa de datos de autenticación
   */
  async clearAll(): Promise<void> {
    try {
      await Promise.all([
        this.clearTokens(),
        this.clearUser(),
        this.secureRemove(this.storageKeys.PREFERENCES)
      ]);

      // Limpiar caché en memoria
      this.memoryFallback.clear();
      
      this.logOperation('clearAll', 'success');
    } catch (error) {
      this.logOperation('clearAll', 'error', error);
    }
  }

  // ============================================================================
  // UTILIDADES DE DISPOSITIVO
  // ============================================================================

  /**
   * Inicialización del ID de dispositivo
   */
  private async initializeDeviceId(): Promise<void> {
    try {
      this.deviceId = await this.getDeviceId();
    } catch (error) {
      this.logOperation('initializeDeviceId', 'error', error);
    }
  }

  /**
   * Obtención o generación de ID único de dispositivo
   */
  private async getDeviceId(): Promise<string> {
    if (this.deviceId) return this.deviceId;

    try {
      // Intentar recuperar ID existente
      const stored = await this.secureRetrieve(this.storageKeys.DEVICE_ID);
      if (stored) {
        this.deviceId = stored;
        return stored;
      }

      // Generar nuevo ID basado en características del navegador
      const fingerprint = await this.generateDeviceFingerprint();
      
      await this.secureStore(this.storageKeys.DEVICE_ID, fingerprint);
      this.deviceId = fingerprint;
      
      return fingerprint;
    } catch (error) {
      // Fallback a ID temporal
      const fallbackId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      this.deviceId = fallbackId;
      return fallbackId;
    }
  }

  /**
   * Generación de fingerprint único del dispositivo
   */
  private async generateDeviceFingerprint(): Promise<string> {
    const components = [
      navigator.userAgent || 'unknown',
      navigator.language || 'unknown',
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset().toString(),
      navigator.platform || 'unknown',
      navigator.cookieEnabled.toString(),
      Date.now().toString()
    ];

    const rawFingerprint = components.join('|');
    
    // Crear hash usando CryptoJS
    const hash = CryptoJS.SHA256(rawFingerprint).toString();
    
    return hash.substring(0, 32);
  }

  // ============================================================================
  // OPERACIONES SEGURAS DE ALMACENAMIENTO
  // ============================================================================

  /**
   * Almacenamiento seguro con encriptación
   */
  private async secureStore(key: string, data: string): Promise<boolean> {
    try {
      const encrypted = authConfig.storageEncryption 
        ? this.encrypt(data)
        : data;

      if (this.isStorageAvailable()) {
        localStorage.setItem(key, encrypted);
      } else {
        this.memoryFallback.set(key, encrypted);
      }

      return true;
    } catch (error) {
      this.logOperation('secureStore', 'error', error);
      return false;
    }
  }

  /**
   * Recuperación segura con desencriptación
   */
  private async secureRetrieve(key: string): Promise<string | null> {
    try {
      let encrypted: string | null = null;

      if (this.isStorageAvailable()) {
        encrypted = localStorage.getItem(key);
      } else {
        encrypted = this.memoryFallback.get(key) || null;
      }

      if (!encrypted) return null;

      const data = authConfig.storageEncryption 
        ? this.decrypt(encrypted)
        : encrypted;

      return data;
    } catch (error) {
      this.logOperation('secureRetrieve', 'error', error);
      return null;
    }
  }

  /**
   * Eliminación segura
   */
  private async secureRemove(key: string): Promise<void> {
    try {
      if (this.isStorageAvailable()) {
        localStorage.removeItem(key);
      } else {
        this.memoryFallback.delete(key);
      }
    } catch (error) {
      this.logOperation('secureRemove', 'error', error);
    }
  }

  // ============================================================================
  // CRIPTOGRAFÍA
  // ============================================================================

  /**
   * Encriptación de datos sensibles
   */
  private encrypt(data: string): string {
    try {
      return CryptoJS.AES.encrypt(data, this.encryptionKey).toString();
    } catch (error) {
      this.logOperation('encrypt', 'error', error);
      // Fallback sin encriptación si falla
      return data;
    }
  }

  /**
   * Desencriptación de datos
   */
  private decrypt(encryptedData: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.encryptionKey);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      this.logOperation('decrypt', 'error', error);
      // Asumir que no está encriptado si falla
      return encryptedData;
    }
  }

  // ============================================================================
  // UTILIDADES AUXILIARES
  // ============================================================================

  /**
   * Verificación de disponibilidad de localStorage
   */
  private isStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Sistema de logging interno
   */
  private logOperation(
    operation: string, 
    status: 'success' | 'failure' | 'error' | 'device_mismatch' | 'version_mismatch' | 'expired', 
    error?: unknown
  ): void {
    if (authConfig.logLevel === 'debug' || status === 'error') {
      const logEntry = {
        timestamp: new Date().toISOString(),
        operation,
        status,
        error: error instanceof Error ? error.message : error
      };

      console.log(`[AuthStorage] ${operation}:`, logEntry);
    }
  }
}

// Singleton para uso global
export const authStorageService = new AuthStorageService();
export type { AuthStorageService };