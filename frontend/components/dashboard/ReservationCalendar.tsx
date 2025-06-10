'use client'

/**
 * Calendario de Reservas
 * @module ReservationCalendar
 * @description Calendario interactivo para gestión de reservas
 */

import React, { useState, useEffect } from 'react'

// ============================================================================
// ICONOS SVG
// ============================================================================

const ChevronLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v14a2 2 0 002 2z" />
  </svg>
)

const InfoIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

// ============================================================================
// INTERFACES Y TIPOS
// ============================================================================

interface Reservation {
  id: number
  fecha_reserva: string
  hora_inicio: string
  estado: string
  usuario?: {
    nombre: string
    email: string
  }
  nombre_festejado?: string
}

interface ReservationCalendarProps {
  reservations: Reservation[]
  onSelectReservation?: (reservation: Reservation) => void
  className?: string
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * ReservationCalendar - Calendario de reservas interactivo
 * 
 * ### Características:
 * - **Vista Mensual**: Navegación por meses
 * - **Estados Visuales**: Colores según disponibilidad
 * - **Interactivo**: Click en eventos para ver detalles
 * - **Leyenda**: Explicación de colores y estados
 * 
 * @example
 * ```tsx
 * <ReservationCalendar
 *   reservations={reservations}
 *   onSelectReservation={handleSelectReservation}
 * />
 * ```
 */
export const ReservationCalendar: React.FC<ReservationCalendarProps> = ({
  reservations,
  onSelectReservation,
  className = ''
}) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<Reservation | null>(null)
  const [showLegend, setShowLegend] = useState(false)

  // Función para verificar disponibilidad de fecha
  const checkDateAvailability = (date: string, reservations: Reservation[]) => {
    const dateReservations = reservations.filter(
      r => r.fecha_reserva === date && r.estado !== 'cancelada'
    )

    const morningReserved = dateReservations.some(r => r.hora_inicio === '11:00:00')
    const eveningReserved = dateReservations.some(r => r.hora_inicio !== '11:00:00')

    if (morningReserved && eveningReserved) return 'unavailable'
    if (morningReserved || eveningReserved) return 'partial'
    return 'available'
  }

  // Generar días del mes
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const currentDateObj = new Date(startDate)

    for (let i = 0; i < 42; i++) {
      const dateStr = currentDateObj.toISOString().split('T')[0]
      const dayReservations = reservations.filter(r => r.fecha_reserva === dateStr)
      const availability = checkDateAvailability(dateStr, reservations)
      
      days.push({
        date: new Date(currentDateObj),
        dateStr,
        isCurrentMonth: currentDateObj.getMonth() === month,
        reservations: dayReservations,
        availability
      })
      
      currentDateObj.setDate(currentDateObj.getDate() + 1)
    }

    return days
  }

  const days = generateCalendarDays()
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800'
      case 'partial': return 'bg-yellow-100 text-yellow-800'
      case 'unavailable': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className={`h-full ${className}`}>
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 rounded-t-xl">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Calendario de Reservas</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowLegend(!showLegend)}
              className="p-2 rounded-full hover:bg-white/20 transition-colors duration-200 text-white"
              title="Mostrar leyenda"
            >
              <InfoIcon />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white">
        {/* Controles de navegación */}
        <div className="flex justify-between items-center px-2 py-1 mb-4">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-1 rounded-full hover:bg-indigo-100 transition-colors duration-200"
          >
            <ChevronLeftIcon />
          </button>
          <span className="text-lg font-medium text-indigo-800">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={goToToday}
              className="px-2 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-1"
            >
              <CalendarIcon />
              Hoy
            </button>
            <button
              onClick={() => navigateMonth('next')}
              className="p-1 rounded-full hover:bg-indigo-100 transition-colors duration-200"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>

        {/* Leyenda */}
        {showLegend && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded bg-green-500"></div>
                <span>Disponible</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded bg-yellow-500"></div>
                <span>Parcial</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded bg-red-500"></div>
                <span>Ocupado</span>
              </div>
            </div>
          </div>
        )}

        {/* Calendario */}
        <div className="border border-indigo-100 rounded-lg shadow-sm overflow-hidden bg-white">
          {/* Días de la semana */}
          <div className="grid grid-cols-7 bg-gray-50">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                {day}
              </div>
            ))}
          </div>

          {/* Días del mes */}
          <div className="grid grid-cols-7">
            {days.map((day, index) => (
              <div
                key={index}
                className={`
                  min-h-[80px] p-1 border-b border-r border-gray-100 
                  ${day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'}
                  ${day.date.toDateString() === new Date().toDateString() ? 'bg-blue-50' : ''}
                `}
              >
                <div className="text-sm text-gray-600 mb-1">
                  {day.date.getDate()}
                </div>
                
                {/* Reservas del día */}
                <div className="space-y-1">
                  {day.reservations.slice(0, 2).map((reservation, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedEvent(reservation)
                        onSelectReservation?.(reservation)
                      }}
                      className={`
                        text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity
                        ${getAvailabilityColor(day.availability)}
                      `}
                    >
                      #{reservation.id} {reservation.usuario?.nombre || reservation.nombre_festejado || 'Sin nombre'}
                    </div>
                  ))}
                  {day.reservations.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{day.reservations.length - 2} más
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReservationCalendar