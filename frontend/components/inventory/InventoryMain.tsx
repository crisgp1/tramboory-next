/**
 * Componente Principal de Inventario
 * @module InventoryMain
 * @description Gestión completa del inventario de productos
 */

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'

// ============================================================================
// INTERFACES Y TIPOS
// ============================================================================

interface Product {
  id: string
  name: string
  category: string
  stock: number
  minStock: number
  price: number
  status: 'available' | 'low_stock' | 'out_of_stock'
  lastUpdated: string
}

interface InventoryMainProps {
  className?: string
}

// ============================================================================
// ICONOS SVG
// ============================================================================

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
)

const FilterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
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

// ============================================================================
// DATOS DE EJEMPLO
// ============================================================================

const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Globos Metálicos Dorados',
    category: 'Decoración',
    stock: 150,
    minStock: 50,
    price: 25.00,
    status: 'available',
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    name: 'Mesa Redonda 8 personas',
    category: 'Mobiliario',
    stock: 12,
    minStock: 15,
    price: 180.00,
    status: 'low_stock',
    lastUpdated: '2024-01-14'
  },
  {
    id: '3',
    name: 'Sonido Profesional',
    category: 'Audio',
    stock: 0,
    minStock: 2,
    price: 500.00,
    status: 'out_of_stock',
    lastUpdated: '2024-01-13'
  },
  {
    id: '4',
    name: 'Luces LED Multicolor',
    category: 'Iluminación',
    stock: 25,
    minStock: 10,
    price: 75.00,
    status: 'available',
    lastUpdated: '2024-01-15'
  },
  {
    id: '5',
    name: 'Sillas Chiavari',
    category: 'Mobiliario',
    stock: 8,
    minStock: 20,
    price: 35.00,
    status: 'low_stock',
    lastUpdated: '2024-01-12'
  }
]

// ============================================================================
// COMPONENTES AUXILIARES
// ============================================================================

/**
 * StatusBadge - Badge de estado del producto
 */
const StatusBadge: React.FC<{ status: Product['status'] }> = ({ status }) => {
  const statusConfig = {
    available: {
      label: 'Disponible',
      className: 'bg-green-50 text-green-700 border-green-200'
    },
    low_stock: {
      label: 'Stock Bajo',
      className: 'bg-yellow-50 text-yellow-700 border-yellow-200'
    },
    out_of_stock: {
      label: 'Agotado',
      className: 'bg-red-50 text-red-700 border-red-200'
    }
  }

  const config = statusConfig[status]

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${config.className}`}>
      {config.label}
    </span>
  )
}

/**
 * ProductRow - Fila de producto en la tabla
 */
const ProductRow: React.FC<{ product: Product; onEdit: (id: string) => void; onDelete: (id: string) => void }> = ({
  product,
  onEdit,
  onDelete
}) => (
  <tr className="hover:bg-gray-50 transition-colors">
    <td className="px-6 py-4 whitespace-nowrap">
      <div>
        <div className="text-sm font-medium text-gray-900 font-body-medium">
          {product.name}
        </div>
        <div className="text-sm text-gray-500 font-body-light">
          {product.category}
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-body-regular">
      {product.stock}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-body-regular">
      {product.minStock}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-body-regular">
      ${product.price.toFixed(2)}
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <StatusBadge status={product.status} />
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-body-light">
      {new Date(product.lastUpdated).toLocaleDateString()}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(product.id)}
          leftIcon={<EditIcon />}
        >
          Editar
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(product.id)}
          leftIcon={<TrashIcon />}
          className="text-red-600 hover:text-red-700"
        >
          Eliminar
        </Button>
      </div>
    </td>
  </tr>
)

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * InventoryMain - Componente principal de gestión de inventario
 * 
 * ### Características:
 * - **Lista de Productos**: Tabla completa con información detallada
 * - **Filtros y Búsqueda**: Herramientas de filtrado avanzado
 * - **Gestión de Stock**: Alertas de stock bajo y agotado
 * - **Acciones CRUD**: Crear, editar y eliminar productos
 * 
 * @example
 * ```tsx
 * <InventoryMain />
 * ```
 */
export const InventoryMain: React.FC<InventoryMainProps> = ({ className = '' }) => {
  const [products] = useState<Product[]>(sampleProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  // Filtrar productos
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || product.status === filterStatus
    return matchesSearch && matchesFilter
  })

  // Handlers
  const handleEdit = (id: string) => {
    console.log('Editar producto:', id)
    // Implementar lógica de edición
  }

  const handleDelete = (id: string) => {
    console.log('Eliminar producto:', id)
    // Implementar lógica de eliminación
  }

  const handleAddProduct = () => {
    console.log('Agregar nuevo producto')
    // Implementar lógica de creación
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-body-semibold">
            Inventario
          </h1>
          <p className="mt-2 text-gray-600 font-body-light">
            Gestiona el inventario de productos y servicios
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button
            variant="primary"
            leftIcon={<PlusIcon />}
            onClick={handleAddProduct}
          >
            Agregar Producto
          </Button>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Búsqueda */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-tramboory-purple-500 focus:border-tramboory-purple-500 font-body-regular"
            />
          </div>

          {/* Filtro de estado */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FilterIcon />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-tramboory-purple-500 focus:border-tramboory-purple-500 font-body-regular"
              >
                <option value="all">Todos los estados</option>
                <option value="available">Disponible</option>
                <option value="low_stock">Stock Bajo</option>
                <option value="out_of_stock">Agotado</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de productos */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-body-medium">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-body-medium">
                  Stock Actual
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-body-medium">
                  Stock Mínimo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-body-medium">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-body-medium">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-body-medium">
                  Última Actualización
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-body-medium">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Estado vacío */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 font-body-medium">
              No se encontraron productos
            </h3>
            <p className="text-gray-500 font-body-light">
              Intenta ajustar los filtros o agregar nuevos productos.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default InventoryMain