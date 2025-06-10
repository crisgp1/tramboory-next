'use client'

/**
 * Selector de Mes y Año
 * @module MonthSelector
 * @description Componente para seleccionar mes y año en el dashboard
 */

import React from 'react'

// ============================================================================
// INTERFACES Y TIPOS
// ============================================================================

interface MonthSelectorProps {
  selectedMonth: number
  setSelectedMonth: (month: number) => void
  selectedYear: number
  setSelectedYear: (year: number) => void
  className?: string
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * MonthSelector - Selector de mes y año
 * 
 * ### Características:
 * - **Selección de Mes**: Dropdown con nombres de meses
 * - **Selección de Año**: Dropdown con rango de años
 * - **Visualización**: Muestra la selección actual
 * 
 * @example
 * ```tsx
 * <MonthSelector
 *   selectedMonth={selectedMonth}
 *   setSelectedMonth={setSelectedMonth}
 *   selectedYear={selectedYear}
 *   setSelectedYear={setSelectedYear}
 * />
 * ```
 */
export const MonthSelector: React.FC<MonthSelectorProps> = ({
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  className = ''
}) => {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i)

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  return (
    <div className={`mt-8 flex justify-end gap-4 items-center ${className}`}>
      <div className="flex gap-2 items-center">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          className="bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {months.map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className="bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="text-sm text-gray-600">
        {months[selectedMonth]} {selectedYear}
      </div>
    </div>
  )
}

export default MonthSelector