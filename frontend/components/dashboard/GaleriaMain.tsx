'use client'

/**
 * Componente Principal de Gestión de Galería
 * @module GaleriaMain
 * @description Componente principal para la gestión de galería del sistema
 */

import React, { useState } from 'react'
import { ItemModal, ScreenSizeAlert } from '@/components/dashboard'

// ============================================================================
// ICONOS SVG
// ============================================================================

const GalleryIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
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

// ============================================================================
// INTERFACES Y TIPOS
// ============================================================================

interface GalleryItem {
  id: string
  title: string
  description: string
  imageUrl: string
  category: 'eventos' | 'decoraciones' | 'instalaciones' | 'productos'
  tags: string[]
  uploadDate: string
  isPublic: boolean
  eventDate?: string
}

// ============================================================================
// DATOS DE EJEMPLO
// ============================================================================

const mockGallery: GalleryItem[] = [
  {
    id: '1',
    title: 'Fiesta Temática Princesas',
    description: 'Decoración completa para fiesta de princesas con 25 invitados',
    imageUrl: '/img/gallery/princesas.jpg',
    category: 'eventos',
    tags: ['princesas', 'rosa', 'decoración', 'niñas'],
    uploadDate: '2024-01-15',
    isPublic: true,
    eventDate: '2024-01-10'
  },
  {
    id: '2',
    title: 'Mesa de Dulces Premium',
    description: 'Mesa de dulces con temática de superhéroes',
    imageUrl: '/img/gallery/mesa-dulces.jpg',
    category: 'decoraciones',
    tags: ['mesa dulces', 'superhéroes', 'premium'],
    uploadDate: '2024-01-14',
    isPublic: true
  },
  {
    id: '3',
    title: 'Salón Principal',
    description: 'Vista general del salón principal con capacidad para 50 personas',
    imageUrl: '/img/gallery/salon.jpg',
    category: 'instalaciones',
    tags: ['salón', 'instalaciones', 'capacidad'],
    uploadDate: '2024-01-12',
    isPublic: false
  }
]

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * GaleriaMain - Componente de gestión de galería
 * 
 * ### Características:
 * - **Vista de galería**: Grid y lista de imágenes
 * - **Filtros**: Búsqueda por categoría y visibilidad
 * - **CRUD**: Crear, editar y eliminar imágenes
 * - **Responsive**: Adaptable a diferentes tamaños de pantalla
 */
export const GaleriaMain: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>(mockGallery)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedVisibility, setSelectedVisibility] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const [showAlert, setShowAlert] = useState(true)

  // Filtrar galería
  const filteredGallery = gallery.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesVisibility = selectedVisibility === 'all' || 
                             (selectedVisibility === 'public' && item.isPublic) ||
                             (selectedVisibility === 'private' && !item.isPublic)
    
    return matchesSearch && matchesCategory && matchesVisibility
  })

  // Manejar creación/edición de item
  const handleSaveItem = (itemData: any) => {
    if (editingItem) {
      setGallery(gallery.map(item => 
        item.id === editingItem.id ? { ...item, ...itemData } : item
      ))
    } else {
      const newItem: GalleryItem = {
        id: Date.now().toString(),
        ...itemData,
        uploadDate: new Date().toISOString().split('T')[0]
      }
      setGallery([...gallery, newItem])
    }
    setIsModalOpen(false)
    setEditingItem(null)
  }

  // Manejar eliminación de item
  const handleDeleteItem = (itemId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
      setGallery(gallery.filter(item => item.id !== itemId))
    }
  }

  // Obtener color de la categoría
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'eventos': return 'bg-purple-100 text-purple-800'
      case 'decoraciones': return 'bg-pink-100 text-pink-800'
      case 'instalaciones': return 'bg-blue-100 text-blue-800'
      case 'productos': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Obtener texto de la categoría
  const getCategoryText = (category: string) => {
    switch (category) {
      case 'eventos': return 'Eventos'
      case 'decoraciones': return 'Decoraciones'
      case 'instalaciones': return 'Instalaciones'
      case 'productos': return 'Productos'
      default: return category
    }
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
            <GalleryIcon />
            Gestión de Galería
          </h1>
          <p className="text-gray-600 mt-1">
            Administra las imágenes y contenido visual
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            {viewMode === 'grid' ? 'Vista Lista' : 'Vista Galería'}
          </button>
          <button
            onClick={() => {
              setEditingItem(null)
              setIsModalOpen(true)
            }}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Subir Imagen
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
              placeholder="Buscar imágenes..."
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
            title="Filtrar por categoría"
          >
            <option value="all">Todas las categorías</option>
            <option value="eventos">Eventos</option>
            <option value="decoraciones">Decoraciones</option>
            <option value="instalaciones">Instalaciones</option>
            <option value="productos">Productos</option>
          </select>

          {/* Filtro por visibilidad */}
          <select
            value={selectedVisibility}
            onChange={(e) => setSelectedVisibility(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            title="Filtrar por visibilidad"
          >
            <option value="all">Todas las visibilidades</option>
            <option value="public">Públicas</option>
            <option value="private">Privadas</option>
          </select>
        </div>
      </div>

      {/* Vista de galería */}
      {viewMode === 'grid' ? (
        /* Vista de galería */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="aspect-video bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <GalleryIcon />
                  <span className="ml-2 text-sm">Imagen no disponible</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{item.title}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${item.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {item.isPublic ? 'Público' : 'Privado'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(item.category)}`}>
                    {getCategoryText(item.category)}
                  </span>
                  <span className="text-xs text-gray-500">{item.uploadDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                        #{tag}
                      </span>
                    ))}
                    {item.tags.length > 2 && (
                      <span className="text-xs text-gray-500">+{item.tags.length - 2}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        console.log('Ver imagen:', item)
                      }}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded"
                      title="Ver imagen"
                    >
                      <EyeIcon />
                    </button>
                    <button
                      onClick={() => {
                        setEditingItem(item)
                        setIsModalOpen(true)
                      }}
                      className="text-purple-600 hover:text-purple-900 p-1 rounded"
                      title="Editar"
                    >
                      <EditIcon />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
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
                    Imagen
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Visibilidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredGallery.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                          <GalleryIcon />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.title}</div>
                          <div className="text-sm text-gray-500">{item.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(item.category)}`}>
                        {getCategoryText(item.category)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${item.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {item.isPublic ? 'Público' : 'Privado'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.uploadDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            console.log('Ver imagen:', item)
                          }}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          title="Ver imagen"
                        >
                          <EyeIcon />
                        </button>
                        <button
                          onClick={() => {
                            setEditingItem(item)
                            setIsModalOpen(true)
                          }}
                          className="text-purple-600 hover:text-purple-900 p-1 rounded"
                          title="Editar"
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
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

          {filteredGallery.length === 0 && (
            <div className="text-center py-12">
              <GalleryIcon />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay imágenes</h3>
              <p className="mt-1 text-sm text-gray-500">
                No se encontraron imágenes que coincidan con los filtros aplicados.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Modal para crear/editar imagen */}
      {isModalOpen && (
        <ItemModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingItem(null)
          }}
          title={editingItem ? 'Editar Imagen' : 'Subir Imagen'}
          activeTab="gallery"
          handleSubmit={handleSaveItem}
          editingItem={editingItem}
        />
      )}
    </div>
  )
}