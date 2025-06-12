'use client'

/**
 * Componente Principal de Gestión de Paquetes
 * @module PackagesMain
 * @description Componente principal para la gestión de paquetes del sistema
 */

import React, { useState, useEffect } from 'react'
import { ItemModal, ScreenSizeAlert } from '@/components/dashboard'

// ============================================================================
// ICONOS SVG
// ============================================================================

const PackageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    width="24" 
    height="24" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    className="w-5 h-5 md:w-6 md:h-6"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
)

const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    width="24" 
    height="24" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    className="w-4 h-4 md:w-5 md:h-5"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const EditIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    width="24" 
    height="24" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    className="w-4 h-4 sm:w-5 sm:h-5"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
)

const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    width="24" 
    height="24" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    className="w-4 h-4 sm:w-5 sm:h-5"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
)

const EyeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    width="24" 
    height="24" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    className="w-4 h-4 sm:w-5 sm:h-5"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    width="24" 
    height="24" 
    fill="currentColor" 
    viewBox="0 0 20 20"
    className="w-3 h-3 sm:w-4 sm:h-4"
    {...props}
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    width="24" 
    height="24" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    className="w-4 h-4 md:w-5 md:h-5"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
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
// COMPONENTES AUXILIARES
// ============================================================================

/**
 * PackageCard - Componente para mostrar un paquete en vista de tarjeta
 */
const PackageCard: React.FC<{
  pkg: Package;
  onView: (id: string) => void;
  onEdit: (pkg: Package) => void;
  onDelete: (id: string) => void;
  getCategoryColor: (category: string) => string;
  getCategoryText: (category: string) => string;
  getStatusColor: (status: string) => string;
  renderStars: (rating: number) => React.ReactNode;
}> = ({ 
  pkg, 
  onView, 
  onEdit, 
  onDelete,
  getCategoryColor,
  getCategoryText,
  getStatusColor,
  renderStars
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200">
      <div className="p-3 sm:p-4 md:p-6">
        <div className="flex items-start justify-between mb-3 md:mb-4">
          <div>
            <h3 className="text-base md:text-lg font-semibold text-gray-900 font-body-medium mb-1 truncate max-w-[170px] sm:max-w-full">
              {pkg.name}
            </h3>
            <div className="flex flex-wrap items-center gap-1 md:gap-2 mt-1">
              <span className={`inline-flex px-2 py-0.5 md:py-1 text-xs font-semibold rounded-full ${getCategoryColor(pkg.category)}`}>
                {getCategoryText(pkg.category)}
              </span>
              <span className={`inline-flex px-2 py-0.5 md:py-1 text-xs font-semibold rounded-full ${getStatusColor(pkg.status)}`}>
                {pkg.status === 'active' ? 'Activo' : 'Inactivo'}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl md:text-2xl font-bold text-tramboory-purple-600">${pkg.price.toLocaleString()}</div>
            <div className="text-xs md:text-sm text-gray-500 font-body-light">{pkg.duration}h • {pkg.maxGuests} invitados</div>
          </div>
        </div>

        <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 font-body-light line-clamp-2">
          {pkg.description}
        </p>

        <div className="mb-3 md:mb-4">
          <h4 className="text-xs md:text-sm font-medium text-gray-900 mb-1 md:mb-2 font-body-medium">Incluye:</h4>
          <ul className="text-xs md:text-sm text-gray-600 space-y-0.5 md:space-y-1 font-body-light">
            {pkg.includes.slice(0, 3).map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="w-1.5 h-1.5 bg-tramboory-purple-500 rounded-full mr-1.5 flex-shrink-0"></span>
                <span className="truncate">{item}</span>
              </li>
            ))}
            {pkg.includes.length > 3 && (
              <li className="text-tramboory-purple-600 text-xs">+{pkg.includes.length - 3} más...</li>
            )}
          </ul>
        </div>

        <div className="flex items-center justify-between border-t pt-3">
          <div className="flex items-center gap-0.5">
            {renderStars(pkg.popularity)}
            <span className="text-xs text-gray-500 font-body-light ml-1">({pkg.popularity}/5)</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <button
              onClick={() => onView(pkg.id)}
              className="text-blue-600 hover:text-blue-800 p-1.5 md:p-2 rounded transition-colors duration-200"
              title="Ver detalles"
              aria-label="Ver detalles"
            >
              <EyeIcon />
            </button>
            <button
              onClick={() => onEdit(pkg)}
              className="text-tramboory-purple-600 hover:text-tramboory-purple-800 p-1.5 md:p-2 rounded transition-colors duration-200"
              title="Editar"
              aria-label="Editar paquete"
            >
              <EditIcon />
            </button>
            <button
              onClick={() => onDelete(pkg.id)}
              className="text-red-600 hover:text-red-800 p-1.5 md:p-2 rounded transition-colors duration-200"
              title="Eliminar"
              aria-label="Eliminar paquete"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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
 * - **Responsive**: Adaptable a diferentes tamaños de pantalla
 */
export function PackagesMain() {
  const [packages, setPackages] = useState<Package[]>(mockPackages)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPackage, setEditingPackage] = useState<Package | null>(null)
  const [showAlert, setShowAlert] = useState(false) // Desactivado ya que implementamos responsive

  // Detectar tamaño de pantalla y cambiar automáticamente la vista
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewMode('grid') // En móvil siempre usamos la vista de grid que es más adaptable
      }
    }
    
    // Inicializar
    handleResize()
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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

  // Manejar visualización de paquete
  const handleViewPackage = (packageId: string) => {
    console.log('Ver detalles:', packageId)
    // Implementar lógica para ver detalles
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
    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className={`${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            <StarIcon />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="p-3 sm:p-4 md:p-6 pb-16 space-y-4 md:space-y-8">
      {/* Alerta de tamaño de pantalla - desactivada ya que implementamos diseño responsive */}
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
              <PackageIcon />
            </div>
            <span className="truncate">Gestión de Paquetes</span>
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-1 font-body-light">
            Administra los paquetes de servicios disponibles
          </p>
        </div>
        <div className="flex gap-2 mt-3 sm:mt-0">
          {/* Solo mostramos el toggle en pantallas no móviles */}
          {window.innerWidth >= 768 && (
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="bg-gray-600 hover:bg-gray-700 text-white text-sm md:text-base px-3 md:px-4 py-2 rounded-xl transition-all duration-200 hover:shadow-md"
              title="Cambiar vista"
            >
              {viewMode === 'grid' ? 'Vista Lista' : 'Vista Tarjetas'}
            </button>
          )}
          <button
            onClick={() => {
              setEditingPackage(null)
              setIsModalOpen(true)
            }}
            className="bg-tramboory-purple-600 hover:bg-tramboory-purple-700 text-white font-bold text-sm md:text-base py-2 px-3 md:px-4 rounded-xl transition-all duration-200 hover:shadow-md flex items-center gap-1 md:gap-2"
            title="Crear nuevo paquete"
          >
            <PlusIcon />
            <span>Nuevo Paquete</span>
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
              placeholder="Buscar paquetes..."
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
            <option value="basic">Básico</option>
            <option value="premium">Premium</option>
            <option value="deluxe">Deluxe</option>
            <option value="custom">Personalizado</option>
          </select>

          {/* Filtro por estado */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-tramboory-purple-500 focus:border-transparent"
            title="Filtrar por estado"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {filteredPackages.map((pkg) => (
            <PackageCard 
              key={pkg.id} 
              pkg={pkg}
              onView={handleViewPackage}
              onEdit={(pkg) => {
                setEditingPackage(pkg)
                setIsModalOpen(true)
              }}
              onDelete={handleDeletePackage}
              getCategoryColor={getCategoryColor}
              getCategoryText={getCategoryText}
              getStatusColor={getStatusColor}
              renderStars={renderStars}
            />
          ))}
          
          {filteredPackages.length === 0 && (
            <div className="col-span-full text-center py-8 md:py-12 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-2 bg-tramboory-purple-50 rounded-lg text-tramboory-purple-600 inline-block mb-2">
                <PackageIcon />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900 font-body-medium">No hay paquetes</h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-500 font-body-light">
                No se encontraron paquetes que coincidan con los filtros aplicados.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Vista de lista */
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paquete
                  </th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duración
                  </th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invitados
                  </th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Popularidad
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
                {filteredPackages.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-gray-50">
                    <td className="px-3 md:px-6 py-3 md:py-4">
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-gray-900 font-body-medium truncate max-w-[150px] md:max-w-full">
                          {pkg.name}
                        </div>
                        <div className="text-xs text-gray-500 font-body-light truncate max-w-[150px] md:max-w-full">
                          {pkg.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-0.5 md:py-1 text-xs font-semibold rounded-full ${getCategoryColor(pkg.category)}`}>
                        {getCategoryText(pkg.category)}
                      </span>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-tramboory-purple-600">
                      ${pkg.price.toLocaleString()}
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 font-body-light">
                      {pkg.duration} horas
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 font-body-light">
                      {pkg.maxGuests} máx.
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <div className="flex items-center gap-0.5">
                        {renderStars(pkg.popularity)}
                      </div>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-0.5 md:py-1 text-xs font-semibold rounded-full ${getStatusColor(pkg.status)}`}>
                        {pkg.status === 'active' ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                      <div className="flex items-center gap-1 md:gap-2">
                        <button
                          onClick={() => handleViewPackage(pkg.id)}
                          className="text-blue-600 hover:text-blue-900 p-1 md:p-2 rounded transition-colors duration-200"
                          title="Ver detalles"
                          aria-label="Ver detalles del paquete"
                        >
                          <EyeIcon />
                        </button>
                        <button
                          onClick={() => {
                            setEditingPackage(pkg)
                            setIsModalOpen(true)
                          }}
                          className="text-tramboory-purple-600 hover:text-tramboory-purple-900 p-1 md:p-2 rounded transition-colors duration-200"
                          title="Editar"
                          aria-label="Editar paquete"
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => handleDeletePackage(pkg.id)}
                          className="text-red-600 hover:text-red-900 p-1 md:p-2 rounded transition-colors duration-200"
                          title="Eliminar"
                          aria-label="Eliminar paquete"
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
            <div className="text-center py-8 md:py-12">
              <div className="p-2 bg-tramboory-purple-50 rounded-lg text-tramboory-purple-600 inline-block mb-2">
                <PackageIcon />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900 font-body-medium">No hay paquetes</h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-500 font-body-light">
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