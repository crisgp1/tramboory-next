/**
 * Componente Principal de Catálogo
 * @module CatalogMain
 * @description Gestión de paquetes y servicios del catálogo
 */

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'

// ============================================================================
// INTERFACES Y TIPOS
// ============================================================================

interface Package {
  id: string
  name: string
  description: string
  category: string
  price: number
  duration: string
  capacity: number
  features: string[]
  isActive: boolean
  isPopular: boolean
  imageUrl?: string
  createdAt: string
  updatedAt: string
}

interface CatalogMainProps {
  className?: string
}

// ============================================================================
// ICONOS SVG
// ============================================================================

const PackageIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
)

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
)

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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

const StarIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const UsersIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

// ============================================================================
// DATOS DE EJEMPLO
// ============================================================================

const samplePackages: Package[] = [
  {
    id: '1',
    name: 'Paquete Cumpleaños Básico',
    description: 'Perfecto para celebraciones íntimas con decoración temática y entretenimiento básico.',
    category: 'Cumpleaños',
    price: 2500,
    duration: '4 horas',
    capacity: 25,
    features: [
      'Decoración temática básica',
      'Mesa de dulces',
      'Animación por 2 horas',
      'Música y sonido',
      'Globos y serpentinas'
    ],
    isActive: true,
    isPopular: true,
    imageUrl: '/img/packages/birthday-basic.jpg',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Paquete Quinceañera Premium',
    description: 'Celebración elegante con decoración sofisticada y servicios completos.',
    category: 'Quinceañera',
    price: 8500,
    duration: '8 horas',
    capacity: 100,
    features: [
      'Decoración floral premium',
      'DJ profesional',
      'Fotografía y video',
      'Cena completa',
      'Pastel de 3 pisos',
      'Coordinación de evento'
    ],
    isActive: true,
    isPopular: true,
    imageUrl: '/img/packages/quince-premium.jpg',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-14'
  },
  {
    id: '3',
    name: 'Evento Corporativo Ejecutivo',
    description: 'Solución profesional para eventos empresariales y presentaciones.',
    category: 'Corporativo',
    price: 5200,
    duration: '6 horas',
    capacity: 50,
    features: [
      'Equipo audiovisual profesional',
      'Servicio de catering',
      'Mobiliario ejecutivo',
      'Soporte técnico',
      'Coordinación especializada'
    ],
    isActive: true,
    isPopular: false,
    imageUrl: '/img/packages/corporate-executive.jpg',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-13'
  },
  {
    id: '4',
    name: 'Boda Romántica',
    description: 'Ceremonia y recepción completa con todos los detalles para el día perfecto.',
    category: 'Boda',
    price: 15000,
    duration: '12 horas',
    capacity: 150,
    features: [
      'Decoración floral completa',
      'Fotografía y videografía',
      'Banquete completo',
      'Música en vivo',
      'Coordinación de boda',
      'Transporte nupcial'
    ],
    isActive: true,
    isPopular: true,
    imageUrl: '/img/packages/wedding-romantic.jpg',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-12'
  },
  {
    id: '5',
    name: 'Baby Shower Dulce Espera',
    description: 'Celebración tierna para recibir al nuevo miembro de la familia.',
    category: 'Baby Shower',
    price: 1800,
    duration: '3 horas',
    capacity: 30,
    features: [
      'Decoración temática',
      'Mesa de dulces y snacks',
      'Juegos y actividades',
      'Recuerdos personalizados',
      'Fotografía básica'
    ],
    isActive: true,
    isPopular: false,
    imageUrl: '/img/packages/baby-shower.jpg',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-11'
  },
  {
    id: '6',
    name: 'Graduación Académica',
    description: 'Celebra el logro académico con una fiesta memorable.',
    category: 'Graduación',
    price: 3200,
    duration: '5 horas',
    capacity: 40,
    features: [
      'Decoración académica',
      'Buffet celebratorio',
      'Música y entretenimiento',
      'Fotografía del evento',
      'Reconocimientos especiales'
    ],
    isActive: false,
    isPopular: false,
    imageUrl: '/img/packages/graduation.jpg',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-10'
  }
]

// ============================================================================
// COMPONENTES AUXILIARES
// ============================================================================

/**
 * PackageCard - Tarjeta de paquete individual
 */
const PackageCard: React.FC<{
  package: Package
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onToggleStatus: (id: string) => void
}> = ({ package: pkg, onEdit, onDelete, onToggleStatus }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
    {/* Header con imagen */}
    <div className="relative h-48 bg-gray-100">
      <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
        <PackageIcon />
      </div>
      
      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col space-y-2">
        {pkg.isPopular && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
            <StarIcon />
            <span className="ml-1">Popular</span>
          </span>
        )}
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          pkg.isActive 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {pkg.isActive ? 'Activo' : 'Inactivo'}
        </span>
      </div>

      {/* Precio */}
      <div className="absolute top-3 right-3">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-tramboory-purple-600 text-white">
          ${pkg.price.toLocaleString()}
        </span>
      </div>
    </div>

    {/* Contenido */}
    <div className="p-6">
      {/* Título y categoría */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 font-body-medium">
            {pkg.name}
          </h3>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md font-body-light">
            {pkg.category}
          </span>
        </div>
        <p className="text-sm text-gray-600 font-body-light line-clamp-2">
          {pkg.description}
        </p>
      </div>

      {/* Detalles */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center text-gray-600">
          <ClockIcon />
          <span className="ml-2 font-body-light">{pkg.duration}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <UsersIcon />
          <span className="ml-2 font-body-light">{pkg.capacity} personas</span>
        </div>
      </div>

      {/* Características */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 font-body-medium mb-2">
          Incluye:
        </h4>
        <ul className="space-y-1">
          {pkg.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center text-xs text-gray-600">
              <CheckIcon />
              <span className="ml-2 font-body-light">{feature}</span>
            </li>
          ))}
          {pkg.features.length > 3 && (
            <li className="text-xs text-gray-500 font-body-light">
              +{pkg.features.length - 3} características más
            </li>
          )}
        </ul>
      </div>

      {/* Acciones */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(pkg.id)}
            leftIcon={<EditIcon />}
          >
            Editar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(pkg.id)}
            leftIcon={<TrashIcon />}
            className="text-red-600 hover:text-red-700"
          >
            Eliminar
          </Button>
        </div>
        <Button
          variant={pkg.isActive ? "outline" : "primary"}
          size="sm"
          onClick={() => onToggleStatus(pkg.id)}
        >
          {pkg.isActive ? 'Desactivar' : 'Activar'}
        </Button>
      </div>
    </div>
  </div>
)

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * CatalogMain - Componente principal de gestión de catálogo
 * 
 * ### Características:
 * - **Gestión de Paquetes**: CRUD completo de paquetes y servicios
 * - **Categorización**: Organización por categorías de eventos
 * - **Control de Estado**: Activar/desactivar paquetes
 * - **Filtros Avanzados**: Búsqueda y filtrado por múltiples criterios
 * 
 * @example
 * ```tsx
 * <CatalogMain />
 * ```
 */
export const CatalogMain: React.FC<CatalogMainProps> = ({ className = '' }) => {
  const [packages] = useState<Package[]>(samplePackages)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  // Obtener categorías únicas
  const categories = Array.from(new Set(packages.map(pkg => pkg.category)))

  // Filtrar paquetes
  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || pkg.category === filterCategory
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && pkg.isActive) ||
                         (filterStatus === 'inactive' && !pkg.isActive)
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Handlers
  const handleEdit = (id: string) => {
    console.log('Editar paquete:', id)
    // Implementar modal de edición
  }

  const handleDelete = (id: string) => {
    console.log('Eliminar paquete:', id)
    // Implementar confirmación y eliminación
  }

  const handleToggleStatus = (id: string) => {
    console.log('Cambiar estado del paquete:', id)
    // Implementar cambio de estado
  }

  const handleAddPackage = () => {
    console.log('Agregar nuevo paquete')
    // Implementar modal de creación
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-body-semibold">
            Catálogo
          </h1>
          <p className="mt-2 text-gray-600 font-body-light">
            Gestiona los paquetes y servicios disponibles
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button
            variant="primary"
            leftIcon={<PlusIcon />}
            onClick={handleAddPackage}
          >
            Nuevo Paquete
          </Button>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Búsqueda */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Buscar paquetes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-tramboory-purple-500 focus:border-tramboory-purple-500 font-body-regular"
            />
          </div>

          {/* Filtros */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FilterIcon />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-tramboory-purple-500 focus:border-tramboory-purple-500 font-body-regular"
              >
                <option value="all">Todas las categorías</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-tramboory-purple-500 focus:border-tramboory-purple-500 font-body-regular"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900 font-body-semibold">
            {packages.length}
          </div>
          <div className="text-sm text-gray-600 font-body-light">
            Total de paquetes
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600 font-body-semibold">
            {packages.filter(pkg => pkg.isActive).length}
          </div>
          <div className="text-sm text-gray-600 font-body-light">
            Paquetes activos
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-yellow-600 font-body-semibold">
            {packages.filter(pkg => pkg.isPopular).length}
          </div>
          <div className="text-sm text-gray-600 font-body-light">
            Paquetes populares
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-tramboory-purple-600 font-body-semibold">
            {categories.length}
          </div>
          <div className="text-sm text-gray-600 font-body-light">
            Categorías
          </div>
        </div>
      </div>

      {/* Grid de paquetes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => (
          <PackageCard
            key={pkg.id}
            package={pkg}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        ))}
      </div>

      {/* Estado vacío */}
      {filteredPackages.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <PackageIcon />
          </div>
          <h3 className="text-lg font-medium text-gray-900 font-body-medium">
            No se encontraron paquetes
          </h3>
          <p className="text-gray-500 font-body-light">
            Intenta ajustar los filtros o crea un nuevo paquete.
          </p>
        </div>
      )}
    </div>
  )
}

export default CatalogMain