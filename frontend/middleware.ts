import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rutas que requieren autenticación
const protectedRoutes = ['/dashboard', '/finanzas', '/inventario', '/catalogo', '/reservas'];
// Rutas que requieren estar NO autenticado
const authRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth-token')?.value;

  // Verificar si la ruta requiere autenticación
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // Si es una ruta protegida y no hay token, redirigir a login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si está autenticado y trata de acceder a login/register, redirigir al dashboard
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
EOF

# ============================================================================
# LIB - Utilities y configuraciones
# ============================================================================
echo "🛠️ Creando utilities y configuraciones..."

cat > lib/utils.ts << 'EOF'
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}
EOF

cat > lib/constants.ts << 'EOF'
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
EOF

cat > lib/validations.ts << 'EOF'
import { z } from 'zod';

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

// Package schema
export const packageSchema = z.object({
  name: z.string().min(2, 'El nombre es requerido'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  price: z.number().min(0, 'El precio debe ser mayor a 0'),
  duration: z.number().min(1, 'La duración debe ser mayor a 0'),
  capacity: z.number().min(1, 'La capacidad debe ser mayor a 0'),
});

// Reservation schema
export const reservationSchema = z.object({
  packageId: z.string().min(1, 'Selecciona un paquete'),
  date: z.string().min(1, 'Selecciona una fecha'),
  time: z.string().min(1, 'Selecciona una hora'),
  celebrantName: z.string().min(2, 'El nombre del festejado es requerido'),
  celebrantAge: z.number().min(1, 'La edad es requerida'),
  guestCount: z.number().min(1, 'El número de invitados es requerido'),
  customerName: z.string().min(2, 'Tu nombre es requerido'),
  customerPhone: z.string().min(10, 'El teléfono es requerido'),
  customerEmail: z.string().email('Email inválido'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type PackageInput = z.infer<typeof packageSchema>;
export type ReservationInput = z.infer<typeof reservationSchema>;
EOF

cat > lib/api.ts << 'EOF'
import axios from 'axios';
import { API_BASE_URL } from './constants';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor para agregar token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth-token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
EOF

# ============================================================================
# TYPES - Definiciones de tipos
# ============================================================================
echo "📝 Creando definiciones de tipos..."

cat > types/auth.ts << 'EOF'
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee' | 'customer';
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
EOF

cat > types/catalog.ts << 'EOF'
export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // en horas
  capacity: number; // número de invitados
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: string[];
  imageUrl?: string;
  isActive: boolean;
}

export interface Extra {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isActive: boolean;
}

export interface FoodOption {
  id: string;
  name: string;
  description: string;
  price: number;
  allergens?: string[];
  isActive: boolean;
}
EOF

cat > types/reservation.ts << 'EOF'
export interface Reservation {
  id: string;
  packageId: string;
  package?: Package;
  customerId: string;
  customer?: User;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  celebrantName: string;
  celebrantAge: number;
  guestCount: number;
  totalAmount: number;
  deposit: number;
  remainingAmount: number;
  extras: ReservationExtra[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReservationExtra {
  id: string;
  extraId: string;
  extra?: Extra;
  quantity: number;
  price: number;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  reservationId?: string;
}

import { Package, Extra } from './catalog';
import { User } from './auth';
EOF

cat > types/finance.ts << 'EOF'
export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
  reservationId?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  reservationId: string;
  amount: number;
  method: 'cash' | 'card' | 'transfer';
  status: 'pending' | 'completed' | 'failed';
  date: string;
  notes?: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  profit: number;
  pendingPayments: number;
  period: {
    start: string;
    end: string;
  };
}
EOF

cat > types/inventory.ts << 'EOF'
export interface MateriaPrima {
  id: string;
  name: string;
  description: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  price: number;
  supplierId?: string;
  isActive: boolean;
}

export interface Lote {
  id: string;
  materiaPrimaId: string;
  quantity: number;
  expirationDate?: string;
  purchaseDate: string;
  cost: number;
}

export interface MovimientoInventario {
  id: string;
  materiaPrimaId: string;
  type: 'entrada' | 'salida' | 'ajuste';
  quantity: number;
  reason: string;
  date: string;
  userId: string;
}

export interface AlertaInventario {
  id: string;
  materiaPrimaId: string;
  type: 'low_stock' | 'expiring' | 'expired';
  message: string;
  isRead: boolean;
  createdAt: string;
}
EOF

cat > types/api.ts << 'EOF'
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code: string;
  details?: any;
}
EOF

cat > types/index.ts << 'EOF'
export * from './auth';
export * from './catalog';
export * from './reservation';
export * from './finance';
export * from './inventory';
export * from './api';
EOF

# ============================================================================
# HOOKS - Custom hooks
# ============================================================================
echo "🎣 Creando custom hooks..."

cat > hooks/use-auth.ts << 'EOF'
import { useState, useEffect } from 'react';
import { User } from '@/types/auth';
import { api } from '@/lib/api';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await api.get('/auth/me');
      setUser(response.data.data);
    } catch (error) {
      localStorage.removeItem('auth-token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    const { user, token } = response.data.data;
    
    localStorage.setItem('auth-token', token);
    setUser(user);
    
    return { user, token };
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    setUser(null);
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    checkAuth,
  };
}
EOF

cat > hooks/use-local-storage.ts << 'EOF'
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue] as const;
}
EOF

cat > hooks/index.ts << 'EOF'
export * from './use-auth';
export * from './use-local-storage';
EOF

# ============================================================================
# STORE - Estado global con Zustand
# ============================================================================
echo "🏪 Creando stores de estado..."

cat > store/auth-store.ts << 'EOF'
import { create } from 'zustand';
import { User } from '@/types/auth';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setLoading: (loading) => set({ isLoading: loading }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
EOF

cat > store/catalog-store.ts << 'EOF'
import { create } from 'zustand';
import { Package, Theme, Extra } from '@/types/catalog';

interface CatalogStore {
  packages: Package[];
  themes: Theme[];
  extras: Extra[];
  loading: boolean;
  setPackages: (packages: Package[]) => void;
  setThemes: (themes: Theme[]) => void;
  setExtras: (extras: Extra[]) => void;
  setLoading: (loading: boolean) => void;
  addPackage: (pkg: Package) => void;
  updatePackage: (id: string, pkg: Partial<Package>) => void;
  removePackage: (id: string) => void;
}

export const useCatalogStore = create<CatalogStore>((set) => ({
  packages: [],
  themes: [],
  extras: [],
  loading: false,
  setPackages: (packages) => set({ packages }),
  setThemes: (themes) => set({ themes }),
  setExtras: (extras) => set({ extras }),
  setLoading: (loading) => set({ loading }),
  addPackage: (pkg) => set((state) => ({ packages: [...state.packages, pkg] })),
  updatePackage: (id, updatedPkg) => set((state) => ({
    packages: state.packages.map(pkg => pkg.id === id ? { ...pkg, ...updatedPkg } : pkg)
  })),
  removePackage: (id) => set((state) => ({
    packages: state.packages.filter(pkg => pkg.id !== id)
  })),
}));
EOF

cat > store/index.ts << 'EOF'
export * from './auth-store';
export * from './catalog-store';
EOF

# ============================================================================
# UI COMPONENTS - Componentes base
# ============================================================================
echo "🎨 Creando componentes UI base..."

cat > components/ui/card.tsx << 'EOF'
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: CardProps) {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  );
}

export function CardTitle({ className, ...props }: CardProps) {
  return (
    <h3
      className={cn(
        'text-2xl font-semibold leading-none tracking-tight',
        className
      )}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: CardProps) {
  return <div className={cn('p-6 pt-0', className)} {...props} />;
}
EOF

cat > components/ui/modal.tsx << 'EOF'
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={cn(
        'relative bg-white rounded-lg shadow-lg w-full mx-4',
        sizeClasses[size]
      )}>
        {title && (
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        )}
        
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
EOF

cat > components/ui/table.tsx << 'EOF'
import { cn } from '@/lib/utils';

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}

export function Table({ className, ...props }: TableProps) {
  return (
    <div className="relative w-full overflow-auto">
      <table
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  );
}

export function TableHeader({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn('[&_tr]:border-b', className)} {...props} />;
}

export function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />;
}

export function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        'border-b transition-colors hover:bg-muted/50',
        className
      )}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        'h-12 px-4 text-left align-middle font-medium text-muted-foreground',
        className
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn('p-4 align-middle', className)}
      {...props}
    />
  );
}
EOF

cat > components/ui/badge.tsx << 'EOF'
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
EOF

# Actualizar el index.ts de UI
cat > components/ui/index.ts << 'EOF'
export * from './Button';
export * from './Input';
export * from './card';
export * from './modal';
export * from './table';
export * from './badge';
EOF

# ============================================================================
# AUTH COMPONENTS
# ============================================================================
echo "🔐 Creando componentes de autenticación..."

cat > components/auth/login-form.tsx << 'EOF'
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/use-auth';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </Button>
    </form>
  );
}
EOF

cat > components/auth/register-form.tsx << 'EOF'
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { api } from '@/lib/api';

export function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    try {
      await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      
      router.push('/login?message=Cuenta creada exitosamente');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre completo
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirmar contraseña
        </label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
      </Button>
    </form>
  );
}
EOF

cat > components/auth/auth-guard.tsx << 'EOF'
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: string;
}

export function AuthGuard({ children, requireAuth = true, requiredRole }: AuthGuardProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !isAuthenticated) {
        router.push('/login');
        return;
      }

      if (requiredRole && user?.role !== requiredRole) {
        router.push('/dashboard');
        return;
      }
    }
  }, [loading, isAuthenticated, user, requireAuth, requiredRole, router]);

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
EOF

cat > components/auth/index.ts << 'EOF'
export * from './login-form';
export * from './register-form';
export * from './auth-guard';
EOF

# ============================================================================
# RESERVATION COMPONENTS - Customer/Client
# ============================================================================
echo "🎯 Creando componentes de reservas (Cliente)..."

# Customer reservation components
mkdir -p components/reservation/customer
mkdir -p components/reservation/admin
mkdir -p components/reservation/shared

# Stepper principal del cliente
cat > components/reservation/customer/stepper-reservation.tsx << 'EOF'
'use client';

import { useState } from 'react';
import { StepIndicator } from './step-indicator';
import { SummarySidebar } from './summary-sidebar';
import { PackageStep } from './steps/package-step';
import { DateTimeStep } from './steps/datetime-step';
import { CelebrantStep } from './steps/celebrant-step';
import { ThemeStep } from './steps/theme-step';
import { ExtrasStep } from './steps/extras-step';
import { FoodOptionsStep } from './steps/food-options-step';
import { ReviewStep } from './steps/review-step';
import { Button } from '@/components/ui/Button';

const STEPS = [
  { id: 'package', title: 'Paquete', component: PackageStep },
  { id: 'datetime', title: 'Fecha y Hora', component: DateTimeStep },
  { id: 'celebrant', title: 'Festejado', component: CelebrantStep },
  { id: 'theme', title: 'Temática', component: ThemeStep },
  { id: 'extras', title: 'Extras', component: ExtrasStep },
  { id: 'food', title: 'Alimentos', component: FoodOptionsStep },
  { id: 'review', title: 'Resumen', component: ReviewStep },
];

export function StepperReservation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [reservationData, setReservationData] = useState({
    package: null,
    datetime: null,
    celebrant: null,
    theme: null,
    extras: [],
    foodOptions: [],
    customerInfo: null,
  });

  const updateReservationData = (stepData: any) => {
    setReservationData(prev => ({ ...prev, ...stepData }));
  };

  const goToNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = STEPS[currentStep].component;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header con indicador de pasos */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-8">Reserva tu Evento</h1>
          <StepIndicator 
            steps={STEPS} 
            currentStep={currentStep} 
            onStepClick={setCurrentStep}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenido principal */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">
                {STEPS[currentStep].title}
              </h2>
              
              <CurrentStepComponent
                data={reservationData}
                onUpdate={updateReservationData}
                onNext={goToNext}
                onPrevious={goToPrevious}
                canGoNext={currentStep < STEPS.length - 1}
                canGoPrevious={currentStep > 0}
              />
            </div>
          </div>

          {/* Sidebar con resumen */}
          <div className="lg:col-span-1">
            <SummarySidebar 
              reservationData={reservationData}
              currentStep={currentStep}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
EOF

# Step indicator
cat > components/reservation/customer/step-indicator.tsx << 'EOF'
'use client';

interface Step {
  id: string;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function StepIndicator({ steps, currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          {/* Step circle */}
          <button
            onClick={() => onStepClick?.(index)}
            className={`
              w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
              transition-colors duration-200
              ${index <= currentStep 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-500'
              }
              ${onStepClick ? 'hover:bg-blue-700 cursor-pointer' : ''}
            `}
          >
            {index + 1}
          </button>
          
          {/* Step label */}
          <span className={`
            ml-2 text-sm font-medium
            ${index <= currentStep ? 'text-blue-600' : 'text-gray-500'}
          `}>
            {step.title}
          </span>
          
          {/* Connector line */}
          {index < steps.length - 1 && (
            <div className={`
              w-12 h-0.5 mx-4
              ${index < currentStep ? 'bg-blue-600' : 'bg-gray-200'}
            `} />
          )}
        </div>
      ))}
    </div>
  );
}
EOF

# Summary sidebar
cat > components/reservation/customer/summary-sidebar.tsx << 'EOF'
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatCurrency, formatDate } from '@/lib/utils';

interface SummarySidebarProps {
  reservationData: any;
  currentStep: number;
}

export function SummarySidebar({ reservationData }: SummarySidebarProps) {
  const calculateTotal = () => {
    let total = 0;
    
    if (reservationData.package) {
      total += reservationData.package.price;
    }
    
    if (reservationData.extras) {
      total += reservationData.extras.reduce((sum: number, extra: any) => 
        sum + (extra.price * extra.quantity), 0
      );
    }
    
    return total;
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Resumen de tu Reserva</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Paquete seleccionado */}
        {reservationData.package && (
          <div className="border-b pb-4">
            <h4 className="font-medium">Paquete</h4>
            <p className="text-sm text-gray-600">{reservationData.package.name}</p>
            <p className="font-medium">{formatCurrency(reservationData.package.price)}</p>
          </div>
        )}

        {/* Fecha y hora */}
        {reservationData.datetime && (
          <div className="border-b pb-4">
            <h4 className="font-medium">Fecha y Hora</h4>
            <p className="text-sm text-gray-600">
              {formatDate(reservationData.datetime.date)} a las {reservationData.datetime.time}
            </p>
          </div>
        )}

        {/* Festejado */}
        {reservationData.celebrant && (
          <div className="border-b pb-4">
            <h4 className="font-medium">Festejado</h4>
            <p className="text-sm text-gray-600">
              {reservationData.celebrant.name}, {reservationData.celebrant.age} años
            </p>
            <p className="text-sm text-gray-600">
              {reservationData.celebrant.guestCount} invitados
            </p>
          </div>
        )}

        {/* Temática */}
        {reservationData.theme && (
          <div className="border-b pb-4">
            <h4 className="font-medium">Temática</h4>
            <p className="text-sm text-gray-600">{reservationData.theme.name}</p>
          </div>
        )}

        {/* Extras */}
        {reservationData.extras && reservationData.extras.length > 0 && (
          <div className="border-b pb-4">
            <h4 className="font-medium">Extras</h4>
            {reservationData.extras.map((extra: any, index: number) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{extra.name} x{extra.quantity}</span>
                <span>{formatCurrency(extra.price * extra.quantity)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Total */}
        <div className="pt-4">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total:</span>
            <span>{formatCurrency(calculateTotal())}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
EOF

# Crear carpeta para los steps
mkdir -p components/reservation/customer/steps

# Package Step
cat > components/reservation/customer/steps/package-step.tsx << 'EOF'
'use client';

import { useState, useEffect } from 'react';
import { Package } from '@/types/catalog';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { api } from '@/lib/api';

interface PackageStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export function PackageStep({ data, onUpdate, onNext, canGoPrevious, onPrevious }: PackageStepProps) {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(data.package);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await api.get('/catalogo/paquetes');
      setPackages(response.data.data.filter((pkg: Package) => pkg.isActive));
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPackage = (pkg: Package) => {
    setSelectedPackage(pkg);
    onUpdate({ package: pkg });
  };

  const handleNext = () => {
    if (selectedPackage) {
      onNext();
    }
  };

  if (loading) {
    return <div>Cargando paquetes...</div>;
  }

  return (
    <div className="space-y-6">
      <p className="text-gray-600">Selecciona el paquete que mejor se adapte a tu evento:</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packages.map((pkg) => (
          <Card 
            key={pkg.id} 
            className={`cursor-pointer transition-all duration-200 ${
              selectedPackage?.id === pkg.id 
                ? 'ring-2 ring-blue-500 bg-blue-50' 
                : 'hover:shadow-lg'
            }`}
            onClick={() => handleSelectPackage(pkg)}
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{pkg.name}</span>
                <span className="text-2xl font-bold text-blue-600">
                  {formatCurrency(pkg.price)}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{pkg.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Duración:</span>
                  <span className="font-medium">{pkg.duration} horas</span>
                </div>
                <div className="flex justify-between">
                  <span>Capacidad:</span>
                  <span className="font-medium">{pkg.capacity} personas</span>
                </div>
              </div>
              {selectedPackage?.id === pkg.id && (
                <div className="mt-4 text-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    ✓ Seleccionado
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between pt-6">
        <Button 
          variant="outline" 
          onClick={onPrevious} 
          disabled={!canGoPrevious}
        >
          Anterior
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={!selectedPackage}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
EOF

# DateTime Step
cat > components/reservation/customer/steps/datetime-step.tsx << 'EOF'
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface DateTimeStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export function DateTimeStep({ data, onUpdate, onNext, onPrevious, canGoPrevious }: DateTimeStepProps) {
  const [selectedDate, setSelectedDate] = useState(data.datetime?.date || '');
  const [selectedTime, setSelectedTime] = useState(data.datetime?.time || '');

  const timeSlots = [
    '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', 
    '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    updateDateTime(date, selectedTime);
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    updateDateTime(selectedDate, time);
  };

  const updateDateTime = (date: string, time: string) => {
    if (date && time) {
      onUpdate({ datetime: { date, time } });
    }
  };

  const handleNext = () => {
    if (selectedDate && selectedTime) {
      onNext();
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      <p className="text-gray-600">Selecciona la fecha y hora para tu evento:</p>
      
      {/* Date selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Fecha del evento
        </label>
        <Input
          type="date"
          value={selectedDate}
          onChange={(e) => handleDateChange(e.target.value)}
          min={today}
          className="max-w-xs"
        />
      </div>

      {/* Time selection */}
      {selectedDate && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hora del evento
          </label>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeChange(time)}
                className={`
                  p-3 text-sm font-medium rounded-lg border transition-colors
                  ${selectedTime === time 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected datetime display */}
      {selectedDate && selectedTime && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-medium text-green-800">Fecha y hora seleccionada:</h4>
          <p className="text-green-700">
            {new Date(selectedDate).toLocaleDateString('es-MX', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })} a las {selectedTime}
          </p>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between pt-6">
        <Button 
          variant="outline" 
          onClick={onPrevious} 
          disabled={!canGoPrevious}
        >
          Anterior
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={!selectedDate || !selectedTime}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
EOF

# Celebrant Step
cat > components/reservation/customer/steps/celebrant-step.tsx << 'EOF'
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface CelebrantStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export function CelebrantStep({ data, onUpdate, onNext, onPrevious, canGoPrevious }: CelebrantStepProps) {
  const [formData, setFormData] = useState({
    name: data.celebrant?.name || '',
    age: data.celebrant?.age || '',
    guestCount: data.celebrant?.guestCount || '',
    customerName: data.celebrant?.customerName || '',
    customerPhone: data.celebrant?.customerPhone || '',
    customerEmail: data.celebrant?.customerEmail || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Update parent data immediately
    onUpdate({ celebrant: { ...formData, [name]: value } });
  };

  const handleNext = () => {
    const isValid = Object.values(formData).every(value => value.toString().trim() !== '');
    if (isValid) {
      onNext();
    }
  };

  const isFormValid = Object.values(formData).every(value => value.toString().trim() !== '');

  return (
    <div className="space-y-6">
      <p className="text-gray-600">Cuéntanos sobre el festejado y proporciona tus datos de contacto:</p>
      
      {/* Información del festejado */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Información del festejado</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del festejado *
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: María José"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Edad *
            </label>
            <Input
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              placeholder="5"
              min="1"
              max="100"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número de invitados *
            </label>
            <Input
              name="guestCount"
              type="number"
              value={formData.guestCount}
              onChange={handleChange}
              placeholder="15"
              min="1"
              required
            />
          </div>
        </div>
      </div>

      {/* Información de contacto */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Tus datos de contacto</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tu nombre completo *
            </label>
            <Input
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono *
            </label>
            <Input
              name="customerPhone"
              type="tel"
              value={formData.customerPhone}
              onChange={handleChange}
              placeholder="33 1234 5678"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <Input
              name="customerEmail"
              type="email"
              value={formData.customerEmail}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
            />
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between pt-6">
        <Button 
          variant="outline" 
          onClick={onPrevious} 
          disabled={!canGoPrevious}
        >
          Anterior
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={!isFormValid}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
EOF

# Theme Step
cat > components/reservation/customer/steps/theme-step.tsx << 'EOF'
'use client';

import { useState, useEffect } from 'react';
import { Theme } from '@/types/catalog';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api';

interface ThemeStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export function ThemeStep({ data, onUpdate, onNext, onPrevious, canGoPrevious }: ThemeStepProps) {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(data.theme);

  useEffect(() => {
    fetchThemes();
  }, []);

  const fetchThemes = async () => {
    try {
      const response = await api.get('/catalogo/tematicas');
      setThemes(response.data.data.filter((theme: Theme) => theme.isActive));
    } catch (error) {
      console.error('Error fetching themes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTheme = (theme: Theme) => {
    setSelectedTheme(theme);
    onUpdate({ theme });
  };

  const handleNext = () => {
    onNext(); // Theme is optional, can continue without selecting
  };

  if (loading) {
    return <div>Cargando temáticas...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-gray-600">Selecciona una temática para tu evento (opcional):</p>
        <p className="text-sm text-gray-500 mt-1">
          Puedes continuar sin seleccionar una temática o elegir una más adelante.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {themes.map((theme) => (
          <Card 
            key={theme.id} 
            className={`cursor-pointer transition-all duration-200 ${
              selectedTheme?.id === theme.id 
                ? 'ring-2 ring-blue-500 bg-blue-50' 
                : 'hover:shadow-lg'
            }`}
            onClick={() => handleSelectTheme(theme)}
          >
            <CardHeader>
              <CardTitle className="text-lg">{theme.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-3">{theme.description}</p>
              
              {/* Color palette */}
              {theme.colors && theme.colors.length > 0 && (
                <div className="flex gap-2 mb-3">
                  {theme.colors.slice(0, 4).map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border-2 border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              )}
              
              {selectedTheme?.id === theme.id && (
                <div className="text-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    ✓ Seleccionado
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Option to skip */}
      <div className="text-center py-4">
        <button
          onClick={() => {
            setSelectedTheme(null);
            onUpdate({ theme: null });
          }}
          className="text-gray-500 hover:text-gray-700 text-sm underline"
        >
          No seleccionar temática por ahora
        </button>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between pt-6">
        <Button 
          variant="outline" 
          onClick={onPrevious} 
          disabled={!canGoPrevious}
        >
          Anterior
        </Button>
        <Button onClick={handleNext}>
          Siguiente
        </Button>
      </div>
    </div>
  );
}
EOF

# Extras Step (simplificado)
cat > components/reservation/customer/steps/extras-step.tsx << 'EOF'
'use client';

import { useState, useEffect } from 'react';
import { Extra } from '@/types/catalog';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { formatCurrency } from '@/lib/utils';
import { api } from '@/lib/api';

interface ExtrasStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export function ExtrasStep({ data, onUpdate, onNext, onPrevious, canGoPrevious }: ExtrasStepProps) {
  const [extras, setExtras] = useState<Extra[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExtras, setSelectedExtras] = useState<any[]>(data.extras || []);

  useEffect(() => {
    fetchExtras();
  }, []);

  const fetchExtras = async () => {
    try {
      const response = await api.get('/catalogo/extras');
      setExtras(response.data.data.filter((extra: Extra) => extra.isActive));
    } catch (error) {
      console.error('Error fetching extras:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = (extraId: string, quantity: number) => {
    const extra = extras.find(e => e.id === extraId);
    if (!extra) return;

    let newSelectedExtras = [...selectedExtras];
    const existingIndex = newSelectedExtras.findIndex(e => e.id === extraId);

    if (quantity > 0) {
      const extraData = {
        id: extraId,
        name: extra.name,
        price: extra.price,
        quantity
      };

      if (existingIndex >= 0) {
        newSelectedExtras[existingIndex] = extraData;
      } else {
        newSelectedExtras.push(extraData);
      }
    } else {
      if (existingIndex >= 0) {
        newSelectedExtras.splice(existingIndex, 1);
      }
    }

    setSelectedExtras(newSelectedExtras);
    onUpdate({ extras: newSelectedExtras });
  };

  const getQuantity = (extraId: string) => {
    const extra = selectedExtras.find(e => e.id === extraId);
    return extra ? extra.quantity : 0;
  };

  if (loading) {
    return <div>Cargando extras...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-gray-600">Agrega extras a tu evento (opcional):</p>
        <p className="text-sm text-gray-500 mt-1">
          Puedes agregar elementos adicionales para hacer tu evento aún más especial.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {extras.map((extra) => {
          const quantity = getQuantity(extra.id);
          return (
            <Card key={extra.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span className="text-lg">{extra.name}</span>
                  <span className="text-lg font-bold text-blue-600">
                    {formatCurrency(extra.price)}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{extra.description}</p>
                <p className="text-xs text-gray-500 mb-4">Categoría: {extra.category}</p>
                
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(extra.id, Math.max(0, quantity - 1))}
                    disabled={quantity === 0}
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => updateQuantity(extra.id, Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-20 text-center"
                    min={0}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(extra.id, quantity + 1)}
                  >
                    +
                  </Button>
                  
                  {quantity > 0 && (
                    <span className="text-sm font-medium text-green-600">
                      {formatCurrency(extra.price * quantity)}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Selected extras summary */}
      {selectedExtras.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-medium text-green-800 mb-2">Extras seleccionados:</h4>
          {selectedExtras.map((extra, index) => (
            <div key={index} className="flex justify-between text-sm text-green-700">
              <span>{extra.name} x{extra.quantity}</span>
              <span>{formatCurrency(extra.price * extra.quantity)}</span>
            </div>
          ))}
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between pt-6">
        <Button 
          variant="outline" 
          onClick={onPrevious} 
          disabled={!canGoPrevious}
        >
          Anterior
        </Button>
        <Button onClick={onNext}>
          Siguiente
        </Button>
      </div>
    </div>
  );
}
EOF

# Food Options Step (simplificado)
cat > components/reservation/customer/steps/food-options-step.tsx << 'EOF'
'use client';

import { Button } from '@/components/ui/Button';

interface FoodOptionsStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export function FoodOptionsStep({ onNext, onPrevious, canGoPrevious }: FoodOptionsStepProps) {
  // Por ahora simplificado - en el futuro se puede agregar la lógica completa
  return (
    <div className="space-y-6">
      <div>
        <p className="text-gray-600">Opciones de alimentos:</p>
        <p className="text-sm text-gray-500 mt-1">
          Las opciones de alimentos se coordinarán directamente contigo una vez confirmada la reserva.
        </p>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <h3 className="text-lg font-medium text-blue-800 mb-2">
          Coordinación Personalizada
        </h3>
        <p className="text-blue-700">
          Nuestro equipo se pondrá en contacto contigo para coordinar el menú 
          perfecto para tu evento, adaptado a tus preferencias y necesidades especiales.
        </p>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between pt-6">
        <Button 
          variant="outline" 
          onClick={onPrevious} 
          disabled={!canGoPrevious}
        >
          Anterior
        </Button>
        <Button onClick={onNext}>
          Siguiente
        </Button>
      </div>
    </div>
  );
}
EOF

# Review Step
cat > components/reservation/customer/steps/review-step.tsx << 'EOF'
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatCurrency, formatDate } from '@/lib/utils';
import { api } from '@/lib/api';

interface ReviewStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export function ReviewStep({ data, onPrevious, canGoPrevious }: ReviewStepProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const calculateTotal = () => {
    let total = 0;
    
    if (data.package) {
      total += data.package.price;
    }
    
    if (data.extras) {
      total += data.extras.reduce((sum: number, extra: any) => 
        sum + (extra.price * extra.quantity), 0
      );
    }
    
    return total;
  };

  const handleSubmitReservation = async () => {
    setLoading(true);
    
    try {
      const reservationData = {
        packageId: data.package?.id,
        date: data.datetime?.date,
        time: data.datetime?.time,
        celebrantName: data.celebrant?.name,
        celebrantAge: parseInt(data.celebrant?.age),
        guestCount: parseInt(data.celebrant?.guestCount),
        customerName: data.celebrant?.customerName,
        customerPhone: data.celebrant?.customerPhone,
        customerEmail: data.celebrant?.customerEmail,
        themeId: data.theme?.id,
        extras: data.extras || [],
        totalAmount: calculateTotal(),
      };

      await api.post('/reservas', reservationData);
      setSuccess(true);
    } catch (error) {
      console.error('Error creating reservation:', error);
      alert('Error al crear la reserva. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✓</span>
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            ¡Reserva Creada Exitosamente!
          </h2>
          <p className="text-gray-600">
            Hemos recibido tu solicitud de reserva. Nos pondremos en contacto contigo 
            pronto para confirmar los detalles y coordinar el pago.
          </p>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-green-700">
            <strong>¿Qué sigue?</strong><br />
            1. Recibirás un email de confirmación<br />
            2. Te contactaremos en las próximas 24 horas<br />
            3. Coordinaremos los detalles finales y el pago
          </p>
        </div>

        <Button onClick={() => window.location.href = '/'}>
          Volver al Inicio
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Resumen de tu Reserva</h2>
        <p className="text-gray-600">
          Revisa todos los detalles antes de confirmar tu reserva:
        </p>
      </div>

      {/* Package details */}
      <Card>
        <CardHeader>
          <CardTitle>Paquete Seleccionado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{data.package?.name}</h3>
              <p className="text-sm text-gray-600">{data.package?.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                {data.package?.duration}h • {data.package?.capacity} personas
              </p>
            </div>
            <span className="text-xl font-bold">{formatCurrency(data.package?.price)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Event details */}
      <Card>
        <CardHeader>
          <CardTitle>Detalles del Evento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium text-gray-500">Fecha:</span>
              <p>{formatDate(data.datetime?.date)}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Hora:</span>
              <p>{data.datetime?.time}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Festejado:</span>
              <p>{data.celebrant?.name}, {data.celebrant?.age} años</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Invitados:</span>
              <p>{data.celebrant?.guestCount} personas</p>
            </div>
          </div>
          
          {data.theme && (
            <div>
              <span className="text-sm font-medium text-gray-500">Temática:</span>
              <p>{data.theme.name}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contact details */}
      <Card>
        <CardHeader>
          <CardTitle>Datos de Contacto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><strong>Nombre:</strong> {data.celebrant?.customerName}</p>
            <p><strong>Teléfono:</strong> {data.celebrant?.customerPhone}</p>
            <p><strong>Email:</strong> {data.celebrant?.customerEmail}</p>
          </div>
        </CardContent>
      </Card>

      {/* Extras */}
      {data.extras && data.extras.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Extras</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.extras.map((extra: any, index: number) => (
                <div key={index} className="flex justify-between">
                  <span>{extra.name} x{extra.quantity}</span>
                  <span>{formatCurrency(extra.price * extra.quantity)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Total */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center text-2xl font-bold">
            <span>Total:</span>
            <span className="text-blue-600">{formatCurrency(calculateTotal())}</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            * El pago se coordinará directamente con nuestro equipo
          </p>
        </CardContent>
      </Card>

      {/* Navigation buttons */}
      <div className="flex justify-between pt-6">
        <Button 
          variant="outline" 
          onClick={onPrevious} 
          disabled={!canGoPrevious || loading}
        >
          Anterior
        </Button>
        <Button 
          onClick={handleSubmitReservation}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700"
        >
          {loading ? 'Creando Reserva...' : 'Confirmar Reserva'}
        </Button>
      </div>
    </div>
  );
}
EOF

# Index for customer steps
cat > components/reservation/customer/steps/index.ts << 'EOF'
export * from './package-step';
export * from './datetime-step';
export * from './celebrant-step';
export * from './theme-step';
export * from './extras-step';
export * from './food-options-step';
export * from './review-step';
EOF

# Index for customer components
cat > components/reservation/customer/index.ts << 'EOF'
export * from './stepper-reservation';
export * from './step-indicator';
export * from './summary-sidebar';
export * from './steps';
EOF

# ============================================================================
# RESERVATION COMPONENTS - Admin/Dashboard
# ============================================================================
echo "🎯 Creando componentes de reservas (Admin)..."

cat > components/reservation/admin/reservation-table.tsx << 'EOF'
'use client';

import { useState, useEffect } from 'react';
import { Reservation } from '@/types/reservation';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { api } from '@/lib/api';

interface ReservationTableProps {
  onEdit?: (reservation: Reservation) => void;
  onView?: (reservation: Reservation) => void;
}

export function ReservationTable({ onEdit, onView }: ReservationTableProps) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await api.get('/reservas');
      setReservations(response.data.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      case 'completed': return 'default';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmada';
      case 'pending': return 'Pendiente';
      case 'cancelled': return 'Cancelada';
      case 'completed': return 'Completada';
      default: return status;
    }
  };

  if (loading) {
    return <div>Cargando reservas...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cliente</TableHead>
          <TableHead>Festejado</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Paquete</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservations.map((reservation) => (
          <TableRow key={reservation.id}>
            <TableCell>
              <div>
                <div className="font-medium">{reservation.customer?.name || 'N/A'}</div>
                <div className="text-sm text-gray-500">{reservation.customer?.email}</div>
              </div>
            </TableCell>
            <TableCell>
              <div>
                <div className="font-medium">{reservation.celebrantName}</div>
                <div className="text-sm text-gray-500">
                  {reservation.celebrantAge} años • {reservation.guestCount} invitados
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div>
                <div>{formatDate(reservation.date)}</div>
                <div className="text-sm text-gray-500">{reservation.time}</div>
              </div>
            </TableCell>
            <TableCell>
              <div className="font-medium">{reservation.package?.name || 'N/A'}</div>
            </TableCell>
            <TableCell>{formatCurrency(reservation.totalAmount)}</TableCell>
            <TableCell>
              <Badge variant={getStatusVariant(reservation.status)}>
                {getStatusLabel(reservation.status)}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                {onView && (
                  <Button variant="outline" size="sm" onClick={() => onView(reservation)}>
                    Ver
                  </Button>
                )}
                {onEdit && (
                  <Button variant="outline" size="sm" onClick={() => onEdit(reservation)}>
                    Editar
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
EOF

cat > components/reservation/admin/reservation-form.tsx << 'EOF'
'use client';

import { useState } from 'react';
import { Reservation } from '@/types/reservation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';

interface ReservationFormProps {
  reservation?: Reservation;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ReservationForm({ reservation, onSuccess, onCancel }: ReservationFormProps) {
  const [formData, setFormData] = useState({
    status: reservation?.status || 'pending',
    notes: reservation?.notes || '',
    deposit: reservation?.deposit || 0,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservation) return;
    
    setLoading(true);
    
    try {
      await api.put(`/reservas/${reservation.id}`, formData);
      onSuccess?.();
    } catch (error) {
      console.error('Error updating reservation:', error);
      alert('Error al actualizar la reserva');
    } finally {
      setLoading(false);
    }
  };

  if (!reservation) {
    return <div>No se encontró la reserva</div>;
  }

  return (
    <div className="space-y-6">
      {/* Información básica de la reserva */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Información de la Reserva</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Cliente:</span>
            <p className="font-medium">{reservation.customer?.name}</p>
          </div>
          <div>
            <span className="text-gray-500">Festejado:</span>
            <p className="font-medium">{reservation.celebrantName}, {reservation.celebrantAge} años</p>
          </div>
          <div>
            <span className="text-gray-500">Fecha:</span>
            <p className="font-medium">{reservation.date} a las {reservation.time}</p>
          </div>
          <div>
            <span className="text-gray-500">Invitados:</span>
            <p className="font-medium">{reservation.guestCount} personas</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Estado */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado de la reserva
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm"
            disabled={loading}
          >
            <option value="pending">Pendiente</option>
            <option value="confirmed">Confirmada</option>
            <option value="cancelled">Cancelada</option>
            <option value="completed">Completada</option>
          </select>
        </div>

        {/* Depósito */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Depósito recibido
          </label>
          <Input
            name="deposit"
            type="number"
            value={formData.deposit}
            onChange={handleChange}
            min={0}
            max={reservation.totalAmount}
            step={0.01}
            disabled={loading}
          />
          <p className="text-sm text-gray-500 mt-1">
            Monto restante: ${(reservation.totalAmount - formData.deposit).toFixed(2)}
          </p>
        </div>

        {/* Notas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notas adicionales
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Notas sobre la reserva, requerimientos especiales, etc."
            disabled={loading}
          />
        </div>

        {/* Botones */}
        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
EOF

cat > components/reservation/admin/index.ts << 'EOF'
export * from './reservation-table';
export * from './reservation-form';
EOF

# ============================================================================
# RESERVATION SHARED COMPONENTS
# ============================================================================
cat > components/reservation/shared/reservation-status.tsx << 'EOF'
'use client';

import { Badge } from '@/components/ui/badge';

interface ReservationStatusProps {
  status: string;
  size?: 'sm' | 'default';
}

export function ReservationStatus({ status, size = 'default' }: ReservationStatusProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'confirmed':
        return { variant: 'success' as const, label: 'Confirmada' };
      case 'pending':
        return { variant: 'warning' as const, label: 'Pendiente' };
      case 'cancelled':
        return { variant: 'error' as const, label: 'Cancelada' };
      case 'completed':
        return { variant: 'default' as const, label: 'Completada' };
      default:
        return { variant: 'default' as const, label: status };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
}
EOF

cat > components/reservation/shared/index.ts << 'EOF'
export * from './reservation-status';
EOF

# Index principal de reservation
cat > components/reservation/index.ts << 'EOF'
export * from './customer';
export * from './admin';
export * from './shared';
EOF

# ============================================================================
# CATALOG COMPONENTS - Temas, Extras, Alimentos
# ============================================================================
echo "📦 Creando componentes de catálogo completos..."

# Theme components
cat > components/catalog/theme-table.tsx << 'EOF'
'use client';

import { useState, useEffect } from 'react';
import { Theme } from '@/types/catalog';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';

interface ThemeTableProps {
  onEdit?: (theme: Theme) => void;
  onDelete?: (id: string) => void;
}

export function ThemeTable({ onEdit, onDelete }: ThemeTableProps) {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchThemes();
  }, []);

  const fetchThemes = async () => {
    try {
      const response = await api.get('/catalogo/tematicas');
      setThemes(response.data.data);
    } catch (error) {
      console.error('Error fetching themes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Cargando temáticas...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead>Colores</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {themes.map((theme) => (
          <TableRow key={theme.id}>
            <TableCell className="font-medium">{theme.name}</TableCell>
            <TableCell>{theme.description}</TableCell>
            <TableCell>
              <div className="flex gap-1">
                {theme.colors?.slice(0, 3).map((color, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full border-2 border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                ))}
                {theme.colors && theme.colors.length > 3 && (
                  <span className="text-xs text-gray-500 ml-1">+{theme.colors.length - 3}</span>
                )}
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={theme.isActive ? 'success' : 'error'}>
                {theme.isActive ? 'Activo' : 'Inactivo'}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                {onEdit && (
                  <Button variant="outline" size="sm" onClick={() => onEdit(theme)}>
                    Editar
                  </Button>
                )}
                {onDelete && (
                  <Button variant="destructive" size="sm" onClick={() => onDelete(theme.id)}>
                    Eliminar
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
EOF

cat > components/catalog/theme-form.tsx << 'EOF'
'use client';

import { useState } from 'react';
import { Theme } from '@/types/catalog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { api } from '@/lib/api';

interface ThemeFormProps {
  theme?: Theme;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ThemeForm({ theme: editTheme, onSuccess, onCancel }: ThemeFormProps) {
  const [formData, setFormData] = useState({
    name: editTheme?.name || '',
    description: editTheme?.description || '',
    colors: editTheme?.colors?.join(', ') || '',
    isActive: editTheme?.isActive ?? true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const submitData = {
        ...formData,
        colors: formData.colors.split(',').map(c => c.trim()).filter(c => c),
      };

      if (editTheme) {
        await api.put(`/catalogo/tematicas/${editTheme.id}`, submitData);
      } else {
        await api.post('/catalogo/tematicas', submitData);
      }
      
      onSuccess?.();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al guardar la temática');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre de la temática
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="colors" className="block text-sm font-medium text-gray-700">
          Colores (separados por comas)
        </label>
        <Input
          id="colors"
          name="colors"
          value={formData.colors}
          onChange={handleChange}
          placeholder="Ej: #FF6B6B, #4ECDC4, #45B7D1"
          disabled={loading}
        />
        <p className="text-xs text-gray-500 mt-1">
          Ingresa códigos de color hexadecimales separados por comas
        </p>
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
            className="rounded border-gray-300"
            disabled={loading}
          />
          <span className="ml-2 text-sm text-gray-700">Temática activa</span>
        </label>
      </div>

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : editTheme ? 'Actualizar' : 'Crear'} Temática
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}
EOF

# Extra components
cat > components/catalog/extra-table.tsx << 'EOF'
'use client';

import { useState, useEffect } from 'react';
import { Extra } from '@/types/catalog';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { api } from '@/lib/api';

interface ExtraTableProps {
  onEdit?: (extra: Extra) => void;
  onDelete?: (id: string) => void;
}

export function ExtraTable({ onEdit, onDelete }: ExtraTableProps) {
  const [extras, setExtras] = useState<Extra[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExtras();
  }, []);

  const fetchExtras = async () => {
    try {
      const response = await api.get('/catalogo/extras');
      setExtras(response.data.data);
    } catch (error) {
      console.error('Error fetching extras:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Cargando extras...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {extras.map((extra) => (
          <TableRow key={extra.id}>
            <TableCell>
              <div>
                <div className="font-medium">{extra.name}</div>
                <div className="text-sm text-gray-500">{extra.description}</div>
              </div>
            </TableCell>
            <TableCell>{extra.category}</TableCell>
            <TableCell>{formatCurrency(extra.price)}</TableCell>
            <TableCell>
              <Badge variant={extra.isActive ? 'success' : 'error'}>
                {extra.isActive ? 'Activo' : 'Inactivo'}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                {onEdit && (
                  <Button variant="outline" size="sm" onClick={() => onEdit(extra)}>
                    Editar
                  </Button>
                )}
                {onDelete && (
                  <Button variant="destructive" size="sm" onClick={() => onDelete(extra.id)}>
                    Eliminar
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
EOF

cat > components/catalog/extra-form.tsx << 'EOF'
'use client';

import { useState } from 'react';
import { Extra } from '@/types/catalog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { api } from '@/lib/api';

interface ExtraFormProps {
  extra?: Extra;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ExtraForm({ extra: editExtra, onSuccess, onCancel }: ExtraFormProps) {
  const [formData, setFormData] = useState({
    name: editExtra?.name || '',
    description: editExtra?.description || '',
    price: editExtra?.price || 0,
    category: editExtra?.category || '',
    isActive: editExtra?.isActive ?? true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    'Decoración',
    'Entretenimiento', 
    'Comida',
    'Bebidas',
    'Servicios',
    'Fotografía',
    'Música',
    'Otros'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (editExtra) {
        await api.put(`/catalogo/extras/${editExtra.id}`, formData);
      } else {
        await api.post('/catalogo/extras', formData);
      }
      
      onSuccess?.();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al guardar el extra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre del extra
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
          disabled={loading}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Precio
          </label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            min={0}
            step={0.01}
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Categoría
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
            disabled={loading}
          >
            <option value="">Selecciona una categoría</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
            className="rounded border-gray-300"
            disabled={loading}
          />
          <span className="ml-2 text-sm text-gray-700">Extra activo</span>
        </label>
      </div>

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : editExtra ? 'Actualizar' : 'Crear'} Extra
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}
EOF

# Actualizar index del catálogo
cat > components/catalog/index.ts << 'EOF'
export * from './package-table';
export * from './package-form';
export * from './theme-table';
export * from './theme-form';
export * from './extra-table';
export * from './extra-form';
EOF

# ============================================================================
# HOOKS ESPECÍFICOS DE RESERVAS
# ============================================================================
echo "🎣 Creando hooks específicos de reservas..."

cat > hooks/use-reservation-data.ts << 'EOF'
import { useState } from 'react';
import { Package, Theme, Extra } from '@/types/catalog';

interface ReservationData {
  package: Package | null;
  datetime: {
    date: string;
    time: string;
  } | null;
  celebrant: {
    name: string;
    age: number;
    guestCount: number;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
  } | null;
  theme: Theme | null;
  extras: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  foodOptions: any[];
}

export function useReservationData() {
  const [reservationData, setReservationData] = useState<ReservationData>({
    package: null,
    datetime: null,
    celebrant: null,
    theme: null,
    extras: [],
    foodOptions: [],
  });

  const updateReservationData = (data: Partial<ReservationData>) => {
    setReservationData(prev => ({ ...prev, ...data }));
  };

  const calculateTotal = () => {
    let total = 0;
    
    if (reservationData.package) {
      total += reservationData.package.price;
    }
    
    total += reservationData.extras.reduce((sum, extra) => 
      sum + (extra.price * extra.quantity), 0
    );
    
    return total;
  };

  const resetReservationData = () => {
    setReservationData({
      package: null,
      datetime: null,
      celebrant: null,
      theme: null,
      extras: [],
      foodOptions: [],
    });
  };

  const isStepComplete = (step: string) => {
    switch (step) {
      case 'package':
        return !!reservationData.package;
      case 'datetime':
        return !!reservationData.datetime?.date && !!reservationData.datetime?.time;
      case 'celebrant':
        return !!reservationData.celebrant?.name && 
               !!reservationData.celebrant?.customerName &&
               !!reservationData.celebrant?.customerEmail &&
               !!reservationData.celebrant?.customerPhone;
      case 'theme':
        return true; // Theme is optional
      case 'extras':
        return true; // Extras are optional
      case 'food':
        return true; // Food options handled separately
      default:
        return false;
    }
  };

  return {
    reservationData,
    updateReservationData,
    calculateTotal,
    resetReservationData,
    isStepComplete,
  };
}
EOF

# Actualizar hooks index
cat > hooks/index.ts << 'EOF'
export * from './use-auth';
export * from './use-local-storage';
export * from './use-reservation-data';
EOF

# ============================================================================
# PÁGINAS FALTANTES - RESERVAS
# ============================================================================
echo "📄 Creando páginas de reservas..."

# Página principal de reservas para clientes
mkdir -p app/\(public\)/reservas
cat > app/\(public\)/reservas/page.tsx << 'EOF'
import { StepperReservation } from '@/components/reservation/customer/stepper-reservation';

export default function ReservasPage() {
  return <StepperReservation />;
}
EOF

# Página de reservas en dashboard para admin
mkdir -p app/\(dashboard\)/reservas
cat > app/\(dashboard\)/reservas/page.tsx << 'EOF'
'use client';

import { useState } from 'react';
import { ReservationTable } from '@/components/reservation/admin/reservation-table';
import { ReservationForm } from '@/components/reservation/admin/reservation-form';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Reservation } from '@/types/reservation';

export default function ReservasAdminPage() {
  const [showForm, setShowForm] = useState(false);
  const [viewingReservation, setViewingReservation] = useState<Reservation | null>(null);
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null);

  const handleView = (reservation: Reservation) => {
    setViewingReservation(reservation);
  };

  const handleEdit = (reservation: Reservation) => {
    setEditingReservation(reservation);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingReservation(null);
    setViewingReservation(null);
    // Refresh the table
    window.location.reload();
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Gestión de Reservas</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline">
              Exportar
            </Button>
            <Button variant="outline">
              Filtrar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ReservationTable onView={handleView} onEdit={handleEdit} />
        </CardContent>
      </Card>

      {/* Modal para editar reserva */}
      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingReservation(null);
        }}
        title="Editar Reserva"
        size="lg"
      >
        <ReservationForm
          reservation={editingReservation || undefined}
          onSuccess={handleSuccess}
          onCancel={() => {
            setShowForm(false);
            setEditingReservation(null);
          }}
        />
      </Modal>

      {/* Modal para ver reserva */}
      <Modal
        isOpen={!!viewingReservation}
        onClose={() => setViewingReservation(null)}
        title="Detalles de la Reserva"
        size="lg"
      >
        {viewingReservation && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium">Cliente</h3>
                <p>{viewingReservation.customer?.name}</p>
                <p className="text-sm text-gray-500">{viewingReservation.customer?.email}</p>
              </div>
              <div>
                <h3 className="font-medium">Festejado</h3>
                <p>{viewingReservation.celebrantName}, {viewingReservation.celebrantAge} años</p>
                <p className="text-sm text-gray-500">{viewingReservation.guestCount} invitados</p>
              </div>
              <div>
                <h3 className="font-medium">Fecha y Hora</h3>
                <p>{viewingReservation.date}</p>
                <p className="text-sm text-gray-500">{viewingReservation.time}</p>
              </div>
              <div>
                <h3 className="font-medium">Paquete</h3>
                <p>{viewingReservation.package?.name}</p>
              </div>
            </div>
            
            {viewingReservation.notes && (
              <div>
                <h3 className="font-medium">Notas</h3>
                <p className="text-gray-600">{viewingReservation.notes}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
EOF

# Páginas de subcategorías de catálogo
mkdir -p app/\(dashboard\)/catalogo/tematicas
cat > app/\(dashboard\)/catalogo/tematicas/page.tsx << 'EOF'
'use client';

import { useState } from 'react';
import { ThemeTable } from '@/components/catalog/theme-table';
import { ThemeForm } from '@/components/catalog/theme-form';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Theme } from '@/types/catalog';

export default function TematicasPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingTheme, setEditingTheme] = useState<Theme | null>(null);

  const handleEdit = (theme: Theme) => {
    setEditingTheme(theme);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingTheme(null);
    window.location.reload();
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Gestión de Temáticas</CardTitle>
          <Button onClick={() => setShowForm(true)}>
            Nueva Temática
          </Button>
        </CardHeader>
        <CardContent>
          <ThemeTable onEdit={handleEdit} />
        </CardContent>
      </Card>

      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingTheme(null);
        }}
        title={editingTheme ? 'Editar Temática' : 'Nueva Temática'}
        size="lg"
      >
        <ThemeForm
          theme={editingTheme || undefined}
          onSuccess={handleSuccess}
          onCancel={() => {
            setShowForm(false);
            setEditingTheme(null);
          }}
        />
      </Modal>
    </div>
  );
}
EOF

mkdir -p app/\(dashboard\)/catalogo/extras
cat > app/\(dashboard\)/catalogo/extras/page.tsx << 'EOF'
'use client';

import { useState } from 'react';
import { ExtraTable } from '@/components/catalog/extra-table';
import { ExtraForm } from '@/components/catalog/extra-form';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Extra } from '@/types/catalog';

export default function ExtrasPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingExtra, setEditingExtra] = useState<Extra | null>(null);

  const handleEdit = (extra: Extra) => {
    setEditingExtra(extra);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingExtra(null);
    window.location.reload();
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Gestión de Extras</CardTitle>
          <Button onClick={() => setShowForm(true)}>
            Nuevo Extra
          </Button>
        </CardHeader>
        <CardContent>
          <ExtraTable onEdit={handleEdit} />
        </CardContent>
      </Card>

      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingExtra(null);
        }}
        title={editingExtra ? 'Editar Extra' : 'Nuevo Extra'}
        size="lg"
      >
        <ExtraForm
          extra={editingExtra || undefined}
          onSuccess={handleSuccess}
          onCancel={() => {
            setShowForm(false);
            setEditingExtra(null);
          }}
        />
      </Modal>
    </div>
  );
}
EOF

# ============================================================================
# API ROUTES - Next.js API Routes
# ============================================================================
echo "🔌 Creando API Routes de Next.js..."

mkdir -p app/api/auth/login
cat > app/api/auth/login/route.ts << 'EOF'
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Forward to your NestJS backend
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    
    const response = await fetch(`${backendUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    // Set HTTP-only cookie with the token
    const responseWithCookie = NextResponse.json(data);
    responseWithCookie.cookies.set('auth-token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return responseWithCookie;
  } catch (error) {
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
EOF

mkdir -p app/api/auth/logout
cat > app/api/auth/logout/route.ts << 'EOF'
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logout successful' });
  
  // Clear the auth cookie
  response.cookies.set('auth-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
  });

  return response;
}
EOF

mkdir -p app/api/catalogo/paquetes
cat > app/api/catalogo/paquetes/route.ts << 'EOF'
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${BACKEND_URL}/catalogo/paquetes`, {
      headers: {
        'Authorization': request.headers.get('authorization') || '',
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al obtener paquetes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${BACKEND_URL}/catalogo/paquetes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('authorization') || '',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error al crear paquete' },
      { status: 500 }
    );
  }
}
EOF

# ============================================================================
# STORE - Reservations Store
# ============================================================================
echo "🏪 Agregando stores de reservas..."

cat > store/reservation-store.ts << 'EOF'
import { create } from 'zustand';
import { Reservation } from '@/types/reservation';

interface ReservationStore {
  reservations: Reservation[];
  currentReservation: Reservation | null;
  loading: boolean;
  setReservations: (reservations: Reservation[]) => void;
  setCurrentReservation: (reservation: Reservation | null) => void;
  setLoading: (loading: boolean) => void;
  addReservation: (reservation: Reservation) => void;
  updateReservation: (id: string, reservation: Partial<Reservation>) => void;
  removeReservation: (id: string) => void;
}

export const useReservationStore = create<ReservationStore>((set) => ({
  reservations: [],
  currentReservation: null,
  loading: false,
  setReservations: (reservations) => set({ reservations }),
  setCurrentReservation: (reservation) => set({ currentReservation: reservation }),
  setLoading: (loading) => set({ loading }),
  addReservation: (reservation) => set((state) => ({ 
    reservations: [...state.reservations, reservation] 
  })),
  updateReservation: (id, updatedReservation) => set((state) => ({
    reservations: state.reservations.map(res => 
      res.id === id ? { ...res, ...updatedReservation } : res
    )
  })),
  removeReservation: (id) => set((state) => ({
    reservations: state.reservations.filter(res => res.id !== id)
  })),
}));
EOF

# Actualizar store index
cat > store/index.ts << 'EOF'
export * from './auth-store';
export * from './catalog-store';
export * from './reservation-store';
EOF

# ============================================================================
# CUSTOMER PORTAL - Área del cliente
# ============================================================================
echo "👤 Creando portal del cliente..."

mkdir -p app/\(customer\)
cat > app/\(customer\)/layout.tsx << 'EOF'
export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold">Portal del Cliente</h1>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
EOF

mkdir -p app/\(customer\)/mis-reservas
cat > app/\(customer\)/mis-reservas/page.tsx << 'EOF'
'use client';

import { useState, useEffect } from 'react';
import { Reservation } from '@/types/reservation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ReservationStatus } from '@/components/reservation/shared/reservation-status';
import { formatCurrency, formatDate } from '@/lib/utils';
import { api } from '@/lib/api';

export default function MisReservasPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyReservations();
  }, []);

  const fetchMyReservations = async () => {
    try {
      const response = await api.get('/reservas/mis-reservas');
      setReservations(response.data.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Cargando tus reservas...</div>;
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Mis Reservas</h1>
        
        {reservations.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500 mb-4">No tienes reservas aún</p>
              <a 
                href="/reservas" 
                className="text-blue-600 hover:underline"
              >
                Crear mi primera reserva
              </a>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {reservations.map((reservation) => (
              <Card key={reservation.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">
                    Fiesta de {reservation.celebrantName}
                  </CardTitle>
                  <ReservationStatus status={reservation.status} />
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Fecha y hora</p>
                      <p className="font-medium">
                        {formatDate(reservation.date)} - {reservation.time}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Paquete</p>
                      <p className="font-medium">{reservation.package?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="font-medium">{formatCurrency(reservation.totalAmount)}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">
                          {reservation.guestCount} invitados • {reservation.celebrantAge} años
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:underline text-sm">
                          Ver detalles
                        </button>
                        {reservation.status === 'pending' && (
                          <button className="text-red-600 hover:underline text-sm">
                            Cancelar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
EOF

cat > components/catalog/package-table.tsx << 'EOF'
'use client';

import { useState, useEffect } from 'react';
import { Package } from '@/types/catalog';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { api } from '@/lib/api';

interface PackageTableProps {
  onEdit?: (pkg: Package) => void;
  onDelete?: (id: string) => void;
}

export function PackageTable({ onEdit, onDelete }: PackageTableProps) {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await api.get('/catalogo/paquetes');
      setPackages(response.data.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Cargando paquetes...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Duración</TableHead>
          <TableHead>Capacidad</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {packages.map((pkg) => (
          <TableRow key={pkg.id}>
            <TableCell>
              <div>
                <div className="font-medium">{pkg.name}</div>
                <div className="text-sm text-gray-500">{pkg.description}</div>
              </div>
            </TableCell>
            <TableCell>{formatCurrency(pkg.price)}</TableCell>
            <TableCell>{pkg.duration}h</TableCell>
            <TableCell>{pkg.capacity} personas</TableCell>
            <TableCell>
              <Badge variant={pkg.isActive ? 'success' : 'error'}>
                {pkg.isActive ? 'Activo' : 'Inactivo'}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                {onEdit && (
                  <Button variant="outline" size="sm" onClick={() => onEdit(pkg)}>
                    Editar
                  </Button>
                )}
                {onDelete && (
                  <Button variant="destructive" size="sm" onClick={() => onDelete(pkg.id)}>
                    Eliminar
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
EOF

cat > components/catalog/package-form.tsx << 'EOF'
'use client';

import { useState } from 'react';
import { Package } from '@/types/catalog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { api } from '@/lib/api';

interface PackageFormProps {
  package?: Package;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function PackageForm({ package: editPackage, onSuccess, onCancel }: PackageFormProps) {
  const [formData, setFormData] = useState({
    name: editPackage?.name || '',
    description: editPackage?.description || '',
    price: editPackage?.price || 0,
    duration: editPackage?.duration || 0,
    capacity: editPackage?.capacity || 0,
    isActive: editPackage?.isActive ?? true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (editPackage) {
        await api.put(`/catalogo/paquetes/${editPackage.id}`, formData);
      } else {
        await api.post('/catalogo/paquetes', formData);
      }
      
      onSuccess?.();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al guardar el paquete');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre del paquete
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
          disabled={loading}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Precio
          </label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            min={0}
            step={0.01}
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Duración (horas)
          </label>
          <Input
            id="duration"
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleChange}
            min={1}
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
            Capacidad (personas)
          </label>
          <Input
            id="capacity"
            name="capacity"
            type="number"
            value={formData.capacity}
            onChange={handleChange}
            min={1}
            required
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
            className="rounded border-gray-300"
            disabled={loading}
          />
          <span className="ml-2 text-sm text-gray-700">Paquete activo</span>
        </label>
      </div>

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : editPackage ? 'Actualizar' : 'Crear'} Paquete
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}
EOF

cat > components/catalog/index.ts << 'EOF'
export * from './package-table';
export * from './package-form';
EOF

# ============================================================================
# PÁGINAS FALTANTES
# ============================================================================
echo "📄 Creando páginas faltantes..."

# Register page
mkdir -p app/\(auth\)/register
cat > app/\(auth\)/register/page.tsx << 'EOF'
import { RegisterForm } from '@/components/auth/register-form';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Crear Cuenta</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
          <div className="mt-4 text-center text-sm">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Iniciar sesión
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
EOF

# Catalog page
mkdir -p app/\(dashboard\)/catalogo
cat > app/\(dashboard\)/catalogo/page.tsx << 'EOF'
'use client';

import { useState } from 'react';
import { PackageTable } from '@/components/catalog/package-table';
import { PackageForm } from '@/components/catalog/package-form';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Package } from '@/types/catalog';

export default function CatalogoPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingPackage(null);
    // Refresh the table
    window.location.reload();
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Catálogo de Paquetes</CardTitle>
          <Button onClick={() => setShowForm(true)}>
            Nuevo Paquete
          </Button>
        </CardHeader>
        <CardContent>
          <PackageTable onEdit={handleEdit} />
        </CardContent>
      </Card>

      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingPackage(null);
        }}
        title={editingPackage ? 'Editar Paquete' : 'Nuevo Paquete'}
        size="lg"
      >
        <PackageForm
          package={editingPackage || undefined}
          onSuccess={handleSuccess}
          onCancel={() => {
            setShowForm(false);
            setEditingPackage(null);
          }}
        />
      </Modal>
    </div>
  );
}
EOF

# Actualizar login page
cat > app/\(auth\)/login/page.tsx << 'EOF'
import { LoginForm } from '@/components/auth/login-form';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Iniciar Sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className="mt-4 text-center text-sm">
            ¿No tienes cuenta?{' '}
            <Link href="/register" className="text-blue-600 hover:underline">
              Crear cuenta
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
EOF

# Package.json dependencies
echo "📦 Agregando dependencias necesarias..."
cat >> package.json << 'EOF'

# Instalar dependencias adicionales requeridas:
# npm install zustand zod axios clsx tailwind-merge
# npm install -D @types/node
EOF

echo ""
echo "✅ ¡Script completado exitosamente!"
echo ""
echo "📋 Siguientes pasos:"
echo "1. Ejecuta: npm install zustand zod axios clsx tailwind-merge"
echo "2. Ejecuta: npm install -D @types/node"
echo "3. Configura las variables de entorno en .env.local"
echo "4. Ajusta las URLs del API en lib/constants.ts"
echo "5. Personaliza los componentes según tus necesidades"
echo ""
echo "🚀 Tu estructura está lista para empezar a desarrollar!"
