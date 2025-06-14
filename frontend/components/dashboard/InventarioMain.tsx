'use client'

/**
 * Componente Principal de Gestión de Inventario
 * @module InventarioMain
 * @description Componente principal para la gestión de inventario del sistema
 */

import React, { useState } from 'react'
import { ItemModal, ScreenSizeAlert } from '@/components/dashboard'

// ============================================================================
// ICONOS SVG
// ============================================================================

const InventoryIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
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

// ============================================================================
// INTERFACES Y TIPOS
// ============================================================================

interface InventoryItem {
  id: string
  name: string
  category: string
  quantity: number
  minStock: number
  price: number
  supplier: string
  status: 'available' | 'low_stock' | 'out_of_stock'
  lastUpdated: string
}

// ============================================================================
// DATOS DE EJEMPLO
// ============================================================================

const mockInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Globos Metálicos',
    category: 'Decoración',
    quantity: 150,
    minStock: 50,
    price: 25,
    supplier: 'Decoraciones SA',
    status: 'available',
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    name: 'Piñatas Personalizadas',
    category: 'Entretenimiento',
    quantity: 12,
    minStock: 15,
    price: 350,
    supplier: 'Piñatas Express',
    status: 'low_stock',
    lastUpdated: '2024-01-14'
  },
  {
    id: '3',
    name: 'Manteles Desechables',
    category: 'Mesa',
    quantity: 0,
    minStock: 20,
    price: 45,
    supplier: 'Suministros Fest',
    status: 'out_of_stock',
    lastUpdated: '2024-01-13'
  }
]

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export function InventarioMain() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)
  const [showAlert, setShowAlert] = useState(true)
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')

  // Filtrar inventario
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Manejar creación/edición de item
  const handleSaveItem = (itemData: any) => {
    if (editingItem) {
      setInventory(inventory.map(item => 
        item.id === editingItem.id ? { ...item, ...itemData, lastUpdated: new Date().toISOString().split('T')[0] } : item
      ))
    } else {
      const newItem: InventoryItem = {
        id: Date.now().toString(),
        ...itemData,
        lastUpdated: new Date().toISOString().split('T')[0]
      }
      setInventory([...inventory, newItem])
    }
    setIsModalOpen(false)
    setEditingItem(null)
  }

  // Manejar eliminación de item
  const handleDeleteItem = (itemId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este item?')) {
      setInventory(inventory.filter(item => item.id !== itemId))
    }
  }

  // Obtener color del estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800'
      case 'low_stock': return 'bg-yellow-100 text-yellow-800'
      case 'out_of_stock': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Obtener texto del estado
  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Disponible'
      case 'low_stock': return 'Stock Bajo'
      case 'out_of_stock': return 'Sin Stock'
      default: return status
    }
  }

  // Obtener categorías únicas
  const categories = Array.from(new Set(inventory.map(item => item.category)))

  // Automáticamente cambiar a vista de tarjetas en pantallas pequeñas
  React.useEffect(() => {
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
              <InventoryIcon />
            </div>
            <span className="truncate">Gestión de Inventario</span>
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-1 font-body-light">
            Administra el inventario de productos y suministros
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
              setEditingItem(null)
              setIsModalOpen(true)
            }}
            className="bg-tramboory-purple-600 hover:bg-tramboory-purple-700 text-white font-bold text-sm md:text-base py-2 px-3 md:px-4 rounded-xl transition-all duration-200 hover:shadow-md flex items-center gap-1 md:gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Nuevo Item</span>
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6 hover:shadow-md transition-shadow duration-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {/* Búsqueda */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-tramboory-purple-500 focus:border-transparent"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </div>
          </div>

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

          {/* Filtro por estado */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-tramboory-purple-500 focus:border-transparent"
            title="Filtrar por estado"
          >
            <option value="all">Todos los estados</option>
            <option value="available">Disponible</option>
            <option value="low_stock">Stock Bajo</option>
            <option value="out_of_stock">Sin Stock</option>
          </select>
        </div>
      </div>

      {/* Vista de Tabla o Tarjetas */}
      {viewMode === 'table' ? (
        /* Tabla de inventario */
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cantidad
                  </th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Proveedor
                  </th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <div className="text-xs sm:text-sm font-medium text-gray-900 font-body-medium">{item.name}</div>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-tramboory-purple-100 text-tramboory-purple-800">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <div className="text-xs sm:text-sm text-gray-900">{item.quantity}</div>
                      <div className="text-xs text-gray-500">Min: {item.minStock}</div>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                      ${item.price}
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      {item.supplier}
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingItem(item)
                            setIsModalOpen(true)
                          }}
                          className="text-tramboory-purple-600 hover:text-tramboory-purple-900 p-1 sm:p-2 rounded transition-colors duration-200"
                          title="Editar"
                          aria-label="Editar item"
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-600 hover:text-red-900 p-1 sm:p-2 rounded transition-colors duration-200"
                          title="Eliminar"
                          aria-label="Eliminar item"
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

          {filteredInventory.length === 0 && (
            <div className="text-center py-8 md:py-12">
              <div className="p-2 bg-tramboory-purple-50 rounded-lg text-tramboory-purple-600 inline-block mb-2">
                <InventoryIcon />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900 font-body-medium">No hay items</h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-500 font-body-light">
                No se encontraron items que coincidan con los filtros aplicados.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Vista de tarjetas para dispositivos móviles */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredInventory.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold text-gray-900 font-body-medium truncate">{item.name}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                    {getStatusText(item.status)}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Categoría:</span>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-tramboory-purple-100 text-tramboory-purple-800">
                      {item.category}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Cantidad:</span>
                    <div className="text-right">
                      <span className="text-xs sm:text-sm text-gray-900">{item.quantity}</span>
                      <span className="text-xs text-gray-500 ml-1">(Min: {item.minStock})</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Precio:</span>
                    <span className="text-xs sm:text-sm font-medium text-gray-900">${item.price}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Proveedor:</span>
                    <span className="text-xs sm:text-sm text-gray-500 truncate max-w-[180px]">{item.supplier}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Actualizado:</span>
                    <span className="text-xs text-gray-500">{item.lastUpdated}</span>
                  </div>
                </div>
                
                <div className="flex justify-end border-t pt-3 mt-3">
                  <button
                    onClick={() => {
                      setEditingItem(item)
                      setIsModalOpen(true)
                    }}
                    className="text-tramboory-purple-600 hover:text-tramboory-purple-900 p-2 rounded transition-colors duration-200 mr-2"
                    title="Editar"
                    aria-label="Editar item"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-red-600 hover:text-red-900 p-2 rounded transition-colors duration-200"
                    title="Eliminar"
                    aria-label="Eliminar item"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredInventory.length === 0 && (
            <div className="col-span-full text-center py-8 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-2 bg-tramboory-purple-50 rounded-lg text-tramboory-purple-600 inline-block mb-2">
                <InventoryIcon />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900 font-body-medium">No hay items</h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-500 font-body-light">
                No se encontraron items que coincidan con los filtros aplicados.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Modal para crear/editar item */}
      {isModalOpen && (
        <ItemModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingItem(null)
          }}
          title={editingItem ? 'Editar Item' : 'Nuevo Item'}
          activeTab="inventory"
          handleSubmit={handleSaveItem}
          editingItem={editingItem}
        />
      )}
    </div>
  )
}