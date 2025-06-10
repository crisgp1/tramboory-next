/**
 * Componente Principal de Galería
 * @module GalleryMain
 * @description Gestión de galería de imágenes y multimedia
 */

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'

// ============================================================================
// INTERFACES Y TIPOS
// ============================================================================

interface GalleryImage {
  id: string
  title: string
  description?: string
  url: string
  thumbnail: string
  category: string
  tags: string[]
  uploadDate: string
  size: string
  dimensions: string
  isPublic: boolean
}

interface GalleryMainProps {
  className?: string
}

// ============================================================================
// ICONOS SVG
// ============================================================================

const ImageIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const UploadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
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

const EyeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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

const GlobeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const LockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
)

// ============================================================================
// DATOS DE EJEMPLO
// ============================================================================

const sampleImages: GalleryImage[] = [
  {
    id: '1',
    title: 'Fiesta de Cumpleaños - Decoración Principal',
    description: 'Decoración temática con globos dorados y mesa principal',
    url: '/img/gallery/birthday-1.jpg',
    thumbnail: '/img/gallery/thumbs/birthday-1.jpg',
    category: 'Cumpleaños',
    tags: ['decoración', 'globos', 'mesa', 'dorado'],
    uploadDate: '2024-01-15',
    size: '2.4 MB',
    dimensions: '1920x1080',
    isPublic: true
  },
  {
    id: '2',
    title: 'Quinceañera - Salón Principal',
    description: 'Vista general del salón decorado para quinceañera',
    url: '/img/gallery/quince-1.jpg',
    thumbnail: '/img/gallery/thumbs/quince-1.jpg',
    category: 'Quinceañera',
    tags: ['salón', 'decoración', 'quinceañera', 'elegante'],
    uploadDate: '2024-01-14',
    size: '3.1 MB',
    dimensions: '1920x1080',
    isPublic: true
  },
  {
    id: '3',
    title: 'Evento Corporativo - Setup',
    description: 'Configuración de audio y video para evento corporativo',
    url: '/img/gallery/corporate-1.jpg',
    thumbnail: '/img/gallery/thumbs/corporate-1.jpg',
    category: 'Corporativo',
    tags: ['corporativo', 'audio', 'video', 'profesional'],
    uploadDate: '2024-01-13',
    size: '1.8 MB',
    dimensions: '1920x1080',
    isPublic: false
  },
  {
    id: '4',
    title: 'Boda - Ceremonia',
    description: 'Decoración floral para ceremonia de boda',
    url: '/img/gallery/wedding-1.jpg',
    thumbnail: '/img/gallery/thumbs/wedding-1.jpg',
    category: 'Boda',
    tags: ['boda', 'ceremonia', 'flores', 'romántico'],
    uploadDate: '2024-01-12',
    size: '2.7 MB',
    dimensions: '1920x1080',
    isPublic: true
  },
  {
    id: '5',
    title: 'Baby Shower - Mesa de Dulces',
    description: 'Mesa de dulces temática para baby shower',
    url: '/img/gallery/baby-shower-1.jpg',
    thumbnail: '/img/gallery/thumbs/baby-shower-1.jpg',
    category: 'Baby Shower',
    tags: ['baby shower', 'dulces', 'temático', 'pastel'],
    uploadDate: '2024-01-11',
    size: '2.2 MB',
    dimensions: '1920x1080',
    isPublic: true
  },
  {
    id: '6',
    title: 'Graduación - Decoración Académica',
    description: 'Decoración para fiesta de graduación universitaria',
    url: '/img/gallery/graduation-1.jpg',
    thumbnail: '/img/gallery/thumbs/graduation-1.jpg',
    category: 'Graduación',
    tags: ['graduación', 'académico', 'universidad', 'logro'],
    uploadDate: '2024-01-10',
    size: '1.9 MB',
    dimensions: '1920x1080',
    isPublic: true
  }
]

// ============================================================================
// COMPONENTES AUXILIARES
// ============================================================================

/**
 * ImageCard - Tarjeta de imagen individual
 */
const ImageCard: React.FC<{
  image: GalleryImage
  onView: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}> = ({ image, onView, onEdit, onDelete }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 group">
    {/* Imagen */}
    <div className="relative aspect-video bg-gray-100">
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
        <ImageIcon />
      </div>
      
      {/* Overlay con acciones */}
      <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => onView(image.id)}
          className="p-1.5 bg-white/90 rounded-md hover:bg-white transition-colors"
          title="Ver imagen"
        >
          <EyeIcon />
        </button>
        <button
          onClick={() => onEdit(image.id)}
          className="p-1.5 bg-white/90 rounded-md hover:bg-white transition-colors"
          title="Editar"
        >
          <EditIcon />
        </button>
        <button
          onClick={() => onDelete(image.id)}
          className="p-1.5 bg-white/90 rounded-md hover:bg-white transition-colors text-red-600"
          title="Eliminar"
        >
          <TrashIcon />
        </button>
      </div>

      {/* Indicador de visibilidad */}
      <div className="absolute bottom-2 left-2">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          image.isPublic 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-gray-50 text-gray-700 border border-gray-200'
        }`}>
          {image.isPublic ? <GlobeIcon /> : <LockIcon />}
          <span className="ml-1">{image.isPublic ? 'Público' : 'Privado'}</span>
        </span>
      </div>
    </div>

    {/* Información */}
    <div className="p-4">
      <div className="mb-2">
        <h3 className="text-sm font-medium text-gray-900 font-body-medium line-clamp-1">
          {image.title}
        </h3>
        {image.description && (
          <p className="text-xs text-gray-500 font-body-light line-clamp-2 mt-1">
            {image.description}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 font-body-light">
        <span className="px-2 py-1 bg-gray-100 rounded-md">
          {image.category}
        </span>
        <span>{image.size}</span>
      </div>

      <div className="mt-2 text-xs text-gray-400 font-body-light">
        {new Date(image.uploadDate).toLocaleDateString()}
      </div>
    </div>
  </div>
)

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * GalleryMain - Componente principal de gestión de galería
 * 
 * ### Características:
 * - **Gestión de Imágenes**: Subir, editar y eliminar imágenes
 * - **Organización**: Categorías y etiquetas para organización
 * - **Filtros**: Búsqueda y filtrado avanzado
 * - **Visibilidad**: Control de imágenes públicas/privadas
 * 
 * @example
 * ```tsx
 * <GalleryMain />
 * ```
 */
export const GalleryMain: React.FC<GalleryMainProps> = ({ className = '' }) => {
  const [images] = useState<GalleryImage[]>(sampleImages)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterVisibility, setFilterVisibility] = useState<string>('all')

  // Obtener categorías únicas
  const categories = Array.from(new Set(images.map(img => img.category)))

  // Filtrar imágenes
  const filteredImages = images.filter(image => {
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = filterCategory === 'all' || image.category === filterCategory
    const matchesVisibility = filterVisibility === 'all' || 
                             (filterVisibility === 'public' && image.isPublic) ||
                             (filterVisibility === 'private' && !image.isPublic)
    return matchesSearch && matchesCategory && matchesVisibility
  })

  // Handlers
  const handleView = (id: string) => {
    console.log('Ver imagen:', id)
    // Implementar modal de vista
  }

  const handleEdit = (id: string) => {
    console.log('Editar imagen:', id)
    // Implementar modal de edición
  }

  const handleDelete = (id: string) => {
    console.log('Eliminar imagen:', id)
    // Implementar confirmación y eliminación
  }

  const handleUpload = () => {
    console.log('Subir nueva imagen')
    // Implementar modal de subida
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-body-semibold">
            Galería
          </h1>
          <p className="mt-2 text-gray-600 font-body-light">
            Gestiona las imágenes y multimedia del sitio
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button
            variant="primary"
            leftIcon={<UploadIcon />}
            onClick={handleUpload}
          >
            Subir Imagen
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
              placeholder="Buscar imágenes..."
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
              value={filterVisibility}
              onChange={(e) => setFilterVisibility(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-tramboory-purple-500 focus:border-tramboory-purple-500 font-body-regular"
            >
              <option value="all">Todas las visibilidades</option>
              <option value="public">Públicas</option>
              <option value="private">Privadas</option>
            </select>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900 font-body-semibold">
            {images.length}
          </div>
          <div className="text-sm text-gray-600 font-body-light">
            Total de imágenes
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600 font-body-semibold">
            {images.filter(img => img.isPublic).length}
          </div>
          <div className="text-sm text-gray-600 font-body-light">
            Imágenes públicas
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-600 font-body-semibold">
            {images.filter(img => !img.isPublic).length}
          </div>
          <div className="text-sm text-gray-600 font-body-light">
            Imágenes privadas
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

      {/* Grid de imágenes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredImages.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Estado vacío */}
      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <ImageIcon />
          </div>
          <h3 className="text-lg font-medium text-gray-900 font-body-medium">
            No se encontraron imágenes
          </h3>
          <p className="text-gray-500 font-body-light">
            Intenta ajustar los filtros o sube nuevas imágenes.
          </p>
        </div>
      )}
    </div>
  )
}

export default GalleryMain