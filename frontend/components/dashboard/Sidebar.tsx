'use client'

/**
 * Componente Sidebar para Dashboard
 * @module Sidebar
 * @description Sidebar con navegación e iconos para el dashboard administrativo
 */

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// ============================================================================
// INTERFACES Y TIPOS
// ============================================================================

interface SidebarItem {
  href: string
  label: string
  icon: React.ReactNode
  description?: string
}

interface SidebarProps {
  className?: string
}

// ============================================================================
// ICONOS SVG
// ============================================================================

const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
  </svg>
)

const InventoryIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
)

const CatalogIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
)

const FinanceIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
)

const ReservationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v14a2 2 0 002 2z" />
  </svg>
)

const GalleryIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const SecurityIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

// ============================================================================
// CONFIGURACIÓN DE NAVEGACIÓN
// ============================================================================

const sidebarItems: SidebarItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: <DashboardIcon />,
    description: 'Panel principal'
  },
  {
    href: '/dashboard/inventario',
    label: 'Inventario',
    icon: <InventoryIcon />,
    description: 'Gestión de productos'
  },
  {
    href: '/dashboard/packages',
    label: 'Paquetes',
    icon: <CatalogIcon />,
    description: 'Paquetes y servicios'
  },
  {
    href: '/dashboard/finances',
    label: 'Finanzas',
    icon: <FinanceIcon />,
    description: 'Reportes financieros'
  },
  {
    href: '/dashboard/reservas',
    label: 'Reservas',
    icon: <ReservationIcon />,
    description: 'Gestión de reservas'
  },
  {
    href: '/dashboard/galeria',
    label: 'Galería',
    icon: <GalleryIcon />,
    description: 'Gestión de imágenes'
  },
  {
    href: '/dashboard/users',
    label: 'Usuarios',
    icon: <UsersIcon />,
    description: 'Gestión de usuarios'
  },
  {
    href: '/dashboard/seguridad',
    label: 'Seguridad',
    icon: <SecurityIcon />,
    description: 'Configuración de seguridad'
  }
]

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * Sidebar - Componente de navegación lateral para dashboard
 * 
 * ### Características:
 * - **Navegación Intuitiva**: Enlaces organizados con iconos descriptivos
 * - **Estado Activo**: Resaltado visual del elemento actual
 * - **Responsive**: Adaptable a diferentes tamaños de pantalla
 * - **Accesibilidad**: ARIA labels y navegación por teclado
 * 
 * @example
 * ```tsx
 * <Sidebar className="custom-sidebar" />
 * ```
 */
export const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const pathname = usePathname()

  return (
    <aside className={`w-64 min-h-screen bg-white shadow-lg border-r border-gray-200 ${className}`}>
      {/* Header del Sidebar */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-tramboory-purple-500 to-tramboory-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 font-body-medium">
              Tramboory
            </h2>
            <p className="text-xs text-gray-500 font-body-light">
              Panel Administrativo
            </p>
          </div>
        </div>
      </div>

      {/* Navegación */}
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                group flex items-center px-3 py-3 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-tramboory-purple-50 text-tramboory-purple-700 border-l-4 border-tramboory-purple-500' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Icono */}
              <div className={`
                flex-shrink-0 mr-3 transition-colors duration-200
                ${isActive ? 'text-tramboory-purple-600' : 'text-gray-400 group-hover:text-gray-600'}
              `}>
                {item.icon}
              </div>
              
              {/* Contenido */}
              <div className="flex-1 min-w-0">
                <p className={`
                  text-sm font-medium truncate font-body-medium
                  ${isActive ? 'text-tramboory-purple-700' : 'text-gray-900'}
                `}>
                  {item.label}
                </p>
                {item.description && (
                  <p className={`
                    text-xs truncate font-body-light
                    ${isActive ? 'text-tramboory-purple-600' : 'text-gray-500'}
                  `}>
                    {item.description}
                  </p>
                )}
              </div>

              {/* Indicador activo */}
              {isActive && (
                <div className="w-2 h-2 bg-tramboory-purple-500 rounded-full flex-shrink-0" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer del Sidebar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-center">
          <p className="text-xs text-gray-500 font-body-light">
            Versión 1.0.0
          </p>
          <p className="text-xs text-gray-400 font-body-light">
            © 2024 Tramboory
          </p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar