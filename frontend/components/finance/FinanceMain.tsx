'use client'

/**
 * Componente Principal de Finanzas
 * @module FinanceMain
 * @description Panel de gestión financiera y reportes
 */

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'

// ============================================================================
// INTERFACES Y TIPOS
// ============================================================================

interface FinancialMetric {
  id: string
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon: React.ReactNode
  period: string
}

interface Transaction {
  id: string
  type: 'income' | 'expense'
  description: string
  amount: number
  date: string
  category: string
  status: 'completed' | 'pending' | 'cancelled'
}

interface FinanceMainProps {
  className?: string
}

// ============================================================================
// ICONOS SVG
// ============================================================================

const CurrencyIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
)

const TrendUpIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const TrendDownIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
)

const CreditCardIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
)

const ChartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

const DownloadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const FilterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
  </svg>
)

// ============================================================================
// DATOS DE EJEMPLO
// ============================================================================

const financialMetrics: FinancialMetric[] = [
  {
    id: '1',
    title: 'Ingresos Totales',
    value: '$45,230',
    change: '+12.5%',
    changeType: 'positive',
    icon: <TrendUpIcon />,
    period: 'Este mes'
  },
  {
    id: '2',
    title: 'Gastos Totales',
    value: '$18,450',
    change: '+8.2%',
    changeType: 'negative',
    icon: <TrendDownIcon />,
    period: 'Este mes'
  },
  {
    id: '3',
    title: 'Ganancia Neta',
    value: '$26,780',
    change: '+15.3%',
    changeType: 'positive',
    icon: <CurrencyIcon />,
    period: 'Este mes'
  },
  {
    id: '4',
    title: 'Transacciones',
    value: '234',
    change: '+5.1%',
    changeType: 'positive',
    icon: <CreditCardIcon />,
    period: 'Este mes'
  }
]

const sampleTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    description: 'Pago reserva - Fiesta de cumpleaños',
    amount: 2500.00,
    date: '2024-01-15',
    category: 'Reservas',
    status: 'completed'
  },
  {
    id: '2',
    type: 'expense',
    description: 'Compra de globos y decoración',
    amount: 450.00,
    date: '2024-01-14',
    category: 'Inventario',
    status: 'completed'
  },
  {
    id: '3',
    type: 'income',
    description: 'Pago reserva - Evento corporativo',
    amount: 5200.00,
    date: '2024-01-14',
    category: 'Reservas',
    status: 'pending'
  },
  {
    id: '4',
    type: 'expense',
    description: 'Mantenimiento equipo de sonido',
    amount: 800.00,
    date: '2024-01-13',
    category: 'Mantenimiento',
    status: 'completed'
  },
  {
    id: '5',
    type: 'income',
    description: 'Pago reserva - Quinceañera',
    amount: 3200.00,
    date: '2024-01-12',
    category: 'Reservas',
    status: 'completed'
  }
]

// ============================================================================
// COMPONENTES AUXILIARES
// ============================================================================

/**
 * MetricCard - Tarjeta de métrica financiera
 */
const MetricCard: React.FC<{ metric: FinancialMetric }> = ({ metric }) => {
  const changeColorClass = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  }[metric.changeType]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-tramboory-purple-50 rounded-lg text-tramboory-purple-600">
          {metric.icon}
        </div>
        <span className={`text-sm font-medium ${changeColorClass}`}>
          {metric.change}
        </span>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-600 font-body-medium mb-1">
          {metric.title}
        </h3>
        <p className="text-2xl font-bold text-gray-900 font-body-semibold mb-1">
          {metric.value}
        </p>
        <p className="text-xs text-gray-500 font-body-light">
          {metric.period}
        </p>
      </div>
    </div>
  )
}

/**
 * TransactionRow - Fila de transacción
 */
const TransactionRow: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const typeConfig = {
    income: {
      label: 'Ingreso',
      className: 'text-green-600',
      sign: '+'
    },
    expense: {
      label: 'Gasto',
      className: 'text-red-600',
      sign: '-'
    }
  }

  const statusConfig = {
    completed: {
      label: 'Completado',
      className: 'bg-green-50 text-green-700 border-green-200'
    },
    pending: {
      label: 'Pendiente',
      className: 'bg-yellow-50 text-yellow-700 border-yellow-200'
    },
    cancelled: {
      label: 'Cancelado',
      className: 'bg-red-50 text-red-700 border-red-200'
    }
  }

  const config = typeConfig[transaction.type]
  const statusStyle = statusConfig[transaction.status]

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div>
          <div className="text-sm font-medium text-gray-900 font-body-medium">
            {transaction.description}
          </div>
          <div className="text-sm text-gray-500 font-body-light">
            {transaction.category}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`text-sm font-medium ${config.className}`}>
          {config.sign}${transaction.amount.toFixed(2)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-body-regular">
        {new Date(transaction.date).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusStyle.className}`}>
          {statusStyle.label}
        </span>
      </td>
    </tr>
  )
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * FinanceMain - Componente principal de gestión financiera
 * 
 * ### Características:
 * - **Métricas Financieras**: KPIs y resumen de ingresos/gastos
 * - **Historial de Transacciones**: Lista detallada de movimientos
 * - **Reportes**: Generación de reportes financieros
 * - **Filtros**: Filtrado por fecha, tipo y categoría
 * 
 * @example
 * ```tsx
 * <FinanceMain />
 * ```
 */
export const FinanceMain: React.FC<FinanceMainProps> = ({ className = '' }) => {
  const [transactions] = useState<Transaction[]>(sampleTransactions)
  const [filterType, setFilterType] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  // Filtrar transacciones
  const filteredTransactions = transactions.filter(transaction => {
    const matchesType = filterType === 'all' || transaction.type === filterType
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus
    return matchesType && matchesStatus
  })

  const handleExportReport = () => {
    console.log('Exportar reporte financiero')
    // Implementar lógica de exportación
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-body-semibold">
            Finanzas
          </h1>
          <p className="mt-2 text-gray-600 font-body-light">
            Gestión financiera y reportes de ingresos
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button
            variant="primary"
            leftIcon={<DownloadIcon />}
            onClick={handleExportReport}
          >
            Exportar Reporte
          </Button>
        </div>
      </div>

      {/* Métricas financieras */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 font-body-medium mb-6">
          Resumen Financiero
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {financialMetrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      </section>

      {/* Gráfico de ingresos (placeholder) */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 font-body-medium mb-6">
          Tendencia de Ingresos
        </h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
            <div className="text-center">
              <ChartIcon />
              <p className="mt-2 text-sm text-gray-500 font-body-light">
                Gráfico de tendencias (próximamente)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Historial de transacciones */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 font-body-medium">
            Historial de Transacciones
          </h2>
          
          {/* Filtros */}
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <div className="flex items-center space-x-2">
              <FilterIcon />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-tramboory-purple-500 focus:border-tramboory-purple-500 font-body-regular text-sm"
              >
                <option value="all">Todos los tipos</option>
                <option value="income">Ingresos</option>
                <option value="expense">Gastos</option>
              </select>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-tramboory-purple-500 focus:border-tramboory-purple-500 font-body-regular text-sm"
            >
              <option value="all">Todos los estados</option>
              <option value="completed">Completado</option>
              <option value="pending">Pendiente</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-body-medium">
                    Descripción
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-body-medium">
                    Monto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-body-medium">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-body-medium">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <TransactionRow key={transaction.id} transaction={transaction} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Estado vacío */}
          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <CurrencyIcon />
              </div>
              <h3 className="text-lg font-medium text-gray-900 font-body-medium">
                No se encontraron transacciones
              </h3>
              <p className="text-gray-500 font-body-light">
                Intenta ajustar los filtros para ver más resultados.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default FinanceMain