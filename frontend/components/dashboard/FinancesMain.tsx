'use client'

/**
 * Componente Principal de Gestión de Finanzas
 * @module FinancesMain
 * @description Componente principal para la gestión financiera del sistema
 */

import React, { useState, useEffect } from 'react'
import { ItemModal, MonthSelector, ScreenSizeAlert } from '@/components/dashboard'

// ============================================================================
// ICONOS SVG
// ============================================================================

const DollarSignIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
)

const TrendingUpIcon = () => (
  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const TrendingDownIcon = () => (
  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
)

const CreditCardIcon = () => (
  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
)

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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

// Calendar icon that properly accepts className prop
const CalendarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    width="24" 
    height="24" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

// ============================================================================
// INTERFACES Y TIPOS
// ============================================================================

interface Transaction {
  id: string
  type: 'income' | 'expense'
  category: string
  description: string
  amount: number
  date: string
  paymentMethod: string
  reference?: string
  status: 'completed' | 'pending' | 'cancelled'
  createdAt: string
}

interface FinancialSummary {
  totalIncome: number
  totalExpenses: number
  netProfit: number
  pendingPayments: number
}

// ============================================================================
// DATOS DE EJEMPLO
// ============================================================================

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    category: 'Reservas',
    description: 'Pago reserva - Ana García',
    amount: 8500,
    date: '2024-01-15',
    paymentMethod: 'Transferencia',
    reference: 'REF001',
    status: 'completed',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    type: 'expense',
    category: 'Suministros',
    description: 'Compra decoraciones',
    amount: 1200,
    date: '2024-01-14',
    paymentMethod: 'Efectivo',
    status: 'completed',
    createdAt: '2024-01-14'
  },
  {
    id: '3',
    type: 'income',
    category: 'Extras',
    description: 'Venta extras - Carlos López',
    amount: 500,
    date: '2024-01-13',
    paymentMethod: 'Tarjeta',
    reference: 'REF002',
    status: 'pending',
    createdAt: '2024-01-13'
  },
  {
    id: '4',
    type: 'expense',
    category: 'Servicios',
    description: 'Pago electricidad',
    amount: 800,
    date: '2024-01-12',
    paymentMethod: 'Transferencia',
    status: 'completed',
    createdAt: '2024-01-12'
  }
]

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * FinancesMain - Componente de gestión financiera
 * 
 * ### Características:
 * - **Resumen Financiero**: Métricas clave de ingresos y gastos
 * - **Transacciones**: Listado completo de movimientos
 * - **Filtros**: Búsqueda y filtrado por tipo/categoría
 * - **CRUD**: Crear, editar y eliminar transacciones
 */
export function FinancesMain() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [showAlert, setShowAlert] = useState(false) // Cambiado a false ya que implementamos diseño responsive
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')

  // Calcular resumen financiero
  const calculateSummary = (): FinancialSummary => {
    const filteredByDate = transactions.filter(t => {
      const transactionDate = new Date(t.date)
      return transactionDate.getMonth() === selectedMonth && 
             transactionDate.getFullYear() === selectedYear
    })

    const totalIncome = filteredByDate
      .filter(t => t.type === 'income' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0)

    const totalExpenses = filteredByDate
      .filter(t => t.type === 'expense' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0)

    const pendingPayments = filteredByDate
      .filter(t => t.status === 'pending')
      .reduce((sum, t) => sum + t.amount, 0)

    return {
      totalIncome,
      totalExpenses,
      netProfit: totalIncome - totalExpenses,
      pendingPayments
    }
  }

  const summary = calculateSummary()

  // Filtrar transacciones
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || transaction.type === selectedType
    const matchesCategory = selectedCategory === 'all' || transaction.category === selectedCategory
    
    const transactionDate = new Date(transaction.date)
    const matchesMonth = transactionDate.getMonth() === selectedMonth
    const matchesYear = transactionDate.getFullYear() === selectedYear
    
    return matchesSearch && matchesType && matchesCategory && matchesMonth && matchesYear
  })

  // Manejar creación/edición de transacción
  const handleSaveTransaction = (transactionData: any) => {
    if (editingTransaction) {
      setTransactions(transactions.map(transaction => 
        transaction.id === editingTransaction.id ? { ...transaction, ...transactionData } : transaction
      ))
    } else {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        ...transactionData,
        createdAt: new Date().toISOString().split('T')[0]
      }
      setTransactions([...transactions, newTransaction])
    }
    setIsModalOpen(false)
    setEditingTransaction(null)
  }

  // Manejar eliminación de transacción
  const handleDeleteTransaction = (transactionId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta transacción?')) {
      setTransactions(transactions.filter(transaction => transaction.id !== transactionId))
    }
  }

  // Obtener color del tipo
  const getTypeColor = (type: string) => {
    return type === 'income' ? 'text-green-600' : 'text-red-600'
  }

  // Obtener color del estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Obtener texto del estado
  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completado'
      case 'pending': return 'Pendiente'
      case 'cancelled': return 'Cancelado'
      default: return status
    }
  }

  // Obtener categorías únicas
  const categories = Array.from(new Set(transactions.map(t => t.category)))

  // Automáticamente cambiar a vista de tarjetas en pantallas pequeñas
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewMode('cards')
      } else {
        setViewMode('table')
      }
    }
    
    // Inicializar basado en el tamaño actual
    handleResize()
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="p-3 sm:p-4 md:p-6 pb-16 space-y-4 md:space-y-8">
      {/* Alerta de tamaño de pantalla - Ahora oculto ya que implementamos vista responsiva */}
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
              <DollarSignIcon />
            </div>
            <span className="truncate">Gestión Financiera</span>
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-1 font-body-light">
            Administra ingresos, gastos y reportes financieros
          </p>
        </div>
        <div className="flex gap-2 mt-3 sm:mt-0">
          <button
            onClick={() => setViewMode(viewMode === 'table' ? 'cards' : 'table')}
            className="bg-gray-600 hover:bg-gray-700 text-white text-sm md:text-base py-2 px-3 md:px-4 rounded-xl transition-all duration-200 hover:shadow-md"
          >
            {viewMode === 'table' ? 'Vista Tarjetas' : 'Vista Tabla'}
          </button>
          <button
            onClick={() => {
              setEditingTransaction(null)
              setIsModalOpen(true)
            }}
            className="bg-tramboory-purple-600 hover:bg-tramboory-purple-700 text-white font-bold text-sm md:text-base py-2 px-3 md:px-4 rounded-xl transition-all duration-200 hover:shadow-md flex items-center gap-1 md:gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Nueva Transacción</span>
          </button>
        </div>
      </div>

      {/* Resumen Financiero - Responsivo para diferentes tamaños de pantalla */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 font-body-medium">Ingresos</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600">
                ${summary.totalIncome.toLocaleString()}
              </p>
            </div>
            <div className="p-2 sm:p-3 bg-green-100 rounded-full transition-transform duration-200 hover:scale-110">
              <TrendingUpIcon />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 font-body-medium">Gastos</p>
              <p className="text-xl sm:text-2xl font-bold text-red-600">
                ${summary.totalExpenses.toLocaleString()}
              </p>
            </div>
            <div className="p-2 sm:p-3 bg-red-100 rounded-full transition-transform duration-200 hover:scale-110">
              <TrendingDownIcon />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 font-body-medium">Ganancia Neta</p>
              <p className={`text-xl sm:text-2xl font-bold ${summary.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${summary.netProfit.toLocaleString()}
              </p>
            </div>
            <div className={`p-2 sm:p-3 rounded-full ${summary.netProfit >= 0 ? 'bg-green-100' : 'bg-red-100'} transition-transform duration-200 hover:scale-110`}>
              <DollarSignIcon />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 font-body-medium">Pagos Pendientes</p>
              <p className="text-xl sm:text-2xl font-bold text-yellow-600">
                ${summary.pendingPayments.toLocaleString()}
              </p>
            </div>
            <div className="p-2 sm:p-3 bg-yellow-100 rounded-full transition-transform duration-200 hover:scale-110">
              <CreditCardIcon />
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6 hover:shadow-md transition-shadow duration-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
          {/* Búsqueda */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar transacciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-tramboory-purple-500 focus:border-transparent"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </div>
          </div>

          {/* Filtro por tipo */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-tramboory-purple-500 focus:border-transparent"
            title="Filtrar por tipo"
          >
            <option value="all">Todos los tipos</option>
            <option value="income">Ingresos</option>
            <option value="expense">Gastos</option>
          </select>

          {/* Filtro por categoría */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-tramboory-purple-500 focus:border-transparent"
            title="Filtrar por categoría"
          >
            <option value="all">Todas las categorías</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Selector de mes/año - Ocupando 2 columnas en pantallas grandes */}
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

      {/* Tabla o Tarjetas de transacciones */}
      {viewMode === 'table' ? (
        /* Tabla de transacciones */
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monto
                  </th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                      {transaction.date}
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4">
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-gray-900 font-body-medium">{transaction.description}</div>
                        {transaction.reference && (
                          <div className="text-xs text-gray-500">Ref: {transaction.reference}</div>
                        )}
                        <div className="text-xs text-gray-500">{transaction.paymentMethod}</div>
                      </div>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-tramboory-purple-100 text-tramboory-purple-800">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <span className={`text-xs sm:text-sm font-medium ${getTypeColor(transaction.type)}`}>
                        {transaction.type === 'income' ? 'Ingreso' : 'Gasto'}
                      </span>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <span className={`text-xs sm:text-sm font-bold ${getTypeColor(transaction.type)}`}>
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                        {getStatusText(transaction.status)}
                      </span>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <button
                          onClick={() => {
                            setEditingTransaction(transaction)
                            setIsModalOpen(true)
                          }}
                          className="text-tramboory-purple-600 hover:text-tramboory-purple-900 p-1 sm:p-2 rounded transition-colors duration-200"
                          title="Editar transacción"
                          aria-label="Editar transacción"
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => handleDeleteTransaction(transaction.id)}
                          className="text-red-600 hover:text-red-900 p-1 sm:p-2 rounded transition-colors duration-200"
                          title="Eliminar transacción"
                          aria-label="Eliminar transacción"
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

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8 md:py-12">
              <div className="p-2 bg-tramboory-purple-50 rounded-lg text-tramboory-purple-600 inline-block mb-2">
                <DollarSignIcon />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900 font-body-medium">No hay transacciones</h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-500 font-body-light">
                No se encontraron transacciones que coincidan con los filtros aplicados.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Vista de tarjetas para dispositivos móviles */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'} mr-3`}>
                      {transaction.type === 'income' ? <TrendingUpIcon /> : <TrendingDownIcon />}
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 font-body-medium truncate max-w-[150px]">
                        {transaction.description}
                      </h3>
                      <div className="flex items-center text-xs text-gray-500 gap-1">
                        <CalendarIcon className="w-3 h-3" />
                        <span>{transaction.date}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                    {getStatusText(transaction.status)}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Categoría:</span>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-tramboory-purple-100 text-tramboory-purple-800">
                      {transaction.category}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Tipo:</span>
                    <span className={`text-xs font-medium ${getTypeColor(transaction.type)}`}>
                      {transaction.type === 'income' ? 'Ingreso' : 'Gasto'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Monto:</span>
                    <span className={`text-sm font-bold ${getTypeColor(transaction.type)}`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Método:</span>
                    <span className="text-xs text-gray-700">{transaction.paymentMethod}</span>
                  </div>
                  
                  {transaction.reference && (
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Referencia:</span>
                      <span className="text-xs text-gray-700">{transaction.reference}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end border-t pt-3 mt-3">
                  <button
                    onClick={() => {
                      setEditingTransaction(transaction)
                      setIsModalOpen(true)
                    }}
                    className="text-tramboory-purple-600 hover:text-tramboory-purple-900 p-2 rounded transition-colors duration-200 mr-2"
                    title="Editar transacción"
                    aria-label="Editar transacción"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => handleDeleteTransaction(transaction.id)}
                    className="text-red-600 hover:text-red-900 p-2 rounded transition-colors duration-200"
                    title="Eliminar transacción"
                    aria-label="Eliminar transacción"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredTransactions.length === 0 && (
            <div className="col-span-full text-center py-8 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-2 bg-tramboory-purple-50 rounded-lg text-tramboory-purple-600 inline-block mb-2">
                <DollarSignIcon />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900 font-body-medium">No hay transacciones</h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-500 font-body-light">
                No se encontraron transacciones que coincidan con los filtros aplicados.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Modal para crear/editar transacción */}
      {isModalOpen && (
        <ItemModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingTransaction(null)
          }}
          title={editingTransaction ? 'Editar Transacción' : 'Nueva Transacción'}
          activeTab="finances"
          handleSubmit={handleSaveTransaction}
          editingItem={editingTransaction}
        />
      )}
    </div>
  )
}