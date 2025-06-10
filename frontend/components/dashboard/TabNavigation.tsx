'use client'

/**
 * Navegación por Pestañas del Dashboard
 * @module TabNavigation
 * @description Componente de navegación por pestañas con dropdown responsive
 */

import React, { useState } from 'react'

// ============================================================================
// ICONOS SVG
// ============================================================================

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

// ============================================================================
// INTERFACES Y TIPOS
// ============================================================================

interface Tab {
  id: string
  label: string
}

interface TabNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  handleAddItem: () => void
  className?: string
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * TabNavigation - Navegación por pestañas del dashboard
 * 
 * ### Características:
 * - **Responsive**: Dropdown en móviles, tabs en desktop
 * - **Botón Agregar**: Contextual según la pestaña activa
 * - **Estado Activo**: Resaltado visual de la pestaña actual
 * 
 * @example
 * ```tsx
 * <TabNavigation
 *   activeTab={activeTab}
 *   setActiveTab={setActiveTab}
 *   handleAddItem={handleAddItem}
 * />
 * ```
 */
export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
  handleAddItem,
  className = ''
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const tabs: Tab[] = [
    { id: 'users', label: 'Usuarios' },
    { id: 'reservations', label: 'Reservas' },
    { id: 'finances', label: 'Finanzas' },
    { id: 'packages', label: 'Paquetes' },
    { id: 'extras', label: 'Extras' },
    { id: 'opcionesAlimento', label: 'Opc. Alimento' },
    { id: 'tematicas', label: 'Temáticas' },
    { id: 'mamparas', label: 'Mamparas' },
    { id: 'payments', label: 'Pagos' },
    { id: 'galeria', label: 'Galería' },
    { id: 'auditoria', label: 'Historial' },
    { id: 'archived', label: 'Archivados' },
  ]

  // Determinar si se debe mostrar el botón de agregar
  const showAddButton = !['auditoria', 'archived'].includes(activeTab)

  return (
    <div className={`flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0 ${className}`}>
      <div className="w-full sm:w-auto relative">
        {/* Dropdown para pantallas pequeñas */}
        <div className="sm:hidden w-full">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex justify-between items-center bg-gray-200 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {tabs.find(tab => tab.id === activeTab)?.label || 'Seleccionar'}
            <div className={`ml-2 transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
              <ChevronDownIcon />
            </div>
          </button>
          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
              {tabs.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => {
                    setActiveTab(id)
                    setIsDropdownOpen(false)
                  }}
                  className={`w-full text-left py-2 px-4 hover:bg-gray-100 ${
                    activeTab === id ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tabs para pantallas medianas y grandes */}
        <div className="hidden sm:flex flex-wrap">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`mr-2 mb-2 py-2 px-4 rounded-lg transition-colors duration-200 ${
                activeTab === id 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      
      {showAddButton && (
        <button
          onClick={handleAddItem}
          className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          <PlusIcon />
          <span className="ml-2">Agregar</span>
        </button>
      )}
    </div>
  )
}

export default TabNavigation