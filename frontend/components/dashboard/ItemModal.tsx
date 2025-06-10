'use client'

/**
 * Modal Universal para Items del Dashboard
 * @module ItemModal
 * @description Modal reutilizable para crear/editar diferentes tipos de items
 */

import React from 'react'
import { Modal } from '@/components/ui/modal'

// ============================================================================
// INTERFACES Y TIPOS
// ============================================================================

interface ItemModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  loading?: boolean
  activeTab: string
  handleSubmit: (data: any) => void
  editingItem?: any
  generatedPassword?: string
  generateRandomPassword?: () => void
  users?: any[]
  packages?: any[]
  reservations?: any[]
  categories?: any[]
  onAddCategory?: (category: any) => void
  foodOptions?: any[]
  extras?: any[]
  tematicas?: any[]
  mamparas?: any[]
  payments?: any[]
  currentUser?: any
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * ItemModal - Modal universal para gestión de items
 * 
 * ### Características:
 * - **Reutilizable**: Funciona con diferentes tipos de formularios
 * - **Dinámico**: Renderiza el formulario según el tipo activo
 * - **Validación**: Manejo de estados de carga y validación
 * 
 * @example
 * ```tsx
 * <ItemModal
 *   isOpen={isModalOpen}
 *   onClose={() => setIsModalOpen(false)}
 *   title="Agregar Usuario"
 *   activeTab="users"
 *   handleSubmit={handleSubmit}
 * />
 * ```
 */
export const ItemModal: React.FC<ItemModalProps> = ({
  isOpen,
  onClose,
  title,
  loading = false,
  activeTab,
  handleSubmit,
  editingItem,
  generatedPassword,
  generateRandomPassword,
  users = [],
  packages = [],
  reservations = [],
  categories = [],
  onAddCategory,
  foodOptions = [],
  extras = [],
  tematicas = [],
  mamparas = [],
  payments = [],
  currentUser
}) => {
  const commonProps = {
    editingItem,
    onSave: handleSubmit,
    activeTab,
    payment: editingItem,
    onClose,
    users,
    packages,
    foodOptions,
    currentUser,
    extras,
    tematicas,
    mamparas,
    payments,
    reservations,
    blockedDates: reservations
      .filter(r => r.estado === 'confirmada')
      .map(r => new Date(r.fecha_reserva)),
    existingReservations: reservations
  }

  const renderForm = () => {
    switch (activeTab) {
      case 'users':
        return (
          <div className="space-y-4">
            <div className="text-center text-gray-500">
              Formulario de usuarios en desarrollo
            </div>
          </div>
        )

      case 'reservations':
        return (
          <div className="space-y-4">
            <div className="text-center text-gray-500">
              Formulario de reservas en desarrollo
            </div>
          </div>
        )

      case 'finances':
        return (
          <div className="space-y-4">
            <div className="text-center text-gray-500">
              Formulario de finanzas en desarrollo
            </div>
          </div>
        )

      case 'packages':
        return (
          <div className="space-y-4">
            <div className="text-center text-gray-500">
              Formulario de paquetes en desarrollo
            </div>
          </div>
        )

      case 'extras':
        return (
          <div className="space-y-4">
            <div className="text-center text-gray-500">
              Formulario de extras en desarrollo
            </div>
          </div>
        )

      case 'opcionesAlimento':
        return (
          <div className="space-y-4">
            <div className="text-center text-gray-500">
              Formulario de opciones de alimento en desarrollo
            </div>
          </div>
        )

      case 'tematicas':
        return (
          <div className="space-y-4">
            <div className="text-center text-gray-500">
              Formulario de temáticas en desarrollo
            </div>
          </div>
        )

      case 'mamparas':
        return (
          <div className="space-y-4">
            <div className="text-center text-gray-500">
              Formulario de mamparas en desarrollo
            </div>
          </div>
        )

      case 'payments':
        return (
          <div className="space-y-4">
            <div className="text-center text-gray-500">
              Formulario de pagos en desarrollo
            </div>
          </div>
        )

      default:
        return (
          <div className="space-y-4">
            <div className="text-center text-gray-500">
              Formulario no disponible
            </div>
          </div>
        )
    }
  }

  if (!isOpen) return null

  const footerContent = (
    <div className="flex justify-end space-x-3">
      <button
        onClick={onClose}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-150 ease-in-out"
      >
        Cancelar
      </button>
      <button
        form={`${activeTab}Form`}
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out"
        disabled={loading}
      >
        {loading ? 'Guardando...' : 'Guardar'}
      </button>
    </div>
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title || `${editingItem ? 'Editar' : 'Agregar'} ${activeTab}`}
      size="lg"
    >
      <div className="space-y-6">
        {renderForm()}
        {footerContent}
      </div>
    </Modal>
  )
}

export default ItemModal