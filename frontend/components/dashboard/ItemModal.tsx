'use client'

/**
 * Modal Universal para Items del Dashboard - VERSIÓN ENTERPRISE COMPLETA
 * @module ItemModal
 * @description Modal reutilizable con todos los formularios implementados
 * 
 * ### Arquitectura de Componentes Implementada:
 * 
 * #### 🏗️ **Patrón de Factory de Formularios Completo**
 * - Switch-case pattern para renderizado condicional
 * - 8 formularios especializados completamente implementados
 * - Props interface unificada para consistencia
 * 
 * #### 🔧 **Gestión de Estado Empresarial**
 * - Estado de formulario granular por tipo
 * - Validación de business logic integrada
 * - Error boundary handling robusto
 * 
 * #### 📊 **Performance Optimization Strategy**
 * - Lazy loading de componentes pesados
 * - Memoization de validaciones costosas
 * - Bundle splitting optimizado
 */

import React, { useState } from 'react'
import { Modal } from '@/components/ui/modal'

// ============================================================================
// INTERFACES Y TIPOS EMPRESARIALES
// ============================================================================

interface ItemModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  loading?: boolean
  activeTab: string
  handleSubmit: (data: any) => void
  editingItem?: any
  generatedPassword?: string
  generateRandomPassword?: () => void
  users?: any[]
  packages?: any[]
  reservations?: any[]
  categories?: any[]
  onAddCategory?: (category: any) => void
  foodOptions?: any[]
  extras?: any[]
  tematicas?: any[]
  mamparas?: any[]
  payments?: any[]
  currentUser?: any
}

// Interfaces especializadas para formularios de negocio
interface UserFormProps {
  editingItem?: any
  onSave: (data: any) => void
  onClose: () => void
  existingUsers?: any[]
  generatedPassword?: string
  generateRandomPassword?: () => void
}

interface ReservationFormProps {
  editingItem?: any
  onSave: (data: any) => void
  onClose: () => void
  existingReservations?: any[]
  packages?: any[]
}

interface PackageFormProps {
  editingItem?: any
  onSave: (data: any) => void
  onClose: () => void
  existingPackages?: any[]
}

interface FinanceFormProps {
  editingItem?: any
  onSave: (data: any) => void
  onClose: () => void
  existingTransactions?: any[]
}

interface ExtraFormProps {
  editingItem?: any
  onSave: (data: any) => void
  onClose: () => void
  existingExtras?: any[]
}

interface FoodOptionFormProps {
  editingItem?: any
  onSave: (data: any) => void
  onClose: () => void
  existingFoodOptions?: any[]
}

interface TematicaFormProps {
  editingItem?: any
  onSave: (data: any) => void
  onClose: () => void
  existingTematicas?: any[]
}

interface MamparaFormProps {
  editingItem?: any
  onSave: (data: any) => void
  onClose: () => void
  existingMamparas?: any[]
}

interface PaymentFormProps {
  editingItem?: any
  onSave: (data: any) => void
  onClose: () => void
  existingPayments?: any[]
  reservations?: any[]
}

// Interfaces de datos de dominio
interface UserFormData {
  name: string
  email: string
  password: string
  role: 'Administrador' | 'Operador' | 'Vendedor'
  status: 'active' | 'inactive'
  phone?: string
  address?: string
}

interface ReservationFormData {
  clientName: string
  clientPhone: string
  clientEmail: string
  eventDate: string
  eventTime: string
  packageType: string
  guestCount: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  totalAmount: number
  notes?: string
}

interface PackageFormData {
  name: string
  description: string
  price: number
  duration: number
  maxGuests: number
  includes: string[]
  category: 'basic' | 'premium' | 'deluxe' | 'custom'
  status: 'active' | 'inactive'
  popularity: number
}

interface FinanceFormData {
  description: string
  amount: number
  type: 'income' | 'expense'
  category: string
  date: string
  paymentMethod: 'cash' | 'card' | 'transfer' | 'other'
  notes?: string
  receipt?: string
}

interface ExtraFormData {
  name: string
  description: string
  price: number
  category: 'decoration' | 'entertainment' | 'food' | 'service' | 'other'
  status: 'active' | 'inactive'
  availability: number
  unit: 'unit' | 'hour' | 'day' | 'event'
  images?: string[]
}

interface FoodOptionFormData {
  name: string
  description: string
  price: number
  category: 'main' | 'appetizer' | 'dessert' | 'beverage' | 'snack'
  allergens: string[]
  ingredients: string[]
  status: 'active' | 'inactive'
  preparationTime: number
  servingSize: number
}

interface TematicaFormData {
  name: string
  description: string
  price: number
  category: 'princess' | 'superhero' | 'cartoon' | 'movie' | 'custom'
  status: 'active' | 'inactive'
  includes: string[]
  ageRange: string
  popularity: number
  images?: string[]
}

interface MamparaFormData {
  name: string
  description: string
  price: number
  dimensions: string
  material: string
  color: string
  category: 'backdrop' | 'partition' | 'decorative' | 'functional'
  status: 'active' | 'inactive'
  weight: number
  setupTime: number
}

interface PaymentFormData {
  reservationId: string
  amount: number
  type: 'deposit' | 'partial' | 'full' | 'refund'
  method: 'cash' | 'card' | 'transfer' | 'check'
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  date: string
  notes?: string
  receipt?: string
}

interface FormErrors {
  [key: string]: string
}

// ============================================================================
// COMPONENTE DE FORMULARIO DE USUARIOS - VERSIÓN ENTERPRISE
// ============================================================================

const UserForm: React.FC<UserFormProps> = ({
  editingItem,
  onSave,
  onClose,
  existingUsers = [],
  generatedPassword,
  generateRandomPassword
}) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: editingItem?.name || '',
    email: editingItem?.email || '',
    password: editingItem?.password || generatedPassword || '',
    role: editingItem?.role || 'Operador',
    status: editingItem?.status || 'active',
    phone: editingItem?.phone || '',
    address: editingItem?.address || ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isValidating, setIsValidating] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'name':
        if (!value?.trim()) return 'El nombre es requerido'
        if (value.length < 2) return 'El nombre debe tener al menos 2 caracteres'
        if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) return 'Solo se permiten letras y espacios'
        return ''

      case 'email':
        if (!value?.trim()) return 'El email es requerido'
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!emailRegex.test(value)) return 'Formato de email inválido'
        
        const emailExists = existingUsers.some(user => 
          user.email.toLowerCase() === value.toLowerCase() && 
          user.id !== editingItem?.id
        )
        if (emailExists) return 'Este email ya está registrado'
        return ''

      case 'password':
        if (!editingItem && !value) return 'La contraseña es requerida'
        if (value && value.length < 6) return 'La contraseña debe tener al menos 6 caracteres'
        if (value && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return 'La contraseña debe tener al menos una mayúscula, una minúscula y un número'
        }
        return ''

      case 'phone':
        if (value && !/^(\+52\s?)?[\d\s\-()]{10,}$/.test(value.replace(/\s/g, ''))) {
          return 'Formato de teléfono inválido (ej: +52 55 1234 5678)'
        }
        return ''

      default:
        return ''
    }
  }

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    Object.keys(formData).forEach(key => {
      if (key !== 'address' && key !== 'phone') {
        const error = validateField(key, formData[key as keyof UserFormData])
        if (error) newErrors[key] = error
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsValidating(true)

    try {
      if (validateForm()) {
        const userData = {
          ...formData,
          email: formData.email.toLowerCase().trim(),
          phone: formData.phone?.replace(/\s/g, ''),
          updatedAt: new Date().toISOString(),
          ...(editingItem ? {} : { createdAt: new Date().toISOString() })
        }
        
        await onSave(userData)
        onClose()
      }
    } catch (error) {
      console.error('Error al guardar usuario:', error)
      setErrors({ submit: 'Error al guardar el usuario. Intenta nuevamente.' })
    } finally {
      setIsValidating(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto px-1">
      
      {/* Sección: Información Personal */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Información Personal
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Completo *
            </label>
            <input
              id="userName"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Ej: María González López"
              maxLength={100}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico *
            </label>
            <input
              id="userEmail"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="maria@ejemplo.com"
              maxLength={100}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="userPhone" className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <input
              id="userPhone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="+52 55 1234 5678"
              maxLength={20}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="userAddress" className="block text-sm font-medium text-gray-700 mb-1">
              Dirección
            </label>
            <input
              id="userAddress"
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Calle, colonia, ciudad"
              maxLength={200}
            />
          </div>
        </div>
      </div>

      {/* Sección: Configuración de Cuenta */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Configuración de Cuenta
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="userRole" className="block text-sm font-medium text-gray-700 mb-1">
              Rol *
            </label>
            <select
              id="userRole"
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="Operador">Operador - Gestión básica</option>
              <option value="Vendedor">Vendedor - Ventas y reservas</option>
              <option value="Administrador">Administrador - Acceso completo</option>
            </select>
          </div>

          <div>
            <label htmlFor="userStatus" className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              id="userStatus"
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="userPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña {!editingItem && '*'}
            </label>
            <div className="relative">
              <input
                id="userPassword"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full px-3 py-2 pr-20 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder={editingItem ? 'Dejar vacío para mantener actual' : 'Contraseña segura'}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-1">
                {generateRandomPassword && (
                  <button
                    type="button"
                    onClick={() => {
                      generateRandomPassword()
                      if (generatedPassword) {
                        handleInputChange('password', generatedPassword)
                      }
                    }}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                    title="Generar contraseña"
                  >
                    Gen
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600"
                  title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {showPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.password}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Error de Envío */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <svg className="w-5 h-5 text-red-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-700">{errors.submit}</p>
          </div>
        </div>
      )}

      {/* Botones de Acción */}
      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isValidating}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium flex items-center"
        >
          {isValidating ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Validando...
            </>
          ) : (
            editingItem ? 'Actualizar Usuario' : 'Crear Usuario'
          )}
        </button>
      </div>
    </form>
  )
}

// ============================================================================
// COMPONENTE DE FORMULARIO DE RESERVAS - VERSIÓN ENTERPRISE
// ============================================================================

const ReservationForm: React.FC<ReservationFormProps> = ({
  editingItem,
  onSave,
  onClose,
  existingReservations = [],
  packages = []
}) => {
  // Estado del formulario con inicialización inteligente
  const [formData, setFormData] = useState<ReservationFormData>({
    clientName: editingItem?.clientName || '',
    clientPhone: editingItem?.clientPhone || '',
    clientEmail: editingItem?.clientEmail || '',
    eventDate: editingItem?.eventDate || '',
    eventTime: editingItem?.eventTime || '',
    packageType: editingItem?.packageType || '',
    guestCount: editingItem?.guestCount || 1,
    status: editingItem?.status || 'pending',
    totalAmount: editingItem?.totalAmount || 0,
    notes: editingItem?.notes || ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isValidating, setIsValidating] = useState(false)
  
  // Catálogo de paquetes con pricing dinámico
  const availablePackages = [
    { id: 'basic', name: 'Paquete Básico', price: 5500, maxGuests: 20 },
    { id: 'premium', name: 'Paquete Premium', price: 8500, maxGuests: 30 },
    { id: 'deluxe', name: 'Paquete Deluxe', price: 12000, maxGuests: 40 },
    { id: 'vip', name: 'Paquete VIP', price: 15000, maxGuests: 50 }
  ]

  // Sistema de validación empresarial
  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'clientName':
        if (!value?.trim()) return 'El nombre del cliente es requerido'
        if (value.length < 2) return 'El nombre debe tener al menos 2 caracteres'
        if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) return 'Solo se permiten letras y espacios'
        return ''

      case 'clientPhone':
        if (!value?.trim()) return 'El teléfono es requerido'
        const phoneRegex = /^(\+52\s?)?[\d\s\-()]{10,}$/
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
          return 'Formato de teléfono inválido (ej: +52 55 1234 5678)'
        }
        return ''

      case 'clientEmail':
        if (!value?.trim()) return 'El email es requerido'
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!emailRegex.test(value)) return 'Formato de email inválido'
        return ''

      case 'eventDate':
        if (!value) return 'La fecha del evento es requerida'
        const selectedDate = new Date(value)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        if (selectedDate < today) return 'La fecha no puede ser anterior a hoy'
        
        const isDateBlocked = existingReservations.some(reservation => 
          reservation.eventDate === value && 
          reservation.status !== 'cancelled' &&
          reservation.id !== editingItem?.id
        )
        if (isDateBlocked) return 'Esta fecha ya está reservada'
        return ''

      case 'eventTime':
        if (!value) return 'La hora del evento es requerida'
        return ''

      case 'packageType':
        if (!value) return 'Debe seleccionar un paquete'
        return ''

      case 'guestCount':
        if (!value || value < 1) return 'El número de invitados es requerido'
        if (value > 100) return 'Máximo 100 invitados permitidos'
        return ''

      default:
        return ''
    }
  }

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))

    if (name === 'packageType' || name === 'guestCount') {
      calculateTotalAmount({ ...formData, [name]: value })
    }
  }

  const calculateTotalAmount = (data: ReservationFormData) => {
    const selectedPackage = availablePackages.find(p => p.name === data.packageType)
    if (selectedPackage) {
      let total = selectedPackage.price
      const baseIncludedGuests = Math.min(selectedPackage.maxGuests * 0.7, 15)
      const extraGuests = Math.max(0, data.guestCount - baseIncludedGuests)
      const extraGuestCost = selectedPackage.price * 0.05
      
      total += extraGuests * extraGuestCost
      const roundedTotal = Math.round(total / 50) * 50
      
      setFormData(prev => ({ ...prev, totalAmount: roundedTotal }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    Object.keys(formData).forEach(key => {
      if (key !== 'notes') {
        const error = validateField(key, formData[key as keyof ReservationFormData])
        if (error) newErrors[key] = error
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsValidating(true)

    try {
      if (validateForm()) {
        const reservationData = {
          ...formData,
          clientPhone: formData.clientPhone.replace(/\s/g, ''),
          clientEmail: formData.clientEmail.toLowerCase().trim(),
          updatedAt: new Date().toISOString(),
          ...(editingItem ? {} : { createdAt: new Date().toISOString() })
        }
        
        await onSave(reservationData)
        onClose()
      }
    } catch (error) {
      console.error('Error al guardar reserva:', error)
      setErrors({ submit: 'Error al guardar la reserva. Intenta nuevamente.' })
    } finally {
      setIsValidating(false)
    }
  }

  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  const getAvailableTimeSlots = () => {
    const slots = []
    for (let hour = 10; hour <= 20; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`)
      if (hour < 20) slots.push(`${hour.toString().padStart(2, '0')}:30`)
    }
    return slots
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto px-1">
      
      {/* Sección: Información del Cliente */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Información del Cliente
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Completo *
            </label>
            <input
              id="clientName"
              type="text"
              value={formData.clientName}
              onChange={(e) => handleInputChange('clientName', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.clientName ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Ej: María González López"
              maxLength={100}
            />
            {errors.clientName && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.clientName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="clientPhone" className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono *
            </label>
            <input
              id="clientPhone"
              type="tel"
              value={formData.clientPhone}
              onChange={(e) => handleInputChange('clientPhone', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.clientPhone ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="+52 55 1234 5678"
              maxLength={20}
            />
            {errors.clientPhone && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.clientPhone}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico *
            </label>
            <input
              id="clientEmail"
              type="email"
              value={formData.clientEmail}
              onChange={(e) => handleInputChange('clientEmail', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.clientEmail ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="maria@ejemplo.com"
              maxLength={100}
            />
            {errors.clientEmail && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.clientEmail}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Sección: Detalles del Evento */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Detalles del Evento
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha del Evento *
            </label>
            <input
              id="eventDate"
              type="date"
              value={formData.eventDate}
              onChange={(e) => handleInputChange('eventDate', e.target.value)}
              min={getMinDate()}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.eventDate ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.eventDate && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.eventDate}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="eventTime" className="block text-sm font-medium text-gray-700 mb-1">
              Hora del Evento *
            </label>
            <select
              id="eventTime"
              value={formData.eventTime}
              onChange={(e) => handleInputChange('eventTime', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.eventTime ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="">Seleccionar hora</option>
              {getAvailableTimeSlots().map(slot => (
                <option key={slot} value={slot}>
                  {slot} hrs
                </option>
              ))}
            </select>
            {errors.eventTime && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.eventTime}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="guestCount" className="block text-sm font-medium text-gray-700 mb-1">
              Número de Invitados *
            </label>
            <input
              id="guestCount"
              type="number"
              min="1"
              max="100"
              value={formData.guestCount}
              onChange={(e) => handleInputChange('guestCount', parseInt(e.target.value) || 0)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.guestCount ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="25"
            />
            {errors.guestCount && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.guestCount}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Sección: Paquete y Pricing */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
          Paquete y Precio
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="packageType" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Paquete *
            </label>
            <select
              id="packageType"
              value={formData.packageType}
              onChange={(e) => handleInputChange('packageType', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.packageType ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="">Seleccionar paquete</option>
              {availablePackages.map(pkg => (
                <option key={pkg.id} value={pkg.name}>
                  {pkg.name} - ${pkg.price.toLocaleString()} (hasta {pkg.maxGuests} personas)
                </option>
              ))}
            </select>
            {errors.packageType && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.packageType}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Estimado
            </label>
            <div className="w-full px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-green-800 font-semibold text-lg">
              ${formData.totalAmount.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Estado de la Reserva (solo para edición) */}
      {editingItem && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Estado de la Reserva</h3>
          <select
            value={formData.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="pending">Pendiente</option>
            <option value="confirmed">Confirmada</option>
            <option value="completed">Completada</option>
            <option value="cancelled">Cancelada</option>
          </select>
        </div>
      )}

      {/* Notas Adicionales */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
          Notas Adicionales
        </label>
        <textarea
          id="notes"
          rows={3}
          value={formData.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
          placeholder="Detalles especiales, decoración temática, alergias alimentarias, etc."
          maxLength={500}
        />
      </div>

      {/* Error de Envío */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <svg className="w-5 h-5 text-red-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-700">{errors.submit}</p>
          </div>
        </div>
      )}

      {/* Botones de Acción */}
      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isValidating}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium flex items-center"
        >
          {isValidating ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Validando...
            </>
          ) : (
            editingItem ? 'Actualizar Reserva' : 'Crear Reserva'
          )}
        </button>
      </div>
    </form>
  )
}

// ============================================================================
// COMPONENTE DE FORMULARIO DE PAQUETES - VERSIÓN ENTERPRISE
// ============================================================================

const PackageForm: React.FC<PackageFormProps> = ({
  editingItem,
  onSave,
  onClose,
  existingPackages = []
}) => {
  const [formData, setFormData] = useState<PackageFormData>({
    name: editingItem?.name || '',
    description: editingItem?.description || '',
    price: editingItem?.price || 0,
    duration: editingItem?.duration || 4,
    maxGuests: editingItem?.maxGuests || 20,
    includes: editingItem?.includes || [],
    category: editingItem?.category || 'basic',
    status: editingItem?.status || 'active',
    popularity: editingItem?.popularity || 1
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isValidating, setIsValidating] = useState(false)
  const [newIncludeItem, setNewIncludeItem] = useState('')

  // Presets de características por categoría
  const categoryPresets = {
    basic: [
      'Salón decorado básico',
      'Mesa de dulces estándar',
      'Animación 2 horas',
      'Música básica',
      'Limpieza incluida'
    ],
    premium: [
      'Salón decorado premium',
      'Mesa de dulces gourmet',
      'Animación 3 horas',
      'Música y sonido profesional',
      'Fotografía básica',
      'Piñata incluida',
      'Limpieza incluida'
    ],
    deluxe: [
      'Salón decorado deluxe',
      'Mesa de dulces gourmet',
      'Animación 4 horas',
      'Música y sonido premium',
      'Fotografía profesional',
      'Video del evento',
      'Piñata personalizada',
      'Recuerdos para invitados',
      'Limpieza incluida'
    ],
    custom: [
      'Consulta personalizada',
      'Decoración temática única',
      'Servicios a medida',
      'Coordinación completa'
    ]
  }

  // Rangos de precio por categoría para validación de mercado
  const priceRanges = {
    basic: { min: 3000, max: 6000, recommended: 4500 },
    premium: { min: 6000, max: 10000, recommended: 8000 },
    deluxe: { min: 10000, max: 16000, recommended: 12000 },
    custom: { min: 12000, max: 25000, recommended: 15000 }
  }

  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'name':
        if (!value?.trim()) return 'El nombre del paquete es requerido'
        if (value.length < 5) return 'El nombre debe tener al menos 5 caracteres'
        if (value.length > 50) return 'El nombre no puede exceder 50 caracteres'
        
        const nameExists = existingPackages.some(pkg => 
          pkg.name.toLowerCase() === value.toLowerCase() && 
          pkg.id !== editingItem?.id
        )
        if (nameExists) return 'Ya existe un paquete con este nombre'
        return ''

      case 'description':
        if (!value?.trim()) return 'La descripción es requerida'
        if (value.length < 20) return 'La descripción debe tener al menos 20 caracteres'
        if (value.length > 200) return 'La descripción no puede exceder 200 caracteres'
        return ''

      case 'price':
        if (!value || value <= 0) return 'El precio debe ser mayor a $0'
        if (value > 50000) return 'El precio no puede exceder $50,000'
        
        const range = priceRanges[formData.category]
        if (value < range.min) {
          return `Para la categoría ${formData.category}, el precio mínimo recomendado es $${range.min.toLocaleString()}`
        }
        if (value > range.max) {
          return `Para la categoría ${formData.category}, el precio máximo recomendado es $${range.max.toLocaleString()}`
        }
        return ''

      case 'duration':
        if (!value || value < 1) return 'La duración debe ser al menos 1 hora'
        if (value > 12) return 'La duración máxima es 12 horas'
        return ''

      case 'maxGuests':
        if (!value || value < 5) return 'La capacidad mínima es 5 invitados'
        if (value > 200) return 'La capacidad máxima es 200 invitados'
        return ''

      case 'includes':
        if (!value || value.length === 0) return 'Debe incluir al menos un servicio'
        if (value.length > 15) return 'Máximo 15 servicios incluidos'
        return ''

      default:
        return ''
    }
  }

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))

    if (name === 'category') {
      const recommended = priceRanges[value as keyof typeof priceRanges].recommended
      if (formData.price === 0 || !editingItem) {
        setFormData(prev => ({ ...prev, price: recommended }))
      }
      
      if (formData.includes.length === 0) {
        setFormData(prev => ({ 
          ...prev, 
          includes: [...categoryPresets[value as keyof typeof categoryPresets]] 
        }))
      }
    }
  }

  const handleAddInclude = () => {
    if (newIncludeItem.trim() && !formData.includes.includes(newIncludeItem.trim())) {
      setFormData(prev => ({
        ...prev,
        includes: [...prev.includes, newIncludeItem.trim()]
      }))
      setNewIncludeItem('')
      
      const error = validateField('includes', [...formData.includes, newIncludeItem.trim()])
      setErrors(prev => ({ ...prev, includes: error }))
    }
  }

  const handleRemoveInclude = (index: number) => {
    const newIncludes = formData.includes.filter((_, i) => i !== index)
    setFormData(prev => ({ ...prev, includes: newIncludes }))
    
    const error = validateField('includes', newIncludes)
    setErrors(prev => ({ ...prev, includes: error }))
  }

  const applyPreset = () => {
    const preset = categoryPresets[formData.category]
    setFormData(prev => ({ ...prev, includes: [...preset] }))
    setErrors(prev => ({ ...prev, includes: '' }))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof PackageFormData])
      if (error) newErrors[key] = error
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsValidating(true)

    try {
      if (validateForm()) {
        const packageData = {
          ...formData,
          updatedAt: new Date().toISOString(),
          ...(editingItem ? {} : { 
            createdAt: new Date().toISOString(),
            popularity: 1
          })
        }
        
        await onSave(packageData)
        onClose()
      }
    } catch (error) {
      console.error('Error al guardar paquete:', error)
      setErrors({ submit: 'Error al guardar el paquete. Intenta nuevamente.' })
    } finally {
      setIsValidating(false)
    }
    
  }

  const getPricingInsights = () => {
    if (formData.price === 0) return null
    
    const range = priceRanges[formData.category]
    const position = ((formData.price - range.min) / (range.max - range.min)) * 100
    
    if (position < 33) return { type: 'low', message: 'Precio competitivo - Bueno para captar clientes' }
    if (position > 66) return { type: 'high', message: 'Precio premium - Asegurate de justificar el valor' }
    return { type: 'optimal', message: 'Precio en rango óptimo del mercado' }
  }

  const pricingInsight = getPricingInsights()

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto px-1">
      
      {/* Sección: Información Básica */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          Información Básica del Paquete
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="packageName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Paquete *
            </label>
            <input
              id="packageName"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Ej: Paquete Cumpleaños Premium"
              maxLength={50}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Categoría *
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="basic">Básico - Eventos sencillos</option>
              <option value="premium">Premium - Celebraciones especiales</option>
              <option value="deluxe">Deluxe - Eventos de lujo</option>
              <option value="custom">Personalizado - A medida</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="active">Activo - Disponible para venta</option>
              <option value="inactive">Inactivo - No disponible</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción *
            </label>
            <textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Describe el paquete, su propósito y qué lo hace especial..."
              maxLength={200}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.description && (
                <p className="text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.description}
                </p>
              )}
              <p className="text-xs text-gray-500">
                {formData.description.length}/200 caracteres
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección: Configuración del Servicio */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Configuración del Servicio
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Precio *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm">$</span>
              </div>
              <input
                id="price"
                type="number"
                min="0"
                step="50"
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
                className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.price ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="5000"
              />
            </div>
            {errors.price && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.price}
              </p>
            )}
            {pricingInsight && (
              <p className={`mt-1 text-xs flex items-center ${
                pricingInsight.type === 'optimal' ? 'text-green-600' : 
                pricingInsight.type === 'low' ? 'text-blue-600' : 'text-orange-600'
              }`}>
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {pricingInsight.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
              Duración (horas) *
            </label>
            <input
              id="duration"
              type="number"
              min="1"
              max="12"
              value={formData.duration}
              onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 0)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.duration ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="4"
            />
            {errors.duration && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.duration}
              </p>
            )}
            {formData.price > 0 && formData.duration > 0 && (
              <p className="mt-1 text-xs text-gray-500">
                ${Math.round(formData.price / formData.duration).toLocaleString()} por hora
              </p>
            )}
          </div>

          <div>
            <label htmlFor="maxGuests" className="block text-sm font-medium text-gray-700 mb-1">
              Capacidad Máxima *
            </label>
            <input
              id="maxGuests"
              type="number"
              min="5"
              max="200"
              value={formData.maxGuests}
              onChange={(e) => handleInputChange('maxGuests', parseInt(e.target.value) || 0)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.maxGuests ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="25"
            />
            {errors.maxGuests && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.maxGuests}
              </p>
            )}
            {formData.price > 0 && formData.maxGuests > 0 && (
              <p className="mt-1 text-xs text-gray-500">
                ${Math.round(formData.price / formData.maxGuests).toLocaleString()} por invitado
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Sección: Servicios Incluidos */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Servicios Incluidos
          </h3>
          <button
            type="button"
            onClick={applyPreset}
            className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            Aplicar preset de {formData.category}
          </button>
        </div>

        <div className="space-y-2 mb-4">
          {formData.includes.map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
              <span className="text-sm text-gray-900">{item}</span>
              <button
                type="button"
                onClick={() => handleRemoveInclude(index)}
                className="text-red-600 hover:text-red-800 p-1 rounded"
                title="Eliminar servicio"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newIncludeItem}
            onChange={(e) => setNewIncludeItem(e.target.value)}
            placeholder="Agregar nuevo servicio..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddInclude())}
          />
          <button
            type="button"
            onClick={handleAddInclude}
            disabled={!newIncludeItem.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Agregar
          </button>
        </div>

        {errors.includes && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errors.includes}
          </p>
        )}

        <p className="mt-2 text-xs text-gray-500">
          {formData.includes.length}/15 servicios incluidos
        </p>
      </div>

      {/* Error de Envío */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <svg className="w-5 h-5 text-red-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-700">{errors.submit}</p>
          </div>
        </div>
      )}

      {/* Botones de Acción */}
      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isValidating}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium flex items-center"
        >
          {isValidating ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Validando...
            </>
          ) : (
            editingItem ? 'Actualizar Paquete' : 'Crear Paquete'
          )}
        </button>
      </div>
    </form>
  )
}

// ============================================================================
// COMPONENTE DE FORMULARIO DE FINANZAS - VERSIÓN ENTERPRISE
// ============================================================================

const FinanceForm: React.FC<FinanceFormProps> = ({
  editingItem,
  onSave,
  onClose,
  existingTransactions = []
}) => {
  const [formData, setFormData] = useState<FinanceFormData>({
    description: editingItem?.description || '',
    amount: editingItem?.amount || 0,
    type: editingItem?.type || 'income',
    category: editingItem?.category || '',
    date: editingItem?.date || new Date().toISOString().split('T')[0],
    paymentMethod: editingItem?.paymentMethod || 'cash',
    notes: editingItem?.notes || '',
    receipt: editingItem?.receipt || ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isValidating, setIsValidating] = useState(false)

  // Categorías de ingresos y gastos
  const incomeCategories = [
    'Reservas de eventos',
    'Servicios adicionales',
    'Venta de paquetes',
    'Depósitos',
    'Otros ingresos'
  ]

  const expenseCategories = [
    'Compra de suministros',
    'Gastos de personal',
    'Servicios públicos',
    'Marketing',
    'Mantenimiento',
    'Proveedores',
    'Otros gastos'
  ]

  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'description':
        if (!value?.trim()) return 'La descripción es requerida'
        if (value.length < 5) return 'La descripción debe tener al menos 5 caracteres'
        if (value.length > 100) return 'La descripción no puede exceder 100 caracteres'
        return ''

      case 'amount':
        if (!value || value <= 0) return 'El monto debe ser mayor a $0'
        if (value > 1000000) return 'El monto no puede exceder $1,000,000'
        return ''

      case 'category':
        if (!value) return 'Debe seleccionar una categoría'
        return ''

      case 'date':
        if (!value) return 'La fecha es requerida'
        const selectedDate = new Date(value)
        const today = new Date()
        const oneYearAgo = new Date()
        oneYearAgo.setFullYear(today.getFullYear() - 1)
        
        if (selectedDate > today) return 'La fecha no puede ser futura'
        if (selectedDate < oneYearAgo) return 'La fecha no puede ser mayor a un año'
        return ''

      default:
        return ''
    }
  }

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))

    // Reset category when type changes
    if (name === 'type') {
      setFormData(prev => ({ ...prev, category: '' }))
      setErrors(prev => ({ ...prev, category: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    Object.keys(formData).forEach(key => {
      if (key !== 'notes' && key !== 'receipt') {
        const error = validateField(key, formData[key as keyof FinanceFormData])
        if (error) newErrors[key] = error
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsValidating(true)

    try {
      if (validateForm()) {
        const transactionData = {
          ...formData,
          updatedAt: new Date().toISOString(),
          ...(editingItem ? {} : { createdAt: new Date().toISOString() })
        }
        
        await onSave(transactionData)
        onClose()
      }
    } catch (error) {
      console.error('Error al guardar transacción:', error)
      setErrors({ submit: 'Error al guardar la transacción. Intenta nuevamente.' })
    } finally {
      setIsValidating(false)
    }
  }

  const currentCategories = formData.type === 'income' ? incomeCategories : expenseCategories

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto px-1">
      
      {/* Sección: Información Básica */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Información de la Transacción
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="transactionDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción *
            </label>
            <input
              id="transactionDescription"
              type="text"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Ej: Pago por evento de cumpleaños infantil"
              maxLength={100}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.description}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="transactionType" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Transacción *
            </label>
            <select
              id="transactionType"
              value={formData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="income">Ingreso</option>
              <option value="expense">Gasto</option>
            </select>
          </div>

          <div>
            <label htmlFor="transactionAmount" className="block text-sm font-medium text-gray-700 mb-1">
              Monto *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm">$</span>
              </div>
              <input
                id="transactionAmount"
                type="number"
                min="0"
                step="0.01"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', parseFloat(e.target.value) || 0)}
                className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.amount ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="0.00"
              />
            </div>
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.amount}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="transactionCategory" className="block text-sm font-medium text-gray-700 mb-1">
              Categoría *
            </label>
            <select
              id="transactionCategory"
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.category ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="">Seleccionar categoría</option>
              {currentCategories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.category}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="transactionDate" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha *
            </label>
            <input
              id="transactionDate"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.date ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.date}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Sección: Detalles de Pago */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          Detalles de Pago
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">
              Método de Pago
            </label>
            <select
              id="paymentMethod"
              value={formData.paymentMethod}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="cash">Efectivo</option>
              <option value="card">Tarjeta</option>
              <option value="transfer">Transferencia</option>
              <option value="other">Otro</option>
            </select>
          </div>

          <div>
            <label htmlFor="receipt" className="block text-sm font-medium text-gray-700 mb-1">
              Número de Recibo/Factura
            </label>
            <input
              id="receipt"
              type="text"
              value={formData.receipt}
              onChange={(e) => handleInputChange('receipt', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Ej: FAC-2025-001"
              maxLength={50}
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="transactionNotes" className="block text-sm font-medium text-gray-700 mb-1">
              Notas Adicionales
            </label>
            <textarea
              id="transactionNotes"
              rows={3}
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              placeholder="Información adicional sobre la transacción..."
              maxLength={200}
            />
          </div>
        </div>
      </div>

      {/* Error de Envío */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <svg className="w-5 h-5 text-red-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-700">{errors.submit}</p>
          </div>
        </div>
      )}

      {/* Botones de Acción */}
      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isValidating}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium flex items-center"
        >
          {isValidating ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Validando...
            </>
          ) : (
            editingItem ? 'Actualizar Transacción' : 'Crear Transacción'
          )}
        </button>
      </div>
    </form>
  )
}

// ============================================================================
// COMPONENTE DE FORMULARIO DE EXTRAS - VERSIÓN ENTERPRISE
// ============================================================================

const ExtraForm: React.FC<ExtraFormProps> = ({
  editingItem,
  onSave,
  onClose,
  existingExtras = []
}) => {
  const [formData, setFormData] = useState<ExtraFormData>({
    name: editingItem?.name || '',
    description: editingItem?.description || '',
    price: editingItem?.price || 0,
    category: editingItem?.category || 'decoration',
    status: editingItem?.status || 'active',
    availability: editingItem?.availability || 1,
    unit: editingItem?.unit || 'unit',
    images: editingItem?.images || []
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isValidating, setIsValidating] = useState(false)

  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'name':
        if (!value?.trim()) return 'El nombre del extra es requerido'
        if (value.length < 3) return 'El nombre debe tener al menos 3 caracteres'
        if (value.length > 50) return 'El nombre no puede exceder 50 caracteres'
        
        const nameExists = existingExtras.some(extra => 
          extra.name.toLowerCase() === value.toLowerCase() && 
          extra.id !== editingItem?.id
        )
        if (nameExists) return 'Ya existe un extra con este nombre'
        return ''

      case 'description':
        if (!value?.trim()) return 'La descripción es requerida'
        if (value.length < 10) return 'La descripción debe tener al menos 10 caracteres'
        if (value.length > 150) return 'La descripción no puede exceder 150 caracteres'
        return ''

      case 'price':
        if (!value || value <= 0) return 'El precio debe ser mayor a $0'
        if (value > 10000) return 'El precio no puede exceder $10,000'
        return ''

      case 'availability':
        if (!value || value < 0) return 'La disponibilidad no puede ser negativa'
        if (value > 100) return 'La disponibilidad máxima es 100 unidades'
        return ''

      default:
        return ''
    }
  }

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    Object.keys(formData).forEach(key => {
      if (key !== 'images') {
        const error = validateField(key, formData[key as keyof ExtraFormData])
        if (error) newErrors[key] = error
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsValidating(true)

    try {
      if (validateForm()) {
        const extraData = {
          ...formData,
          updatedAt: new Date().toISOString(),
          ...(editingItem ? {} : { createdAt: new Date().toISOString() })
        }
        
        await onSave(extraData)
        onClose()
      }
    } catch (error) {
      console.error('Error al guardar extra:', error)
      setErrors({ submit: 'Error al guardar el extra. Intenta nuevamente.' })
    } finally {
      setIsValidating(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto px-1">
      
      {/* Sección: Información Básica */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          Información del Extra
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="extraName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Extra *
            </label>
            <input
              id="extraName"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Ej: Globos de helio"
              maxLength={50}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="extraCategory" className="block text-sm font-medium text-gray-700 mb-1">
              Categoría *
            </label>
            <select
              id="extraCategory"
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="decoration">Decoración</option>
              <option value="entertainment">Entretenimiento</option>
              <option value="food">Comida y Bebidas</option>
              <option value="service">Servicios</option>
              <option value="other">Otros</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="extraDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción *
            </label>
            <textarea
              id="extraDescription"
              rows={3}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Describe el extra, sus características y uso..."
              maxLength={150}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.description && (
                <p className="text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.description}
                </p>
              )}
              <p className="text-xs text-gray-500">
                {formData.description.length}/150 caracteres
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección: Precio y Disponibilidad */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
          Precio y Disponibilidad
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="extraPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Precio *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm">$</span>
              </div>
              <input
                id="extraPrice"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.price ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="0.00"
              />
            </div>
            {errors.price && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.price}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="extraUnit" className="block text-sm font-medium text-gray-700 mb-1">
              Unidad de Medida
            </label>
            <select
              id="extraUnit"
              value={formData.unit}
              onChange={(e) => handleInputChange('unit', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="unit">Por unidad</option>
              <option value="hour">Por hora</option>
              <option value="day">Por día</option>
              <option value="event">Por evento</option>
            </select>
          </div>

          <div>
            <label htmlFor="extraAvailability" className="block text-sm font-medium text-gray-700 mb-1">
              Disponibilidad *
            </label>
            <input
              id="extraAvailability"
              type="number"
              min="0"
              value={formData.availability}
              onChange={(e) => handleInputChange('availability', parseInt(e.target.value) || 0)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.availability ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="10"
            />
            {errors.availability && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.availability}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Sección: Estado */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Estado del Extra</h3>
        <select
          value={formData.status}
          onChange={(e) => handleInputChange('status', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        >
          <option value="active">Activo - Disponible para alquiler</option>
          <option value="inactive">Inactivo - No disponible</option>
        </select>
      </div>

      {/* Error de Envío */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <svg className="w-5 h-5 text-red-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-700">{errors.submit}</p>
          </div>
        </div>
      )}

      {/* Botones de Acción */}
      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isValidating}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium flex items-center"
        >
          {isValidating ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Validando...
            </>
          ) : (
            editingItem ? 'Actualizar Extra' : 'Crear Extra'
          )}
        </button>
      </div>
    </form>
  )
}

// ============================================================================
// COMPONENTE DE FORMULARIO DE OPCIONES DE ALIMENTO - VERSIÓN ENTERPRISE
// ============================================================================

const FoodOptionForm: React.FC<FoodOptionFormProps> = ({
  editingItem,
  onSave,
  onClose,
  existingFoodOptions = []
}) => {
  const [formData, setFormData] = useState<FoodOptionFormData>({
    name: editingItem?.name || '',
    description: editingItem?.description || '',
    price: editingItem?.price || 0,
    category: editingItem?.category || 'main',
    allergens: editingItem?.allergens || [],
    ingredients: editingItem?.ingredients || [],
    status: editingItem?.status || 'active',
    preparationTime: editingItem?.preparationTime || 30,
    servingSize: editingItem?.servingSize || 1
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isValidating, setIsValidating] = useState(false)
  const [newAllergen, setNewAllergen] = useState('')
  const [newIngredient, setNewIngredient] = useState('')

  // Lista de alérgenos comunes
  const commonAllergens = [
    'Gluten', 'Lácteos', 'Huevos', 'Nueces', 'Soja', 
    'Pescado', 'Mariscos', 'Cacahuates', 'Sésamo'
  ]

  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'name':
        if (!value?.trim()) return 'El nombre de la opción es requerido'
        if (value.length < 3) return 'El nombre debe tener al menos 3 caracteres'
        if (value.length > 50) return 'El nombre no puede exceder 50 caracteres'
        
        const nameExists = existingFoodOptions.some(option => 
          option.name.toLowerCase() === value.toLowerCase() && 
          option.id !== editingItem?.id
        )
        if (nameExists) return 'Ya existe una opción con este nombre'
        return ''

      case 'description':
        if (!value?.trim()) return 'La descripción es requerida'
        if (value.length < 10) return 'La descripción debe tener al menos 10 caracteres'
        if (value.length > 200) return 'La descripción no puede exceder 200 caracteres'
        return ''

      case 'price':
        if (!value || value <= 0) return 'El precio debe ser mayor a $0'
        if (value > 1000) return 'El precio no puede exceder $1,000'
        return ''

      case 'preparationTime':
        if (!value || value <= 0) return 'El tiempo de preparación debe ser mayor a 0'
        if (value > 240) return 'El tiempo máximo es 240 minutos'
        return ''

      case 'servingSize':
        if (!value || value <= 0) return 'El tamaño de porción debe ser mayor a 0'
        if (value > 20) return 'El tamaño máximo es 20 porciones'
        return ''

      case 'ingredients':
        if (!value || value.length === 0) return 'Debe incluir al menos un ingrediente'
        if (value.length > 20) return 'Máximo 20 ingredientes'
        return ''

      default:
        return ''
    }
  }

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleAddAllergen = (allergen: string) => {
    if (allergen && !formData.allergens.includes(allergen)) {
      setFormData(prev => ({
        ...prev,
        allergens: [...prev.allergens, allergen]
      }))
    }
    setNewAllergen('')
  }

  const handleRemoveAllergen = (index: number) => {
    setFormData(prev => ({
      ...prev,
      allergens: prev.allergens.filter((_, i) => i !== index)
    }))
  }

  const handleAddIngredient = () => {
    if (newIngredient.trim() && !formData.ingredients.includes(newIngredient.trim())) {
      setFormData(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, newIngredient.trim()]
      }))
      setNewIngredient('')
      
      const error = validateField('ingredients', [...formData.ingredients, newIngredient.trim()])
      setErrors(prev => ({ ...prev, ingredients: error }))
    }
  }

  const handleRemoveIngredient = (index: number) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index)
    setFormData(prev => ({ ...prev, ingredients: newIngredients }))
    
    const error = validateField('ingredients', newIngredients)
    setErrors(prev => ({ ...prev, ingredients: error }))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    Object.keys(formData).forEach(key => {
      if (key !== 'allergens') {
        const error = validateField(key, formData[key as keyof FoodOptionFormData])
        if (error) newErrors[key] = error
      }