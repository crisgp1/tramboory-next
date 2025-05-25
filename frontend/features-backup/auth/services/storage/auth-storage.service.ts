// features/auth/services/storage/auth-storage.service.ts

import type { AuthTokens, UserProfile } from '../../types';

/**
 * Servicio de almacenamiento seguro para datos de autenticación
 * Implementa encriptación y manejo de fallbacks
 */

class AuthStorageService {
  private readonly storageKey = 'auth_state';
  private readonly tokenKey = 'auth_tokens';
  private readonly userKey = 'auth_user';
  
  // Cache en memoria para fallback
  private memoryCache = new Map<string, string>();

  /**
   * Guardar tokens de forma segura
   */
  async saveTokens(tokens: AuthTokens): Promise<boolean> {
    try {
      const encryptedTokens = await this.encrypt(JSON.stringify(tokens));
      
      if (this.isLocalStorageAvailable()) {
        localStorage.setItem(this.tokenKey, encryptedTokens);
      } else {
        this.memoryCache.set(this.tokenKey, encryptedTokens);
      }
      
      return true;
    } catch (error) {
      console.error('Error saving tokens:', error);
      return false;
    }
  }

  /**
   * Recuperar tokens
   */
  async getTokens(): Promise<AuthTokens | null> {
    try {
      let encryptedTokens: string | null = null;
      
      if (this.isLocalStorageAvailable()) {
        encryptedTokens = localStorage.getItem(this.tokenKey);
      } else {
        encryptedTokens = this.memoryCache.get(this.tokenKey) || null;
      }
      
      if (!encryptedTokens) return null;
      
      const decryptedTokens = await this.decrypt(encryptedTokens);
      return JSON.parse(decryptedTokens) as AuthTokens;
    } catch (error) {
      console.error('Error retrieving tokens:', error);
      await this.clearTokens();
      return null;
    }
  }

  /**
   * Guardar información de usuario
   */
  async saveUser(user: UserProfile): Promise<boolean> {
    try {
      const userData = JSON.stringify(user);
      
      if (this.isLocalStorageAvailable()) {
        localStorage.setItem(this.userKey, userData);
      } else {
        this.memoryCache.set(this.userKey, userData);
      }
      
      return true;
    } catch (error) {
      console.error('Error saving user:', error);
      return false;
    }
  }

  /**
   * Recuperar información de usuario
   */
  async getUser(): Promise<UserProfile | null> {
    try {
      let userData: string | null = null;
      
      if (this.isLocalStorageAvailable()) {
        userData = localStorage.getItem(this.userKey);
      } else {
        userData = this.memoryCache.get(this.userKey) || null;
      }
      
      if (!userData) return null;
      
      return JSON.parse(userData) as UserProfile;
    } catch (error) {
      console.error('Error retrieving user:', error);
      await this.clearUser();
      return null;
    }
  }

  /**
   * Limpiar tokens
   */
  async clearTokens(): Promise<void> {
    try {
      if (this.isLocalStorageAvailable()) {
        localStorage.removeItem(this.tokenKey);
      }
      this.memoryCache.delete(this.tokenKey);
    } catch (error) {
      console.error('Error clearing tokens:', error);
    }
  }

  /**
   * Limpiar información de usuario
   */
  async clearUser(): Promise<void> {
    try {
      if (this.isLocalStorageAvailable()) {
        localStorage.removeItem(this.userKey);
      }
      this.memoryCache.delete(this.userKey);
    } catch (error) {
      console.error('Error clearing user:', error);
    }
  }

  /**
   * Limpiar todo el estado de autenticación
   */
  async clearAll(): Promise<void> {
    await Promise.all([
      this.clearTokens(),
      this.clearUser()
    ]);
    
    // Limpiar caché en memoria
    this.memoryCache.clear();
  }

  /**
   * Verificar si los tokens están expirados
   */
  async areTokensExpired(): Promise<boolean> {
    const tokens = await this.getTokens();
    
    if (!tokens) return true;
    
    const now = Date.now();
    const expiry = tokens.expiresAt;
    
    // Considerar expirado si quedan menos de 5 minutos
    const bufferTime = 5 * 60 * 1000; // 5 minutos en ms
    
    return now >= (expiry - bufferTime);
  }

  /**
   * Utilidades privadas
   */
  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  private async encrypt(data: string): Promise<string> {
    // En un entorno real, implementarías encriptación real
    // Por ahora, usamos base64 para demostración
    try {
      return btoa(data);
    } catch {
      return data; // Fallback sin encriptación
    }
  }

  private async decrypt(encryptedData: string): Promise<string> {
    // En un entorno real, implementarías desencriptación real
    try {
      return atob(encryptedData);
    } catch {
      return encryptedData; // Fallback sin desencriptación
    }
  }
}

// Singleton instance
export const authStorageService = new AuthStorageService();
export type { AuthStorageService };