/**
 * Componente Principal del Dashboard
 * @module DashboardMain
 * @description Panel principal con métricas y resumen del sistema
 */

import React from 'react'

// ============================================================================
// INTERFACES Y TIPOS
// ============================================================================

interface MetricCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: React.ReactNode
  description?: string
}

interface DashboardMainProps {
  className?: string
}

// ============================================================================
// ICONOS SVG
// ============================================================================

const TrendUpIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const TrendDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v14a2 2 0 002 2z" />
  </svg>
)

const CurrencyIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
)

const UsersIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

const PackageIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
)

// ============================================================================
// COMPONENTES AUXILIARES
// ============================================================================

/**
 * MetricCard - Tarjeta de métrica individual
 */
const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  description
}) => {
  const changeColorClass = {
    positive: 'text-green-600 bg-green-50',
    negative: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-50'
  }[changeType]

  const changeIcon = changeType === 'positive' ? <TrendUpIcon /> : 
                   changeType === 'negative' ? <TrendDownIcon /> : null

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-tramboory-purple-50 rounded-lg text-tramboory-purple-600">
            {icon}
          </div>
          <h3 className="text-sm font-medium text-gray-600 font-body-medium">
            {title}
          </h3>
        </div>
      </div>

      {/* Valor principal */}
      <div className="mb-2">
        <p className="text-2xl font-bold text-gray-900 font-body-semibold">
          {value}
        </p>
        {description && (
          <p className="text-sm text-gray-500 font-body-light">
            {description}
          </p>
        )}
      </div>

      {/* Cambio/Tendencia */}
      {change && (
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${changeColorClass}`}>
          {changeIcon && <span className="mr-1">{changeIcon}</span>}
          {change}
        </div>
      )}
    </div>
  )
}

/**
 * QuickActionCard - Tarjeta de acción rápida
 */
const QuickActionCard: React.FC<{
  title: string
  description: string
  icon: React.ReactNode
  href: string
  color: string
}> = ({ title, description, icon, href, color }) => (
  <a
    href={href}
    className={`block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:scale-105 group`}
  >
    <div className="flex items-center space-x-4">
      <div className={`p-3 rounded-lg ${color} group-hover:scale-110 transition-transform duration-200`}>
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 font-body-medium group-hover:text-tramboory-purple-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600 font-body-light">
          {description}
        </p>
      </div>
    </div>
  </a>
)

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * DashboardMain - Componente principal del dashboard
 * 
 * ### Características:
 * - **Métricas Clave**: Visualización de KPIs importantes
 * - **Acciones Rápidas**: Enlaces directos a funciones principales
 * - **Resumen Visual**: Cards informativos con iconografía
 * - **Responsive**: Adaptable a diferentes tamaños de pantalla
 * 
 * @example
 * ```tsx
 * <DashboardMain />
 * ```
 */
export const DashboardMain: React.FC<DashboardMainProps> = ({ className = '' }) => {
  // Datos de ejemplo - en producción vendrían de una API
  const metrics = [
    {
      title: 'Reservas Hoy',
      value: '12',
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: <CalendarIcon />,
      description: 'vs. ayer'
    },
    {
      title: 'Ingresos del Mes',
      value: '$45,230',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: <CurrencyIcon />,
      description: 'vs. mes anterior'
    },
    {
      title: 'Clientes Activos',
      value: '1,234',
      change: '+5.1%',
      changeType: 'positive' as const,
      icon: <UsersIcon />,
      description: 'este mes'
    },
    {
      title: 'Productos en Stock',
      value: '89',
      change: '-2.3%',
      changeType: 'negative' as const,
      icon: <PackageIcon />,
      description: 'requieren atención'
    }
  ]

  const quickActions = [
    {
      title: 'Nueva Reserva',
      description: 'Crear una nueva reserva para cliente',
      icon: <CalendarIcon />,
      href: '/dashboard/reservas/nueva',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Gestionar Inventario',
      description: 'Actualizar stock y productos',
      icon: <PackageIcon />,
      href: '/dashboard/inventario',
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Ver Finanzas',
      description: 'Revisar reportes financieros',
      icon: <CurrencyIcon />,
      href: '/dashboard/finanzas',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Gestionar Usuarios',
      description: 'Administrar cuentas de usuario',
      icon: <UsersIcon />,
      href: '/dashboard/usuarios',
      color: 'bg-orange-50 text-orange-600'
    }
  ]

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 font-body-semibold mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 font-body-light">
          Bienvenido al panel de administración de Tramboory
        </p>
      </div>

      {/* Métricas principales */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 font-body-medium mb-6">
          Métricas Principales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>
      </section>

      {/* Acciones rápidas */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 font-body-medium mb-6">
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action, index) => (
            <QuickActionCard key={index} {...action} />
          ))}
        </div>
      </section>

      {/* Actividad reciente */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 font-body-medium mb-6">
          Actividad Reciente
        </h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="space-y-4">
            {[
              { action: 'Nueva reserva creada', time: 'Hace 5 minutos', user: 'María González' },
              { action: 'Producto actualizado en inventario', time: 'Hace 15 minutos', user: 'Sistema' },
              { action: 'Pago procesado', time: 'Hace 30 minutos', user: 'Carlos Ruiz' },
              { action: 'Usuario registrado', time: 'Hace 1 hora', user: 'Ana López' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="text-sm font-medium text-gray-900 font-body-medium">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 font-body-light">
                    por {activity.user}
                  </p>
                </div>
                <span className="text-xs text-gray-400 font-body-light">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default DashboardMain