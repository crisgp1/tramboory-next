'use client'

/**
 * Componente Principal de Gestión de Paquetes
 * @module PackagesMain
 * @description Componente principal para la gestión de paquetes del sistema
 */

import React, { useState } from 'react'
import { ItemModal, ScreenSizeAlert } from '@/components/dashboard'

// ============================================================================
// ICONOS SVG
// ============================================================================

const PackageIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
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

const StarIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

// ============================================================================
// INTERFACES Y TIPOS
// ============================================================================

interface Package {
  id: string
  name: string
  description: string
  price: number
  duration: number // en horas
  maxGuests: number
  includes: string[]
  category: 'basic' | 'premium' | 'deluxe' | 'custom'
  status: 'active' | 'inactive'
  popularity: number // 1-5 estrellas
  createdAt: string
  updatedAt: string
}

// ============================================================================
// DATOS DE EJEMPLO
// ============================================================================

const mockPackages: Package[] = [
  {
    id: '1',
    name: 'Paquete Básico',
    description: 'Perfecto para celebraciones pequeñas e íntimas',
    price: 5500,
    duration: 3,
    maxGuests: 15,
    includes: [
      'Salón decorado',
      'Mesa de dulces básica',
      'Animación 2 horas',
      'Música y sonido',
      'Limpieza incluida'
    ],
    category: 'basic',
    status: 'active',
    popularity: 4,
    createdAt: '2023-12-01',
    updatedAt: '2024-01-10'
  },
  {
    id: '2',
    name: 'Paquete Premium',
    description: 'La opción más popular para fiestas memorables',
    price: 8500,
    duration: 4,
    maxGuests: 25,
    includes: [
      'Salón decorado premium',
      'Mesa de dulces completa',
      'Animación 3 horas',
      'Música y sonido profesional',
      'Fotografía básica',
      'Piñata incluida',
      'Limpieza incluida'
    ],
    category: 'premium',
    status: 'active',
    popularity: 5,
    createdAt: '2023-11-15',
    updatedAt: '2024-01-08'
  },
  {
    id: '3',
    name: 'Paquete Deluxe',
    description: 'La experiencia más completa y lujosa',
    price: 12000,
    duration: 5,
    maxGuests: 35,
    includes: [
      'Salón decorado deluxe',
      'Mesa de dulces gourmet',
      'Animación 4 horas',
      'Música y sonido premium',
      'Fotografía profesional',
      'Video del evento',
      'Piñata personalizada',
      'Recuerdos para invitados',
      'Limpieza incluida'
    ],
    category: 'deluxe',
    status: 'active',
    popularity: 5,
    createdAt: '2023-10-20',
    updatedAt: '2024-01-05'
  },
  {
    id: '4',
    name: 'Paquete Personalizado',
    description: 'Diseñado específicamente según tus necesidades',
    price: 15000,
    duration: 6,
    maxGuests: 50,
    includes: [
      'Consulta personalizada',
      'Decoración temática única',
      'Servicios a medida',
      'Coordinación completa'
    ],
    category: 'custom',
    status: 'inactive',
    popularity: 3,
    createdAt: '2023-09-10',
    updatedAt: '2023-12-20'
  }
]

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * PackagesMain - Componente de gestión de paquetes
 * 
 * ### Características:
 * - **Catálogo de Paquetes**: Vista de tarjetas con información detallada
 * - **Filtros**: Búsqueda y filtrado por categoría/estado
 * - **CRUD**: Crear, editar y eliminar paquetes
 * - **Vista Detallada**: Modal con información completa
 */
export function PackagesMain() {
  const [packages, setPackages] = useState<Package[]>(mockPackages)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPackage, setEditingPackage] = useState<Package | null>(null)
  const [showAlert, setShowAlert] = useState(true)

  // Filtrar paquetes
  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || pkg.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || pkg.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Manejar creación/edición de paquete
  const handleSavePackage = (packageData: any) => {
    if (editingPackage) {
      setPackages(packages.map(pkg => 
        pkg.id === editingPackage.id ? { ...pkg, ...packageData, updatedAt: new Date().toISOString().split('T')[0] } : pkg
      ))
    } else {
      const newPackage: Package = {
        id: Date.now().toString(),
        ...packageData,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      }
      setPackages([...packages, newPackage])
    }
    setIsModalOpen(false)
    setEditingPackage(null)
  }

  // Manejar eliminación de paquete
  const handleDeletePackage = (packageId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este paquete?')) {
      setPackages(packages.filter(pkg => pkg.id !== packageId))
    }
  }


  // Obtener color de la categoría
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'basic': return 'bg-blue-100 text-blue-800'
      case 'premium': return 'bg-purple-100 text-purple-800'
      case 'deluxe': return 'bg-yellow-100 text-yellow-800'
      case 'custom': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Obtener texto de la categoría
  const getCategoryText = (category: string) => {
    switch (category) {
      case 'basic': return 'Básico'
      case 'premium': return 'Premium'
      case 'deluxe': return 'Deluxe'
      case 'custom': return 'Personalizado'
      default: return category
    }
  }

  // Obtener color del estado
  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  // Renderizar estrellas de popularidad
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        <StarIcon />
      </div>
    ))
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
            <PackageIcon />
            Gestión de Paquetes
          </h1>
          <p className="text-gray-600 mt-1">
            Administra los paquetes de servicios disponibles
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            {viewMode === 'grid' ? 'Vista Lista' : 'Vista Tarjetas'}
          </button>
          <button
            onClick={() => {
              setEditingPackage(null)
              setIsModalOpen(true)
            }}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nuevo Paquete
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Búsqueda */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar paquetes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </div>
          </div>

          {/* Filtro por categoría */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">Todas las categorías</option>
            <option value="basic">Básico</option>
            <option value="premium">Premium</option>
            <option value="deluxe">Deluxe</option>
            <option value="custom">Personalizado</option>
          </select>

          {/* Filtro por estado */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </select>
        </div>
      </div>

      {/* Vista de paquetes */}
      {viewMode === 'grid' ? (
        /* Vista de tarjetas */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{pkg.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(pkg.category)}`}>
                        {getCategoryText(pkg.category)}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(pkg.status)}`}>
                        {pkg.status === 'active' ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">${pkg.price.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">{pkg.duration}h • {pkg.maxGuests} invitados</div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Incluye:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {pkg.includes.slice(0, 3).map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                    {pkg.includes.length > 3 && (
                      <li className="text-purple-600 text-xs">+{pkg.includes.length - 3} más...</li>
                    )}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {renderStars(pkg.popularity)}
                    <span className="text-sm text-gray-500 ml-1">({pkg.popularity}/5)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        // Ver detalles
                        console.log('Ver detalles:', pkg)
                      }}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded"
                      title="Ver detalles"
                    >
                      <EyeIcon />
                    </button>
                    <button
                      onClick={() => {
                        setEditingPackage(pkg)
                        setIsModalOpen(true)
                      }}
                      className="text-purple-600 hover:text-purple-900 p-1 rounded"
                      title="Editar"
                    >
                      <EditIcon />
                    </button>
                    <button
                      onClick={() => handleDeletePackage(pkg.id)}
                      className="text-red-600 hover:text-red-900 p-1 rounded"
                      title="Eliminar"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Vista de lista */
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paquete
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duración
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invitados
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Popularidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPackages.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{pkg.name}</div>
                        <div className="text-sm text-gray-500">{pkg.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(pkg.category)}`}>
                        {getCategoryText(pkg.category)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${pkg.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {pkg.duration} horas
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {pkg.maxGuests} máx.
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {renderStars(pkg.popularity)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(pkg.status)}`}>
                        {pkg.status === 'active' ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            // Ver detalles
                            console.log('Ver detalles:', pkg)
                          }}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          title="Ver detalles"
                        >
                          <EyeIcon />
                        </button>
                        <button
                          onClick={() => {
                            setEditingPackage(pkg)
                            setIsModalOpen(true)
                          }}
                          className="text-purple-600 hover:text-purple-900 p-1 rounded"
                          title="Editar"
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => handleDeletePackage(pkg.id)}
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

          {filteredPackages.length === 0 && (
            <div className="text-center py-12">
              <PackageIcon />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay paquetes</h3>
              <p className="mt-1 text-sm text-gray-500">
                No se encontraron paquetes que coincidan con los filtros aplicados.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Modal para crear/editar paquete */}
      {isModalOpen && (
        <ItemModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingPackage(null)
          }}
          title={editingPackage ? 'Editar Paquete' : 'Nuevo Paquete'}
          activeTab="packages"
          handleSubmit={handleSavePackage}
          editingItem={editingPackage}
        />
      )}
    </div>
  )
}