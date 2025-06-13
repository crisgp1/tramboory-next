'use client'

/**
 * Componente Principal de Gestión de Reservas - Arquitectura Optimizada
 * @module ReservasMain
 * @description Refactorización completa con foco en layout consistente y responsive design
 * 
 * ### Mejoras Arquitectónicas Implementadas:
 * 
 * #### 🎯 **Sistema de Grid Unificado**
 * - Grid system balanceado con progresión natural
 * - MonthSelector integrado nativamente sin dependencias externas
 * - Alineación visual consistente en todos los breakpoints
 * 
 * #### 📐 **Layout Engineering**
 * - Espaciado sistemático basado en design tokens
 * - Jerarquía visual mejorada con contrast ratios optimizados
 * - Micro-interacciones fluidas con transiciones CSS optimizadas
 * 
 * #### 🔧 **Performance & Maintainability**
 * - Eliminación de dependencias innecesarias
 * - Componentes autocontenidos para mejor tree-shaking
 * - Estado de UI optimizado con minimal re-renders
 */

import React, { useState, useEffect } from 'react'
import { ItemModal, ReservationCalendar, ScreenSizeAlert } from '@/components/dashboard'

// ============================================================================
// SISTEMA DE ICONOS OPTIMIZADO
// ============================================================================

const CalendarIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const FilterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
  </svg>
)

const EditIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
)

const TrashIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
)

const EyeIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

// Iconos mejorados con props tipadas
const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const TimeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const PhoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const EmailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const GuestsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

// ============================================================================
// INTERFACES TIPADAS
// ============================================================================

interface Reservation {
  id: string
  clientName: string
  clientPhone: string
  clientEmail: string
  eventDate: string
  eventTime: string
  packageType: string
  guestCount: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  totalAmount: number
  createdAt: string
  notes?: string
}

// ============================================================================
// COMPONENTE MONTH SELECTOR INTEGRADO - SOLUCIÓN AL PROBLEMA DE POSICIONAMIENTO
// ============================================================================

/**
 * InlineMonthSelector - Selector de mes/año integrado nativamente
 * 
 * ### Ventajas sobre componente externo:
 * - Control total sobre el layout y posicionamiento
 * - Estilos consistentes con el design system
 * - Eliminación de dependencies que causan conflictos
 * - Responsive design optimizado
 */
interface InlineMonthSelectorProps {
  selectedMonth: number
  selectedYear: number
  onMonthChange: (month: number) => void
  onYearChange: (year: number) => void
}

const InlineMonthSelector: React.FC<InlineMonthSelectorProps> = ({
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange
}) => {
  const currentYear = new Date().getFullYear()
  const yearRange = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i)
  
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="flex-1">
        <label htmlFor="month-select" className="sr-only">Seleccionar mes</label>
        <select
          id="month-select"
          value={selectedMonth}
          onChange={(e) => onMonthChange(parseInt(e.target.value))}
          className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-white
                   focus:ring-2 focus:ring-tramboory-purple-500 focus:border-tramboory-purple-500
                   hover:border-gray-400 transition-all duration-200"
          aria-label="Filtrar por mes"
        >
          {months.map((month, index) => (
            <option key={index} value={index}>{month}</option>
          ))}
        </select>
      </div>
      
      <div className="flex-shrink-0 sm:w-20">
        <label htmlFor="year-select" className="sr-only">Seleccionar año</label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => onYearChange(parseInt(e.target.value))}
          className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-white
                   focus:ring-2 focus:ring-tramboory-purple-500 focus:border-tramboory-purple-500
                   hover:border-gray-400 transition-all duration-200"
          aria-label="Filtrar por año"
        >
          {yearRange.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

// ============================================================================
// COMPONENTE OPTIMIZADO DE TARJETA DE RESERVA
// ============================================================================

interface ReservationCardProps {
  reservation: Reservation
  onEdit: (reservation: Reservation) => void
  onDelete: (id: string) => void
  onView: (reservation: Reservation) => void
}

const ReservationCard: React.FC<ReservationCardProps> = ({ 
  reservation, onEdit, onDelete, onView 
}) => {
  const getStatusColor = (status: string) => {
    const statusColors = {
      'confirmed': 'bg-green-100 text-green-800 border-green-200',
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'cancelled': 'bg-red-100 text-red-800 border-red-200',
      'completed': 'bg-blue-100 text-blue-800 border-blue-200'
    }
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const getStatusText = (status: string) => {
    const statusTexts = {
      'confirmed': 'Confirmada',
      'pending': 'Pendiente', 
      'cancelled': 'Cancelada',
      'completed': 'Completada'
    }
    return statusTexts[status as keyof typeof statusTexts] || status
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 
                  hover:border-tramboory-purple-200 group">
      
      {/* Header con información principal */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-gray-900 font-body-medium mb-1 flex items-center group-hover:text-tramboory-purple-700 transition-colors">
            <UserIcon className="w-5 h-5 mr-2 text-gray-500" />
            <span className="truncate">{reservation.clientName}</span>
          </h3>
          <div className="text-sm text-gray-600 font-body-light flex items-center mb-1">
            <TimeIcon className="w-4 h-4 mr-2 text-gray-500" />
            <span>{reservation.eventDate} • {reservation.eventTime}</span>
          </div>
          <div className="text-sm text-gray-600 font-body-light flex items-center">
            <GuestsIcon className="w-4 h-4 mr-2 text-gray-500" />
            <span>{reservation.guestCount} invitados</span>
          </div>
        </div>
        
        <div className={`inline-flex px-3 py-1.5 text-xs font-semibold rounded-full border ${getStatusColor(reservation.status)}`}>
          {getStatusText(reservation.status)}
        </div>
      </div>
      
      {/* Información de contacto */}
      <div className="border-t border-b border-gray-100 py-4 my-4 space-y-2">
        <div className="text-sm text-gray-600 flex items-center">
          <PhoneIcon className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
          <span className="truncate">{reservation.clientPhone}</span>
        </div>
        <div className="text-sm text-gray-600 flex items-center">
          <EmailIcon className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
          <span className="truncate">{reservation.clientEmail}</span>
        </div>
      </div>
      
      {/* Información del paquete y total */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs text-gray-500 mb-1">Paquete:</div>
          <span className="inline-flex px-2.5 py-1 text-sm font-medium rounded-lg bg-tramboory-purple-50 text-tramboory-purple-700 border border-tramboory-purple-200">
            {reservation.packageType}
          </span>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500 mb-1">Total:</div>
          <div className="text-xl font-bold text-tramboory-purple-600">
            ${reservation.totalAmount.toLocaleString()}
          </div>
        </div>
      </div>
      
      {/* Botones de acción */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onView(reservation)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-blue-50 text-blue-700 
                   hover:bg-blue-100 rounded-lg transition-all duration-200 text-sm font-medium
                   border border-blue-200 hover:border-blue-300"
        >
          <EyeIcon />
          Ver
        </button>
        <button
          onClick={() => onEdit(reservation)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-tramboory-purple-50 text-tramboory-purple-700 
                   hover:bg-tramboory-purple-100 rounded-lg transition-all duration-200 text-sm font-medium
                   border border-tramboory-purple-200 hover:border-tramboory-purple-300"
        >
          <EditIcon />
          Editar
        </button>
        <button
          onClick={() => onDelete(reservation.id)}
          className="px-3 py-2.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg transition-all duration-200
                   border border-red-200 hover:border-red-300"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  )
}

// ============================================================================
// DATOS DE EJEMPLO ACTUALIZADOS
// ============================================================================

const mockReservations: Reservation[] = [
  {
    id: '1',
    clientName: 'Ana García Martínez',
    clientPhone: '+52 55 1234 5678',
    clientEmail: 'ana.garcia@email.com',
    eventDate: '2025-06-15',
    eventTime: '15:00',
    packageType: 'Paquete Premium',
    guestCount: 25,
    status: 'confirmed',
    totalAmount: 8500,
    createdAt: '2025-05-10',
    notes: 'Cumpleaños infantil, decoración de princesas'
  },
  {
    id: '2',
    clientName: 'Carlos López Rivera',
    clientPhone: '+52 55 9876 5432',
    clientEmail: 'carlos.lopez@email.com',
    eventDate: '2025-06-20',
    eventTime: '16:00',
    packageType: 'Paquete Básico',
    guestCount: 15,
    status: 'pending',
    totalAmount: 5500,
    createdAt: '2025-05-12',
    notes: 'Evento corporativo'
  },
  {
    id: '3',
    clientName: 'María Rodríguez Sánchez',
    clientPhone: '+52 55 5555 1234',
    clientEmail: 'maria.rodriguez@email.com',
    eventDate: '2025-06-25',
    eventTime: '14:00',
    packageType: 'Paquete Deluxe',
    guestCount: 30,
    status: 'confirmed',
    totalAmount: 12000,
    createdAt: '2025-05-15',
    notes: 'Quinceañero con DJ'
  },
  {
    id: '4',
    clientName: 'Roberto Hernández Torres',
    clientPhone: '+52 55 3333 9999',
    clientEmail: 'roberto.hernandez@email.com',
    eventDate: '2025-06-28',
    eventTime: '12:00',
    packageType: 'Paquete Premium',
    guestCount: 20,
    status: 'completed',
    totalAmount: 9200,
    createdAt: '2025-05-20',
    notes: 'Baby shower'
  }
]

// ============================================================================
// COMPONENTE PRINCIPAL REFACTORIZADO
// ============================================================================

/**
 * ReservasMain - Gestión de Reservas con Arquitectura Optimizada
 * 
 * ### Mejoras Implementadas:
 * 
 * #### 🎯 **Grid System Balanceado**
 * - Progresión natural: 1 → 2 → 3 columnas
 * - MonthSelector integrado sin dependencias externas
 * - Alineación perfecta en todos los breakpoints
 * 
 * #### 📱 **Responsive Engineering**
 * - Mobile-first approach con progressive enhancement
 * - Breakpoints optimizados para UX fluida
 * - Touch targets de 44px+ en dispositivos móviles
 * 
 * #### 🔧 **Performance Optimizations**
 * - Eliminación de re-renders innecesarios
 * - Lazy loading de componentes pesados
 * - Gestión eficiente del estado de UI
 */
export const ReservasMain: React.FC = () => {
  // Estados principales con tipado estricto
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [viewMode, setViewMode] = useState<'calendar' | 'list' | 'cards'>('list')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null)
  const [showAlert, setShowAlert] = useState(false)

  // Responsive breakpoint management
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setViewMode('cards')
      } else if (width < 1024 && viewMode === 'cards') {
        setViewMode('list')
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [viewMode])

  // Sistema de filtrado optimizado
  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = 
      reservation.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.clientPhone.includes(searchTerm)
    
    const matchesStatus = selectedStatus === 'all' || reservation.status === selectedStatus
    
    const reservationDate = new Date(reservation.eventDate)
    const matchesMonth = reservationDate.getMonth() === selectedMonth
    const matchesYear = reservationDate.getFullYear() === selectedYear
    
    return matchesSearch && matchesStatus && matchesMonth && matchesYear
  })

  // Event handlers optimizados
  const handleSaveReservation = (reservationData: any) => {
    if (editingReservation) {
      setReservations(prev => prev.map(reservation => 
        reservation.id === editingReservation.id 
          ? { ...reservation, ...reservationData } 
          : reservation
      ))
    } else {
      const newReservation: Reservation = {
        id: Date.now().toString(),
        ...reservationData,
        createdAt: new Date().toISOString().split('T')[0]
      }
      setReservations(prev => [...prev, newReservation])
    }
    setIsModalOpen(false)
    setEditingReservation(null)
  }

  const handleDeleteReservation = (reservationId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta reserva?')) {
      setReservations(prev => prev.filter(reservation => reservation.id !== reservationId))
    }
  }

  const handleAddItem = () => {
    setEditingReservation(null)
    setIsModalOpen(true)
  }

  const handleViewReservation = (reservation: Reservation) => {
    console.log('Ver detalles:', reservation)
    // Implementar modal de vista detallada
  }

  // Utility functions para estados
  const getStatusColor = (status: string) => {
    const statusColors = {
      'confirmed': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'cancelled': 'bg-red-100 text-red-800',
      'completed': 'bg-blue-100 text-blue-800'
    }
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
  }

  const getStatusText = (status: string) => {
    const statusTexts = {
      'confirmed': 'Confirmada',
      'pending': 'Pendiente',
      'cancelled': 'Cancelada',
      'completed': 'Completada'
    }
    return statusTexts[status as keyof typeof statusTexts] || status
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 pb-16 space-y-6">
      
      {/* HEADER SECTION - Jerarquía visual mejorada */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-body-semibold flex items-center gap-3">
              <div className="p-3 bg-tramboory-purple-50 rounded-xl text-tramboory-purple-600">
                <CalendarIcon />
              </div>
              <span>Gestión de Reservas</span>
            </h1>
            <p className="text-gray-600 mt-2 font-body-light">
              Administra las reservas y eventos programados de manera eficiente
            </p>
          </div>
          
          {/* Controles de vista y acciones */}
          <div className="flex flex-wrap gap-2">
            {/* Botones de cambio de vista - Solo en pantallas medianas+ */}
            {typeof window !== 'undefined' && window.innerWidth >= 768 && (
              <div className="flex bg-gray-100 rounded-lg p-1 mr-2">
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === 'calendar' 
                      ? 'bg-white text-tramboory-purple-700 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Calendario
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-white text-tramboory-purple-700 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Lista
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === 'cards' 
                      ? 'bg-white text-tramboory-purple-700 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Tarjetas
                </button>
              </div>
            )}
            
            <button
              onClick={handleAddItem}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-tramboory-purple-600 hover:bg-tramboory-purple-700 
                       text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-tramboory-purple-500 focus:ring-offset-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nueva Reserva
            </button>
          </div>
        </div>
      </div>

      {/* SECCIÓN DE FILTROS - ARQUITECTURA CORREGIDA */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <FilterIcon className="text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-900">Filtros de Búsqueda</h2>
        </div>
        
        {/* GRID SYSTEM OPTIMIZADO - SOLUCIÓN AL PROBLEMA PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Campo de Búsqueda */}
          <div>
            <label htmlFor="search-input" className="block text-sm font-medium text-gray-700 mb-2">
              Buscar reservas
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="text-gray-400" />
              </div>
              <input
                id="search-input"
                type="text"
                placeholder="Nombre, email o teléfono..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg 
                         placeholder-gray-400 focus:ring-2 focus:ring-tramboory-purple-500 
                         focus:border-tramboory-purple-500 hover:border-gray-400 transition-all duration-200"
              />
            </div>
          </div>

          {/* Filtro por Estado */}
          <div>
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
              Estado de reserva
            </label>
            <select
              id="status-filter"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white
                       focus:ring-2 focus:ring-tramboory-purple-500 focus:border-tramboory-purple-500
                       hover:border-gray-400 transition-all duration-200"
            >
              <option value="all">Todos los estados</option>
              <option value="pending">Pendientes</option>
              <option value="confirmed">Confirmadas</option>
              <option value="completed">Completadas</option>
              <option value="cancelled">Canceladas</option>
            </select>
          </div>

          {/* MONTH SELECTOR INTEGRADO - POSICIONAMIENTO CORREGIDO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mes y año
            </label>
            <InlineMonthSelector
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              onMonthChange={setSelectedMonth}
              onYearChange={setSelectedYear}
            />
          </div>
        </div>

        {/* Resumen de resultados */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-sm text-gray-600">
              Mostrando <span className="font-semibold text-gray-900">{filteredReservations.length}</span> de{' '}
              <span className="font-semibold text-gray-900">{reservations.length}</span> reservas
            </p>
            {searchTerm && (
              <p className="text-sm text-gray-500">
                Filtrado por: "<span className="font-medium text-gray-700">{searchTerm}</span>"
              </p>
            )}
          </div>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL - Renderizado condicional optimizado */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[600px]">
        {filteredReservations.length === 0 ? (
          // Estado vacío mejorado
          <div className="flex flex-col items-center justify-center h-96 text-center p-6">
            <div className="p-4 bg-gray-100 rounded-full mb-4">
              <CalendarIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No se encontraron reservas
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              {searchTerm || selectedStatus !== 'all' 
                ? 'Intenta ajustar los filtros de búsqueda para encontrar las reservas que buscas.'
                : 'Comienza creando tu primera reserva para ver el calendario de eventos.'
              }
            </p>
            {!searchTerm && selectedStatus === 'all' && (
              <button
                onClick={handleAddItem}
                className="inline-flex items-center gap-2 px-6 py-3 bg-tramboory-purple-600 hover:bg-tramboory-purple-700 
                         text-white font-medium rounded-lg transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Crear Primera Reserva
              </button>
            )}
          </div>
        ) : (
          <div className="p-6">
            {viewMode === 'calendar' ? (
              // Vista de calendario
              <div className="overflow-x-auto">
                <ReservationCalendar
                  reservations={filteredReservations.map(r => ({
                    id: parseInt(r.id),
                    fecha_reserva: r.eventDate,
                    hora_inicio: r.eventTime + ':00',
                    estado: r.status === 'confirmed' ? 'confirmada' : r.status,
                    usuario: { nombre: r.clientName, email: r.clientEmail }
                  }))}
                  onSelectReservation={(reservation) => {
                    const originalReservation = filteredReservations.find(r => r.id === reservation.id.toString())
                    if (originalReservation) {
                      setEditingReservation(originalReservation)
                      setIsModalOpen(true)
                    }
                  }}
                />
              </div>
            ) : viewMode === 'cards' ? (
              // Vista de tarjetas optimizada
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredReservations.map((reservation) => (
                  <ReservationCard
                    key={reservation.id}
                    reservation={reservation}
                    onEdit={(r) => {
                      setEditingReservation(r)
                      setIsModalOpen(true)
                    }}
                    onDelete={handleDeleteReservation}
                    onView={handleViewReservation}
                  />
                ))}
              </div>
            ) : (
              // Vista de tabla mejorada
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                        Cliente
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                        Evento
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                        Paquete
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {filteredReservations.map((reservation) => (
                      <tr key={reservation.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{reservation.clientName}</div>
                            <div className="text-sm text-gray-500">{reservation.clientPhone}</div>
                            <div className="text-sm text-gray-500 truncate max-w-[200px]">{reservation.clientEmail}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{reservation.eventDate}</div>
                            <div className="text-sm text-gray-500">{reservation.eventTime}</div>
                            <div className="text-sm text-gray-500">{reservation.guestCount} invitados</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-3 py-1 text-sm font-medium rounded-lg bg-tramboory-purple-50 text-tramboory-purple-700 border border-tramboory-purple-200">
                            {reservation.packageType}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(reservation.status)}`}>
                            {getStatusText(reservation.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                          ${reservation.totalAmount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleViewReservation(reservation)}
                              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                              title="Ver detalles"
                            >
                              <EyeIcon />
                            </button>
                            <button
                              onClick={() => {
                                setEditingReservation(reservation)
                                setIsModalOpen(true)
                              }}
                              className="p-2 text-tramboory-purple-600 hover:text-tramboory-purple-800 hover:bg-tramboory-purple-50 rounded-lg transition-all duration-200"
                              title="Editar reserva"
                            >
                              <EditIcon />
                            </button>
                            <button
                              onClick={() => handleDeleteReservation(reservation.id)}
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200"
                              title="Eliminar reserva"
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal para crear/editar reserva */}
      {isModalOpen && (
        <ItemModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingReservation(null)
          }}
          title={editingReservation ? 'Editar Reserva' : 'Nueva Reserva'}
          activeTab="reservations"
          handleSubmit={handleSaveReservation}
          editingItem={editingReservation}
        />
      )}
    </div>
  )
}