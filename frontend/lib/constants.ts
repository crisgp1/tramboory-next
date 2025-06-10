export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const ROUTES = {
  // Public
  HOME: '/',
  ABOUT: '/about',
  GALLERY: '/galeria',
  
  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  
  // Dashboard
  DASHBOARD: '/dashboard',
  CATALOG: '/catalogo',
  RESERVATIONS: '/reservas',
  FINANCES: '/finanzas',
  INVENTORY: '/inventario',
  USERS: '/usuarios',
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  EMPLOYEE: 'employee',
  CUSTOMER: 'customer',
} as const;

export const RESERVATION_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
} as const;

// Development settings
export const DEV_CONFIG = {
  // Habilita auto-login automático para desarrollo (evita redirecciones a login)
  ENABLE_AUTO_LOGIN: process.env.NODE_ENV === 'development',
  DEFAULT_DEV_USER: {
    id: '1',
    name: 'Administrador (Auto-login)',
    email: 'admin@tramboory.com',
    role: 'admin' as const,
  }
} as const;
