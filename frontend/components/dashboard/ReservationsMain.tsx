'use client'

/**
 * Componente Principal de Gestión de Reservas
 * @module ReservationsMain
 * @description Componente principal para la gestión de reservas del sistema
 */

import React, { useState, useEffect } from 'react'
import { TabNavigation, ItemModal, MonthSelector, ReservationCalendar, ScreenSizeAlert } from '@/components/dashboard'

// ============================================================================
// ICONOS SVG
// ============================================================================

const CalendarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    width="24" 
    height="24" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    className="w-5 h-5 md:w-6 md:h-6"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    width="24" 
    height="24" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    className="w-4 h-4 md:w-5 md:h-5"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const EditIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    width="24" 
    height="24" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    className="w-4 h-4 sm:w-5 sm:h-5"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
)

const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    width="24" 
    height="24" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    className="w-4 h-4 sm:w-5 sm:h-5"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
)

const EyeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    width="24" 
    height="24" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    className="w-4 h-4 sm:w-5 sm:h-5"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    width="24" 
    height="24" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    className="w-4 h-4 sm:w-5 sm:h-5"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const TimeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    width="24" 
    height="24" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    className="w-4 h-4 sm:w-5 sm:h-5"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const GuestsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    width="24" 
    height="24" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    className="w-4 h-4 sm:w-5 sm:h-5"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

const PhoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    width="24" 
    height="24" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    className="w-4 h-4 sm:w-5 sm:h-5"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const EmailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    width="24" 
    height="24" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    className="w-4 h-4 sm:w-5 sm:h-5"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const PackageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    width="24" 
    height="24" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    className="w-4 h-4 sm:w-5 sm:h-5"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
)

// ============================================================================
// INTERFACES Y TIPOS
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
// COMPONENTES AUXILIARES
// ============================================================================

/**
 * ReservationCard - Componente para mostrar una reserva en vista de tarjeta
 */
const ReservationCard: React.FC<{
  reservation: Reservation;
  onView: (id: string) => void;
  onEdit: (reservation: Reservation) => void;
  onDelete: (id: string) => void;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
}> = ({ 
  reservation, 
  onView, 
  onEdit, 
  onDelete,
  getStatusColor,
  getStatusText
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-base font-semibold text-gray-900 font-body-medium mb-1 flex items-center gap-1.5">
            <UserIcon className="text-gray-500 w-4 h-4" />
            <span className="truncate max-w-[180px]">{reservation.clientName}</span>
          </h3>
          <div className="text-xs text-gray-600 font-body-light flex items-center">
            <PhoneIcon className="w-3.5 h-3.5 mr-1 text-gray-500" />
            <span className="truncate max-w-[180px]">{reservation.clientPhone}</span>
          </div>
          <div className="text-xs text-gray-600 font-body-light flex items-center mt-0.5">
            <EmailIcon className="w-3.5 h-3.5 mr-1 text-gray-500" />
            <span className="truncate max-w-[180px]">{reservation.clientEmail}</span>
          </div>
        </div>
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reservation.status)}`}>
          {getStatusText(reservation.status)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-3 mb-3">
        <div>
          <div className="text-xs text-gray-500 mb-1">Fecha y hora:</div>
          <div className="text-xs font-medium text-gray-700 flex items-center">
            <CalendarIcon className="w-3.5 h-3.5 mr-1 text-gray-500" />
            {reservation.eventDate}
          </div>
          <div className="text-xs font-medium text-gray-700 flex items-center mt-1">
            <TimeIcon className="w-3.5 h-3.5 mr-1 text-gray-500" />
            {reservation.eventTime}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Detalles:</div>
          <div className="text-xs font-medium text-gray-700 flex items-center">
            <GuestsIcon className="w-3.5 h-3.5 mr-1 text-gray-500" />
            {reservation.guestCount} invitados
          </div>
          <div className="text-xs font-medium text-gray-700 flex items-center mt-1">
            <PackageIcon className="w-3.5 h-3.5 mr-1 text-gray-500" />
            <span className="truncate max-w-[120px]">{reservation.packageType}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-gray-100 pt-3">
        <div className="text-sm font-semibold text-tramboory-purple-600">
          ${reservation.totalAmount.toLocaleString()}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onView(reservation.id)}
            className="text-blue-600 hover:text-blue-800 p-2 rounded transition-colors duration-200"
            title="Ver detalles"
            aria-label="Ver detalles"
          >
            <EyeIcon />
          </button>
          <button
            onClick={() => onEdit(reservation)}
            className="text-tramboory-purple-600 hover:text-tramboory-purple-800 p-2 rounded transition-colors duration-200"
            title="Editar reserva"
            aria-label="Editar reserva"
          >
            <EditIcon />
          </button>
          <button
            onClick={() => onDelete(reservation.id)}
            className="text-red-600 hover:text-red-800 p-2 rounded transition-colors duration-200"
            title="Eliminar reserva"
            aria-label="Eliminar reserva"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// DATOS DE EJEMPLO
// ============================================================================

const mockReservations: Reservation[] = [
  {
    id: '1',
    clientName: 'Ana García',
    clientPhone: '+52 55 1234 5678',
    clientEmail: 'ana@email.com',
    eventDate: '2024-02-15',
    eventTime: '15:00',
    packageType: 'Paquete Premium',
    guestCount: 25,
    status: 'confirmed',
    totalAmount: 8500,
    createdAt: '2024-01-10',
    notes: 'Cumpleaños de niña, decoración en rosa'
  },
  {
    id: '2',
    clientName: 'Carlos López',
    clientPhone: '+52 55 9876 5432',
    clientEmail: 'carlos@email.com',
    eventDate: '2024-02-20',
    eventTime: '16:00',
    packageType: 'Paquete Básico',
    guestCount: 15,
    status: 'pending',
    totalAmount: 5500,
    createdAt: '2024-01-12'
  },
  {
    id: '3',
    clientName: 'María Rodríguez',
    clientPhone: '+52 55 5555 1234',
    clientEmail: 'maria@email.com',
    eventDate: '2024-02-25',
    eventTime: '14:00',
    packageType: 'Paquete Deluxe',
    guestCount: 30,
    status: 'confirmed',
    totalAmount: 12000,
    createdAt: '2024-01-15'
  }
]

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * ReservationsMain - Componente de gestión de reservas
 * 
 * ### Características:
 * - **Calendario**: Vista de calendario para reservas
 * - **Listado**: Tabla con información completa de reservas
 * - **Filtros**: Búsqueda y filtrado por estado/fecha
 * - **CRUD**: Crear, editar y eliminar reservas
 * - **Responsive**: Adaptable a diferentes tamaños de pantalla
 */
export function ReservationsMain() {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [viewMode, setViewMode] = useState<'calendar' | 'list' | 'cards'>('list')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null)
  const [showAlert, setShowAlert] = useState(false) // Desactivada ya que implementamos diseño responsive
  const [activeTab, setActiveTab] = useState('reservations')

  // Cambiar automáticamente la vista según el tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setViewMode('cards')
      } else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
        setViewMode('list')
      }
      // En pantallas grandes mantenemos la vista actual o list por defecto
    }
    
    // Inicializar en carga
    handleResize()
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Filtrar reservas
  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.clientPhone.includes(searchTerm)
    const matchesStatus = selectedStatus === 'all' || reservation.status === selectedStatus
    
    const reservationDate = new Date(reservation.eventDate)
    const matchesMonth = reservationDate.getMonth() === selectedMonth
    const matchesYear = reservationDate.getFullYear() === selectedYear
    
    return matchesSearch && matchesStatus && matchesMonth && matchesYear
  })

  // Manejar creación/edición de reserva
  const handleSaveReservation = (reservationData: any) => {
    if (editingReservation) {
      setReservations(reservations.map(reservation => 
        reservation.id === editingReservation.id ? { ...reservation, ...reservationData } : reservation
      ))
    } else {
      const newReservation: Reservation = {
        id: Date.now().toString(),
        ...reservationData,
        createdAt: new Date().toISOString().split('T')[0]
      }
      setReservations([...reservations, newReservation])
    }
    setIsModalOpen(false)
    setEditingReservation(null)
  }

  // Manejar eliminación de reserva
  const handleDeleteReservation = (reservationId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta reserva?')) {
      setReservations(reservations.filter(reservation => reservation.id !== reservationId))
    }
  }

  // Manejar visualización de reserva
  const handleViewReservation = (reservationId: string) => {
    console.log('Ver detalles:', reservationId)
    // Implementar lógica para ver detalles
  }

  // Manejar agregar item desde TabNavigation
  const handleAddItem = () => {
    setEditingReservation(null)
    setIsModalOpen(true)
  }

  // Obtener color del estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Obtener texto del estado
  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmada'
      case 'pending': return 'Pendiente'
      case 'cancelled': return 'Cancelada'
      case 'completed': return 'Completada'
      default: return status
    }
  }

  return (
    <div className="p-3 sm:p-4 md:p-6 pb-16 space-y-4 md:space-y-8">
      {/* Alerta de tamaño de pantalla - Desactivada porque ya implementamos diseño responsive */}
      {showAlert && (
        <div className="hidden">
          <ScreenSizeAlert setShowAlert={setShowAlert} />
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4 mb-4 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-body-semibold flex items-center gap-2">
            <div className="p-2 bg-tramboory-purple-50 rounded-lg text-tramboory-purple-600">
              <CalendarIcon />
            </div>
            <span className="truncate">Gestión de Reservas</span>
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-1 font-body-light">
            Administra las reservas y eventos programados
          </p>
        </div>
        <div className="flex gap-2 mt-3 sm:mt-0">
          {/* En pantallas grandes mostramos los botones de cambio de vista */}
          {window.innerWidth >= 768 && (
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-3 md:px-4 py-2 rounded-xl transition-all duration-200 text-sm md:text-base ${
                  viewMode === 'calendar' 
                    ? 'bg-tramboory-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                title="Vista Calendario"
                aria-label="Ver en formato calendario"
              >
                Calendario
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 md:px-4 py-2 rounded-xl transition-all duration-200 text-sm md:text-base ${
                  viewMode === 'list' 
                    ? 'bg-tramboory-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                title="Vista Lista"
                aria-label="Ver en formato lista"
              >
                Lista
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 md:px-4 py-2 rounded-xl transition-all duration-200 text-sm md:text-base ${
                  viewMode === 'cards' 
                    ? 'bg-tramboory-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                title="Vista Tarjetas"
                aria-label="Ver en formato tarjetas"
              >
                Tarjetas
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6 hover:shadow-md transition-all duration-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {/* Búsqueda */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar reservas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-tramboory-purple-500 focus:border-transparent"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </div>
          </div>

          {/* Filtro por estado */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-tramboory-purple-500 focus:border-transparent"
            title="Filtrar por estado"
          >
            <option value="all">Todos los estados</option>
            <option value="pending">Pendientes</option>
            <option value="confirmed">Confirmadas</option>
            <option value="completed">Completadas</option>
            <option value="cancelled">Canceladas</option>
          </select>

          {/* Selector de mes/año */}
          <div className="sm:col-span-2">
            <MonthSelector
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              setSelectedMonth={setSelectedMonth}
              setSelectedYear={setSelectedYear}
            />
          </div>
        </div>
      </div>

      {/* Navegación por tabs */}
      <TabNavigation 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleAddItem={handleAddItem}
      />

      {/* Vista de calendario, lista o tarjetas */}
      {viewMode === 'calendar' ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6 overflow-x-auto hover:shadow-md transition-all duration-200">
          <ReservationCalendar
            reservations={filteredReservations.map(r => ({
              id: parseInt(r.id),
              fecha_reserva: r.eventDate,
              hora_inicio: r.eventTime + ':00',
              estado: r.status === 'confirmed' ? 'confirmada' : r.status,
              usuario: {
                nombre: r.clientName,
                email: r.clientEmail
              }
            }))}
            onSelectReservation={(reservation) => {
              // Encontrar la reserva original
              const originalReservation = filteredReservations.find(r => r.id === reservation.id.toString())
              if (originalReservation) {
                setEditingReservation(originalReservation)
                setIsModalOpen(true)
              }
            }}
          />
        </div>
      ) : viewMode === 'list' ? (
        /* Tabla de reservas */
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Evento
                  </th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paquete
                  </th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-gray-50">
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-gray-900 font-body-medium truncate max-w-[150px] md:max-w-full">
                          {reservation.clientName}
                        </div>
                        <div className="text-xs text-gray-500 font-body-light truncate max-w-[150px] md:max-w-full">
                          {reservation.clientPhone}
                        </div>
                        <div className="text-xs text-gray-500 font-body-light truncate max-w-[150px] md:max-w-full">
                          {reservation.clientEmail}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-gray-900 font-body-medium">
                          {reservation.eventDate}
                        </div>
                        <div className="text-xs text-gray-500 font-body-light">
                          {reservation.eventTime}
                        </div>
                        <div className="text-xs text-gray-500 font-body-light">
                          {reservation.guestCount} invitados
                        </div>
                      </div>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-tramboory-purple-100 text-tramboory-purple-800 truncate max-w-[120px] md:max-w-full">
                        {reservation.packageType}
                      </span>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reservation.status)}`}>
                        {getStatusText(reservation.status)}
                      </span>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900 font-body-medium">
                      ${reservation.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                      <div className="flex items-center gap-1 md:gap-2">
                        <button
                          onClick={() => handleViewReservation(reservation.id)}
                          className="text-blue-600 hover:text-blue-900 p-1.5 md:p-2 rounded transition-all duration-200"
                          title="Ver detalles"
                          aria-label="Ver detalles de la reserva"
                        >
                          <EyeIcon />
                        </button>
                        <button
                          onClick={() => {
                            setEditingReservation(reservation)
                            setIsModalOpen(true)
                          }}
                          className="text-tramboory-purple-600 hover:text-tramboory-purple-700 p-1.5 md:p-2 rounded transition-all duration-200"
                          title="Editar reserva"
                          aria-label="Editar reserva"
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => handleDeleteReservation(reservation.id)}
                          className="text-red-600 hover:text-red-900 p-1.5 md:p-2 rounded transition-all duration-200"
                          title="Eliminar reserva"
                          aria-label="Eliminar reserva"
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

          {filteredReservations.length === 0 && (
            <div className="text-center py-8 md:py-12">
              <div className="p-2 bg-tramboory-purple-50 rounded-lg text-tramboory-purple-600 inline-block mb-2">
                <CalendarIcon />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900 font-body-medium">No hay reservas</h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-500 font-body-light">
                No se encontraron reservas que coincidan con los filtros aplicados.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Vista de tarjetas para móvil */
        <div className="space-y-4">
          {filteredReservations.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              onView={handleViewReservation}
              onEdit={(r) => {
                setEditingReservation(r)
                setIsModalOpen(true)
              }}
              onDelete={handleDeleteReservation}
              getStatusColor={getStatusColor}
              getStatusText={getStatusText}
            />
          ))}
          
          {filteredReservations.length === 0 && (
            <div className="text-center py-8 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-2 bg-tramboory-purple-50 rounded-lg text-tramboory-purple-600 inline-block mb-2">
                <CalendarIcon />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900 font-body-medium">No hay reservas</h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-500 font-body-light">
                No se encontraron reservas que coincidan con los filtros aplicados.
              </p>
            </div>
          )}
        </div>
      )}

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