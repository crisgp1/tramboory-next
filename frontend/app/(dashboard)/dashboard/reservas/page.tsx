'use client'

/**
 * Página de Gestión de Reservas
 * @module ReservasPage
 * @description Página principal para la gestión de reservas del sistema
 */

import React, { useState } from 'react'
import { ItemModal, MonthSelector, ReservationCalendar, ScreenSizeAlert } from '@/components/dashboard'

// ============================================================================
// ICONOS SVG
// ============================================================================

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
)

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
)

const EyeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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
 * ReservasPage - Página de gestión de reservas
 * 
 * ### Características:
 * - **Calendario**: Vista de calendario para reservas
 * - **Listado**: Tabla con información completa de reservas
 * - **Filtros**: Búsqueda y filtrado por estado/fecha
 * - **CRUD**: Crear, editar y eliminar reservas
 */
export default function ReservasPage() {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null)
  const [showAlert, setShowAlert] = useState(true)

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
    <div className="p-6 space-y-6">
      {/* Alerta de tamaño de pantalla */}
      {showAlert && (
        <div className="md:hidden">
          <ScreenSizeAlert setShowAlert={setShowAlert} />
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <CalendarIcon />
            Gestión de Reservas
          </h1>
          <p className="text-gray-600 mt-1">
            Administra las reservas y eventos programados
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'calendar' ? 'list' : 'calendar')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            {viewMode === 'calendar' ? 'Vista Lista' : 'Vista Calendario'}
          </button>
          <button
            onClick={handleAddItem}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nueva Reserva
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Búsqueda */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar reservas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </div>
          </div>

          {/* Filtro por estado */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">Todos los estados</option>
            <option value="pending">Pendientes</option>
            <option value="confirmed">Confirmadas</option>
            <option value="completed">Completadas</option>
            <option value="cancelled">Canceladas</option>
          </select>

          {/* Selector de mes/año */}
          <div className="col-span-2">
            <MonthSelector
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              setSelectedMonth={setSelectedMonth}
              setSelectedYear={setSelectedYear}
            />
          </div>
        </div>
      </div>

      {/* Vista de calendario o lista */}
      {viewMode === 'calendar' ? (
        <div className="bg-white rounded-lg shadow-sm border p-4">
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
      ) : (
        /* Tabla de reservas */
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Evento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paquete
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{reservation.clientName}</div>
                        <div className="text-sm text-gray-500">{reservation.clientPhone}</div>
                        <div className="text-sm text-gray-500">{reservation.clientEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{reservation.eventDate}</div>
                        <div className="text-sm text-gray-500">{reservation.eventTime}</div>
                        <div className="text-sm text-gray-500">{reservation.guestCount} invitados</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {reservation.packageType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reservation.status)}`}>
                        {getStatusText(reservation.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${reservation.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            // Ver detalles
                            console.log('Ver detalles:', reservation)
                          }}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          title="Ver detalles"
                        >
                          <EyeIcon />
                        </button>
                        <button
                          onClick={() => {
                            setEditingReservation(reservation)
                            setIsModalOpen(true)
                          }}
                          className="text-purple-600 hover:text-purple-900 p-1 rounded"
                          title="Editar"
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => handleDeleteReservation(reservation.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                          title="Eliminar"
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
            <div className="text-center py-12">
              <CalendarIcon />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay reservas</h3>
              <p className="mt-1 text-sm text-gray-500">
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